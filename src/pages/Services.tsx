import { motion } from "framer-motion";
import { services } from "../data/services";
import { business } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function Services() {
  return (
    <>
      <Seo {...getSeo("/services")} />
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <img
          src="/images/technician-rooftop.jpg"
          alt="Indus Solar Solutions technician working on a rooftop installation"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            What We Do
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Beyond selling equipment, Indus Solar Solutions runs the full project lifecycle — from your first
            call through years of after-sales support.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-5 shadow-md">
                <div className="font-display text-sm font-semibold text-ink">{item.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Talk to Our Team
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
