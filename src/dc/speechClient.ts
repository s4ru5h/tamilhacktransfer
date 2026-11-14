/**
 * Speech bridge to the TamilHackathon backend (Hono server, port 8787).
 *
 *   POST /stt/turn   multipart: file, difficulty, expected_text → TurnEvalDraft
 *   POST /tts/npc    JSON {text, npc, mood} → audio/mpeg
 *   POST /tts/word   JSON {word} → audio/mpeg (drill clip)
 *
 * Paati's voice: NPC `elder_host` + mood tags (Eleven v3). Renders are cached
 * per (mood, text) — the backend content-hashes and caches too — and every
 * board pre-warms its lines on mount, so a line plays the moment its turn
 * starts instead of waiting on the network. When a render fails, the caller
 * falls back to that line's own uploaded mp3; nothing else is played, so no
 * stray/unrelated recordings ever leak in.
 */

const BASE: string =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env &&
    (import.meta as any).env.VITE_SPEECH_API_URL) ||
  "http://localhost:8787";
// dev → the local Hono server; on Lovable set VITE_SPEECH_API_URL to the
// deployed Supabase edge function, e.g. https://<ref>.supabase.co/functions/v1/speech

export type WordAnalysis = {
  word: string;
  lang?: string;
  status?: string;
  score?: number | null;
  logprob?: number | null;
  tip?: string;
};

export type TurnEvalDraft = {
  transcript_tamil_script?: string;
  transcript_transliterated?: string;
  scores?: {
    tanglish_ratio?: number | null;
    pronunciation?: number | null;
    politeness_register?: number | null;
    fluency_pacing?: number | null;
    total?: number | null;
  } | null;
  word_analysis?: WordAnalysis[];
  fluency?: { speech_rate?: number | null; long_pauses?: number | null; fillers?: string[] | null } | null;
  mistakes?: Array<{ type?: string; word?: string; score?: number | null }>;
  english_words?: string[];
};

async function requestTts(text: string, mood: string | null): Promise<HTMLAudioElement | null> {
  try {
    const r = await fetch(BASE + "/tts/npc", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, npc: "elder_host", mood: mood || undefined }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error("tts " + r.status);
    const buf = await r.arrayBuffer();
    return new Audio(URL.createObjectURL(new Blob([buf], { type: "audio/mpeg" })));
  } catch (e) {
    return null;
  }
}

const ttsCache = new Map<string, Promise<HTMLAudioElement | null>>();

export const Speech = {
  backendUp: false,

  /** Health probe — cheap, called once per board mount. */
  async check(): Promise<boolean> {
    try {
      const r = await fetch(BASE + "/health", { signal: AbortSignal.timeout(2500) });
      this.backendUp = r.ok;
      return r.ok;
    } catch (e) {
      this.backendUp = false;
      return false;
    }
  },

  /** Kick off (and cache) a TTS render without playing it — pre-warms lines. */
  warm(text: string, mood?: string | null) {
    if (text) this.ttsCached(text, mood ?? null);
  },

  /** One network render per (mood, text); failed renders are retried later. */
  ttsCached(text: string, mood: string | null): Promise<HTMLAudioElement | null> {
    const key = (mood ? mood + "|" : "") + text;
    let p = ttsCache.get(key);
    if (!p) {
      p = requestTts(text, mood);
      ttsCache.set(key, p);
      p.then((el) => {
        if (!el) ttsCache.delete(key); // allow a retry on the next play
      });
    }
    return p;
  },

  /** Paati speaks: Eleven v3 TTS of the Tamil line with an NPC mood tag.
      Resolves null on failure — the caller decides the fallback. */
  async tts(text: string, mood: string | null): Promise<HTMLAudioElement | null> {
    return this.ttsCached(text, mood ?? null);
  },

  /**
   * One player turn: batch Scribe v3 STT + rubric draft.
   * Resolves null when the backend can't be reached.
   */
  async stt(blob: Blob, expectedText: string): Promise<TurnEvalDraft | null> {
    try {
      const fd = new FormData();
      const ext = blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm";
      fd.append("file", blob, `turn.${ext}`);
      fd.append("difficulty", "easy");
      if (expectedText) fd.append("expected_text", expectedText);
      const r = await fetch(BASE + "/stt/turn", { method: "POST", body: fd, signal: AbortSignal.timeout(20000) });
      if (!r.ok) throw new Error("stt " + r.status);
      const draft = (await r.json()) as TurnEvalDraft;
      this.backendUp = true;
      return draft;
    } catch (e) {
      return null;
    }
  },

  /** A native-Tamil drill clip for one word (Mistake deck / feedback page). */
  async wordClip(word: string): Promise<HTMLAudioElement | null> {
    try {
      const r = await fetch(BASE + "/tts/word", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ word }),
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) throw new Error("word " + r.status);
      const buf = await r.arrayBuffer();
      return new Audio(URL.createObjectURL(new Blob([buf], { type: "audio/mpeg" })));
    } catch (e) {
      return null;
    }
  },

  /** Extract the English words Scribe heard in the answer (spoken in English but should be Tamil). */
  englishWords(draft: TurnEvalDraft | null): string[] {
    if (!draft) return [];
    const fromWords = (draft.word_analysis || [])
      .filter((w) => w.lang === "en" || w.status === "english")
      .map((w) => w.word)
      .filter(Boolean);
    if (fromWords.length) return Array.from(new Set(fromWords));
    // Fallback: latin-letter tokens in the transcript that aren't proper nouns
    const tr = draft.transcript_transliterated || "";
    const stop = new Set(["a", "i", "the", "and", "or", "of", "to", "in", "is", "it", "am", "are"]);
    const tokens = tr.toLowerCase().replace(/[.,!?]/g, " ").split(/\s+/).filter(Boolean);
    return Array.from(new Set(tokens.filter((t) => /^[a-z']+$/.test(t) && !stop.has(t))));
  },
};
