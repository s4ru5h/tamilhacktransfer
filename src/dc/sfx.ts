/**
 * Paati Payanam — SFX + background-music engine.
 *
 * SFX (public/sfx/, provided by the hackathon build):
 *   doorbell    — the player taps "Ring the bell"
 *   door-open   — follows the doorbell, the door swings open
 *   bonus/happy — a kind, correct answer (one cheerful clip for both)
 *   fail/sad    — a careless answer (one buzzer clip for both)
 *   game-over   — the arcade sting when all hearts are lost
 *   end-screen  — the looping end-card music on the feedback page
 * BGM:
 *   bg-music    — the warm village loop. Plays continuously, ducks (dims)
 *                 while Paati speaks or the mic records, and hard-stops when
 *                 the game-over sting or the end-card music plays.
 *
 * Implementation note: plain HTMLAudioElements only — no Web Audio graph.
 * A suspended AudioContext silently swallows media-element output, so a
 * graph would drop the BGM the moment the tab throttles; direct volume
 * tweening keeps the loop audible and the ducking smooth.
 */

const BASE = "/sfx/";

export type SfxName =
  | "doorbell"
  | "door-open"
  | "happy"
  | "sad"
  | "bonus"
  | "fail"
  | "game-over"
  | "all-lost"
  | "end-screen";

const FILES: Record<SfxName, string> = {
  "doorbell": "doorbell.mp3",
  "door-open": "door-open.mp3",
  "happy": "bonus.mp3", // the SFX folder ships one clip per mood
  "sad": "fail.mp3",
  "bonus": "bonus.mp3",
  "fail": "fail.mp3",
  "game-over": "game-over.mp3",
  "all-lost": "game-over.mp3",
  "end-screen": "end-screen-music.wav",
};

const BGM_FILE = "bg-music.wav";

const BGM_VOL = 0.26;   // continuous level
const BGM_DIM = 0.07;   // dimmed while Paati speaks / mic records
const SFX_VOL = 0.85;
const END_VOL = 0.55;

type DuckReason = "speech" | "mic";

class SfxEngine {
  private els = new Map<string, HTMLAudioElement>();
  private bgm: HTMLAudioElement | null = null;
  private end: HTMLAudioElement | null = null;
  private ducks = new Set<DuckReason>();
  private target = BGM_VOL;
  private vol = 0;            // currently applied BGM volume
  private tween: number | null = null;
  private stopped = false;
  private primed = false;

  /** One Audio element per clip, preloaded, reused for every play. */
  private el(file: string): HTMLAudioElement {
    let el = this.els.get(file);
    if (!el) {
      el = new Audio(BASE + file);
      el.preload = "auto";
      this.els.set(file, el);
    }
    return el;
  }

  /** Call once from a click handler: preloads every clip and starts the BGM. */
  prime() {
    if (this.primed) return;
    this.primed = true;
    Object.values(FILES).forEach((f) => { try { this.el(f); } catch (e) { /* ignore */ } });
    try { this.el(BGM_FILE); } catch (e) { /* ignore */ }
    this.startBgm();
  }

  /** Fire an SFX. Looping tracks (the end-card music) skip if already playing. */
  play(name: SfxName, opts?: { loop?: boolean }) {
    try {
      const el = this.el(FILES[name]);
      const loop = !!(opts && opts.loop);
      if (loop) {
        if (this.end === el && !el.paused && el.currentTime > 0) return; // already playing
        this.end = el;
      }
      el.loop = loop;
      el.volume = name === "end-screen" ? END_VOL : SFX_VOL;
      try { el.currentTime = 0; } catch (e) { /* ignore */ }
      el.play().catch(() => {});
    } catch (e) {
      /* audio unavailable */
    }
  }

  /* ---------------- background music ---------------- */

  startBgm() {
    if (this.bgm || this.stopped) return;
    try {
      const el = this.el(BGM_FILE);
      el.loop = true;
      el.volume = 0;
      el.play().catch(() => {});
      this.bgm = el;
      this.vol = 0;
      this.target = this.wanted();
      this.applyVol();
    } catch (e) {
      this.bgm = null;
    }
  }

  private wanted() {
    return this.ducks.size > 0 ? BGM_DIM : BGM_VOL;
  }

  /** Glide this.volume toward this.target (direct element volume tween). */
  private applyVol(instant?: boolean) {
    if (this.tween !== null) {
      window.clearInterval(this.tween);
      this.tween = null;
    }
    if (!this.bgm) return;
    if (instant) {
      this.vol = this.target;
      this.bgm.volume = this.target;
      return;
    }
    this.tween = window.setInterval(() => {
      if (!this.bgm) {
        if (this.tween !== null) { window.clearInterval(this.tween); this.tween = null; }
        return;
      }
      const d = this.target - this.vol;
      if (Math.abs(d) < 0.012) {
        this.vol = this.target;
        this.bgm.volume = this.target;
        if (this.tween !== null) { window.clearInterval(this.tween); this.tween = null; }
      } else {
        this.vol += d * 0.3;
        this.bgm.volume = this.vol;
      }
    }, 70);
  }

  /** Dim the music while Paati talks or the mic records. */
  duck(reason: DuckReason, on: boolean) {
    if (on) this.ducks.add(reason);
    else this.ducks.delete(reason);
    this.target = this.wanted();
    this.applyVol();
  }

  /** Hard stop — the game-over sting or the end-card music takes over. */
  stopBgm() {
    this.stopped = true;
    if (this.tween !== null) { window.clearInterval(this.tween); this.tween = null; }
    try {
      if (this.bgm) {
        this.bgm.pause();
        this.bgm.currentTime = 0;
      }
    } catch (e) {
      /* ignore */
    }
    this.bgm = null;
    this.ducks.clear();
  }

  /** Leaving the end screen: the end-card music stops, the village loop returns. */
  resumeBgm() {
    try {
      if (this.end) {
        this.end.pause();
        this.end.currentTime = 0;
      }
    } catch (e) {
      /* ignore */
    }
    this.end = null;
    this.stopped = false;
    this.target = this.wanted();
    if (!this.bgm) this.startBgm();
    this.applyVol(!!this.bgm);
  }
}

export const SFX = new SfxEngine();
