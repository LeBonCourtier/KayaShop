import React from 'react';
import { ShieldCheck, Truck, Headphones, CheckCircle2 } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const guarantees = [
    {
      icon: CheckCircle2,
      title: 'Produit 100% authentique',
      desc: 'Article testé et conforme aux photos',
    },
    {
      icon: Truck,
      title: 'Livraison rapide & soignée',
      desc: 'Expédition sous 24h à 48h ouvrées',
    },
    {
      icon: Headphones,
      title: 'Assistance client réactive',
      desc: 'Support disponible 7j/7 pour vos questions',
    },
    {
      icon: ShieldCheck,
      title: 'Vérification à la réception',
      desc: 'Contrôlez votre colis avant utilisation',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      {guarantees.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#faf8f5] border border-zinc-200/70"
          >
            <div className="p-1.5 rounded-lg bg-white text-[#d94f26] shadow-2xs shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-900 leading-tight">{item.title}</p>
              <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
