import { useEffect, useRef, useState } from "react";

/**
 * Курсор изолирован от App: при движении мыши не трогает Spline/hero в ререндерах.
 */
export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const ringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (ringTimeoutRef.current) {
        clearTimeout(ringTimeoutRef.current);
      }
      ringTimeoutRef.current = setTimeout(() => {
        setRing({ x: e.clientX, y: e.clientY });
        ringTimeoutRef.current = null;
      }, 80);
    };
    document.addEventListener("mousemove", onMove);

    const t = setTimeout(() => {
      document.querySelectorAll("a, button, .interactive").forEach((el) => {
        el.addEventListener("mouseenter", () => setScale(2));
        el.addEventListener("mouseleave", () => setScale(1));
      });
    }, 200);

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (ringTimeoutRef.current) {
        clearTimeout(ringTimeoutRef.current);
      }
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] h-[10px] w-[10px] rounded-full bg-[#C9A96E] transition-all duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${scale})`,
          mixBlendMode: "exclusion",
        }}
      />
      <div
        className="pointer-events-none fixed z-[9998] h-9 w-9 rounded-full border border-[#C9A96E] opacity-50 transition-all duration-[400ms]"
        style={{
          left: ring.x,
          top: ring.y,
          transform: `translate(-50%, -50%) scale(${scale * 0.8})`,
        }}
      />
    </>
  );
}
