import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../data/site";

const CARD = "w-[420px] h-[440px] shrink-0 snap-start rounded-2xl";

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  };

  return (
    <section className="sticky top-0 z-50 flex min-h-screen flex-col justify-center bg-cream px-6 pb-16 pt-12 md:px-16">
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
        <div className="hidden gap-3 sm:flex">
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
        className="mx-auto mt-10 flex w-full max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`${CARD} flex overflow-hidden border border-ink/10 bg-white shadow-md`}
          >
            <div className="flex w-[58%] flex-col justify-between p-7">
              <div>
                <Quote size={26} className="text-gold-dark" fill="currentColor" />
                <p className="mt-4 text-base leading-relaxed text-ink/85">{t.quote}</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
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
            <div className="relative w-[42%]">
              <img
                src={t.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/10" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
