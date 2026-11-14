// @ts-nocheck
/* Generated from the design canvas board "Entrance.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "react-router-dom";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import { SFX } from "@/dc/sfx";
import { Speech, type TurnEvalDraft } from "@/dc/speechClient";
import { saveFeedback, clearFeedback, type TurnRecord } from "@/dc/feedback";
import "./entrance.css";

class Component extends DCLogic {
  componentDidMount() {
    /* probe the speech backend once; the renderVals gate below pre-renders
       Paati's five greetings when it comes back up, so every line plays the
       moment its turn starts instead of waiting on the network. */
    Speech.check().then(() => { this._checkDone = true; this.forceUpdate(); });
  }
  componentWillUnmount() {
    try { if (this._ro) this._ro.disconnect(); } catch (e) { /* ignore */ }
    try { if (this._rec) this._rec.abort(); } catch (e) { /* ignore */ }
    try { if (this._audio) this._audio.pause(); } catch (e) { /* ignore */ }
  }
  renderVals() {
    /* ---------- SCRIPT: entrance (team spec). `ta`, `en`, `keys`, the right-answer `why` and Paati’s reactions are additions to review. ---------- */
    const ENTRANCE = [
      { paati: 'vaanga kannu, ulla vaa!', audio: 'entrance_t1.mp3', ta: 'வாங்க கண்ணு, உள்ள வா!', en: 'Come in, dear, come inside!',
        options: [
          { text: 'vanakkam paati, eppadi irukkeenga?', correct: true, keys: ['vanakkam', 'irukkeenga?'], why: '‘vanakkam’ is the respectful greeting, and ‘irukkeenga’ uses the polite ‑nga ending for elders.', ta: 'வணக்கம் பாட்டி, எப்படி இருக்கீங்க?', en: 'Hello Paati, how are you?' },
          { text: 'hi paati da, nee eppadi irukka?', keys: ['da,', 'nee'], why: '‘da’ and ‘nee’ are for friends. Greet elders with ‘vanakkam’ and ‘neenga’.', ta: 'ஹாய் பாட்டி டா, நீ எப்படி இருக்க?', en: 'Hi Paati mate, how are you?' },
          { text: 'sari, ulla poren.', keys: ['sari,', 'poren.'], why: 'Too curt. Greet her warmly first.', ta: 'சரி, உள்ள போறேன்.', en: 'Okay, I’m going in.' }
        ],
        right: { text: 'nalla irukken kannu! vaa vaa.', audio: 'entrance_t1_right.mp3', ta: 'நல்லா இருக்கேன் கண்ணு! வா வா.', en: 'I’m well, dear! Come, come.' },
        wrong: { text: 'enna kannu, ippadi pesura?', audio: 'entrance_t1_wrong.mp3', ta: 'என்ன கண்ணு, இப்படி பேசுற?', en: 'What’s this, dear, talking like that?' } },
      { paati: 'romba naal aachu kannu, unna paathu.', audio: 'entrance_t2.mp3', ta: 'ரொம்ப நாள் ஆச்சு கண்ணு, உன்ன பாத்து.', en: 'It’s been so long since I saw you, dear.',
        options: [
          { text: 'aama paati, ungala paakka romba aasaiya irundhuchu.', correct: true, keys: ['ungala', 'aasaiya'], why: '‘ungala’ is the respectful ‘you’, and ‘aasaiya irundhuchu’ tells her warmly that you longed to see her.', ta: 'ஆமா பாட்டி, உங்கள பாக்க ரொம்ப ஆசையா இருந்துச்சு.', en: 'Yes Paati, I’ve been longing to see you.' },
          { text: 'aama da, naanum miss pannen.', keys: ['da,', 'miss', 'pannen.'], why: '‘da’ and ‘miss pannen’ are casual. Say it warmly and respectfully.', ta: 'ஆமா டா, நானும் மிஸ் பண்ணேன்.', en: 'Yeah mate, I missed you too.' },
          { text: 'naan busy-ya irundhen, adhaan varala.', keys: ['busy-ya', 'varala.'], why: 'Sounds like an excuse. Tell her you’re happy to see her instead.', ta: 'நான் பிஸியா இருந்தேன், அதான் வரல.', en: 'I was busy, that’s why I didn’t come.' }
        ],
        right: { text: 'en chellam! vaa, kitta vaa.', audio: 'entrance_t2_right.mp3', ta: 'என் செல்லம்! வா, கிட்ட வா.', en: 'My darling! Come, come close.' },
        wrong: { text: 'mm… sari kannu.', audio: 'entrance_t2_wrong.mp3', ta: 'ம்ம்… சரி கண்ணு.', en: 'Hmm… alright, dear.' } },
      { paati: 'kaal kai kazhuvikko, apram saapdalaam.', audio: 'entrance_t3.mp3', ta: 'கால் கை கழுவிக்கோ, அப்புறம் சாப்டலாம்.', en: 'Wash your hands and feet, then we’ll eat.',
        options: [
          { text: 'sari paati, naan kazhuvittu varen.', correct: true, keys: ['paati,', 'kazhuvittu', 'varen.'], why: 'You agree with ‘sari paati’ and say what you’ll do: ‘kazhuvittu varen’, I’ll wash and come.', ta: 'சரி பாட்டி, நான் கழுவிட்டு வரேன்.', en: 'Okay Paati, I’ll wash and come.' },
          { text: 'sari, nee ready-a vechuko.', keys: ['nee', 'vechuko.'], why: 'Don’t tell an elder what to do. Answer her politely.', ta: 'சரி, நீ ரெடியா வெச்சுக்கோ.', en: 'Okay, you keep it ready.' },
          { text: 'ippo venaam, apram paakalaam da.', keys: ['venaam,', 'da.'], why: 'Brushing her off with ‘da’ is disrespectful. Agree and do it.', ta: 'இப்போ வேணாம், அப்புறம் பாக்கலாம் டா.', en: 'Not now, we’ll see later, mate.' }
        ],
        right: { text: 'nalla pulla! seekiram vaa.', audio: 'entrance_t3_right.mp3', ta: 'நல்ல புள்ள! சீக்கிரம் வா.', en: 'Good child! Come quickly.' },
        wrong: { text: 'kannu, appadi pesakoodaadhu.', audio: 'entrance_t3_wrong.mp3', ta: 'கண்ணு, அப்படி பேசக்கூடாது.', en: 'Dear, you mustn’t talk like that.' } },
      { paati: 'ukkaaru kannu, thatha ingayae irukkaaru.', audio: 'entrance_t4.mp3', ta: 'உக்காரு கண்ணு, தாத்தா இங்கயே இருக்காரு.', en: 'Sit down, dear. Thatha is right here.',
        options: [
          { text: 'sari paati. thatha eppadi irukkaaru?', correct: true, keys: ['eppadi', 'irukkaaru?'], why: '‘irukkaaru’ is the respectful form for Thatha, and asking after him shows you care.', ta: 'சரி பாட்டி. தாத்தா எப்படி இருக்காரு?', en: 'Okay Paati. How is Thatha?' },
          { text: 'thatha-va kupdu da.', keys: ['kupdu', 'da.'], why: '‘da’ and a bare command are too casual. Ask about Thatha politely.', ta: 'தாத்தாவ கூப்டு டா.', en: 'Call Thatha, mate.' },
          { text: 'thatha enga? nee sollu.', keys: ['nee', 'sollu.'], why: '‘nee sollu’ is a command to an elder. Ask kindly instead.', ta: 'தாத்தா எங்க? நீ சொல்லு.', en: 'Where’s Thatha? You tell me.' }
        ],
        right: { text: 'nalla irukkaaru kannu. unna paatha romba santhoshap paduvaaru.', audio: 'entrance_t4_right.mp3', ta: 'நல்லா இருக்காரு கண்ணு. உன்ன பாத்தா ரொம்ப சந்தோஷப்படுவாரு.', en: 'He’s well, dear. He’ll be so happy to see you.' },
        wrong: { text: 'mariyaadhaiya pesu kannu.', audio: 'entrance_t4_wrong.mp3', ta: 'மரியாதையா பேசு கண்ணு.', en: 'Speak respectfully, dear.' } },
      { paati: 'idhu unakkaaga seithen, saapdu kannu.', audio: 'entrance_t5.mp3', ta: 'இது உனக்காக செய்தேன், சாப்டு கண்ணு.', en: 'I made this for you. Eat, dear.',
        options: [
          { text: 'romba nandri paati, neenga enakkaaga seitheenga, santhosham.', correct: true, keys: ['nandri', 'neenga', 'santhosham.'], why: '‘nandri’ with ‘neenga’ thanks her respectfully, and ‘santhosham’ shares your joy.', ta: 'ரொம்ப நன்றி பாட்டி, நீங்க எனக்காக செய்தீங்க, சந்தோஷம்.', en: 'Thank you so much, Paati. You made it for me, I’m so happy.' },
          { text: 'thanks da paati, super.', keys: ['thanks', 'da'], why: '‘thanks da’ is for friends. Thank her warmly and respectfully.', ta: 'தேங்க்ஸ் டா பாட்டி, சூப்பர்.', en: 'Thanks mate Paati, super.' },
          { text: 'enakku pidikkaadhu.', keys: ['pidikkaadhu.'], why: 'That’s rude to someone who made food for you. Be grateful first.', ta: 'எனக்கு பிடிக்காது.', en: 'I don’t like it.' }
        ],
        right: { text: 'santhosham kannu! nalla saapdu.', audio: 'entrance_t5_right.mp3', ta: 'சந்தோஷம் கண்ணு! நல்லா சாப்டு.', en: 'I’m so happy, dear! Eat well.' },
        wrong: { text: 'aiyo… kashtappattu senjen kannu.', audio: 'entrance_t5_wrong.mp3', ta: 'ஐயோ… கஷ்டப்பட்டு செஞ்சேன் கண்ணு.', en: 'Oh… I worked hard to make it, dear.' } }
    ];
    /* Paste each uploaded file’s asset link here, e.g. 'entrance_t1.mp3': '/_blob/…'. Missing files play nothing. */
    const AUDIO_URLS = AUDIO;
    /* pre-warm Paati's five greeting lines once the backend health check is
       done (ENTRANCE lives here, so the warm must too). Failed renders
       aren't cached and retry on demand. */
    if (!this._warmed && this._checkDone) {
      this._warmed = true;
      if (Speech.backendUp) ENTRANCE.forEach((t) => Speech.warm(t.ta, null));
    }
    /* Hearts carry between rooms through this browser key. The kitchen and living room boards read it. */
    const HEART_KEY = 'tamil-rpg:paati-hearts';
    const saveHearts = (n) => { try { const v = JSON.stringify({ hearts: n, from: 'entrance', at: Date.now() }); window.localStorage.setItem(HEART_KEY, v); window.localStorage.setItem('tamil-rpg:hearts:entrance', v); } catch (e) { /* storage unavailable */ } };

    /* The front page saves the dialect and mode here; the report card reads each room's scores. */
    const SETTINGS = (() => { try { return JSON.parse(window.localStorage.getItem('tamil-rpg:settings') || '{}') || {}; } catch (e) { return {}; } })();
    const HARD = SETTINGS.mode === 'hard';
    const STATS_KEY = 'tamil-rpg:stats:entrance';
    const saveStats = (first, mistakes) => { try { window.localStorage.setItem(STATS_KEY, JSON.stringify({ first: first, total: 5, mistakes: mistakes, at: Date.now() })); window.localStorage.setItem('tamil-rpg:last-room', STATS_KEY.split(':').pop()); } catch (e) { /* storage unavailable */ } };
    const heartsOn = this.props.heartsOn ?? true;
    const START = Math.max(1, Math.min(5, this.props.startHearts ?? 3));
    const shuffled = () => { const a = [0, 1, 2]; for (let i = 2; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    const S = Object.assign({ screen: 'intro', t: 0, picked: null, order: [[1, 0, 2], [2, 0, 1], [0, 2, 1], [1, 2, 0], [2, 1, 0]], hearts: START, fx: null, fxN: 0, firstTry: {}, tried: {}, mistakes: [], showTa: !HARD, showEn: !HARD, apologyUsed: false, apologyFailed: false, typed: '', via: 'tap', heard: '', matchPct: 0, heardNote: null, voice: 'idle' }, this.state || {});
    const set = (o) => this.setState(o);
    /* Fit the 960×600 game to whatever window or frame it is shown in. */
    if (!this._rootRef) {
      this._measure = () => {
        const el = this._el;
        if (!el) return;
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        const sc = Math.min(w / 960, h / 600);
        const portrait = h > w && w < 700;
        const st = this.state || {};
        if (Math.abs((st.scale || 0) - sc) > 0.002 || !!st.portrait !== portrait) this.setState({ scale: sc, portrait: portrait });
      };
      this._rootRef = (el) => {
        try { if (this._ro) { this._ro.disconnect(); this._ro = null; } } catch (e) { /* ignore */ }
        this._el = el;
        if (!el) return;
        if (typeof ResizeObserver !== 'undefined') { this._ro = new ResizeObserver(() => this._measure()); this._ro.observe(el); }
        setTimeout(() => this._measure(), 0);
      };
    }

    /* Paati speaks: Eleven v3 TTS from the speech backend when it is up,
       otherwise that line's own uploaded mp3 — nothing else, so no stray
       recordings leak in. Renders are cached + pre-warmed (see componentDidMount),
       so a line plays the moment its turn starts. A generation counter cancels
       stale lines when the player moves faster than the network. Music dims
       while she talks and rises again when the line ends. */
    const duckSpeech = (on) => SFX.duck("speech", on);
    const speak = (text, file, mood) => {
      const gen = (this._speakGen = (this._speakGen || 0) + 1);
      try {
        if (this._audio) { try { this._audio.pause(); } catch (e) { /* ignore */ } this._audio = null; }
        duckSpeech(true);
        const finish = () => { if (gen === this._speakGen) { try { duckSpeech(false); } catch (e) { /* ignore */ } } };
        const playEl = (el) => {
          if (!el || gen !== this._speakGen) { finish(); return; }
          try { el.pause(); el.currentTime = 0; } catch (e) { /* ignore */ }
          el.onended = finish; el.onerror = finish;
          this._audio = el;
          el.play().catch(finish);
        };
        const playOwnMp3 = () => {
          const url = AUDIO_URLS[file] || (file === 'entrance_t1.mp3' ? '/audio/backup-paatri-entrance.mp3' : '');
          if (!url) { finish(); return; }
          playEl(new Audio(url));
        };
        const line = (text || '').trim();
        if (line && Speech.backendUp) {
          Speech.ttsCached(line, mood || null).then((el) => {
            if (gen !== this._speakGen) return;
            if (el) playEl(el); else playOwnMp3();
          }).catch(() => { if (gen === this._speakGen) playOwnMp3(); });
        } else {
          playOwnMp3();
        }
      } catch (e) { try { duckSpeech(false); } catch (e2) { /* ignore */ } }
    };

    const W = 40, H = 25;
    const g = [];
    for (let y = 0; y < H; y++) g.push(new Array(W).fill('r'));
    const f = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (j >= 0 && j < H && i >= 0 && i < W) g[j][i] = c; };
    f(0, 0, 13, 25, 'g'); f(0, 0, 13, 1, 'c');
    f(2, 5, 4, 2, 't');
    f(7, 6, 5, 5, 'K');
    f(12, 8, 1, 7, 'P'); f(11, 11, 1, 4, 'P');
    f(13, 0, 1, 25, 'v'); f(13, 7, 1, 3, 'D');
    f(14, 0, 26, 1, 'W'); f(14, 1, 26, 1, 'w'); f(14, 2, 26, 1, 'k');
    g[1][18] = 'C'; g[1][21] = 'o'; g[1][24] = 'f'; g[1][26] = 'f';
    f(27, 0, 3, 3, 'O');
    f(39, 3, 1, 22, 'v');
    f(14, 7, 2, 3, 'm');
    f(14, 11, 3, 2, 'R');
    f(22, 7, 2, 2, 'E');
    f(16, 10, 2, 1, 'T');
    f(25, 9, 10, 4, 'u');
    const px = (c, x, y, w, h) => 'linear-gradient(' + c + ',' + c + ') ' + x + 'px ' + y + 'px/' + w + 'px ' + h + 'px no-repeat';
    const floor = px('#a4452f', 23, 0, 1, 24) + ',' + px('#a4452f', 0, 23, 24, 1) + ',#b4533c';
    const P = {
      'r': floor,
      'g': px('#cfae7c', 6, 9, 3, 3) + ',' + px('#cfae7c', 16, 17, 3, 3) + ',#dcbc8c',
      'c': px('#b9a68a', 0, 18, 24, 6) + ',#efe4cf',
      't': px('#8f8a80', 0, 20, 24, 4) + ',' + px('#cfcac0', 0, 0, 24, 3) + ',#b5b0a6',
      'K': 'radial-gradient(circle,#fff8ec 0 2px,transparent 2px) 0 0/8px 8px,linear-gradient(45deg,transparent 46%,rgba(255,248,236,.85) 46% 54%,transparent 54%) 0 0/24px 24px,linear-gradient(-45deg,transparent 46%,rgba(255,248,236,.85) 46% 54%,transparent 54%) 0 0/24px 24px,#c9a46f',
      'P': px('#b8b0a2', 3, 3, 18, 18) + ',' + px('#9c9486', 3, 19, 18, 2) + ',#dcbc8c',
      'v': px('#c99a6b', 18, 0, 6, 24) + ',#5b3a22',
      'D': px('#3f8a3e', 0, 2, 4, 4) + ',' + px('#3f8a3e', 0, 14, 4, 4) + ',' + px('#e0a43a', 8, 0, 4, 24) + ',#7a4a2a',
      'W': px('#c99a6b', 0, 20, 24, 4) + ',#5b3a22',
      'w': '#f3e6cf',
      'k': px('#8a5a3a', 0, 14, 24, 10) + ',#f3e6cf',
      'C': px('#c2185b', 4, 3, 16, 5) + ',' + px('#fff6e5', 4, 8, 16, 12) + ',' + px('#1d1d1d', 7, 11, 2, 2) + ',' + px('#1d1d1d', 12, 11, 2, 2) + ',' + px('#1d1d1d', 7, 15, 2, 2) + ',#f3e6cf',
      'o': 'radial-gradient(circle,#fff6e5 0 6px,#5b3a22 6px 8px,transparent 8px),#f3e6cf',
      'f': px('#e9d3a8', 6, 6, 12, 10) + ',' + px('#6b3f22', 4, 4, 16, 14) + ',#f3e6cf',
      'O': 'repeating-linear-gradient(90deg,#c2185b 0 6px,#f2b705 6px 8px,#2e7d32 8px 12px)',
      'm': 'repeating-linear-gradient(0deg,#6b8f71 0 3px,#557a5c 3px 6px)',
      'R': px('#4a2a16', 0, 10, 24, 3) + ',' + px('#4a2a16', 0, 21, 24, 3) + ',#9c6236',
      'E': px('#5b3a22', 0, 0, 3, 24) + ',' + px('#5b3a22', 21, 0, 3, 24) + ',repeating-linear-gradient(0deg,#2f7fbf 0 4px,#f2f2f2 4px 8px)',
      'T': px('#4a2a16', 0, 20, 24, 4) + ',#8a5a3a',
      'u': px('#e9c46a', 0, 0, 24, 2) + ',' + px('#e9c46a', 0, 22, 24, 2) + ',' + px('#c2185b', 9, 9, 6, 6) + ',' + px('#e9c46a', 11, 4, 2, 4) + ',' + px('#e9c46a', 11, 16, 2, 4) + ',#2f6f7a'
    };
    const tiles = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = g[y][x];
      const alt = c === 'r' && (x * 31 + y * 17) % 5 === 0;
      tiles.push({ bg: alt ? px('#a4452f', 23, 0, 1, 24) + ',' + px('#a4452f', 0, 23, 24, 1) + ',#ad4d37' : (P[c] || floor) });
    }

    const toPx = (rows, pal) => rows.join('').split('').map((ch) => ({ c: ch === '.' ? 'transparent' : (pal[ch] || '#ff00ff') }));
    const sp = (rows, pal, x, y, size, cls) => ({ left: x, top: y, cols: rows[0].length, px: size, cls: cls || '', pixels: toPx(rows, pal) });
    const BASE = ["...oooooo...", "..ohhhhhho..", ".ohhhhhhhho.", ".ohhsssshho.", ".ohsessesho.", "..ossmmsso..", "...oSSSSo...", "..obccccbo..", ".osbccCcbso.", ".osbcCCcbso.", ".osbccccbso.", "..oppppppo..", "..oppPPppo..", "..oppo.oppo.", "..oppo.oppo.", "..offo.offo."];
    const SAREE = {"neutral": ["...oooooo...", "..ohhhhhhoj.", ".ohhhHHhhhoj", ".ohhsssshho.", ".ohsskkssho.", ".ossessesso.", ".oEssmmssEo.", "..oSssssSo..", ".oBBBSSgrrro", "oBBBBBgrrrro", "osBBBgrrrrso", "osrrgrrrrrso", ".orrgrrRrro.", ".orgrrrRrro.", ".oggggggggo.", "..of....fo.."], "smile": ["...oooooo...", "..ohhhhhhoj.", ".ohhhHHhhhoj", ".ohhsssshho.", ".ohsskkssho.", ".ossessesso.", ".oEsmmmmsEo.", "..oSssssSo..", ".oBBBSSgrrro", "oBBBBBgrrrro", "osBBBgrrrrso", "osrrgrrrrrso", ".orrgrrRrro.", ".orgrrrRrro.", ".oggggggggo.", "..of....fo.."], "frown": ["...oooooo...", "..ohhhhhhoj.", ".ohhhHHhhhoj", ".ohhsssshho.", ".ohsskkssho.", ".ossessesso.", ".oEssssssEo.", "..oSssssSo..", ".oBBBSSgrrro", "oBBBBBgrrrro", "osBBBgrrrrso", "osrrgrrrrrso", ".orrgrrRrro.", ".orgrrrRrro.", ".oggggggggo.", "..of....fo.."]};
    const SAREE_BODY = [];
    const paatiPal = {"o": "#2a1810", "h": "#e2ded6", "H": "#b3ada3", "j": "#ffffff", "s": "#b87a4b", "S": "#96603a", "e": "#1d1d1d", "k": "#d0103f", "m": "#7a2a1a", "E": "#f2b705", "B": "#2e7d32", "r": "#c2185b", "R": "#94104a", "g": "#f2b705", "f": "#7a4a2a"};
    const playerPal = {"o": "#2a1810", "h": "#2b1a10", "s": "#c68a5e", "S": "#a8703f", "e": "#1d1d1d", "m": "#7a3a2a", "c": "#e76f51", "C": "#c4553a", "b": "#2a9d8f", "p": "#264653", "P": "#1b333d", "f": "#f2efe6"};
    const thathaPal = {"o": "#2a1810", "h": "#f0f0f0", "s": "#8d5a3b", "S": "#704528", "g": "#6b5a4a", "e": "#1d1d1d", "m": "#f0f0f0", "w": "#f5f2ea", "W": "#d9d3c4", "v": "#fbf8ef", "V": "#d4a017", "f": "#5b3a22"};
    const THATHA_ROWS = ["...oooooo...", "..osssssso..", ".ohssssssho.", ".ohsssssssho", ".ohgegsgegho", "..osmmmmso..", "...oSSSSo...", "..owwwwwwo..", ".oswwWwwwso.", ".oswwWwwwso.", ".oswwwwwwso.", "..ovvvvvvo..", "..ovvvvvvo..", "..ovvvvvvo..", "..oVVVVVVo..", "..of....fo.."];
    const potPal = {};
    /* Paati’s portrait: 16×18 pixels, one full face per expression. */
    const FACES = {"neutral": ["......xxxx......", "....xxhhhhxxj...", "...xhhhhhhhhxj..", "..xhhhhHHhhhhxjJ", "..xhhsssssshhx..", "..xhsssssssshx..", "..xhsbbkkbbshx..", "..xhswessweshx..", "..xhseesseeshx..", "..xsscsSSscssx..", "..EsssmssmsssE..", "..ESsssmmsssSE..", "...xSssssssSx...", "....xxSssSxx....", ".xBBBBSssSorrrx.", "xBBBBBBSSorrrrrx", "xBBBBBBBorrrrrrx", "xrrrrrrorrrrrrrx"], "smile": ["......xxxx......", "....xxhhhhxxj...", "...xhhhhhhhhxj..", "..xhhhhHHhhhhxjJ", "..xhhsssssshhx..", "..xhsssssssshx..", "..xhsbbkkbbshx..", "..xhsesssseshx..", "..xhesessesehx..", "..xssCsSSsCssx..", "..EsssmssmsssE..", "..ESssmttmssSE..", "...xSssmmssSx...", "....xxSssSxx....", ".xBBBBSssSorrrx.", "xBBBBBBSSorrrrrx", "xBBBBBBBorrrrrrx", "xrrrrrrorrrrrrrx"], "frown": ["......xxxx......", "....xxhhhhxxj...", "...xhhhhhhhhxj..", "..xhhhhHHhhhhxjJ", "..xhhsssssshhx..", "..xhssbssbsshx..", "..xhsbskksbshx..", "..xhsSSssSSshx..", "..xhseesseeshx..", "..xssssssssssx..", "..EssssmmssssE..", "..ESsssmmsssSE..", "...xSsmssmsSx...", "....xxSssSxx....", ".xBBBBSssSorrrx.", "xBBBBBBSSorrrrrx", "xBBBBBBBorrrrrrx", "xrrrrrrorrrrrrrx"]};
    const facePal = {"x": "#3a2216", "h": "#dcd8d0", "H": "#aea79c", "j": "#ffffff", "J": "#6fae5a", "s": "#b87a4b", "S": "#97603a", "c": "#d98a70", "C": "#e9848c", "e": "#2a1a14", "w": "#ffffff", "b": "#8a847c", "k": "#d0103f", "m": "#7a2a1a", "t": "#e86a6a", "E": "#f2b705", "B": "#2e7d32", "r": "#c2185b", "o": "#f2b705"};
    const faceRows = (ex) => FACES[ex] || FACES.neutral;

    const POS = [
      { paati: [348, 156], player: [270, 270] },
      { paati: [348, 156], player: [288, 180] },
      { paati: [348, 156], player: [288, 180] },
      { paati: [600, 180], player: [480, 204] },
      { paati: [420, 192], player: [480, 204] }
    ];
    const END = { paati: [420, 192], player: [480, 204] };

    const isPlay = S.screen === 'play';
    const isEnd = S.screen === 'end';
    const T = Math.min(S.t, 4);
    const turn = ENTRANCE[T];
    const opt = isPlay && S.picked !== null ? turn.options[S.picked] : null;
    const isRight = !!(opt && opt.correct);
    const isWrong = !!(opt && !opt.correct);
    const re = opt ? (isRight ? turn.right : turn.wrong) : { text: '', ta: '', en: '', audio: '' };

    const changeHearts = (d) => {
      if (!heartsOn) return { hearts: S.hearts, fx: null };
      const nh = Math.max(0, Math.min(5, S.hearts + d));
      return { hearts: nh, fx: nh > S.hearts ? { type: 'gain', idx: nh - 1 } : nh < S.hearts ? { type: 'loss', idx: nh } : null };
    };
    /* Answer by option index. `via` records how the player answered: tap, type or voice. */
    const answer = (idx, via, heard, pct) => {
      const o = turn.options[idx];
      const tried = Object.assign({}, S.tried); const firstTry = Object.assign({}, S.firstTry);
      if (!tried[S.t]) firstTry[S.t] = !!o.correct;
      tried[S.t] = true;
      const hc = changeHearts(o.correct ? 1 : -1);
      if (heartsOn) saveHearts(hc.hearts);
      const mistakes = o.correct ? S.mistakes : S.mistakes.concat([{ text: o.text, why: o.why }]);
      /* SFX: bonus + happy on a kind answer, fail + sad on a careless one;
         reach 0 hearts → the arcade game-over sting and Paati falls silent. */
      /* One clip per event — the folder ships a single bonus (happy) jingle
         and a single fail (sad) buzzer, so no doubled/overlapping plays. */
      if (o.correct) { SFX.play("bonus"); }
      else { SFX.play("fail"); }
      if (heartsOn && hc.hearts <= 0) { SFX.play("game-over"); SFX.stopBgm(); }
      /* collect the turn for the end-of-room feedback sheet */
      try {
        const rec = (this._turnRecords || [])[S.t];
        if (rec) {
          rec.pickedText = o.text; rec.pickedTa = o.ta || ''; rec.correct = !!o.correct;
          rec.via = via; rec.heard = heard || ''; rec.matchPct = pct || 0;
          rec.draft = this._draft || null;
          rec.mistakes = rec.mistakes.concat((S.mistakes || []).slice(this._mistakesSeen || 0));
        }
        this._mistakesSeen = (S.mistakes || []).length + (o.correct ? 0 : 1);
      } catch (e) { /* ignore */ }
      speak((o.correct ? turn.right : turn.wrong).ta, (o.correct ? turn.right : turn.wrong).audio, o.correct ? 'happy' : 'sad');
      set({ picked: idx, tried: tried, firstTry: firstTry, mistakes: mistakes, hearts: hc.hearts, fx: hc.fx, fxN: S.fxN + 1, via: via, heard: heard || '', matchPct: pct || 0, typed: '', heardNote: null, voice: 'idle' });
    };
    const pick = (display) => () => answer(S.order[S.t][display], 'tap');

    /* Fuzzy match free text (typed or recognised speech, Tanglish or Tamil script) to the closest option. */
    const norm = (s) => (s || '').toLowerCase().replace(/[.,!?‘’“”'"…\-]/g, ' ').replace(/\s+/g, ' ').trim();
    const grams = (s) => { const t = norm(s).replace(/ /g, ''); const out = {}; for (let i = 0; i < t.length - 1; i++) { const k = t.slice(i, i + 2); out[k] = (out[k] || 0) + 1; } return out; };
    const dice = (a, b) => { const A = grams(a), B = grams(b); let inter = 0, na = 0, nb = 0; Object.keys(A).forEach((k) => { na += A[k]; if (B[k]) inter += Math.min(A[k], B[k]); }); Object.keys(B).forEach((k) => { nb += B[k]; }); return na + nb ? (2 * inter) / (na + nb) : 0; };
    const bestMatch = (alts) => {
      let best = { idx: -1, score: 0, heard: alts[0] || '' };
      alts.forEach((h) => turn.options.forEach((o, idx) => { const sc = Math.max(dice(h, o.text), dice(h, o.ta)); if (sc > best.score) best = { idx: idx, score: sc, heard: h }; }));
      return best;
    };
    const resolveFree = (alts, via) => {
      const m = bestMatch(alts.filter((a) => norm(a)));
      if (m.idx >= 0 && m.score >= 0.45) answer(m.idx, via, m.heard, Math.round(m.score * 100));
      else set({ heardNote: { t: (via === 'voice' ? 'We heard “' + m.heard + '”, but it doesn’t match any of Paati’s answers. ' : 'That doesn’t match any of Paati’s answers yet. ') + 'Try again, or tap one below.', c: '#a32d2d' }, voice: 'idle' });
    };
    const onType = (e) => set({ typed: e && e.target ? e.target.value : '', heardNote: null });
    const submitTyped = () => { if (norm(S.typed)) resolveFree([S.typed], 'type'); else set({ heardNote: { t: 'Type an answer first, or tap one below.', c: '#ffb3bd' } }); };
    const onTypeKey = (e) => { if (e && e.key === 'Enter') { e.preventDefault(); submitTyped(); } };

    const listen = () => {
      if (!(isPlay && S.picked === null)) return;
      if (S.voice === 'listening') { try { this._rec && this._rec.stop(); } catch (e) { /* ignore */ } set({ voice: 'idle' }); return; }
      /* Scribe pipeline (speech backend on :8787): record with MediaRecorder, batch-STT the clip,
         then fuzzy-match the transcript (Tamil script + Tanglish transliteration) to the closest option.
         Music dims while the mic is live. Falls back to browser SpeechRecognition offline. */
      if (Speech.backendUp || true) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'audio/ogg;codecs=opus' : undefined;
          const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
          const chunks = [];
          rec.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
          rec.onstop = async () => {
            stream.getTracks().forEach((t) => t.stop());
            SFX.duck('mic', false);
            if (this.state && this.state.voice === 'listening') set({ voice: 'idle' });
            try {
              const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
              const expected = turn.options.filter((o) => o.correct).map((o) => o.text)[0] || '';
              set({ voice: 'idle', heardNote: null });
              const draft = await Speech.stt(blob, expected);
              this._draft = draft || null;
              /* collect the spoken turn for the feedback sheet even when it doesn't match */
              try {
                const rec0 = (this._turnRecords || [])[S.t];
                if (rec0) { rec0.via = 'voice'; rec0.heard = (draft && (draft.transcript_transliterated || draft.transcript_tamil_script)) || ''; rec0.draft = draft || null; }
              } catch (e) { /* ignore */ }
              if (!draft) throw new Error('no draft');
              /* Mixed-language rule: any English word spoken in the answer loses a heart —
                 Paati shows what she heard with the English words highlighted. */
              const engWords = (draft.word_analysis || []).filter((w) => w && (w.lang === 'eng' || w.lang === 'en' || w.status === 'english') && w.word);
              if (engWords.length) {
                const heard = draft.transcript_transliterated || draft.transcript_tamil_script || '';
                SFX.play('fail');
                const hc = changeHearts(-1);
                if (heartsOn) saveHearts(hc.hearts);
                if (heartsOn && hc.hearts <= 0) { SFX.play('game-over'); SFX.stopBgm(); }
                try {
                  const rec0 = (this._turnRecords || [])[S.t];
                  if (rec0) { rec0.mistakes = rec0.mistakes.concat([{ text: heard, why: 'Mixed English into the Tamil answer — speak full Tamil.' }]); rec0.correct = false; }
                  this._mistakesSeen = (S.mistakes || []).length + 1;
                } catch (e) { /* ignore */ }
                set({
                  hearts: hc.hearts, fx: hc.fx, fxN: S.fxN + 1,
                  mistakes: S.mistakes.concat([{ text: heard, why: 'Mixed English into the Tamil answer — speak full Tamil.' }]),
                  voice: 'idle', typed: '',
                  heardNote: { t: 'You said: “' + heard + '” · Paati heard English in your Tamil (' + engWords.map((w) => w.word).join(', ') + '). Speak full Tamil and try again.', c: '#a32d2d' },
                });
                return;
              }
              const alts = [draft.transcript_tamil_script, draft.transcript_transliterated].filter(Boolean);
              resolveFree(alts, 'voice');
            } catch (e) {
              /* backend hiccup — fall back to the browser recogniser next tap */
              Speech.backendUp = false;
              set({ heardNote: { t: 'Speech service hiccup. Tap the mic and try again.', c: '#a32d2d' }, voice: 'error' });
            }
          };
          rec.onerror = () => { stream.getTracks().forEach((t) => t.stop()); SFX.duck('mic', false); set({ voice: 'error' }); };
          this._rec = rec;
          rec.start();
          SFX.duck('mic', true);
          set({ voice: 'listening', heardNote: null });
        }).catch((e) => set({ voice: e && e.name === 'NotAllowedError' ? 'blocked' : 'error' }));
        return;
      }
    };

    const reshuffleTurn = (t) => { const order = S.order.slice(); order[t] = shuffled(); return order; };
    const freshOrders = () => [shuffled(), shuffled(), shuffled(), shuffled(), shuffled()];
    const reset = { t: 0, picked: null, hearts: START, fx: null, firstTry: {}, tried: {}, mistakes: [], apologyUsed: false, apologyFailed: false, typed: '', heardNote: null, voice: 'idle' };
    /* fresh turn records for the end-of-room feedback sheet */
    const freshTurnRecords = () => ENTRANCE.map((t, i) => ({ turn: i, line: t.paati, lineTa: t.ta, pickedText: '', pickedTa: '', correct: null, firstTry: false, via: 'tap', heard: '', matchPct: 0, draft: null, mistakes: [] }));
    /* The visit begins: doorbell → the door swings open → Paati greets you.
       The click also unlocks audio and starts the background music. */
    const start = () => {
      SFX.prime();
      SFX.resumeBgm();
      clearFeedback();
      this._draft = null; this._mistakesSeen = 0; this._turnRecords = freshTurnRecords();
      this._speakGen = 0;
      if (heartsOn) saveHearts(START);
      set(Object.assign({ screen: 'play', order: freshOrders() }, reset));
      try {
        /* doorbell → the door swings open → Paati greets you. Her greeting's
           TTS was pre-warmed on mount (and kicked again here), so it plays as
           soon as the door is open instead of waiting on the network. */
        Speech.warm(ENTRANCE[0].ta, null);
        Speech.warm(ENTRANCE[0].right.ta, 'happy');
        Speech.warm(ENTRANCE[0].wrong.ta, 'sad');
        SFX.play('doorbell');
        setTimeout(() => { try { SFX.play('door-open'); } catch (e) { /* ignore */ } }, 900);
        setTimeout(() => { speak(ENTRANCE[0].ta, ENTRANCE[0].audio, null); }, 1600);
      } catch (e) { speak(ENTRANCE[0].ta, ENTRANCE[0].audio, null); }
    };
    const replay = () => { SFX.resumeBgm(); this._turnRecords = freshTurnRecords(); this._mistakesSeen = 0; this._draft = null; set(Object.assign({ screen: 'intro' }, reset)); };
    const retry = () => set({ picked: null, order: reshuffleTurn(S.t), typed: '', heardNote: null, voice: 'idle' });
    const cont = () => {
      if (heartsOn && S.hearts <= 0) { set({ screen: 'broken' }); return; }
      if (S.t < 4) {
        const nt = ENTRANCE[S.t + 1];
        /* pre-warm the next turn's lines so nothing waits on the network */
        Speech.warm(nt.ta, null); Speech.warm(nt.right.ta, 'happy'); Speech.warm(nt.wrong.ta, 'sad');
        speak(nt.ta, nt.audio, null);
        set({ t: S.t + 1, picked: null, typed: '', heardNote: null, voice: 'idle' });
      }
      else {
        if (heartsOn) saveHearts(S.hearts);
        const firstCount = Object.keys(S.firstTry).filter((k) => S.firstTry[k]).length;
        saveStats(firstCount, S.mistakes);
        try { saveFeedback({ turns: this._turnRecords || [], hearts: S.hearts, firstTryCount: firstCount, total: 5, savedAt: Date.now() }); } catch (e) { /* ignore */ }
        /* the visit is complete: bg music stops, the end-card music plays */
        SFX.stopBgm();
        SFX.play('end-screen', { loop: true });
        set({ screen: 'end', picked: null });
      }
    };
    const replayLine = () => speak(turn.ta, turn.audio, null);
    const replayReaction = () => speak(re.ta, re.audio, isRight ? 'happy' : 'sad');
    const apologiseRight = () => { const nh = Math.max(1, Math.min(5, S.hearts + 1)); saveHearts(nh); set({ screen: 'play', picked: null, order: reshuffleTurn(S.t), apologyUsed: true, hearts: nh, fx: { type: 'gain', idx: 0 }, fxN: S.fxN + 1 }); };
    const apologiseWrong = () => set({ apologyUsed: true, apologyFailed: true });
    const toggleTa = () => set({ showTa: !S.showTa });
    const toggleEn = () => set({ showEn: !S.showEn });

    const pos = isEnd ? END : POS[T];
    const paatiEx = isRight ? 'smile' : isWrong ? 'frown' : isEnd ? 'smile' : 'neutral';
    const paatiCls = isRight ? 'hop' : isWrong ? 'shake' : 'breathe';
    const pw = { x: pos.paati[0] - 6, y: pos.paati[1] - 12, cls: paatiCls, pixels: toPx(SAREE[paatiEx], Object.assign({}, paatiPal, potPal)).concat(toPx(SAREE_BODY, paatiPal)) };
    const thathaHappy = isRight && S.t === 3;
    const people = [
      { left: pos.player[0] - 6, top: pos.player[1] - 12, cls: '', pixels: toPx(BASE, playerPal) },
      { left: 528, top: 154, cls: thathaHappy ? 'hop' : 'breathe', pixels: toPx(THATHA_ROWS, thathaPal) }
    ];
    const props = [
      sp(['..gg..', '.gggg.', 'g.gg.g', '..gg..', 'wwwwww', 'wkrrkw', 'wrrrrw', 'wwwwww'], { g: '#3f8a3e', w: '#efe4cf', r: '#c8553d', k: '#fff8ec' }, 60, 224, 4, 'sway'),
      sp(['.bbbb.', '..ll..', '.bbbb.', 'bbllbb', 'bbbbbb', '.bbbb.'], { b: '#d4a017', l: '#ffd166' }, 296, 116, 3, ''),
      sp(['b.b', 'b.b', 'b.b'], { b: '#7a4a2a' }, 420, 290, 3, ''),
      sp(['b.b', 'b.b', 'b.b'], { b: '#2b2b3b' }, 440, 294, 3, ''),
      sp(['..kk..', '.kwkk.', 'kkkkkb', '.kkkk.', '..y.y.'], { k: '#2a2a35', w: '#ffffff', b: '#d9a441', y: '#d9a441' }, 276, 4, 3, 'peck'),
      sp(['.o..o.....', 'oooooo....', 'oeodoooooo', 'ooooddoooo', '.oooooooo.'], { o: '#e8913a', d: '#c06a1e', e: '#3a1a0a' }, 64, 128, 3, 'breathe'),
      sp(['ttt'], { t: '#c06a1e' }, 94, 137, 3, 'tailwag'),
      sp(['pp.pp', '.pkp.', 'pp.pp'], { p: '#ffd166', k: '#3a2a1a' }, 40, 196, 3, 'flutter'),
      sp(['pp.pp', '.pkp.', 'pp.pp'], { p: '#f4a6c8', k: '#3a2a1a' }, 196, 264, 3, 'flutter2'),
      sp(Array.from({ length: 28 }, (_, i) => ['.y.', 'yoy', '.y.', '.g.'][i % 4]), { y: '#ffc21a', o: '#ff7b00', g: '#3f8a3e' }, 309, 160, 3, ''),
      sp(['.y.'.repeat(8), 'yoy'.repeat(8), '.y.'.repeat(8), '.g.'.repeat(8)], { y: '#ffc21a', o: '#ff7b00', g: '#3f8a3e' }, 648, 62, 3, ''),
      sp(['..g..g..', '.ggggg..', 'gggGggg.', '.gGggGg.', '..gggg..', '..pppp..', '..pPPp..', '...pp...'], { g: '#4f9a45', G: '#7cc16a', p: '#c8553d', P: '#a8432f' }, 668, 150, 4, 'sway'),
      sp(['..f..', '..b..', '.bbb.', '..b..', '..b..', '..b..', '.bbb.', 'bbbbb'], { f: '#ffd166', b: '#d4a017' }, 372, 72, 3, '')
    ];
    const decor = [
      { cls: 'glowp', x: 336, y: 168, w: 72, h: 72, c: 'rgba(255,224,160,0.16)', d: '0' },
      { cls: 'glowp', x: 408, y: 180, w: 48, h: 48, c: 'rgba(255,224,160,0.12)', d: '0.4' },
      { cls: 'flick', x: 378, y: 66, w: 3, h: 6, c: '#ffd166', d: '0' },
      { cls: 'drift', x: 352, y: 222, w: 3, h: 3, c: 'rgba(255,246,220,0.9)', d: '0' },
      { cls: 'drift', x: 384, y: 204, w: 3, h: 3, c: 'rgba(255,246,220,0.9)', d: '1.3' },
      { cls: 'drift', x: 414, y: 232, w: 2, h: 2, c: 'rgba(255,246,220,0.9)', d: '2.6' },
      { cls: 'glowp', x: 600, y: 216, w: 240, h: 96, c: 'rgba(255,236,190,0.06)', d: '1' }
    ];
    /* the right of the hallway: almirah, rug, urli, parrot, radio, plants */
    const ALMIRAH = ['dddddddddd', 'dGGGGdGGGd', 'dGggGdGggd', 'dGggGdGggd', 'dGggGdGggd', 'dGggkdkggd', 'dGggGdGggd', 'dGggGdGggd', 'dGggGdGggd', 'dGggGdGggd', 'dGGGGdGGGd', 'dddddddddd', '.d......d.'];
    props.push(sp(['.rrrrrrrr.', 'rryrryrryr', 'rrrrrrrrrr'], { r: '#3d5a80', y: '#98c1d9' }, 886, 140, 4, ''));
    props.push(sp(ALMIRAH, { d: '#5c6670', G: '#b8c2cc', g: '#8d99a6', k: '#d4a017' }, 886, 152, 4, ''));
    props.push(sp(['.bbbbbb.', 'bwrwywrb', '.bbbbbb.', '..bbbb..'], { b: '#d4a017', w: '#7fc8e8', r: '#e63957', y: '#ffd166' }, 696, 246, 4, ''));
    props.push(sp(['...k...', '..kkk..', '.kkkkk.', 'k.k.k.k', 'k.kgk.k', 'k.kgk.k', 'k.krk.k', 'kkkkkkk'], { k: '#c9a227', g: '#3fbf4a', r: '#e63946' }, 800, 150, 3, 'sway'));
    props.push(sp(['wwwwww', 'w....w', 'w....w'], { w: '#8a5a3a' }, 765, 294, 3, ''));
    props.push(sp(['.....k..', '....k...', 'rrrrrrrr', 'rSSrkkkr', 'rrrrrrrr'], { r: '#7a3a2a', S: '#d9b38c', k: '#1d1d1d' }, 762, 279, 3, ''));
    props.push(sp(['.kk', '.k.', 'kk.'], { k: '#fff6e5' }, 788, 266, 2, 'drift'));
    props.push(sp(['.kk', '.k.', 'kk.'], { k: '#ffd166' }, 774, 262, 2, 'drift2'));
    props.push(sp(['..g..g..', '.ggggg..', 'gggGggg.', '.gGggGg.', '..gggg..', '..pppp..', '..pPPp..', '...pp...'], { g: '#4f9a45', G: '#7cc16a', p: '#c8553d', P: '#a8432f' }, 846, 254, 4, 'sway'));
    props.push(sp(['k.', 'k.', 'k.', 'k.', 'k.', 'kk'], { k: '#6b3f22' }, 582, 176, 3, ''));
    props.push(sp(['wwwww', 'wkkkw', 'wwwww', 'yyyyy', 'yyyyy'], { w: '#f2efe6', k: '#7a7470', y: '#e9c46a' }, 624, 284, 3, ''));
    if (S.t >= 4 || isEnd) props.push(sp(['.ssss.', 'sylyls', '.ssss.'], { s: '#d6dbe1', l: '#f2a23a', y: '#ffd166' }, 390, 236, 4, ''));
    if (S.t < 3 && !isEnd) props.push(sp(['..hh..', '.h..h.', 'ssssss', 'sllsss', 'ssssss', 'd....d'], { h: '#222222', s: '#3d5a80', l: '#98c1d9', d: '#222222' }, pos.player[0] + 26, pos.player[1] + 18, 3, ''));

    const badge = { x: pw.x + 18, y: pw.y - 22 };
    const burstCls = ['floatL', 'floatC', 'floatR', 'floatL', 'floatR', 'floatC', 'floatL'];
    const burst = burstCls.map((c, i) => ({ cls: c, x: pw.x + 2 + (i % 4) * 9, y: pw.y - 4 + (i % 3) * 6, d: (i * 0.09).toFixed(2), w: i % 2 ? 14 : 21, h: i % 2 ? 12 : 18 }));
    const portraitBurst = ['floatL', 'floatC', 'floatR'].map((c, i) => ({ cls: c, x: 56 + i * 28, y: 430, d: (0.15 + i * 0.12).toFixed(2) }));
    const endBurst = ['floatL', 'floatC', 'floatR', 'floatL', 'floatC', 'floatR', 'floatL', 'floatC', 'floatR'].map((c, i) => ({ cls: c, x: 60 + i * 56, y: 150 + (i % 2) * 20, d: (i * 0.22).toFixed(2) }));
    const hurt = { x: pw.x + 38, y: pw.y - 18 };

    const fxCls = S.fx ? (S.fx.type === 'gain' ? 'pop' : 'loss') + (S.fxN % 2 ? 'A' : 'B') : '';
    const heartRow = [0, 1, 2, 3, 4].map((i) => ({ c: i < S.hearts ? '#ff4d6d' : '#e6d3ad', hi: i < S.hearts ? '#ffd6de' : '#e6d3ad', cls: S.fx && S.fx.idx === i ? fxCls : '' }));
    const heartRowStatic = heartRow.map((h) => ({ c: h.c, hi: h.hi }));
    const introHearts = [0, 1, 2, 3, 4].map((i) => ({ c: i < START ? '#ff4d6d' : '#e6d3ad' }));
    const heartNote = S.hearts <= 1 ? { t: 'One heart left. Be careful!', c: '#c2185b' } : S.hearts >= 5 ? { t: 'Paati’s heart is full!', c: '#c2185b' } : { t: 'Hearts carry on to the next room', c: '#8a6a4a' };
    const pips = [0, 1, 2, 3, 4].map((i) => ({ c: isEnd || i < S.t ? '#2a9d8f' : i === S.t && isPlay ? '#e8ad2f' : '#e6d3ad' }));

    /* Highlight the words that make the answer right (green) or wrong (red). */
    const cleanW = (w) => w.toLowerCase().replace(/[.,!?]/g, '');
    const keySet = opt ? (opt.keys || []).map(cleanW) : [];
    const parts = opt ? opt.text.split(' ').map((w) => {
      const hit = keySet.indexOf(cleanW(w)) >= 0;
      return { w: w, c: hit ? (isRight ? '#2e6b12' : '#a32d2d') : '#3a2316', u: hit ? 'underline' : 'none', bg: hit ? (isRight ? 'rgba(59,109,17,0.16)' : 'rgba(163,45,45,0.14)') : 'transparent' };
    }) : [];
    const viaLabel = { tap: 'You', type: 'You typed', voice: 'You said' }[S.via] || 'You';
    const verdict = isRight
      ? { label: 'Why it’s right', bg: '#e9f3dc', edge: '#3b6d11', chipBg: '#3b6d11', chipInk: '#ffffff', ink: '#1f3d0c', heart: heartsOn ? (S.hearts >= 5 && S.fx === null ? 'hearts full' : '+1 heart') : '', heartBg: '#c2185b' }
      : { label: 'Why it’s wrong', bg: '#fbe4e4', edge: '#a32d2d', chipBg: '#a32d2d', chipInk: '#ffffff', ink: '#4a1212', heart: heartsOn ? '−1 heart' : '', heartBg: '#6b2b33' };

    const micStates = {
      idle: { label: 'Tap to speak', bg: '#e76f51', edge: '#5b3a22', ink: '#8a6a4a', cls: '', aria: 'Speak your answer in Tamil' },
      listening: { label: 'Listening… tap to stop', bg: '#e63946', edge: '#e8ad2f', ink: '#c8841a', cls: 'listen', aria: 'Stop listening' },
      unsupported: { label: 'Voice needs Chrome or Edge', bg: '#c9b89a', edge: '#8a6a4a', ink: '#a32d2d', cls: '', aria: 'Voice input is not supported in this browser' },
      blocked: { label: 'Allow the microphone to speak', bg: '#c9b89a', edge: '#8a6a4a', ink: '#a32d2d', cls: '', aria: 'Microphone access is blocked' },
      nospeech: { label: 'Didn’t hear you. Tap to try again', bg: '#e76f51', edge: '#5b3a22', ink: '#a32d2d', cls: '', aria: 'Speak your answer in Tamil' },
      error: { label: 'Voice hiccup. Tap to retry', bg: '#e76f51', edge: '#5b3a22', ink: '#a32d2d', cls: '', aria: 'Speak your answer in Tamil' }
    };
    const mic = Object.assign({ pressed: S.voice === 'listening' ? 'true' : 'false' }, isPlay && S.picked !== null ? { label: 'Answer given', bg: '#d9c7a3', edge: '#a8875a', ink: '#8a6a4a', cls: '', aria: 'Answer already given' } : micStates[S.voice] || micStates.idle);

    const firstCount = Object.keys(S.firstTry).filter((k) => S.firstTry[k]).length;
    const showNames = this.props.showAudioNames ?? true;
    const note = (file) => (showNames && file && !AUDIO_URLS[file] && !Speech.backendUp ? 'audio: ' + file + ' (not uploaded yet)' : '');
    const tog = (on) => ({ pressed: on ? 'true' : 'false', bg: on ? '#2a7d6f' : '#fffaf0', ink: on ? '#ffffff' : '#2a7d6f' });
    const brokenText = S.apologyFailed ? 'That made it worse: ‘da’ and ‘vidu’ brush an elder off. Paati needs some time. Start the visit again.' : S.apologyUsed ? 'You’ve already apologised once. Paati needs some time. Start the visit again.' : 'You lost all of Paati’s hearts, so she has stopped talking to you. Say sorry the right way to win one heart back and carry on.';

    return {
      tiles, props, people, pw, badge, burst, portraitBurst, endBurst, hurt, heartRow, heartRowStatic, introHearts, heartNote, pips,
      face: toPx(faceRows(paatiEx), facePal), endFace: toPx(faceRows('smile'), facePal),
      portraitCls: isRight ? 'hop' : isWrong ? 'shake' : 'breathe',
      heartsOn: heartsOn, hearts: S.hearts, heartsLabel: S.hearts + ' of 5 hearts',
      heartPanelCls: heartsOn && S.hearts <= 1 && isPlay ? 'alarm' : '',
      introHeartText: 'You start with ' + START + ' of Paati’s 5 hearts',
      showHints: (this.props.showHints ?? true) && !isEnd && !HARD,
      modeChip: HARD ? { t: 'HARD', bg: '#a32d2d', ink: '#ffffff' } : { t: 'EASY', bg: '#2a9d8f', ink: '#04241f' },
      isIntro: S.screen === 'intro', isPlay: isPlay, isEnd: isEnd, isBroken: S.screen === 'broken',
      noPick: isPlay && S.picked === null, hasPick: isPlay && S.picked !== null,
      talkLine: isPlay && S.picked === null, talkReply: isPlay && S.picked !== null,
      isRight: isRight, isWrong: isWrong, isLove: isRight && heartsOn, isHurt: isWrong && heartsOn,
      showPotHint: isPlay && S.t === 2 && S.picked === null && !HARD, decor: decor,
      rootRef: this._rootRef, stage: { s: (this.state && this.state.scale) || 1, w: Math.round(960 * ((this.state && this.state.scale) || 1)), h: Math.round(600 * ((this.state && this.state.scale) || 1)) }, showRotate: !!(this.state && this.state.portrait),
      canRetry: isWrong && (!heartsOn || S.hearts > 0), canContinue: isRight || (isWrong && heartsOn && S.hearts <= 0),
      contBtn: isWrong ? { label: 'Paati turns away…', bg: '#6b2b33', edge: '#2a0a10', ink: '#ffd6de' } : { label: S.t < 4 ? 'Continue' : 'Step inside', bg: '#f4c444', edge: '#7a4a00', ink: '#3a2316' },
      turn: turn, turnNo: T + 1, re: re, verdict: verdict,
      mine: opt ? { via: viaLabel, parts: parts, en: opt.en, why: opt.why || '', hasHeard: S.via !== 'tap' && !!S.heard, heardLine: (S.via === 'voice' ? 'Heard: “' : 'Typed: “') + S.heard + '” · closest answer, ' + S.matchPct + '% match' } : { via: '', parts: [], en: '', why: '', hasHeard: false, heardLine: '' },
      opts: S.order[T].map((idx, i) => { const o = turn.options[idx]; return { n: String(i + 1), text: o.text, ta: o.ta, en: o.en, pick: pick(i) }; }),
      typed: S.typed, onType, onTypeKey, submitTyped, listen, mic: mic,
      hasHeardNote: !!S.heardNote, heardNote: S.heardNote || { t: '', c: '' },
      showTa: S.showTa, showEn: S.showEn, taBtn: tog(S.showTa), enBtn: tog(S.showEn),
      audioNote: { line: note(turn.audio), reply: note(re.audio) },
      pipLabel: 'Turn ' + (T + 1) + ' of 5',
      endStats: 'First-try answers: ' + firstCount + ' of 5' + (heartsOn ? ' · ' + S.hearts + ' of 5 hearts carry on to the kitchen' : ''),
      mistakes: S.mistakes, hasMistakes: S.mistakes.length > 0,
      canApologise: !S.apologyUsed, brokenText: brokenText,
      start, replay, retry, cont, replayLine, replayReaction, apologiseRight, apologiseWrong, toggleTa, toggleEn
    };
  }
}

