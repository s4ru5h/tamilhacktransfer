/**
 * Fluency / pacing / hesitation scoring (blueprint pillar 4, 25 pts).
 *
 * Uses Scribe's word timestamps (verbatim transcript — do NOT enable
 * no_verbatim) + client-side VAD pause data if provided.
 */

import type { FluencyDetails, ScribeWord } from "../types.ts";
import type { LanguagePack } from "../packs/tamil.ts";

export const FLUENCY_CALIBRATION = {
  idealRateMin: 1.2,   // words/sec — slower reads as halting speech
  idealRateMax: 4.0,   // words/sec — unnaturally rushed
  longPauseSec: 1.5,   // blueprint threshold for unnatural pauses
  penaltyPerPause: 3,
  penaltyPerFiller: 2,
  penaltyPerFalseStart: 3,
  penaltyBadRate: 5,
  maxFillerPenalty: 10,
  maxPausePenalty: 12,
  maxFalseStartPenalty: 10,
};

export function measureFluency(
  words: ScribeWord[],
  pack: LanguagePack,
  vadPauseSeconds = 0,
): FluencyDetails & { fluencyScore: number } {
  const real = words.filter((w) => (w.text ?? "").trim().length > 0);
  const fill: FluencyDetails = {
    speech_rate: 0,
    duration_seconds: 0,
    long_pauses: 0,
    long_pause_seconds: 0,
    fillers: [],
    false_starts: [],
  };

  if (real.length < 2) {
    return { ...fill, fluencyScore: real.length === 0 ? 0 : 25 };
  }

  const first = real[0];
  const last = real[real.length - 1];
  const duration = Math.max(0.1, (last.end ?? last.start ?? 0) - (first.start ?? 0));
  const rate = real.length / duration;

  // Long mid-sentence pauses from word-gap timestamps
  let longPauses = 0;
  let longPauseSeconds = 0;
  for (let i = 1; i < real.length; i++) {
    const gap = (real[i].start ?? 0) - (real[i - 1].end ?? real[i - 1].start ?? 0);
    if (gap > FLUENCY_CALIBRATION.longPauseSec) {
      longPauses++;
      longPauseSeconds += gap;
    }
  }

  // Fillers (verbatim transcript keeps them)
  const fillerSet = new Set(pack.fillers.map((f) => f.toLowerCase()));
  const fillers: string[] = [];
  for (const w of real) {
    const t = (w.text ?? "").toLowerCase().replace(/[^\p{L}']/gu, "");
    if (fillerSet.has(t)) fillers.push(w.text);
  }

  // False starts = immediate word repetitions ("the the", "vanakkam vanakkam")
  const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}']/gu, "");
  const falseStarts: string[] = [];
  for (let i = 1; i < real.length; i++) {
    const a = norm(real[i - 1].text ?? "");
    const b = norm(real[i].text ?? "");
    if (a.length > 2 && a === b) falseStarts.push(real[i].text);
  }

  const c = FLUENCY_CALIBRATION;
  let score = 25;
  score -= Math.min(c.maxPausePenalty, longPauses * c.penaltyPerPause);
  score -= Math.min(c.maxFillerPenalty, fillers.length * c.penaltyPerFiller);
  score -= Math.min(c.maxFalseStartPenalty, falseStarts.length * c.penaltyPerFalseStart);
  if (rate < c.idealRateMin || rate > c.idealRateMax) score -= c.penaltyBadRate;
  // Client VAD data supplements (pauses Scribe's timestamps may miss)
  score -= Math.min(5, Math.floor(vadPauseSeconds / 3));
  score = Math.max(0, Math.min(25, score));

  return {
    speech_rate: Math.round(rate * 100) / 100,
    duration_seconds: Math.round(duration * 100) / 100,
    long_pauses: longPauses,
    long_pause_seconds: Math.round(longPauseSeconds * 100) / 100,
    fillers,
    false_starts: falseStarts,
    fluencyScore: score,
  };
}
