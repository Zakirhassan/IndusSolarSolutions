import { products } from "./products";
import { projects } from "./projects";
import { moneyPages } from "./moneyPages";
import { kwSystems } from "./kwSystems";
import { localities, getTestimonialsForLocality, getProjectsForLocality } from "./localities";
import { blogArticles } from "./blog";
import { faqs, getFaqsBySlug } from "./faqs";
import { breadcrumbSchema, serviceSchema, faqSchema, type JsonLd } from "../lib/schema";

export const SITE_URL = "https://indussolarsolutions.com";
export const DEFAULT_IMAGE = "/images/hero/hero-2b-adlershof.jpg";

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  image?: string;
  schema?: JsonLd | JsonLd[];
};

export const staticSeo: SeoEntry[] = [
  {
    path: "/",
    title: "Indus Solar Solutions | Best Solar Company in Kanpur",
    description:
      "Indus Solar Solutions is Kanpur's trusted solar panel installation company — residential, commercial & industrial rooftop solar, solar subsidy assistance, batteries and maintenance in Kidwai Nagar and nearby areas.",
    schema: breadcrumbSchema([{ name: "Home", path: "/" }]),
  },
  {
    path: "/products",
    title: "Solar Products in Kanpur | Panels, Inverters & Batteries — Indus Solar Solutions",
    description:
      "Solar panels, inverters, mounting structures, batteries and complete solar kits supplied and installed by Indus Solar Solutions, Kanpur's trusted solar panel installation company.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]),
  },
  {
    path: "/projects",
    title: "Solar Installation Projects in Kanpur | Indus Solar Solutions",
    description:
      "Solar installations completed across Kanpur and Kanpur Dehat — residential, commercial and industrial rooftop solar projects by Indus Solar Solutions.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]),
  },
  {
    path: "/about",
    title: "About Indus Solar Solutions | Solar Company in Kanpur",
    description:
      "Indus Solar Solutions is a Kanpur-based solar panel installation company serving homes, businesses and factories in Kidwai Nagar and nearby areas.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  },
  {
    path: "/contact",
    title: "Contact Indus Solar Solutions | Solar Company in Kanpur",
    description:
      "Get in touch with Indus Solar Solutions for a free solar site survey and quote in Kanpur — call, WhatsApp, or send us a message.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  },
  {
    path: "/faq",
    title: "Solar Panel FAQs | Indus Solar Solutions",
    description:
      "Answers to common questions about solar panel cost, subsidy, installation time, maintenance and more in Kanpur.",
    schema: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ]),
      faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
    ],
  },
  {
    path: "/blog",
    title: "Solar Guides & Resources | Indus Solar Solutions",
    description:
      "Guides on solar panel cost, subsidy eligibility, and whether rooftop solar is worth it in Kanpur.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  },
];

export const productSeo: SeoEntry[] = products.map((p) => ({
  path: `/products/${p.slug}`,
  title: `${p.title} in Kanpur | Price & Installation — Indus Solar Solutions`,
  description: `${p.tagline}. Installed by Indus Solar Solutions, Kanpur's trusted solar panel installation company.`,
  image: p.images[0],
  schema: breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: p.title, path: `/products/${p.slug}` },
  ]),
}));

export const moneyPageSeo: SeoEntry[] = moneyPages.map((p) => ({
  path: `/${p.slug}`,
  title: p.title,
  description: p.metaDescription,
  image: p.heroImage,
  schema: [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: p.h1, path: `/${p.slug}` },
    ]),
    serviceSchema({ name: p.h1, description: p.metaDescription, path: `/${p.slug}` }),
  ],
}));

export const kwSystemSeo: SeoEntry[] = kwSystems.map((s) => ({
  path: `/${s.slug}`,
  title: s.title,
  description: s.metaDescription,
  schema: [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solar Panel Price in Kanpur", path: "/solar-panel-price-kanpur" },
      { name: s.h1, path: `/${s.slug}` },
    ]),
    serviceSchema({ name: s.h1, description: s.metaDescription, path: `/${s.slug}` }),
  ],
}));

export const localitySeo: SeoEntry[] = localities.map((l) => ({
  path: `/${l.slug}`,
  title: l.title,
  description: l.metaDescription,
  image: getProjectsForLocality(l)[0]?.image ?? getTestimonialsForLocality(l)[0]?.image,
  schema: [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solar Panel Installation", path: "/solar-panel-installation-kanpur" },
      { name: l.h1, path: `/${l.slug}` },
    ]),
    serviceSchema({ name: l.h1, description: l.metaDescription, path: `/${l.slug}` }),
  ],
}));

export const blogSeo: SeoEntry[] = blogArticles.map((a) => ({
  path: `/blog/${a.slug}`,
  title: a.title,
  description: a.metaDescription,
  schema: breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: a.h1, path: `/blog/${a.slug}` },
  ]),
}));

export const projectSeo: SeoEntry[] = projects.map((p) => ({
  path: `/projects/${p.slug}`,
  title: `${p.title} in ${p.location} | Indus Solar Solutions`,
  description: `${p.title} completed by Indus Solar Solutions in ${p.location}.`,
  image: p.image,
  schema: breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: p.title, path: `/projects/${p.slug}` },
  ]),
}));

export const allSeo: SeoEntry[] = [
  ...staticSeo,
  ...productSeo,
  ...moneyPageSeo,
  ...kwSystemSeo,
  ...localitySeo,
  ...blogSeo,
  ...projectSeo,
];

export function getSeo(path: string): SeoEntry {
  return allSeo.find((entry) => entry.path === path) ?? staticSeo[0];
}

// Re-exported for pages that need FAQ subsets without importing faqs.ts directly.
export { getFaqsBySlug };
