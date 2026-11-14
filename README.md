# பாட்டி பயணம் · Paati Payanam — Tamil-learning pixel RPG

A 2D pixel-art Tamil-learning RPG built with Lovable. You play a grandchild
visiting Paati (grandmother), and every room is a speaking challenge: greet her
respectfully, answer her questions out loud, and keep her five hearts full.

- **UI** — design-canvas boards exported from Lovable (Start / Entrance / Kitchen / Living room / Report card…), 960×600 pixel-art scenes.
- **Speech backend** — ElevenLabs Scribe v3 (batch STT + pronunciation grading) and Eleven v3 (NPC TTS with mood tags), engineered to run unchanged on Node (local dev) and Deno/Supabase Edge Functions (production).

## Rooms & features

| Scene | What happens |
|---|---|
| `/start` | Arcade title card → dialect + difficulty setup |
| `/entrance` | Ring the bell → doorbell SFX → door opens → Paati greets you (TTS). 5 voice/text turns, 5 hearts, bonus/fail SFX, game-over sting at 0 hearts |
| `/entrance-feedback` | End-card music + Paati's feedback sheet: what went well · smaller cultural mistakes · English words that should be Tamil |
| `/kitchen`, `/living-room` | Next rooms (carry hearts via localStorage) |
| `/report-card` | The trip's report card |

Audio: `public/sfx/` (doorbell, door-open, bonus, fail, game-over, chiptune BGM + end-card loop). Background music plays continuously and ducks while Paati speaks or the mic records; it stops for the game-over sting and the end-card track.

## Run locally

```bash
npm install
npm run dev        # frontend on :8080

# speech backend (separate repo/folder — TamilHackathon)
npm install && npm run dev   # Hono server on :8787
```

The frontend falls back to the uploaded backup mp3s when the speech backend is
offline, so the game is always playable.

## Deploy to Lovable

This repo is GitHub-connected to the Lovable project; pushing `main` syncs it.

1. **Frontend** — pushed by the usual GitHub flow. In Lovable, set the env var
   `VITE_SPEECH_API_URL=https://<project-ref>.supabase.co/functions/v1/speech`
2. **Speech backend (Supabase Edge Function)** — see
   [docs/LOVABLE_TRANSFER.md](docs/LOVABLE_TRANSFER.md). Short version:

   ```bash
   supabase link --project-ref <your-project-ref>
   supabase secrets set ELEVENLABS_API_KEY=sk_...
   supabase secrets set VOICE_ELDER_HOST=Xb7hH8MSUJpSbSDYk0k2   # + other VOICE_* vars
   supabase functions deploy speech
   ```

   `supabase/config.toml` sets `verify_jwt = false` for `speech` so the game
   can call it without a Supabase login (fine for a hackathon; add player
   auth before production). CORS is open (`*`) in `core/http.ts`.

3. **Voices** — the NPC voices are premade stand-ins. Swap in Tamil-native
   voices from the [ElevenLabs Voice Library](https://elevenlabs.io/app/voice-library)
   via `VOICE_*` secrets or `src/core/packs/tamil.ts` (backend repo).

## Repo layout

```
src/boards/          960×600 scene boards (logic classes + renders)
src/dc/              stage runtime, SFX/BGM engine, speech client, feedback store
supabase/functions/  speech edge function (Deno) — the deployed backend
docs/                Lovable transfer guide
public/sfx/          sound effects + generated chiptune music
```
