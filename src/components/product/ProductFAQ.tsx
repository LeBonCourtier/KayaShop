import React, { useState } from 'react';
import type { ProductFAQ as FAQItem } from '../../types/product';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface ProductFAQProps {
  faqs: FAQItem[];
}

export const ProductFAQ: React.FC<ProductFAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-12 sm:py-16 border-t border-zinc-200/80 my-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3.5 py-1.5 rounded-full border border-[#fbdcd2] shadow-2xs">
            Centre d'Aide
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mt-3 tracking-tight">
            Questions Fréquentes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            Retrouvez les réponses aux questions les plus courantes avant de commander.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200/90 bg-white overflow-hidden shadow-2xs transition-all hover:border-zinc-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-zinc-900 gap-3 cursor-pointer hover:text-[#d94f26] transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#d94f26] shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 bg-[#faf8f5]/50">
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
