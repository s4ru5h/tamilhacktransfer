/**
 * Turn orchestrator — the STT half of a speaking turn (blueprint Section 10
 * pipeline steps 1-2). Steps 3 (LLM rubric/register/dialogue) is your
 * teammate's grader, which merges its output over the returned draft.
 */

import type {
  Difficulty,
  MistakeCard,
  TurnEvalDraft,
} from "./types.ts";
import type { ExpectedToken } from "./stt/grading.ts";
import { tamilPack, type LanguagePack } from "./packs/tamil.ts";
import { scribeTranscribe } from "./stt/scribe.ts";
import { tagLanguages } from "./stt/langid.ts";
import { gradeWords } from "./stt/grading.ts";
import { measureFluency } from "./stt/fluency.ts";
import { romanizeTamil } from "./stt/romanize.ts";
import { computeTanglishScore } from "./stt/tanglish.ts";

export interface TurnOptions {
  audio: Uint8Array;
  mime: string;
  filename: string;
  difficulty: Difficulty;
  /** Easy mode: the reference phrase shown in the UI ("Anna, vanakkam"). */
  expectedText?: string;
  /** Structured expected tokens override (lang-tagged reference). */
  expectedTokens?: ExpectedToken[];
  /** Bias Scribe toward scenario vocabulary (+20% cost). */
  keyterms?: boolean;
  /** Debug override: "en" or "ta". Undefined = pack defaults. */
  languageOverride?: string;
  /** Client-side VAD pause total in seconds (fluency supplement). */
  vadPauseSeconds?: number;
  pack?: LanguagePack;
}

export async function processPlayerTurn(
  opts: TurnOptions,
  apiKey: string,
): Promise<TurnEvalDraft> {
  const pack = opts.pack ?? tamilPack;
  const scribe = await scribeTranscribe(
    {
      audio: opts.audio,
      mime: opts.mime,
      filename: opts.filename,
      keyterms: opts.keyterms,
      languageOverride: opts.languageOverride,
      pack,
    },
    apiKey,
  );

  const tagged = tagLanguages(scribe.words, pack);

  let expectedTokens: ExpectedToken[] | null = null;
  if (opts.expectedTokens?.length) {
    expectedTokens = opts.expectedTokens;
  } else if (opts.expectedText?.trim()) {
    expectedTokens = opts.expectedText.trim().split(/\s+/).map((text) => ({
      text,
      lang: "romanized_ta" as const,
    }));
  }

  const { word_analysis, pronunciationScore } = gradeWords(tagged, expectedTokens);
  const fluency = measureFluency(scribe.words, pack, opts.vadPauseSeconds ?? 0);
  const tanglish = computeTanglishScore(word_analysis, opts.difficulty, pack);

  // Auto-build Personal Mistake Deck cards (blueprint Section 7)
  const mistakes: MistakeCard[] = [];
  for (const w of word_analysis) {
    if (w.status === "red" || w.status === "yellow") {
      mistakes.push({
        type: "pronunciation_miss",
        word: w.word,
        lang: w.lang,
        score: w.score,
        tip: w.tip,
      });
    }
    if (w.status === "english" && w.lang === "en") {
      mistakes.push({ type: "english_fallback", word: w.word, lang: "en" });
    }
    // register_mismatch cards are added by the LLM grader
  }

  const partialTotal =
    tanglish.score + pronunciationScore + fluency.fluencyScore;

  return {
    transcript_tamil_script: scribe.text,
    transcript_transliterated: romanizeTamil(scribe.text),
    english_translation: null,
    scores: {
      tanglish_ratio: tanglish.score,
      pronunciation: pronunciationScore,
      politeness_register: null,
      fluency_pacing: fluency.fluencyScore,
      total: partialTotal,
    },
    word_analysis,
    fluency: {
      speech_rate: fluency.speech_rate,
      duration_seconds: fluency.duration_seconds,
      long_pauses: fluency.long_pauses,
      long_pause_seconds: fluency.long_pause_seconds,
      fillers: fluency.fillers,
      false_starts: fluency.false_starts,
    },
    language: {
      code: scribe.language_code ?? null,
      probability: scribe.language_probability ?? null,
    },
    mistakes,
    llm_pending: {
      english_translation: null,
      politeness_register: null,
      npc_register_reaction: null,
      next_dialogue_node_id: null,
      try_in_tamil: [],
    },
  };
}
