import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Stage } from "@/dc/Stage";
import { BOARDS } from "@/boards";

function BoardList() {
  return (
    <div style={{ minHeight: "100%", background: "#120d18", color: "#fff6e5", fontFamily: "'Pixelify Sans', 'Noto Sans Tamil', monospace", padding: "40px 24px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <h1 style={{ fontSize: 28, margin: "0 0 8px", color: "#ffd166", fontWeight: 600 }}>Tamil RPG · all boards</h1>
        {BOARDS.map((b) => (
          <Link key={b.path} to={b.path} style={{ display: "block", padding: "12px 14px", background: "#1f1a2e", border: "3px solid #0d0a14", boxShadow: "inset 0 0 0 2px #e9c46a", color: "#fff6e5", textDecoration: "none", fontSize: 16 }}>
            {b.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/start" replace />} />
        <Route path="/boards" element={<BoardList />} />
        {BOARDS.map(({ path, Component, selfScale }) => (
          <Route
            key={path}
            path={path}
            element={selfScale ? <div style={{ position: "fixed", inset: 0 }}><Component /></div> : <Stage><Component /></Stage>}
          />
        ))}
        <Route path="*" element={<Navigate to="/start" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
