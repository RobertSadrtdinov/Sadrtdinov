import { Card } from '@/app/components/ui/card';
import { Spotlight } from '@/app/components/ui/spotlight';
import { SplineScene } from '@/app/components/ui/splite';

const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const stats = [
  { value: '14', label: 'Новых пациентов<br />за первый месяц' },
  { value: '90K', label: '₽ выручки<br />в первую неделю' },
  { value: '0₽', label: 'Рекламный бюджет<br />для первого кейса' },
  { value: '10', label: 'Лет в продажах<br />на трёх рынках' },
] as const;

export function HeroSplineSection() {
  return (
    <Card className="w-full max-w-[640px] mx-auto lg:max-w-none min-h-[420px] sm:min-h-[500px] lg:min-h-[min(85vh,720px)] gap-0 overflow-hidden border-[rgba(201,169,110,0.35)] bg-[rgba(12,12,14,0.85)] text-[#F5F2ED] shadow-none p-0 relative rounded-none lg:rounded-sm">
      <Spotlight
        className="-top-40 left-0 md:left-[30%] md:-top-20"
        fill="#E8D5B0"
      />

      <div className="flex flex-1 flex-col min-h-0 h-full min-h-[280px]">
        <div className="relative flex-1 min-h-[220px] sm:min-h-[300px] w-full z-[2] pointer-events-auto cursor-auto">
          <SplineScene scene={SPLINE_SCENE} className="!w-full !h-full min-h-[220px] sm:min-h-[300px]" />
        </div>

        <div
          className="grid grid-cols-2 gap-px z-[3] border-t border-[rgba(201,169,110,0.3)]"
          style={{ background: 'rgba(201,169,110,0.25)' }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[rgba(12,12,14,0.95)] p-4 sm:p-6 md:p-7 group hover:bg-[rgba(201,169,110,0.05)] transition-all duration-300"
            >
              <span
                data-value={stat.value}
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                className="animate-number text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-[#C9A96E] leading-none mb-1.5 block group-hover:scale-110 transition-transform duration-300"
              >
                {stat.value}
              </span>
              <span
                className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.12em] sm:tracking-[0.15em] uppercase text-[#888] leading-[1.45]"
                dangerouslySetInnerHTML={{ __html: stat.label }}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
