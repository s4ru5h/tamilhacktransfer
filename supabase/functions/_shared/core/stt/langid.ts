/**
 * Language tagging per spoken token.
 *
 * Scribe returns Tamil in Tamil script and English in Latin script, so
 * script detection handles most of it. Latin-script tokens are classified
 * with a lexicon heuristic; the LLM grader refines these tags downstream.
 */

import type { ScribeWord, WordLang } from "../types.ts";
import type { LanguagePack } from "../packs/tamil.ts";

export interface TaggedWord extends ScribeWord {
  lang: WordLang;
}

const TAMIL_SCRIPT = /[\u0B80-\u0BFF]/;

function norm(token: string): string {
  return token.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");
}

function isProperNoun(token: string): boolean {
  // Capitalised multi-char token that isn't sentence-start-only heuristics is
  // treated as a proper noun (e.g. "Indiranagar") — exempt from ratio penalty.
  return /^[A-Z][a-zA-Z'-]{2,}$/.test(token);
}

export function tagLanguages(words: ScribeWord[], pack: LanguagePack): TaggedWord[] {
  const loanwords = new Set(pack.loanwords.map(norm));
  const romanTa = new Set(pack.romanizedLexicon.map(norm));
  const enStop = new Set(pack.englishStopwords.map(norm));

  return words.map((w) => {
    const raw = w.text ?? "";
    if (!raw.trim()) return { ...w, lang: "ta" as WordLang };
    if (TAMIL_SCRIPT.test(raw)) return { ...w, lang: "ta" as WordLang };

    const lower = norm(raw);
    let lang: WordLang;
    if (loanwords.has(lower)) lang = "loanword";
    else if (romanTa.has(lower)) lang = "romanized_ta";
    else if (isProperNoun(raw)) lang = "proper_noun";
    else if (enStop.has(lower) || !/^[a-zA-Z'-]+$/.test(raw)) lang = "en";
    else lang = "en"; // ambiguous Latin token — LLM grader refines
    return { ...w, lang };
  });
}
