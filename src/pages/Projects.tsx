import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { projects } from "../data/projects";
import { heroStat } from "../data/site";
import Seo from "../components/Seo";
import { getSeo } from "../data/seo";
import Footer from "../components/Footer";

export default function Projects() {
  return (
    <>
      <Seo {...getSeo("/projects")} />
      <section className="bg-charcoal px-6 pb-16 pt-36 md:px-16 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent-light">
            Our Projects
          </div>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl">
            {heroStat.value}+ Solar Installations Across Kanpur
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/70">
            {heroStat.sublabel}. Below is a sample of the kind of work we do —
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Link key={`${p.title}-${i}`} to={`/projects/${p.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                className="group relative aspect-[16/11] overflow-hidden rounded-2xl shadow-md"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="card-hover-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="font-display text-lg font-semibold text-white md:text-xl">
                    {p.title}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
                    <MapPin size={13} /> {p.location}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
