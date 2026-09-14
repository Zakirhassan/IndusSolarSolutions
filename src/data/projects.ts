export type ProjectEntry = {
  slug: string;
  title: string;
  location: string;
  image: string;
};

// Placeholder entries — replace with Indus Solar Solutions' real project list
// (client name/type, location, capacity) once available.
export const projects: ProjectEntry[] = [
  { slug: "rooftop-solar-kidwai-nagar", title: "Rooftop Solar Installation", location: "Kidwai Nagar, Kanpur", image: "/images/technician-rooftop.jpg" },
  { slug: "residential-rooftop-kalyanpur", title: "Residential Rooftop System", location: "Kalyanpur, Kanpur", image: "/images/rooftop-installation.jpg" },
  { slug: "commercial-rooftop-panki", title: "Commercial Rooftop Array", location: "Panki Industrial Area, Kanpur", image: "/images/solar-farm-telangana.jpg" },
  { slug: "shop-office-civil-lines", title: "Shop & Office Solar Setup", location: "Civil Lines, Kanpur", image: "/images/solar-lake-chandigarh.jpg" },
  { slug: "factory-rooftop-kanpur-dehat", title: "Factory Rooftop Installation", location: "Kanpur Dehat", image: "/images/hero-solar-farm.jpg" },
  { slug: "ground-mount-kanpur-outskirts", title: "Ground-Mount Solar System", location: "Kanpur Outskirts", image: "/images/technician-rooftop.jpg" },
  { slug: "residential-upgrade-swaroop-nagar", title: "Residential Solar Upgrade", location: "Swaroop Nagar, Kanpur", image: "/images/rooftop-installation.jpg" },
  { slug: "cold-storage-kanpur-dehat", title: "Cold Storage Rooftop Solar", location: "Kanpur Dehat", image: "/images/solar-farm-telangana.jpg" },
  { slug: "shop-rooftop-naveen-market", title: "Shop Rooftop Installation", location: "Naveen Market, Kanpur", image: "/images/solar-lake-chandigarh.jpg" },
  { slug: "office-building-kakadeo", title: "Office Building Solar System", location: "Kakadeo, Kanpur", image: "/images/hero-solar-farm.jpg" },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((p) => p.slug === slug);
}
