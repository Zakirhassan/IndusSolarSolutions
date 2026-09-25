import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { business } from "../data/site";

type EmailLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  // Lays out the link's contents around the address text (e.g. an icon above it).
  render?: (address: string) => ReactNode;
};

// The prerendered HTML only carries an obfuscated "info [at] domain" form so
// scrapers (and audit tools' "plain-text email" check) don't pick the address
// up; the real mailto: link is assembled in the browser after hydration.
export default function EmailLink({ render = (address) => address, ...props }: EmailLinkProps) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => setRevealed(true), []);

  const [user, domain] = business.email.split("@");
  const address = revealed ? `${user}@${domain}` : `${user} [at] ${domain}`;
  return (
    <a href={revealed ? `mailto:${address}` : "/contact"} {...props}>
      {render(address)}
    </a>
  );
}
