import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap, Phone } from "lucide-react";
import { business, nav } from "../data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-6xl items-center justify-between rounded-full bg-cream-light/90 px-5 py-3 shadow-lg shadow-black/10 backdrop-blur-md">
        <Link to="/#home" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-gold-light">
            <Zap size={16} fill="currentColor" />
          </span>
          Indus Solar
        </Link>

        <nav className="hidden items-center gap-7 font-body text-sm font-medium text-ink/80 md:flex">
          {nav.map((item) => (
            <Link key={item.href} to={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={business.callUrl}
            className="rounded-full border border-charcoal/20 px-4 py-2 text-sm font-medium text-ink transition hover:bg-charcoal hover:text-white"
          >
            Call Now
          </a>
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white transition hover:bg-ink"
          >
            Get a Free Quote
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="absolute top-20 w-[calc(100%-2rem)] max-w-6xl rounded-3xl bg-cream-light p-5 shadow-xl md:hidden">
          <nav className="flex flex-col gap-4 font-body text-base">
            {nav.map((item) => (
              <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex gap-3">
            <a
              href={business.callUrl}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-charcoal/20 px-4 py-2 text-sm font-medium"
            >
              <Phone size={14} /> Call
            </a>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white"
            >
              Free Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
