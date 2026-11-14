/**
 * Supabase Edge Function host — the Lovable-native deployment target.
 *
 * The ENTIRE backend lives in _shared/core (synced from src/core via
 * `npm run sync-core`); this file is just a thin host.
 *
 * Deploy:
 *   supabase secrets set ELEVENLABS_API_KEY=sk_...
 *   supabase secrets set VOICE_ELDER_HOST=Xb7hH8MSUJpSbSDYk0k2   (etc.)
 *   supabase functions deploy speech
 *
 * Supabase mounts this function at /functions/v1/speech/<path>, but the
 * core router matches exact paths (/health, /stt/turn, /tts/npc, …) — so
 * the mount prefix is stripped here before the request is delegated.
 */

import { handleHttpRequest } from "../_shared/core/http.ts";

const MOUNT = /\/functions\/v1\/speech(\/.*)?$/;

Deno.serve((req: Request) => {
  const url = new URL(req.url);
  const m = url.pathname.match(MOUNT);
  if (m) url.pathname = m[1] || "/";
  return handleHttpRequest(new Request(url.toString(), req));
});
