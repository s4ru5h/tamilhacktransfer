/**
 * HTTP surface — pure Request → Response functions using only Web APIs.
 *
 * This file is the entire API. It runs unchanged on:
 *  - Node (src/index.ts via Hono's node adapter)
 *  - Deno / Supabase Edge Functions (supabase/functions/speech/index.ts)
 *
 * Routes:
 *  GET  /health          → liveness + config status
 *  GET  /voices          → configured NPC voices (debug)
 *  POST /stt/turn        → multipart audio → TurnEvalDraft JSON
 *  POST /tts/npc         → JSON {text, npc, mood} → audio/mpeg
 *  POST /tts/word        → JSON {word} → audio/mpeg (drill clip)
 *  POST /tts/reference   → JSON {text} → audio/mpeg ([Play Native Tamil])
 */

import { processPlayerTurn, type TurnOptions } from "./turn.ts";
import {
  synthesizeSpeech,
  synthesizeWordClip,
  memoryCache,
  SpeechConfigError,
} from "./tts/elevenlabs.ts";
import { tamilPack } from "./packs/tamil.ts";
import type { Difficulty } from "./types.ts";

const audioCache = memoryCache();
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

function envGet(key: string): string | undefined {
  const g = globalThis as Record<string, unknown>;
  const deno = g.Deno as { env?: { get?: (k: string) => string | undefined } } | undefined;
  return deno?.env?.get?.(key) ?? (g.process as { env?: Record<string, string | undefined> })?.env?.[key];
}

function apiKey(): string {
  const key = envGet("ELEVENLABS_API_KEY");
  if (!key) {
    throw new SpeechConfigError(
      "ELEVENLABS_API_KEY is not set. Locally: copy .env.example → .env. On Supabase: `supabase secrets set ELEVENLABS_API_KEY=...`",
    );
  }
  return key;
}

const CORS_HEADERS: Record<string, string> = {
  "access-control-allow-origin": "*", // tighten before production
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type, authorization, apikey, x-api-key",
  "access-control-max-age": "86400",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "content-type": "application/json", ...CORS_HEADERS },
  });
}

function audioResponse(bytes: Uint8Array, fromCache: boolean): Response {
  return new Response(bytes as BlobPart, {
    status: 200,
    headers: {
      "content-type": "audio/mpeg",
      "x-cache": fromCache ? "hit" : "miss",
      ...CORS_HEADERS,
    },
  });
}

function handleError(err: unknown): Response {
  if (err instanceof SpeechConfigError) return json({ error: err.message }, 500);
  const message = err instanceof Error ? err.message : String(err);
  // Surface upstream API errors with their status where detectable
  const upstream = message.match(/^(?:Scribe|TTS) (\d{3})/);
  return json({ error: message }, upstream ? Number(upstream[1]) : 500);
}

export async function handleHttpRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });

  const url = new URL(req.url);
  const route = `${req.method} ${url.pathname.replace(/\/+$/, "")}`;

  try {
    switch (route) {
      case "GET /health":
      case "GET /health/": {
        const missingVoices = Object.entries(tamilPack.voices)
          .filter(([, cfg]) => !cfg.voiceId && !envGet(`VOICE_${Object.keys(tamilPack.voices).find((k) => tamilPack.voices[k] === cfg)!.toUpperCase()}`))
          .map(([k]) => k);
        return json({
          ok: true,
          service: "tamil-speech-backend",
          stt_model: tamilPack.stt.model,
          tts_model: tamilPack.tts.model,
          api_key_set: Boolean(envGet("ELEVENLABS_API_KEY")),
          voices_configured: Object.keys(tamilPack.voices).length - missingVoices.length,
          voices_missing: missingVoices.length ? missingVoices : "none",
        });
      }

      case "GET /voices":
      case "GET /voices/": {
        return json({
          narrator: envGet("VOICE_NARRATOR") || tamilPack.narratorVoiceId || null,
          voices: Object.fromEntries(
            Object.entries(tamilPack.voices).map(([k, v]) => [
              k,
              {
                voiceId: envGet(`VOICE_${k.toUpperCase()}`) || v.voiceId || null,
                moods: v.moods,
                register: v.register,
              },
            ]),
          ),
        });
      }

      case "POST /stt/turn":
      case "POST /stt/turn/": {
        const form = await req.formData();
        const file = (form.get("file") ?? form.get("audio")) as File | null;
        if (!file || typeof file === "string") {
          return json({ error: "multipart field 'file' with audio is required" }, 400);
        }
        const difficultyRaw = String(form.get("difficulty") ?? "easy");
        const difficulty = (DIFFICULTIES as string[]).includes(difficultyRaw)
          ? (difficultyRaw as Difficulty)
          : "easy";
        const expectedText = form.get("expected_text")?.toString() || undefined;
        const vadPauseSeconds = Number(form.get("vad_pause_seconds") ?? 0) || 0;
        const keyterms = String(form.get("keyterms") ?? "false") === "true";

        const audio = new Uint8Array(await file.arrayBuffer());
        if (audio.byteLength < 200) {
          return json({ error: "audio too short (Scribe requires ≥100ms)" }, 400);
        }

        const opts: TurnOptions = {
          audio,
          mime: file.type || "audio/webm",
          filename: file.name || "turn.webm",
          difficulty,
          expectedText,
          keyterms,
          vadPauseSeconds,
        };
        const draft = await processPlayerTurn(opts, apiKey());
        return json(draft);
      }

      case "POST /tts/npc":
      case "POST /tts/npc/":
      case "POST /tts/reference":
      case "POST /tts/reference/": {
        const body = (await req.json().catch(() => null)) as
          | { text?: string; npc?: string; mood?: string }
          | null;
        if (!body?.text?.trim()) {
          return json({ error: "JSON body {text, npc?, mood?} required" }, 400);
        }
        const npc = route.startsWith("POST /tts/reference") ? "narrator" : body.npc;
        const out = await synthesizeSpeech(
          { text: body.text, npc, mood: body.mood },
          audioCache,
          apiKey(),
        );
        return audioResponse(out.bytes, out.fromCache);
      }

      case "POST /tts/word":
      case "POST /tts/word/": {
        const body = (await req.json().catch(() => null)) as { word?: string } | null;
        if (!body?.word?.trim()) {
          return json({ error: "JSON body {word} required" }, 400);
        }
        const out = await synthesizeWordClip(body.word, audioCache, apiKey());
        return audioResponse(out.bytes, out.fromCache);
      }

      default:
        return json({ error: `no route: ${route}` }, 404);
    }
  } catch (err) {
    return handleError(err);
  }
}
