import { testimonials } from "./site";
import { projects } from "./projects";

export type LocalityEntry = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  matchText: string;
};

function buildEntry(name: string, matchText: string, intro: string): LocalityEntry {
  const slug = `solar-panel-installation-${matchText
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
  return {
    slug,
    name,
    title: `Solar Panel Installation in ${name}, Kanpur | Indus Solar Solutions`,
    metaDescription: `Rooftop solar panel installation in ${name}, Kanpur — real local projects, free site survey, and after-sales support from Indus Solar Solutions.`,
    h1: `Solar Panel Installation in ${name}, Kanpur`,
    intro,
    matchText,
  };
}

export const localities: LocalityEntry[] = [
  buildEntry(
    "Kidwai Nagar",
    "Kidwai Nagar",
    "Kidwai Nagar, home to our own office near Sabji Mandi, is one of the areas we know best — a mix of residential streets and commercial market frontage, most with flat RCC roofs well suited to solar."
  ),
  buildEntry(
    "Kalyanpur",
    "Kalyanpur",
    "Kalyanpur, near IIT Kanpur, is a mix of established residential colonies and newer construction — most homes here have flat roofs with good south-facing exposure for solar."
  ),
  buildEntry(
    "Panki",
    "Panki",
    "Panki Industrial Area is home to factories and industrial units with large sloped or flat roofs and high daytime power consumption — exactly the profile where rooftop solar delivers the fastest payback."
  ),
  buildEntry(
    "Civil Lines",
    "Civil Lines",
    "Civil Lines is Kanpur's commercial and administrative hub, with offices and commercial buildings that run high daytime loads — a strong fit for commercial rooftop solar."
  ),
  buildEntry(
    "Kakadeo",
    "Kakadeo",
    "Kakadeo is a dense residential and commercial market area — smaller roof footprints here mean careful system design matters more to get the most out of available space."
  ),
  buildEntry(
    "Swaroop Nagar",
    "Swaroop Nagar",
    "Swaroop Nagar is an established residential colony with larger independent houses — many with generous flat-roof space well suited to a full-size residential solar system."
  ),
];

export function getLocalityBySlug(slug: string): LocalityEntry | undefined {
  return localities.find((l) => l.slug === slug);
}

export function getTestimonialsForLocality(entry: LocalityEntry): typeof testimonials {
  return testimonials.filter((t) => t.role.includes(entry.matchText));
}

export function getProjectsForLocality(entry: LocalityEntry): typeof projects {
  return projects.filter((p) => p.location.includes(entry.matchText));
}
