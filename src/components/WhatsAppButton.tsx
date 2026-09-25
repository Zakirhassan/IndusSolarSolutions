import { business } from "../data/site";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-[#25D366]">
      <path d="M16.01 3C9.38 3 4 8.34 4 14.92c0 2.24.62 4.34 1.7 6.14L4 29l8.14-1.65a12.9 12.9 0 0 0 3.87.6c6.63 0 12.01-5.34 12.01-11.92C28.02 8.34 22.64 3 16.01 3zm7.05 16.98c-.3.85-1.5 1.56-2.46 1.76-.65.13-1.5.24-4.36-.93-3.66-1.5-6.02-5.23-6.2-5.47-.18-.24-1.48-1.97-1.48-3.76 0-1.79.94-2.66 1.27-3.02.33-.36.72-.45.96-.45s.48 0 .69.01c.22.01.52-.08.81.62.3.72 1.02 2.5 1.11 2.68.09.18.15.4.03.64-.12.24-.18.4-.36.6-.18.2-.38.46-.54.62-.18.18-.37.38-.16.75.21.37.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.9 1.78.37.18.59.15.81-.09.22-.24.93-1.08 1.18-1.45.24-.37.49-.31.82-.19.34.13 2.14 1.01 2.51 1.2.37.18.61.27.7.42.09.15.09.88-.21 1.73z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  return (
    <a
      href={business.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-full bg-[#15803d] py-2.5 pl-2.5 pr-5 text-sm font-semibold text-white shadow-xl transition hover:scale-105"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
        <WhatsAppGlyph />
      </span>
      WhatsApp Us
    </a>
  );
}
