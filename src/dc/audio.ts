/**
 * Paati's voice lines. Drop .mp3 files into src/assets/audio/ using the exact names the scenes expect
 * (entrance_t1.mp3, entrance_t1_right.mp3, kitchen_t3_wrong.mp3, …). They are picked up automatically:
 * no code changes needed. Until a file exists, the scene shows "audio: <name> (not uploaded yet)".
 */
const files = import.meta.glob("/src/assets/audio/*.{mp3,wav,ogg,m4a}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

export const AUDIO: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split("/").pop() as string, url]),
);
