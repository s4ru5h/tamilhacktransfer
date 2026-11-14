// @ts-nocheck
/* Generated from the design canvas board "Report.dc.html". Logic below is copied verbatim from the board. */
import React from "react";
import { Link } from "react-router-dom";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { AUDIO } from "@/dc/audio";
import "./report.css";

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
    const read = (k) => { try { return JSON.parse(window.localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
    const settings = read('tamil-rpg:settings') || {};
    const rooms = ['entrance', 'kitchen', 'living'].map((k) => read('tamil-rpg:stats:' + k)).filter(Boolean);
    let last = null; try { last = window.localStorage.getItem('tamil-rpg:last-room'); } catch (e) { last = null; }
    if (last !== 'kitchen' && last !== 'living') last = 'entrance';
    const heartRec = read('tamil-rpg:paati-hearts');
    const played = rooms.length > 0;
    const hearts = played && heartRec && typeof heartRec.hearts === 'number' ? Math.max(0, Math.min(5, heartRec.hearts)) : null;
    const first = rooms.reduce((a, r) => a + (r.first || 0), 0), total = rooms.reduce((a, r) => a + (r.total || 5), 0);
    const mistakes = [].concat.apply([], rooms.map((r) => r.mistakes || []));
    const seen = {}; const uniq = mistakes.filter((m) => (seen[m.text] ? false : (seen[m.text] = true))).slice(0, 2);
    const note = !played ? 'Come and visit me, kannu, then I’ll tell you how you did.'
      : hearts >= 5 ? 'You spoke so kindly today, kannu. I’m proud of you.'
      : hearts >= 3 ? 'Nalla pesuna, kannu! A little more practice and you’ll be perfect.'
      : 'Don’t worry, kannu. Come back and we’ll practise together.';
    const modeName = settings.mode === 'hard' ? 'HARD MODE' : 'EASY MODE';
    const dialect = (settings.dialectLabel || 'Eelam Tamil').toUpperCase();
    return { rootRef: this._rootRef, stage: STAGE, showRotate: !!(this.state && this.state.portrait),
      kicker: 'SESSION COMPLETE · ' + dialect + ' · ' + modeName,
      title: !played || hearts >= 3 ? 'Nalla Pesuringa!' : 'Paravaillai!',
      titleTa: !played || hearts >= 3 ? 'நல்லா பேசுறீங்க!' : 'பரவாயில்லை!',
      note: note,
      hearts: [0, 1, 2, 3, 4].map((i) => ({ c: hearts !== null && i < hearts ? '#ff4d6d' : '#e6d3ad' })),
      heartsLabel: hearts === null ? 'No hearts yet' : hearts + ' of 5 hearts',
      statA: played ? first + ' of ' + total + ' right first time' : 'Play a room to see your score',
      statB: rooms.length + ' of 3 rooms visited',
      review: uniq.map((m, i) => ({ text: m.text, sep: i < uniq.length - 1 ? ' · ' : '' })), hasReview: uniq.length > 0,
      fromEntrance: last === 'entrance', fromKitchen: last === 'kitchen', fromLiving: last === 'living'
    };
  }
}

const DEFAULT_PROPS = {};

export default function ReportBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-report">
      <div ref={v?.rootRef} style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#e9d6aa", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", flexShrink: "0", width: `${v?.stage?.w ?? ""}px`, height: `${v?.stage?.h ?? ""}px` }}>
          <div style={{ position: "absolute", left: "0", top: "0", transform: `scale(${v?.stage?.s ?? ""})`, transformOrigin: "top left", width: "960px", height: "600px", overflow: "hidden", background: "#fbf3e2", fontFamily: "'Atkinson Hyperlegible', sans-serif", color: "#3a2316" }}>
            <svg aria-hidden={"true"} style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "12px", pointerEvents: "none" }} shapeRendering={"crispEdges"}>
              <defs>
                <pattern id={"rg-top"} width={"24"} height={"12"} patternUnits={"userSpaceOnUse"}>
                  <rect x={"9"} y={"0"} width={"3"} height={"3"} fill={"#c8841a"}></rect>
                  <rect x={"6"} y={"3"} width={"3"} height={"3"} fill={"#c8841a"}></rect>
                  <rect x={"12"} y={"3"} width={"3"} height={"3"} fill={"#c8841a"}></rect>
                  <rect x={"21"} y={"3"} width={"3"} height={"3"} fill={"#d8551f"}></rect>
                  <rect x={"3"} y={"6"} width={"3"} height={"3"} fill={"#c8841a"}></rect>
                  <rect x={"15"} y={"6"} width={"3"} height={"3"} fill={"#c8841a"}></rect>
                  <rect x={"0"} y={"9"} width={"3"} height={"3"} fill={"#c8841a"}></rect>
                  <rect x={"18"} y={"9"} width={"3"} height={"3"} fill={"#c8841a"}></rect>
                </pattern>
              </defs>
              <rect width={"100%"} height={"100%"} fill={"url(#rg-top)"}></rect>
            </svg>
            <svg aria-hidden={"true"} style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "12px", pointerEvents: "none" }} shapeRendering={"crispEdges"}>
              <defs>
                <pattern id={"rg-bottom"} width={"24"} height={"12"} patternUnits={"userSpaceOnUse"}>
                  <rect x={"0"} y={"0"} width={"3"} height={"3"} fill={"#2c7fb0"}></rect>
                  <rect x={"18"} y={"0"} width={"3"} height={"3"} fill={"#2c7fb0"}></rect>
                  <rect x={"3"} y={"3"} width={"3"} height={"3"} fill={"#2c7fb0"}></rect>
                  <rect x={"15"} y={"3"} width={"3"} height={"3"} fill={"#2c7fb0"}></rect>
                  <rect x={"6"} y={"6"} width={"3"} height={"3"} fill={"#2c7fb0"}></rect>
                  <rect x={"12"} y={"6"} width={"3"} height={"3"} fill={"#2c7fb0"}></rect>
                  <rect x={"21"} y={"6"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                  <rect x={"9"} y={"9"} width={"3"} height={"3"} fill={"#2c7fb0"}></rect>
                </pattern>
              </defs>
              <rect width={"100%"} height={"100%"} fill={"url(#rg-bottom)"}></rect>
            </svg>
            <svg aria-hidden={"true"} style={{ position: "absolute", left: "0", top: "0", width: "12px", height: "100%", pointerEvents: "none" }} shapeRendering={"crispEdges"}>
              <defs>
                <pattern id={"rg-left"} width={"12"} height={"24"} patternUnits={"userSpaceOnUse"}>
                  <rect x={"9"} y={"0"} width={"3"} height={"3"} fill={"#d8551f"}></rect>
                  <rect x={"6"} y={"3"} width={"3"} height={"3"} fill={"#d8551f"}></rect>
                  <rect x={"3"} y={"6"} width={"3"} height={"3"} fill={"#d8551f"}></rect>
                  <rect x={"0"} y={"9"} width={"3"} height={"3"} fill={"#d8551f"}></rect>
                  <rect x={"3"} y={"12"} width={"3"} height={"3"} fill={"#d8551f"}></rect>
                  <rect x={"6"} y={"15"} width={"3"} height={"3"} fill={"#d8551f"}></rect>
                  <rect x={"9"} y={"18"} width={"3"} height={"3"} fill={"#d8551f"}></rect>
                  <rect x={"3"} y={"21"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                </pattern>
              </defs>
              <rect width={"100%"} height={"100%"} fill={"url(#rg-left)"}></rect>
            </svg>
            <svg aria-hidden={"true"} style={{ position: "absolute", right: "0", top: "0", width: "12px", height: "100%", pointerEvents: "none" }} shapeRendering={"crispEdges"}>
              <defs>
                <pattern id={"rg-right"} width={"12"} height={"24"} patternUnits={"userSpaceOnUse"}>
                  <rect x={"0"} y={"0"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                  <rect x={"3"} y={"3"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                  <rect x={"6"} y={"6"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                  <rect x={"9"} y={"9"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                  <rect x={"6"} y={"12"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                  <rect x={"3"} y={"15"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                  <rect x={"0"} y={"18"} width={"3"} height={"3"} fill={"#1f6e3d"}></rect>
                  <rect x={"6"} y={"21"} width={"3"} height={"3"} fill={"#2c7fb0"}></rect>
                </pattern>
              </defs>
              <rect width={"100%"} height={"100%"} fill={"url(#rg-right)"}></rect>
            </svg>
            <div aria-hidden={"true"} style={{ position: "absolute", right: "-80px", bottom: "-80px", opacity: "0.3", pointerEvents: "none" }}>
              <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(25, 6px)", gridAutoRows: "6px" }}>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#8a5a2a", boxShadow: "0 0 0 0.5px #8a5a2a" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                <div style={{ background: "#6e1b1b", boxShadow: "0 0 0 0.5px #6e1b1b" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "#d8551f", boxShadow: "0 0 0 0.5px #d8551f" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#f4c444", boxShadow: "0 0 0 0.5px #f4c444" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "#fff4da", boxShadow: "0 0 0 0.5px #fff4da" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
              </div>
            </div>
            <div aria-hidden={"true"} style={{ position: "absolute", left: "40px", bottom: "90px", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "70px", color: "#c8841a", opacity: ".1", transform: "rotate(-8deg)", pointerEvents: "none" }}>
              {"\u0bb5"}
            </div>
            <div aria-hidden={"true"} style={{ position: "absolute", right: "120px", top: "170px", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "50px", color: "#c8841a", opacity: ".1", transform: "rotate(10deg)", pointerEvents: "none" }}>
              {"\u0b95\u0bcd"}
            </div>
            <div style={{ position: "absolute", inset: "12px", padding: "26px 36px 22px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
                <div style={{ position: "relative", flexShrink: "0", padding: "6px", background: "#f3e3c3", border: "3px solid #5b3a22", boxShadow: "inset 0 0 0 2px #e8ad2f" }}>
                  <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(16, 6px)", gridAutoRows: "6px" }}>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#ffffff", boxShadow: "0 0 0 0.5px #ffffff" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#ffffff", boxShadow: "0 0 0 0.5px #ffffff" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#aea79c", boxShadow: "0 0 0 0.5px #aea79c" }}></div>
                    <div style={{ background: "#aea79c", boxShadow: "0 0 0 0.5px #aea79c" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#ffffff", boxShadow: "0 0 0 0.5px #ffffff" }}></div>
                    <div style={{ background: "#6fae5a", boxShadow: "0 0 0 0.5px #6fae5a" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#8a847c", boxShadow: "0 0 0 0.5px #8a847c" }}></div>
                    <div style={{ background: "#8a847c", boxShadow: "0 0 0 0.5px #8a847c" }}></div>
                    <div style={{ background: "#d0103f", boxShadow: "0 0 0 0.5px #d0103f" }}></div>
                    <div style={{ background: "#d0103f", boxShadow: "0 0 0 0.5px #d0103f" }}></div>
                    <div style={{ background: "#8a847c", boxShadow: "0 0 0 0.5px #8a847c" }}></div>
                    <div style={{ background: "#8a847c", boxShadow: "0 0 0 0.5px #8a847c" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#2a1a14", boxShadow: "0 0 0 0.5px #2a1a14" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#2a1a14", boxShadow: "0 0 0 0.5px #2a1a14" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#2a1a14", boxShadow: "0 0 0 0.5px #2a1a14" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#2a1a14", boxShadow: "0 0 0 0.5px #2a1a14" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#2a1a14", boxShadow: "0 0 0 0.5px #2a1a14" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#2a1a14", boxShadow: "0 0 0 0.5px #2a1a14" }}></div>
                    <div style={{ background: "#dcd8d0", boxShadow: "0 0 0 0.5px #dcd8d0" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#e9848c", boxShadow: "0 0 0 0.5px #e9848c" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#e9848c", boxShadow: "0 0 0 0.5px #e9848c" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#f2b705", boxShadow: "0 0 0 0.5px #f2b705" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#7a2a1a", boxShadow: "0 0 0 0.5px #7a2a1a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#7a2a1a", boxShadow: "0 0 0 0.5px #7a2a1a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#f2b705", boxShadow: "0 0 0 0.5px #f2b705" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#f2b705", boxShadow: "0 0 0 0.5px #f2b705" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#7a2a1a", boxShadow: "0 0 0 0.5px #7a2a1a" }}></div>
                    <div style={{ background: "#e86a6a", boxShadow: "0 0 0 0.5px #e86a6a" }}></div>
                    <div style={{ background: "#e86a6a", boxShadow: "0 0 0 0.5px #e86a6a" }}></div>
                    <div style={{ background: "#7a2a1a", boxShadow: "0 0 0 0.5px #7a2a1a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#f2b705", boxShadow: "0 0 0 0.5px #f2b705" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#7a2a1a", boxShadow: "0 0 0 0.5px #7a2a1a" }}></div>
                    <div style={{ background: "#7a2a1a", boxShadow: "0 0 0 0.5px #7a2a1a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#b87a4b", boxShadow: "0 0 0 0.5px #b87a4b" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#f2b705", boxShadow: "0 0 0 0.5px #f2b705" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#97603a", boxShadow: "0 0 0 0.5px #97603a" }}></div>
                    <div style={{ background: "#f2b705", boxShadow: "0 0 0 0.5px #f2b705" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#2e7d32", boxShadow: "0 0 0 0.5px #2e7d32" }}></div>
                    <div style={{ background: "#f2b705", boxShadow: "0 0 0 0.5px #f2b705" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#f2b705", boxShadow: "0 0 0 0.5px #f2b705" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#c2185b", boxShadow: "0 0 0 0.5px #c2185b" }}></div>
                    <div style={{ background: "#3a2216", boxShadow: "0 0 0 0.5px #3a2216" }}></div>
                  </div>
                </div>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "13px", letterSpacing: "2px", color: "#c8841a" }}>
                      {v?.kicker}
                    </div>
                    <div style={{ fontFamily: "'Pixelify Sans', monospace", fontWeight: "700", fontSize: "40px", lineHeight: "1.05", color: "#6e1b1b", marginTop: "6px" }}>
                      {v?.title}
                    </div>
                    <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "21px", color: "#d8551f", marginTop: "4px" }}>
                      {v?.titleTa}
                    </div>
                  </div>
                  <div style={{ marginTop: "8px", display: "inline-block", position: "relative", padding: "8px 12px", background: "#fffaf0", border: "2px solid #5b3a22", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "15px", color: "#5a4536" }}>
                    <span aria-hidden={"true"} style={{ position: "absolute", left: "-12px", top: "12px", width: "0", height: "0", borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "10px solid #5b3a22" }}></span>
                    {"\u201c"}{v?.note}{"\u201d"}
                  </div>
                </div>
                <div style={{ flexShrink: "0", display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                  <div role={"img"} aria-label={v?.heartsLabel} style={{ display: "flex", gap: "4px" }}>
                    {(v?.hearts || []).map((h, $index) => (
                      <React.Fragment key={$index}>
                        <svg aria-hidden={"true"} width={"22"} height={"19"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"}>
                          <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={h?.c}></rect>
                          <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={h?.c}></rect>
                          <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={h?.c}></rect>
                          <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={h?.c}></rect>
                          <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={h?.c}></rect>
                          <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={h?.c}></rect>
                        </svg>
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "13px", color: "#8a6a4a", textAlign: "right" }}>
                    {v?.statA}
                    <br />
                    {v?.statB}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", letterSpacing: "1.5px", color: "#6e1b1b" }}>
                {"YOUR PAATI REPORT CARD"}
                <span aria-hidden={"true"} style={{ flex: "1", height: "2px", background: "#d8a86a" }}></span>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: "1", padding: "12px 14px", background: "#fffaf0", border: "2px solid #1f6e3d", boxShadow: "3px 3px 0 #ead7b0" }}>
                  <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "16px", color: "#1f6e3d", marginBottom: "8px" }}>
                    {"Say this"}
                  </div>
                  <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.4", color: "#4a3524" }}>
                      <div aria-hidden={"true"} style={{ flexShrink: "0", width: "22px", height: "22px", boxSizing: "border-box", background: "#e3f3e6", border: "2px solid #1f6e3d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(7, 2px)", gridAutoRows: "2px" }}>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                        </div>
                      </div>
                      <span>
                        <b>
                          {"Vanakkam"}
                        </b>
                        {" to greet elders"}
                      </span>
                    </li>
                    <li style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.4", color: "#4a3524" }}>
                      <div aria-hidden={"true"} style={{ flexShrink: "0", width: "22px", height: "22px", boxSizing: "border-box", background: "#e3f3e6", border: "2px solid #1f6e3d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(7, 2px)", gridAutoRows: "2px" }}>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                        </div>
                      </div>
                      <span>
                        <b>
                          {"neenga, ungala, unga"}
                        </b>
                        {" for Paati and Thatha"}
                      </span>
                    </li>
                    <li style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.4", color: "#4a3524" }}>
                      <div aria-hidden={"true"} style={{ flexShrink: "0", width: "22px", height: "22px", boxSizing: "border-box", background: "#e3f3e6", border: "2px solid #1f6e3d", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(7, 2px)", gridAutoRows: "2px" }}>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "#1f6e3d", boxShadow: "0 0 0 0.5px #1f6e3d" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                        </div>
                      </div>
                      <span>
                        <b>
                          {"sollunga, paarunga, kondu vaanga"}
                        </b>
                        {" to ask politely"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div style={{ flex: "1", padding: "12px 14px", background: "#fffaf0", border: "2px solid #a33232", boxShadow: "3px 3px 0 #ead7b0" }}>
                  <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "16px", color: "#a33232", marginBottom: "8px" }}>
                    {"Avoid this"}
                  </div>
                  <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.4", color: "#4a3524" }}>
                      <div aria-hidden={"true"} style={{ flexShrink: "0", width: "22px", height: "22px", boxSizing: "border-box", background: "#fbe4e4", border: "2px solid #a33232", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(7, 2px)", gridAutoRows: "2px" }}>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                        </div>
                      </div>
                      <span>
                        <b>
                          {"nee"}
                        </b>
                        {" and "}
                        <b>
                          {"da"}
                        </b>
                        {" with elders"}
                      </span>
                    </li>
                    <li style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.4", color: "#4a3524" }}>
                      <div aria-hidden={"true"} style={{ flexShrink: "0", width: "22px", height: "22px", boxSizing: "border-box", background: "#fbe4e4", border: "2px solid #a33232", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(7, 2px)", gridAutoRows: "2px" }}>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#a33232", boxShadow: "0 0 0 0.5px #a33232" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                        </div>
                      </div>
                      <span>
                        {"bare commands: "}
                        <b>
                          {"sollu, paaru, kudi"}
                        </b>
                      </span>
                    </li>
                  </ul>
                </div>
                <div style={{ flex: "1", padding: "12px 14px", background: "#fffaf0", border: "2px solid #c8841a", boxShadow: "3px 3px 0 #ead7b0" }}>
                  <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "16px", color: "#c8841a", marginBottom: "8px" }}>
                    {"Remember"}
                  </div>
                  <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.4", color: "#4a3524" }}>
                      <div aria-hidden={"true"} style={{ flexShrink: "0", width: "22px", height: "22px", boxSizing: "border-box", background: "#fdf0d4", border: "2px solid #c8841a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(7, 2px)", gridAutoRows: "2px" }}>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                        </div>
                      </div>
                      <span>
                        <b>
                          {"\u2011nga"}
                        </b>
                        {" softens a verb"}
                      </span>
                    </li>
                    <li style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.4", color: "#4a3524" }}>
                      <div aria-hidden={"true"} style={{ flexShrink: "0", width: "22px", height: "22px", boxSizing: "border-box", background: "#fdf0d4", border: "2px solid #c8841a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(7, 2px)", gridAutoRows: "2px" }}>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                        </div>
                      </div>
                      <span>
                        {"tone matters as much as grammar"}
                      </span>
                    </li>
                    <li style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", lineHeight: "1.4", color: "#4a3524" }}>
                      <div aria-hidden={"true"} style={{ flexShrink: "0", width: "22px", height: "22px", boxSizing: "border-box", background: "#fdf0d4", border: "2px solid #c8841a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div aria-hidden={"true"} style={{ display: "grid", gridTemplateColumns: "repeat(7, 2px)", gridAutoRows: "2px" }}>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "#c8841a", boxShadow: "0 0 0 0.5px #c8841a" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                          <div style={{ background: "transparent", boxShadow: "0 0 0 0.5px transparent" }}></div>
                        </div>
                      </div>
                      <span>
                        <b>
                          {"nandri"}
                        </b>
                        {" goes a long way"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {v?.hasReview ? (
                <>
                  <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "14px", color: "#5a4536", textAlign: "center" }}>
                    <b style={{ color: "#6e1b1b" }}>
                      {"To practise:"}
                    </b>
                    {" "}
                    {(v?.review || []).map((r, $index) => (
                      <React.Fragment key={$index}>
                        <span style={{ color: "#a33232" }}>
                          {"\u201c"}{r?.text}{"\u201d"}
                        </span>
                        <span>
                          {r?.sep}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "auto" }}>
                {v?.fromEntrance ? (
                  <>
                    <Link className={"go"} to="/entrance" style={{ boxSizing: "border-box", minHeight: "54px", padding: "0 22px", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "18px", whiteSpace: "nowrap", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", background: "#fffaf0", border: "4px solid #5b3a22", boxShadow: "0 5px 0 #c99a6b", color: "#6e1b1b" }}>
                      <svg aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 7 7"} shapeRendering={"crispEdges"}>
                        <rect x={"1"} y={"1"} width={"4"} height={"1"} fill={"#6e1b1b"}></rect>
                        <rect x={"0"} y={"2"} width={"1"} height={"3"} fill={"#6e1b1b"}></rect>
                        <rect x={"1"} y={"5"} width={"4"} height={"1"} fill={"#6e1b1b"}></rect>
                        <rect x={"5"} y={"0"} width={"1"} height={"3"} fill={"#6e1b1b"}></rect>
                        <rect x={"4"} y={"2"} width={"1"} height={"1"} fill={"#6e1b1b"}></rect>
                      </svg>
                      {"Try the entrance again"}
                    </Link>
                  </>
                ) : null}
                {v?.fromKitchen ? (
                  <>
                    <Link className={"go"} to="/kitchen" style={{ boxSizing: "border-box", minHeight: "54px", padding: "0 22px", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "18px", whiteSpace: "nowrap", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", background: "#fffaf0", border: "4px solid #5b3a22", boxShadow: "0 5px 0 #c99a6b", color: "#6e1b1b" }}>
                      <svg aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 7 7"} shapeRendering={"crispEdges"}>
                        <rect x={"1"} y={"1"} width={"4"} height={"1"} fill={"#6e1b1b"}></rect>
                        <rect x={"0"} y={"2"} width={"1"} height={"3"} fill={"#6e1b1b"}></rect>
                        <rect x={"1"} y={"5"} width={"4"} height={"1"} fill={"#6e1b1b"}></rect>
                        <rect x={"5"} y={"0"} width={"1"} height={"3"} fill={"#6e1b1b"}></rect>
                        <rect x={"4"} y={"2"} width={"1"} height={"1"} fill={"#6e1b1b"}></rect>
                      </svg>
                      {"Try the kitchen again"}
                    </Link>
                  </>
                ) : null}
                {v?.fromLiving ? (
                  <>
                    <Link className={"go"} to="/living-room" style={{ boxSizing: "border-box", minHeight: "54px", padding: "0 22px", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "18px", whiteSpace: "nowrap", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", background: "#fffaf0", border: "4px solid #5b3a22", boxShadow: "0 5px 0 #c99a6b", color: "#6e1b1b" }}>
                      <svg aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 7 7"} shapeRendering={"crispEdges"}>
                        <rect x={"1"} y={"1"} width={"4"} height={"1"} fill={"#6e1b1b"}></rect>
                        <rect x={"0"} y={"2"} width={"1"} height={"3"} fill={"#6e1b1b"}></rect>
                        <rect x={"1"} y={"5"} width={"4"} height={"1"} fill={"#6e1b1b"}></rect>
                        <rect x={"5"} y={"0"} width={"1"} height={"3"} fill={"#6e1b1b"}></rect>
                        <rect x={"4"} y={"2"} width={"1"} height={"1"} fill={"#6e1b1b"}></rect>
                      </svg>
                      {"Try the living room again"}
                    </Link>
                  </>
                ) : null}
                {v?.fromEntrance ? (
                  <>
                    <Link className={"go"} to="/kitchen" style={{ boxSizing: "border-box", minHeight: "54px", padding: "0 22px", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "18px", whiteSpace: "nowrap", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", background: "#f4c444", border: "4px solid #7a4a00", boxShadow: "0 5px 0 #7a4a00", color: "#3a2316" }}>
                      {"Continue "}
                      <span aria-hidden={"true"}>
                        {"\u2192"}
                      </span>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px" }}>
                        {"\u0baa\u0baf\u0ba3\u0ba4\u0bcd\u0ba4\u0bc8\u0ba4\u0bcd \u0ba4\u0bca\u0b9f\u0bb0\u0bc1"}
                      </span>
                      <svg aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                        <rect x={"2"} y={"0"} width={"1"} height={"5"} fill={"#3a2316"}></rect>
                        <rect x={"0"} y={"2"} width={"5"} height={"1"} fill={"#3a2316"}></rect>
                      </svg>
                    </Link>
                  </>
                ) : null}
                {v?.fromKitchen ? (
                  <>
                    <Link className={"go"} to="/living-room" style={{ boxSizing: "border-box", minHeight: "54px", padding: "0 22px", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "18px", whiteSpace: "nowrap", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", background: "#f4c444", border: "4px solid #7a4a00", boxShadow: "0 5px 0 #7a4a00", color: "#3a2316" }}>
                      {"Continue "}
                      <span aria-hidden={"true"}>
                        {"\u2192"}
                      </span>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px" }}>
                        {"\u0baa\u0baf\u0ba3\u0ba4\u0bcd\u0ba4\u0bc8\u0ba4\u0bcd \u0ba4\u0bca\u0b9f\u0bb0\u0bc1"}
                      </span>
                      <svg aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                        <rect x={"2"} y={"0"} width={"1"} height={"5"} fill={"#3a2316"}></rect>
                        <rect x={"0"} y={"2"} width={"5"} height={"1"} fill={"#3a2316"}></rect>
                      </svg>
                    </Link>
                  </>
                ) : null}
                {v?.fromLiving ? (
                  <>
                    <Link className={"go"} to="/start" style={{ boxSizing: "border-box", minHeight: "54px", padding: "0 22px", fontFamily: "'Pixelify Sans', monospace", fontWeight: "600", fontSize: "18px", whiteSpace: "nowrap", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", background: "#f4c444", border: "4px solid #7a4a00", boxShadow: "0 5px 0 #7a4a00", color: "#3a2316" }}>
                      {"New journey "}
                      <span aria-hidden={"true"}>
                        {"\u2192"}
                      </span>
                      <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "14px" }}>
                        {"\u0baa\u0baf\u0ba3\u0ba4\u0bcd\u0ba4\u0bc8\u0ba4\u0bcd \u0ba4\u0bca\u0b9f\u0bb0\u0bc1"}
                      </span>
                      <svg aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 5 5"} shapeRendering={"crispEdges"}>
                        <rect x={"2"} y={"0"} width={"1"} height={"5"} fill={"#3a2316"}></rect>
                        <rect x={"0"} y={"2"} width={"5"} height={"1"} fill={"#3a2316"}></rect>
                      </svg>
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
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
