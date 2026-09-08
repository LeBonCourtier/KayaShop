import React from 'react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { Star, ArrowRight } from 'lucide-react';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
  onSelectProduct: (product: Product) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  currentProductId,
  onSelectProduct,
}) => {
  const filtered = products.filter((p) => p.id !== currentProductId);

  if (filtered.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
            Découverte
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-3 tracking-tight">
            Vous pourriez aussi aimer
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Explorez d'autres produits pratiques sélectionnés par KayaShop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const mainImg = product.images[0]?.url || '';
            return (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-3xl border border-zinc-200/80 p-5 shadow-2xs hover:shadow-md hover:border-[#d94f26]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl bg-zinc-50 border border-zinc-100 p-4 flex items-center justify-center overflow-hidden mb-4">
                    <img
                      src={mainImg}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-zinc-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                    <span className="text-xs font-bold text-zinc-800">{product.rating.toFixed(1)}</span>
                    <span className="text-xs text-zinc-400">({product.reviewCount} avis)</span>
                  </div>

                  <h3 className="font-bold text-base text-zinc-900 group-hover:text-[#d94f26] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {product.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-zinc-900">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#d94f26] group-hover:translate-x-1 transition-transform">
                    Voir la fiche
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
