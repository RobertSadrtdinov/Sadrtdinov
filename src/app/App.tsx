import { useEffect, useState, useRef } from 'react';
import { CustomCursor } from './components/custom-cursor';
import { HeroBackgroundLayers } from './components/hero-background-layers';
import { HeroStatsBar } from './components/hero-spline-section';
import { SplineScene } from '@/components/ui/splite';

const HERO_ROBOT_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const STATIC_PAGE = true;

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (STATIC_PAGE) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    const observeElements = () => {
      const reveals = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      reveals.forEach(el => observer.observe(el));
    };

    // Animate numbers on scroll
    const animateNumbers = () => {
      const numbers = document.querySelectorAll('.animate-number');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const endValue = target.getAttribute('data-value') || '0';
            animateValue(target, 0, parseFloat(endValue.replace(/[^\d]/g, '')), 1500, endValue);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      numbers.forEach(el => observer.observe(el));
    };

    const animateValue = (element: HTMLElement, start: number, end: number, duration: number, originalValue: string) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);

        if (originalValue.includes('K')) {
          element.textContent = currentValue + 'K';
        } else if (originalValue.includes('₽')) {
          element.textContent = currentValue + '₽';
        } else {
          element.textContent = currentValue.toString();
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.textContent = originalValue;
        }
      };
      window.requestAnimationFrame(step);
    };

    window.addEventListener('scroll', handleScroll);

    setTimeout(() => {
      observeElements();
      animateNumbers();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (STATIC_PAGE) return;

    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const pattern = heroRef.current.querySelector('.hero-bg-pattern') as HTMLElement | null;
      if (!pattern) return;
      const px = (e.clientX / window.innerWidth - 0.5) * 20;
      const py = (e.clientY / window.innerHeight - 0.5) * 20;
      pattern.style.transform = `translate(${px}px, ${py}px)`;
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileNavOpen]);

  const navLinkClass =
    'text-[0.72rem] tracking-[0.18em] uppercase text-[#888] no-underline transition-all duration-300 hover:text-[#C9A96E] hover:tracking-[0.22em]';
  const closeMobileNav = () => setMobileNavOpen(false);
  const scrollToHash = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: STATIC_PAGE ? 'auto' : 'smooth', block: 'start' });
    } else {
      window.location.hash = hash;
    }
    setMobileNavOpen(false);
  };

  return (
    <div
      id="page-top"
      className={`min-h-screen bg-[#0C0C0E] text-[#F5F2ED] overflow-x-hidden ${STATIC_PAGE ? 'static-page' : ''}`}
      style={{ fontFamily: 'Syne, sans-serif', cursor: STATIC_PAGE ? 'auto' : 'none' }}
    >
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px'
      }}></div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#C9A96E] rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      {!STATIC_PAGE && <CustomCursor />}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-6 sm:px-[40px] lg:px-[60px] py-7 flex justify-between items-center gap-4 border-b transition-all duration-400 ${
          scrolled ? 'bg-[rgba(12,12,14,0.95)] border-[rgba(201,169,110,0.25)] py-[18px] backdrop-blur-[12px]' : 'border-transparent'
        }`}
      >
        <a
          href="#page-top"
          onClick={(e) => {
            e.preventDefault();
            setMobileNavOpen(false);
            window.scrollTo({ top: 0, behavior: STATIC_PAGE ? 'auto' : 'smooth' });
            if (window.location.hash) {
              const base = window.location.pathname + (window.location.search || '');
              window.history.replaceState(null, '', base);
            }
          }}
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
          className="text-[1.05rem] sm:text-[1.1rem] tracking-[0.12em] text-[#C9A96E] no-underline font-light hover:scale-105 transition-transform duration-300 shrink-0"
        >
          Р. Садртдинов
        </a>
        <ul className="hidden lg:flex gap-10 list-none m-0 p-0">
          <li>
            <a href="#process" className={navLinkClass} onClick={closeMobileNav}>
              Подход
            </a>
          </li>
          <li>
            <a href="#cases" className={navLinkClass} onClick={closeMobileNav}>
              Кейсы
            </a>
          </li>
          <li>
            <a href="#about" className={navLinkClass} onClick={closeMobileNav}>
              Об эксперте
            </a>
          </li>
          <li>
            <a href="#audiences" className={navLinkClass} onClick={closeMobileNav}>
              Кому подходит
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <a
            href="#contact"
            onClick={closeMobileNav}
            className="text-[0.6rem] sm:text-[0.72rem] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#0C0C0E] bg-[#C9A96E] px-3 py-[9px] sm:px-6 sm:py-[10px] no-underline transition-all duration-300 hover:bg-[#E8D5B0] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(201,169,110,0.3)] inline-block text-center"
          >
            <span className="sm:hidden">Разбор</span>
            <span className="hidden sm:inline">Записаться на разбор</span>
          </a>
          <button
            type="button"
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#C9A96E] border border-[rgba(201,169,110,0.4)] text-[0.6rem] tracking-[0.12em] uppercase"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            aria-label={mobileNavOpen ? 'Закрыть меню' : 'Открыть разделы сайта'}
            onClick={() => setMobileNavOpen((o) => !o)}
          >
            {mobileNavOpen ? '×' : '▼'}
          </button>
        </div>
      </nav>

      {mobileNavOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-[102] bg-[rgba(12,12,14,0.97)] backdrop-blur-md lg:hidden flex flex-col items-center justify-center gap-0 pt-[6rem] sm:pt-20"
          role="dialog"
          aria-modal="true"
          onClick={closeMobileNav}
        >
          <ul
            className="list-none p-0 m-0 flex flex-col items-center gap-9"
            onClick={(e) => e.stopPropagation()}
          >
            {(
              [
                ['#process', 'Подход'],
                ['#cases', 'Кейсы'],
                ['#about', 'Об эксперте'],
                ['#audiences', 'Кому подходит'],
                ['#guarantee', 'Условия работы'],
                ['#contact', 'Контакты'],
              ] as const
            ).map(([hash, label]) => (
              <li key={hash}>
                <a
                  href={hash}
                  className={`${navLinkClass} text-[0.8rem] tracking-[0.2em] text-[#F5F2ED] hover:text-[#C9A96E]`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(hash);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="absolute top-5 right-5 w-12 h-12 text-[#C9A96E] text-2xl leading-none"
            onClick={closeMobileNav}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>
      ) : null}

      {/* Hero: градиентный фон + Spline-робот справа от оффера */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-[#060607]"
      >
        <HeroBackgroundLayers />

        <div className="relative z-[10] flex min-h-screen flex-col pointer-events-none">
          <div className="pointer-events-none flex min-h-0 flex-1 flex-col justify-end px-6 pt-[7.5rem] pb-10 sm:px-10 sm:pt-36 sm:pb-12 md:px-[50px] lg:px-[60px] lg:pb-14">
            <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-10 lg:flex-row lg:items-end lg:gap-8 xl:gap-12">
              <div className="min-w-0 max-w-full cursor-auto [touch-action:manipulation] pointer-events-auto lg:max-w-[min(100%,520px)] lg:flex-1">
                <div className="text-[0.68rem] tracking-[0.25em] uppercase text-[#C9A96E] mb-6 flex items-center gap-[14px] animate-slide-in-left sm:mb-8 [text-shadow:0_1px_20px_rgba(0,0,0,0.8)]">
                  <span className="block h-px w-8 bg-[#C9A96E] animate-expand-width sm:w-10" />
                  Системный маркетолог · Медицинский бизнес
                </div>

                <h1
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="mb-3 text-[clamp(2.4rem,5.5vw,5rem)] font-light leading-[1.05] text-[#F5F2ED] sm:mb-4 animate-fade-in-up [text-shadow:0_2px_32px_rgba(0,0,0,0.75)]"
                >
                  Стабильный поток
                  <br />
                  пациентов —
                  <br />
                  <em className="mt-0.5 inline-block italic text-[#C9A96E] transition-transform duration-300 hover:scale-105">это система,</em>
                  <br />
                  а не случайность
                </h1>

                <p
                  className="text-[0.9rem] leading-[1.75] text-[#c8c4bc] sm:max-w-[440px] mb-8 sm:mb-10 font-normal tracking-[0.02em] animate-fade-in-up [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]"
                  style={{ animationDelay: '0.2s' }}
                >
                  Выстраиваю маркетинг для стоматологий, клиник и медицинских специалистов от аудита до первых записей. Понимаю
                  медицину изнутри. Медфак + ИИ-инструменты вместо дорогого агентства.
                </p>

                <div className="mb-8 flex flex-wrap items-center gap-4 sm:mb-10 sm:gap-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <a
                    href="#contact"
                    className="group relative inline-block overflow-hidden border-2 border-transparent bg-[#C9A96E] px-7 py-3.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#0C0C0E] no-underline transition-all duration-300 sm:px-9 sm:py-4 sm:text-[0.72rem] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,169,110,0.45)]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-[#E8D5B0] transition-transform duration-300 group-hover:translate-x-0" />
                    <span className="relative z-[1]">Получить бесплатный разбор</span>
                  </a>
                  <a
                    href="#cases"
                    className="inline-block border border-[#C9A96E] px-7 py-3.5 text-[0.68rem] uppercase tracking-[0.2em] text-[#C9A96E] no-underline transition-all duration-300 backdrop-blur-sm sm:px-9 sm:py-4 sm:text-[0.72rem] hover:-translate-y-1 hover:bg-[rgba(201,169,110,0.12)] hover:shadow-[0_10px_30px_rgba(201,169,110,0.2)] [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]"
                  >
                    Смотреть кейсы
                  </a>
                </div>

                <a
                  href="#story"
                  className="mb-0 inline-flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.2em] text-[#9a9a9a] no-underline transition-colors hover:text-[#C9A96E] sm:text-[0.65rem] animate-bounce-subtle [text-shadow:0_0_8px_rgba(0,0,0,0.9)]"
                >
                  <span className="block h-[50px] w-px bg-gradient-to-b from-[#C9A96E] to-transparent animate-scroll-line" />
                  Листать вниз
                </a>
              </div>

              <div
                className="relative min-h-[260px] w-full shrink-0 overflow-hidden lg:min-h-[min(58vh,520px)] lg:flex-1 lg:max-w-[52%] lg:-translate-y-10 xl:-translate-y-14 pointer-events-auto"
                aria-hidden
              >
                <div className="absolute inset-0 outline-none [&_canvas]:h-full [&_canvas]:w-full">
                  <SplineScene
                    scene={HERO_ROBOT_SCENE}
                    className="block h-full min-h-[260px] w-full lg:min-h-[min(58vh,520px)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-auto relative z-20 w-full">
            <HeroStatsBar />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="story" className="py-[140px] px-[60px] border-t border-[rgba(201,169,110,0.25)] relative">
        {/* Decorative lines */}
        <div className="absolute top-20 left-0 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30 animate-pulse-glow"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[100px] max-w-[1300px] mx-auto items-start">
          <div className="reveal opacity-0 translate-y-7 transition-all duration-700">
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-4 flex items-center gap-[14px]">
              <span className="block w-[30px] h-[1px] bg-[#C9A96E] animate-expand-width"></span>
              Знакомая история
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(2.2rem,3.5vw,3.6rem)] font-light leading-[1.1] text-[#F5F2ED] mb-10">
              Маркетолог брал деньги.<br />Пациентов <em className="italic text-[#C9A96E] inline-block hover:scale-105 transition-transform duration-300">не стало.</em>
            </h2>
            <p className="text-[1.05rem] text-[#888] leading-[1.85] mb-6">
              Большинство клиник теряют новых пациентов не из-за плохого продукта — а потому что у них нет системы. Запускают рекламу без стратегии, нанимают маркетологов без понимания медицины и получают «охваты» вместо записей.
            </p>
          </div>

          <div className="reveal opacity-0 translate-y-7 transition-all duration-700">
            <ul className="list-none flex flex-col gap-0 border-t border-[rgba(201,169,110,0.25)]">
              {[
                'Нанимали маркетологов — брали деньги, результата нет. Страх снова потерять бюджет',
                'Нет понимания, какие каналы работают в медицине и как обойти ограничения ФЗ-38',
                'Профиль в картах заброшен, нет отзывов — пациент уходит к конкуренту',
                'Непонятно откуда приходят пациенты и сколько каждый из них стоит клинике',
                'Пробовали разных подрядчиков — каждый делал своё. Единой системы так и нет'
              ].map((pain, i) => (
                <li key={i} className="py-6 border-b border-[rgba(201,169,110,0.25)] grid grid-cols-[36px_1fr] gap-5 items-start hover:bg-[rgba(201,169,110,0.02)] hover:px-4 transition-all duration-300 group">
                  <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[0.9rem] text-[#C9A96E] opacity-60 mt-[2px] group-hover:opacity-100 group-hover:scale-125 transition-all duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.9rem] text-[#888] leading-[1.7] group-hover:text-[#F5F2ED] transition-colors duration-300">{pain}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-[140px] px-[60px] bg-[rgba(255,255,255,0.015)] border-t border-b border-[rgba(201,169,110,0.25)] relative overflow-hidden">
        {/* Animated background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[rgba(201,169,110,0.1)] rounded-full animate-spin-slow"></div>

        <div className="max-w-[1300px] mx-auto relative z-[2]">
          <div className="mb-20 reveal opacity-0 translate-y-7 transition-all duration-700">
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-4 flex items-center gap-[14px]">
              <span className="block w-[30px] h-[1px] bg-[#C9A96E] animate-expand-width"></span>
              Как строится работа
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(2.2rem,3.5vw,3.6rem)] font-light leading-[1.1] text-[#F5F2ED]">
              Пять шагов от хаоса<br />к <em className="italic text-[#C9A96E]">измеримой системе</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[1px]" style={{ background: 'rgba(201,169,110,0.25)' }}>
            {[
              { num: '01', title: 'Аудит и анализ', desc: 'Изучаю целевую аудиторию, конкурентов и текущее состояние маркетинга. Нахожу точки потерь.' },
              { num: '02', title: 'Стратегия', desc: 'Строю маркетинговую карту: какие каналы, в какой последовательности, с каким бюджетом.' },
              { num: '03', title: 'Запуск системы', desc: 'Яндекс.Карты, сайт, соцсети, чат-боты — запускаем с нуля или восстанавливаем. Первые пациенты уже в первый месяц.' },
              { num: '04', title: 'Автоматизация', desc: 'ИИ-инструменты и чат-боты берут на себя запись, прогрев и обработку входящих. Система работает без вас.' },
              { num: '05', title: 'Аналитика и рост', desc: 'Прозрачная отчётность: видно каждое действие и каждый рубль. Итерируем и масштабируем то, что работает.' }
            ].map((step, idx) => (
              <div key={step.num} className="bg-[#0C0C0E] p-11 relative transition-all duration-500 hover:bg-[rgba(201,169,110,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] reveal opacity-0 translate-y-7 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,169,110,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="relative text-[4rem] font-light text-[rgba(201,169,110,0.12)] leading-none mb-6 block group-hover:text-[rgba(201,169,110,0.25)] group-hover:scale-110 transition-all duration-500">
                  {step.num}
                </span>
                <div className="relative text-[0.78rem] tracking-[0.1em] uppercase text-[#C9A96E] mb-[14px] group-hover:tracking-[0.15em] transition-all duration-300">{step.title}</div>
                <p className="relative text-[0.82rem] text-[#888] leading-[1.75] group-hover:text-[#F5F2ED] transition-colors duration-300">{step.desc}</p>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-0 h-[2px] bg-[#C9A96E] group-hover:w-12 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-[2px] h-0 bg-[#C9A96E] group-hover:h-12 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difference */}
      <section id="difference" className="py-[140px] px-[60px]">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-[70px] reveal opacity-0 translate-y-7 transition-all duration-700">
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-4 flex items-center gap-[14px]">
              <span className="block w-[30px] h-[1px] bg-[#C9A96E] animate-expand-width"></span>
              Отличие от рынка
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(2.2rem,3.5vw,3.6rem)] font-light leading-[1.1] text-[#F5F2ED]">
              Не «ещё один маркетолог».<br /><em className="italic text-[#C9A96E]">Системный подход</em> + медфак.
            </h2>
          </div>

          <div className="border border-[rgba(201,169,110,0.25)] w-full reveal opacity-0 translate-y-7 transition-all duration-700 hover:border-[rgba(201,169,110,0.4)] hover:shadow-[0_0_40px_rgba(201,169,110,0.1)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-[rgba(201,169,110,0.25)] gap-[1px]" style={{ background: 'rgba(201,169,110,0.25)' }}>
              <div className="bg-[#0C0C0E] p-7 text-[0.65rem] tracking-[0.2em] uppercase text-[#888]">Критерий</div>
              <div className="bg-[#0C0C0E] p-7 text-[0.65rem] tracking-[0.2em] uppercase text-[#888]">Роберт Садртдинов</div>
              <div className="bg-[#0C0C0E] p-7 text-[0.65rem] tracking-[0.2em] uppercase text-[#888]">Обычный маркетолог / агентство</div>
            </div>

            {[
              { cat: 'Подход к задаче', mine: 'Строит маркетинг как единую систему от анализа до аналитики', theirs: 'Решает точечные задачи — таргет, SMM или сайт отдельно' },
              { cat: 'Знание ниши', mine: 'Медицинское образование + практика. Понимает мышление врача и пациента', theirs: 'Работает по универсальным шаблонам без понимания медицинской специфики' },
              { cat: 'Инструменты', mine: 'ИИ-инструменты (Claude, ChatGPT, Midjourney) — быстрее и дешевле в 3–5 раз', theirs: 'Работает вручную, дольше и дороже без снижения стоимости производства' },
              { cat: 'Результат', mine: 'Измеримый итог: пациенты, выручка, заявки. Договор с KPI', theirs: 'Результат — «охваты выросли» без привязки к коммерческим показателям' },
              { cat: 'Прозрачность', mine: 'Открытый прайс. Честно о сроках и возможностях до подписания', theirs: 'Цены только после звонка. Обещания золотых гор без фиксации результата' }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-3 border-b last:border-b-0 border-[rgba(201,169,110,0.25)] gap-[1px] group hover:bg-[rgba(201,169,110,0.02)] transition-colors duration-300" style={{ background: 'rgba(201,169,110,0.25)' }}>
                <div className="bg-[#0C0C0E] p-7 text-[0.78rem] tracking-[0.08em] font-medium text-[#C9A96E] group-hover:text-[#E8D5B0] transition-colors duration-300">{row.cat}</div>
                <div className="bg-[#0C0C0E] p-7 text-[0.85rem] leading-[1.6] text-[#F5F2ED] relative group-hover:translate-x-1 transition-transform duration-300">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-[#C9A96E] group-hover:w-2 transition-all duration-300"></div>
                  {row.mine}
                </div>
                <div className="bg-[#0C0C0E] p-7 text-[0.85rem] leading-[1.6] text-[#888] opacity-60">{row.theirs}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-[140px] px-[60px] bg-[rgba(255,255,255,0.015)] border-t border-b border-[rgba(201,169,110,0.25)]">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-[70px] reveal opacity-0 translate-y-7 transition-all duration-700">
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-4 flex items-center gap-[14px]">
              <span className="block w-[30px] h-[1px] bg-[#C9A96E] animate-expand-width"></span>
              Доказанный результат
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(2.2rem,3.5vw,3.6rem)] font-light leading-[1.1] text-[#F5F2ED]">
              Реальные цифры.<br /><em className="italic text-[#C9A96E]">Реальные клиники.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px]" style={{ background: 'rgba(201,169,110,0.25)' }}>
            {[
              { tag: 'Кейс 01 · Стоматология «Аристократ»', metric: '14', label: 'Новых пациентов за 1 месяц', desc: 'Результат получен через Яндекс.Карты без рекламного бюджета. Аудит профиля, работа с отзывами, оптимизация описания — системный запуск бесплатного органического канала дал немедленный результат.' },
              { tag: 'Кейс 02 · Медицинский специалист', metric: '90К', label: '₽ выручки в первую неделю', desc: '90 000 рублей выручки для медицинского специалиста в первую неделю после запуска системы продаж. Построена связка: упаковка → автоматическая запись → воронка прогрева.' }
            ].map((caseItem, idx) => (
              <div key={idx} className="bg-[#0C0C0E] p-[60px] relative overflow-hidden transition-all duration-500 hover:bg-[rgba(201,169,110,0.05)] reveal opacity-0 translate-y-7 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E] to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"></div>

                <span className="relative text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E] mb-7 block group-hover:tracking-[0.25em] transition-all duration-300">{caseItem.tag}</span>
                <span
                  data-value={caseItem.metric}
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="animate-number relative text-[clamp(3rem,5vw,5rem)] font-light text-[#F5F2ED] leading-none mb-2 block group-hover:scale-110 group-hover:text-[#C9A96E] transition-all duration-500 origin-left"
                >
                  {caseItem.metric}
                </span>
                <span className="relative text-[0.78rem] text-[#888] tracking-[0.08em] uppercase mb-8 block">{caseItem.label}</span>
                <div className="relative w-10 h-[1px] bg-[rgba(201,169,110,0.25)] my-7 group-hover:w-20 group-hover:bg-[#C9A96E] transition-all duration-500"></div>
                <p className="relative text-[0.88rem] text-[#888] leading-[1.75] group-hover:text-[#F5F2ED] transition-colors duration-300">
                  {caseItem.desc}
                </p>

                {/* Corner decoration */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#C9A96E] to-transparent group-hover:w-32 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-[140px] px-[60px] relative">
        {/* Decorative element */}
        <div className="absolute right-0 top-1/2 w-[300px] h-[300px] border border-[rgba(201,169,110,0.1)] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[100px] items-start relative z-[2]">
          <div className="reveal opacity-0 translate-y-7 transition-all duration-700">
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-4 flex items-center gap-[14px]">
              <span className="block w-[30px] h-[1px] bg-[#C9A96E] animate-expand-width"></span>
              Об эксперте
            </div>
            <blockquote style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(1.4rem,2.2vw,2rem)] italic text-[#F5F2ED] leading-[1.6] border-l-2 border-[#C9A96E] pl-8 mb-10 hover:border-l-4 hover:pl-7 transition-all duration-300">
              «Большинство клиник теряют пациентов не из-за плохого продукта — а из-за отсутствия системы. Я строю эту систему. Шаг за шагом, инструмент за инструментом.»
            </blockquote>
            <p className="text-[0.9rem] text-[#888] leading-[1.85] mb-6 hover:text-[#F5F2ED] transition-colors duration-300">
              Роберт Садртдинов — специалист в области системного маркетинга с десятилетним опытом в продажах на трёх рынках. Разрабатывает комплексные маркетинговые решения для медицинского бизнеса.
            </p>
            <p className="text-[0.9rem] text-[#888] leading-[1.85] mb-6 hover:text-[#F5F2ED] transition-colors duration-300">
              Ключевое отличие — редкое сочетание медицинского образования (стоматологический факультет), которое даёт понимание отрасли изнутри, и глубокой практической экспертизы в digital-маркетинге, продажах и современных ИИ-инструментах.
            </p>
            <div className="flex flex-wrap gap-[10px] mt-8">
              {['Медфак · стомфак', '10 лет в продажах', 'ИИ-инструменты', 'Договор с KPI', 'Открытый прайс'].map((tag) => (
                <span key={tag} className="text-[0.68rem] tracking-[0.15em] uppercase border border-[rgba(201,169,110,0.25)] px-[18px] py-2 text-[#888] hover:border-[#C9A96E] hover:text-[#C9A96E] hover:bg-[rgba(201,169,110,0.05)] transition-all duration-300 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-0 reveal opacity-0 translate-y-7 transition-all duration-700">
            {[
              { title: 'Медицинское образование', desc: 'Стоматологический факультет. Единственный маркетолог с медобразованием в нише. Понимает ФЗ-38, мышление пациента и врача.' },
              { title: '10 лет в продажах', desc: 'Недвижимость, нефтепродукты, B2B. Первая сделка на 19-й день. Объёмы — несколько миллионов рублей в B2B-канале.' },
              { title: 'ИИ-инструменты', desc: 'Claude, ChatGPT, Midjourney, Figma, чат-боты. Снижают стоимость производства контента и аналитики в 3–5 раз.' },
              { title: 'Работал в нишах', desc: 'Стоматология, подология, нутрициология, психология. Понимает специфику каждой специализации.' }
            ].map((cred, i) => (
              <div key={i} className="border-b border-[rgba(201,169,110,0.25)] py-7 grid grid-cols-[80px_1fr] gap-6 items-start first:border-t hover:bg-[rgba(201,169,110,0.02)] hover:px-4 transition-all duration-300 group">
                <div style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[1.8rem] text-[rgba(201,169,110,0.3)] leading-none group-hover:text-[#C9A96E] group-hover:scale-125 transition-all duration-300">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="text-[0.78rem] text-[#F5F2ED] tracking-[0.05em] mb-[6px] group-hover:text-[#C9A96E] transition-colors duration-300">{cred.title}</div>
                  <div className="text-[0.8rem] text-[#888] leading-[1.6] group-hover:text-[#F5F2ED] transition-colors duration-300">{cred.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section id="audiences" className="py-[140px] px-[60px] bg-[rgba(255,255,255,0.015)] border-t border-b border-[rgba(201,169,110,0.25)]">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-[70px] reveal opacity-0 translate-y-7 transition-all duration-700">
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-4 flex items-center gap-[14px]">
              <span className="block w-[30px] h-[1px] bg-[#C9A96E] animate-expand-width"></span>
              Кому подходит
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(2.2rem,3.5vw,3.6rem)] font-light leading-[1.1] text-[#F5F2ED]">
              Работаю с теми, кто<br /><em className="italic text-[#C9A96E]">берёт ответственность</em> за результат
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: 'rgba(201,169,110,0.25)' }}>
            {[
              { num: '01', name: 'Владельцы стоматологий', jtbd: '«Хочу стабильный поток новых пациентов, не зависящий от сарафана»', pain: 'Знаю специфику медрекламы и ФЗ-38. Строю систему с нуля или восстанавливаю существующую.' },
              { num: '02', name: 'Подологи, нутрициологи, узкие специалисты', jtbd: '«Хочу выйти из режима сарафана и выстроить предсказуемый поток»', pain: 'Работаю с узкими нишами, которые другие агентства не видят как аудиторию.' },
              { num: '03', name: 'Врачи, открывающие частную практику', jtbd: '«Хочу выстроить поток клиентов и не зависеть от клиники-работодателя»', pain: 'Специализируюсь на быстром старте с нуля через бесплатные каналы. Первые клиенты за 1–2 месяца.' },
              { num: '04', name: 'Многопрофильные медицинские центры', jtbd: '«Хочу единую маркетинговую систему для всего центра»', pain: 'Системный подход и опыт работы с несколькими нишами одновременно.' },
              { num: '05', name: 'Предприниматели с хаосом в маркетинге', jtbd: '«Хочу прекратить хаос и понять откуда приходят клиенты»', pain: 'Прозрачность процесса, измеримые результаты, системный подход к делегированию.' },
              { num: '06', name: 'Эксперты, коучи, психологи', jtbd: '«Хочу превратить экспертизу в стабильный поток клиентов онлайн»', pain: 'Сам являюсь экспертом, строящим личный бренд — понимаю модель изнутри.' }
            ].map((aud) => (
              <div key={aud.num} className="bg-[#0C0C0E] p-11 transition-all duration-500 hover:bg-[rgba(201,169,110,0.08)] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] reveal opacity-0 translate-y-7 group">
                <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[2.2rem] text-[rgba(201,169,110,0.18)] leading-none mb-5 block group-hover:text-[rgba(201,169,110,0.4)] group-hover:scale-110 transition-all duration-500">
                  {aud.num}
                </span>
                <div className="text-[0.82rem] text-[#F5F2ED] tracking-[0.08em] mb-3 font-medium group-hover:text-[#C9A96E] transition-colors duration-300">{aud.name}</div>
                <div className="text-[0.8rem] text-[#C9A96E] leading-[1.5] mb-4 italic group-hover:scale-105 transition-transform duration-300 origin-left">{aud.jtbd}</div>
                <p className="text-[0.78rem] text-[#888] leading-[1.7] group-hover:text-[#F5F2ED] transition-colors duration-300">{aud.pain}</p>

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-[#C9A96E] scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section id="guarantee" className="py-[120px] px-[60px] border-t border-[rgba(201,169,110,0.25)]">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[100px] items-center">
          <div className="reveal opacity-0 translate-y-7 transition-all duration-700">
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-4 flex items-center gap-[14px]">
              <span className="block w-[30px] h-[1px] bg-[#C9A96E] animate-expand-width"></span>
              Условия работы
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(2.2rem,3.5vw,3.6rem)] font-light leading-[1.1] text-[#F5F2ED] mb-6">
              Договор с KPI.<br /><em className="italic text-[#C9A96E]">Прозрачно</em> до подписания.
            </h2>
            <p className="text-[0.9rem] text-[#888] leading-[1.85] mb-5">
              Роберт не обещает того, чего не может выполнить. Цены видны без звонка — единственный маркетолог в нише с открытым прайсом. Каждый проект закрепляется договором с фиксированными результатами и сроками.
            </p>
          </div>

          <div className="flex flex-col gap-0 reveal opacity-0 translate-y-7 transition-all duration-700">
            {[
              { text: '<strong>Договор с KPI</strong> — фиксируем результат, сроки и стоимость до начала работы. Никаких сюрпризов.' },
              { text: '<strong>Открытый прайс</strong> — цены на сайте видны без звонка. Единственный на рынке.' },
              { text: '<strong>Один эксперт — вся система</strong> — клиент не теряется между исполнителями. Персональный контакт и полная ответственность.' },
              { text: '<strong>Прозрачная отчётность</strong> — видно каждое действие и каждый рубль. Еженедельный отчёт о движении по системе.' },
              { text: '<strong>Понимаю ФЗ-38</strong> — работаю строго в рамках ограничений медицинской рекламы. Нет риска штрафов.' }
            ].map((point, i) => (
              <div key={i} className="py-[22px] border-b border-[rgba(201,169,110,0.25)] flex gap-5 items-start first:border-t hover:bg-[rgba(201,169,110,0.02)] hover:px-4 transition-all duration-300 group">
                <div className="text-[#C9A96E] text-[0.8rem] mt-[2px] group-hover:scale-125 transition-transform duration-300">◆</div>
                <div className="text-[0.85rem] text-[#888] leading-[1.7] group-hover:text-[#F5F2ED] transition-colors duration-300" dangerouslySetInnerHTML={{ __html: point.text.replace('<strong>', '<strong class="text-[#F5F2ED] font-medium">') }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-40 px-[60px] bg-[rgba(201,169,110,0.04)] border-t border-[rgba(201,169,110,0.25)] text-center relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#C9A96E] rounded-full blur-[100px] opacity-[0.05] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#E8D5B0] rounded-full blur-[80px] opacity-[0.05] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

        <div className="relative z-[2]">
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-4 flex items-center gap-[14px] justify-center animate-fade-in">
            <span className="block w-[30px] h-[1px] bg-[#C9A96E]"></span>
            Начать работу
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-[clamp(2.2rem,3.5vw,3.6rem)] font-light leading-[1.1] text-[#F5F2ED] mb-5 animate-fade-in-up">
            Разберёмся, что мешает<br />вашим <em className="italic text-[#C9A96E]">пациентам вас найти</em>
          </h2>
          <p className="text-[0.95rem] text-[#888] max-w-[500px] mx-auto mb-14 leading-[1.8] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Проведу бесплатный 30-минутный разбор. Покажу, какой канал даст первых пациентов быстрее всего именно в вашей ситуации.
          </p>
          <div className="flex gap-5 justify-center items-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a href="https://t.me/Robertunov" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden text-[0.72rem] tracking-[0.2em] uppercase text-[#0C0C0E] bg-[#C9A96E] px-9 py-4 no-underline transition-all duration-300 inline-block group hover:shadow-[0_15px_40px_rgba(201,169,110,0.4)] hover:-translate-y-2 hover:scale-105">
              <span className="absolute inset-0 bg-[#E8D5B0] -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative z-[1]">Написать в Telegram</span>
            </a>
            <a href="mailto:Redstarrob@mail.ru" className="text-[0.72rem] tracking-[0.2em] uppercase text-[#C9A96E] border-2 border-[#C9A96E] px-9 py-4 no-underline transition-all duration-300 inline-block hover:bg-[rgba(201,169,110,0.15)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(201,169,110,0.2)]">
              Написать на почту
            </a>
          </div>
          <div className="mt-[50px] flex justify-center gap-[50px] flex-wrap text-[0.75rem] text-[#888] tracking-[0.1em]">
            <a
              href="https://t.me/Robertunov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] no-underline transition-all duration-300 hover:text-[#C9A96E] hover:scale-110"
            >
              @Robertunov
            </a>
            <a href="mailto:Redstarrob@mail.ru" className="text-[#888] no-underline transition-all duration-300 hover:text-[#C9A96E] hover:scale-110">Redstarrob@mail.ru</a>
            <a href="tel:+79223533819" className="text-[#888] no-underline transition-all duration-300 hover:text-[#C9A96E] hover:scale-110">
              8 922 353 38 19
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[60px] px-[60px] border-t border-[rgba(201,169,110,0.25)] flex flex-col lg:flex-row justify-between items-center gap-6 relative">
        <a
          href="#page-top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: STATIC_PAGE ? 'auto' : 'smooth' });
            if (window.location.hash) {
              const base = window.location.pathname + (window.location.search || '');
              window.history.replaceState(null, '', base);
            }
          }}
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
          className="text-[1rem] text-[#C9A96E] tracking-[0.1em] font-light hover:scale-105 transition-transform duration-300 no-underline"
        >
          Роберт Садртдинов
        </a>
        <div className="flex gap-8">
          <a href="https://t.me/Robertunov" target="_blank" rel="noopener noreferrer" className="text-[0.68rem] tracking-[0.15em] uppercase text-[#888] no-underline transition-all duration-300 hover:text-[#C9A96E] hover:tracking-[0.2em]">Telegram</a>
          <a href="mailto:Redstarrob@mail.ru" className="text-[0.68rem] tracking-[0.15em] uppercase text-[#888] no-underline transition-all duration-300 hover:text-[#C9A96E] hover:tracking-[0.2em]">Email</a>
          <a
            href="tel:+79223533819"
            className="text-[0.68rem] tracking-[0.15em] uppercase text-[#888] no-underline transition-all duration-300 hover:text-[#C9A96E] hover:tracking-[0.2em]"
          >
            Телефон
          </a>
        </div>
        <div className="text-[0.65rem] text-[rgba(136,136,136,0.4)] tracking-[0.08em]">
          © 2025 Роберт Садртдинов · Маркетолог для медицинского бизнеса
        </div>
      </footer>

      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes expand-width {
          from { width: 0; }
          to { width: 30px; }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes scroll-line {
          0% { height: 0; }
          50% { height: 60px; }
          100% { height: 0; }
        }

        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .animate-float { animation: float 20s infinite ease-in-out; }
        .animate-pulse-slow { animation: pulse-slow 4s infinite ease-in-out; }
        .animate-pulse-glow { animation: pulse-glow 3s infinite ease-in-out; }
        .animate-expand-width { animation: expand-width 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; opacity: 0; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; opacity: 0; }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
        .animate-scroll-line { animation: scroll-line 2s infinite ease-in-out; }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .static-page *,
        .static-page *::before,
        .static-page *::after {
          animation: none !important;
          transition: none !important;
        }

        .static-page .reveal,
        .static-page .reveal.visible {
          opacity: 1 !important;
          transform: none !important;
        }

        .static-page .animate-fade-in-up,
        .static-page .animate-fade-in,
        .static-page .animate-slide-in-left {
          opacity: 1 !important;
          transform: none !important;
        }

        .static-page [class*='animate-'] {
          opacity: 1 !important;
          transform: none !important;
        }

        /* Smooth scrolling + offset for fixed header on anchor links */
        html {
          scroll-behavior: ${STATIC_PAGE ? 'auto' : 'smooth'};
          scroll-padding-top: 5.5rem;
        }

        /* Selection */
        ::selection {
          background: rgba(201, 169, 110, 0.3);
          color: #F5F2ED;
        }
      `}</style>
    </div>
  );
}
