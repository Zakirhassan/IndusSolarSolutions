import { Quote } from "lucide-react";
import { getLocalityBySlug, getTestimonialsForLocality, getProjectsForLocality } from "../data/localities";
import { getSeo } from "../data/seo";
import { business } from "../data/site";
import Seo from "../components/Seo";
import SizedImage from "../components/SizedImage";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function LocalityPage({ slug }: { slug: string }) {
  const locality = getLocalityBySlug(slug);
  if (!locality) throw new Error(`Unknown locality slug: ${slug}`);

  const localTestimonials = getTestimonialsForLocality(locality);
  const localProjects = getProjectsForLocality(locality);
  const heroImage = localProjects[0]?.image ?? "/images/hero/hero-5-rooftop.webp";

  return (
    <>
      <Seo {...getSeo(`/${locality.slug}`)} />
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:min-h-[60vh] md:px-16 md:pb-14 md:pt-40">
        <SizedImage src={heroImage} alt={locality.h1} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Solar Panel Installation", path: "/solar-panel-installation-kanpur" },
              { name: locality.name, path: `/${locality.slug}` },
            ]}
          />
          <h1
            className="rise mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {locality.h1}
          </h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">{locality.intro}</p>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Get a Free Quote for {locality.name}
          </a>
        </div>

        {localProjects.length > 0 && (
          <div className="mx-auto mt-14 max-w-5xl">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              Projects in {locality.name}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {localProjects.map((p) => (
                <div key={p.title} className="overflow-hidden rounded-2xl bg-white shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <SizedImage src={p.image} alt={p.title} loading="lazy" sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="font-display text-sm font-semibold text-ink">{p.title}</div>
                    <div className="mt-1 text-xs text-muted">{p.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {localTestimonials.length > 0 && (
          <div className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              What {locality.name} Customers Say
            </h2>
            <div className="mt-6 space-y-6">
              {localTestimonials.map((t) => (
                <div key={t.name} className="rounded-2xl bg-white p-6 shadow-md">
                  <Quote size={22} className="text-accent-dark" fill="currentColor" />
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">{t.quote}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <SizedImage src={t.image} alt={t.name} loading="lazy" sizes="40px" className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <div className="font-display text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-muted">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
