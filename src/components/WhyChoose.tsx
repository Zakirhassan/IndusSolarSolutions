import { motion } from "framer-motion";
import { whyChoose } from "../data/site";

export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="sticky top-0 z-10 flex min-h-screen flex-col justify-center bg-cream px-6 py-24 md:px-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted">
            Who We Are
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mt-3 font-display text-3xl font-bold text-ink md:text-5xl"
          >
            Why Choose Residential Solar Panels?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-md text-sm text-muted"
          >
            There are many significant benefits to installing solar panels on your
            home or shop roof — financial and environmental, both.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
        >
          <img
            src="/images/why-choose/engineer.jpg"
            alt="Indus Solar Solutions engineer at a solar installation"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl border-t border-ink/10" />

      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {whyChoose.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
