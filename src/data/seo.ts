import { products } from "./products";

export const SITE_URL = "https://indussolarsolutions.com";
export const DEFAULT_IMAGE = "/images/hero/hero-2b-adlershof.jpg";

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  image?: string;
};

export const staticSeo: SeoEntry[] = [
  {
    path: "/",
    title: "Indus Solar Solutions | Best Solar Company in Kanpur",
    description:
      "Indus Solar Solutions is Kanpur's trusted solar panel installation company — residential, commercial & industrial rooftop solar, solar subsidy assistance, batteries and maintenance in Kidwai Nagar and nearby areas.",
  },
  {
    path: "/products",
    title: "Solar Products in Kanpur | Panels, Inverters & Batteries — Indus Solar Solutions",
    description:
      "Solar panels, inverters, mounting structures, batteries and complete solar kits supplied and installed by Indus Solar Solutions, Kanpur's trusted solar panel installation company.",
  },
  {
    path: "/projects",
    title: "Solar Installation Projects in Kanpur | Indus Solar Solutions",
    description:
      "Solar installations completed across Kanpur and Kanpur Dehat — residential, commercial and industrial rooftop solar projects by Indus Solar Solutions.",
  },
];

export const productSeo: SeoEntry[] = products.map((p) => ({
  path: `/products/${p.slug}`,
  title: `${p.title} in Kanpur | Price & Installation — Indus Solar Solutions`,
  description: `${p.tagline}. Installed by Indus Solar Solutions, Kanpur's trusted solar panel installation company.`,
  image: p.images[0],
}));

export const allSeo: SeoEntry[] = [...staticSeo, ...productSeo];

export function getSeo(path: string): SeoEntry {
  return allSeo.find((entry) => entry.path === path) ?? staticSeo[0];
}
