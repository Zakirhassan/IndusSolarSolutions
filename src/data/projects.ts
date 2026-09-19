export type ProjectEntry = {
  slug: string;
  title: string;
  location: string;
  image: string;
};

// Placeholder entries — replace with Indus Solar Solutions' real project list
// (client name/type, location, capacity) once available.
export const projects: ProjectEntry[] = [
  { slug: "rooftop-solar-kidwai-nagar", title: "Rooftop Solar Installation", location: "Kidwai Nagar, Kanpur", image: "/images/technician-rooftop.webp" },
  { slug: "residential-rooftop-kalyanpur", title: "Residential Rooftop System", location: "Kalyanpur, Kanpur", image: "/images/rooftop-installation.webp" },
  { slug: "commercial-rooftop-panki", title: "Commercial Rooftop Array", location: "Panki Industrial Area, Kanpur", image: "/images/solar-farm-telangana.webp" },
  { slug: "shop-office-civil-lines", title: "Shop & Office Solar Setup", location: "Civil Lines, Kanpur", image: "/images/solar-lake-chandigarh.webp" },
  { slug: "factory-rooftop-kanpur-dehat", title: "Factory Rooftop Installation", location: "Kanpur Dehat", image: "/images/hero-solar-farm.webp" },
  { slug: "ground-mount-kanpur-outskirts", title: "Ground-Mount Solar System", location: "Kanpur Outskirts", image: "/images/technician-rooftop.webp" },
  { slug: "residential-upgrade-swaroop-nagar", title: "Residential Solar Upgrade", location: "Swaroop Nagar, Kanpur", image: "/images/rooftop-installation.webp" },
  { slug: "cold-storage-kanpur-dehat", title: "Cold Storage Rooftop Solar", location: "Kanpur Dehat", image: "/images/solar-farm-telangana.webp" },
  { slug: "shop-rooftop-naveen-market", title: "Shop Rooftop Installation", location: "Naveen Market, Kanpur", image: "/images/solar-lake-chandigarh.webp" },
  { slug: "office-building-kakadeo", title: "Office Building Solar System", location: "Kakadeo, Kanpur", image: "/images/hero-solar-farm.webp" },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((p) => p.slug === slug);
}
