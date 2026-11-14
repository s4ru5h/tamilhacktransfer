// @ts-nocheck
/* Generated from the design canvas board "Retro.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "react-router-dom";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import "./restaurant.css";

class Component extends DCLogic {
  renderVals() {
    const D = '#2b1d14', M = '#7a4b2a', L = '#c99a5b', X = '#f3e2b8';
    const W = 40, H = 25;
    const g = [];
    for (let y = 0; y < H; y++) g.push(new Array(W).fill('.'));
    const f = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (j >= 0 && j < H && i >= 0 && i < W) g[j][i] = c; };
    f(0, 0, 40, 1, 'W'); f(0, 1, 40, 4, 'w');
    f(11, 2, 9, 3, 'k');
    [[3, 9], [12, 9], [3, 15], [12, 15], [24, 9], [32, 15]].forEach(([x, y]) => { f(x, y - 1, 4, 1, 'c'); f(x, y, 4, 2, 't'); f(x + 1, y, 2, 1, 'l'); f(x, y + 2, 4, 1, 'c'); });
    f(1, 20, 6, 2, 'k');
    f(8, 24, 4, 1, 'd');
    [[0, 5], [19, 5], [0, 23], [19, 23]].forEach(([x, y]) => { g[y][x] = 'p'; });
    const px = (c, x, y, w, h) => 'linear-gradient(' + c + ',' + c + ') ' + x + 'px ' + y + 'px/' + w + 'px ' + h + 'px no-repeat';
    const P = {
      '.': L,
      ',': M,
      'W': D,
      'w': px(M, 0, 20, 24, 4) + ',' + px(M, 11, 0, 2, 20) + ',' + L,
      'k': px(X, 0, 0, 24, 4) + ',' + D,
      't': px(D, 0, 20, 24, 4) + ',' + M,
      'l': px(X, 2, 3, 20, 12) + ',' + px(D, 0, 20, 24, 4) + ',' + M,
      'c': px(D, 6, 6, 12, 12) + ',' + L,
      'd': 'repeating-linear-gradient(90deg,' + D + ' 0 4px,' + M + ' 4px 8px)',
      'p': px(X, 8, 2, 8, 6) + ',' + px(M, 4, 8, 16, 10) + ',' + px(D, 6, 18, 12, 6) + ',' + L
    };
    const tiles = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let c = g[y][x];
      if (c === '.' && (x + y) % 2 === 0) c = ',';
      tiles.push({ bg: P[c] || L });
    }
    const BASE = ['..hhhh..', '.hhhhhh.', '.hssssh.', '.sesses.', '..smms..', '.cddddc.', 'scddddcs', 'scddddcs', '.cddddc.', '..pppp..', '..p..p..', '.ff..ff.'];
    const sp = (rows, pal, x, y, size) => ({ left: x, top: y, cols: rows[0].length, px: size, pixels: rows.join('').split('').map((ch) => ({ c: ch === '.' ? 'transparent' : (pal[ch] || D) })) });
    const who = (o) => Object.assign({ h: D, s: X, e: D, m: X, p: D, f: D }, o);
    const sprites = [
      sp(BASE, who({ c: M, d: X }), 116, 128, 3),
      sp(BASE, who({ m: D, c: X, d: D }), 200, 132, 3),
      sp(BASE, who({ c: M, d: M }), 300, 168, 3),
      sp(BASE, who({ h: M, c: X, d: M }), 84, 448, 3),
      sp(BASE, who({ c: D, d: M }), 108, 312, 3)
    ];
    const rowA = 'transparent', rowB = 'rgba(201,154,91,0.35)';
    const items = [
      { ta: 'இட்லி', tl: 'idli', price: '₹40' },
      { ta: 'தோசை', tl: 'dosai', price: '₹60' },
      { ta: 'பொங்கல்', tl: 'pongal', price: '₹55' },
      { ta: 'வடை', tl: 'vadai', price: '₹30' },
      { ta: 'பூரி', tl: 'poori', price: '₹50', out: true },
      { ta: 'ஃபில்டர் காபி', tl: 'filter kaapi', price: '₹25' }
    ].map((it, i) => Object.assign({}, it, { row: i % 2 ? rowB : rowA, strike: it.out ? 'line-through' : 'none' }));
    return { tiles, sprites, items };
  }
}

const DEFAULT_PROPS = {};

export default function RestaurantBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-restaurant">
      <div style={{ position: "relative", width: "960px", height: "600px", overflow: "hidden", background: "#c99a5b", fontFamily: "'Pixelify Sans', 'Noto Sans Tamil', monospace", color: "#2b1d14" }}>
        <div aria-hidden={"true"} style={{ position: "absolute", inset: "0", display: "grid", gridTemplateColumns: "repeat(40, 24px)", gridAutoRows: "24px" }}>
          {(v?.tiles || []).map((t, $index) => (
            <React.Fragment key={$index}>
              <div style={{ background: t?.bg }}></div>
            </React.Fragment>
          ))}
        </div>
        <div className={"blink"} style={{ position: "absolute", left: "48px", top: "28px", width: "180px", height: "84px", boxSizing: "border-box", padding: "8px", background: "#2b1d14", border: "3px solid #f3e2b8", display: "flex", flexDirection: "column", gap: "6px" }} aria-hidden={"true"}>
          <div style={{ height: "6px", width: "70%", background: "#f3e2b8" }}></div>
          <div style={{ height: "4px", width: "90%", background: "#c99a5b" }}></div>
          <div style={{ height: "4px", width: "80%", background: "#c99a5b" }}></div>
          <div style={{ height: "4px", width: "85%", background: "#c99a5b" }}></div>
          <div style={{ height: "4px", width: "60%", background: "#c99a5b" }}></div>
        </div>
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
        <div className={"bob"} aria-hidden={"true"} style={{ position: "absolute", left: "212px", top: "104px", padding: "0 6px", background: "#f3e2b8", border: "3px solid #2b1d14", color: "#2b1d14", fontWeight: "600", fontSize: "14px", lineHeight: "18px" }}>
          {"?"}
        </div>
        <div style={{ position: "absolute", left: "60px", top: "176px", padding: "5px 9px", background: "#2b1d14", border: "3px solid #f3e2b8", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
          <span style={{ padding: "0 6px", background: "#f3e2b8", color: "#2b1d14", fontWeight: "600", fontSize: "14px" }}>
            {"E"}
          </span>
          <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px", color: "#f3e2b8" }}>
            {"\u0baa\u0b9f\u0bbf"}
          </span>
          <span style={{ fontSize: "13px", color: "#c99a5b" }}>
            {"padi \u00b7 read the menu"}
          </span>
        </div>
        <div style={{ position: "absolute", left: "12px", bottom: "12px", padding: "6px 10px", background: "#2b1d14", border: "3px solid #7a4b2a", display: "flex", gap: "12px", fontSize: "13px", color: "#f3e2b8" }}>
          <span>
            {"1,240 pts"}
          </span>
          <span style={{ color: "#c99a5b" }}>
            {"combo \u00d73"}
          </span>
        </div>
        <div style={{ position: "absolute", left: "520px", top: "28px", width: "424px", height: "544px", boxSizing: "border-box", padding: "16px 18px", background: "#f3e2b8", border: "4px solid #2b1d14", boxShadow: "inset 0 0 0 3px #c99a5b", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
            <div>
              <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "24px", lineHeight: "1.2" }}>
                {"\u0b89\u0ba3\u0bb5\u0bc1\u0baa\u0bcd \u0baa\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bb2\u0bcd"}
              </div>
              <div style={{ fontSize: "13px", color: "#7a4b2a" }}>
                {"unavu pattiyal \u00b7 menu"}
              </div>
            </div>
            <button aria-label={"Close menu"} style={{ width: "44px", height: "44px", background: "#2b1d14", border: "0", color: "#f3e2b8", fontFamily: "'Pixelify Sans', monospace", fontSize: "18px", cursor: "pointer" }}>
              {"\u00d7"}
            </button>
          </div>
          <div style={{ padding: "8px 10px", background: "#2b1d14", color: "#f3e2b8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#c99a5b" }}>
                <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "12px", color: "#f3e2b8" }}>
                  {"\u0b87\u0ba9\u0bcd\u0bb1\u0bc8\u0baf \u0bb8\u0bcd\u0baa\u0bc6\u0bb7\u0bb2\u0bcd"}
                </span>
                {" \u00b7 indraiya special"}
              </div>
              <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "18px" }}>
                {"\u0bae\u0b9a\u0bbe\u0bb2\u0bbe \u0ba4\u0bcb\u0b9a\u0bc8 "}
                <span style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: "400", fontSize: "12px", color: "#c99a5b" }}>
                  {"masala dosai"}
                </span>
              </div>
            </div>
            <span style={{ fontSize: "18px" }}>
              {"\u20b990"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {(v?.items || []).map((it, $index) => (
              <React.Fragment key={$index}>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 56px 44px", alignItems: "center", gap: "6px", padding: "3px 4px", background: it?.row, position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", minWidth: "0" }}>
                    <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "16px", textDecoration: it?.strike }}>
                      {it?.ta}
                    </span>
                    <span style={{ fontSize: "12px", color: "#7a4b2a" }}>
                      {it?.tl}
                    </span>
                  </div>
                  <span style={{ fontSize: "15px", textAlign: "right", textDecoration: it?.strike }}>
                    {it?.price}
                  </span>
                  <button aria-label={`Hear ${it?.tl ?? ""}`} style={{ width: "44px", height: "32px", background: "#7a4b2a", border: "2px solid #2b1d14", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }}>
                    <svg width={"10"} height={"12"} viewBox={"0 0 5 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                      <rect x={"0"} y={"0"} width={"1"} height={"6"} fill={"#f3e2b8"}></rect>
                      <rect x={"1"} y={"1"} width={"2"} height={"4"} fill={"#f3e2b8"}></rect>
                      <rect x={"3"} y={"2"} width={"1"} height={"2"} fill={"#f3e2b8"}></rect>
                    </svg>
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div style={{ position: "relative", height: "0" }}>
            <div style={{ position: "absolute", left: "150px", top: "-186px", padding: "4px 8px", background: "#2b1d14", color: "#f3e2b8", fontSize: "12px", whiteSpace: "nowrap", border: "2px solid #c99a5b" }}>
              {"dosai \u00b7 thin, crispy rice-lentil crepe"}
            </div>
            <div style={{ position: "absolute", left: "186px", top: "-76px", padding: "1px 8px", border: "3px solid #7a4b2a", color: "#7a4b2a", transform: "rotate(-6deg)", background: "#f3e2b8", fontSize: "12px", whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700" }}>
                {"\u0ba4\u0bc0\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc1\u0bb5\u0bbf\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1"}
              </span>
              {" \u00b7 sold out"}
            </div>
          </div>
          <div style={{ marginTop: "auto", padding: "10px", border: "3px dashed #7a4b2a", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontSize: "11px", color: "#7a4b2a" }}>
              {"Waiter asks"}
            </div>
            <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "17px" }}>
              {"\u0b8e\u0ba9\u0bcd\u0ba9 \u0b9a\u0bbe\u0baa\u0bcd\u0baa\u0bbf\u0b9f\u0bc1\u0bb1\u0bc0\u0b99\u0bcd\u0b95?"}
            </div>
            <div style={{ fontSize: "12px", color: "#7a4b2a" }}>
              {"Enna saapdureenga? \u00b7 What will you have?"}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px", gap: "8px" }}>
              <span style={{ fontSize: "13px" }}>
                {"Goal: order today\u2019s special"}
              </span>
              <button style={{ minHeight: "44px", padding: "0 12px", background: "#c99a5b", border: "2px solid #2b1d14", color: "#2b1d14", fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", cursor: "pointer" }}>
                {"Hint \u22125 pts"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
