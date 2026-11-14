/**
 * DEBUG-ONLY text translation (ta ↔ en).
 *
 * Translation belongs to the teammate's LLM grader in production. This
 * module is a placeholder for the debug console only — keyless providers,
 * best-effort, no guarantee of quality. Swap for the LLM call later.
 */

const TAMIL_SCRIPT = /[\u0B80-\u0BFF]/;

export function detectScriptLang(text: string): "ta" | "en" {
  return TAMIL_SCRIPT.test(text) ? "ta" : "en";
}

async function viaGoogleGtx(text: string, from: string, to: string): Promise<string> {
  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t` +
    `&sl=${encodeURIComponent(from)}&tl=${encodeURIComponent(to)}&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, { headers: { "user-agent": "debug-console/0.1" } });
  if (!res.ok) throw new Error(`gtx ${res.status}`);
  const data = (await res.json()) as unknown;
  const segments = (data as unknown[])[0] as Array<[string, ...unknown[]]> | undefined;
  if (!Array.isArray(segments)) throw new Error("gtx: unexpected shape");
  return segments.map((s) => s[0] ?? "").join("");
}

async function viaMyMemory(text: string, from: string, to: string): Promise<string> {
  const url =
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}` +
    `&langpair=${encodeURIComponent(from)}|${encodeURIComponent(to)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`mymemory ${res.status}`);
  const data = (await res.json()) as { responseData?: { translatedText?: string } };
  const out = data.responseData?.translatedText;
  if (!out) throw new Error("mymemory: no translation");
  return out;
}

export interface TranslationResult {
  text: string;
  from: string;
  to: string;
  provider: string;
}

export async function translateText(
  text: string,
  from?: string,
  to?: string,
): Promise<TranslationResult> {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("nothing to translate");
  const fromLang = from ?? detectScriptLang(trimmed);
  const toLang = to ?? (fromLang === "ta" ? "en" : "ta");

  const attempts: Array<[string, (t: string, f: string, l: string) => Promise<string>]> = [
    ["google-gtx", viaGoogleGtx],
    ["mymemory", viaMyMemory],
  ];
  let lastError: unknown;
  for (const [provider, fn] of attempts) {
    try {
      const out = await fn(trimmed, fromLang, toLang);
      if (out.trim()) return { text: out.trim(), from: fromLang, to: toLang, provider };
    } catch (err) {
      lastError = err;
    }
  }
  throw new Error(
    `translation failed (all providers): ${lastError instanceof Error ? lastError.message : String(lastError)}`,
  );
}
