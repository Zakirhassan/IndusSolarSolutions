import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
}

const DURATION_MS = 1600;
const format = (n: number, suffix: string) => Math.round(n).toLocaleString("en-IN") + suffix;

// Prerenders the real number (so crawlers and no-JS visitors see it), then
// once hydrated resets to 0 and counts up the first time it scrolls into view.
export default function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = format(0, suffix);

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          el.textContent = format(value * (1 - Math.pow(1 - t, 3)), suffix);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -100px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = format(value, suffix);
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(value, suffix)}
    </span>
  );
}
