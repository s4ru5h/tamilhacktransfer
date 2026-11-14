// @ts-nocheck
/* Generated from the design canvas board "Dusk.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "react-router-dom";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import "./airport.css";

class Component extends DCLogic {
  renderVals() {
    const W = 40, H = 25;
    const g = [];
    for (let y = 0; y < H; y++) g.push(new Array(W).fill('k'));
    const f = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (j >= 0 && j < H && i >= 0 && i < W) g[j][i] = c; };
    f(0, 0, 40, 2, 'R'); f(0, 2, 40, 5, 'G');
    f(8, 5, 4, 2, 'D'); f(18, 5, 4, 2, 'D'); f(28, 5, 4, 2, 'D');
    f(0, 7, 40, 2, 's');
    [2, 6, 14, 24, 34, 38].forEach((i) => f(i, 7, 1, 2, 'P'));
    f(0, 9, 40, 1, 'c'); f(0, 10, 40, 5, 'r');
    for (let i = 1; i < W; i += 3) g[12][i] = '-';
    f(14, 10, 3, 5, 'z');
    f(0, 15, 40, 2, 'm');
    [2, 10, 20, 30, 37].forEach((i) => { g[15][i] = 'L'; });
    f(0, 17, 40, 3, 'r');
    for (let i = 2; i < W; i += 3) g[18][i] = '-';
    const px = (c, x, y, w, h) => 'linear-gradient(' + c + ',' + c + ') ' + x + 'px ' + y + 'px/' + w + 'px ' + h + 'px no-repeat';
    const P = {
      'R': px('#3ee0d0', 0, 20, 24, 2) + ',repeating-linear-gradient(90deg,#2a2d52 0 22px,#22254a 22px 24px)',
      'G': px('#ffcf7a', 4, 4, 7, 10) + ',' + px('#ffcf7a', 13, 4, 7, 10) + ',#31366b',
      'D': px('#8ff3ea', 2, 2, 9, 22) + ',' + px('#8ff3ea', 13, 2, 9, 22) + ',#1b3c4a',
      's': px('#5b5a86', 22, 0, 2, 24) + ',' + px('#5b5a86', 0, 22, 24, 2) + ',#6d6b9b',
      'P': px('#a4a2cf', 8, 0, 8, 24) + ',' + px('#5b5a86', 16, 0, 2, 24) + ',#6d6b9b',
      'c': 'repeating-linear-gradient(90deg,#ffc94d 0 12px,#1b1b2b 12px 24px) 0 0/24px 8px no-repeat,#4a4970',
      'r': '#262842',
      '-': px('#e8e4ff', 4, 10, 16, 3) + ',#262842',
      'z': 'repeating-linear-gradient(0deg,#d9d6f0 0 6px,#262842 6px 12px)',
      'm': px('#3d7560', 6, 8, 2, 4) + ',#2f5a4a',
      'L': px('#4fae79', 10, 0, 4, 24) + ',' + px('#4fae79', 0, 10, 24, 4) + ',linear-gradient(45deg,transparent 44%,#3a8a5e 44% 56%,transparent 56%),linear-gradient(-45deg,transparent 44%,#3a8a5e 44% 56%,transparent 56%),#2f5a4a',
      'k': px('#5d5f8a', 0, 0, 2, 24) + ',#2a2c48'
    };
    const ALT = { 'G': px('#4b5296', 4, 4, 7, 10) + ',' + px('#ffcf7a', 13, 4, 7, 10) + ',#31366b', 'r': '#23253e' };
    const tiles = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = g[y][x];
      const alt = ALT[c] && (x * 31 + y * 17) % 4 === 0;
      tiles.push({ bg: alt ? ALT[c] : (P[c] || P['k']) });
    }
    const warm = { c: 'rgba(255,190,110,0.30)', c2: 'rgba(255,190,110,0.17)', c3: 'rgba(255,190,110,0.07)' };
    const cyan = { c: 'rgba(62,224,208,0.26)', c2: 'rgba(62,224,208,0.14)', c3: 'rgba(62,224,208,0.06)' };
    const lights = [[156, 372, warm], [396, 372, warm], [636, 372, warm], [876, 372, warm], [240, 190, cyan], [480, 190, cyan], [720, 190, cyan]].map((l) => Object.assign({ x: l[0], y: l[1] }, l[2]));
    const BASE = ['..hhhh..', '.hhhhhh.', '.hssssh.', '.sesses.', '..smms..', '.cddddc.', 'scddddcs', 'scddddcs', '.cddddc.', '..pppp..', '..p..p..', '.ff..ff.'];
    const TAXI = ['..tt........tt..', '.kkkkkkkkkkkkkk.', 'kyyywwwyyyywwwyk', 'kyyywwwyllywwwyk', 'kyyywwwyyyywwwyk', '.kkkkkkkkkkkkkk.', '..tt........tt..'];
    const AUTO = ['..kkkkkk..', '.kkkkkkkk.', '.kkkkkkkk.', '.kkkkkkkk.', '.ywwwwwwy.', '.yyyyyyyy.', 'tyyyyyyyyt', 't.yyyyyy.t', '....tt....'];
    const LAMP = ['kllk', 'kllk', '.kk.', '.kk.', '.kk.', '.kk.', '.kk.', '.kk.', '.kk.', 'kkkk'];
    const taxiPal = { k: '#151522', y: '#f5c518', w: '#7fc8e8', l: '#fff3b0', t: '#0a0a12' };
    const autoPal = { k: '#151522', y: '#f5c518', w: '#7fc8e8', t: '#0a0a12' };
    const lampPal = { k: '#14152a', l: '#ffd27a' };
    const sp = (rows, pal, x, y, size) => ({ left: x, top: y, cols: rows[0].length, px: size, pixels: rows.join('').split('').map((ch) => ({ c: ch === '.' ? 'transparent' : (pal[ch] || '#ff00ff') })) });
    const driver = { h: '#111118', s: '#8d5a3b', e: '#111118', m: '#111118', c: '#b59b6d', d: '#c8ae7e', p: '#6a5a3a', f: '#1a1a22' };
    const player = { h: '#2a1d16', s: '#c68a5e', e: '#111118', m: '#c68a5e', c: '#e76f51', d: '#2a9d8f', p: '#264653', f: '#1a1a22' };
    const sprites = [
      sp(TAXI, taxiPal, 640, 250, 4), sp(TAXI, taxiPal, 110, 250, 4), sp(AUTO, autoPal, 340, 298, 4), sp(TAXI, taxiPal, 800, 304, 4),
      sp(LAMP, lampPal, 150, 340, 3), sp(LAMP, lampPal, 390, 340, 3), sp(LAMP, lampPal, 630, 340, 3), sp(LAMP, lampPal, 870, 340, 3),
      sp(BASE, player, 540, 204, 3), sp(BASE, driver, 600, 204, 3)
    ];
    const portraits = [sp(BASE, driver, 52, 436, 8)];
    const patience = [];
    for (let i = 0; i < 10; i++) patience.push({ c: i < 6 ? '#ffb347' : '#2d2a55' });
    const bars = [6, 14, 20, 10, 18, 8, 16, 12].map((h, i) => ({ h: h, d: (i * 0.1).toFixed(1) }));
    const replies = [
      { ta: 'T. Nagar போகணும், அண்ணா', tl: 'T. Nagar poganum, anna' },
      { ta: 'மீட்டர் போடுங்க', tl: 'Meter podunga' },
      { ta: 'எவ்வளவு ஆகும்?', tl: 'Evvalavu aagum?' }
    ];
    return { tiles, lights, sprites, portraits, patience, bars, replies };
  }
}

const DEFAULT_PROPS = {};

export default function AirportBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-airport">
      <div style={{ position: "relative", width: "960px", height: "600px", overflow: "hidden", background: "#1b1f3b", fontFamily: "'Pixelify Sans', 'Noto Sans Tamil', monospace", color: "#f1eeff" }}>
        <div aria-hidden={"true"} style={{ position: "absolute", inset: "0", display: "grid", gridTemplateColumns: "repeat(40, 24px)", gridAutoRows: "24px" }}>
          {(v?.tiles || []).map((t, $index) => (
            <React.Fragment key={$index}>
              <div style={{ background: t?.bg }}></div>
            </React.Fragment>
          ))}
        </div>
        {(v?.lights || []).map((l, $index) => (
          <React.Fragment key={$index}>
            <div aria-hidden={"true"} style={{ position: "absolute", left: `${l?.x ?? ""}px`, top: `${l?.y ?? ""}px`, width: "160px", height: "160px", transform: "translate(-50%, -50%)", background: `radial-gradient(circle, ${l?.c ?? ""} 0 28px, ${l?.c2 ?? ""} 28px 52px, ${l?.c3 ?? ""} 52px 78px, transparent 78px)` }}></div>
          </React.Fragment>
        ))}
        {(v?.sprites || []).map((s, $index) => (
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
        <div style={{ position: "absolute", left: "60px", top: "74px", padding: "5px 10px", background: "#14152a", border: "3px solid #3ee0d0", textAlign: "left" }}>
          <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.2", color: "#ffffff" }}>
            {"\u0b9a\u0bc6\u0ba9\u0bcd\u0ba9\u0bc8 \u0bb5\u0bbf\u0bae\u0bbe\u0ba9 \u0ba8\u0bbf\u0bb2\u0bc8\u0baf\u0bae\u0bcd"}
          </div>
          <div style={{ fontSize: "12px", color: "#9ff3ea" }}>
            {"chennai vimaana nilaiyam \u00b7 airport"}
          </div>
        </div>
        <div style={{ position: "absolute", left: "412px", top: "92px", padding: "2px 10px", background: "#2a0f2a", border: "3px solid #ff4fa3", textShadow: "0 0 6px #ff4fa3", textAlign: "center" }}>
          <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "16px", color: "#ffd6ec" }}>
            {"\u0bb5\u0bb0\u0bc1\u0b95\u0bc8"}
          </span>
          {" "}
          <span style={{ fontSize: "12px", color: "#ffd6ec" }}>
            {" \u00b7 arrivals"}
          </span>
        </div>
        <div className={"bob"} aria-hidden={"true"} style={{ position: "absolute", left: "612px", top: "150px", padding: "0 6px", background: "#f1eeff", border: "3px solid #14152a", color: "#14152a", fontWeight: "600", fontSize: "14px", lineHeight: "18px" }}>
          {"\u2026"}
        </div>
        <div style={{ position: "absolute", left: "612px", top: "178px", transform: "translateX(-50%)", padding: "1px 6px", background: "#f5c4b3", border: "2px solid #993c1d", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", lineHeight: "1.4", color: "#4a1b0c", whiteSpace: "nowrap" }}>
          {"\u0b85\u0ba3\u0bcd\u0ba3\u0bbe"}
        </div>
        <div style={{ position: "absolute", left: "12px", top: "12px", padding: "6px 10px", background: "#14152a", border: "3px solid #0a0a16", boxShadow: "inset 0 0 0 2px #7f77dd", display: "flex", gap: "8px", alignItems: "center", fontSize: "13px" }}>
          <span style={{ color: "#cecbf6" }}>
            {"Scene 2 \u00b7 taxi curb"}
          </span>
          <span style={{ padding: "0 6px", background: "#3ee0d0", color: "#062a27", fontWeight: "600" }}>
            {"EASY"}
          </span>
        </div>
        <div style={{ position: "absolute", left: "230px", top: "12px", width: "500px", boxSizing: "border-box", padding: "6px 10px", background: "#3a2600", border: "3px solid #ffb347", display: "flex", gap: "10px", alignItems: "center", fontSize: "13px", color: "#ffe6c2" }}>
          <span style={{ padding: "0 6px", background: "#ffb347", color: "#3a2600", fontWeight: "600" }}>
            {"TWIST"}
          </span>
          <span>
            {"Anna Salai is blocked for a festival procession. Give the driver a landmark."}
          </span>
        </div>
        <div style={{ position: "absolute", right: "12px", top: "12px", width: "200px", padding: "6px 10px", background: "#14152a", border: "3px solid #0a0a16", boxShadow: "inset 0 0 0 2px #7f77dd", display: "flex", flexDirection: "column", gap: "5px", fontSize: "12px", color: "#cecbf6" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              {"Driver patience"}
            </span>
            <span style={{ color: "#ffb347" }}>
              {"chatty"}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, minmax(0, 1fr))", gap: "2px" }}>
            {(v?.patience || []).map((m, $index) => (
              <React.Fragment key={$index}>
                <div style={{ height: "8px", background: m?.c }}></div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: "16px", top: "404px", width: "928px", height: "180px", boxSizing: "border-box", padding: "14px", background: "#14152a", border: "4px solid #0a0a16", boxShadow: "inset 0 0 0 3px #534ab7", display: "flex", gap: "16px" }}>
          <div style={{ width: "104px", height: "144px", flexShrink: "0", background: "#2d2a55", border: "3px solid #7f77dd" }}></div>
          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#ffffff" }}>
                {"\u0bae\u0bc1\u0bb0\u0bc1\u0b95\u0ba9\u0bcd \u0b85\u0ba3\u0bcd\u0ba3\u0bbe"}
              </span>
              <span style={{ fontSize: "12px", color: "#afa9ec" }}>
                {"Murugan anna \u00b7 taxi driver"}
              </span>
            </div>
            <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.3", color: "#ffffff" }}>
              {"\u0bb5\u0bbe\u0b99\u0bcd\u0b95 \u0b9a\u0bbe\u0bb0\u0bcd! \u0b8e\u0b99\u0bcd\u0b95 \u0baa\u0bcb\u0b95\u0ba3\u0bc1\u0bae\u0bcd?"}
            </div>
            <div style={{ fontSize: "15px", color: "#9ff3ea" }}>
              {"Vaanga saar! Enga poganum?"}
            </div>
            <div style={{ fontSize: "13px", color: "#b8b4d8" }}>
              {"Come in, sir! Where do you need to go?"}
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "4px", flexWrap: "wrap" }}>
              {(v?.replies || []).map((r, $index) => (
                <React.Fragment key={$index}>
                  <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 10px", minHeight: "44px", background: "#2d2a55", border: "2px solid #7f77dd", color: "#f1eeff", cursor: "pointer", textAlign: "left" }}>
                    <svg width={"10"} height={"12"} viewBox={"0 0 5 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                      <rect x={"0"} y={"0"} width={"1"} height={"6"} fill={"#3ee0d0"}></rect>
                      <rect x={"1"} y={"1"} width={"1"} height={"4"} fill={"#3ee0d0"}></rect>
                      <rect x={"2"} y={"1"} width={"1"} height={"4"} fill={"#3ee0d0"}></rect>
                      <rect x={"3"} y={"2"} width={"1"} height={"2"} fill={"#3ee0d0"}></rect>
                    </svg>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "13px" }}>
                        {r?.ta}
                      </span>
                      <span style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "11px", color: "#afa9ec" }}>
                        {r?.tl}
                      </span>
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div style={{ width: "110px", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <button aria-label={"Hold to speak"} style={{ width: "72px", height: "72px", border: "4px solid #4a0f30", background: "#ff4fa3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
              <svg width={"28"} height={"32"} viewBox={"0 0 7 8"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                <rect x={"2"} y={"0"} width={"3"} height={"5"} fill={"#ffffff"}></rect>
                <rect x={"1"} y={"3"} width={"1"} height={"2"} fill={"#ffffff"}></rect>
                <rect x={"5"} y={"3"} width={"1"} height={"2"} fill={"#ffffff"}></rect>
                <rect x={"2"} y={"5"} width={"3"} height={"1"} fill={"#ffffff"}></rect>
                <rect x={"3"} y={"6"} width={"1"} height={"1"} fill={"#ffffff"}></rect>
                <rect x={"1"} y={"7"} width={"5"} height={"1"} fill={"#ffffff"}></rect>
              </svg>
            </button>
            <div aria-hidden={"true"} style={{ display: "flex", gap: "3px", alignItems: "center", height: "20px" }}>
              {(v?.bars || []).map((b, $index) => (
                <React.Fragment key={$index}>
                  <div className={"wv"} style={{ width: "5px", height: `${b?.h ?? ""}px`, background: "#3ee0d0", animationDelay: `${b?.d ?? ""}s` }}></div>
                </React.Fragment>
              ))}
            </div>
            <div style={{ fontSize: "11px", color: "#afa9ec" }}>
              {"listening\u2026"}
            </div>
          </div>
        </div>
        {(v?.portraits || []).map((s, $index) => (
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
      </div>
    </div>
  );
}
