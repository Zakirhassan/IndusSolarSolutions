import { motion } from "framer-motion";
import CountUp from "./CountUp";
import { impact } from "../data/site";

export default function ImpactStats() {
  return (
    <section className="sticky top-0 z-40 flex min-h-screen items-center bg-cream px-6 py-16 md:px-16">
      <div className="mx-auto grid h-[85vh] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl shadow-xl md:grid-cols-5">
        <div className="relative min-h-[320px] md:col-span-3">
          <img
            src={impact.photo}
            alt="Solar panels installed by Indus Solar Solutions"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center bg-cream-light p-8 md:col-span-2 md:p-12">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-display text-2xl font-bold text-ink md:text-3xl"
          >
            {impact.heading}
          </motion.h2>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
            {impact.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              >
                <div className="font-display text-4xl font-extrabold text-ink md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm font-semibold text-ink">{stat.label}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{stat.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
