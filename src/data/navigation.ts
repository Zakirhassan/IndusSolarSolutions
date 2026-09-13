export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; items: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

export const navGroups: NavEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "Solar Solutions",
    items: [
      { label: "Solar Panel Installation", href: "/solar-panel-installation-kanpur" },
      { label: "Rooftop Solar", href: "/rooftop-solar-kanpur" },
      { label: "Residential Solar", href: "/residential-solar-kanpur" },
      { label: "Commercial Solar", href: "/commercial-solar-kanpur" },
      { label: "Industrial Solar", href: "/industrial-solar-kanpur" },
    ],
  },
  {
    label: "Solar Systems",
    items: [
      { label: "1kW System", href: "/1kw-solar-system-kanpur" },
      { label: "2kW System", href: "/2kw-solar-system-kanpur" },
      { label: "3kW System", href: "/3kw-solar-system-kanpur" },
      { label: "5kW System", href: "/5kw-solar-system-kanpur" },
      { label: "10kW System", href: "/10kw-solar-system-kanpur" },
    ],
  },
  { label: "Solar Calculator", href: "/solar-calculator-kanpur" },
  {
    label: "Solar Subsidy",
    items: [
      { label: "Solar Subsidy in Kanpur", href: "/solar-subsidy-kanpur" },
      { label: "PM Surya Ghar", href: "/pm-surya-ghar-kanpur" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
