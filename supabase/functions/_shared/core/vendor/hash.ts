/**
 * Content hashing via the Web Crypto API — works in Node 18+, Deno, Bun,
 * and browsers without external dependencies.
 */

const enc = new TextEncoder();

export async function hashHex(input: string, algo: "SHA-1" | "SHA-256" = "SHA-1"): Promise<string> {
  const buf = await crypto.subtle.digest(algo, enc.encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
