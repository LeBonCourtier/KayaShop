import React from 'react';
import { Wine, HeartPulse, Layers, ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const categories = [
    {
      id: 'all',
      name: 'Tous les produits',
      label: 'Catalogue Global',
      icon: Layers,
      count: 2,
      color: 'from-zinc-800 to-zinc-950',
    },
    {
      id: 'Maison & Art de la table',
      name: 'Maison & Art de la table',
      label: 'Praticité & Dégustation',
      icon: Wine,
      count: 1,
      color: 'from-[#d94f26] to-[#eb5a2d]',
    },
    {
      id: 'Santé & Bien-être',
      name: 'Santé & Bien-être',
      label: 'Santé à domicile',
      icon: HeartPulse,
      count: 1,
      color: 'from-teal-600 to-emerald-700',
    },
  ];

  return (
    <section className="py-8 sm:py-12 border-y border-zinc-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
              Univers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2 tracking-tight">
              Explorez nos Catégories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm">
            Trouvez rapidement l'article adapté à vos besoins quotidiens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-5 rounded-2xl border-2 transition-all duration-200 text-left flex items-start justify-between group cursor-pointer ${
                  isSelected
                    ? 'border-[#d94f26] bg-[#fffaf8] shadow-md scale-101'
                    : 'border-zinc-200 hover:border-zinc-300 bg-[#faf8f5]'
                }`}
              >
                <div className="space-y-2">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-zinc-900 group-hover:text-[#d94f26] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{cat.label}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-zinc-700 border border-zinc-200">
                    {cat.count} article{cat.count > 1 ? 's' : ''}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg transition-transform group-hover:translate-x-1 ${
                      isSelected ? 'text-[#d94f26]' : 'text-zinc-400'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
