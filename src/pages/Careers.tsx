import { motion } from "framer-motion";
import { business } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const roleCategories = [
  {
    title: "Installation Technician",
    body: "Hands-on rooftop installation work — mounting structures, panels, wiring, and safety practices.",
  },
  {
    title: "Site Survey & Sales",
    body: "Meeting customers, assessing roofs and energy usage, and helping them choose the right system.",
  },
  {
    title: "Office & Admin Support",
    body: "Coordinating site visits, subsidy paperwork, and customer follow-ups.",
  },
];

export default function Careers() {
  return (
    <>
      <Seo {...getSeo("/careers")} />
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <img
          src="/images/why-choose/engineer.jpg"
          alt="Indus Solar Solutions installation team"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            Build Your Career With Us
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Indus Solar Solutions is a growing, hands-on solar installation team based in Kanpur. We're always
            open to hearing from people interested in the kinds of roles below — send us your details and we'll
            reach out when something fits.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {roleCategories.map((role) => (
              <div key={role.title} className="rounded-2xl bg-white p-5 shadow-md">
                <div className="font-display text-sm font-semibold text-ink">{role.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{role.body}</p>
              </div>
            ))}
          </div>

          <a
            href={`${business.whatsappUrl}?text=${encodeURIComponent(
              "Hi, I'm interested in working with Indus Solar Solutions. Here's a bit about myself:"
            )}`}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Send Us Your Details
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
