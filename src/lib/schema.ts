import { SITE_URL } from "../data/seo";
import { business } from "../data/site";

export type JsonLd = Record<string, unknown>;

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: opts.areaServed ?? ["Kanpur"],
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
