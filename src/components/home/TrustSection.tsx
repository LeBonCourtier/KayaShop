import React from 'react';
import { ShieldCheck, Truck, Headphones, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Paiement à la Livraison',
      desc: 'Vous ouvrez et vérifiez votre colis avant de régler en espèces au livreur.',
    },
    {
      icon: Truck,
      title: 'Expédition Rapide',
      desc: 'Livraison sous 24h à 48h ouvrées dans toutes les villes avec contact direct.',
    },
    {
      icon: CheckCircle2,
      title: 'Qualité 100% Garantie',
      desc: 'Chaque appareil est testé avant expédition. Échange garanti sous 48h.',
    },
    {
      icon: Headphones,
      title: 'Assistance WhatsApp',
      desc: 'Une équipe humaine et réactive au +229 43 79 70 42 pour vous assister.',
    },
  ];

  return (
    <section className="py-6 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-2.5 py-0.5 rounded-full border border-[#fbdcd2]">
          Sécurité & Sérénité
        </span>
        <h2 className="text-lg sm:text-2xl font-black text-zinc-900 mt-1.5 tracking-tight">
          Pourquoi Acheter sur KayaShop ?
        </h2>
        <p className="text-[11px] sm:text-xs text-zinc-600 mt-1">
          Un service d'achat en ligne honnête, transparent et sécurisé au Bénin.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-3 sm:p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex flex-col items-start"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#fff5f2] border border-[#fbdcd2] flex items-center justify-center text-[#d94f26] mb-2">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-zinc-900 mb-0.5 leading-snug">
                {p.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-zinc-500 leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
};
