// @ts-nocheck
/* Generated from the design canvas board "Home.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "react-router-dom";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import "./home-prototype.css";

class Component extends DCLogic {
  renderVals() {
    const START = Math.max(1, Math.min(5, this.props.startHearts ?? 3));
    const S = Object.assign({ screen: 'intro', queue: [0, 1, 2, 3], qi: 0, picked: null, res: {}, hearts: START, drill: false, bonus: false, bonusDone: false, inspect: false, showTl: true, showEn: true, fx: null, fxN: 0, unlockFlash: false, everFull: false, apologyUsed: false, apologyFailed: false }, this.state || {});
    const set = (o) => this.setState(o);

    const W = 40, H = 25;
    const g = [];
    for (let y = 0; y < H; y++) g.push(new Array(W).fill('r'));
    const f = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (j >= 0 && j < H && i >= 0 && i < W) g[j][i] = c; };
    f(0, 0, 40, 1, 'W'); f(0, 1, 40, 2, 'w'); f(0, 3, 40, 1, 'k');
    f(4, 1, 3, 2, 'n'); f(30, 1, 3, 2, 'n');
    g[1][12] = 'f'; g[1][14] = 'f'; g[2][13] = 'f';
    f(22, 1, 3, 3, 'C');
    f(0, 4, 1, 21, 'v'); f(39, 4, 1, 21, 'v');
    f(0, 8, 1, 3, 'D'); f(1, 8, 2, 3, 'o');
    f(10, 4, 1, 2, 'j'); f(15, 4, 1, 2, 'j'); f(10, 6, 6, 1, 'J');
    f(18, 9, 6, 4, 'a');
    f(12, 9, 2, 1, 't');
    f(34, 4, 5, 8, 'S'); f(33, 4, 1, 8, 'b');
    g[4][31] = 'p'; g[13][2] = 'p'; g[13][28] = 'p';
    const px = (c, x, y, w, h) => 'linear-gradient(' + c + ',' + c + ') ' + x + 'px ' + y + 'px/' + w + 'px ' + h + 'px no-repeat';
    const floor = px('#a4452f', 23, 0, 1, 24) + ',' + px('#a4452f', 0, 23, 24, 1) + ',#b4533c';
    const P = {
      'r': floor, 'W': px('#c99a6b', 0, 20, 24, 4) + ',#5b3a22', 'w': '#f3e6cf', 'k': px('#8a5a3a', 0, 14, 24, 10) + ',#f3e6cf',
      'n': 'repeating-linear-gradient(90deg,#2f4f6a 0 2px,transparent 2px 6px) 2px 2px/20px 20px no-repeat,' + px('#9fd3e6', 2, 2, 20, 20) + ',#f3e6cf',
      'f': px('#e9d3a8', 6, 6, 12, 10) + ',' + px('#6b3f22', 4, 4, 16, 14) + ',#f3e6cf',
      'C': 'repeating-linear-gradient(90deg,#c2185b 0 6px,#f2b705 6px 8px,#2e7d32 8px 12px)',
      'v': px('#c99a6b', 18, 0, 6, 24) + ',#5b3a22', 'D': px('#e0a43a', 2, 0, 4, 24) + ',#7a4a2a',
      'o': 'radial-gradient(circle,#fff8ec 0 2px,transparent 2px) 0 0/8px 8px,#b4533c',
      'J': px('#5b3a22', 0, 18, 24, 6) + ',#9c6236', 'j': px('#c9b48a', 10, 0, 4, 24) + ',' + floor,
      'a': 'repeating-linear-gradient(0deg,#e8c77d 0 4px,#d4ad5e 4px 6px)',
      'S': 'repeating-linear-gradient(0deg,#8a5a3a 0 4px,#c99a6b 4px 12px)', 'b': px('#5b3a22', 8, 0, 8, 24) + ',' + floor,
      't': px('#e8e8f0', 4, 4, 6, 6) + ',' + px('#e8e8f0', 14, 9, 6, 6) + ',' + px('#4a2a16', 0, 20, 24, 4) + ',#7a4a2a',
      'p': px('#5aa64a', 4, 2, 16, 10) + ',' + px('#3f8a3e', 8, 4, 8, 4) + ',' + px('#a8432f', 6, 12, 12, 10) + ',' + floor
    };
    const tiles = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = g[y][x];
      const alt = c === 'r' && (x * 31 + y * 17) % 5 === 0;
      tiles.push({ bg: alt ? px('#a4452f', 23, 0, 1, 24) + ',' + px('#a4452f', 0, 23, 24, 1) + ',#ad4d37' : (P[c] || floor) });
    }

    const BASE = ['..hhhh..', '.hhhhhh.', '.hssssh.', '.sesses.', '..ssss..', '.cddddc.', 'scddddcs', 'scddddcs', '.cddddc.', '..pppp..', '..p..p..', '.ff..ff.'];
    const SAREE = ['..hhhh..', '.hjhhhh.', '.hssssh.', '.sesses.', '..ssss..', '.krrrgk.', 'skrrrgks', 'srrrrgrs', '.rrrrgr.', '.rrrrgr.', '.rrrrrr.', '.gggggg.'];
    const MOUTH = { neutral: '..ssss..', happy: '..smms..', surprised: '..smss..', laugh: '..mmmm..', sad: '..smms..' };
    const EYES = { neutral: '.sesses.', happy: '.sesses.', surprised: '.eessee.', laugh: '.ssssss.', sad: '.ssssss.' };
    const face = (rows, ex) => rows.map((r, i) => (i === 3 ? EYES[ex] || r : i === 4 ? MOUTH[ex] || r : r));
    const LAMP = ['..f..', '..b..', '.bbb.', '..b..', '..b..', '..b..', '.bbb.', 'bbbbb'];
    const BAG = ['..hh..', '.h..h.', 'ssssss', 'sllsss', 'ssssss', 'd....d'];
    const toPx = (rows, pal) => rows.join('').split('').map((ch) => ({ c: ch === '.' ? 'transparent' : (pal[ch] || '#ff00ff') }));
    const sp = (rows, pal, x, y, size) => ({ left: x, top: y, cols: rows[0].length, px: size, pixels: toPx(rows, pal) });
    const paatiPal = { h: '#d8d4cc', j: '#ffffff', s: '#a86b45', e: '#1d1d1d', m: '#5a1e12', k: '#2e7d32', r: '#c2185b', g: '#f2b705' };
    const cousinPal = { h: '#1d1d1d', s: '#9a6440', e: '#1d1d1d', m: '#5a1e12', c: '#f4a261', d: '#f4a261', p: '#3d5a80', f: '#2a2a2a' };
    const playerPal = { h: '#3b2a20', s: '#c68a5e', e: '#1d1d1d', m: '#c68a5e', c: '#e76f51', d: '#2a9d8f', p: '#264653', f: '#2a2a2a' };

    const WHO = {
      paati: { name: 'பாட்டி', sub: 'Paati · grandmother', x: 184, y: 120, pal: paatiPal, rows: SAREE, wx: 172, wy: 180 },
      karthik: { name: 'கார்த்திக்', sub: 'Karthik · younger cousin', x: 496, y: 164, pal: cousinPal, rows: BASE, wx: 484, wy: 222 }
    };
    const R = (who, ta, tl, en, emote) => ({ who, ta, tl, en, emote });
    const TURNS = [
      { who: 'paati', goal: 'greet Paati respectfully', ta: 'வா கண்ணு! வந்துட்டியா?', tl: 'Vaa kannu! Vandhuttiyaa?', en: 'Come, dear! You’ve made it?', opts: [
        { ta: 'ஹாய் பாட்டி, நல்லா இருக்கியா?', tl: 'Hi Paati, nalla irukkiyaa?', en: 'Hi Paati, you doing okay?', kind: 'casual', h: -1, p: [22, 20, 8, 22], re: R('paati', 'என்ன, ‘இருக்கியா’வா? சரி சரி, உள்ள வா.', 'Enna, ‘irukkiyaa’-vaa? Sari sari, ulla vaa.', '‘Irukkiyaa’, is it? Alright, come in.', '!?'), fb: 'Too casual for an elder. Swap இருக்கியா for இருக்கீங்களா.', card: 'Register · இருக்கியா → இருக்கீங்களா (to an elder)' },
        { ta: 'வணக்கம் பாட்டி! நல்லா இருக்கீங்களா?', tl: 'Vanakkam Paati! Nalla irukkeengalaa?', en: 'Hello Paati! Are you keeping well?', kind: 'good', h: 1, p: [25, 21, 25, 22], re: R('paati', 'நல்லா இருக்கேன் கண்ணு! உள்ள வா.', 'Nalla irukken kannu! Ulla vaa.', 'I’m well, dear! Come in.', '♥'), fb: 'Perfect. The ‑ங்க ending shows respect to an elder.' },
        { ta: 'Hi Paati! How are you?', tl: '(in English)', en: 'Hi Paati! How are you?', kind: 'english', h: -1, p: [6, 22, 18, 23], re: R('paati', 'தமிழ்ல பேசு கண்ணு!', 'Tamil-la pesu kannu!', 'Speak in Tamil, dear!', '…'), fb: 'English fallback. Try: Nalla irukkeengalaa?', card: 'English · “How are you?” → நல்லா இருக்கீங்களா?' }
      ] },
      { who: 'paati', goal: 'tell her how the trip went', ta: 'பயணம் எப்படி இருந்துச்சு? டாக்ஸி சரியா வந்துச்சா?', tl: 'Payanam eppadi irundhuchu? Taxi sariyaa vandhuchaa?', en: 'How was the trip? Did the taxi get here alright?', opts: [
        { ta: 'நல்லா இருந்துச்சு பாட்டி. கொஞ்சம் traffic, அவ்வளவுதான்.', tl: 'Nalla irundhuchu Paati. Konjam traffic, avvalavu dhaan.', en: 'It was good, Paati. Bit of traffic, that’s all.', kind: 'good', h: 1, p: [24, 20, 24, 22], re: R('paati', 'சரி சரி, களைப்பா இருப்ப.', 'Sari sari, kalaippaa iruppa.', 'Okay, okay, you must be tired.', '♥'), fb: 'Natural spoken Tamil. “Traffic” is an accepted loanword.' },
        { ta: 'Flight was long, but okay.', tl: '(in English)', en: 'Flight was long, but okay.', kind: 'english', h: -1, p: [5, 22, 16, 23], re: R('paati', 'ம்ம்… தமிழ்ல சொல்லு கண்ணு.', 'Mm… Tamil-la sollu kannu.', 'Mm… say it in Tamil, dear.', '…'), fb: 'English fallback. Try: Konjam neram aachu, aanaa okay.', card: 'English · “It was long” → கொஞ்சம் நேரம் ஆச்சு' },
        { ta: 'பயணம் மிகவும் இனிமையாக இருந்தது.', tl: 'Payanam migavum inimaiyaaga irundhadhu.', en: 'The journey was most pleasant.', kind: 'stiff', h: 0, p: [25, 20, 14, 21], re: R('karthik', 'ஹா! நியூஸ் ரீடர் மாதிரி பேசுற!', 'Haa! News reader maadhiri pesura!', 'Ha! You sound like a newsreader!', 'ha!'), fb: 'That’s written Tamil. Spoken Tamil says நல்லா இருந்துச்சு.', card: 'Too stiff · இருந்தது → இருந்துச்சு (spoken)' }
      ] },
      { who: 'karthik', goal: 'answer your cousin casually', ta: 'ஏய்! எனக்கு என்ன வாங்கிட்டு வந்த?', tl: 'Ey! Enakku enna vaangittu vandha?', en: 'Hey! What did you get me?', opts: [
        { ta: 'உங்களுக்கு சாக்லேட் வாங்கி வந்துள்ளேன்.', tl: 'Ungalukku chocolate vaangi vandhullen.', en: 'I have brought chocolate for you.', kind: 'stiff', h: 0, p: [24, 20, 10, 21], re: R('karthik', '‘உங்களுக்கு’வா? நான் உன் தம்பி டா!', '‘Ungalukku’-vaa? Naan un thambi daa!', '‘Ungalukku’? I’m your little brother!', 'ha!'), fb: 'Too formal for a younger cousin. Use உனக்கு.', card: 'Too formal · உங்களுக்கு → உனக்கு (to a younger cousin)' },
        { ta: 'Surprise! Wait and see.', tl: '(in English)', en: 'Surprise! Wait and see.', kind: 'english', h: 0, p: [4, 22, 18, 23], re: R('karthik', 'தமிழ்ல சொல்லு, பார்ப்போம்!', 'Tamil-la sollu, paarppom!', 'Say it in Tamil, let’s see!', '…'), fb: 'English fallback. Try: Konjam wait pannu!', card: 'English · “Wait and see” → கொஞ்சம் wait பண்ணு' },
        { ta: 'உனக்கு chocolate வாங்கிட்டு வந்தேன்!', tl: 'Unakku chocolate vaangittu vandhen!', en: 'Got you chocolate!', kind: 'good', h: 1, p: [24, 21, 25, 23], re: R('karthik', 'சூப்பர்! தேங்க்ஸ்!', 'Super! Thanks!', 'Super! Thanks!', '♪'), fb: 'Right call. உனக்கு suits a younger cousin, and Paati loves to see you two get along.' }
      ] },
      { who: 'paati', goal: 'ask about your bags and a wash', ta: 'இன்னும் ஏன் நிக்குற? உக்காரு கண்ணு.', tl: 'Innum yaen nikkura? Ukkaaru kannu.', en: 'Why are you still standing? Sit down, dear.', opts: [
        { ta: 'Where can I keep my bags?', tl: '(in English)', en: 'Where can I keep my bags?', kind: 'english', h: -1, p: [5, 22, 18, 23], re: R('paati', 'பை-யா? தமிழ்ல கேளு கண்ணு.', 'Pai-yaa? Tamil-la kelu kannu.', 'Your bags? Ask in Tamil, dear.', '…'), fb: 'English fallback. Try: Bag enga vekkanum?', card: 'English · “Where do I keep my bag?” → bag எங்க வெக்கணும்?' },
        { ta: 'பாட்டி, bag எங்க வெக்கணும்? கொஞ்சம் fresh ஆகலாமா?', tl: 'Paati, bag enga vekkanum? Konjam fresh aagalaamaa?', en: 'Paati, where should I put my bag? Can I freshen up?', kind: 'good', h: 1, p: [23, 20, 24, 22], re: R('paati', 'மாடி ரூம்ல வெச்சிடு. குளிச்சிட்டு வா, காபி போடுறேன்.', 'Maadi room-la vechidu. Kulichittu vaa, kaapi podren.', 'Put it upstairs. Have a wash, I’ll make coffee.', '♥'), fb: 'Polite request. ‑லாமா? asks permission nicely.' },
        { ta: 'Bag-ஐ எங்க போடுறது? Bathroom எங்க?', tl: 'Bag-a enga podradhu? Bathroom enga?', en: 'Where do I dump the bag? Where’s the bathroom?', kind: 'casual', h: -1, p: [22, 20, 12, 22], re: R('paati', 'நேரா கேக்குற! மாடில இருக்கு.', 'Neraa kekkura! Maadi-la irukku.', 'Straight to the point! It’s upstairs.', '!?'), fb: 'A bit blunt with an elder. Add “Paati” and a polite ‑லாமா?', card: 'Register · blunt question → add பாட்டி + ‑லாமா?' }
      ] },
      { who: 'paati', goal: 'hear Paati’s secret', ta: 'உனக்கு ஒரு ரகசியம் சொல்லட்டுமா?', tl: 'Unakku oru ragasiyam sollattumaa?', en: 'Shall I tell you a secret?', opts: [
        { ta: 'சொல்லு பாட்டி!', tl: 'Sollu Paati!', en: 'Tell me, Paati! (casual)', kind: 'casual', h: -1, p: [24, 20, 10, 22], re: R('paati', '‘சொல்லு’வா? ம்ம்… சரி.', '‘Sollu’-vaa? Mm… sari.', '‘Sollu’, is it? Hmm… alright.', '!?'), fb: 'With an elder, use the polite command: சொல்லுங்க.', card: 'Register · சொல்லு → சொல்லுங்க (to an elder)' },
        { ta: 'Yes, tell me!', tl: '(in English)', en: 'Yes, tell me!', kind: 'english', h: -1, p: [5, 22, 18, 23], re: R('paati', 'தமிழ்ல கேட்டா தான் சொல்லுவேன்!', 'Tamil-la kettaa dhaan solluven!', 'I’ll only tell you if you ask in Tamil!', '…'), fb: 'English fallback. Try: Sollunga Paati!', card: 'English · “Tell me” → சொல்லுங்க' },
        { ta: 'சொல்லுங்க பாட்டி, கேக்குறேன்!', tl: 'Sollunga Paati, kekkuren!', en: 'Tell me, Paati, I’m listening!', kind: 'good', h: 1, p: [25, 21, 25, 23], re: R('paati', 'என் சாம்பார் ரகசியம்: கொஞ்சம் வெல்லம்! யாருகிட்டயும் சொல்லாத.', 'En saambaar ragasiyam: konjam vellam! Yaarukittayum sollaadha.', 'My sambar secret: a little jaggery! Don’t tell anyone.', '♥'), fb: '‑ங்க turns a command into a polite request.' }
      ] }
    ];
    const MAIN = [0, 1, 2, 3];

    const KIND = {
      good: { label: 'Spot on', bg: '#c0dd97', edge: '#3b6d11', ink: '#173404' },
      casual: { label: 'Too casual', bg: '#f7c1c1', edge: '#a32d2d', ink: '#501313' },
      stiff: { label: 'Too stiff', bg: '#fac775', edge: '#854f0b', ink: '#412402' },
      english: { label: 'English fallback', bg: '#b5d4f4', edge: '#185fa5', ink: '#042c53' }
    };
    const EXPR = { '♥': 'happy', '♪': 'happy', '!?': 'surprised', 'ha!': 'laugh', '…': 'sad' };

    const tIdx = S.queue[Math.min(S.qi, S.queue.length - 1)];
    const turn = TURNS[tIdx];
    const sum = (a) => a[0] + a[1] + a[2] + a[3];

    const pick = (i) => () => {
      const o = turn.opts[i];
      const tot = sum(o.p);
      const prev = S.res[tIdx];
      let score = tot;
      if (prev) {
        const won = tot > prev.first ? prev.first + Math.round(0.8 * (tot - prev.first)) : tot;
        score = Math.max(prev.score, won);
      }
      const res = Object.assign({}, S.res);
      res[tIdx] = { first: prev ? prev.first : tot, firstKind: prev ? prev.firstKind : o.kind, card: prev ? prev.card : o.card, score: score, kind: o.kind, p: o.p, gain: score - (prev ? prev.score : 0) };
      const nh = Math.max(0, Math.min(5, S.hearts + o.h));
      const fx = nh > S.hearts ? { type: 'gain', idx: nh - 1 } : nh < S.hearts ? { type: 'loss', idx: nh } : null;
      const firstFull = nh === 5 && !S.everFull;
      set({ res: res, picked: i, inspect: false, hearts: nh, fx: fx, fxN: S.fxN + 1, unlockFlash: firstFull, everFull: S.everFull || nh === 5 });
    };
    const fresh = { queue: MAIN, qi: 0, picked: null, res: {}, hearts: START, drill: false, bonus: false, bonusDone: false, inspect: false, fx: null, unlockFlash: false, everFull: false, apologyUsed: false, apologyFailed: false };
    const start = () => set(Object.assign({ screen: 'play' }, fresh));
    const replay = () => set(Object.assign({ screen: 'intro' }, fresh));
    const retry = () => set({ picked: null, inspect: false, unlockFlash: false });
    const cont = () => {
      if (S.hearts <= 0) { set({ screen: 'broken', inspect: false }); return; }
      if (S.qi + 1 < S.queue.length) set({ qi: S.qi + 1, picked: null, inspect: false, unlockFlash: false });
      else set({ screen: 'summary', picked: null, inspect: false, unlockFlash: false, bonusDone: S.bonusDone || (S.bonus && !!S.res[4] && S.res[4].kind === 'good') });
    };
    const openTurns = MAIN.filter((t) => S.res[t] && S.res[t].kind !== 'good');
    const drill = () => { if (openTurns.length) set({ screen: 'play', queue: openTurns, qi: 0, picked: null, drill: true, bonus: false, inspect: false }); };
    const playBonus = () => set({ screen: 'play', queue: [4], qi: 0, picked: null, drill: false, bonus: true, inspect: false, unlockFlash: false });
    const apologiseRight = () => set({ screen: 'play', hearts: 1, picked: null, apologyUsed: true, fx: { type: 'gain', idx: 0 }, fxN: S.fxN + 1 });
    const apologiseWrong = () => set({ apologyUsed: true, apologyFailed: true });
    const openInspect = () => set({ inspect: true });
    const closeInspect = () => set({ inspect: false });
    const toggleTl = () => set({ showTl: !S.showTl });
    const toggleEn = () => set({ showEn: !S.showEn });

    const isPlay = S.screen === 'play';
    const hasPick = isPlay && S.picked !== null;
    const opt = hasPick ? turn.opts[S.picked] : null;
    const cur = hasPick ? S.res[tIdx] : null;
    const re = opt ? opt.re : { who: 'paati', ta: '', tl: '', en: '', emote: '' };
    const kind = KIND[opt ? opt.kind : 'good'];
    const expr = hasPick ? EXPR[re.emote] || 'neutral' : 'neutral';
    const sign = (n) => (n >= 0 ? '+' : '−') + Math.abs(n);
    const hearted = opt ? opt.h : 0;
    const toast = cur ? Object.assign({ text: (hearted > 0 ? '+1 heart' : hearted < 0 ? '−1 heart' : 'no change') + ' · ' + sign(cur.gain) + ' pts' }, hearted > 0 ? { bg: '#c2185b', edge: '#5a0f1e' } : hearted < 0 ? { bg: '#6b2b33', edge: '#2a0a10' } : { bg: '#3a3350', edge: '#1f1a2e' }) : { text: '', bg: '', edge: '' };
    const emote = { x: WHO[re.who].x, y: WHO[re.who].y, t: re.emote };

    const reactCls = (who) => {
      if (!hasPick) return who === 'paati' ? 'breathe' : '';
      if (who === 'paati' && hearted < 0) return opt.kind === 'casual' ? 'shake' : 'tilt';
      if (re.who !== who) return who === 'paati' ? 'breathe' : '';
      return expr === 'happy' ? 'hop' : expr === 'laugh' || expr === 'surprised' ? 'shake' : expr === 'sad' ? 'tilt' : '';
    };
    const exprFor = (who) => {
      if (!hasPick) return 'neutral';
      if (who === 'paati' && hearted < 0 && re.who !== 'paati') return 'sad';
      return re.who === who ? expr : 'neutral';
    };
    const actor = (key, x, y, size, ex, cls) => {
      const w = WHO[key];
      return { left: x, top: y, cols: 8, px: size, cls: cls, pixels: toPx(face(w.rows, ex), w.pal), blink: ex === 'neutral' || ex === 'happy', ex1: 2 * size, ex2: 5 * size, ey: 3 * size, skin: w.pal.s };
    };
    const actors = [actor('paati', 172, 180, 3, exprFor('paati'), reactCls('paati')), actor('karthik', 484, 222, 3, exprFor('karthik'), reactCls('karthik'))];
    const props = [sp(LAMP, { f: '#ffd166', b: '#d4a017' }, 630, 84, 3), sp(BAG, { h: '#222222', s: '#3d5a80', l: '#98c1d9', d: '#222222' }, 112, 204, 3), sp(BASE, playerPal, 76, 180, 3)];
    const shadows = [{ left: 79, top: 213 }, { left: 175, top: 213 }, { left: 487, top: 255 }];
    const pKey = hasPick ? re.who : turn.who;
    const portrait = isPlay ? [actor(pKey, 54, 404, 8, hasPick ? exprFor(pKey) : 'neutral', hasPick ? reactCls(pKey) : '')] : [];

    const isLove = hasPick && hearted > 0;
    const isHurt = hasPick && hearted < 0;
    const burstCls = ['floatL', 'floatC', 'floatR', 'floatL', 'floatR', 'floatC', 'floatL'];
    const burst = burstCls.map((c, i) => ({ cls: c, x: 168 + (i % 4) * 9, y: 172 + (i % 3) * 6, d: (i * 0.09).toFixed(2), w: i % 2 ? 14 : 21, h: i % 2 ? 12 : 18 }));
    const portraitBurst = ['floatL', 'floatC', 'floatR'].map((c, i) => ({ cls: c, x: 64 + i * 28, y: 470, d: (0.15 + i * 0.12).toFixed(2) }));
    const hurt = { x: 206, y: 128 };

    const fxCls = S.fx ? (S.fx.type === 'gain' ? 'pop' : 'loss') + (S.fxN % 2 ? 'A' : 'B') : '';
    const heartRow = [0, 1, 2, 3, 4].map((i) => ({ c: i < S.hearts ? '#ff4d6d' : '#3a3350', hi: i < S.hearts ? '#ffd6de' : '#3a3350', cls: S.fx && S.fx.idx === i ? fxCls : '' }));
    const heartRowStatic = heartRow.map((h) => ({ c: h.c, hi: h.hi }));
    const introHearts = [0, 1, 2, 3, 4].map((i) => ({ c: i < START ? '#ff4d6d' : '#5a3a48' }));
    const heartNote = S.hearts <= 1 ? { t: 'One heart left. Careful!', c: '#ff8fa3' } : S.hearts >= 5 ? { t: 'Heart full! Bonus unlocked', c: '#ffd6de' } : { t: (5 - S.hearts) + ' more to unlock her secret', c: '#c8bcd8' };

    const keys = Object.keys(S.res);
    const points = keys.reduce((a, k) => a + S.res[k].score, 0);
    const goalLabels = ['Greet Paati', 'Tell her about the trip', 'Answer Karthik', 'Ask about bags and a wash'];
    const goals = goalLabels.map((label, t) => {
      const done = !!S.res[t];
      const now = isPlay && t === tIdx;
      return { label: label, fill: done ? '#2a9d8f' : 'transparent', edge: done ? '#9fe1cb' : '#ffd166', ink: done ? '#b8b0c8' : now ? '#ffd166' : '#fff6e5', deco: done && !now ? 'line-through' : 'none' };
    }).concat([S.everFull ? { label: 'Bonus: Paati’s secret', fill: S.bonusDone ? '#ff4d6d' : 'transparent', edge: '#ff8fa3', ink: '#ffd6de', deco: 'none' } : { label: 'Locked: fill 5 hearts', fill: 'transparent', edge: '#6a5f80', ink: '#8a7fa0', deco: 'none' }]);
    const pips = S.queue.map((t, i) => ({ c: i < S.qi ? '#2a9d8f' : i === S.qi ? '#ffd166' : '#4a4060' }));

    const isLatin = (w) => /[A-Za-z]/.test(w);
    const RF = ['ழ', 'ள', 'ண', 'ற', 'ட'];
    const goodTa = turn.opts.filter((o) => o.kind === 'good')[0].ta;
    let words = [];
    let insTip = '';
    if (opt) {
      const allEn = opt.kind === 'english';
      let weakest = null;
      words = opt.ta.split(' ').map((w, i) => {
        if (isLatin(w)) return allEn ? { w: w, sub: 'English', bg: '#b5d4f4', edge: '#185fa5', ink: '#042c53' } : { w: w, sub: 'loanword ok', bg: '#d3d1c7', edge: '#5f5e5a', ink: '#2c2c2a' };
        const h = (w.length * 7 + i * 13 + tIdx * 5) % 10;
        const score = h < 6 ? 86 + h * 2 : h < 9 ? 64 + h * 2 : 52;
        if (!weakest || score < weakest.score) weakest = { w: w, score: score };
        const st = score >= 85 ? { bg: '#c0dd97', edge: '#3b6d11', ink: '#173404' } : score >= 60 ? { bg: '#fac775', edge: '#854f0b', ink: '#412402' } : { bg: '#f7c1c1', edge: '#a32d2d', ink: '#501313' };
        return Object.assign({ w: w, sub: score + '%' }, st);
      });
      if (allEn) insTip = 'Try in Tamil: ' + goodTa;
      else if (weakest && weakest.score < 85) {
        const ch = RF.filter((c) => weakest.w.indexOf(c) >= 0)[0];
        insTip = ch ? 'Watch the retroflex ' + ch + ' in ' + weakest.w + '.' : 'Lengthen the vowels in ' + weakest.w + '.';
      } else insTip = 'Clean line. Nothing to drill here.';
    }

    const n = keys.length || 1;
    const avg = (i) => Math.round(keys.reduce((a, k) => a + S.res[k].p[i], 0) / n);
    const pillars = [['Tamil vs English', '#2a9d8f'], ['Pronunciation', '#e9c46a'], ['Politeness & register', '#e76f51'], ['Fluency & pacing', '#9a6fd1']].map((q, i) => ({ label: q[0], c: q[1], v: avg(i), w: Math.round(avg(i) * 4) }));
    const total = Math.round(keys.reduce((a, k) => a + S.res[k].score, 0) / n);
    const rank = S.hearts >= 5 ? { ta: 'பாட்டியின் செல்லம்!', en: 'Paati’s favourite grandchild' } : S.hearts >= 3 ? { ta: 'நல்ல பேரப்பிள்ளை', en: 'A good grandchild. Win a few more hearts next time.' } : { ta: 'இன்னும் கொஞ்சம் பழகணும்', en: 'Paati still loves you, but it was a bumpy visit.' };
    const cards = MAIN.concat([4]).filter((t) => S.res[t] && S.res[t].firstKind !== 'good').map((t) => {
      const cleared = S.res[t].kind === 'good';
      return { text: S.res[t].card, status: cleared ? 'cleared' : 'to redeem', bg: cleared ? '#c0dd97' : '#f7c1c1', ink: cleared ? '#173404' : '#501313' };
    });
    const tog = (on) => ({ pressed: on ? 'true' : 'false', bg: on ? '#9fe1cb' : '#2b2440', ink: on ? '#04342c' : '#9fe1cb' });
    const lastStep = S.qi + 1 >= S.queue.length;
    const contBtn = hasPick && S.hearts <= 0 ? { label: 'Paati turns away…', bg: '#6b2b33', edge: '#2a0a10', ink: '#ffd6de' } : { label: lastStep ? 'See results' : 'Continue', bg: '#f2b705', edge: '#5a3a00', ink: '#2a1a00' };
    const brokenText = S.apologyFailed ? 'That only made it worse: “vidu” tells an elder to drop it. Paati needs some time. Start the visit again and win her heart back.' : S.apologyUsed ? 'You’ve already apologised once today. Paati needs some time. Start the visit again and win her heart back.' : 'You lost all of Paati’s hearts, so she has stopped talking to you. Say sorry the right way to win one heart back and carry on.';

    return {
      tiles, props, actors, shadows, portrait, burst, portraitBurst, hurt, heartRow, heartRowStatic, introHearts, heartNote,
      hearts: S.hearts, heartsLabel: S.hearts + ' of 5 hearts',
      heartPanelCls: S.hearts <= 1 && isPlay ? 'alarm' : '',
      goals, pips, points, pillars, total, rank, cards, words, insTip,
      showHints: this.props.showHints ?? true,
      isIntro: S.screen === 'intro', isPlay: isPlay, isSummary: S.screen === 'summary', isBroken: S.screen === 'broken',
      noPick: isPlay && S.picked === null, hasPick: hasPick, isInspect: hasPick && S.inspect,
      hasEmote: hasPick, emote: emote, toast: toast, isLove: isLove, isHurt: isHurt,
      justUnlocked: hasPick && S.unlockFlash,
      hasRetry: hasPick && opt.kind !== 'good' && S.hearts > 0,
      turn: turn, sp: WHO[turn.who], rsp: WHO[re.who], re: re,
      mine: opt || { ta: '', en: '' },
      chip: kind, fb: opt ? opt.fb : '',
      opts: turn.opts.map((o, i) => ({ n: String(i + 1), ta: o.ta, tl: o.tl, en: o.en, pick: pick(i) })),
      showTl: S.showTl, showEn: S.showEn, tlBtn: tog(S.showTl), enBtn: tog(S.showEn),
      contBtn: contBtn,
      pipLabel: 'Turn ' + (S.qi + 1) + ' of ' + S.queue.length,
      modeLabel: S.bonus ? 'BONUS' : S.drill ? 'DRILL' : 'EASY',
      bonusReady: S.everFull && !S.bonusDone, bonusLocked: !S.everFull, bonusDone: S.bonusDone,
      lockText: 'Fill all 5 hearts to unlock Paati’s secret recipe. You reached ' + S.hearts + '.',
      hasCards: cards.length > 0, noCards: cards.length === 0, hasOpenCards: openTurns.length > 0,
      canApologise: !S.apologyUsed, brokenText: brokenText,
      start, replay, retry, cont, drill, playBonus, apologiseRight, apologiseWrong, openInspect, closeInspect, toggleTl, toggleEn
    };
  }
}

const DEFAULT_PROPS = {"showHints": true, "startHearts": 3};

export default function HomePrototypeBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-home-prototype">
      <div style={{ position: "relative", width: "960px", height: "600px", overflow: "hidden", background: "#b4533c", fontFamily: "'Pixelify Sans', 'Noto Sans Tamil', monospace", color: "#fff6e5" }}>
        <div aria-hidden={"true"} style={{ position: "absolute", inset: "0", display: "grid", gridTemplateColumns: "repeat(40, 24px)", gridAutoRows: "24px" }}>
          {(v?.tiles || []).map((t, $index) => (
            <React.Fragment key={$index}>
              <div style={{ background: t?.bg }}></div>
            </React.Fragment>
          ))}
        </div>
        {(v?.shadows || []).map((sh, $index) => (
          <React.Fragment key={$index}>
            <div aria-hidden={"true"} style={{ position: "absolute", left: `${sh?.left ?? ""}px`, top: `${sh?.top ?? ""}px`, width: "18px", height: "5px", background: "rgba(60,15,5,0.3)" }}></div>
          </React.Fragment>
        ))}
        {(v?.props || []).map((s, $index) => (
          <React.Fragment key={$index}>
            <div aria-hidden={"true"} style={{ position: "absolute", left: `${s?.left ?? ""}px`, top: `${s?.top ?? ""}px`, display: "grid", gridTemplateColumns: `repeat(${s?.cols ?? ""}, ${s?.px ?? ""}px)`, gridAutoRows: `${s?.px ?? ""}px` }}>
              {(s?.pixels || []).map((p, $index) => (
                <React.Fragment key={$index}>
                  <div style={{ background: p?.c }}></div>
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        ))}
        {(v?.actors || []).map((a, $index) => (
          <React.Fragment key={$index}>
            <div aria-hidden={"true"} className={a?.cls} style={{ position: "absolute", left: `${a?.left ?? ""}px`, top: `${a?.top ?? ""}px` }}>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${a?.cols ?? ""}, ${a?.px ?? ""}px)`, gridAutoRows: `${a?.px ?? ""}px` }}>
                {(a?.pixels || []).map((p, $index) => (
                  <React.Fragment key={$index}>
                    <div style={{ background: p?.c }}></div>
                  </React.Fragment>
                ))}
              </div>
              {a?.blink ? (
                <>
                  <div className={"blink"} style={{ position: "absolute", left: `${a?.ex1 ?? ""}px`, top: `${a?.ey ?? ""}px`, width: `${a?.px ?? ""}px`, height: `${a?.px ?? ""}px`, background: a?.skin }}></div>
                  <div className={"blink"} style={{ position: "absolute", left: `${a?.ex2 ?? ""}px`, top: `${a?.ey ?? ""}px`, width: `${a?.px ?? ""}px`, height: `${a?.px ?? ""}px`, background: a?.skin }}></div>
                </>
              ) : null}
            </div>
          </React.Fragment>
        ))}
        <div className={"flick"} aria-hidden={"true"} style={{ position: "absolute", left: "635px", top: "80px", width: "5px", height: "6px", background: "#ffd166" }}></div>
        <div className={"steam"} aria-hidden={"true"} style={{ position: "absolute", left: "293px", top: "208px", width: "2px", height: "6px", background: "rgba(255,255,255,0.75)" }}></div>
        <div className={"steam"} aria-hidden={"true"} style={{ position: "absolute", left: "303px", top: "213px", width: "2px", height: "6px", background: "rgba(255,255,255,0.75)", animationDelay: ".7s" }}></div>
        {v?.showHints ? (
          <>
            <div style={{ position: "absolute", left: "184px", top: "152px", transform: "translateX(-50%)", padding: "1px 6px", background: "#ffd166", border: "2px solid #7a4a00", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", lineHeight: "1.4", color: "#3a2400", whiteSpace: "nowrap" }}>
              {"\u0ba8\u0bc0\u0b99\u0bcd\u0b95"}
            </div>
            <div style={{ position: "absolute", left: "496px", top: "194px", transform: "translateX(-50%)", padding: "1px 6px", background: "#9fe1cb", border: "2px solid #0f6e56", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", lineHeight: "1.4", color: "#04342c", whiteSpace: "nowrap" }}>
              {"\u0ba8\u0bc0"}
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
        {v?.hasEmote ? (
          <>
            <div className={"bob"} aria-hidden={"true"} style={{ position: "absolute", left: `${v?.emote?.x ?? ""}px`, top: `${v?.emote?.y ?? ""}px`, padding: "0 6px", background: "#fff6e5", border: "3px solid #1f1a2e", color: "#1f1a2e", fontWeight: "600", fontSize: "14px", lineHeight: "18px", whiteSpace: "nowrap" }}>
              {v?.emote?.t}
            </div>
            <div className={"rise"} style={{ position: "absolute", left: "214px", top: "186px", padding: "2px 8px", background: v?.toast?.bg, border: `2px solid ${v?.toast?.edge ?? ""}`, fontSize: "13px", color: "#ffffff", whiteSpace: "nowrap" }}>
              {v?.toast?.text}
            </div>
          </>
        ) : null}
        {v?.justUnlocked ? (
          <>
            <div className={"rise glow"} style={{ position: "absolute", left: "50%", top: "120px", transform: "translateX(-50%)", padding: "6px 14px", background: "#3a0f1e", border: "3px solid #ff8fa3", textAlign: "center", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: "14px", color: "#ffd6de", fontWeight: "600" }}>
                {"Paati\u2019s heart is full!"}
              </div>
              <div style={{ fontSize: "12px", color: "#ffe8b0" }}>
                {"Bonus chat unlocked: her secret recipe"}
              </div>
            </div>
          </>
        ) : null}
        <div className={v?.heartPanelCls} style={{ position: "absolute", left: "12px", top: "12px", width: "236px", boxSizing: "border-box", padding: "8px 10px", background: "#1f1a2e", border: "3px solid #0d0a14", boxShadow: "inset 0 0 0 2px #e9c46a", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
            <span>
              <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700" }}>
                {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bbf\u0ba9\u0bcd \u0b85\u0ba9\u0bcd\u0baa\u0bc1"}
              </span>
            </span>
            <span style={{ padding: "0 6px", background: "#2a9d8f", color: "#04241f", fontWeight: "600" }}>
              {v?.modeLabel}
            </span>
          </div>
          <div role={"meter"} aria-label={"Paati\u2019s affection"} aria-valuemin={"0"} aria-valuemax={"5"} aria-valuenow={v?.hearts} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {(v?.heartRow || []).map((ht, $index) => (
              <React.Fragment key={$index}>
                <svg className={ht?.cls} width={"28"} height={"24"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
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
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
            <span style={{ color: v?.heartNote?.c }}>
              {v?.heartNote?.t}
            </span>
            <span style={{ color: "#ffd166" }}>
              {v?.points}{" pts"}
            </span>
          </div>
        </div>
        <div style={{ position: "absolute", right: "12px", top: "12px", width: "236px", padding: "8px 10px", background: "#1f1a2e", border: "3px solid #0d0a14", boxShadow: "inset 0 0 0 2px #e9c46a", display: "flex", flexDirection: "column", gap: "5px", fontSize: "13px" }}>
          <div style={{ color: "#ffd166", fontWeight: "600" }}>
            {"At Paati\u2019s house"}
          </div>
          {(v?.goals || []).map((gl, $index) => (
            <React.Fragment key={$index}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", color: gl?.ink }}>
                <span style={{ width: "10px", height: "10px", flexShrink: "0", background: gl?.fill, border: `2px solid ${gl?.edge ?? ""}` }}></span>
                <span style={{ textDecoration: gl?.deco }}>
                  {gl?.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
        {v?.isPlay ? (
          <>
            <div style={{ position: "absolute", left: "16px", top: "360px", width: "928px", height: "228px", boxSizing: "border-box", padding: "14px", background: "#1f1a2e", border: "4px solid #0d0a14", boxShadow: "inset 0 0 0 3px #e9c46a", display: "flex", gap: "16px" }}>
              <div style={{ width: "104px", height: "150px", flexShrink: "0", boxSizing: "border-box", background: "#3a2a40", border: "3px solid #e9c46a" }}></div>
              <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                {v?.noPick ? (
                  <>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#ffffff" }}>
                        {v?.sp?.name}
                      </span>
                      <span style={{ fontSize: "12px", color: "#d8c8e8" }}>
                        {v?.sp?.sub}
                      </span>
                      <span style={{ marginLeft: "auto", fontSize: "12px", color: "#ffd166" }}>
                        {"Goal: "}{v?.turn?.goal}
                      </span>
                      <span aria-label={v?.pipLabel} style={{ display: "flex", gap: "3px" }}>
                        {(v?.pips || []).map((pp, $index) => (
                          <React.Fragment key={$index}>
                            <span style={{ width: "8px", height: "8px", background: pp?.c }}></span>
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "21px", lineHeight: "1.3", color: "#ffffff" }}>
                        {v?.turn?.ta}
                      </span>
                      <button aria-label={"Hear this line"} style={{ width: "30px", height: "26px", padding: "0", background: "#2b2440", border: "2px solid #9fe1cb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width={"8"} height={"10"} viewBox={"0 0 4 5"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                          <rect x={"0"} y={"0"} width={"1"} height={"5"} fill={"#9fe1cb"}></rect>
                          <rect x={"1"} y={"1"} width={"2"} height={"3"} fill={"#9fe1cb"}></rect>
                          <rect x={"3"} y={"2"} width={"1"} height={"1"} fill={"#9fe1cb"}></rect>
                        </svg>
                      </button>
                      <button aria-label={"Hear it slowly"} style={{ height: "26px", padding: "0 6px", background: "#2b2440", border: "2px solid #9fe1cb", color: "#9fe1cb", fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", cursor: "pointer" }}>
                        {"\u00bd\u00d7"}
                      </button>
                    </div>
                    {v?.showTl ? (
                      <>
                        <div style={{ fontSize: "14px", color: "#9fe1cb" }}>
                          {v?.turn?.tl}
                        </div>
                      </>
                    ) : null}
                    {v?.showEn ? (
                      <>
                        <div style={{ fontSize: "13px", color: "#c8bcd8" }}>
                          {v?.turn?.en}
                        </div>
                      </>
                    ) : null}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", marginTop: "auto" }}>
                      {(v?.opts || []).map((o, $index) => (
                        <React.Fragment key={$index}>
                          <button className={"opt"} onClick={o?.pick} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "6px 8px", minHeight: "52px", background: "#2b2440", border: "2px solid #e9c46a", color: "#fff6e5", cursor: "pointer", textAlign: "left" }}>
                            <span aria-hidden={"true"} style={{ flexShrink: "0", padding: "0 4px", background: "#e9c46a", color: "#1f1a2e", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "11px", lineHeight: "15px" }}>
                              {o?.n}
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", minWidth: "0", flex: "1" }}>
                              <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "13px", lineHeight: "1.35", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                {o?.ta}
                              </span>
                              {v?.showTl ? (
                                <>
                                  <span style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", color: "#9fe1cb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {o?.tl}
                                  </span>
                                </>
                              ) : null}
                              {v?.showEn ? (
                                <>
                                  <span style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", color: "#c8bcd8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
                    <div style={{ display: "flex", gap: "8px", alignItems: "baseline", padding: "4px 8px", background: "#2b2440", border: "2px solid #4a4060" }}>
                      <span style={{ fontSize: "12px", color: "#ffd166", flexShrink: "0" }}>
                        {"You"}
                      </span>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px", color: "#fff6e5" }}>
                        {v?.mine?.ta}
                      </span>
                      <span style={{ fontSize: "12px", color: "#c8bcd8" }}>
                        {v?.mine?.en}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "2px" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px", color: "#ffffff" }}>
                        {v?.rsp?.name}
                      </span>
                      <span style={{ fontSize: "12px", color: "#d8c8e8" }}>
                        {v?.rsp?.sub}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "19px", lineHeight: "1.3", color: "#ffffff" }}>
                        {v?.re?.ta}
                      </span>
                      <button aria-label={"Hear the reply"} style={{ width: "30px", height: "24px", padding: "0", background: "#2b2440", border: "2px solid #9fe1cb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width={"8"} height={"10"} viewBox={"0 0 4 5"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                          <rect x={"0"} y={"0"} width={"1"} height={"5"} fill={"#9fe1cb"}></rect>
                          <rect x={"1"} y={"1"} width={"2"} height={"3"} fill={"#9fe1cb"}></rect>
                          <rect x={"3"} y={"2"} width={"1"} height={"1"} fill={"#9fe1cb"}></rect>
                        </svg>
                      </button>
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      {v?.showTl ? (
                        <>
                          <span style={{ color: "#9fe1cb" }}>
                            {v?.re?.tl}{" "}
                          </span>
                        </>
                      ) : null}
                      {v?.showEn ? (
                        <>
                          <span style={{ color: "#c8bcd8" }}>
                            {"\u00b7 "}{v?.re?.en}
                          </span>
                        </>
                      ) : null}
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ padding: "2px 8px", background: v?.chip?.bg, border: `2px solid ${v?.chip?.edge ?? ""}`, color: v?.chip?.ink, fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap" }}>
                        {v?.chip?.label}
                      </span>
                      <span style={{ fontSize: "12px", color: "#e8dcc8", minWidth: "0" }}>
                        {v?.fb}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "auto" }}>
                      <button onClick={v?.openInspect} style={{ minHeight: "44px", padding: "0 12px", background: "#2b2440", border: "2px solid #9fe1cb", color: "#9fe1cb", fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}>
                        {"Inspect line"}
                      </button>
                      <span style={{ flex: "1" }}></span>
                      {v?.hasRetry ? (
                        <>
                          <button onClick={v?.retry} style={{ minHeight: "44px", padding: "0 12px", background: "#3a3350", border: "2px solid #ff9f80", color: "#ffd6c8", fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}>
                            {"Try again \u00b7 win the heart back"}
                          </button>
                        </>
                      ) : null}
                      <button onClick={v?.cont} style={{ minHeight: "44px", padding: "0 14px", background: v?.contBtn?.bg, border: `2px solid ${v?.contBtn?.edge ?? ""}`, color: v?.contBtn?.ink, fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
                        {v?.contBtn?.label}
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
              <div style={{ width: "92px", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button onClick={v?.toggleTl} aria-pressed={v?.tlBtn?.pressed} aria-label={"Show Tanglish"} style={{ width: "42px", height: "28px", padding: "0", background: v?.tlBtn?.bg, border: "2px solid #9fe1cb", color: v?.tlBtn?.ink, fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", cursor: "pointer" }}>
                    {"TL"}
                  </button>
                  <button onClick={v?.toggleEn} aria-pressed={v?.enBtn?.pressed} aria-label={"Show English"} style={{ width: "42px", height: "28px", padding: "0", background: v?.enBtn?.bg, border: "2px solid #9fe1cb", color: v?.enBtn?.ink, fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", cursor: "pointer" }}>
                    {"EN"}
                  </button>
                </div>
                <button aria-label={"Hold to speak your own line"} style={{ width: "60px", height: "60px", border: "4px solid #5a1a12", background: "#e76f51", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width={"28"} height={"32"} viewBox={"0 0 7 8"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                    <rect x={"2"} y={"0"} width={"3"} height={"5"} fill={"#fff6e5"}></rect>
                    <rect x={"1"} y={"3"} width={"1"} height={"2"} fill={"#fff6e5"}></rect>
                    <rect x={"5"} y={"3"} width={"1"} height={"2"} fill={"#fff6e5"}></rect>
                    <rect x={"2"} y={"5"} width={"3"} height={"1"} fill={"#fff6e5"}></rect>
                    <rect x={"3"} y={"6"} width={"1"} height={"1"} fill={"#fff6e5"}></rect>
                    <rect x={"1"} y={"7"} width={"5"} height={"1"} fill={"#fff6e5"}></rect>
                  </svg>
                </button>
                <div style={{ fontSize: "11px", lineHeight: "1.3", color: "#c8bcd8", textAlign: "center" }}>
                  {"or hold SPACE"}
                </div>
              </div>
            </div>
            {(v?.portrait || []).map((a, $index) => (
              <React.Fragment key={$index}>
                <div aria-hidden={"true"} className={a?.cls} style={{ position: "absolute", left: `${a?.left ?? ""}px`, top: `${a?.top ?? ""}px` }}>
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${a?.cols ?? ""}, ${a?.px ?? ""}px)`, gridAutoRows: `${a?.px ?? ""}px` }}>
                    {(a?.pixels || []).map((p, $index) => (
                      <React.Fragment key={$index}>
                        <div style={{ background: p?.c }}></div>
                      </React.Fragment>
                    ))}
                  </div>
                  {a?.blink ? (
                    <>
                      <div className={"blink"} style={{ position: "absolute", left: `${a?.ex1 ?? ""}px`, top: `${a?.ey ?? ""}px`, width: `${a?.px ?? ""}px`, height: `${a?.px ?? ""}px`, background: a?.skin }}></div>
                      <div className={"blink"} style={{ position: "absolute", left: `${a?.ex2 ?? ""}px`, top: `${a?.ey ?? ""}px`, width: `${a?.px ?? ""}px`, height: `${a?.px ?? ""}px`, background: a?.skin }}></div>
                    </>
                  ) : null}
                </div>
              </React.Fragment>
            ))}
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
        {v?.isInspect ? (
          <>
            <div style={{ position: "absolute", left: "232px", top: "92px", width: "496px", boxSizing: "border-box", padding: "12px 14px", background: "#1f1a2e", border: "4px solid #0d0a14", boxShadow: "inset 0 0 0 3px #9fe1cb", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#9fe1cb" }}>
                  {"Inspect line"}
                </span>
                <span style={{ padding: "0 6px", background: "#3a3350", color: "#c8bcd8", fontSize: "11px" }}>
                  {"sample grading"}
                </span>
                <span style={{ flex: "1" }}></span>
                <button onClick={v?.closeInspect} aria-label={"Close inspect line"} style={{ width: "44px", height: "36px", padding: "0", background: "#2b2440", border: "2px solid #9fe1cb", color: "#9fe1cb", fontFamily: "'Pixelify Sans', monospace", fontSize: "16px", cursor: "pointer" }}>
                  {"\u00d7"}
                </button>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{ minHeight: "36px", padding: "0 10px", background: "#e76f51", border: "2px solid #5a1a12", color: "#2a0a04", fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", cursor: "pointer" }}>
                  {"\u25b6 Play my voice"}
                </button>
                <button style={{ minHeight: "36px", padding: "0 10px", background: "#2a9d8f", border: "2px solid #04342c", color: "#04241f", fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", cursor: "pointer" }}>
                  {"\u25b6 Play native Tamil"}
                </button>
              </div>
              <div style={{ fontSize: "12px", color: "#c8bcd8" }}>
                {"We understood: "}
                <span style={{ color: "#fff6e5" }}>
                  {v?.mine?.en}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {(v?.words || []).map((w, $index) => (
                  <React.Fragment key={$index}>
                    <div style={{ padding: "3px 8px", background: w?.bg, border: `2px solid ${w?.edge ?? ""}`, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', 'Pixelify Sans', sans-serif", fontWeight: "700", fontSize: "15px", color: w?.ink }}>
                        {w?.w}
                      </span>
                      <span style={{ fontSize: "11px", color: w?.ink }}>
                        {w?.sub}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div style={{ fontSize: "12px", color: "#fff6e5" }}>
                {v?.insTip}
              </div>
            </div>
          </>
        ) : null}
        {v?.isIntro ? (
          <>
            <div style={{ position: "absolute", inset: "0", background: "rgba(20,12,24,0.62)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "580px", boxSizing: "border-box", padding: "22px 24px", background: "#1f1a2e", border: "4px solid #0d0a14", boxShadow: "inset 0 0 0 3px #e9c46a", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "12px", color: "#ffd166" }}>
                  {"Scene 3A \u00b7 open-choice hub"}
                </div>
                <div style={{ fontSize: "26px", lineHeight: "1.2" }}>
                  <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700" }}>
                    {"\u0bb5\u0bc0\u0b9f\u0bc1"}
                  </span>
                  {" \u00b7 Arriving at Paati\u2019s"}
                </div>
                <div style={{ fontSize: "14px", lineHeight: "1.5", color: "#e8dcc8" }}>
                  {"Paati hasn\u2019t seen you in years. Win her heart back: speak respectfully, in Tamil, and sound like family rather than a textbook."}
                </div>
                <div style={{ padding: "10px 12px", background: "#3a0f1e", border: "2px solid #ff8fa3", display: "flex", flexDirection: "column", gap: "6px" }}>
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
                    <span style={{ fontSize: "13px", color: "#ffd6de", marginLeft: "4px" }}>
                      {"You start with 3 of Paati\u2019s 5 hearts"}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#ffe8b0", lineHeight: "1.5" }}>
                    {"A good answer wins a heart. A rude or English answer costs one. Fill all five to unlock Paati\u2019s secret. Lose them all and she stops talking to you."}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px" }}>
                  <div style={{ padding: "8px 10px", background: "#3a2c10", border: "2px solid #ffd166" }}>
                    <div style={{ fontSize: "12px", color: "#ffd166" }}>
                      {"Paati \u00b7 your elder"}
                    </div>
                    <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#fff6e5" }}>
                      {"\u0ba8\u0bc0\u0b99\u0bcd\u0b95 \u00b7 \u2011\u0b99\u0bcd\u0b95"}
                    </div>
                  </div>
                  <div style={{ padding: "8px 10px", background: "#0f3a30", border: "2px solid #9fe1cb" }}>
                    <div style={{ fontSize: "12px", color: "#9fe1cb" }}>
                      {"Karthik \u00b7 younger cousin"}
                    </div>
                    <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#fff6e5" }}>
                      {"\u0ba8\u0bc0 \u00b7 casual"}
                    </div>
                  </div>
                </div>
                <button onClick={v?.start} style={{ alignSelf: "flex-start", minHeight: "44px", padding: "0 18px", background: "#f2b705", border: "3px solid #5a3a00", color: "#2a1a00", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "16px", cursor: "pointer" }}>
                  {"Knock on the door"}
                </button>
              </div>
            </div>
          </>
        ) : null}
        {v?.isBroken ? (
          <>
            <div style={{ position: "absolute", inset: "0", background: "rgba(10,4,12,0.78)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className={"alarm"} style={{ width: "580px", boxSizing: "border-box", padding: "22px 24px", background: "#1f1a2e", border: "4px solid #0d0a14", boxShadow: "inset 0 0 0 3px #e63946", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div className={"shake"} style={{ position: "relative", width: "56px", height: "48px", flexShrink: "0" }}>
                    <svg style={{ position: "absolute", left: "-6px", top: "4px", transform: "rotate(-14deg)" }} width={"56"} height={"48"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                      <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"0"} y={"1"} width={"3"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"0"} y={"2"} width={"4"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"1"} y={"3"} width={"2"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"2"} y={"4"} width={"1"} height={"1"} fill={"#6b2b33"}></rect>
                    </svg>
                    <svg style={{ position: "absolute", left: "6px", top: "4px", transform: "rotate(14deg)" }} width={"56"} height={"48"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                      <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"3"} y={"1"} width={"4"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"4"} y={"2"} width={"3"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"3"} y={"3"} width={"3"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"3"} y={"4"} width={"2"} height={"1"} fill={"#6b2b33"}></rect>
                      <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={"#6b2b33"}></rect>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.3" }}>
                      {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf\u0b95\u0bcd\u0b95\u0bc1 \u0bb5\u0bb0\u0bc1\u0ba4\u0bcd\u0ba4\u0bae\u0bbe \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1"}
                    </div>
                    <div style={{ fontSize: "14px", color: "#ffb3bd" }}>
                      {"Paatikku varuthamaa irukku \u00b7 Paati is hurt"}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "14px", lineHeight: "1.5", color: "#e8dcc8" }}>
                  {v?.brokenText}
                </div>
                {v?.canApologise ? (
                  <>
                    <div style={{ fontSize: "12px", color: "#ffd166" }}>
                      {"Pick the right way to say sorry to an elder:"}
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button onClick={v?.apologiseWrong} style={{ minHeight: "52px", padding: "6px 12px", background: "#2b2440", border: "2px solid #e9c46a", color: "#fff6e5", cursor: "pointer", textAlign: "left" }}>
                        <span style={{ display: "block", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px" }}>
                          {"\u0b9a\u0bbe\u0bb0\u0bbf \u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf, \u0bb5\u0bbf\u0b9f\u0bc1!"}
                        </span>
                        <span style={{ display: "block", fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", color: "#c8bcd8" }}>
                          {"Saari Paati, vidu!"}
                        </span>
                      </button>
                      <button onClick={v?.apologiseRight} style={{ minHeight: "52px", padding: "6px 12px", background: "#2b2440", border: "2px solid #e9c46a", color: "#fff6e5", cursor: "pointer", textAlign: "left" }}>
                        <span style={{ display: "block", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px" }}>
                          {"\u0bae\u0ba9\u0bcd\u0ba9\u0bbf\u0b9a\u0bcd\u0b9a\u0bbf\u0b9f\u0bc1\u0b99\u0bcd\u0b95 \u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf."}
                        </span>
                        <span style={{ display: "block", fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", color: "#c8bcd8" }}>
                          {"Mannichidunga Paati."}
                        </span>
                      </button>
                    </div>
                  </>
                ) : null}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button onClick={v?.replay} style={{ minHeight: "44px", padding: "0 14px", background: "#3a3350", border: "3px solid #e9c46a", color: "#fff6e5", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", cursor: "pointer" }}>
                    {"Start the visit again"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {v?.isSummary ? (
          <>
            <div style={{ position: "absolute", inset: "0", background: "rgba(20,12,24,0.62)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "640px", boxSizing: "border-box", padding: "18px 24px", background: "#1f1a2e", border: "4px solid #0d0a14", boxShadow: "inset 0 0 0 3px #e9c46a", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "#ffd166" }}>
                      {"Visit complete"}
                    </div>
                    <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.3" }}>
                      {v?.rank?.ta}
                    </div>
                    <div style={{ fontSize: "13px", color: "#e8dcc8" }}>
                      {v?.rank?.en}
                    </div>
                    <div role={"img"} aria-label={v?.heartsLabel} style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
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
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "44px", lineHeight: "1", color: "#ffd166" }}>
                      {v?.total}
                    </div>
                    <div style={{ fontSize: "12px", color: "#c8bcd8" }}>
                      {"out of 100"}
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "6px 18px" }}>
                  {(v?.pillars || []).map((pl, $index) => (
                    <React.Fragment key={$index}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                          <span style={{ color: "#e8dcc8" }}>
                            {pl?.label}
                          </span>
                          <span style={{ color: "#ffd166" }}>
                            {pl?.v}{"/25"}
                          </span>
                        </div>
                        <div style={{ height: "8px", background: "#3a3350" }}>
                          <div style={{ height: "8px", width: `${pl?.w ?? ""}%`, background: pl?.c }}></div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {v?.bonusReady ? (
                  <>
                    <div className={"glow"} style={{ padding: "10px 12px", background: "#3a0f1e", border: "3px solid #ff8fa3", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                      <div>
                        <div style={{ fontSize: "14px", color: "#ffd6de", fontWeight: "600" }}>
                          {"Bonus unlocked: Paati\u2019s secret recipe"}
                        </div>
                        <div style={{ fontSize: "12px", color: "#ffe8b0" }}>
                          {"You filled all five hearts. She wants to tell you something."}
                        </div>
                      </div>
                      <button onClick={v?.playBonus} style={{ minHeight: "44px", padding: "0 14px", background: "#ff4d6d", border: "3px solid #5a0f1e", color: "#2a0510", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>
                        {"Hear her secret"}
                      </button>
                    </div>
                  </>
                ) : null}
                {v?.bonusLocked ? (
                  <>
                    <div style={{ padding: "8px 12px", background: "#2b2440", border: "2px dashed #6a5f80", display: "flex", gap: "10px", alignItems: "center" }}>
                      <svg width={"14"} height={"16"} viewBox={"0 0 7 8"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                        <rect x={"2"} y={"0"} width={"3"} height={"1"} fill={"#c8bcd8"}></rect>
                        <rect x={"1"} y={"1"} width={"1"} height={"3"} fill={"#c8bcd8"}></rect>
                        <rect x={"5"} y={"1"} width={"1"} height={"3"} fill={"#c8bcd8"}></rect>
                        <rect x={"0"} y={"4"} width={"7"} height={"4"} fill={"#c8bcd8"}></rect>
                        <rect x={"3"} y={"5"} width={"1"} height={"2"} fill={"#2b2440"}></rect>
                      </svg>
                      <span style={{ fontSize: "13px", color: "#c8bcd8" }}>
                        {v?.lockText}
                      </span>
                    </div>
                  </>
                ) : null}
                {v?.bonusDone ? (
                  <>
                    <div style={{ padding: "8px 12px", background: "#3a0f1e", border: "2px solid #ff8fa3", fontSize: "13px", color: "#ffd6de" }}>
                      {"Secret learned: "}
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700" }}>
                        {"\u0bb5\u0bc6\u0bb2\u0bcd\u0bb2\u0bae\u0bcd"}
                      </span>
                      {" (vellam, jaggery) is what makes Paati\u2019s sambar special."}
                    </div>
                  </>
                ) : null}
                <div style={{ padding: "8px 10px", background: "#2b2440", border: "2px solid #4a4060", display: "flex", flexDirection: "column", gap: "5px" }}>
                  <div style={{ fontSize: "12px", color: "#ff9f80" }}>
                    {"Added to your mistake deck"}
                  </div>
                  {v?.hasCards ? (
                    <>
                      {(v?.cards || []).map((cd, $index) => (
                        <React.Fragment key={$index}>
                          <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px" }}>
                            <span style={{ padding: "0 6px", background: cd?.bg, color: cd?.ink, fontSize: "11px", fontWeight: "600", whiteSpace: "nowrap" }}>
                              {cd?.status}
                            </span>
                            <span style={{ fontFamily: "'Noto Sans Tamil', 'Pixelify Sans', sans-serif", color: "#fff6e5" }}>
                              {cd?.text}
                            </span>
                          </div>
                        </React.Fragment>
                      ))}
                    </>
                  ) : null}
                  {v?.noCards ? (
                    <>
                      <div style={{ fontSize: "13px", color: "#9fe1cb" }}>
                        {"No mistakes this time. Paati is very proud."}
                      </div>
                    </>
                  ) : null}
                </div>
                <div style={{ fontSize: "11px", color: "#a89cb8" }}>
                  {"Prototype note: pronunciation and fluency scores are sample values until the speech pipeline is connected."}
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {v?.hasOpenCards ? (
                    <>
                      <button onClick={v?.drill} style={{ minHeight: "44px", padding: "0 14px", background: "#e76f51", border: "3px solid #5a1a12", color: "#2a0a04", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
                        {"Drill mistakes"}
                      </button>
                    </>
                  ) : null}
                  <button onClick={v?.replay} style={{ minHeight: "44px", padding: "0 14px", background: "#3a3350", border: "3px solid #e9c46a", color: "#fff6e5", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", cursor: "pointer" }}>
                    {"Replay visit"}
                  </button>
                  <Link to="/town" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", boxSizing: "border-box", padding: "0 14px", background: "#f2b705", border: "3px solid #5a3a00", color: "#2a1a00", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                    {"Back to town"}
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
