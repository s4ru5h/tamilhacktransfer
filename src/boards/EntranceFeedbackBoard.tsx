// @ts-nocheck
/* End screen · Paati's feedback sheet — shown after the entrance scene is completed.
   Three columns: what went well · smaller cultural mistakes · English words that
   should be spoken in Tamil. Music: the background loop stops and the dedicated
   end-card track plays while this page is open. */
import React from "react";
import { Link } from "react-router-dom";
import { DCLogic, useDCLogic } from "@/dc/runtime";
import { SFX } from "@/dc/sfx";
import { loadFeedback, buildColumns, clearFeedback } from "@/dc/feedback";
import { Speech } from "@/dc/speechClient";
import "./entrance-feedback.css";

class Component extends DCLogic {
  componentDidMount() {
    /* the entrance is over: bg music is already stopped, end-card music plays.
       Looping — and the engine skips the play entirely if it's already playing,
       so it never restarts when arriving from the entrance's end card. */
    SFX.stopBgm();
    SFX.play("end-screen", { loop: true });
    Speech.check();
    this._sheet = loadFeedback();
    this._cols = buildColumns(this._sheet);
    /* the first render already painted (empty) — loadFeedback happens here in
       the mount effect, so force one re-render to show the data */
    this.forceUpdate();
    if (this._measure) this._measure();
  }
  componentWillUnmount() {
    /* leaving the end screen → the background music returns for the next room */
    SFX.resumeBgm();
  }
  renderVals() {
    if (!this._rootRef) {
      this._measure = () => {
        const el = this._el;
        if (!el) return;
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        const sc = Math.min(w / 960, h / 600);
        const st = this.state || {};
        if (Math.abs((st.scale || 0) - sc) > 0.002) this.setState({ scale: sc });
      };
      this._rootRef = (el) => {
        try { if (this._ro) { this._ro.disconnect(); this._ro = null; } } catch (e) { /* ignore */ }
        this._el = el;
        if (!el) return;
        if (typeof ResizeObserver !== 'undefined') { this._ro = new ResizeObserver(() => this._measure()); this._ro.observe(el); }
        setTimeout(() => this._measure(), 0);
      };
    }
    const sc = (this.state && this.state.scale) || 1;
    /* self-healing: if the mount effect hasn't loaded the sheet yet, do it now */
    if (this._sheet === undefined) {
      this._sheet = loadFeedback();
      this._cols = buildColumns(this._sheet);
    }
    const sheet = this._sheet;
    const cols = this._cols || { well: [], cultural: [], english: [] };
    const hearts = sheet ? sheet.hearts : 3;
    const firstTry = sheet ? sheet.firstTryCount : 0;
    const total = sheet ? sheet.total : 5;
    const heartRow = [0, 1, 2].map((i) => ({ c: i < Math.min(3, Math.max(0, hearts)) ? "#ff4d6d" : "#e6d3ad" }));
    const playWord = (word) => () => {
      try {
        Speech.wordClip(word).then((el) => { if (el) el.play().catch(() => {}); });
      } catch (e) { /* ignore */ }
    };
    return {
      sheet: sheet,
      hasSheet: !!sheet,
      hearts: heartRow,
      heartsLabel: hearts + " of 5 hearts carried out of the entrance",
      stats: "First-try answers: " + firstTry + " of " + total,
      well: cols.well, cultural: cols.cultural, english: cols.english,
      playWord: playWord,
      replay: () => { try { clearFeedback(); } catch (e) { /* ignore */ } window.location.assign("/entrance"); },
    };
  }
}

const DEFAULT_PROPS = {};

