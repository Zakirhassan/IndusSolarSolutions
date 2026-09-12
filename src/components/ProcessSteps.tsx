import { motion } from "framer-motion";
import { process } from "../data/site";

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="sticky top-0 z-30 flex min-h-screen flex-col justify-center bg-cream px-6 py-24 md:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-md font-display text-3xl font-bold text-ink md:text-5xl"
        >
          Simple Process.
          <br />
          Maximum Efficiency.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="max-w-sm text-sm text-muted"
        >
          We make switching to solar easy with a clear, hassle-free process designed
          to save you time, money, and energy.
        </motion.p>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
            className={`group flex min-h-[300px] flex-col justify-between rounded-2xl p-8 transition-colors duration-500 ease-in-out hover:bg-charcoal hover:text-white ${
              i % 2 === 0 ? "bg-cream-light text-ink" : "bg-charcoal-light text-white"
            }`}
          >
            <div>
              <h3 className="font-display text-xl font-semibold">{step.title}</h3>
              <p
                className={`mt-4 text-sm leading-relaxed transition-colors duration-500 ease-in-out group-hover:text-white/70 ${
                  i % 2 === 0 ? "text-muted" : "text-white/70"
                }`}
              >
                {step.body}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-current/20 px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
