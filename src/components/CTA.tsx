import { motion } from "framer-motion";
import { business } from "../data/site";

function PanelSketch({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={`h-24 w-40 text-gold-dark/50 md:h-32 md:w-56 ${flip ? "-scale-x-100" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M10 100 L60 40 L190 40 L150 100 Z" />
      <path d="M60 40 L60 100" />
      <path d="M95 40 L85 100" />
      <path d="M130 40 L110 100" />
      <path d="M165 40 L135 100" />
      <path d="M10 100 L150 100" />
      <path d="M100 15 L100 40" />
    </svg>
  );
}

export default function CTA() {
  return (
    <section className="sticky top-0 z-[60] flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream px-6 py-20 text-center">
      <div className="absolute bottom-0 left-0 opacity-70">
        <PanelSketch />
      </div>
      <div className="absolute bottom-0 right-0 opacity-70">
        <PanelSketch flip />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl font-display text-3xl font-bold text-ink md:text-5xl"
      >
        Ready to Embrace a Greener Future?
      </motion.h2>

      <motion.a
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        href={business.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 mt-8 rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
      >
        Explore Our Solar Solutions
      </motion.a>
    </section>
  );
}
