import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { business, heroSlides, heroVideoId } from "../data/site";
import VideoModal from "./VideoModal";
import BrandsMarquee from "./BrandsMarquee";

const AUTO_ADVANCE_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, AUTO_ADVANCE_MS);
  }, []);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const handleNav = (next: number) => {
    goTo(next);
    restartTimer();
  };

  const slide = heroSlides[index];

  return (
    <section
      id="home"
      className="sticky top-0 z-0 flex min-h-[95vh] items-center justify-center overflow-hidden bg-charcoal md:h-[96vh] md:min-h-0"
    >
      {heroSlides.map((s, i) => (
        <motion.img
          key={s.image}
          src={s.image}
          alt=""
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/45" />

      <div className="absolute bottom-16 left-1/2 w-full -translate-x-1/2 select-none text-center leading-none md:bottom-20">
        <span className="wordmark-gradient font-display text-[18vw] font-extrabold">
          INDUS
        </span>
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Trusted Solar Partner in Kanpur
        </motion.div>

        <div className="relative min-h-[2.4em] w-full overflow-hidden md:min-h-[2.2em]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-gold-gradient font-display text-4xl font-extrabold leading-[1.15] md:text-6xl"
            >
              {slide.heading[0]}
              <br />
              {slide.heading[1]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="relative mt-5 min-h-[3em] w-full max-w-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.05 }}
              className="text-sm text-white/80 md:text-base"
            >
              {slide.body}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex items-center gap-4"
        >
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cream px-7 py-3 text-sm font-semibold text-ink shadow-lg transition hover:scale-[1.03] hover:shadow-xl"
          >
            Get a Free Quote
          </a>
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-3 text-sm font-medium text-white transition hover:text-gold-light"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition group-hover:bg-white/25">
              <Play size={16} fill="currentColor" />
            </span>
            Play Video
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-32 right-6 z-30 flex gap-3 md:bottom-36 md:right-12">
        <button
          onClick={() => handleNav(index - 1)}
          aria-label="Previous slide"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => handleNav(index + 1)}
          aria-label="Next slide"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} videoId={heroVideoId} />
      <BrandsMarquee />
    </section>
  );
}
