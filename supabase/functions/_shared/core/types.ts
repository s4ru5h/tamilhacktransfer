/**
 * Shared types — mirrors the SAMPLE TURN EVALUATION JSON CONTRACT
 * from the project blueprint (Section 10).
 *
 * Everything in src/core must stay runtime-agnostic (Web APIs only):
 * no `node:`, no Deno globals, no framework imports.
 */

export type Difficulty = "easy" | "medium" | "hard";

/** Language classification of one spoken token. */
export type WordLang =
  | "ta"           // Tamil script
  | "romanized_ta" // Tanglish / romanized Tamil
  | "en"           // English (gets [Try in Tamil] badge, not pronunciation-graded)
  | "proper_noun"  // exempt from ratio penalty
  | "loanword";    // whitelisted loanword (taxi, passport, bill...) — Tamil-neutral

export type WordStatus = "green" | "yellow" | "red" | "english";

/** One entry of `word_analysis` in the blueprint contract. */
export interface WordAnalysis {
  word: string;
  lang: WordLang;
  status: WordStatus;
  /** 0-100 pronunciation confidence; null for `english` status. */
  score: number | null;
  /** Audio timing (seconds) from Scribe, when available. */
  start?: number;
  end?: number;
  /** Raw ASR token confidence — the Green/Yellow/Red driver. */
  logprob?: number;
  /** Grading tip, e.g. "Watch the retroflex 'ள'". */
  tip?: string;
  /** True when the word was in the expected phrase but never spoken. */
  missing?: boolean;
}

export interface FluencyDetails {
  /** Words per second across the spoken window. */
  speech_rate: number;
  /** Total turn duration in seconds (first→last word). */
  duration_seconds: number;
  /** Mid-sentence pauses > 1.5s. */
  long_pauses: number;
  long_pause_seconds: number;
  /** Filler words detected ("um", "like", ...). */
  fillers: string[];
  /** Immediate word repetitions (false starts). */
  false_starts: string[];
}

/** LLM-side fields the STT pipeline cannot compute (teammate's grader fills these). */
export interface LlmPending {
  english_translation: null;
  politeness_register: null;
  npc_register_reaction: null;
  next_dialogue_node_id: null;
  try_in_tamil: never[];
}

/** Mistake-deck entry (blueprint Section 7). */
export interface MistakeCard {
  type: "pronunciation_miss" | "english_fallback" | "register_mismatch";
  word: string;
  lang?: WordLang;
  score?: number | null;
  tip?: string;
}

/**
 * STT-side draft of the blueprint's turn evaluation JSON.
 * The LLM grader merges register/translation/dialogue fields on top.
 */
export interface TurnEvalDraft {
  transcript_tamil_script: string;
  transcript_transliterated: string;
  english_translation: null;
  scores: {
    tanglish_ratio: number;       // 0-25
    pronunciation: number;        // 0-25
    politeness_register: null;    // LLM pending
    fluency_pacing: number;       // 0-25
    /** Partial total: only STT-computable pillars (max 75). */
    total: number;
  };
  word_analysis: WordAnalysis[];
  fluency: FluencyDetails;
  language: { code: string | null; probability: number | null };
  /** Auto-built Personal Mistake Deck cards for this turn. */
  mistakes: MistakeCard[];
  /** Fields reserved for the LLM grader. */
  llm_pending: LlmPending;
}

/** Raw word entry from the Scribe response. */
export interface ScribeWord {
  text: string;
  start?: number;
  end?: number;
  logprob?: number;
  type?: string;
}

export interface ScribeResult {
  text: string;
  language_code?: string;
  language_probability?: number;
  words: ScribeWord[];
}
