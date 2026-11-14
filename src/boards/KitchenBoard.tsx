// @ts-nocheck
/* Generated from the design canvas board "Kitchen.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "react-router-dom";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import "./kitchen.css";

class Component extends DCLogic {
  componentWillUnmount() {
    try { if (this._ro) this._ro.disconnect(); } catch (e) { /* ignore */ }
    try { if (this._rec) this._rec.abort(); } catch (e) { /* ignore */ }
    try { if (this._audio) this._audio.pause(); } catch (e) { /* ignore */ }
  }
  renderVals() {
    /* ---------- SCRIPT: kitchen (team spec). `ta`, `en`, `keys`, the right-answer `why` and Paati’s reactions are additions to review. ---------- */
    const SCRIPT = [
      { paati: 'kitchen-ukku vaa kannu, saapaadu seiyalaam.', audio: 'kitchen_t1.mp3', ta: 'கிச்சனுக்கு வா கண்ணு, சாப்பாடு செய்யலாம்.', en: 'Come to the kitchen, dear. Let’s cook.',
        options: [
          { text: 'sari paati, naan unga kooda irukkaren. enna seiyalaam?', correct: true, keys: ['unga', 'kooda', 'seiyalaam?'], why: '‘unga kooda’ is the respectful ‘with you’, and ‘enna seiyalaam?’ offers to cook together.', ta: 'சரி பாட்டி, நான் உங்க கூட இருக்கறேன். என்ன செய்யலாம்?', en: 'Okay Paati, I’m here with you. What shall we make?' },
          { text: 'enna seiyanum, sollu da.', keys: ['sollu', 'da.'], why: '‘sollu da’ is a casual command. Ask politely with elders.', ta: 'என்ன செய்யணும், சொல்லு டா.', en: 'What do I have to do? Tell me, mate.' },
          { text: 'naan phone-la irukken, apram varen.', keys: ['phone-la', 'apram'], why: 'Putting your phone first hurts an elder. Join her warmly.', ta: 'நான் போன்ல இருக்கேன், அப்புறம் வரேன்.', en: 'I’m on my phone, I’ll come later.' }
        ],
        right: { text: 'romba santhosham kannu! vaa, sendhu seiyalaam.', audio: 'kitchen_t1_right.mp3', ta: 'ரொம்ப சந்தோஷம் கண்ணு! வா, சேர்ந்து செய்யலாம்.', en: 'That makes me so happy, dear! Come, let’s cook together.' },
        wrong: { text: 'kannu, ippadi pesalaamaa?', audio: 'kitchen_t1_wrong.mp3', ta: 'கண்ணு, இப்படி பேசலாமா?', en: 'Dear, should you talk like that?' } },
      { paati: 'vengayam konjam vettu kodu.', audio: 'kitchen_t2.mp3', ta: 'வெங்காயம் கொஞ்சம் வெட்டிக் குடு.', en: 'Chop a few onions for me.',
        options: [
          { text: 'sari paati, vettaren. ippadiya vettanum?', correct: true, keys: ['vettaren.', 'ippadiya'], why: 'You agree straight away (‘vettaren’, I’ll chop) and ask her to show you how, which elders love.', ta: 'சரி பாட்டி, வெட்டறேன். இப்படியா வெட்டணும்?', en: 'Okay Paati, I’ll chop them. Is this the way?' },
          { text: 'nee vetti kaattu, naan paakkaren.', keys: ['nee', 'kaattu,'], why: '‘nee’ with a command is too casual. Do it and ask politely.', ta: 'நீ வெட்டிக் காட்டு, நான் பாக்கறேன்.', en: 'You chop and show me, I’ll watch.' },
          { text: 'ayyo, ennaku kai valikkum da.', keys: ['ayyo,', 'da.'], why: 'Complaining with ‘da’ to an elder is disrespectful. Help gladly.', ta: 'அய்யோ, எனக்கு கை வலிக்கும் டா.', en: 'Ugh, my hand will hurt, mate.' }
        ],
        right: { text: 'aama, ippadi dhaan! nalla vettura.', audio: 'kitchen_t2_right.mp3', ta: 'ஆமா, இப்படி தான்! நல்லா வெட்டுற.', en: 'Yes, just like that! You chop well.' },
        wrong: { text: 'aiyo kannu, enna pechu idhu?', audio: 'kitchen_t2_wrong.mp3', ta: 'ஐயோ கண்ணு, என்ன பேச்சு இது?', en: 'Oh dear, what kind of talk is this?' } },
      { paati: 'udhu nalla irukka, ruchi paaru.', audio: 'kitchen_t3.mp3', ta: 'இது நல்லா இருக்கா, ருசி பாரு.', en: 'Is this good? Have a taste.',
        options: [
          { text: 'romba nalla irukku paati! neenga epdi pannreenga?', correct: true, keys: ['romba', 'neenga', 'pannreenga?'], why: 'You praise her cooking first, then ask with ‘neenga … pannreenga’, the respectful form.', ta: 'ரொம்ப நல்லா இருக்கு பாட்டி! நீங்க எப்படி பண்றீங்க?', en: 'It’s really good, Paati! How do you make it?' },
          { text: 'okay-dhaan, konjam uppu kammi da.', keys: ['okay-dhaan,', 'kammi', 'da.'], why: 'Criticising with ‘da’ is rude. Praise her cooking first.', ta: 'ஓகே தான், கொஞ்சம் உப்பு கம்மி டா.', en: 'It’s just okay, a bit low on salt, mate.' },
          { text: 'nalla irukku, recipe sollu.', keys: ['sollu.'], why: '‘sollu’ is a bare command. Ask respectfully: ‘sollunga paati’.', ta: 'நல்லா இருக்கு, ரெசிபி சொல்லு.', en: 'It’s good. Tell me the recipe.' }
        ],
        right: { text: 'ha ha, adhu en ragasiyam kannu!', audio: 'kitchen_t3_right.mp3', ta: 'ஹா ஹா, அது என் ரகசியம் கண்ணு!', en: 'Ha ha, that’s my secret, dear!' },
        wrong: { text: 'mm… sari, paarkalaam.', audio: 'kitchen_t3_wrong.mp3', ta: 'ம்ம்… சரி, பார்க்கலாம்.', en: 'Hmm… alright, we’ll see.' } },
      { paati: 'innaikku rasam dhaan, unakku pidikkumaa?', audio: 'kitchen_t4.mp3', ta: 'இன்னைக்கு ரசம் தான், உனக்கு பிடிக்குமா?', en: 'It’s rasam today. Do you like it?',
        options: [
          { text: 'aama paati, enakku rasam romba pidikkum. neenga seira rasam special.', correct: true, keys: ['pidikkum.', 'neenga', 'special.'], why: 'You say you love it and compliment her with ‘neenga seira’, the respectful ‘the one you make’.', ta: 'ஆமா பாட்டி, எனக்கு ரசம் ரொம்ப பிடிக்கும். நீங்க செய்ற ரசம் ஸ்பெஷல்.', en: 'Yes Paati, I love rasam. Yours is special.' },
          { text: 'rasam-a? ennaku pidikkaadhu da.', keys: ['pidikkaadhu', 'da.'], why: 'A blunt ‘no’ with ‘da’ hurts an elder who cooked for you. Be grateful.', ta: 'ரசமா? எனக்கு பிடிக்காது டா.', en: 'Rasam? I don’t like it, mate.' },
          { text: 'rasam-a? vera edhaachum pannu.', keys: ['vera', 'pannu.'], why: 'Telling Paati what to cook is a command. Ask kindly if you want something else.', ta: 'ரசமா? வேற ஏதாச்சும் பண்ணு.', en: 'Rasam? Make something else.' }
        ],
        right: { text: 'en chellam! nalla saapdu, innum oothuren.', audio: 'kitchen_t4_right.mp3', ta: 'என் செல்லம்! நல்லா சாப்டு, இன்னும் ஊத்துறேன்.', en: 'My darling! Eat well, I’ll pour you more.' },
        wrong: { text: 'aiyo… unakkaaga dhaan senjen kannu.', audio: 'kitchen_t4_wrong.mp3', ta: 'ஐயோ… உனக்காக தான் செஞ்சேன் கண்ணு.', en: 'Oh… I made it just for you, dear.' } },
      { paati: 'saapitta piragu pathiram kazhuvanum.', audio: 'kitchen_t5.mp3', ta: 'சாப்பிட்ட பிறகு பாத்திரம் கழுவணும்.', en: 'After eating, the dishes need washing.',
        options: [
          { text: 'naan kazhuvaren paati. neenga ukkaarunga.', correct: true, keys: ['kazhuvaren', 'neenga', 'ukkaarunga.'], why: 'You offer to do it yourself and ask her to rest with ‘neenga ukkaarunga’, the polite ‘please sit’.', ta: 'நான் கழுவறேன் பாட்டி. நீங்க உக்காருங்க.', en: 'I’ll wash them, Paati. You sit down.' },
          { text: 'nee kazhuvu, naan TV paakkaren.', keys: ['nee', 'kazhuvu,'], why: 'Ordering an elder with ‘nee’ is very rude. Offer to do it yourself.', ta: 'நீ கழுவு, நான் டிவி பாக்கறேன்.', en: 'You wash them, I’ll watch TV.' },
          { text: 'naalaikku kazhuvuren da.', keys: ['naalaikku', 'da.'], why: '‘da’ and putting it off is disrespectful. Offer to help now.', ta: 'நாளைக்கு கழுவுறேன் டா.', en: 'I’ll wash them tomorrow, mate.' }
        ],
        right: { text: 'romba nalla pulla nee! santhosham kannu.', audio: 'kitchen_t5_right.mp3', ta: 'ரொம்ப நல்ல புள்ள நீ! சந்தோஷம் கண்ணு.', en: 'You’re such a good child! I’m so happy, dear.' },
        wrong: { text: 'kannu, idhu sariyillai.', audio: 'kitchen_t5_wrong.mp3', ta: 'கண்ணு, இது சரியில்ல.', en: 'Dear, this isn’t right.' } }
    ];
    /* Paste each uploaded file’s asset link here, e.g. 'kitchen_t1.mp3': '/_blob/…'. Missing files play nothing. */
    const AUDIO_URLS = AUDIO;
    /* Hearts carry between rooms through this browser key. The kitchen and living room boards read it. */
    const HEART_KEY = 'tamil-rpg:paati-hearts';
    const saveHearts = (n) => { try { const v = JSON.stringify({ hearts: n, from: 'kitchen', at: Date.now() }); window.localStorage.setItem(HEART_KEY, v); window.localStorage.setItem('tamil-rpg:hearts:kitchen', v); } catch (e) { /* storage unavailable */ } };
    /* Hearts arrive from the previous room. Replaying this room always starts again from what you brought in. */
    let carried = null;
    try { for (const k of ["tamil-rpg:hearts:entrance", "tamil-rpg:paati-hearts"]) { const raw = window.localStorage.getItem(k); if (raw) { const v = JSON.parse(raw); if (typeof v.hearts === 'number' && v.hearts > 0) { carried = Math.min(5, v.hearts); break; } } } } catch (e) { /* storage unavailable */ }

    /* The front page saves the dialect and mode here; the report card reads each room's scores. */
    const SETTINGS = (() => { try { return JSON.parse(window.localStorage.getItem('tamil-rpg:settings') || '{}') || {}; } catch (e) { return {}; } })();
    const HARD = SETTINGS.mode === 'hard';
    const STATS_KEY = 'tamil-rpg:stats:kitchen';
    const saveStats = (first, mistakes) => { try { window.localStorage.setItem(STATS_KEY, JSON.stringify({ first: first, total: 5, mistakes: mistakes, at: Date.now() })); window.localStorage.setItem('tamil-rpg:last-room', STATS_KEY.split(':').pop()); } catch (e) { /* storage unavailable */ } };
    const heartsOn = this.props.heartsOn ?? true;
    const START = carried !== null ? carried : Math.max(1, Math.min(5, this.props.startHearts ?? 3));
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

    const play = (file) => {
      try {
        if (this._audio) { this._audio.pause(); this._audio = null; }
        const url = AUDIO_URLS[file];
        if (!url) return;
        this._audio = new Audio(url);
        this._audio.play();
      } catch (e) { /* audio unavailable */ }
    };

    const W = 40, H = 25;
    const g = [];
    for (let y = 0; y < H; y++) g.push(new Array(W).fill('q'));
    const f = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (j >= 0 && j < H && i >= 0 && i < W) g[j][i] = c; };
    f(0, 0, 40, 1, 'W'); f(0, 1, 40, 1, 'w'); f(0, 2, 40, 1, 'b');
    f(11, 1, 6, 1, 'P'); f(18, 1, 3, 1, 'n'); f(24, 1, 4, 1, 'J');
    f(4, 3, 26, 2, 'C');
    f(9, 3, 3, 1, 'G'); f(18, 3, 2, 1, 'S'); g[3][23] = 'F'; g[3][26] = 'X';
    f(0, 3, 1, 22, 'v'); f(0, 6, 1, 3, 'D');
    f(39, 3, 1, 22, 'v'); f(39, 9, 1, 3, 'D');
    f(34, 6, 3, 3, 'C'); g[7][35] = 'w';
    f(12, 9, 9, 2, 'T'); g[9][13] = 'L'; g[9][17] = 'L'; g[10][15] = 'u'; g[10][19] = 'u';
    const px = (c, x, y, w, h) => 'linear-gradient(' + c + ',' + c + ') ' + x + 'px ' + y + 'px/' + w + 'px ' + h + 'px no-repeat';
    const granite = 'radial-gradient(circle,#6b6b75 0 1px,transparent 1px) 0 0/6px 6px,#2e2e36';
    const P = {
      'q': px('#c9c2b2', 23, 0, 1, 24) + ',' + px('#c9c2b2', 0, 23, 24, 1) + ',#e8e4da',
      'Q': px('#c9c2b2', 23, 0, 1, 24) + ',' + px('#c9c2b2', 0, 23, 24, 1) + ',#d8d1c2',
      'W': px('#c99a6b', 0, 20, 24, 4) + ',#5b3a22',
      'w': '#f3e6cf',
      'b': 'repeating-conic-gradient(#cfe3ef 0 25%,#f3f7fa 0 50%) 0 0/12px 12px',
      'P': 'radial-gradient(circle,#d6dbe1 0 7px,#a7aeb6 7px 8px,transparent 8px) 0 4px/12px 24px no-repeat,radial-gradient(circle,#d6dbe1 0 7px,#a7aeb6 7px 8px,transparent 8px) 12px 4px/12px 24px no-repeat,#f3e6cf',
      'n': 'repeating-linear-gradient(90deg,#2f4f6a 0 2px,transparent 2px 6px) 2px 2px/20px 20px no-repeat,' + px('#9fd3e6', 2, 2, 20, 20) + ',#f3e6cf',
      'J': px('#c8553d', 3, 6, 7, 14) + ',' + px('#f2b705', 14, 6, 7, 14) + ',' + px('#e8e8f0', 3, 3, 7, 3) + ',' + px('#e8e8f0', 14, 3, 7, 3) + ',' + px('#5b3a22', 0, 20, 24, 4) + ',#f3e6cf',
      'C': px('#8f8f9c', 0, 21, 24, 3) + ',' + granite,
      'G': px('#b8b8c4', 3, 1, 18, 14) + ',' + px('#8f8f9c', 3, 13, 18, 3) + ',' + px('#ff9f40', 5, 17, 14, 2) + ',' + px('#8f8f9c', 0, 21, 24, 3) + ',' + granite,
      'S': px('#9aa3ad', 2, 2, 20, 17) + ',' + px('#cfd6dd', 4, 4, 16, 13) + ',' + px('#8f8f9c', 0, 21, 24, 3) + ',' + granite,
      'F': px('#d6dbe1', 8, 0, 8, 17) + ',' + px('#a7aeb6', 6, 15, 12, 4) + ',' + px('#8f8f9c', 0, 21, 24, 3) + ',' + granite,
      'X': 'radial-gradient(circle,#e9c46a 0 2px,transparent 2px) 6px 4px/6px 6px,radial-gradient(circle at 50% 45%,#d6dbe1 0 9px,transparent 9px),' + px('#8f8f9c', 0, 21, 24, 3) + ',' + granite,
      'w': 'radial-gradient(circle at 50% 45%,#4a4a55 0 4px,#d6dbe1 4px 9px,transparent 9px),' + px('#8f8f9c', 0, 21, 24, 3) + ',' + granite,
      'v': px('#c99a6b', 18, 0, 6, 24) + ',#5b3a22',
      'D': px('#e0a43a', 8, 0, 4, 24) + ',#7a4a2a',
      'T': px('#4a2a16', 0, 20, 24, 4) + ',#8a5a3a',
      'L': px('#2f7a3a', 1, 3, 22, 14) + ',' + px('#5aa64a', 1, 9, 22, 2) + ',' + px('#4a2a16', 0, 20, 24, 4) + ',#8a5a3a',
      'u': px('#d6dbe1', 8, 4, 8, 11) + ',' + px('#a7aeb6', 8, 12, 8, 3) + ',' + px('#4a2a16', 0, 20, 24, 4) + ',#8a5a3a'
    };
    const tiles = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let c = g[y][x];
      if (c === 'q' && (x + y) % 2 === 0) c = 'Q';
      tiles.push({ bg: P[c] || P['q'] });
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
      { paati: [240, 120], player: [84, 150] },
      { paati: [240, 120], player: [300, 120] },
      { paati: [252, 122], player: [300, 124] },
      { paati: [300, 180], player: [456, 180] },
      { paati: [380, 124], player: [444, 120] }
    ];
    const END = { paati: [300, 180], player: [456, 180] };
    const MARKS = { 1: { x: 322, y: 52 }, 4: { x: 456, y: 46 } };
    const isPlay = S.screen === 'play';
    const isEnd = S.screen === 'end';
    const T = Math.min(S.t, 4);
    const turn = SCRIPT[T];
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
      play(o.correct ? turn.right.audio : turn.wrong.audio);
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
      const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
      if (!SR) { set({ voice: 'unsupported' }); return; }
      try {
        const r = new SR();
        r.lang = 'ta-IN'; r.interimResults = false; r.maxAlternatives = 4;
        r.onresult = (ev) => { const res = ev.results && ev.results[0]; const alts = []; if (res) for (let i = 0; i < res.length; i++) alts.push(res[i].transcript); resolveFree(alts, 'voice'); };
        r.onerror = (ev) => set({ voice: ev && (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') ? 'blocked' : ev && ev.error === 'no-speech' ? 'nospeech' : 'error' });
        r.onend = () => { if (this.state && this.state.voice === 'listening') set({ voice: 'idle' }); };
        this._rec = r;
        r.start();
        set({ voice: 'listening', heardNote: null });
      } catch (e) { set({ voice: 'error' }); }
    };

    const reshuffleTurn = (t) => { const order = S.order.slice(); order[t] = shuffled(); return order; };
    const freshOrders = () => [shuffled(), shuffled(), shuffled(), shuffled(), shuffled()];
    const reset = { t: 0, picked: null, hearts: START, fx: null, firstTry: {}, tried: {}, mistakes: [], apologyUsed: false, apologyFailed: false, typed: '', heardNote: null, voice: 'idle' };
    const start = () => { play(SCRIPT[0].audio); if (heartsOn) saveHearts(START); set(Object.assign({ screen: 'play', order: freshOrders() }, reset)); };
    const replay = () => set(Object.assign({ screen: 'intro' }, reset));
    const retry = () => set({ picked: null, order: reshuffleTurn(S.t), typed: '', heardNote: null });
    const cont = () => {
      if (heartsOn && S.hearts <= 0) { set({ screen: 'broken' }); return; }
      if (S.t < 4) { play(SCRIPT[S.t + 1].audio); set({ t: S.t + 1, picked: null, typed: '', heardNote: null }); }
      else { if (heartsOn) saveHearts(S.hearts); saveStats(Object.keys(S.firstTry).filter((k) => S.firstTry[k]).length, S.mistakes); set({ screen: 'end', picked: null }); }
    };
    const replayLine = () => play(turn.audio);
    const replayReaction = () => play(re.audio);
    const apologiseRight = () => { const nh = Math.max(1, Math.min(5, S.hearts + 1)); saveHearts(nh); set({ screen: 'play', picked: null, order: reshuffleTurn(S.t), apologyUsed: true, hearts: nh, fx: { type: 'gain', idx: 0 }, fxN: S.fxN + 1 }); };
    const apologiseWrong = () => set({ apologyUsed: true, apologyFailed: true });
    const toggleTa = () => set({ showTa: !S.showTa });
    const toggleEn = () => set({ showEn: !S.showEn });

    const pos = isEnd ? END : POS[T];
    const paatiEx = isRight ? 'smile' : isWrong ? 'frown' : isEnd ? 'smile' : 'neutral';
    const paatiCls = isRight ? 'hop' : isWrong ? 'shake' : 'breathe';
    const pw = { x: pos.paati[0] - 6, y: pos.paati[1] - 12, cls: paatiCls, pixels: toPx(SAREE[paatiEx], Object.assign({}, paatiPal, potPal)).concat(toPx(SAREE_BODY, paatiPal)) };
    const people = [{ left: pos.player[0] - 6, top: pos.player[1] - 12, cls: '', pixels: toPx(BASE, playerPal) }];
    const props = [
      sp(['.bbbb.', '..ll..', '.bbbb.', 'bbllbb', 'bbbbbb', 'bbbbbb', '.bbbb.'], { b: '#d4a017', l: '#ffd166' }, 40, 290, 4, ''),
      sp(['.ssss.', 'sllsss', 'ssssss', 'ssssss', 'ssssss', 'sddsss', '.ssss.'], { s: '#c4cad1', l: '#eef1f4', d: '#8f969e' }, 870, 232, 4, '')
    ];
    if (S.t >= 1 && S.t <= 2 && !isEnd) { props.push(sp(['.pp.', 'pllp', 'pppp', '.pp.'], { p: '#9b2f5a', l: '#d77fa1' }, 306, 80, 3, '')); props.push(sp(['.pp.', 'pllp', 'pppp', '.pp.'], { p: '#9b2f5a', l: '#d77fa1' }, 324, 86, 3, '')); }
    if (S.t >= 3 || isEnd) props.push(sp(['.ssss.', 'srrrrs', '.ssss.'], { s: '#d6dbe1', r: '#c8553d' }, 372, 222, 4, ''));
    props.push(sp(['bbbbbbbbb', '.s..s..s.', '.s..s..s.', '.s..s..s.', 'sss.s.sss', '.s.sss.s.'], { b: '#5b3a22', s: '#c9ced6' }, 506, 22, 3, ''));
    props.push(sp(['.g', 'rr', '.r', 'rr', '.r', 'rr', '.r', 'rr'], { g: '#3f8a3e', r: '#c8302a' }, 560, 24, 3, 'sway'));
    props.push(sp(['.tt.oo.bb.', 'tttoooobbb', 'wwwwwwwwww', 'w.w.w.w.ww', 'wwwwwwwwww', '.wwwwwwww.'], { t: '#e23d28', o: '#b5446e', b: '#5b2a6e', w: '#b8894a' }, 100, 280, 3, ''));
    props.push(sp(['..kk..', '.ssss.', 'ssssss', 'ssssss', '.ssss.'], { k: '#2a2a2a', s: '#c9ced6' }, 676, 72, 3, ''));
    props.push(sp(['k...k..', 'kkkkk..', 'kekek..', 'kkkkk..', '.kkk...', 'kkkkk.t', 'kkkkkkt', 'kk.kk..'], { k: '#e8913a', e: '#2a1a0a', t: '#c06a1e' }, 516, 234, 3, 'breathe'));
    props.push(sp(['..g..g..', '.ggggg..', 'gggGggg.', '.gGggGg.', '..gggg..', '..pppp..', '..pPPp..', '...pp...'], { g: '#4f9a45', G: '#7cc16a', p: '#c8553d', P: '#a8432f' }, 880, 280, 4, 'sway'));
    const decor = [0, 1, 2].map((i) => ({ cls: 'steam', x: 236 + i * 12, y: 60 + (i % 2) * 4, w: 3, h: 8, c: 'rgba(255,255,255,0.9)', d: (i * 0.5).toFixed(1) })).concat([
      { cls: 'flick', x: 226, y: 92, w: 44, h: 3, c: '#5aa9ff', d: '0' },
      { cls: 'whistle', x: 680, y: 54, w: 10, h: 10, c: 'rgba(255,255,255,0.85)', d: '0' },
      { cls: 'glowp', x: 424, y: 124, w: 88, h: 40, c: 'rgba(255,230,170,0.16)', d: '0' },
      { cls: 'drift', x: 444, y: 150, w: 3, h: 3, c: 'rgba(255,246,220,0.9)', d: '0.5' },
      { cls: 'drift', x: 480, y: 140, w: 2, h: 2, c: 'rgba(255,246,220,0.9)', d: '2' }
    ]);
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
    const note = (file) => (showNames && file && !AUDIO_URLS[file] ? 'audio: ' + file + ' (not uploaded yet)' : '');
    const tog = (on) => ({ pressed: on ? 'true' : 'false', bg: on ? '#2a7d6f' : '#fffaf0', ink: on ? '#ffffff' : '#2a7d6f' });
    const brokenText = S.apologyFailed ? 'That made it worse: ‘da’ and ‘vidu’ brush an elder off. Paati needs some time. Start the visit again.' : S.apologyUsed ? 'You’ve already apologised once. Paati needs some time. Start the visit again.' : 'You lost all of Paati’s hearts, so she has stopped talking to you. Say sorry the right way to win one heart back and carry on.';

    return {
      tiles, props, people, pw, badge, burst, portraitBurst, endBurst, hurt, heartRow, heartRowStatic, introHearts, heartNote, pips,
      face: toPx(faceRows(paatiEx), facePal), endFace: toPx(faceRows('smile'), facePal),
      portraitCls: isRight ? 'hop' : isWrong ? 'shake' : 'breathe',
      heartsOn: heartsOn, hearts: S.hearts, heartsLabel: S.hearts + ' of 5 hearts',
      heartPanelCls: heartsOn && S.hearts <= 1 && isPlay ? 'alarm' : '',
      introHeartText: carried !== null ? 'You bring ' + START + ' of Paati’s 5 hearts from the entrance' : 'You start with ' + START + ' of Paati’s 5 hearts (play the entrance first to carry yours in)',
      showHints: (this.props.showHints ?? true) && !isEnd && !HARD,
      modeChip: HARD ? { t: 'HARD', bg: '#a32d2d', ink: '#ffffff' } : { t: 'EASY', bg: '#2a9d8f', ink: '#04241f' },
      isIntro: S.screen === 'intro', isPlay: isPlay, isEnd: isEnd, isBroken: S.screen === 'broken',
      noPick: isPlay && S.picked === null, hasPick: isPlay && S.picked !== null,
      talkLine: isPlay && S.picked === null, talkReply: isPlay && S.picked !== null,
      isRight: isRight, isWrong: isWrong, isLove: isRight && heartsOn, isHurt: isWrong && heartsOn,
      showMark: !!(isPlay && S.picked === null && MARKS[S.t] && !HARD), mark: MARKS[S.t] || { x: 0, y: 0 }, decor: decor,
      rootRef: this._rootRef, stage: { s: (this.state && this.state.scale) || 1, w: Math.round(960 * ((this.state && this.state.scale) || 1)), h: Math.round(600 * ((this.state && this.state.scale) || 1)) }, showRotate: !!(this.state && this.state.portrait),
      canRetry: isWrong && (!heartsOn || S.hearts > 0), canContinue: isRight || (isWrong && heartsOn && S.hearts <= 0),
      contBtn: isWrong ? { label: 'Paati turns away…', bg: '#6b2b33', edge: '#2a0a10', ink: '#ffd6de' } : { label: S.t < 4 ? 'Continue' : 'Finish cooking', bg: '#f4c444', edge: '#7a4a00', ink: '#3a2316' },
      turn: turn, turnNo: T + 1, re: re, verdict: verdict,
      mine: opt ? { via: viaLabel, parts: parts, en: opt.en, why: opt.why || '', hasHeard: S.via !== 'tap' && !!S.heard, heardLine: (S.via === 'voice' ? 'Heard: “' : 'Typed: “') + S.heard + '” · closest answer, ' + S.matchPct + '% match' } : { via: '', parts: [], en: '', why: '', hasHeard: false, heardLine: '' },
      opts: S.order[T].map((idx, i) => { const o = turn.options[idx]; return { n: String(i + 1), text: o.text, ta: o.ta, en: o.en, pick: pick(i) }; }),
      typed: S.typed, onType, onTypeKey, submitTyped, listen, mic: mic,
      hasHeardNote: !!S.heardNote, heardNote: S.heardNote || { t: '', c: '' },
      showTa: S.showTa, showEn: S.showEn, taBtn: tog(S.showTa), enBtn: tog(S.showEn),
      audioNote: { line: note(turn.audio), reply: note(re.audio) },
      pipLabel: 'Turn ' + (T + 1) + ' of 5',
      endStats: 'First-try answers: ' + firstCount + ' of 5' + (heartsOn ? ' · ' + S.hearts + ' of 5 hearts carry on to the living room' : ''),
      mistakes: S.mistakes, hasMistakes: S.mistakes.length > 0,
      canApologise: !S.apologyUsed, brokenText: brokenText,
      start, replay, retry, cont, replayLine, replayReaction, apologiseRight, apologiseWrong, toggleTa, toggleEn
    };
  }
}

