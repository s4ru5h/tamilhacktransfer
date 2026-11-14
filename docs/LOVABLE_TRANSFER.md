# Transferring this backend into Lovable

Lovable builds your React frontend; its native backend is **Supabase Edge
Functions** (Deno). This repo is engineered so the entire backend core runs
on Deno **unchanged** — `src/core/**` uses only Web-standard APIs
(`fetch`, `FormData`, `Blob`, `Request`, `Response`, `crypto.subtle`).

```
src/core/**  ──(npm run sync-core)──►  supabase/functions/_shared/core/**
       │                                        │
       │ (Node host, local dev)                 │ (Deno host, production)
       ▼                                        ▼
  npm run dev                            supabase functions deploy speech
```

## Option A — Supabase Edge Functions (recommended: native to Lovable)

1. **Create the Supabase project** (in Lovable's Integrations panel, or at
   supabase.com) and clone the repo locally:
   ```bash
   supabase init   # skip if the Lovable export already contains supabase/
   supabase link --project-ref <your-project-ref>
   ```

2. **Sync the core and deploy:**
   ```bash
   npm run sync-core        # copies src/core → supabase/functions/_shared/core
   supabase secrets set ELEVENLABS_API_KEY=sk_your_key
   supabase functions deploy speech
   ```

3. **Call it from the Lovable frontend.** Paste this helper into the Lovable
   chat as `src/lib/speechClient.ts`:
   ```ts
   import { supabase } from "@/integrations/supabase/client";

   const FN = "speech";

   /** Record a player turn (call from a UI button press). */
   export async function recordTurn(): Promise<Blob> {
     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
     const rec = new MediaRecorder(stream);
     const chunks: BlobPart[] = [];
     rec.ondataavailable = (e) => chunks.push(e.data);
     rec.start();
     await new Promise<void>((resolve) => {
       // wire this to your "stop talking" button:
       (rec as unknown as { stop: () => void }).stop; // placeholder — see note
       setTimeout(() => { rec.stop(); resolve(); }, 8000); // 8s max turn
     });
     stream.getTracks().forEach((t) => t.stop());
     return new Blob(chunks, { type: rec.mimeType });
   }

   /** POST /stt/turn — returns the blueprint's turn evaluation draft. */
   export async function transcribeTurn(
     audio: Blob,
     opts: { difficulty: "easy" | "medium" | "hard"; expectedText?: string },
   ) {
     const form = new FormData();
     form.append("file", audio, "turn.webm");
     form.append("difficulty", opts.difficulty);
     if (opts.expectedText) form.append("expected_text", opts.expectedText);
     const res = await fetch(
       `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${FN}/stt/turn`,
       {
         method: "POST",
         headers: {
           apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
           Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token ?? import.meta.env.VITE_SUPABASE_ANON_KEY}`,
         },
         body: form,
       },
     );
     if (!res.ok) throw new Error(`stt/turn ${res.status}: ${await res.text()}`);
     return res.json();
   }

   /** GET a cached NPC line as an object URL (Inspection Line / dialogue). */
   export async function npcAudio(text: string, npc: string, mood?: string) {
     const res = await fetch(
       `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${FN}/tts/npc`,
       {
         method: "POST",
         headers: {
           "content-type": "application/json",
           apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
         },
         body: JSON.stringify({ text, npc, mood }),
       },
     );
     if (!res.ok) throw new Error(`tts/npc ${res.status}: ${await res.text()}`);
     return URL.createObjectURL(await res.blob());
   }

   /** Word drill clip — play with audio.playbackRate = 0.6 for slow mode. */
   export async function drillClip(word: string) {
     const res = await fetch(
       `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${FN}/tts/word`,
       {
         method: "POST",
         headers: {
           "content-type": "application/json",
           apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
         },
         body: JSON.stringify({ word }),
       },
     );
     return URL.createObjectURL(await res.blob());
   }
   ```
   > Note: `recordTurn`'s stop logic is a stub — in the game you stop the
   > recorder when the player taps the mic button or when client-side VAD
   > detects end-of-speech. Keep the recording blob in React state; the
   > Inspect Line's [Play My Voice] plays that same blob (`URL.createObjectURL`).

4. **JWT note:** Edge Functions verify JWTs by default. With Lovable's
   Supabase client the `apikey` header is enough for the `anon` role if the
   function is public; to make the function fully public set in
   `supabase/config.toml`:
   ```toml
   [functions.speech]
   verify_jwt = false
   ```
   (For a hackathon this is fine; add player auth before any production use.)

## Option B — Deploy the Hono app anywhere

`src/index.ts` runs on Node; deploy to Fly.io / Render / a VPS, then in the
Lovable frontend just set `VITE_SPEECH_API_URL=https://your-host` and point
`speechClient.ts` at it instead of Supabase. Useful if you hit Edge Function
CPU/time limits with long audio.

## Editing workflow

- **Backend changes:** edit `src/core/**`, run `npm run sync-core`, redeploy
  the function. Never edit `supabase/functions/_shared/core` directly — it's
  a generated copy.
- **Language packs / voices:** `src/core/packs/tamil.ts`. Pick Tamil voices
  from https://elevenlabs.io/app/voice-library (language filter: Tamil),
  paste IDs into the pack or `VOICE_*` secrets.
- **LLM grader hook:** your teammate's rubric evaluator takes the
  `TurnEvalDraft` from `/stt/turn` and fills
  `english_translation`, `politeness_register`, `npc_register_reaction`,
  `next_dialogue_node_id`, `try_in_tamil`, and any `register_mismatch`
  mistake cards. Either chain it inside a second Edge Function that calls
  `/stt/turn` internally, or do the merge client-side.

## What's intentionally NOT in the core

- Player-audio persistence: the frontend keeps the recording blob in state
  for [Play My Voice]. Persist to Supabase Storage later if you need
  server-side history.
- LLM evaluation, dialogue trees, scoring DB: separate concern (teammate).
- Realtime STT streaming (`scribe_v3_live`): Phase 2. The core's batch path
  is enough for the full MVP loop.
