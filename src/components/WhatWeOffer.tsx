import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { offerItems } from "../data/site";

export default function WhatWeOffer() {
  return (
    <section className="relative z-[5] flex flex-col justify-center bg-cream-light px-6 py-14 md:sticky md:top-0 md:min-h-screen md:px-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted">
          What We Offer
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-ink md:text-5xl"
        >
          Customized Solar Panel Installation Solutions in Kanpur
        </motion.h2>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2">
        {offerItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
          >
            <Link
              to={item.href}
              className="group relative block aspect-[16/11] overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="card-hover-img absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow transition group-hover:bg-gold-light">
                <ArrowUpRight size={16} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-display text-lg font-semibold text-white md:text-xl">
                  {item.title}
                </div>
                <p className="mt-1 text-sm text-white/75">{item.body}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
