// @ts-nocheck
/* Generated from the design canvas board "Start.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "react-router-dom";
import { SFX } from "@/dc/sfx";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import "./start.css";

class Component extends DCLogic {
  componentWillUnmount() { try { if (this._ro) this._ro.disconnect(); } catch (e) { /* ignore */ } }
  renderVals() {
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
    const SC = (this.state && this.state.scale) || 1;
    const STAGE = { s: SC, w: Math.round(960 * SC), h: Math.round(600 * SC) };
    const SAVED = (() => { try { return JSON.parse(window.localStorage.getItem('tamil-rpg:settings') || '{}') || {}; } catch (e) { return {}; } })();
    const S = Object.assign({ sel: SAVED.dialect || 'eelam', mode: SAVED.mode || 'easy', started: false, screen: 'title' }, this.state || {});
    const set = (o) => this.setState(o);
    const SFXPrimer = SFX;
    const CFG = {"u": 8, "W": 120, "H": 75, "hx": 9, "palms": [[4, 24], [60, 22], [66, 28]], "paatiPx": 5, "selRing": "#e8ad2f"};
    const u = CFG.u, W = CFG.W, H = CFG.H, hx = CFG.hx;
    const R = [];
    const r = (x, y, w, h, bg, cls) => R.push({ x: x * u, y: y * u, w: w * u, h: h * u, bg: bg, cls: cls || '' });
    const P = (n) => (n * u) + 'px';
    // sky in soft steps (matches the original's pale blue)
    r(0, 0, W, 12, '#a9d8e3'); r(0, 12, W, 10, '#bfe3ea'); r(0, 22, W, 12, '#d0eaee'); r(0, 34, W, 14, '#e1f1ef');
    // sun and clouds
    r(W - 13, 5, 6, 6, '#ffe08a'); r(W - 14, 6, 8, 4, '#ffe08a'); r(W - 12, 4, 4, 8, '#ffe08a'); r(W - 12, 6, 4, 4, '#fff2c2');
    const cloud = (x, y) => { r(x + 2, y - 1, 6, 1, '#ffffff'); r(x, y, 11, 2, '#ffffff'); r(x + 1, y + 2, 9, 1, '#e8f4f5'); };
    cloud(4, 9); cloud(W - 34, 15); if (W > 80) cloud(Math.round(W / 2) + 4, 7);
    // distant greenery
    r(0, 44, W, 5, '#a3d491'); r(0, 47, W, 4, '#8cc57a'); r(0, 50, W, 11, '#79b566');
    for (let i = 0; i < W; i += 7) r(i, 42 + (i % 3), 4, 3, '#a3d491');
    // ground and path
    r(0, 61, W, H - 61, '#dcbc8c');
    for (let i = 2; i < W; i += 6) r(i, 64 + (i % 4), 1, 1, '#cfae7c');
    // coconut palms
    const palm = (x, top) => {
      for (let i = 0; i < 61 - top; i++) r(x + Math.floor(i / 14), top + i, 2, 1, i % 4 === 0 ? '#6b4a2a' : '#8a5a3a');
      const g = '#3f8a3e', g2 = '#5aa64a';
      r(x - 7, top - 1, 8, 1, g); r(x - 9, top, 4, 1, g); r(x + 2, top - 1, 8, 1, g); r(x + 8, top, 4, 1, g);
      r(x - 5, top - 3, 5, 1, g2); r(x + 2, top - 3, 5, 1, g2); r(x - 1, top - 4, 3, 2, g2); r(x - 3, top + 1, 2, 3, g); r(x + 3, top + 1, 2, 3, g);
      r(x, top, 2, 2, '#6b4a2a'); r(x - 1, top + 1, 1, 1, '#c99a3a'); r(x + 2, top + 1, 1, 1, '#c99a3a');
    };
    CFG.palms.forEach((p) => palm(p[0], p[1]));
    // ---- the house ----
    for (let i = 0; i < 9; i++) { const w = 28 + 2 * i; r(hx + (46 - w) / 2, 26 + i, w, 1, 'repeating-linear-gradient(90deg,#c8553d 0 ' + P(2) + ',#a8432f ' + P(2) + ' ' + P(2.5) + ')'); }
    r(hx + 10, 25, 26, 1, '#8a2e1e'); r(hx - 1, 34, 48, 1, '#5b3a22');
    r(hx, 35, 46, 23, '#f3e6cf'); r(hx, 56, 46, 2, '#c99a6b');
    [1, 11, 33, 43].forEach((p) => { r(hx + p, 35, 2, 21, '#5b3a22'); r(hx + p - 1, 35, 4, 1, '#3a2416'); r(hx + p - 1, 55, 4, 1, '#3a2416'); });
    [4, 37].forEach((p) => { r(hx + p, 40, 5, 7, '#6b3f22'); r(hx + p + 1, 41, 3, 5, '#9fd3e6'); r(hx + p + 2, 41, 1, 5, '#2f4f6a'); r(hx + p + 1, 43, 3, 1, '#2f4f6a'); });
    r(hx + 17, 39, 12, 19, '#3a2416'); r(hx + 18, 40, 10, 18, '#5a3420'); r(hx + 19, 41, 8, 16, 'rgba(255,200,120,0.28)', 'glowp');
    r(hx + 18, 40, 2, 18, '#7a4a2a'); r(hx + 26, 40, 2, 18, '#7a4a2a');
    for (let k = 0; k < 4; k++) { r(hx + 18.5, 42 + k * 4, 1, 1, '#e0a43a'); r(hx + 26.5, 42 + k * 4, 1, 1, '#e0a43a'); }
    for (let k = 0; k < 6; k++) { r(hx + 18 + k * 2, 39, 1, 2, '#3f8a3e'); r(hx + 19 + k * 2, 39, 1, 1, '#ff9f1c'); }
    r(hx + 3, 52, 13, 4, '#b5b0a6'); r(hx + 3, 52, 13, 1, '#d6d1c7'); r(hx + 30, 52, 13, 4, '#b5b0a6'); r(hx + 30, 52, 13, 1, '#d6d1c7');
    r(hx + 16, 58, 14, 1, '#b8b0a2'); r(hx + 15, 59, 16, 1, '#a39a8c'); r(hx + 14, 60, 18, 1, '#b8b0a2');
    // kolam in front of the door
    r(hx + 11, 63, 24, 9, 'radial-gradient(circle,#fff8ec 0 ' + P(0.45) + ',transparent ' + P(0.5) + ') 0 0/' + P(2) + ' ' + P(2) + ',linear-gradient(45deg,transparent 46%,rgba(255,248,236,.8) 46% 54%,transparent 54%) 0 0/' + P(3) + ' ' + P(3) + ',linear-gradient(-45deg,transparent 46%,rgba(255,248,236,.8) 46% 54%,transparent 54%) 0 0/' + P(3) + ' ' + P(3) + ',#c9a46f');
    const rects = R;
    // sprites
    const toPx = (rows, pal) => rows.join('').split('').map((ch) => ({ c: ch === '.' ? 'transparent' : (pal[ch] || '#ff00ff') }));
    const sp = (rows, pal, x, y, size, cls) => ({ left: x, top: y, cols: rows[0].length, px: size, cls: cls || '', pixels: toPx(rows, pal) });
    const SAREE = ["...oooooo...", "..ohhhhhhoj.", ".ohhhHHhhhoj", ".ohhsssshho.", ".ohsskkssho.", ".ossessesso.", ".oEsmmmmsEo.", "..oSssssSo..", ".oBBBSSgrrro", "oBBBBBgrrrro", "osBBBgrrrrso", "osrrgrrrrrso", ".orrgrrRrro.", ".orgrrrRrro.", ".oggggggggo.", "..of....fo.."];
    const pal = {"o": "#2a1810", "h": "#e2ded6", "H": "#b3ada3", "j": "#ffffff", "s": "#b87a4b", "S": "#96603a", "e": "#1d1d1d", "k": "#d0103f", "m": "#7a2a1a", "E": "#f2b705", "B": "#2e7d32", "r": "#c2185b", "R": "#94104a", "g": "#f2b705", "f": "#7a4a2a"};
    const ps = CFG.paatiPx;
    const sprites = [
      sp(SAREE, pal, (hx + 23) * u - 6 * ps, 58 * u - 16 * ps, ps, 'breathe'),
      sp(['..gg..', '.gggg.', 'g.gg.g', '..gg..', 'wwwwww', 'wkrrkw', 'wrrrrw', 'wwwwww'], { g: '#3f8a3e', w: '#efe4cf', r: '#c8553d', k: '#fff8ec' }, (hx + 6) * u, 61 * u - 8 * Math.round(u * 0.6), Math.round(u * 0.6), 'sway'),
      sp(['..kk..', '.kwkk.', 'kkkkkb', '.kkkk.', '..y.y.'], { k: '#2a2a35', w: '#ffffff', b: '#d9a441', y: '#d9a441' }, (hx + 30) * u, 25 * u - 5 * Math.round(u * 0.5), Math.round(u * 0.5), 'peck'),
      sp(['.o..o.....', 'oooooo....', 'oeodoooooo', 'ooooddoooo', '.oooooooo.'], { o: '#e8913a', d: '#c06a1e', e: '#3a1a0a' }, (hx + 33) * u, 52 * u - 5 * Math.round(u * 0.5), Math.round(u * 0.5), 'breathe'),
      sp(['.bbbb.', '..ll..', '.bbbb.', 'bbllbb', 'bbbbbb', '.bbbb.'], { b: '#d4a017', l: '#ffd166' }, (hx + 37) * u, 61 * u - 6 * Math.round(u * 0.5), Math.round(u * 0.5), '')
    ];
    // dialect cards
    const D = [
      { id: 'eelam', name: 'Eelam', ta: 'ஈழத் தமிழ்', label: 'Eelam Tamil' },
      { id: 'indian', name: 'Indian', ta: 'இந்தியத் தமிழ்', label: 'Indian Tamil' },
      { id: 'malaysian', name: 'Malaysian', ta: 'மலேசியத் தமிழ்', label: 'Malaysian Tamil' }
    ];
    const cards = D.map((d) => ({ id: d.id, name: d.name, ta: d.ta, isEelam: d.id === 'eelam', isIndian: d.id === 'indian', isMalay: d.id === 'malaysian', on: S.sel === d.id,
      ring: S.sel === d.id ? CFG.selRing : 'transparent', lift: S.sel === d.id ? 'translateY(-4px)' : 'none', pressed: S.sel === d.id ? 'true' : 'false',
      pick: () => set({ sel: d.id, started: false }) }));
    const CHAKRA = ['..bbbbb..', '.b..b..b.', 'b.b.b.b.b', 'b..bbb..b', 'bbbbbbbbb', 'b..bbb..b', 'b.b.b.b.b', '.b..b..b.', '..bbbbb..'];
    const MOON = ['...yyyy.....', '..yy.........'.slice(0, 12), '.yy.........', 'yy..........', 'yy.....y....', 'yy....yyy...', 'yy..yyyyyyy.', 'yy....yyy...', 'yy....y.y...', '.yy.........', '..yy........', '...yyyy.....'];
    const selLabel = D.filter((d) => d.id === S.sel)[0].label;
    const M = [
      { id: 'easy', name: 'Easy', ta: 'எளிது', desc: 'English help and hints', stars: 1 },
      { id: 'hard', name: 'Hard', ta: 'கடினம்', desc: 'All Tamil, no hints', stars: 3 }
    ];
    const modes = M.map((m) => ({ id: m.id, name: m.name, ta: m.ta, desc: m.desc, on: S.mode === m.id, pressed: S.mode === m.id ? 'true' : 'false',
      bg: S.mode === m.id ? '#fdeec9' : '#fffaf0', edge: S.mode === m.id ? '#e8ad2f' : '#c99a6b', ring: S.mode === m.id ? CFG.selRing : 'transparent',
      stars: [0, 1, 2].map((i) => ({ c: i < m.stars ? '#d8551f' : '#e6d3ad' })), pick: () => set({ mode: m.id, started: false }) }));
    const isTitle = S.screen !== 'setup';
    const openSetup = () => { try { SFX.prime(); } catch (e) { /* ignore */ } set({ screen: 'setup' }); };
    const modeLabel = M.filter((m) => m.id === S.mode)[0].name;
    return { rootRef: this._rootRef, stage: STAGE, showRotate: !!(this.state && this.state.portrait),
      rects, sprites, cards, selLabel, modes, modeLabel,
      isTitle: isTitle, openSetup: openSetup,
      chakra: toPx(CHAKRA, { b: '#000080' }), moon: toPx(MOON, { y: '#ffcc00' }),
      started: S.started, notStarted: !S.started,
      startText: 'Starting Paati Payanam in ' + selLabel + ', ' + modeLabel.toLowerCase() + ' mode! வா கண்ணா!',
      start: () => set({ started: true }),
      begin: () => {
        try {
          const ls = window.localStorage;
          ls.setItem('tamil-rpg:settings', JSON.stringify({ dialect: S.sel, dialectLabel: selLabel, mode: S.mode, at: Date.now() }));
          ['tamil-rpg:paati-hearts', 'tamil-rpg:hearts:entrance', 'tamil-rpg:hearts:kitchen', 'tamil-rpg:hearts:living', 'tamil-rpg:stats:entrance', 'tamil-rpg:stats:kitchen', 'tamil-rpg:stats:living', 'tamil-rpg:last-room'].forEach((k) => ls.removeItem(k));
        } catch (e) { /* storage unavailable: the game still plays with default settings */ }
      }
    };
  }
}

