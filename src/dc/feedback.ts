/**
 * Paati Payanam — end-of-room feedback store.
 *
 * The entrance scene records every answer (turn-by-turn) here. The end-screen
 * feedback sheet then shows three columns:
 *   1. what went well        — first-try correct answers, pronunciation greens,
 *                              steady pace, low Tanglish/English mix
 *   2. smaller cultural mistakes — the “why” cards: register slips, too-casual
 *                              words, brusque phrasing
 *   3. English words spoken that should be Tamil — Scribe flags every token
 *                              it hears as `lang: "en"`
 */

import type { TurnEvalDraft, WordAnalysis } from "@/dc/speechClient";

const KEY = "tamil-rpg:feedback:entrance";

export type TurnRecord = {
  turn: number;            // 0..4
  line: string;            // Paati's line (Tanglish)
  lineTa: string;
  pickedText: string;      // the option the player gave (typed/tapped/voice)
  pickedTa: string;
  correct: boolean | null; // null = unresolved (only wrong attempts so far)
  firstTry: boolean;
  via: "tap" | "type" | "voice";
  heard: string;
  matchPct: number;
  draft: TurnEvalDraft | null;
  mistakes: Array<{ text: string; why: string }>;
};

export type FeedbackSheet = {
  turns: TurnRecord[];
  hearts: number;
  firstTryCount: number;
  total: number;
  savedAt: number;
};

export function loadFeedback(): FeedbackSheet | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (!v || !Array.isArray(v.turns)) return null;
    return v as FeedbackSheet;
  } catch (e) {
    return null;
  }
}

export function saveFeedback(sheet: FeedbackSheet) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(sheet));
  } catch (e) {
    /* storage unavailable */
  }
}

export function clearFeedback() {
  try {
    window.localStorage.removeItem(KEY);
  } catch (e) {
    /* storage unavailable */
  }
}

/* ---------------- the three columns ---------------- */

export type ColWell = { title: string; detail: string };
export type ColMistake = { title: string; detail: string };
export type ColEnglish = { word: string; tamil: string | null; note: string };

/** A rough Tanglish → Tamil suggestion for common English loanwords. */
const EN_TO_TA: Record<string, string> = {
  thanks: "நன்றி (nandri)",
  thank: "நன்றி (nandri)",
  hello: "வணக்கம் (vanakkam)",
  hi: "வணக்கம் (vanakkam)",
  hey: "வணக்கம் (vanakkam)",
  sorry: "மன்னிச்சிடுங்க (mannichidunga)",
  okay: "சரி (sari)",
  ok: "சரி (sari)",
  bye: "போய் வர்றேன் (poi varren)",
  super: "ரொம்ப நல்லா (romba nalla)",
  nice: "நல்லா (nalla)",
  good: "நல்லது (nallathu)",
  please: "தயவுச்செய்து (dayavu seithu)",
  bus: "பேருந்து (perundhu)",
  water: "தண்ணீர் (thanneer)",
  food: "சாப்பாடு (saapaadu)",
  phone: "அழைப்பு கருவி (azhaippu karuvi)",
  time: "நேரம் (neram)",
  work: "வேலை (velai)",
  house: "வீடு (veedu)",
  friend: "நண்பர் (nanbar)",
  yes: "ஆமா (aama)",
  no: "இல்லை (illai)",
  how: "எப்படி (eppadi)",
  what: "என்ன (enna)",
  why: "ஏன் (yen)",
  where: "எங்க (enga)",
  who: "யாரு (yaaru)",
  come: "வா (vaa)",
  go: "போ (poo)",
  eat: "சாப்பிடு (saappidu)",
  see: "பார் (paar)",
  happy: "சந்தோஷம் (santhosham)",
  sad: "விருப்பம் இல்லாம (viruppam illaama)",
  miss: "ஆசை (aasai)",
  busy: "ஓவர் வேலை (velai-la busy-a illa: வேலையில் இருந்தேன்)",
};

