/**
 * Pronunciation grading (blueprint pillar 2, 25 pts).
 *
 * Two modes:
 *  - Easy mode: an expected reference phrase exists (the UI showed suggested
 *    lines) → word-level alignment against it. Words in the reference that
 *    were never spoken are RED, score 0 — true pronunciation-style scoring.
 *  - Medium/Hard: open intent, no reference → Scribe's per-word `logprob`
 *    is used as a calibrated confidence proxy. Honest MVP approximation;
 *    thresholds are knobs to tune against real recordings.
 */

import type { ScribeWord, WordStatus, WordAnalysis } from "../types.ts";
import type { TaggedWord } from "./langid.ts";
import { romanizeTamil } from "./romanize.ts";

/** Calibration knobs (logprob bands; Scribe logprobs are ≤ 0). */
export const GRADING_CALIBRATION = {
  greenBelow: -0.35, // logprob ≥ -0.35 → green
  yellowBelow: -1.0, // -0.35 > logprob ≥ -1.0 → yellow, < -1.0 → red
  redFloor: -2.5,    // logprob below this → score clamps to 0
};

export interface ExpectedToken {
  text: string;
  lang: "ta" | "romanized_ta" | "en";
}

const TAMIL_SCRIPT = /[\u0B80-\u0BFF]/;

function norm(token: string): string {
  // Romanize Tamil-script tokens so they can be aligned against romanized
  // Tanglish reference phrases (Easy mode), then vowel-length-insensitive.
  let s = TAMIL_SCRIPT.test(token) ? romanizeTamil(token) : token;
  s = s.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");
  return s.replace(/aa/g, "a").replace(/ii/g, "i").replace(/uu/g, "u").replace(/ee/g, "i").replace(/oo/g, "o");
}

/** Vowel-insensitive fuzzy match: exact, or 1 edit for words ≥ 4 chars. */
function matches(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  return levenshtein(a, b) <= 1;
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
}

function scoreFromLogprob(lp: number): number {
  const { greenBelow, yellowBelow, redFloor } = GRADING_CALIBRATION;
  if (lp >= greenBelow) {
    // -0.35 → 85 ... 0 → 100
    return Math.round(85 + Math.min(1, (0 - lp) / -greenBelow) * 15);
  }
  if (lp >= yellowBelow) {
    // -1.0 → 60 ... -0.35 → 84
    return Math.round(60 + ((lp - yellowBelow) / (greenBelow - yellowBelow)) * 24);
  }
  // deep below: 60 down to 0
  return Math.max(0, Math.round(60 + ((lp - yellowBelow) / (redFloor - yellowBelow)) * 60));
}

function statusFromScore(score: number): WordStatus {
  if (score >= 85) return "green";
  if (score >= 60) return "yellow";
  return "red";
}

const RETROFLEX_TIPS: Array<[RegExp, string]> = [
  [/\u0BB4/, "Watch the retroflex 'ழ' (z) — tongue curled back"],
  [/\u0BB3/, "Watch the retroflex 'ள' (l)"],
  [/\u0BA3/, "Watch the retroflex 'ண' (n)"],
  [/\u0BB1/, "Watch the retroflex 'ற' (t/r)"],
];

function tipFor(word: string): string | undefined {
  for (const [re, tip] of RETROFLEX_TIPS) if (re.test(word)) return tip;
  return undefined;
}

/**
 * Align spoken tokens against the expected reference (Easy mode).
 * Longest-common-subsequence on normalized tokens.
 */
function align(
  spoken: TaggedWord[],
  expected: ExpectedToken[],
): Array<{ spoken: TaggedWord | null; expected: ExpectedToken | null }> {
  const n = spoken.length;
  const m = expected.length;
  const normS = spoken.map((w) => norm(w.text));
  const normE = expected.map((e) => norm(e.text));

  // LCS lengths
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
        matches(normS[i - 1], normE[j - 1])
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  // Walk back
  const pairs: Array<{ spoken: TaggedWord | null; expected: ExpectedToken | null }> = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && matches(normS[i - 1], normE[j - 1])) {
      pairs.unshift({ spoken: spoken[i - 1], expected: expected[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      pairs.unshift({ spoken: null, expected: expected[j - 1] });
      j--;
    } else {
      pairs.unshift({ spoken: spoken[i - 1], expected: null });
      i--;
    }
  }
  return pairs;
}

export function gradeWords(
  rawSpoken: TaggedWord[],
  expected: ExpectedToken[] | null,
): { word_analysis: WordAnalysis[]; pronunciationScore: number } {
  // Scribe emits whitespace "words" between tokens — drop them.
  const spoken = rawSpoken.filter((w) => (w.text ?? "").trim().length > 0);
  const analysis: WordAnalysis[] = [];

  const gradeSpoken = (w: TaggedWord, expectedLang?: ExpectedToken["lang"]) => {
    const isEnglish =
      w.lang === "en" && expectedLang !== "romanized_ta" && expectedLang !== "ta";
    if (isEnglish) {
      // English tokens are NOT pronunciation-graded (blueprint Section 6).
      analysis.push({ word: w.text, lang: w.lang, status: "english", score: null,
        start: w.start, end: w.end, logprob: w.logprob });
      return;
    }
    const lp = typeof w.logprob === "number" ? w.logprob : -0.3; // absent → optimistic
    const score = scoreFromLogprob(lp);
    analysis.push({
      word: w.text,
      lang: expectedLang ? (expectedLang === "ta" ? "ta" : "romanized_ta") : w.lang,
      status: statusFromScore(score),
      score,
      start: w.start,
      end: w.end,
      logprob: lp,
      tip: statusFromScore(score) === "green" ? undefined : tipFor(w.text),
    });
  };

  if (expected && expected.length > 0) {
    const pairs = align(spoken, expected);
    for (const p of pairs) {
      if (p.spoken && p.expected) gradeSpoken(p.spoken, p.expected.lang);
      else if (p.spoken) gradeSpoken(p.spoken);
      else {
        // In the reference but never spoken → miss.
        analysis.push({
          word: p.expected!.text,
          lang: p.expected!.lang === "ta" ? "ta" : p.expected!.lang === "en" ? "en" : "romanized_ta",
          status: p.expected!.lang === "en" ? "english" : "red",
          score: p.expected!.lang === "en" ? null : 0,
          missing: true,
          tip: p.expected!.lang !== "en" ? "Expected word was not spoken" : undefined,
        });
      }
    }
  } else {
    for (const w of spoken) gradeSpoken(w);
  }

  const graded = analysis.filter(
    (a) => a.status !== "english" && a.score !== null,
  ) as Array<WordAnalysis & { score: number }>;
  const pronunciationScore =
    graded.length === 0
      ? 0
      : Math.round((graded.reduce((s, a) => s + a.score, 0) / graded.length / 100) * 25);
  return { word_analysis: analysis, pronunciationScore };
}

/** Words spoken but missing from the transcript window (helper for drills). */
export function unspokenReference(expected: ExpectedToken[], analysis: WordAnalysis[]): string[] {
  const spokenSet = new Set(analysis.filter((a) => !a.missing).map((a) => norm(a.word)));
  return expected.map((e) => norm(e.text)).filter((t) => !spokenSet.has(t));
}
