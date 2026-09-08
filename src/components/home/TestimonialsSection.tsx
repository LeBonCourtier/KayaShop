import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 't-1',
      author: 'Rodrigue Hounkpatin',
      city: 'Cotonou (Haie Vive)',
      product: 'Ouvre-vin électrique',
      rating: 5,
      comment:
        "Commande livrée le lendemain à la Haie Vive. J'ai pu ouvrir et tester l'ouvre-vin avant de payer le livreur. Très professionnel !",
      date: 'Il y a 3 jours',
    },
    {
      id: 't-2',
      author: 'Aïchatou Dossou',
      city: 'Calavi (Arconville)',
      product: 'Tensiomètre électrique rechargeable',
      rating: 5,
      comment:
        'Acheté pour mes parents à Calavi. Les chiffres sont très grands, recharge USB super pratique. Service client très à l’écoute sur WhatsApp.',
      date: 'Il y a 5 jours',
    },
    {
      id: 't-3',
      author: 'Christian Mensah',
      city: 'Porto-Novo (Ouando)',
      product: 'Ouvre-vin électrique',
      rating: 5,
      comment:
        'Le set complet est superbe avec le bouchon sous vide et le bec verseur. Deuxième achat sur KayaShop et toujours satisfait !',
      date: 'Il y a 1 semaine',
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#faf7f2] border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-white px-3 py-1 rounded-full border border-zinc-200 shadow-2xs">
            Témoignages
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mt-3 tracking-tight">
            Ce que disent nos clients au Bénin
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            Des avis réels recueillis auprès de nos clients livrés à Cotonou, Calavi, Porto-Novo, Parakou et partout au Bénin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    Achat vérifié
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-zinc-900">{t.author}</p>
                  <p className="text-zinc-400 text-[11px]">{t.city}</p>
                </div>
                <span className="text-[10px] font-semibold text-[#d94f26] bg-[#fff5f2] px-2 py-1 rounded-lg">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
