import React, { useState } from 'react';
import type { ProductFAQ as FAQItem } from '../../types/product';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, PhoneCall, ShieldCheck, Truck } from 'lucide-react';

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ list */}
          <div className="lg:col-span-8 space-y-3">
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

          {/* WhatsApp Support Box */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#18181b] to-[#27272a] rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-extrabold text-sm sm:text-base">Besoin d'un conseil ?</h3>
              <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                Notre équipe est joignable directement sur WhatsApp pour répondre à vos questions et enregistrer votre commande.
              </p>
            </div>

            <div className="space-y-2 text-[11px] text-zinc-300 pt-1">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#d94f26]" />
                <span>Livraison 24h partout au Bénin</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contrôle du colis avant paiement</span>
              </div>
            </div>

            <a
              href="https://wa.me/22943797042?text=Bonjour%20KayaShop,%20j'ai%20une%20question%20sur%20vos%20produits"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp : +229 43 79 70 42</span>
            </a>

            <div className="text-center text-[10px] text-zinc-400 flex items-center justify-center gap-1">
              <PhoneCall className="w-3 h-3 text-zinc-500" />
              <span>Support client 7j/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
