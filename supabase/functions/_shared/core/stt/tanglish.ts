/**
 * Tanglish-to-Tamil ratio scoring (blueprint pillar 1, 25 pts).
 *
 * Loanwords ("taxi", "bill", ...) and proper nouns are Tamil-neutral:
 * excluded from the English share so players aren't penalized for words
 * that have no natural Tamil equivalent.
 */

import type { Difficulty, WordAnalysis } from "../types.ts";
import { DIFFICULTY_CONFIG, type LanguagePack } from "../packs/tamil.ts";

export function computeTanglishScore(
  word_analysis: WordAnalysis[],
  difficulty: Difficulty,
  _pack: LanguagePack,
): { score: number; englishShare: number; allowed: number } {
  const graded = word_analysis.filter((w) => w.status !== "english");
  const denominator = graded.filter(
    (w) => w.lang === "ta" || w.lang === "romanized_ta" || w.lang === "en",
  );
  if (denominator.length === 0) return { score: 0, englishShare: 1, allowed: DIFFICULTY_CONFIG[difficulty].englishShareAllowed };

  const english = denominator.filter((w) => w.lang === "en").length;
  const share = english / denominator.length;
  const allowed = DIFFICULTY_CONFIG[difficulty].englishShareAllowed;

  let score = 25;
  if (share > allowed) {
    const overshoot = (share - allowed) / Math.max(allowed, 0.05);
    score = Math.max(0, Math.round(25 - overshoot * 25));
  }
  return { score, englishShare: Math.round(share * 100) / 100, allowed };
}
