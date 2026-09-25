import { faqs } from "../data/faqs";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function FaqPage() {
  return (
    <>
      <Seo {...getSeo("/faq")} />
      <section className="bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
          <h1
            className="rise mt-4 font-display text-3xl font-bold text-white md:text-5xl"
          >
            Solar Panel FAQs
          </h1>
        </div>
      </section>

      <Faq items={faqs} heading="All Questions" />

      <Footer />
    </>
  );
}
