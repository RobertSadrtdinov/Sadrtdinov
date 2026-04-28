import { useEffect, useRef } from "react";

const stats = [
  { value: "14", label: "Новых пациентов<br />за первый месяц" },
  { value: "90K", label: "₽ выручки<br />в первую неделю" },
  { value: "0₽", label: "Рекламный бюджет<br />для первого кейса" },
  { value: "10", label: "Лет в продажах<br />на трёх рынках" },
] as const;

/** Полоса цифр внизу первого экрана (на фоне) */
export function HeroStatsBar() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const numbers = root.querySelectorAll<HTMLElement>("[data-value]");
    const parseTarget = (value: string) => parseFloat(value.replace(/[^\d]/g, "")) || 0;
    const formatValue = (raw: string, current: number) => {
      const rounded = Math.floor(current);
      if (raw.includes("K")) return `${rounded}K`;
      if (raw.includes("₽")) return `${rounded}₽`;
      return `${rounded}`;
    };

    const animate = (el: HTMLElement) => {
      const raw = el.dataset.value || "0";
      const end = parseTarget(raw);
      const duration = 1200;
      let start: number | null = null;

      const step = (t: number) => {
        if (start == null) start = t;
        const progress = Math.min((t - start) / duration, 1);
        el.textContent = formatValue(raw, end * progress);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = raw;
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    numbers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="border-t border-[rgba(201,169,110,0.3)]"
      style={{ background: "rgba(201,169,110,0.15)" }}
    >
      <div
        className="grid grid-cols-2 gap-px sm:grid-cols-4"
        style={{ background: "rgba(201,169,110,0.25)" }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[rgba(8,8,10,0.75)] p-4 backdrop-blur-sm sm:p-5 md:p-6 lg:p-7 group transition-all duration-300 hover:bg-[rgba(201,169,110,0.08)]"
          >
            <div className="mb-4 h-px w-8 bg-[#1A3C5E]" />
            <span
              data-value={stat.value}
              className="animate-number text-[clamp(1.5rem,3.5vw,2.4rem)] font-semibold text-[#C9A96E] leading-none mb-1.5 block group-hover:scale-110 transition-transform duration-300"
            >
              {stat.value}
            </span>
            <span
              className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.1em] sm:tracking-[0.12em] uppercase text-[#a8a8a8] leading-[1.4]"
              dangerouslySetInnerHTML={{ __html: stat.label }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
