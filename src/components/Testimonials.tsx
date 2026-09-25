import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../data/site";
import SizedImage from "./SizedImage";

const CARD = "w-[85vw] max-w-[380px] h-[420px] shrink-0 snap-start rounded-2xl sm:w-[420px] sm:max-w-none sm:h-[440px]";
const AUTO_ADVANCE_MS = 5000;
// The side photo is object-cover in a ~440px-tall box, so a landscape photo is
// drawn ~660px wide. The avatar reuses the same `sizes` so only one file loads.
const PHOTO_SIZES = "660px";
const MOBILE_QUERY = "(max-width: 639px)";

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const getStep = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || el.children.length < 2) return el?.clientWidth ?? 0;
    const first = el.children[0] as HTMLElement;
    const second = el.children[1] as HTMLElement;
    return second.offsetLeft - first.offsetLeft;
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const step = getStep();
      scrollerRef.current?.scrollTo({ left: index * step, behavior: "smooth" });
    },
    [getStep],
  );

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  };

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isMobile) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
  }, [isMobile, scrollToIndex]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const step = getStep();
        if (!step) return;
        const index = Math.round(el.scrollLeft / step);
        setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [getStep]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    scrollToIndex(index);
    restartTimer();
  };

  return (
    <section className="relative z-50 flex flex-col justify-center bg-cream px-6 pb-14 pt-10 md:sticky md:top-0 md:min-h-screen md:px-16 md:pb-16 md:pt-12">
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted">
            Testimonials
          </div>
          <h2 className="mt-2 font-display text-4xl font-bold text-ink md:text-5xl">
            Don't take our word for it!
            <br />
            Hear it from our customers.
          </h2>
        </div>
        <div className="hidden shrink-0 gap-3 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:bg-ink hover:text-white"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-white transition hover:bg-ink"
            aria-label="Next testimonial"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={() => timerRef.current && clearInterval(timerRef.current)}
        onTouchStart={() => timerRef.current && clearInterval(timerRef.current)}
        onPointerUp={restartTimer}
        onTouchEnd={restartTimer}
        className="mx-auto mt-10 flex w-full max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className={`reveal ${CARD} flex overflow-hidden border border-ink/10 bg-white shadow-md`}
          >
            <div className="flex w-[64%] flex-col justify-between p-5 sm:w-[58%] sm:p-7">
              <div>
                <Quote size={26} className="text-accent-dark" fill="currentColor" />
                <p className="mt-4 text-sm leading-relaxed text-ink/85 sm:text-base">{t.quote}</p>
              </div>
              <div className="flex items-center gap-3">
                <SizedImage
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  sizes={PHOTO_SIZES}
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white shadow"
                />
                <div>
                  <div className="font-display text-base font-semibold leading-none text-ink">
                    {t.name}
                  </div>
                  <div className="mt-1.5 text-sm text-muted">{t.role}</div>
                </div>
              </div>
            </div>
            <div className="relative w-[36%] sm:w-[42%]">
              <SizedImage
                src={t.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                sizes={PHOTO_SIZES}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center sm:hidden">
        {testimonials.map((t, i) => (
          // 24px-tall tap target (WCAG target-size) around the small visible dot.
          <button
            key={t.name}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === activeIndex}
            className="flex h-6 min-w-6 items-center justify-center px-1"
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-charcoal" : "w-2 bg-ink/20"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
