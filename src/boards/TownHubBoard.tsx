// @ts-nocheck
/* Generated from the design canvas board "Main.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "react-router-dom";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import "./town.css";

class Component extends DCLogic {
  renderVals() {
    const W = 40, H = 25;
    const g = [];
    for (let y = 0; y < H; y++) g.push(new Array(W).fill('.'));
    const f = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (j >= 0 && j < H && i >= 0 && i < W) g[j][i] = c; };
    for (let i = 0; i < W; i++) if (i % 6 !== 3) g[0][i] = 'T';
    f(0, 1, 1, 9, 'T'); f(39, 1, 1, 9, 'T');
    f(2, 2, 10, 5, 'H'); f(2, 7, 10, 2, 'h'); f(6, 7, 2, 2, 'd'); f(3, 7, 2, 1, 'n'); f(9, 7, 2, 1, 'n'); f(5, 9, 4, 1, 'o');
    f(15, 2, 11, 3, 'K'); f(15, 5, 11, 1, 'A'); f(15, 6, 11, 3, 'k'); f(19, 7, 3, 2, 'd'); f(16, 7, 2, 1, 'n'); f(23, 7, 2, 1, 'n'); f(19, 9, 3, 1, 's');
    f(29, 2, 9, 5, 'M'); f(29, 7, 9, 2, 'm'); f(32, 7, 3, 2, 'G'); f(32, 9, 3, 1, 's');
    f(0, 10, 40, 1, 's'); f(0, 11, 40, 3, 'r');
    for (let i = 1; i < W; i += 3) g[12][i] = '-';
    f(18, 11, 3, 3, 'z'); f(0, 14, 40, 1, 's');
    f(0, 15, 1, 9, 'T'); f(39, 15, 1, 9, 'T'); f(0, 24, 40, 1, 'T');
    f(2, 16, 6, 1, 'x'); f(2, 17, 6, 1, 'p'); f(2, 18, 6, 1, 'y');
    f(11, 15, 2, 9, 'p');
    f(15, 16, 7, 1, 'W'); f(14, 17, 9, 5, 'W'); f(15, 22, 7, 1, 'W');
    f(26, 16, 11, 6, 'q');
    [[9, 19], [24, 18], [24, 22], [5, 22], [8, 16], [33, 23]].forEach(([x, y]) => { g[y][x] = 'T'; });
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (g[y][x] === '.' && (x * 13 + y * 7) % 11 === 0) g[y][x] = ',';
    const px = (c, x, y, w, h) => 'linear-gradient(' + c + ',' + c + ') ' + x + 'px ' + y + 'px/' + w + 'px ' + h + 'px no-repeat';
    const P = {
      '.': px('#8fd46a', 6, 8, 2, 4) + ',' + px('#8fd46a', 16, 15, 2, 4) + ',#7cc35a',
      ',': px('#ffd166', 5, 6, 4, 4) + ',' + px('#ef6f6c', 15, 14, 4, 4) + ',#7cc35a',
      'T': px('#6bbf55', 4, 3, 8, 6) + ',' + px('#2f6e34', 0, 20, 24, 4) + ',#3f8a3e',
      'H': 'repeating-linear-gradient(0deg,#c8553d 0 6px,#a8432f 6px 8px)',
      'h': px('#c99a6b', 0, 20, 24, 4) + ',#f6dcb8',
      'n': px('#7fc8e8', 5, 5, 14, 11) + ',' + px('#7a4a2a', 3, 3, 18, 15) + ',' + px('#c99a6b', 0, 20, 24, 4) + ',#f6dcb8',
      'd': px('#e0a43a', 15, 10, 3, 3) + ',#7a4a2a',
      'o': 'radial-gradient(circle,#fff8ec 0 2px,transparent 2px) 0 0/8px 8px,#d9b38c',
      'K': 'repeating-linear-gradient(0deg,#d8c7a8 0 11px,#c4b392 11px 12px)',
      'A': 'repeating-linear-gradient(90deg,#e94f37 0 12px,#fff3e0 12px 24px)',
      'k': px('#b5651d', 0, 20, 24, 4) + ',#f7c948',
      'M': 'repeating-linear-gradient(90deg,#8aa0b8 0 22px,#6f86a0 22px 24px)',
      'm': 'linear-gradient(135deg,transparent 0 40%,#e8f6ff 40% 50%,transparent 50%),#6fb3d6',
      'G': px('#e8f6ff', 3, 3, 2, 18) + ',#3f7fa6',
      's': px('#b9ad97', 22, 0, 2, 24) + ',' + px('#b9ad97', 0, 22, 24, 2) + ',#d9cdb5',
      'r': '#4b4d57',
      '-': px('#f2e6b8', 4, 10, 16, 4) + ',#4b4d57',
      'z': 'repeating-linear-gradient(0deg,#ecebe4 0 6px,#4b4d57 6px 12px)',
      'x': 'repeating-linear-gradient(90deg,#2f7fbf 0 8px,#f2f2f2 8px 16px)',
      'y': px('#6b3f22', 0, 18, 24, 6) + ',#9c6236',
      'p': '#d8b27c',
      'W': px('#a8e0f0', 6, 8, 8, 2) + ',#3f9fd1',
      'q': px('#e8e0c8', 0, 0, 2, 24) + ',#5a5c66'
    };
    const ALT = { 'r': '#474953', 'p': '#cfa771', 'W': px('#a8e0f0', 12, 16, 6, 2) + ',#3f9fd1', '.': '#76bb55' };
    const tiles = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = g[y][x];
      const alt = ALT[c] && (x * 31 + y * 17) % 5 === 0;
      tiles.push({ bg: alt ? ALT[c] : (P[c] || P['.']) });
    }
    const BASE = ['..hhhh..', '.hhhhhh.', '.hssssh.', '.sesses.', '..smms..', '.cddddc.', 'scddddcs', 'scddddcs', '.cddddc.', '..pppp..', '..p..p..', '.ff..ff.'];
    const SAREE = ['..hhhh..', '.hjhhhh.', '.hssssh.', '.sesses.', '..ssss..', '.krrrgk.', 'skrrrgks', 'srrrrgrs', '.rrrrgr.', '.rrrrgr.', '.rrrrrr.', '.gggggg.'];
    const AUTO = ['..kkkkkk..', '.kkkkkkkk.', '.kkkkkkkk.', '.kkkkkkkk.', '.ywwwwwwy.', '.yyyyyyyy.', 'tyyyyyyyyt', 't.yyyyyy.t', '....tt....'];
    const autoPal = { k: '#1f1f24', y: '#f5c518', w: '#9fd3e6', t: '#2a2a2a' };
    const sp = (rows, pal, x, y, size) => ({ left: x, top: y, cols: rows[0].length, px: size, pixels: rows.join('').split('').map((ch) => ({ c: ch === '.' ? 'transparent' : (pal[ch] || '#ff00ff') })) });
    const who = (s, o) => Object.assign({ s: s, e: '#1d1d1d', m: s, f: '#2a2a2a' }, o);
    const people = [
      [BASE, who('#8d5a3b', { h: '#1d1d1d', m: '#1d1d1d', c: '#b59b6d', d: '#c8ae7e', p: '#7a6a4a' }), 724, 420],
      [BASE, who('#b07a52', { h: '#2b1b12', c: '#f5f2ea', d: '#e4ddd0', p: '#4b6a8a' }), 100, 398],
      [SAREE, { h: '#d8d4cc', j: '#ffffff', s: '#a86b45', e: '#1d1d1d', k: '#2e7d32', r: '#c2185b', g: '#f2b705' }, 198, 204],
      [BASE, who('#9a6440', { h: '#1d1d1d', c: '#f4a261', d: '#f4a261', p: '#3d5a80' }), 84, 204],
      [BASE, who('#8d5a3b', { h: '#1d1d1d', m: '#1d1d1d', c: '#f5f5f5', d: '#2b2b2b', p: '#2b2b2b' }), 560, 204],
      [BASE, who('#a86b45', { h: '#2b1b12', c: '#7b4bb7', d: '#9a6fd1', p: '#2b2b3b' }), 868, 204],
      [BASE, who('#c68a5e', { h: '#3b2a20', c: '#e76f51', d: '#2a9d8f', p: '#264653' }), 512, 232]
    ];
    const sprites = [sp(AUTO, autoPal, 652, 410, 4), sp(AUTO, autoPal, 790, 410, 4)].concat(people.map((q) => sp(q[0], q[1], q[2], q[3], 3)));
    const shadows = people.map((q) => ({ left: q[2] + 3, top: q[3] + 33 }));
    const formal = { bg: '#ffd166', edge: '#7a4a00', ink: '#3a2400' };
    const casual = { bg: '#9fe1cb', edge: '#0f6e56', ink: '#04342c' };
    const anna = { bg: '#f5c4b3', edge: '#993c1d', ink: '#4a1b0c' };
    const badges = [
      Object.assign({ x: 210, y: 176, label: 'நீங்க' }, formal),
      Object.assign({ x: 96, y: 176, label: 'நீ' }, casual),
      Object.assign({ x: 572, y: 176, label: 'நீங்க' }, formal),
      Object.assign({ x: 856, y: 176, label: 'நீங்க' }, formal),
      Object.assign({ x: 112, y: 372, label: 'அண்ணா' }, anna),
      Object.assign({ x: 736, y: 394, label: 'அண்ணா' }, anna)
    ];
    const meter = [];
    for (let i = 0; i < 10; i++) meter.push({ c: i < 7 ? '#2a9d8f' : '#3a3350' });
    return { tiles, sprites, shadows, badges, meter, showHints: this.props.showHints ?? true };
  }
}

const DEFAULT_PROPS = {"showHints": true};

export default function TownHubBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-town">
      <div style={{ position: "relative", width: "960px", height: "600px", overflow: "hidden", background: "#7cc35a", fontFamily: "'Pixelify Sans', 'Noto Sans Tamil', monospace", color: "#fff6e5" }}>
        <div aria-hidden={"true"} style={{ position: "absolute", inset: "0", display: "grid", gridTemplateColumns: "repeat(40, 24px)", gridAutoRows: "24px" }}>
          {(v?.tiles || []).map((t, $index) => (
            <React.Fragment key={$index}>
              <div style={{ background: t?.bg }}></div>
            </React.Fragment>
          ))}
        </div>
        {(v?.shadows || []).map((sh, $index) => (
          <React.Fragment key={$index}>
            <div aria-hidden={"true"} style={{ position: "absolute", left: `${sh?.left ?? ""}px`, top: `${sh?.top ?? ""}px`, width: "18px", height: "5px", background: "rgba(20,40,10,0.28)" }}></div>
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
        <div style={{ position: "absolute", left: "96px", top: "108px", width: "144px", padding: "4px 6px", background: "#5b3a22", border: "3px solid #2b1a10", boxShadow: "inset 0 0 0 2px #c99a6b", textAlign: "center" }}>
          <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.2", color: "#fff6e5" }}>
            {"\u0bb5\u0bc0\u0b9f\u0bc1"}
          </div>
          <div style={{ fontSize: "12px", color: "#f6dcb8" }}>
            {"veedu \u00b7 home"}
          </div>
        </div>
        <div style={{ position: "absolute", left: "392px", top: "56px", width: "200px", padding: "4px 6px", background: "#b23a2a", border: "3px solid #5a1a12", boxShadow: "inset 0 0 0 2px #ffd166", textAlign: "center" }}>
          <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.2", color: "#fff6e5" }}>
            {"\u0b85\u0ba9\u0bcd\u0ba9\u0bae\u0bcd \u0b89\u0ba3\u0bb5\u0b95\u0bae\u0bcd"}
          </div>
          <div style={{ fontSize: "12px", color: "#ffe8b0" }}>
            {"annam unavagam \u00b7 restaurant"}
          </div>
        </div>
        <div style={{ position: "absolute", left: "708px", top: "130px", width: "152px", padding: "4px 6px", background: "#3d4f8a", border: "3px solid #1c2650", boxShadow: "inset 0 0 0 2px #bfe6f5", textAlign: "center" }}>
          <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "17px", lineHeight: "1.2", color: "#ffffff" }}>
            {"\u0ba4\u0bc1\u0ba3\u0bbf\u0b95\u0bcd\u0b95\u0b9f\u0bc8"}
          </div>
          <div style={{ fontSize: "12px", color: "#dcefff" }}>
            {"thuni kadai \u00b7 clothes"}
          </div>
        </div>
        <div style={{ position: "absolute", left: "60px", top: "462px", width: "112px", padding: "3px 6px", background: "#2f7fbf", border: "3px solid #123a5c", textAlign: "center" }}>
          <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", lineHeight: "1.2", color: "#ffffff" }}>
            {"\u0b9f\u0bc0 \u0b95\u0b9f\u0bc8"}
          </div>
          <div style={{ fontSize: "11px", color: "#e6f3ff" }}>
            {"tea kadai"}
          </div>
        </div>
        {v?.showHints ? (
          <>
            {(v?.badges || []).map((b, $index) => (
              <React.Fragment key={$index}>
                <div style={{ position: "absolute", left: `${b?.x ?? ""}px`, top: `${b?.y ?? ""}px`, transform: "translateX(-50%)", padding: "1px 6px", background: b?.bg, border: `2px solid ${b?.edge ?? ""}`, fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", lineHeight: "1.4", color: b?.ink, whiteSpace: "nowrap" }}>
                  {b?.label}
                </div>
              </React.Fragment>
            ))}
          </>
        ) : null}
        <div className={"bob"} aria-hidden={"true"} style={{ position: "absolute", left: "880px", top: "150px", width: "18px", height: "22px", background: "#ffd166", border: "3px solid #5a3a00", color: "#5a3a00", fontWeight: "600", fontSize: "16px", lineHeight: "22px", textAlign: "center" }}>
          {"!"}
        </div>
        <div className={"bob"} aria-hidden={"true"} style={{ position: "absolute", left: "736px", top: "364px", width: "18px", height: "22px", background: "#ffd166", border: "3px solid #5a3a00", color: "#5a3a00", fontWeight: "600", fontSize: "16px", lineHeight: "22px", textAlign: "center" }}>
          {"!"}
        </div>
        <div style={{ position: "absolute", left: "244px", top: "176px", padding: "2px 8px", background: "#2e7d32", border: "2px solid #123d16", fontSize: "13px", color: "#ffffff", whiteSpace: "nowrap" }}>
          {"+18 respect"}
        </div>
        <div style={{ position: "absolute", left: "430px", top: "278px", padding: "6px 10px", background: "#1f1a2e", border: "3px solid #f2b705", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
          <span style={{ display: "inline-block", padding: "0 6px", background: "#f2b705", color: "#1f1a2e", fontWeight: "600", fontSize: "14px" }}>
            {"E"}
          </span>
          <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "15px", color: "#fff6e5" }}>
            {"\u0baa\u0bc7\u0b9a\u0bc1"}
          </span>
          <span style={{ fontSize: "14px", color: "#f6dcb8" }}>
            {"pesu \u00b7 talk to the waiter"}
          </span>
        </div>
        <div style={{ position: "absolute", left: "12px", top: "12px", width: "236px", padding: "8px 10px", background: "#1f1a2e", border: "3px solid #0d0a14", boxShadow: "inset 0 0 0 2px #e9c46a", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
            <span style={{ color: "#fff6e5" }}>
              {"Day 1 \u00b7 "}
              <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
                {"\u0b95\u0bbe\u0bb2\u0bc8"}
              </span>
            </span>
            <span style={{ padding: "0 6px", background: "#2a9d8f", color: "#04241f", fontWeight: "600" }}>
              {"EASY"}
            </span>
          </div>
          <div style={{ fontSize: "12px", color: "#f6dcb8" }}>
            <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", color: "#fff6e5" }}>
              {"\u0bae\u0bb0\u0bbf\u0baf\u0bbe\u0ba4\u0bc8"}
            </span>
            {" \u00b7 respect"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, minmax(0, 1fr))", gap: "2px" }}>
            {(v?.meter || []).map((m, $index) => (
              <React.Fragment key={$index}>
                <div style={{ height: "8px", background: m?.c }}></div>
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
            <span style={{ color: "#ffd166" }}>
              {"1,240 pts"}
            </span>
            <span style={{ color: "#ff9f80" }}>
              {"combo \u00d73"}
            </span>
          </div>
        </div>
        <div style={{ position: "absolute", right: "12px", top: "12px", width: "236px", padding: "8px 10px", background: "#1f1a2e", border: "3px solid #0d0a14", boxShadow: "inset 0 0 0 2px #e9c46a", display: "flex", flexDirection: "column", gap: "5px", fontSize: "13px" }}>
          <div style={{ color: "#ffd166", fontWeight: "600" }}>
            {"Today\u2019s errands"}
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "#b8b0c8" }}>
            <span style={{ width: "10px", height: "10px", background: "#2a9d8f", border: "2px solid #9fe1cb" }}></span>
            <span style={{ textDecoration: "line-through" }}>
              {"Greet Paati at home"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "#fff6e5" }}>
            <span style={{ width: "10px", height: "10px", border: "2px solid #ffd166" }}></span>
            <span>
              {"Order lunch at Annam"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "#fff6e5" }}>
            <span style={{ width: "10px", height: "10px", border: "2px solid #ffd166" }}></span>
            <span>
              {"Buy a kurta, size M"}
            </span>
          </div>
        </div>
        <div style={{ position: "absolute", left: "12px", bottom: "12px", padding: "6px 10px", background: "#1f1a2e", border: "3px solid #0d0a14", boxShadow: "inset 0 0 0 2px #e76f51", fontSize: "13px", color: "#fff6e5" }}>
          {"Mistake deck \u00b7 "}
          <span style={{ color: "#ff9f80" }}>
            {"4 cards to redeem"}
          </span>
        </div>
        <div style={{ position: "absolute", right: "16px", bottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ padding: "4px 8px", background: "#1f1a2e", border: "2px solid #0d0a14", fontSize: "13px", color: "#fff6e5" }}>
            {"Hold SPACE to speak"}
          </span>
          <button className={"pulse"} aria-label={"Hold to speak"} style={{ width: "64px", height: "64px", border: "4px solid #5a1a12", background: "#e76f51", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
            <svg width={"28"} height={"32"} viewBox={"0 0 7 8"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
              <rect x={"2"} y={"0"} width={"3"} height={"5"} fill={"#fff6e5"}></rect>
              <rect x={"1"} y={"3"} width={"1"} height={"2"} fill={"#fff6e5"}></rect>
              <rect x={"5"} y={"3"} width={"1"} height={"2"} fill={"#fff6e5"}></rect>
              <rect x={"2"} y={"5"} width={"3"} height={"1"} fill={"#fff6e5"}></rect>
              <rect x={"3"} y={"6"} width={"1"} height={"1"} fill={"#fff6e5"}></rect>
              <rect x={"1"} y={"7"} width={"5"} height={"1"} fill={"#fff6e5"}></rect>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
