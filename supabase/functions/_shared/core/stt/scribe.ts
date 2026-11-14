/**
 * ElevenLabs Scribe v3 client — batch speech-to-text.
 *
 * Key Tanglish settings:
 *  - language_code "ta" + secondary_language_codes ["en"] → official
 *    mixed-language mode; Tamil in Tamil script, English in Latin script.
 *  - timestamps_granularity "word" → word logprob + timestamps for grading.
 *  - NO no_verbatim → keeps "um"/false starts for the Fluency pillar.
 */

import type { ScribeResult, ScribeWord } from "../types.ts";
import type { LanguagePack } from "../packs/tamil.ts";

const STT_URL = "https://api.elevenlabs.io/v1/speech-to-text";

export interface TranscribeOptions {
  audio: Uint8Array;
  mime: string;
  filename: string;
  /** Scenario vocabulary bias (+20% STT cost) — pass [] to disable. */
  keyterms?: boolean;
  /** Debug override: "en" or "ta". Undefined = pack defaults (ta + en secondary). */
  languageOverride?: string;
  pack: LanguagePack;
}

export async function scribeTranscribe(
  opts: TranscribeOptions,
  apiKey: string,
): Promise<ScribeResult> {
  const form = new FormData();
  form.append(
    "file",
    new Blob([opts.audio as BlobPart], { type: opts.mime }),
    opts.filename,
  );
  const primary = opts.languageOverride ?? opts.pack.stt.primaryLanguage;
  const secondary = opts.languageOverride
    ? [opts.languageOverride === "en" ? "ta" : "en"]
    : opts.pack.stt.secondaryLanguages;
  form.append("model_id", opts.pack.stt.model);
  form.append("language_code", primary);
  for (const lang of secondary) {
    form.append("secondary_language_codes", lang);
  }
  form.append("timestamps_granularity", "word");
  // Keep numbers as spoken words ("நானூறு") so Easy-mode expected phrases
  // (written in words) align with transcripts; digits vs words otherwise
  // causes false pronunciation misses on number-heavy turns.
  form.append("numbers_format", "words");
  form.append("tag_audio_events", "true");
  if (opts.keyterms && opts.pack.stt.keyterms.length > 0) {
    for (const term of opts.pack.stt.keyterms) form.append("keyterms", term);
  }

  const res = await fetch(STT_URL, {
    method: "POST",
    headers: { "xi-api-key": apiKey },
    body: form,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Scribe ${res.status}: ${body}`);
  }
  const data = (await res.json()) as Record<string, unknown>;
  return {
    text: (data.text as string) ?? "",
    language_code: (data.language_code as string) ?? null,
    language_probability: (data.language_probability as number) ?? null,
    words: (data.words as ScribeWord[]) ?? [],
  };
}