const DEFAULT_PROPS = {"heartsOn": true, "startHearts": 3, "showHints": true, "showAudioNames": true};

export default function KitchenBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-kitchen">
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
            {v?.showMark ? (
              <>
                <div className={"bob"} aria-hidden={"true"} style={{ position: "absolute", left: `${v?.mark?.x ?? ""}px`, top: `${v?.mark?.y ?? ""}px`, width: "16px", height: "18px", background: "#9fe1cb", border: "3px solid #0f6e56", color: "#04342c", fontWeight: "600", fontSize: "13px", lineHeight: "18px", textAlign: "center" }}>
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
                    {"\u0b9a\u0bae\u0bc8\u0baf\u0bb2\u0bb1\u0bc8"}
                  </span>
                  <span style={{ fontSize: "14px", color: "#8a6a4a" }}>
                    {" \u00b7 kitchen"}
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
              <div role={"img"} aria-label={"House map: room 2 of 3, kitchen"} style={{ position: "relative", width: "70px", height: "66px", flexShrink: "0" }}>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "24px", top: "0px", width: "22px", height: "5px", background: "repeating-linear-gradient(90deg,#c8553d 0 6px,#a8432f 6px 8px)" }}></div>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "16px", top: "5px", width: "38px", height: "5px", background: "repeating-linear-gradient(90deg,#c8553d 0 6px,#a8432f 6px 8px)" }}></div>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "8px", top: "10px", width: "54px", height: "5px", background: "repeating-linear-gradient(90deg,#c8553d 0 6px,#a8432f 6px 8px)" }}></div>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "0px", top: "15px", width: "70px", height: "5px", background: "repeating-linear-gradient(90deg,#c8553d 0 6px,#a8432f 6px 8px)" }}></div>
                <div aria-hidden={"true"} style={{ position: "absolute", left: "3px", top: "20px", width: "64px", height: "46px", boxSizing: "border-box", background: "#f3e6cf", border: "2px solid #5b3a22", borderTopWidth: "3px" }}></div>
                <div title={"Kitchen"} style={{ position: "absolute", left: "8px", top: "25px", width: "26px", height: "18px", boxSizing: "border-box", border: "2px solid #5b3a22", background: "#ffd166" }}>
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
                <div title={"Entrance"} style={{ position: "absolute", left: "8px", top: "45px", width: "26px", height: "18px", boxSizing: "border-box", border: "2px solid #5b3a22", background: "#f3dc9a" }}></div>
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
                  {"\u0b9a\u0bae\u0bc8\u0baf\u0bb2\u0bb1\u0bc8"}
                </span>
                <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "13px", color: "#8a6a4a" }}>
                  {"Room 2 of 3 \u00b7 kitchen"}
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
                      {"Paati\u2019s house \u00b7 stop 2 of 3"}
                    </div>
                    <div style={{ fontSize: "26px", lineHeight: "1.2" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700" }}>
                        {"\u0b9a\u0bae\u0bc8\u0baf\u0bb2\u0bb1\u0bc8"}
                      </span>
                      {" \u00b7 Cooking with Paati"}
                    </div>
                    <div style={{ fontSize: "17px", lineHeight: "1.5", color: "#5a4536" }}>
                      {"Paati wants to cook lunch with you. Help her around the kitchen, taste her cooking and answer her kindly."}
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
                      {"Roll up your sleeves"}
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
                      {"You cooked with Paati! She\u2019s so proud."}
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
                        {"Cook with Paati again"}
                      </button>
                      <Link to="/living-room" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", boxSizing: "border-box", padding: "0 14px", background: "#f4c444", border: "3px solid #7a4a00", color: "#3a2316", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                        {"Join Paati in the living room"}
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
