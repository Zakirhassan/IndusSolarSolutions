import { business, impact, whyChoose } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import SizedImage from "../components/SizedImage";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Seo {...getSeo("/about")} />
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <SizedImage
          src="/images/why-choose/engineer.webp"
          alt="Solar installation engineer inspecting a rooftop array"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
          <h1
            className="rise mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            About Indus Solar Solutions
          </h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Indus Solar Solutions is a Kanpur-based solar panel installation company run by {business.owner},
            serving homes, shops and factories across Kanpur from our office in {business.streetAddress}. We started small and grew through repeat
            business and referrals — {impact.heading.toLowerCase()} reflects that: {impact.stats[0].value}
            {impact.stats[0].suffix} projects completed in {impact.stats[1].value} months of operation, all
            handled locally from consultation to after-sales support. Our installation crews work hands-on in and
            around Kanpur, and we take on consultation and project work for clients across India.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-5 shadow-md">
                <div className="font-display text-sm font-semibold text-ink">{item.title}</div>
                <div className="text-xs text-accent-dark">{item.hindi}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
