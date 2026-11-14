/**
 * Tamil script → Tanglish romanization (MVP approximation).
 *
 * Used for the dual-script UI (dialogue subtitles + Inspect Line debugger).
 * Tanglish-flavoured mapping: ழ→z, retroflexes flattened, long vowels doubled.
 * Good enough for scaffolding; replace with hand-checked pack entries for
 * drill content later.
 */

const VIRAMA = "\u0BCD"; // புள்ளி — kills the inherent 'a'

const VOWELS: Record<string, string> = {
  "\u0B85": "a",   // அ
  "\u0B86": "aa",  // ஆ
  "\u0B87": "i",   // இ
  "\u0B88": "ii",  // ஈ
  "\u0B89": "u",   // உ
  "\u0B8A": "uu",  // ஊ
  "\u0B8E": "e",   // எ
  "\u0B8F": "ee",  // ஏ
  "\u0B90": "ai",  // ஐ
  "\u0B92": "o",   // ஒ
  "\u0B93": "oo",  // ஓ
  "\u0B94": "au",  // ஔ
};

const VOWEL_SIGNS: Record<string, string> = {
  "\u0BBE": "aa",  // ா
  "\u0BBF": "i",   // ி
  "\u0BC0": "ii",  // ீ
  "\u0BC1": "u",   // ு
  "\u0BC2": "uu",  // ூ
  "\u0BC6": "e",   // ெ
  "\u0BC7": "ee",  // ே
  "\u0BC8": "ai",  // ை
  "\u0BCA": "o",   // ொ
  "\u0BCB": "oo",  // ோ
  "\u0BCC": "au",  // ௌ
};

const CONSONANTS: Record<string, string> = {
  "\u0B95": "k",   // க
  "\u0B99": "ng",  // ங
  "\u0B9A": "s",   // ச
  "\u0B9E": "nj",  // ஞ
  "\u0B9F": "t",   // ட
  "\u0BA3": "n",   // ண
  "\u0BA4": "t",   // த
  "\u0BA8": "n",   // ந
  "\u0BA9": "n",   // ன
  "\u0BAA": "p",   // ப
  "\u0BAE": "m",   // ம
  "\u0BAF": "y",   // ய
  "\u0BB0": "r",   // ர
  "\u0BB2": "l",   // ல
  "\u0BB5": "v",   // வ
  "\u0BB4": "z",   // ழ (Tanglish convention: z)
  "\u0BB3": "l",   // ள
  "\u0BB1": "r",   // ற (Tanglish convention: r)
  "\u0BB9": "h",   // ஹ
  "\u0B9C": "j",   // ஜ
  "\u0BB6": "sh",  // ஶ
  "\u0BB7": "sh",  // ஷ
  "\u0BB8": "s",   // ஸ
  "\u0B83": "h",   // ஃ (aytham)
};

export function romanizeTamil(input: string): string {
  let out = "";
  const chars = Array.from(input.normalize("NFC"));
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const base = CONSONANTS[ch];
    if (base !== undefined) {
      out += base;
      const next = chars[i + 1];
      if (next === VIRAMA) {
        i++; // bare consonant (mei)
      } else if (next !== undefined && VOWEL_SIGNS[next] !== undefined) {
        out += VOWEL_SIGNS[next];
        i++;
      } else {
        out += "a"; // inherent vowel
      }
      continue;
    }
    if (VOWELS[ch] !== undefined) {
      out += VOWELS[ch];
      continue;
    }
    if (VOWEL_SIGNS[ch] !== undefined || ch === VIRAMA) {
      i++; // stray sign/virama after non-consonant — drop
      continue;
    }
    out += ch; // ASCII, digits, punctuation, spaces pass through
  }
  return out;
}
