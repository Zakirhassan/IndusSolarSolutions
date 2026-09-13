import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { question: string; answer: string };

export default function Faq({ items, heading = "Frequently Asked Questions" }: { items: FaqItem[]; heading?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">{heading}</h2>
        <div className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-sm font-semibold text-ink md:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gold-dark transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-muted md:text-base">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
