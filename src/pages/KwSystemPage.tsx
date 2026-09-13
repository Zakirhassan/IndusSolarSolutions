import { motion } from "framer-motion";
import { getKwSystemBySlug, getKwSystemFaqs } from "../data/kwSystems";
import { getSeo } from "../data/seo";
import { business } from "../data/site";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function KwSystemPage({ slug }: { slug: string }) {
  const system = getKwSystemBySlug(slug);
  if (!system) throw new Error(`Unknown kW system slug: ${slug}`);

  const faqItems = getKwSystemFaqs(system);

  return (
    <>
      <Seo {...getSeo(`/${system.slug}`)} />
      <section className="relative bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Solar Panel Price in Kanpur", path: "/solar-panel-price-kanpur" },
              { name: system.h1, path: `/${system.slug}` },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {system.h1}
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm text-white/75 md:text-base">{system.intro}</p>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="font-display text-2xl font-bold text-ink">{system.kw}kW</div>
            <div className="mt-1 text-xs text-muted">System Size</div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="font-display text-2xl font-bold text-ink">~{system.panelCountEstimate}</div>
            <div className="mt-1 text-xs text-muted">Panels (indicative)</div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="font-display text-2xl font-bold text-ink">~{system.roofAreaSqFt} sq ft</div>
            <div className="mt-1 text-xs text-muted">Roof Area Needed</div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="font-display text-2xl font-bold text-ink">
              ~{system.monthlyGenerationEstimateUnits}
            </div>
            <div className="mt-1 text-xs text-muted">Units/Month (indicative)</div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Who This Size Suits</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{system.suitsWho}</p>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Get a Quote for a {system.kw}kW System
          </a>
        </div>
      </section>

      {faqItems.length > 0 && <Faq items={faqItems} />}

      <Footer />
    </>
  );
}