const DEFAULT_PROPS = {};

export default function StartBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-start">
      <div ref={v?.rootRef} style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#e9d6aa", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", flexShrink: "0", width: `${v?.stage?.w ?? ""}px`, height: `${v?.stage?.h ?? ""}px` }}>
          <div style={{ position: "absolute", left: "0", top: "0", transform: `scale(${v?.stage?.s ?? ""})`, transformOrigin: "top left", width: "960px", height: "600px", overflow: "hidden", background: "#120d18", fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>
            <div style={{ position: "absolute", inset: "0", overflow: "hidden" }}>
              <div aria-hidden={"true"} style={{ position: "absolute", inset: "0" }}>
                {(v?.rects || []).map((q, $index) => (
                  <React.Fragment key={$index}>
                    <div className={q?.cls} style={{ position: "absolute", left: `${q?.x ?? ""}px`, top: `${q?.y ?? ""}px`, width: `${q?.w ?? ""}px`, height: `${q?.h ?? ""}px`, background: q?.bg }}></div>
                  </React.Fragment>
                ))}
              </div>
              {(v?.sprites || []).map((s, $index) => (
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
              <div style={{ position: "absolute", left: "18px", top: "18px", padding: "6px 12px", background: "#c8553d", border: "3px solid #5b3a22", boxShadow: "inset 0 0 0 2px #f0a36a, 4px 4px 0 rgba(58,35,22,0.3)", color: "#fff4da", fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", letterSpacing: "1px", whiteSpace: "nowrap" }}>
                {"A TAMIL FAMILY ADVENTURE"}
              </div>
              <div style={{ position: "absolute", left: "256px", top: "70px", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
                <div style={{ display: "inline-block", padding: "6px 14px", background: "#c8553d", border: "3px solid #5b3a22", boxShadow: "inset 0 0 0 2px #f0a36a, 4px 4px 0 rgba(58,35,22,0.3)" }}>
                  <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "26px", lineHeight: "1.25", color: "#fff8ec" }}>
                    {"\u0b89\u0bb3\u0bcd\u0bb3\u0bc7 \u0bb5\u0bbe \u0b95\u0ba3\u0bcd\u0ba3\u0bbe!"}
                  </div>
                  <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", color: "#ffe2b8" }}>
                    {"(Come inside, dear child!)"}
                  </div>
                </div>
              </div>
              <div className={"twinkle"} aria-hidden={"true"} style={{ position: "absolute", left: "60px", top: "160px", animationDelay: "0s" }}>
                <svg width={"15"} height={"15"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                  <rect x={"2"} y={"0"} width={"1"} height={"5"} fill={"#fff2c2"}></rect>
                  <rect x={"0"} y={"2"} width={"5"} height={"1"} fill={"#fff2c2"}></rect>
                  <rect x={"2"} y={"2"} width={"1"} height={"1"} fill={"#ffffff"}></rect>
                </svg>
              </div>
              <div className={"twinkle"} aria-hidden={"true"} style={{ position: "absolute", left: "470px", top: "120px", animationDelay: "0.6s" }}>
                <svg width={"21"} height={"21"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                  <rect x={"2"} y={"0"} width={"1"} height={"5"} fill={"#fff2c2"}></rect>
                  <rect x={"0"} y={"2"} width={"5"} height={"1"} fill={"#fff2c2"}></rect>
                  <rect x={"2"} y={"2"} width={"1"} height={"1"} fill={"#ffffff"}></rect>
                </svg>
              </div>
              <div className={"twinkle"} aria-hidden={"true"} style={{ position: "absolute", left: "30px", top: "380px", animationDelay: "1.1s" }}>
                <svg width={"12"} height={"12"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                  <rect x={"2"} y={"0"} width={"1"} height={"5"} fill={"#fff2c2"}></rect>
                  <rect x={"0"} y={"2"} width={"5"} height={"1"} fill={"#fff2c2"}></rect>
                  <rect x={"2"} y={"2"} width={"1"} height={"1"} fill={"#ffffff"}></rect>
                </svg>
              </div>
              <div className={"twinkle"} aria-hidden={"true"} style={{ position: "absolute", left: "440px", top: "300px", animationDelay: "0.3s" }}>
                <svg width={"14"} height={"14"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                  <rect x={"2"} y={"0"} width={"1"} height={"5"} fill={"#fff2c2"}></rect>
                  <rect x={"0"} y={"2"} width={"5"} height={"1"} fill={"#fff2c2"}></rect>
                  <rect x={"2"} y={"2"} width={"1"} height={"1"} fill={"#ffffff"}></rect>
                </svg>
              </div>
              <div className={"bobx"} style={{ position: "absolute", left: "318px", top: "330px", padding: "8px 12px", background: "#fff6e5", border: "3px solid #1f1a2e", boxShadow: "4px 4px 0 rgba(31,26,46,0.45)" }}>
                <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "16px", color: "#1f1a2e" }}>
                  {"Vaa kanna!"}
                </div>
                <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#c2185b" }}>
                  {"\u0bb5\u0bbe \u0b95\u0ba3\u0bcd\u0ba3\u0bbe!"}
                </div>
                <span aria-hidden={"true"} style={{ position: "absolute", left: "14px", bottom: "-12px", width: "0", height: "0", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "12px solid #1f1a2e" }}></span>
              </div>
            </div>
            <div style={{ position: "absolute", left: "548px", top: "26px", width: "390px", height: "548px", boxSizing: "border-box", padding: "28px 26px", background: "#fbf3e2", border: "4px solid #5b3a22", boxShadow: "inset 0 0 0 3px #e8ad2f, 8px 8px 0 rgba(58,35,22,0.35)", overflow: "hidden" }}>
              <svg aria-hidden={"true"} style={{ position: "absolute", right: "-50px", bottom: "-50px", width: "180px", height: "180px", opacity: "0.14" }} viewBox={"0 0 200 200"} shapeRendering={"crispEdges"}>
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
              <div style={{ position: "relative" }}>
                <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", letterSpacing: "2px", color: "#c8841a" }}>
                  {"TAMIL CONVERSATION ADVENTURE"}
                </div>
                <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: "700", fontSize: "42px", lineHeight: "0.98", color: "#6e1b1b", marginTop: "8px" }}>
                  {"Paati"}
                  <br />
                  {"Payanam"}
                </div>
                <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "21px", color: "#d8551f", marginTop: "8px" }}>
                  {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf \u0baa\u0baf\u0ba3\u0bae\u0bcd"}
                </div>
                <div style={{ height: "6px" }}></div>
                <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.55", color: "#5a4536", maxWidth: "340px" }}>
                  {"Come home, talk with Paati, and learn to speak with warmth, confidence, and respect."}
                </div>
                <div style={{ height: "12px" }}></div>
                <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", letterSpacing: "1.5px", color: "#8a6a4a" }}>
                  {"CHOOSE YOUR TAMIL DIALECT"}
                </div>
                <div style={{ height: "8px" }}></div>
                <div role={"radiogroup"} aria-label={"Choose your Tamil dialect"} style={{ display: "flex", gap: "8px", padding: "3px" }}>
                  {(v?.cards || []).map((c, $index) => (
                    <React.Fragment key={$index}>
                      <button role={"radio"} aria-checked={c?.pressed} className={"dcard"} onClick={c?.pick} style={{ position: "relative", flex: "1", minWidth: "0", height: "76px", padding: "0", cursor: "pointer", overflow: "hidden", border: "3px solid #3a2316", boxShadow: `0 0 0 3px ${c?.ring ?? ""}, 4px 4px 0 #c99a6b`, transform: c?.lift, background: "#3a1010", textAlign: "left" }}>
                        {c?.isEelam ? (
                          <>
                            <div aria-hidden={"true"} style={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "44%", background: "#3a1010", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                              <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "35px", lineHeight: "1", color: "#ff8200" }}>
                                {"\u0ba4"}
                              </span>
                            </div>
                          </>
                        ) : null}
                        {c?.isIndian ? (
                          <>
                            <div aria-hidden={"true"} style={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "44%", background: "linear-gradient(#ff9933 0 33.3%, #ffffff 33.3% 66.6%, #138808 66.6%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 3px)", gridAutoRows: "3px", transform: "scale(.85)" }}>
                                {(v?.chakra || []).map((p, $index) => (
                                  <React.Fragment key={$index}>
                                    <div style={{ background: p?.c }}></div>
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : null}
                        {c?.isMalay ? (
                          <>
                            <div aria-hidden={"true"} style={{ position: "absolute", left: "0", right: "0", top: "0", bottom: "44%", background: "repeating-linear-gradient(0deg, #cc0001 0 4px, #ffffff 4px 8px)" }}>
                              <div style={{ position: "absolute", left: "0", top: "0", width: "50%", height: "57%", background: "#010066", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 2px)", gridAutoRows: "2px" }}>
                                  {(v?.moon || []).map((p, $index) => (
                                    <React.Fragment key={$index}>
                                      <div style={{ background: p?.c }}></div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                        <div aria-hidden={"true"} style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "44%", background: "#2a170c", borderTop: "2px solid rgba(255,244,218,0.4)" }}></div>
                        {c?.on ? (
                          <>
                            <div aria-hidden={"true"} style={{ position: "absolute", right: "4px", top: "4px", zIndex: "2", width: "18px", height: "18px", background: "#e8ad2f", border: "2px solid #1f1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width={"12"} height={"10"} viewBox={"0 0 6 5"} shapeRendering={"crispEdges"}>
                                <rect x={"5"} y={"0"} width={"1"} height={"1"} fill={"#1f1a2e"}></rect>
                                <rect x={"4"} y={"1"} width={"1"} height={"1"} fill={"#1f1a2e"}></rect>
                                <rect x={"3"} y={"2"} width={"1"} height={"1"} fill={"#1f1a2e"}></rect>
                                <rect x={"0"} y={"2"} width={"1"} height={"1"} fill={"#1f1a2e"}></rect>
                                <rect x={"1"} y={"3"} width={"1"} height={"1"} fill={"#1f1a2e"}></rect>
                                <rect x={"2"} y={"3"} width={"1"} height={"2"} fill={"#1f1a2e"}></rect>
                              </svg>
                            </div>
                          </>
                        ) : null}
                        <div style={{ position: "absolute", left: "7px", right: "5px", bottom: "5px", color: "#ffffff", textShadow: "0 1px 0 #241408, 1px 0 0 #241408" }}>
                          <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "13px", lineHeight: "1.1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {c?.name}
                          </div>
                          <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "11px", lineHeight: "1.3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {c?.ta}
                          </div>
                        </div>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <div style={{ height: "12px" }}></div>
                <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", letterSpacing: "1.5px", color: "#8a6a4a" }}>
                  {"CHOOSE YOUR MODE"}
                </div>
                <div style={{ height: "8px" }}></div>
                <div role={"radiogroup"} aria-label={"Choose easy or hard mode"} style={{ display: "flex", gap: "12px", padding: "9px 9px 3px 3px" }}>
                  {(v?.modes || []).map((m, $index) => (
                    <React.Fragment key={$index}>
                      <button role={"radio"} aria-checked={m?.pressed} className={"dcard"} onClick={m?.pick} style={{ position: "relative", flex: "1", minWidth: "0", boxSizing: "border-box", minHeight: "44px", padding: "6px 8px", cursor: "pointer", textAlign: "left", background: m?.bg, border: `3px solid ${m?.edge ?? ""}`, boxShadow: `0 0 0 3px ${m?.ring ?? ""}, 3px 3px 0 #c99a6b`, display: "flex", flexDirection: "column", justifyContent: "center", gap: "1px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "5px", minWidth: "0" }}>
                          <span style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "16px", color: "#6e1b1b" }}>
                            {m?.name}
                          </span>
                          <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", color: "#d8551f", whiteSpace: "nowrap" }}>
                            {m?.ta}
                          </span>
                          <span style={{ display: "flex", gap: "1px", marginLeft: "auto", flexShrink: "0" }}>
                            {(m?.stars || []).map((st, $index) => (
                              <React.Fragment key={$index}>
                                <svg aria-hidden={"true"} width={"11"} height={"11"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                                  <rect x={"2"} y={"0"} width={"1"} height={"1"} fill={st?.c}></rect>
                                  <rect x={"0"} y={"1"} width={"5"} height={"2"} fill={st?.c}></rect>
                                  <rect x={"1"} y={"3"} width={"3"} height={"1"} fill={st?.c}></rect>
                                  <rect x={"0"} y={"4"} width={"2"} height={"1"} fill={st?.c}></rect>
                                  <rect x={"3"} y={"4"} width={"2"} height={"1"} fill={st?.c}></rect>
                                </svg>
                              </React.Fragment>
                            ))}
                          </span>
                        </span>
                        <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "12px", color: "#5a4536", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {m?.desc}
                        </span>
                        {m?.on ? (
                          <>
                            <span aria-hidden={"true"} style={{ position: "absolute", right: "-9px", top: "-9px", width: "18px", height: "18px", background: "#e8ad2f", border: "2px solid #3a2316", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width={"10"} height={"8"} viewBox={"0 0 6 5"} shapeRendering={"crispEdges"}>
                                <rect x={"5"} y={"0"} width={"1"} height={"1"} fill={"#3a2316"}></rect>
                                <rect x={"4"} y={"1"} width={"1"} height={"1"} fill={"#3a2316"}></rect>
                                <rect x={"3"} y={"2"} width={"1"} height={"1"} fill={"#3a2316"}></rect>
                                <rect x={"0"} y={"2"} width={"1"} height={"1"} fill={"#3a2316"}></rect>
                                <rect x={"1"} y={"3"} width={"1"} height={"1"} fill={"#3a2316"}></rect>
                                <rect x={"2"} y={"3"} width={"1"} height={"2"} fill={"#3a2316"}></rect>
                              </svg>
                            </span>
                          </>
                        ) : null}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <div style={{ height: "14px" }}></div>
                <Link className={"startbtn"} to="/entrance" onClick={v?.begin} style={{ textDecoration: "none", boxSizing: "border-box", width: "100%", minHeight: "56px", padding: "0 22px", background: "#f4c444", border: "4px solid #7a4a00", boxShadow: "0 5px 0 #7a4a00", color: "#3a2316", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "20px", whiteSpace: "nowrap", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  {"Start your journey "}
                  <span aria-hidden={"true"}>
                    {"\u2192"}
                  </span>
                  <svg aria-hidden={"true"} width={"15"} height={"15"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                    <rect x={"2"} y={"0"} width={"1"} height={"5"} fill={"#3a2316"}></rect>
                    <rect x={"0"} y={"2"} width={"5"} height={"1"} fill={"#3a2316"}></rect>
                  </svg>
                </Link>
                <div style={{ height: "6px" }}></div>
                <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", color: "#8a6a4a" }}>
                  {"Selected: "}
                  <b style={{ color: "#6e1b1b" }}>
                    {v?.selLabel}
                  </b>
                  {" \u00b7 "}
                  <b style={{ color: "#6e1b1b" }}>
                    {v?.modeLabel}{" mode"}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
        {v?.isTitle ? (
          <>
            <div style={{ position: "absolute", inset: "0", zIndex: "30", background: "radial-gradient(circle at 50% 38%, rgba(60,26,18,0.55), rgba(10,5,14,0.92) 72%), rgba(10,5,14,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "620px", maxWidth: "94%", boxSizing: "border-box", padding: "30px 30px 24px", background: "#241016", border: "4px solid #c8553d", boxShadow: "inset 0 0 0 3px #f2b705, 0 0 0 6px #2a170c, 10px 10px 0 rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}>
                <div className={"glow"} style={{ position: "absolute", inset: "-1px", pointerEvents: "none" }}></div>
                <div aria-hidden={"true"} style={{ display: "flex", gap: "8px" }}>
                  {[0, 1, 2].map((i) => (
                    <svg key={i} width={"22"} height={"19"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"}>
                      <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={"#ff4d6d"}></rect>
                      <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={"#ff4d6d"}></rect>
                      <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={"#ff4d6d"}></rect>
                      <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={"#ff4d6d"}></rect>
                      <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={"#ff4d6d"}></rect>
                      <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={"#ff4d6d"}></rect>
                      <rect x={"1"} y={"1"} width={"1"} height={"1"} fill={"#ffd6de"}></rect>
                    </svg>
                  ))}
                </div>
                <div style={{ padding: "10px 22px", background: "#c8553d", border: "3px solid #5b3a22", boxShadow: "inset 0 0 0 2px #f0a36a, 4px 4px 0 rgba(0,0,0,0.4)" }}>
                  <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "44px", lineHeight: "1.15", color: "#fff8ec", textShadow: "2px 2px 0 #6e1b1b" }}>
                    {"\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf \u0baa\u0baf\u0ba3\u0bae\u0bcd"}
                  </div>
                  <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "22px", letterSpacing: "3px", color: "#ffe2b8" }}>
                    {"PAATI PAYANAM"}
                  </div>
                </div>
                <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "16px", color: "#ffe2b8", lineHeight: "1.5" }}>
                  {"A Tamil family adventure \u00b7 learn by speaking \u00b7 "}
                  <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", color: "#f2b705" }}>
                    {"\u0baa\u0bc7\u0b9a\u0bbf\u0b95\u0bcd \u0b95\u0bb1\u0bcd\u0bb1\u0bc1\u0b95\u0bcd\u0b95\u0bca\u0bb3\u0bcd"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "2px" }}>
                  <button onClick={v?.openSetup} style={{ minHeight: "54px", padding: "0 26px", background: "#f4c444", border: "4px solid #7a4a00", boxShadow: "0 5px 0 #7a4a00", color: "#3a2316", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "19px", letterSpacing: "1px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                      <rect x={"0"} y={"0"} width={"2"} height={"5"} fill={"#3a2316"}></rect>
                      <rect x={"3"} y={"0"} width={"2"} height={"5"} fill={"#3a2316"}></rect>
                    </svg>
                    {"PRESS START"}
                  </button>
                </div>
                <div className={"blink"} style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", letterSpacing: "2px", color: "#e8ad2f" }}>
                  {"\u25b6 RING THE BELL TO BEGIN"}
                </div>
                <div style={{ display: "flex", gap: "14px", marginTop: "4px", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "12px", color: "rgba(255,226,184,0.66)" }}>
                  <span>{"\u{1F399} speech grading (Scribe v3)"}</span>
                  <span>{"\u{1F514} doorbell SFX"}</span>
                  <span>{"\u{2764}\u{FE0F} 5 hearts"}</span>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {v?.showRotate ? (
          <>
            <div role={"status"} style={{ position: "absolute", left: "50%", bottom: "16px", transform: "translateX(-50%)", padding: "8px 14px", background: "#fbf3e2", border: "3px solid #5b3a22", color: "#3a2316", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "15px", whiteSpace: "nowrap" }}>
              {"Turn your phone sideways for a bigger view"}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
