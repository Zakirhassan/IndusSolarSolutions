import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { business, nav } from "../data/site";

export default function Footer() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = `Hi, I'm ${form.get("firstName")} ${form.get("lastName")}.%0APhone: ${form.get(
      "phone"
    )}%0AEmail: ${form.get("email")}%0A%0A${form.get("message")}`;
    window.open(`${business.whatsappUrl}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <footer id="contact" className="sticky top-0 z-[70] bg-charcoal px-6 py-20 md:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-gold-light">
            Contact Us
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
            Let's Build a Brighter
            <br />
            Future Together
          </h2>

          <div className="mt-10 space-y-4 text-sm text-white/70">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-light" />
              <span>{business.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-gold-light" />
              <a href={business.callUrl}>+91 {business.phone}</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-gold-light" />
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </div>

          <div className="mt-10">
            <div className="text-xs font-medium uppercase tracking-widest text-white/50">
              Quick Links
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {nav.map((item) => (
                <Link key={item.href} to={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-cream-light p-6 shadow-xl md:p-8"
        >
          {sent ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <p className="font-display text-lg font-semibold text-ink">
                Thanks! We opened WhatsApp for you.
              </p>
              <p className="mt-2 text-sm text-muted">
                Send the message and Abul Hassan will get back to you shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  required
                  placeholder="First name"
                  className="rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-dark"
                />
                <input
                  name="lastName"
                  placeholder="Last name"
                  className="rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-dark"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="mt-4 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-dark"
              />
              <input
                name="phone"
                required
                placeholder="Phone number"
                className="mt-4 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-dark"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="How can we help you?"
                className="mt-4 w-full resize-none rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold-dark"
              />
              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-charcoal py-3 text-sm font-semibold text-white transition hover:bg-ink"
              >
                Send Message on WhatsApp
              </button>
            </>
          )}
        </form>
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Indus Solar Solutions. All rights reserved.
      </div>
    </footer>
  );
}
