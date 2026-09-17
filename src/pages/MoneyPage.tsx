import { motion } from "framer-motion";
import { getMoneyPageBySlug } from "../data/moneyPages";
import { getFaqsBySlug } from "../data/faqs";
import { getSeo } from "../data/seo";
import { business } from "../data/site";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import SolarCalculatorV2 from "../components/SolarCalculatorV2";

export default function MoneyPage({ slug }: { slug: string }) {
  const page = getMoneyPageBySlug(slug);
  if (!page) throw new Error(`Unknown money page slug: ${slug}`);

  const faqItems = getFaqsBySlug(page.faqSlugs);

  return (
    <>
      <Seo {...getSeo(`/${page.slug}`)} />
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:min-h-[60vh] md:px-16 md:pb-14 md:pt-40">
        <img src={page.heroImage} alt={page.h1} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: page.h1, path: `/${page.slug}` }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {page.h1}
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">{page.intro}</p>
        </div>

        {page.slug === "solar-calculator-kanpur" && (
          <div className="mx-auto mt-8 max-w-5xl">
            <SolarCalculatorV2 />
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          <div className="mt-10 space-y-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{section.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{section.body}</p>

                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted md:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.stats && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {section.stats.map((stat) => (
                      <div key={stat.label} className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="font-display text-lg font-bold text-ink">{stat.value}</div>
                        <div className="mt-0.5 text-xs text-muted">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {section.image && (
                  <div className="mt-4 overflow-hidden rounded-2xl">
                    <img
                      src={section.image}
                      alt={section.imageAlt ?? section.heading}
                      loading="lazy"
                      className="h-56 w-full object-cover md:h-72"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      {faqItems.length > 0 && <Faq items={faqItems} />}

      <Footer />
    </>
  );
}