export function tamilSuggestion(word: string): string | null {
  const w = (word || "").toLowerCase().replace(/[^a-z']/g, "");
  if (EN_TO_TA[w]) return EN_TO_TA[w];
  return null;
}

export function buildColumns(sheet: FeedbackSheet | null): {
  well: ColWell[];
  cultural: ColMistake[];
  english: ColEnglish[];
} {
  const sheet2 = sheet || { turns: [], hearts: 3, firstTryCount: 0, total: 5, savedAt: 0 };
  const turns = sheet2.turns || [];

  /* ---------- 1. what went well ---------- */
  const well: ColWell[] = [];
  const rights = turns.filter((t) => t.correct);
  if (sheet2.firstTryCount > 0) {
    well.push({
      title: `${sheet2.firstTryCount} of ${sheet2.total} first-try answers`,
      detail: "Paati understood you straight away — keep greeting her with respectful forms like that.",
    });
  }
  if (sheet2.hearts >= 3) {
    well.push({
      title: `${sheet2.hearts} of Paati's hearts still full`,
      detail: "You kept her happy while answering — that's the polite register Tamil elders expect.",
    });
  }
  // pronunciation greens / strong scores from the STT drafts
  const goodWords: string[] = [];
  let fluencyGood = false;
  let tanglishGood = false;
  turns.forEach((t) => {
    const d = t.draft;
    if (!d) return;
    (d.word_analysis || []).forEach((w: WordAnalysis) => {
      if (w.status === "green" && w.score !== null && w.score !== undefined && w.score >= 80 && w.lang !== "en") {
        if (goodWords.length < 6) goodWords.push(w.word);
      }
    });
    const sc = d.scores || {};
    if (typeof sc.fluency_pacing === "number" && sc.fluency_pacing >= 70) fluencyGood = true;
    if (typeof sc.tanglish_ratio === "number" && sc.tanglish_ratio <= 40) tanglishGood = true;
  });
  if (goodWords.length) {
    well.push({
      title: "Clear pronunciation",
      detail: "Scribe heard these words cleanly: " + Array.from(new Set(goodWords)).join(", "),
    });
  }
  if (fluencyGood) {
    well.push({ title: "Steady pace", detail: "No long pauses or filler words flagged in your spoken answers." });
  }
  if (tanglishGood) {
    well.push({ title: "Mostly Tamil", detail: "Your answers stayed in Tamil instead of slipping into English." });
  }
  if (!well.length) {
    well.push({
      title: "You faced Paati and spoke",
      detail: "Every turn you answer out loud is practice. Try the room again and aim for the respectful forms.",
    });
  }

  /* ---------- 2. smaller cultural mistakes ---------- */
  const cultural: ColMistake[] = [];
  turns.forEach((t) => {
    t.mistakes.forEach((m) => {
      if (cultural.length < 8) {
        cultural.push({
          title: "“" + m.text + "”",
          detail: m.why || "Too casual for an elder — use the respectful -nga forms instead.",
        });
      }
    });
  });
  // wrong-but-unresolved picks
  turns.forEach((t) => {
    if (t.correct === false && !t.mistakes.length && cultural.length < 8) {
      cultural.push({
        title: "“" + t.pickedText + "”",
        detail: "Not the answer Paati was hoping for — greet first, then answer warmly.",
      });
    }
  });
  if (!cultural.length) {
    cultural.push({ title: "No register slips", detail: "You never used ‘da/nee’ or commands with Paati. That's respectful Tamil." });
  }

  /* ---------- 3. English words that should be Tamil ---------- */
  const english: ColEnglish[] = [];
  const seen = new Set<string>();
  turns.forEach((t) => {
    const words = (t.draft && t.draft.english_words) ? t.draft.english_words : [];
    words.forEach((w) => {
      const k = (w || "").toLowerCase();
      if (!k || seen.has(k) || english.length >= 8) return;
      seen.add(k);
      english.push({ word: w, tamil: tamilSuggestion(w), note: "Heard in turn " + (t.turn + 1) });
    });
  });
  if (!english.length) {
    english.push({ word: "—", tamil: null, note: "No English words detected in your spoken answers. Nalla!" });
  }

  return { well, cultural, english };
}
