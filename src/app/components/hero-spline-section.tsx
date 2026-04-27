const stats = [
  { value: '14', label: 'Новых пациентов<br />за первый месяц' },
  { value: '90K', label: '₽ выручки<br />в первую неделю' },
  { value: '0₽', label: 'Рекламный бюджет<br />для первого кейса' },
  { value: '10', label: 'Лет в продажах<br />на трёх рынках' },
] as const;

/** Полоса цифр внизу первого экрана (на фоне) */
export function HeroStatsBar() {
  return (
    <div
      className="border-t border-[rgba(201,169,110,0.3)]"
      style={{ background: 'rgba(201,169,110,0.15)' }}
    >
      <div
        className="grid grid-cols-2 gap-px sm:grid-cols-4"
        style={{ background: 'rgba(201,169,110,0.25)' }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[rgba(8,8,10,0.75)] p-4 backdrop-blur-sm sm:p-5 md:p-6 lg:p-7 group transition-all duration-300 hover:bg-[rgba(201,169,110,0.08)]"
          >
            <span
              data-value={stat.value}
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
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
