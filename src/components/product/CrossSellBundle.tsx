import React, { useState } from 'react';
import type { ComplementaryProduct } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { Plus, Check } from 'lucide-react';

interface CrossSellBundleProps {
  complementaryProducts?: ComplementaryProduct[];
  onAddComplementary: (item: ComplementaryProduct) => void;
}

export const CrossSellBundle: React.FC<CrossSellBundleProps> = ({
  complementaryProducts,
  onAddComplementary,
}) => {
  const [addedIds, setAddedIds] = useState<string[]>([]);

  if (!complementaryProducts || complementaryProducts.length === 0) return null;

  const handleToggle = (item: ComplementaryProduct) => {
    onAddComplementary(item);
    setAddedIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  return (
    <section className="py-8 my-6 p-6 rounded-2xl bg-[#fffaf8] border border-[#fbdcd2]">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-[#d94f26]" />
        <h3 className="font-extrabold text-base text-zinc-900">
          Complétez votre commande
        </h3>
      </div>

      <div className="space-y-3">
        {complementaryProducts.map((item) => {
          const isAdded = addedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-zinc-200/80 shadow-2xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-contain bg-zinc-50 border border-zinc-100 p-1 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 truncate">{item.tagline}</p>
                  <p className="text-xs font-extrabold text-[#d94f26] mt-0.5">
                    +{formatPrice(item.price)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggle(item)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-zinc-900 text-white hover:bg-[#d94f26]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Ajouté</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
