/**
 * ElevenLabs TTS — NPC dialogue, Inspect Line reference audio, word drills.
 *
 *  - `eleven_v3` supports Tamil and inline [audio tags]; NPC mood → tag.
 *  - All audio is content-hashed and cached (menus/signs are immutable →
 *    generate once, serve forever).
 *  - Slow drill playback is done CLIENT-side (playbackRate 0.6), so one
 *    clip per word serves both normal and slow modes.
 */

import { hashHex } from "../vendor/hash.ts";
import { tamilPack, type LanguagePack } from "../packs/tamil.ts";

const TTS_URL = "https://api.elevenlabs.io/v1/text-to-speech";

export interface AudioCache {
  get(key: string): Promise<Uint8Array | undefined>;
  put(key: string, value: Uint8Array): Promise<void>;
}

/** In-memory cache. Swap for Supabase Storage/Postgres in production. */
export function memoryCache(): AudioCache {
  const map = new Map<string, Uint8Array>();
  return {
    async get(key) {
      return map.get(key);
    },
    async put(key, value) {
      map.set(key, value);
    },
  };
}

export function cacheKey(parts: string[]): Promise<string> {
  return hashHex(parts.join("|"));
}

function envGet(key: string): string | undefined {
  const g = globalThis as Record<string, unknown>;
  const deno = g.Deno as { env?: { get?: (k: string) => string | undefined } } | undefined;
  return deno?.env?.get?.(key) ?? (g.process as { env?: Record<string, string | undefined> })?.env?.[key];
}

export interface SynthesisRequest {
  text: string;
  /** Key in pack.voices, e.g. "waiter". */
  npc?: string;
  /** Mood key in the NPC's moods map (adds an inline [audio tag]). */
  mood?: string;
  /**
   * Optional language override. Defaults to pack.tts.languageCode ("ta").
   * Debug tool auto-detects script: Tamil block → "ta", otherwise "en",
   * so English text isn't forced through Tamil pronunciation rules.
   */
  languageCode?: string;
  pack?: LanguagePack;
}

export class SpeechConfigError extends Error {}

function resolveVoice(
  npc: string | undefined,
  pack: LanguagePack,
): { voiceId: string; label: string } {
  if (!npc || npc === "narrator") {
    const envVoice = envGet("VOICE_NARRATOR");
    const id = envVoice || pack.narratorVoiceId;
    if (!id) {
      throw new SpeechConfigError(
        "No narrator voice configured. Set VOICE_NARRATOR or pack.narratorVoiceId.",
      );
    }
    return { voiceId: id, label: "narrator" };
  }
  const cfg = pack.voices[npc];
  if (!cfg) {
    throw new SpeechConfigError(
      `Unknown NPC "${npc}". Available: ${Object.keys(pack.voices).join(", ")}`,
    );
  }
  const envKey = `VOICE_${npc.toUpperCase()}`;
  const id = envGet(envKey) || cfg.voiceId;
  if (!id) {
    throw new SpeechConfigError(
      `No voice configured for NPC "${npc}". Set ${envKey} or pack.voices.${npc}.voiceId (pick a Tamil voice from the ElevenLabs Voice Library).`,
    );
  }
  return { voiceId: id, label: npc };
}

export async function synthesizeSpeech(
  req: SynthesisRequest,
  cache: AudioCache,
  apiKey: string,
): Promise<{ bytes: Uint8Array; key: string; fromCache: boolean }> {
  const pack = req.pack ?? tamilPack;
  const { voiceId } = resolveVoice(req.npc, pack);

  const moodTag =
    req.npc && req.npc !== "narrator" && req.mood
      ? (pack.voices[req.npc]?.moods[req.mood] ?? pack.voices[req.npc]?.moods.default ?? "")
      : "";
  const text = `${moodTag ? moodTag + " " : ""}${req.text}`.trim();

  const key = await cacheKey([text, voiceId, pack.tts.model]);
  const hit = await cache.get(key);
  if (hit) return { bytes: hit, key, fromCache: true };

  const res = await fetch(`${TTS_URL}/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "content-type": "application/json",
      accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: pack.tts.model,
      language_code: req.languageCode ?? pack.tts.languageCode,
      voice_settings: {
        stability: pack.tts.stability,
        similarity_boost: pack.tts.similarityBoost,
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`TTS ${res.status}: ${body}`);
  }
  const bytes = new Uint8Array(await res.arrayBuffer());
  await cache.put(key, bytes);
  return { bytes, key, fromCache: false };
}

/** Single-word clip for Mistake Deck drills ([Drill Mistakes] screen). */
export async function synthesizeWordClip(
  word: string,
  cache: AudioCache,
  apiKey: string,
  pack: LanguagePack = tamilPack,
): Promise<{ bytes: Uint8Array; key: string; fromCache: boolean }> {
  const clean = word.trim();
  if (!clean || clean.length > 60) throw new SpeechConfigError("Invalid word for drill clip.");
  const key = await cacheKey(["drill", clean.toLowerCase(), pack.narratorVoiceId || envGet("VOICE_NARRATOR") || "", pack.tts.model]);
  const hit = await cache.get(key);
  if (hit) return { bytes: hit, key, fromCache: true };
  return synthesizeSpeech({ text: clean, npc: "narrator", pack }, cache, apiKey);
}