export default function EntranceFeedbackBoard() {
  const v = useDCLogic(Component, DEFAULT_PROPS);
  return (
    <div className="dc-root dc-feedback">
      <div ref={v?.rootRef} style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#1c1016", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: `${Math.round(960 * (v?.scale || 1))}px`, height: `${Math.round(600 * (v?.scale || 1))}px`, flexShrink: "0" }}>
          <div style={{ position: "absolute", left: "0", top: "0", width: "960px", height: "600px", transform: `scale(${v?.scale || 1})`, transformOrigin: "top left", background: "#2a170c", overflow: "hidden" }}>
            <div aria-hidden={"true"} style={{ position: "absolute", inset: "0", background: "radial-gradient(circle at 50% 30%, rgba(242,183,5,0.14), transparent 60%)" }}></div>
            <div aria-hidden={"true"} style={{ position: "absolute", left: "0", right: "0", top: "0", height: "10px", background: "repeating-linear-gradient(90deg,#c8553d 0 16px,#f2b705 16px 24px,#2e7d32 24px 36px)" }}></div>

            {/* header */}
            <div style={{ position: "absolute", left: "40px", right: "40px", top: "34px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "30px", color: "#fff8ec", textShadow: "2px 2px 0 #6e1b1b" }}>
                  {"\u0ba8\u0ba9\u0bcd\u0bb1\u0bbf \u0bb5\u0ba8\u0bcd\u0ba4\u0bbe\u0baf\u0bcd \u0b95\u0ba3\u0bcd\u0ba3\u0bbe"}
                </div>
                <div style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "15px", letterSpacing: "1px", color: "#f2b705", marginTop: "2px" }}>
                  {"NANDRI VANDHAY KANNA · Paati's feedback sheet"}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
                  {(v?.hearts || []).map((h, i) => (
                    <svg key={i} width={"24"} height={"20"} viewBox={"0 0 7 6"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                      <rect x={"1"} y={"0"} width={"2"} height={"1"} fill={h?.c}></rect>
                      <rect x={"4"} y={"0"} width={"2"} height={"1"} fill={h?.c}></rect>
                      <rect x={"0"} y={"1"} width={"7"} height={"2"} fill={h?.c}></rect>
                      <rect x={"1"} y={"3"} width={"5"} height={"1"} fill={h?.c}></rect>
                      <rect x={"2"} y={"4"} width={"3"} height={"1"} fill={h?.c}></rect>
                      <rect x={"3"} y={"5"} width={"1"} height={"1"} fill={h?.c}></rect>
                    </svg>
                  ))}
                </div>
                <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "12px", color: "#e6d3ad", marginTop: "4px" }}>
                  {v?.stats}
                </div>
              </div>
            </div>

            {/* three columns */}
            <div style={{ position: "absolute", left: "40px", right: "40px", top: "128px", bottom: "92px", display: "flex", gap: "18px" }}>
              {/* 1 · what went well */}
              <div style={{ flex: "1", minWidth: "0", background: "#fbf3e2", border: "3px solid #3b6d11", boxShadow: "inset 0 0 0 2px #9fd06a, 5px 5px 0 rgba(0,0,0,0.35)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "10px 14px", background: "#3b6d11", color: "#ffffff", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{"\u0ba8\u0ba9\u0bcd\u0bb1\u0bbe \u0ba8\u0b9f\u0ba8\u0bcd\u0ba4\u0ba4\u0bc1"}</span>
                  <span style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", letterSpacing: "1px" }}>WHAT WENT WELL</span>
                </div>
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" }}>
                  {(v?.well || []).map((w, i) => (
                    <div key={i} style={{ background: "#eef6e3", border: "2px solid #9fd06a", padding: "8px 10px" }}>
                      <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: "700", fontSize: "14px", color: "#1f3d0c" }}>{w?.title}</div>
                      <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "13px", color: "#4a3524", lineHeight: 1.45, marginTop: "2px" }}>{w?.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 2 · smaller cultural mistakes */}
              <div style={{ flex: "1", minWidth: "0", background: "#fbf3e2", border: "3px solid #a3542d", boxShadow: "inset 0 0 0 2px #e8ad2f, 5px 5px 0 rgba(0,0,0,0.35)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "10px 14px", background: "#a3542d", color: "#ffffff", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{"\u0b9a\u0bbf\u0bb1\u0bbf\u0ba4\u0bc1 \u0b95\u0bb5\u0ba9\u0b99\u0bcd\u0b95\u0bb3\u0bcd"}</span>
                  <span style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", letterSpacing: "1px" }}>CULTURAL NOTES</span>
                </div>
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" }}>
                  {(v?.cultural || []).map((w, i) => (
                    <div key={i} style={{ background: "#fdf0e4", border: "2px solid #e8ad2f", padding: "8px 10px" }}>
                      <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: "700", fontSize: "14px", color: "#6e1b1b" }}>{w?.title}</div>
                      <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "13px", color: "#4a3524", lineHeight: 1.45, marginTop: "2px" }}>{w?.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 3 · English words that should be Tamil */}
              <div style={{ flex: "1", minWidth: "0", background: "#fbf3e2", border: "3px solid #6e1b1b", boxShadow: "inset 0 0 0 2px #d8551f, 5px 5px 0 rgba(0,0,0,0.35)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "10px 14px", background: "#6e1b1b", color: "#ffffff", fontFamily: "'Noto Sans Tamil', sans-serif", fontWeight: "700", fontSize: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{"\u0b86\u0b99\u0bcd\u0b95\u0bbf\u0bb2\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0b9a\u0bca\u0ba9\u0bcd\u0ba9\u0ba4\u0bc1"}</span>
                  <span style={{ fontFamily: "'Pixelify Sans', monospace", fontSize: "12px", letterSpacing: "1px" }}>ENGLISH → TAMIL</span>
                </div>
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
                  {(v?.english || []).map((w, i) => (
                    <div key={i} style={{ background: "#fbe9e6", border: "2px solid #d8551f", padding: "8px 10px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ minWidth: "0", flex: "1" }}>
                        <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontWeight: "700", fontSize: "14px", color: "#6e1b1b" }}>
                          {"\u201c"}{w?.word}{"\u201d"}
                        </div>
                        <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: "13px", color: "#a33232", lineHeight: 1.4 }}>
                          {w?.tamil ? w?.tamil : "\u0ba4\u0bae\u0bbf\u0bb4\u0bbf\u0bb2\u0bcd \u0b9a\u0bca\u0bb2\u0bcd\u0bb2\u0bc1 (say it in Tamil)"}
                        </div>
                        <div style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif", fontSize: "11px", color: "#8a6a4a" }}>{w?.note}</div>
                      </div>
                      {w?.word && w?.word !== "—" ? (
                        <button onClick={v?.playWord && v?.playWord(w?.word)} title={"Hear a native Tamil clip"} style={{ flexShrink: "0", width: "34px", height: "34px", background: "#f4c444", border: "2px solid #7a4a00", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                          <svg width={"14"} height={"14"} viewBox={"0 0 7 7"} shapeRendering={"crispEdges"} aria-hidden={"true"}>
                            <rect x={"0"} y={"2"} width={"2"} height={"3"} fill={"#3a2316"}></rect>
                            <rect x={"2"} y={"1"} width={"2"} height={"5"} fill={"#3a2316"}></rect>
                            <rect x={"4"} y={"0"} width={"2"} height={"7"} fill={"#3a2316"}></rect>
                          </svg>
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* footer actions */}
            <div style={{ position: "absolute", left: "40px", right: "40px", bottom: "26px", display: "flex", gap: "12px", justifyContent: "center" }}>
              <button onClick={v?.replay} style={{ minHeight: "46px", padding: "0 18px", background: "#f3e3c3", border: "3px solid #e8ad2f", color: "#3a2316", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", cursor: "pointer" }}>
                {"\u21ba Play the entrance again"}
              </button>
              <Link to="/kitchen" style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "46px", boxSizing: "border-box", padding: "0 18px", background: "#f4c444", border: "3px solid #7a4a00", color: "#3a2316", fontWeight: "600", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", textDecoration: "none" }}>
                {"Continue to the kitchen \u2192"}
              </Link>
              <Link to="/report-card" style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "46px", boxSizing: "border-box", padding: "0 18px", background: "#fffaf0", border: "3px solid #5b3a22", color: "#3a2316", fontWeight: "600", fontFamily: "'Pixelify Sans', monospace", fontSize: "14px", textDecoration: "none" }}>
                {"Paati's report card"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
