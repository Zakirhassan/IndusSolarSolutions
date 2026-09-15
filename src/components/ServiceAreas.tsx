import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { localities } from "../data/localities";

export default function ServiceAreas() {
  return (
    <section className="bg-cream-light px-6 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">
          Kanpur Service Areas
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {localities.map((l) => (
            <Link
              key={l.slug}
              to={`/${l.slug}`}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-ink shadow-sm transition hover:shadow-md"
            >
              <MapPin size={14} className="shrink-0 text-accent-dark" />
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
