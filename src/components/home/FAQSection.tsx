import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, PhoneCall, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Comment passer une commande sur KayaShop ?',
      answer:
        'C’est très simple et rapide : cliquez sur le bouton "Commander maintenant", renseignez votre nom, numéro de téléphone et ville de livraison. Vous pouvez également commander en un clic directement par WhatsApp avec notre équipe.',
      category: 'Commande',
    },
    {
      question: 'Quelles sont les villes et délais de livraison au Bénin ?',
      answer:
        'Nous livrons à Cotonou, Abomey-Calavi, Porto-Novo, Parakou, Bohicon, Abomey, Ouidah et partout au Bénin. À Cotonou et Calavi, la livraison s’effectue généralement le jour même ou sous 24h ouvrées. Pour les autres villes, comptez 24h à 48h.',
      category: 'Livraison',
    },
    {
      question: 'Quels sont les frais de livraison ?',
      answer:
        'Les frais de livraison sont calculés au plus juste : 1 000 FCFA à Cotonou (Haie Vive, Cadjèhoun, Akpakpa, Fidjrossè, etc.), 1 500 FCFA à Abomey-Calavi (Godomey, Arconville, Zogbadjè), 2 000 FCFA à Porto-Novo et 2 500 FCFA pour Parakou et l’intérieur du pays.',
      category: 'Tarifs',
    },
    {
      question: 'Puis-je vérifier le produit avant de payer ?',
      answer:
        'Oui, absolument ! Le livreur vous remet le colis, vous l’ouvrez, vérifiez l’état du produit et sa conformité. Vous ne réglez qu’après avoir constaté que tout est en ordre (en espèces ou par Mobile Money).',
      category: 'Paiement',
    },
    {
      question: 'Quels sont les modes de paiement acceptés ?',
      answer:
        'Vous pouvez payer en espèces à la livraison directement au livreur, ou par transfert Mobile Money (MTN Mobile Money / Moov Money) au moment de la réception de votre commande.',
      category: 'Paiement',
    },
    {
      question: 'Les produits sont-ils garantis ? Que faire en cas de souci ?',
      answer:
        'Tous nos appareils bénéficient d’une garantie de conformité. Si vous constatez le moindre défaut à la réception ou lors de la première utilisation, notre service client basé au Bénin procède à un échange immédiat ou à un remboursement.',
      category: 'Garantie',
    },
    {
      question: 'Comment joindre le service client ?',
      answer:
        'Notre équipe est disponible 7j/7 sur WhatsApp au +229 43 79 70 42 pour toute question, conseil d’utilisation ou suivi de votre livraison.',
      category: 'Contact',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-white border-t border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3.5 py-1.5 rounded-full border border-[#fbdcd2] shadow-2xs">
            Centre d’Aide & Questions
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mt-3 tracking-tight">
            Foire Aux Questions (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            Tout ce que vous devez savoir sur vos commandes, la livraison au Bénin et le paiement à réception.
          </p>
        </div>

        {/* 2-Columns Layout: FAQ Accordion + WhatsApp Support Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordion list */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200/90 bg-[#faf8f5] overflow-hidden shadow-2xs transition-all hover:border-zinc-300"
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
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/60 bg-white">
                      <p className="pt-2">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* WhatsApp Direct Assistance Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#18181b] to-[#27272a] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Une autre question ?</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                Notre conseiller KayaShop est à votre disposition en direct pour vous aider à commander ou suivre votre colis.
              </p>
            </div>

            <div className="space-y-2.5 pt-1 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#d94f26]" />
                <span>Livraison 24h partout au Bénin</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Contrôle du colis avant paiement</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Espèces ou Mobile Money</span>
              </div>
            </div>

            <a
              href="https://wa.me/22943797042?text=Bonjour%20KayaShop,%20j'ai%20une%20question%20sur%20vos%20produits"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Écrire sur WhatsApp (+229 43 79 70 42)</span>
            </a>

            <div className="pt-2 text-center text-[11px] text-zinc-400 flex items-center justify-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-zinc-500" />
              <span>Assistance disponible 7j/7 de 8h à 21h</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
