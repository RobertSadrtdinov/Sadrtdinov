import { useEffect, useRef } from "react";

/**
 * Курсор изолирован от App: при движении мыши не трогает Spline/hero в ререндерах.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scaleRef = useRef(1);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringRefPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorStyle = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) {
        rafRef.current = null;
        return;
      }

      const { x: tx, y: ty } = targetRef.current;
      ringRefPos.current.x += (tx - ringRefPos.current.x) * 0.35;
      ringRefPos.current.y += (ty - ringRefPos.current.y) * 0.35;

      const s = scaleRef.current;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%) scale(${s})`;
      ring.style.transform = `translate3d(${ringRefPos.current.x}px, ${ringRefPos.current.y}px, 0) translate(-50%, -50%) scale(${s * 0.8})`;

      rafRef.current = requestAnimationFrame(updateCursorStyle);
    };

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(updateCursorStyle);
      }
    };

    document.addEventListener("mousemove", onMove);

    const onEnterInteractive = () => {
      scaleRef.current = 2;
    };
    const onLeaveInteractive = () => {
      scaleRef.current = 1;
    };

    const t = setTimeout(() => {
      document.querySelectorAll("a, button, .interactive").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    }, 200);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.querySelectorAll("a, button, .interactive").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] h-[10px] w-[10px] rounded-full bg-[#9EDBFF]"
        style={{
          left: 0,
          top: 0,
          transform: "translate3d(0, 0, 0) translate(-50%, -50%) scale(1)",
          mixBlendMode: "exclusion",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] h-9 w-9 rounded-full border border-[#9EDBFF] opacity-50"
        style={{
          left: 0,
          top: 0,
          transform: "translate3d(0, 0, 0) translate(-50%, -50%) scale(0.8)",
          willChange: "transform",
        }}
      />
    </>
  );
}

