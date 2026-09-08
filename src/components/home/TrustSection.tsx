import React from 'react';
import { ShieldCheck, Truck, Headphones, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Paiement à la Livraison',
      desc: 'Aucun paiement en ligne forcé. Vous ouvrez et vérifiez votre colis avant de régler au livreur.',
    },
    {
      icon: Truck,
      title: 'Expédition Rapide & Suivie',
      desc: 'Livraison express sous 24h à 48h ouvrées dans les principales métropoles avec contact direct.',
    },
    {
      icon: CheckCircle2,
      title: 'Qualité 100% Garantie',
      desc: 'Chaque appareil est scrupuleusement testé avant emballage. Satisfait ou échangé sous 48h.',
    },
    {
      icon: Headphones,
      title: 'Assistance WhatsApp 7j/7',
      desc: 'Une équipe humaine et disponible pour vous conseiller, guider et suivre vos livraisons.',
    },
  ];

  return (
    <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
          Sécurité & Sérénité
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mt-3 tracking-tight">
          Pourquoi Acheter sur KayaShop ?
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2">
          Nous supprimons toutes les craintes liées aux achats en ligne grâce à un service honnête et transparent.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-[#d94f26]/40 transition-all duration-300 flex flex-col items-start group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#fff5f2] border border-[#fbdcd2] flex items-center justify-center text-[#d94f26] mb-4 transition-transform group-hover:scale-110">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-zinc-900 mb-2 group-hover:text-[#d94f26] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
};
