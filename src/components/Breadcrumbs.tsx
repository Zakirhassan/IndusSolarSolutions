import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = { name: string; path: string };

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/70 md:text-sm">
      {items.map((item, i) => (
        <span key={item.path} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="shrink-0 text-white/40" />}
          {i === items.length - 1 ? (
            <span className="text-white">{item.name}</span>
          ) : (
            <Link to={item.path} className="hover:text-white">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
