import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap, Phone, ChevronDown } from "lucide-react";
import { business } from "../data/site";
import { navGroups, isNavGroup } from "../data/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-6xl items-center justify-between rounded-full bg-cream-light/90 px-5 py-3 shadow-lg shadow-black/10 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-gold-light">
            <Zap size={16} fill="currentColor" />
          </span>
          Indus Solar
        </Link>

        <nav className="hidden items-center gap-6 font-body text-sm font-medium text-ink/80 lg:flex">
          {navGroups.map((entry) =>
            isNavGroup(entry) ? (
              <div
                key={entry.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(entry.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button className="flex items-center gap-1 transition hover:text-ink" type="button">
                  {entry.label}
                  <ChevronDown size={14} />
                </button>
                {openGroup === entry.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-56 rounded-2xl bg-white p-2 shadow-xl">
                      {entry.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block rounded-xl px-3 py-2 text-sm text-ink/80 hover:bg-cream hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={entry.href} to={entry.href} className="transition hover:text-ink">
                {entry.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
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

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="absolute top-20 max-h-[75vh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto rounded-3xl bg-cream-light p-5 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-1 font-body text-base">
            {navGroups.map((entry) =>
              isNavGroup(entry) ? (
                <div key={entry.label}>
                  <button
                    type="button"
                    onClick={() => setMobileOpenGroup(mobileOpenGroup === entry.label ? null : entry.label)}
                    className="flex w-full items-center justify-between py-2 text-left"
                  >
                    {entry.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileOpenGroup === entry.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileOpenGroup === entry.label && (
                    <div className="flex flex-col gap-1 border-l border-ink/10 pl-4">
                      {entry.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setOpen(false)}
                          className="py-2 text-sm text-ink/80"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={entry.href} to={entry.href} onClick={() => setOpen(false)} className="py-2">
                  {entry.label}
                </Link>
              )
            )}
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
