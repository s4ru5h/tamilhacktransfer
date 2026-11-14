import { useEffect, useRef, useState, type ReactNode } from "react";

/** Shows a 960×600 board at its exact canvas size, scaled to fit the screen without blurring the pixel art. */
export function Stage({ children, width = 960, height = 600 }: { children: ReactNode; width?: number; height?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const fit = () => setScale(Math.min(el.clientWidth / width, el.clientHeight / height));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);
  return (
    <div
      ref={wrap}
      style={{
        position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
        paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)", boxSizing: "border-box", background: "#120d18",
      }}
    >
      <div style={{ width: width * scale, height: height * scale, position: "relative" }}>
        <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
