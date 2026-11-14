# Moving the Tamil RPG into Lovable (with GitHub)

This project is an exact copy of the design canvas, converted to React. Every board, every line of
game logic, every animation and every colour comes straight from the canvas files, which are also
included in `design-canvas/` for reference.

It uses the same stack as Lovable (React, Vite, TypeScript, Tailwind, Lovable's `lovable-tagger`),
so Lovable can open and edit it like any project it created itself.

## Why GitHub makes this easy

Lovable can't import code from scratch, but it keeps a two-way sync with a GitHub repository.
So you let Lovable create the repository, push this code into it, and Lovable picks it up.

## Steps (about 10 minutes)

1. **Create a blank Lovable project.** In Lovable, start a new project with the prompt
   "Create a blank page" and wait for it to finish building.
2. **Connect it to GitHub.** In the project, open **Settings → Connectors → GitHub** and choose
   **Connect project**, then pick your GitHub account or organisation. Lovable creates a new
   repository and keeps it in sync on the `main` branch.
   Never rename, move or delete that repository afterwards, or the sync breaks.
3. **Clone the repository** Lovable just created:
   ```bash
   git clone https://github.com/YOUR-ORG/YOUR-REPO.git
   cd YOUR-REPO
   ```
4. **Replace its contents with this project.** Remove Lovable's starter files (this keeps the
   hidden `.git` folder), then copy in everything from this zip:
   ```bash
   git rm -r -q .
   # now unzip tamil-rpg-lovable.zip and copy ALL its files and folders into this folder
   ```
   Make sure `package.json`, `index.html`, `src/`, `design-canvas/` and `tools/` sit at the top level.
5. **Push it.**
   ```bash
   git add -A
   git commit -m "Import Tamil RPG from the design canvas"
   git push origin main
   ```
6. **Open Lovable.** Within a few seconds the preview shows the entrance. Visit `/boards` to see
   every board from the canvas.

Alternative to steps 3–5: Lovable's free importer at lovable.dev/products/git-import copies a
React + Vite + Tailwind repository into a blank Lovable app. Push this project to a repository of
your own first, then run the importer.

## Pages

| Address | Board on the canvas |
| --- | --- |
| `/` and `/entrance` | Room 1 · வாசல் entrance (playable) |
| `/kitchen` | Room 2 · சமையலறை kitchen (playable) |
| `/living-room` | Room 3 · ஹால் living room (playable) |
| `/town` | A · Kolam Cozy town hub |
| `/airport` | B · Chennai Dusk airport taxi curb |
| `/restaurant` | C · Palm-Leaf 4-Tone restaurant |
| `/home-prototype` | The earlier Home scene prototype |
| `/boards` | A list of all of the above |

The buttons that moved between boards on the canvas ("Follow Paati to the kitchen" and so on)
move between these pages. Hearts carry from room to room exactly as on the canvas.

## Adding Paati's audio

Put the recordings in `src/assets/audio/` with the exact file names the scenes use
(`entrance_t1.mp3`, `entrance_t1_right.mp3`, `kitchen_t3_wrong.mp3`, `living_t5.mp3`, …).
They're picked up automatically: no code changes. The easiest way for the team is GitHub's
**Add file → Upload files** button inside the `src/assets/audio` folder. Lovable syncs them in.
Until a file exists, the scene shows "audio: name (not uploaded yet)", just like the canvas.

## First message to send Lovable after the sync

> This app is a pixel-art Tamil learning game converted exactly from a design canvas. Please keep it
> pixel-perfect:
> - Don't restyle, refactor or "clean up" anything in `src/boards/`. Those files are generated from
>   `design-canvas/` by `tools/dc2react.py`, and each board's logic class is copied verbatim.
> - Don't add shadcn components, rounded corners, shadows or new fonts to the game screens.
> - Keep `src/dc/dc.css`: it stops Tailwind's base styles from changing the boards' layout.
> - Each board is a fixed 960×600 stage that `Stage` scales to fit the screen. Keep that.
> - New features go in new files, and boards are only changed when I ask.

## Keeping the canvas and the app in step

The design canvas stays the place to design. When a board changes there:

1. Copy the updated `.dc.html` file into `design-canvas/` (or ask Claude to).
2. Run `python3 tools/dc2react.py` from the project root. It regenerates `src/boards/`.
3. Commit and push. Lovable updates.

If you'd rather edit inside Lovable from now on, that's fine too. Just stop regenerating from the
canvas, or those edits will be overwritten.

## Good to know

- **Voice answers** use the browser's speech recognition (Chrome and Edge). Lovable's in-editor
  preview may block the microphone, so test voice on the published site or open the preview in its
  own tab. Typing and tapping work everywhere.
- **Canvas Tweaks** (starting hearts, hints, audio file notes) keep their canvas defaults. Each
  board's settings are in `DEFAULT_PROPS` near the bottom of its file in `src/boards/`.
- **Saved hearts** live in the player's browser, as on the canvas. Moving them to player accounts
  (for example with Lovable's Supabase integration) is a good next step.

## Demo route (latest)

The app now opens on the front page (`/start`). Choosing a dialect and Easy or Hard and pressing **Start your journey** opens the entrance (`/entrance`). Finishing the entrance leads to **Paati’s report card** (`/report-card`), which shows the real score and offers **Try the entrance again** or **Continue** into the kitchen. The kitchen leads to the living room, whose ending also opens the report card (Continue there starts a new journey).

Hard mode hides the English lines, the Tamil-script line (both can still be switched on with the த / EN buttons), the register badge above Paati and the hint markers. The dialect choice is saved and shown on the report card; the conversation itself is the same spoken Tamil for every dialect for now.
