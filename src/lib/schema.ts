import { business } from "../data/site";

// Duplicated from ../data/seo's SITE_URL rather than imported: data/seo.ts imports
// breadcrumbSchema/serviceSchema/faqSchema from this module, so importing SITE_URL
// back from data/seo here would create a circular dependency between the two modules.
const SITE_URL = "https://www.indussolarsolutions.com";

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

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; role: string };
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
    author: {
      "@type": "Person",
      name: opts.author.name,
      jobTitle: opts.author.role,
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
    publisher: { "@id": `${SITE_URL}/#business` },
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
