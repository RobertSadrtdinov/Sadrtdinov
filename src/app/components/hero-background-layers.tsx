import { memo } from "react";
import { Spotlight } from "./ui/spotlight";

/**
 * Лёгкий фон первого экрана без 3D.
 */
function HeroBackgroundLayersImpl() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 z-[1] bg-[#060607]" />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_100%_80%_at_20%_20%,rgba(201,169,110,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#0C0C0E] via-[#0C0C0E]/85 to-[#0C0C0E]/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#0C0C0E]/5 via-transparent to-[#0C0C0E]/88"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-l from-transparent via-[#0C0C0E]/35 to-[#0C0C0E]/80"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen opacity-[0.24]" aria-hidden>
        <Spotlight
          className="-top-32 left-0 !opacity-100 [animation:spotlight_2s_ease_0.75s_1_forwards] md:-top-20 md:left-[20%] lg:left-[50%] lg:-translate-x-1/2"
          fill="#E8D5B0"
        />
      </div>
      <div
        className="hero-bg-pattern pointer-events-none absolute inset-0 z-[2] opacity-40 mix-blend-overlay transition-transform duration-200 ease-out"
        style={{
          background: `repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(201,169,110,0.04) 60px, rgba(201,169,110,0.04) 61px)`,
        }}
      />
      <div className="pointer-events-none absolute top-0 right-0 z-[0] h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-[#C9A96E] opacity-[0.05] blur-[120px] animate-pulse-slow" />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 z-[0] h-[400px] w-[400px] rounded-full bg-[#E8D5B0] opacity-[0.04] blur-[100px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

export const HeroBackgroundLayers = memo(HeroBackgroundLayersImpl);
