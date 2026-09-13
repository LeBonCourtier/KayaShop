import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Comment passer une commande sur KayaShop ?',
      answer:
        'C’est très simple et rapide : cliquez sur le bouton "Commander maintenant", et validez directement votre commande. Notre équipe prépare votre colis immédiatement.',
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
        'Notre équipe est disponible 7j/7 pour toute question, conseil d’utilisation ou suivi de votre livraison.',
      category: 'Contact',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-white border-t border-zinc-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#d94f26]/10 text-[#d94f26] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ASSISTANCE & INFORMATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight">
            Questions fréquentes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            Tout ce qu'il faut savoir sur vos commandes, la livraison au Bénin et nos engagements de qualité.
          </p>
        </div>

        {/* Centered FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 overflow-hidden transition-all duration-200 hover:border-zinc-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="font-extrabold text-xs sm:text-sm text-zinc-900 leading-snug">
                    {faq.question}
                  </span>
                  <span className="p-1 rounded-full bg-white border border-zinc-200 text-zinc-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/50 pt-3">
                    {faq.answer}
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
