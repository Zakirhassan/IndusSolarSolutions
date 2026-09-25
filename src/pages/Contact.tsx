import { MapPin, Phone, Mail } from "lucide-react";
import { business } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import EmailLink from "../components/EmailLink";

export default function Contact() {
  return (
    <>
      <Seo {...getSeo("/contact")} />
      <section className="bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
          <h1
            className="rise mt-4 font-display text-3xl font-bold text-white md:text-5xl"
          >
            Contact Indus Solar Solutions
          </h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          <a href={business.googleMapsUrl} target="_blank" rel="noreferrer" className="rounded-2xl bg-white p-6 text-center shadow-md">
            <MapPin size={22} className="mx-auto text-accent-dark" />
            <div className="mt-3 text-sm text-ink">{business.address}</div>
          </a>
          <a href={business.callUrl} className="rounded-2xl bg-white p-6 text-center shadow-md">
            <Phone size={22} className="mx-auto text-accent-dark" />
            <div className="mt-3 text-sm text-ink">+91 {business.phone}</div>
          </a>
          <EmailLink
            className="rounded-2xl bg-white p-6 text-center shadow-md"
            render={(address) => (
              <>
                <Mail size={22} className="mx-auto text-accent-dark" />
                <div className="mt-3 text-sm text-ink">{address}</div>
              </>
            )}
          />
        </div>

        <div className="mx-auto mt-10 max-w-md">
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-full bg-charcoal py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Message Us on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
