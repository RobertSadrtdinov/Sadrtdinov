import { memo } from "react";
import { Spotlight } from "./ui/spotlight";

/**
 * Лёгкий фон первого экрана без 3D.
 */
function HeroBackgroundLayersImpl() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 z-[1] bg-[#060607] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-clinic-bg.png')" }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_95%_75%_at_18%_25%,rgba(158,219,255,0.16),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#06090F]/90 via-[#06090F]/68 to-[#06090F]/22"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#06090F]/10 via-transparent to-[#06090F]/88"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-l from-transparent via-[#06090F]/25 to-[#06090F]/72"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen opacity-[0.24]" aria-hidden>
        <Spotlight
          className="-top-32 left-0 !opacity-100 [animation:spotlight_2s_ease_0.75s_1_forwards] md:-top-20 md:left-[20%] lg:left-[50%] lg:-translate-x-1/2"
          fill="#D6ECFF"
        />
      </div>
      <div
        className="hero-bg-pattern pointer-events-none absolute inset-0 z-[2] opacity-40 mix-blend-overlay transition-transform duration-200 ease-out"
        style={{
          background: `repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(46,109,164,0.04) 60px, rgba(46,109,164,0.04) 61px)`,
        }}
      />
      <div className="pointer-events-none absolute top-0 right-0 z-[0] h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-[#9EDBFF] opacity-[0.05] blur-[120px] animate-pulse-slow" />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 z-[0] h-[400px] w-[400px] rounded-full bg-[#D6ECFF] opacity-[0.04] blur-[100px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

export const HeroBackgroundLayers = memo(HeroBackgroundLayersImpl);

