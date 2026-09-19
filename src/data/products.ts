export type ProductCategory = {
  slug: string;
  title: string;
  tagline: string;
  images: [string, string];
  intro: string;
  features: string[];
};

export const products: ProductCategory[] = [
  {
    slug: "panels",
    title: "Solar Panels",
    tagline: "High-efficiency modules for homes, shops and factories",
    images: ["/images/products/panels-1.webp", "/images/products/panels-2.webp"],
    intro:
      "We supply and install solar panels from trusted manufacturers, chosen for consistent output, durability, and long service life across Kanpur's varied weather. Whether you need a compact rooftop array for a home or a large industrial installation, we size and orient every panel for maximum generation.",
    features: [
      "High-efficiency mono PERC and bifacial panel options",
      "Rated for 25+ years of dependable performance",
      "Sized to your roof, budget and energy usage",
      "Backed by manufacturer performance warranties",
    ],
  },
  {
    slug: "inverter",
    title: "Solar Inverters",
    tagline: "Reliable power conversion with smart monitoring",
    images: ["/images/products/inverter-1.webp", "/images/products/inverter-2.webp"],
    intro:
      "The inverter is the heart of your solar system, converting the DC power your panels generate into usable AC power for your home or business. We install inverters with MPPT technology that adjusts continuously to changing sunlight, and app-based monitoring so you can track generation in real time.",
    features: [
      "MPPT technology for maximum energy harvest",
      "Real-time performance monitoring via app",
      "Sized for residential, commercial and industrial loads",
      "Hybrid options available with battery backup",
    ],
  },
  {
    slug: "structure",
    title: "Mounting Structure",
    tagline: "Rooftop and ground-mount structures built to last decades",
    images: ["/images/products/structure-1.webp", "/images/products/structure-2.webp"],
    intro:
      "A solar system is only as reliable as what holds it up. We install corrosion-resistant mounting structures engineered for rooftop, ground-mount and shed-roof installations, positioned at the correct tilt angle for maximum sunlight exposure through the year.",
    features: [
      "Corrosion-resistant, weather-tested materials",
      "Rooftop, ground-mount and carport options",
      "Engineered for local wind and load conditions",
      "Optimised tilt angle for maximum energy yield",
    ],
  },
  {
    slug: "bos",
    title: "Balance of System (BOS)",
    tagline: "The cables, connectors and protection gear that hold it all together",
    images: ["/images/products/bos-1.webp", "/images/products/bos-2.webp"],
    intro:
      "Beyond panels and inverters, every safe and efficient solar system depends on quality cabling, connectors, distribution boxes and protection devices. We use certified BOS components throughout every installation to keep your system safe, code-compliant and long-lasting.",
    features: [
      "Weather-rated solar cabling and connectors",
      "DCDB/ACDB distribution boxes",
      "Surge protection and earthing systems",
      "Installed to safety code on every project",
    ],
  },
  {
    slug: "kit",
    title: "Solar Kits",
    tagline: "Complete plug-and-play systems sized to your energy needs",
    images: ["/images/products/kit-1.webp", "/images/products/kit-2.webp"],
    intro:
      "For homeowners and small businesses who want a straightforward path to solar, we offer complete kits bundling panels, inverter, mounting structure and BOS components sized to your typical monthly usage — installed and commissioned as one package.",
    features: [
      "Complete system: panels, inverter, structure and cabling",
      "Sized from small rooftop homes to larger commercial loads",
      "Single point of contact from quote to commissioning",
      "Subsidy application assistance where eligible",
    ],
  },
  {
    slug: "battery",
    title: "Solar Batteries",
    tagline: "Store excess power for use after sunset or during outages",
    images: ["/images/products/battery-1.webp", "/images/products/battery-2.webp"],
    intro:
      "Battery storage lets you use the solar power you generate during the day even after the sun goes down, and keeps essential loads running during grid outages. We help you size a battery bank that matches your household or business's actual consumption pattern.",
    features: [
      "Backup power during local outages",
      "Store daytime generation for evening use",
      "Built-in overcharge and short-circuit protection",
      "Integrates with new or existing solar systems",
    ],
  },
  {
    slug: "drive",
    title: "Solar Drives & Pumping",
    tagline: "Solar-powered motor control for irrigation and water pumping",
    images: ["/images/products/drive-1.webp", "/images/products/drive-2.webp"],
    intro:
      "For agricultural and rural customers, we install solar drive systems that power water pumps directly from solar panels — cutting diesel and grid dependence for irrigation. Our drives include intelligent load and energy management to get the most out of available sunlight.",
    features: [
      "Direct solar-to-pump power for irrigation",
      "Reduces diesel and grid electricity costs",
      "Intelligent energy management for consistent output",
      "Suited to farms and off-grid rural sites",
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