const DEFAULT_PROPS = {"heartsOn": true, "startHearts": 3, "showHints": true, "showAudioNames": true};

export default function EntranceBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-entrance">
      <div ref={v?.rootRef} style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#e9d6aa", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", flexShrink: "0", width: `${v?.stage?.w ?? ""}px`, height: `${v?.stage?.h ?? ""}px` }}>
          <div style={{ position: "absolute", left: "0", top: "0", transform: `scale(${v?.stage?.s ?? ""})`, transformOrigin: "top left", width: "960px", height: "600px", overflow: "hidden", background: "#b4533c", fontFamily: "'Atkinson Hyperlegible', 'Noto Sans Tamil', sans-serif", color: "#3a2316" }}>
            <div aria-hidden={"true"} style={{ position: "absolute", inset: "0", display: "grid", gridTemplateColumns: "repeat(40, 24px)", gridAutoRows: "24px" }}>
              {(v?.tiles || []).map((t, $index) => (
                <React.Fragment key={$index}>
                  <div style={{ background: t?.bg }}></div>
                </React.Fragment>
              ))}
            </div>
            {(v?.props || []).map((s, $index) => (
              <React.Fragment key={$index}>
                <div aria-hidden={"true"} className={s?.cls} style={{ position: "absolute", left: `${s?.left ?? ""}px`, top: `${s?.top ?? ""}px`, display: "grid", gridTemplateColumns: `repeat(${s?.cols ?? ""}, ${s?.px ?? ""}px)`, gridAutoRows: `${s?.px ?? ""}px` }}>
                  {(s?.pixels || []).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <div style={{ background: p?.c, boxShadow: `0 0 0 0.6px ${p?.c ?? ""}` }}></div>
                    </React.Fragment>
                  ))}
                </div>
              </React.Fragment>
            ))}
            {(v?.decor || []).map((d, $index) => (
              <React.Fragment key={$index}>
                <div aria-hidden={"true"} className={d?.cls} style={{ position: "absolute", left: `${d?.x ?? ""}px`, top: `${d?.y ?? ""}px`, width: `${d?.w ?? ""}px`, height: `${d?.h ?? ""}px`, background: d?.c, animationDelay: `${d?.d ?? ""}s` }}></div>
              </React.Fragment>
            ))}
            {(v?.people || []).map((a, $index) => (
              <React.Fragment key={$index}>
                <div aria-hidden={"true"} className={"walk"} style={{ position: "absolute", left: `${a?.left ?? ""}px`, top: `${a?.top ?? ""}px` }}>
                  <div aria-hidden={"true"} style={{ position: "absolute", left: "6px", top: "45px", width: "24px", height: "5px", background: "rgba(60,15,5,0.3)" }}></div>
                  <div className={a?.cls} style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(12, 3px)", gridAutoRows: "3px" }}>
                    {(a?.pixels || []).map((p, $index) => (
                      <React.Fragment key={$index}>
                        <div style={{ background: p?.c, boxShadow: `0 0 0 0.6px ${p?.c ?? ""}` }}></div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
            <div aria-hidden={"true"} className={"walk"} style={{ position: "absolute", left: `${v?.pw?.x ?? ""}px`, top: `${v?.pw?.y ?? ""}px` }}>
              <div aria-hidden={"true"} style={{ position: "absolute", left: "6px", top: "45px", width: "24px", height: "5px", background: "rgba(60,15,5,0.3)" }}></div>
              <div className={v?.pw?.cls} style={{ position: "relative" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 3px)", gridAutoRows: "3px" }}>
                  {(v?.pw?.pixels || []).map((p, $index) => (
                    <React.Fragment key={$index}>
                      <div style={{ background: p?.c, boxShadow: `0 0 0 0.6px ${p?.c ?? ""}` }}></div>
                    </React.Fragment>
                  ))}
                </div>
                <div className={"blink"} style={{ position: "absolute", left: "12px", top: "15px", width: "3px", height: "3px", background: "#b87a4b" }}></div>
                <div className={"blink"} style={{ position: "absolute", left: "21px", top: "15px", width: "3px", height: "3px", background: "#b87a4b" }}></div>
                {v?.talkLine ? (
                  <>
                    <div className={"talk"} style={{ position: "absolute", left: "15px", top: "18px", width: "6px", height: "3px", background: "#5a1e12" }}></div>
                  </>
                ) : null}
                {v?.talkReply ? (
                  <>
                    <div className={"talk"} style={{ position: "absolute", left: "15px", top: "18px", width: "6px", height: "3px", background: "#5a1e12" }}></div>
                  </>
                ) : null}
              </div>
            </div>
            {v?.showPotHint ? (
              <>
                <div className={"bob"} aria-hidden={"true"} style={{ position: "absolute", left: "299px", top: "92px", width: "16px", height: "18px", background: "#9fe1cb", border: "3px solid #0f6e56", color: "#04342c", fontWeight: "600", fontSize: "13px", lineHeight: "18px", textAlign: "center" }}>
                  {"!"}
                </div>
              </>
            ) : null}
            {v?.showHints ? (
              <>
                <div style={{ position: "absolute", left: `${v?.badge?.x ?? ""}px`, top: `${v?.badge?.y ?? ""}px`, transform: "translateX(-50%)", padding: "1px 6px", background: "#ffd166", border: "2px solid #7a4a00", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px", lineHeight: "1.4", color: "#3a2400", whiteSpace: "nowrap", transition: "left .9s steps(9), top .9s steps(9)" }}>
                  {"\u0ba8\u0bc0\u0b99\u0bcd\u0b95"}
                </div>
              </>
            ) : null}
            {v?.isLove ? (
              <>
                {(v?.burst || []).map((b, $index) => (
                  <React.Fragment key={$index}>
                    <div aria-hidden={"true"} className={b?.cls} style={{ position: "absolute", left: `${b?.x ?? ""}px`, top: `${b?.y ?? ""}px`, animationDelay: `${b?.d ?? ""}s` }}>
                      <svg width={b?.w} height={b?.h} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"}>
                        <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={"#ff4d6d"}></rect>
                        <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={"#ff4d6d"}></rect>
                        <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={"#ff4d6d"}></rect>
                        <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={"#ff4d6d"}></rect>
                        <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={"#ff4d6d"}></rect>
                        <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={"#ff4d6d"}></rect>
                        <rect x={"1"} y={"1"} width={"1"} height={"1"} fill={"#ffd6de"}></rect>
                      </svg>
                    </div>
                  </React.Fragment>
                ))}
              </>
            ) : null}
            {v?.isHurt ? (
              <>
                <div aria-hidden={"true"} style={{ position: "absolute", left: `${v?.hurt?.x ?? ""}px`, top: `${v?.hurt?.y ?? ""}px`, width: "28px", height: "24px" }}>
                  <svg className={"crackL"} style={{ position: "absolute", left: "0", top: "0" }} width={"28"} height={"24"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"}>
                    <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"0"} y={"1"} width={"3"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"0"} y={"2"} width={"4"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"1"} y={"3"} width={"2"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"2"} y={"4"} width={"1"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"1"} y={"1"} width={"1"} height={"1"} fill={"#ffd6de"}></rect>
                  </svg>
                  <svg className={"crackR"} style={{ position: "absolute", left: "0", top: "0" }} width={"28"} height={"24"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"}>
                    <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"3"} y={"1"} width={"4"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"4"} y={"2"} width={"3"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"3"} y={"3"} width={"3"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"3"} y={"4"} width={"2"} height={"1"} fill={"#e63946"}></rect>
                    <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={"#e63946"}></rect>
                  </svg>
                </div>
              </>
            ) : null}
            <div className={v?.heartPanelCls} style={{ position: "absolute", left: "12px", top: "12px", width: "236px", boxSizing: "border-box", padding: "8px 10px", background: "#fbf3e2", border: "3px solid #5b3a22", boxShadow: "inset 0 0 0 2px #e8ad2f", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span>
                  <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "16px" }}>
                    {"\u0bb5\u0bbe\u0b9a\u0bb2\u0bcd"}
                  </span>
                  <span style={{ fontSize: "14px", color: "#8a6a4a" }}>
                    {" \u00b7 front door"}
                  </span>
                </span>
                <span style={{ padding: "0 6px", background: v?.modeChip?.bg, color: v?.modeChip?.ink, fontWeight: "600", fontSize: "12px" }}>
                  {v?.modeChip?.t}
                </span>
              </div>
              {v?.heartsOn ? (
                <>
                  <div role={"meter"} aria-label={"Paati\u2019s affection"} aria-valuemin={"0"} aria-valuemax={"5"} aria-valuenow={v?.hearts} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    {(v?.heartRow || []).map((ht, $index) => (
                      <React.Fragment key={$index}>
                        <svg className={ht?.cls} width={"25"} height={"21"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                          <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={ht?.c}></rect>
                          <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={ht?.c}></rect>
                          <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={ht?.c}></rect>
                          <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={ht?.c}></rect>
                          <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={ht?.c}></rect>
                          <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={ht?.c}></rect>
                          <rect x={"1"} y={"1"} width={"1"} height={"1"} fill={ht?.hi}></rect>
                        </svg>
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{ fontSize: "13px", color: v?.heartNote?.c }}>
                    {v?.heartNote?.t}
                  </div>
                </>
              ) : null}
            </div>
            <div id={"housemap"} style={{ position: "absolute", right: "12px", top: "12px", boxSizing: "border-box", padding: "8px 12px 8px 10px", background: "#fbf3e2", border: "3px solid #5b3a22", boxShadow: "inset 0 0 0 2px #e8ad2f", display: "flex", alignItems: "center", gap: "10px" }}>
              <div role={"img"} aria-label={"House map: room 1 of 3, entrance"} style={{ position: "relative", width: "70px", height: "66px", flexShrink: "0" }}>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "24px", top: "0px", width: "22px", height: "5px", background: "repeating-linear-gradient(90deg,#c8553d 0 6px,#a8432f 6px 8px)" }}></div>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "16px", top: "5px", width: "38px", height: "5px", background: "repeating-linear-gradient(90deg,#c8553d 0 6px,#a8432f 6px 8px)" }}></div>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "8px", top: "10px", width: "54px", height: "5px", background: "repeating-linear-gradient(90deg,#c8553d 0 6px,#a8432f 6px 8px)" }}></div>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "0px", top: "15px", width: "70px", height: "5px", background: "repeating-linear-gradient(90deg,#c8553d 0 6px,#a8432f 6px 8px)" }}></div>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "3px", top: "20px", width: "64px", height: "46px", boxSizing: "border-box", background: "#f3e6cf", border: "2px solid #5b3a22", borderTopWidth: "3px" }}></div>
                <div title={"Kitchen"} style={{ position: "absolute", left: "8px", top: "25px", width: "26px", height: "18px", boxSizing: "border-box", border: "2px solid #5b3a22", background: "#3d3550" }}>
                  <div style={{ position: "absolute", left: "50%", top: "4px", transform: "translateX(-50%)" }}>
                    <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(4, 2px)", gridAutoRows: "2px" }}>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                    </div>
                  </div>
                </div>
                <div title={"Upstairs, coming soon"} style={{ position: "absolute", left: "36px", top: "25px", width: "26px", height: "18px", boxSizing: "border-box", border: "2px solid #5b3a22", background: "#3d3550" }}>
                  <div style={{ position: "absolute", left: "50%", top: "4px", transform: "translateX(-50%)" }}>
                    <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(4, 2px)", gridAutoRows: "2px" }}>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                    </div>
                  </div>
                </div>
                <div title={"Entrance"} style={{ position: "absolute", left: "8px", top: "45px", width: "26px", height: "18px", boxSizing: "border-box", border: "2px solid #5b3a22", background: "#ffd166" }}>
                  <div className={"bob"} style={{ position: "absolute", left: "50%", top: "2px", transform: "translateX(-50%)" }}>
                    <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(6, 2px)", gridAutoRows: "2px" }}>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#ffffff" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#dcd8d0" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#1d1d1d" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#1d1d1d" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#1d1d1d" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#7a2a1a" }}></div>
                      <div style={{ background: "#7a2a1a" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "#b87a4b" }}></div>
                      <div style={{ background: "transparent" }}></div>
                    </div>
                  </div>
                </div>
                <div title={"Living room"} style={{ position: "absolute", left: "36px", top: "45px", width: "26px", height: "18px", boxSizing: "border-box", border: "2px solid #5b3a22", background: "#3d3550" }}>
                  <div style={{ position: "absolute", left: "50%", top: "4px", transform: "translateX(-50%)" }}>
                    <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(4, 2px)", gridAutoRows: "2px" }}>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "transparent" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                      <div style={{ background: "#a99fbd" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", lineHeight: "1.15" }}>
                <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "16px", color: "#6e1b1b" }}>
                  {"\u0bb5\u0bbe\u0b9a\u0bb2\u0bcd"}
                </span>
                <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "13px", color: "#8a6a4a" }}>
                  {"Room 1 of 3 \u00b7 entrance"}
                </span>
                <span aria-label={v?.pipLabel} style={{ display: "flex", gap: "3px", marginTop: "4px" }}>
                  {(v?.pips || []).map((pp, $index) => (
                    <React.Fragment key={$index}>
                      <span style={{ width: "9px", height: "9px", background: pp?.c }}></span>
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </div>
            {v?.isPlay ? (
              <>
                <div style={{ position: "absolute", left: "16px", top: "320px", width: "928px", height: "268px", boxSizing: "border-box", padding: "14px", background: "#fbf3e2", border: "4px solid #5b3a22", boxShadow: "inset 0 0 0 3px #e8ad2f", display: "flex", gap: "16px" }}>
                  <svg aria-hidden={"true"} style={{ position: "absolute", right: "-46px", top: "-46px", width: "170px", height: "170px", opacity: "0.16", pointerEvents: "none" }} viewBox={"0 0 200 200"} shapeRendering={"crispEdges"}>
                    <g fill={"#e8ad2f"}>
                      <rect x={"16"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"16"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"40"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"40"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"40"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"40"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"40"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"160"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"16"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"40"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"160"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"184"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"16"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"40"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"160"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"184"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"40"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"160"} width={"8"} height={"8"}></rect>
                      <rect x={"160"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"160"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"160"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"160"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"184"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"184"} y={"112"} width={"8"} height={"8"}></rect>
                    </g>
                    <g fill={"none"} stroke={"#e8ad2f"} strokeWidth={"4"}>
                      <path d={"M100 4 L196 100 L100 196 L4 100 Z"}></path>
                      <path d={"M100 40 L160 100 L100 160 L40 100 Z"}></path>
                    </g>
                  </svg>
                  <svg aria-hidden={"true"} style={{ position: "absolute", left: "40%", bottom: "-70px", width: "150px", height: "150px", opacity: "0.08", pointerEvents: "none" }} viewBox={"0 0 200 200"} shapeRendering={"crispEdges"}>
                    <g fill={"#c2185b"}>
                      <rect x={"16"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"16"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"40"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"40"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"40"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"40"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"40"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"64"} y={"160"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"16"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"40"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"160"} width={"8"} height={"8"}></rect>
                      <rect x={"88"} y={"184"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"16"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"40"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"160"} width={"8"} height={"8"}></rect>
                      <rect x={"112"} y={"184"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"40"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"136"} y={"160"} width={"8"} height={"8"}></rect>
                      <rect x={"160"} y={"64"} width={"8"} height={"8"}></rect>
                      <rect x={"160"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"160"} y={"112"} width={"8"} height={"8"}></rect>
                      <rect x={"160"} y={"136"} width={"8"} height={"8"}></rect>
                      <rect x={"184"} y={"88"} width={"8"} height={"8"}></rect>
                      <rect x={"184"} y={"112"} width={"8"} height={"8"}></rect>
                    </g>
                    <g fill={"none"} stroke={"#c2185b"} strokeWidth={"4"}>
                      <path d={"M100 4 L196 100 L100 196 L4 100 Z"}></path>
                      <path d={"M100 40 L160 100 L100 160 L40 100 Z"}></path>
                    </g>
                  </svg>
                  <div style={{ width: "104px", height: "150px", flexShrink: "0", boxSizing: "border-box", background: "#f3e3c3", border: "3px solid #e8ad2f" }}></div>
                  <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                    {v?.noPick ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#d8551f", flexShrink: "0" }}>
                            {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf"}
                          </span>
                          <span style={{ fontSize: "23px", fontWeight: "700", lineHeight: "1.25", color: "#6e1b1b" }}>
                            {"\u201c"}{v?.turn?.paati}{"\u201d"}
                          </span>
                          <button onClick={v?.replayLine} aria-label={"Replay Paati\u2019s line"} style={{ height: "28px", padding: "0 8px", background: "#fffaf0", border: "2px solid #2a7d6f", color: "#2a7d6f", fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", flexShrink: "0" }}>
                            <svg width={"8"} height={"10"} viewBox={"0 0 4 5"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                              <rect x={"0"} y={"0"} width={"1"} height={"5"} fill={"#9fe1cb"}></rect>
                              <rect x={"1"} y={"1"} width={"2"} height={"3"} fill={"#9fe1cb"}></rect>
                              <rect x={"3"} y={"2"} width={"1"} height={"1"} fill={"#9fe1cb"}></rect>
                            </svg>
                            {"Replay"}
                          </button>
                          <span style={{ marginLeft: "auto", fontSize: "12px", color: "#8a6a4a", textAlign: "right" }}>
                            {v?.audioNote?.line}
                          </span>
                        </div>
                        {v?.showTa ? (
                          <>
                            <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "17px", color: "#2a7d6f" }}>
                              {v?.turn?.ta}
                            </div>
                          </>
                        ) : null}
                        {v?.showEn ? (
                          <>
                            <div style={{ fontSize: "15px", color: "#5a4536" }}>
                              {v?.turn?.en}
                            </div>
                          </>
                        ) : null}
                        <div style={{ fontSize: "14px", color: "#5a4536", marginTop: "2px" }}>
                          {"Tap an answer below, or press the mic and say it in Tamil."}
                        </div>
                        {v?.hasHeardNote ? (
                          <>
                            <div role={"status"} style={{ fontSize: "14px", color: v?.heardNote?.c }}>
                              {v?.heardNote?.t}
                            </div>
                          </>
                        ) : null}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", marginTop: "auto" }}>
                          {(v?.opts || []).map((o, $index) => (
                            <React.Fragment key={$index}>
                              <button className={"opt"} onClick={o?.pick} title={o?.text} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "6px 8px", minHeight: "52px", background: "#fffaf0", border: "2px solid #c99a6b", boxShadow: "3px 3px 0 #d9c08a", color: "#3a2316", cursor: "pointer", textAlign: "left" }}>
                                <span aria-hidden={"true"} style={{ flexShrink: "0", padding: "0 4px", background: "#e9c46a", color: "#3a2316", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "13px", lineHeight: "17px" }}>
                                  {o?.n}
                                </span>
                                <span style={{ display: "flex", flexDirection: "column", minWidth: "0", flex: "1" }}>
                                  <span style={{ fontFamily: "'Atkinson Hyperlegible', 'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", lineHeight: "1.25", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                    {o?.text}
                                  </span>
                                  {v?.showTa ? (
                                    <>
                                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "500", fontSize: "13px", color: "#2a7d6f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {o?.ta}
                                      </span>
                                    </>
                                  ) : null}
                                  {v?.showEn ? (
                                    <>
                                      <span style={{ fontFamily: "'Atkinson Hyperlegible', 'Noto Sans Tamil', sans-serif", fontSize: "13px", color: "#5a4536", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {o?.en}
                                      </span>
                                    </>
                                  ) : null}
                                </span>
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    ) : null}
                    {v?.hasPick ? (
                      <>
                        <div style={{ display: "flex", gap: "8px", alignItems: "baseline", flexWrap: "wrap", padding: "4px 8px", background: "#fffaf0", border: "2px solid #d9c08a" }}>
                          <span style={{ fontSize: "14px", fontWeight: "700", color: "#c8841a", flexShrink: "0" }}>
                            {v?.mine?.via}
                          </span>
                          <span style={{ fontSize: "16px", fontWeight: "700" }}>
                            {(v?.mine?.parts || []).map((pt, $index) => (
                              <React.Fragment key={$index}>
                                <span style={{ color: pt?.c, textDecoration: pt?.u, textUnderlineOffset: "3px", background: pt?.bg }}>
                                  {pt?.w}
                                </span>
                                <span>
                                  {" "}
                                </span>
                              </React.Fragment>
                            ))}
                          </span>
                          {v?.mine?.hasHeard ? (
                            <>
                              <span style={{ fontSize: "13px", color: "#8a6a4a" }}>
                                {v?.mine?.heardLine}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                          <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#d8551f", flexShrink: "0" }}>
                            {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf"}
                          </span>
                          <span style={{ fontSize: "20px", fontWeight: "700", lineHeight: "1.25", color: "#6e1b1b" }}>
                            {"\u201c"}{v?.re?.text}{"\u201d"}
                          </span>
                          <button onClick={v?.replayReaction} aria-label={"Replay Paati\u2019s reaction"} style={{ height: "26px", padding: "0 8px", background: "#fffaf0", border: "2px solid #2a7d6f", color: "#2a7d6f", fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", flexShrink: "0" }}>
                            <svg width={"8"} height={"10"} viewBox={"0 0 4 5"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                              <rect x={"0"} y={"0"} width={"1"} height={"5"} fill={"#9fe1cb"}></rect>
                              <rect x={"1"} y={"1"} width={"2"} height={"3"} fill={"#9fe1cb"}></rect>
                              <rect x={"3"} y={"2"} width={"1"} height={"1"} fill={"#9fe1cb"}></rect>
                            </svg>
                            {"Replay"}
                          </button>
                        </div>
                        <div style={{ fontSize: "14px" }}>
                          {v?.showTa ? (
                            <>
                              <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "500", color: "#2a7d6f" }}>
                                {v?.re?.ta}{" "}
                              </span>
                            </>
                          ) : null}
                          {v?.showEn ? (
                            <>
                              <span style={{ color: "#5a4536" }}>
                                {"\u00b7 "}{v?.re?.en}
                              </span>
                            </>
                          ) : null}
                          <span style={{ color: "#8a6a4a" }}>
                            {" "}{v?.audioNote?.reply}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", padding: "5px 8px", background: v?.verdict?.bg, border: `2px solid ${v?.verdict?.edge ?? ""}` }}>
                          <span style={{ padding: "0 6px", background: v?.verdict?.chipBg, color: v?.verdict?.chipInk, fontSize: "14px", fontWeight: "700", flexShrink: "0", whiteSpace: "nowrap" }}>
                            {v?.verdict?.label}
                          </span>
                          <span style={{ fontSize: "15px", lineHeight: "1.35", color: v?.verdict?.ink, flex: "1", minWidth: "0" }}>
                            {v?.mine?.why}
                          </span>
                          {v?.heartsOn ? (
                            <>
                              <span style={{ padding: "0 6px", background: v?.verdict?.heartBg, color: "#ffffff", fontSize: "14px", fontWeight: "700", flexShrink: "0", whiteSpace: "nowrap" }}>
                                {v?.verdict?.heart}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "auto" }}>
                          <span style={{ flex: "1" }}></span>
                          {v?.canRetry ? (
                            <>
                              <button onClick={v?.retry} style={{ minHeight: "44px", padding: "0 16px", background: "#f4c444", border: "2px solid #7a4a00", color: "#3a2316", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
                                {"Try again"}
                              </button>
                            </>
                          ) : null}
                          {v?.canContinue ? (
                            <>
                              <button onClick={v?.cont} style={{ minHeight: "44px", padding: "0 16px", background: v?.contBtn?.bg, border: `2px solid ${v?.contBtn?.edge ?? ""}`, color: v?.contBtn?.ink, fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
                                {v?.contBtn?.label}
                              </button>
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div style={{ width: "92px", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button onClick={v?.toggleTa} aria-pressed={v?.taBtn?.pressed} aria-label={"Show Tamil script"} style={{ width: "42px", height: "28px", padding: "0", background: v?.taBtn?.bg, border: "2px solid #2a7d6f", color: v?.taBtn?.ink, fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>
                        {"\u0ba4"}
                      </button>
                      <button onClick={v?.toggleEn} aria-pressed={v?.enBtn?.pressed} aria-label={"Show English"} style={{ width: "42px", height: "28px", padding: "0", background: v?.enBtn?.bg, border: "2px solid #2a7d6f", color: v?.enBtn?.ink, fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", cursor: "pointer" }}>
                        {"EN"}
                      </button>
                    </div>
                    <button onClick={v?.listen} aria-label={v?.mic?.aria} aria-pressed={v?.mic?.pressed} className={v?.mic?.cls} style={{ width: "60px", height: "60px", border: `4px solid ${v?.mic?.edge ?? ""}`, background: v?.mic?.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                      <svg width={"28"} height={"32"} viewBox={"0 0 7 8"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                        <rect x={"2"} y={"0"} width={"3"} height={"5"} fill={"#fff6e5"}></rect>
                        <rect x={"1"} y={"3"} width={"1"} height={"2"} fill={"#fff6e5"}></rect>
                        <rect x={"5"} y={"3"} width={"1"} height={"2"} fill={"#fff6e5"}></rect>
                        <rect x={"2"} y={"5"} width={"3"} height={"1"} fill={"#fff6e5"}></rect>
                        <rect x={"3"} y={"6"} width={"1"} height={"1"} fill={"#fff6e5"}></rect>
                        <rect x={"1"} y={"7"} width={"5"} height={"1"} fill={"#fff6e5"}></rect>
                      </svg>
                    </button>
                    <div role={"status"} style={{ fontSize: "13px", lineHeight: "1.3", color: v?.mic?.ink, textAlign: "center" }}>
                      {v?.mic?.label}
                    </div>
                  </div>
                </div>
                <div aria-hidden={"true"} className={v?.portraitCls} style={{ position: "absolute", left: "38px", top: "359px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 6px)", gridAutoRows: "6px" }}>
                    {(v?.face || []).map((p, $index) => (
                      <React.Fragment key={$index}>
                        <div style={{ background: p?.c, boxShadow: `0 0 0 0.6px ${p?.c ?? ""}` }}></div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className={"blink"} style={{ position: "absolute", left: "30px", top: "42px", width: "12px", height: "12px", background: "linear-gradient(#b87a4b 0 50%, #2a1a14 50% 100%)" }}></div>
                  <div className={"blink"} style={{ position: "absolute", left: "54px", top: "42px", width: "12px", height: "12px", background: "linear-gradient(#b87a4b 0 50%, #2a1a14 50% 100%)" }}></div>
                  {v?.talkLine ? (
                    <>
                      <div className={"talk"} style={{ position: "absolute", left: "42px", top: "60px", width: "12px", height: "12px", background: "#5a1e12" }}></div>
                    </>
                  ) : null}
                  {v?.talkReply ? (
                    <>
                      <div className={"talk"} style={{ position: "absolute", left: "42px", top: "60px", width: "12px", height: "12px", background: "#5a1e12" }}></div>
                    </>
                  ) : null}
                </div>
                {v?.isLove ? (
                  <>
                    {(v?.portraitBurst || []).map((b, $index) => (
                      <React.Fragment key={$index}>
                        <div aria-hidden={"true"} className={b?.cls} style={{ position: "absolute", left: `${b?.x ?? ""}px`, top: `${b?.y ?? ""}px`, animationDelay: `${b?.d ?? ""}s` }}>
                          <svg width={"14"} height={"12"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"}>
                            <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={"#ff4d6d"}></rect>
                            <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={"#ff4d6d"}></rect>
                            <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={"#ff4d6d"}></rect>
                            <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={"#ff4d6d"}></rect>
                            <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={"#ff4d6d"}></rect>
                            <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={"#ff4d6d"}></rect>
                          </svg>
                        </div>
                      </React.Fragment>
                    ))}
                  </>
                ) : null}
              </>
            ) : null}
            {v?.isIntro ? (
              <>
                <div style={{ position: "absolute", inset: "0", background: "rgba(20,12,24,0.62)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "relative", overflow: "hidden", width: "560px", boxSizing: "border-box", padding: "22px 24px", background: "#fbf3e2", border: "4px solid #5b3a22", boxShadow: "inset 0 0 0 3px #e8ad2f", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <svg aria-hidden={"true"} style={{ position: "absolute", right: "-50px", top: "-50px", width: "190px", height: "190px", opacity: "0.18", pointerEvents: "none" }} viewBox={"0 0 200 200"} shapeRendering={"crispEdges"}>
                      <g fill={"#e8ad2f"}>
                        <rect x={"16"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"16"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"40"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"40"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"40"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"40"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"40"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"160"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"16"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"40"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"160"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"184"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"16"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"40"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"160"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"184"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"40"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"160"} width={"8"} height={"8"}></rect>
                        <rect x={"160"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"160"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"160"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"160"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"184"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"184"} y={"112"} width={"8"} height={"8"}></rect>
                      </g>
                      <g fill={"none"} stroke={"#e8ad2f"} strokeWidth={"4"}>
                        <path d={"M100 4 L196 100 L100 196 L4 100 Z"}></path>
                        <path d={"M100 40 L160 100 L100 160 L40 100 Z"}></path>
                      </g>
                    </svg>
                    <svg aria-hidden={"true"} style={{ position: "absolute", left: "-60px", bottom: "-60px", width: "200px", height: "200px", opacity: "0.1", pointerEvents: "none" }} viewBox={"0 0 200 200"} shapeRendering={"crispEdges"}>
                      <g fill={"#6e1b1b"}>
                        <rect x={"16"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"16"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"40"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"40"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"40"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"40"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"40"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"64"} y={"160"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"16"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"40"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"160"} width={"8"} height={"8"}></rect>
                        <rect x={"88"} y={"184"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"16"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"40"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"160"} width={"8"} height={"8"}></rect>
                        <rect x={"112"} y={"184"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"40"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"136"} y={"160"} width={"8"} height={"8"}></rect>
                        <rect x={"160"} y={"64"} width={"8"} height={"8"}></rect>
                        <rect x={"160"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"160"} y={"112"} width={"8"} height={"8"}></rect>
                        <rect x={"160"} y={"136"} width={"8"} height={"8"}></rect>
                        <rect x={"184"} y={"88"} width={"8"} height={"8"}></rect>
                        <rect x={"184"} y={"112"} width={"8"} height={"8"}></rect>
                      </g>
                      <g fill={"none"} stroke={"#6e1b1b"} strokeWidth={"4"}>
                        <path d={"M100 4 L196 100 L100 196 L4 100 Z"}></path>
                        <path d={"M100 40 L160 100 L100 160 L40 100 Z"}></path>
                      </g>
                    </svg>
                    <div style={{ fontSize: "14px", color: "#c8841a" }}>
                      {"Paati\u2019s house \u00b7 stop 1 of 3"}
                    </div>
                    <div style={{ fontSize: "26px", lineHeight: "1.2" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700" }}>
                        {"\u0bb5\u0bbe\u0b9a\u0bb2\u0bcd"}
                      </span>
                      {" \u00b7 Arriving for the visit"}
                    </div>
                    <div style={{ fontSize: "17px", lineHeight: "1.5", color: "#5a4536" }}>
                      {"You\u2019ve just reached Paati\u2019s front door. Greet her, answer her five questions kindly and respectfully, and make your way inside."}
                    </div>
                    {v?.heartsOn ? (
                      <>
                        <div style={{ padding: "10px 12px", background: "#fde8ec", border: "2px solid #c2185b", display: "flex", flexDirection: "column", gap: "6px" }}>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                            {(v?.introHearts || []).map((ht, $index) => (
                              <React.Fragment key={$index}>
                                <svg width={"21"} height={"18"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                                  <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={ht?.c}></rect>
                                  <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={ht?.c}></rect>
                                  <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={ht?.c}></rect>
                                  <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={ht?.c}></rect>
                                  <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={ht?.c}></rect>
                                  <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={ht?.c}></rect>
                                </svg>
                              </React.Fragment>
                            ))}
                            <span style={{ fontSize: "15px", color: "#6e1b1b", marginLeft: "4px" }}>
                              {v?.introHeartText}
                            </span>
                          </div>
                          <div style={{ fontSize: "15px", color: "#5a4536", lineHeight: "1.5" }}>
                            {"A kind answer wins a heart and a smile. A careless one costs a heart and a frown. Lose them all and Paati stops talking."}
                          </div>
                        </div>
                      </>
                    ) : null}
                    <button onClick={v?.start} style={{ alignSelf: "flex-start", minHeight: "44px", padding: "0 18px", background: "#f4c444", border: "3px solid #7a4a00", color: "#3a2316", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "16px", cursor: "pointer" }}>
                      {"Ring the bell"}
                    </button>
                  </div>
                </div>
              </>
            ) : null}
            {v?.isBroken ? (
              <>
                <div style={{ position: "absolute", inset: "0", background: "rgba(10,4,12,0.78)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div className={"alarm"} style={{ width: "580px", boxSizing: "border-box", padding: "22px 24px", background: "#fbf3e2", border: "4px solid #5b3a22", boxShadow: "inset 0 0 0 3px #e63946", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.3" }}>
                        {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf\u0b95\u0bcd\u0b95\u0bc1 \u0bb5\u0bb0\u0bc1\u0ba4\u0bcd\u0ba4\u0bae\u0bbe \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1"}
                      </div>
                      <div style={{ fontSize: "16px", color: "#a32d2d" }}>
                        {"paatikku varuthamaa irukku \u00b7 Paati is hurt"}
                      </div>
                    </div>
                    <div style={{ fontSize: "16px", lineHeight: "1.5", color: "#5a4536" }}>
                      {v?.brokenText}
                    </div>
                    {v?.canApologise ? (
                      <>
                        <div style={{ fontSize: "14px", color: "#c8841a" }}>
                          {"Pick the right way to say sorry to an elder:"}
                        </div>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          <button onClick={v?.apologiseWrong} style={{ minHeight: "52px", padding: "6px 12px", background: "#fffaf0", border: "2px solid #e8ad2f", color: "#3a2316", cursor: "pointer", textAlign: "left", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px" }}>
                            {"sorry paati da, vidu!"}
                          </button>
                          <button onClick={v?.apologiseRight} style={{ minHeight: "52px", padding: "6px 12px", background: "#fffaf0", border: "2px solid #e8ad2f", color: "#3a2316", cursor: "pointer", textAlign: "left", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px" }}>
                            {"mannichidunga paati."}
                          </button>
                        </div>
                      </>
                    ) : null}
                    <button onClick={v?.replay} style={{ minHeight: "44px", padding: "0 14px", background: "#f3e3c3", border: "3px solid #e8ad2f", color: "#3a2316", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", cursor: "pointer" }}>
                      {"Start the visit again"}
                    </button>
                  </div>
                </div>
              </>
            ) : null}
            {v?.isEnd ? (
              <>
                <div style={{ position: "absolute", inset: "0", background: "rgba(20,12,24,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div className={"glow"} style={{ width: "600px", boxSizing: "border-box", padding: "24px 26px", background: "#fbf3e2", border: "4px solid #c2185b", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center", textAlign: "center", position: "relative" }}>
                    {(v?.endBurst || []).map((b, $index) => (
                      <React.Fragment key={$index}>
                        <div aria-hidden={"true"} className={b?.cls} style={{ position: "absolute", left: `${b?.x ?? ""}px`, top: `${b?.y ?? ""}px`, animationDelay: `${b?.d ?? ""}s`, animationIterationCount: "infinite" }}>
                          <svg width={"18"} height={"15"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"}>
                            <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={"#ff4d6d"}></rect>
                            <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={"#ff4d6d"}></rect>
                            <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={"#ff4d6d"}></rect>
                            <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={"#ff4d6d"}></rect>
                            <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={"#ff4d6d"}></rect>
                            <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={"#ff4d6d"}></rect>
                          </svg>
                        </div>
                      </React.Fragment>
                    ))}
                    <div className={"hop"} aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(16, 6px)", gridAutoRows: "6px", animationIterationCount: "infinite", animationDuration: "1.4s" }}>
                      {(v?.endFace || []).map((p, $index) => (
                        <React.Fragment key={$index}>
                          <div style={{ background: p?.c, boxShadow: `0 0 0 0.6px ${p?.c ?? ""}` }}></div>
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "30px", lineHeight: "1.2", color: "#6e1b1b", fontWeight: "700" }}>
                      {"You\u2019re home! Paati is happy."}
                    </div>
                    {v?.heartsOn ? (
                      <>
                        <div role={"img"} aria-label={v?.heartsLabel} style={{ display: "flex", gap: "6px" }}>
                          {(v?.heartRowStatic || []).map((ht, $index) => (
                            <React.Fragment key={$index}>
                              <svg width={"28"} height={"24"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                                <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={ht?.c}></rect>
                                <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={ht?.c}></rect>
                                <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={ht?.c}></rect>
                                <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={ht?.c}></rect>
                                <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={ht?.c}></rect>
                                <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={ht?.c}></rect>
                                <rect x={"1"} y={"1"} width={"1"} height={"1"} fill={ht?.hi}></rect>
                              </svg>
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div style={{ fontSize: "16px", color: "#5a4536" }}>
                      {v?.endStats}
                    </div>
                    {v?.hasMistakes ? (
                      <>
                        <div style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", background: "#fffaf0", border: "2px solid #d9c08a", display: "flex", flexDirection: "column", gap: "4px", textAlign: "left" }}>
                          <div style={{ fontSize: "14px", color: "#d8551f" }}>
                            {"Phrases to review"}
                          </div>
                          {(v?.mistakes || []).map((mk, $index) => (
                            <React.Fragment key={$index}>
                              <div style={{ fontSize: "14px", color: "#3a2316" }}>
                                {"\u201c"}{mk?.text}{"\u201d "}
                                <span style={{ color: "#5a4536" }}>
                                  {"\u00b7 "}{mk?.why}
                                </span>
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                      <button onClick={v?.replay} style={{ minHeight: "44px", padding: "0 14px", background: "#f3e3c3", border: "3px solid #e8ad2f", color: "#3a2316", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", cursor: "pointer" }}>
                        {"Play the entrance again"}
                      </button>
                      <Link to="/entrance-feedback" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", boxSizing: "border-box", padding: "0 14px", background: "#f4c444", border: "3px solid #7a4a00", color: "#3a2316", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                        {"See Paati\u2019s feedback sheet"}
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {v?.showRotate ? (
          <>
            <div role={"status"} style={{ position: "absolute", left: "50%", bottom: "16px", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "10px", padding: "8px 14px", background: "#fbf3e2", border: "3px solid #e8ad2f", color: "#3a2316", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "15px", whiteSpace: "nowrap" }}>
              <svg width={"22"} height={"22"} viewBox={"0 0 11 11"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                <rect x={"1"} y={"3"} width={"9"} height={"5"} fill={"none"} stroke={"#e9c46a"} strokeWidth={"1"}></rect>
                <rect x={"8"} y={"5"} width={"1"} height={"1"} fill={"#e9c46a"}></rect>
                <rect x={"3"} y={"0"} width={"1"} height={"2"} fill={"#9fe1cb"}></rect>
                <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={"#9fe1cb"}></rect>
                <rect x={"6"} y={"1"} width={"1"} height={"1"} fill={"#9fe1cb"}></rect>
              </svg>
              {" Turn your phone sideways for a bigger view"}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
