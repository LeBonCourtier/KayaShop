import React from 'react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { ShieldCheck, ArrowRight, Truck, Star, CheckCircle } from 'lucide-react';

interface HeroBannerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreProducts: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  products,
  onSelectProduct,
  onExploreProducts,
}) => {
  const featuredProduct = products[0];

  return (
    <section className="relative overflow-hidden pt-3 pb-6 sm:pt-8 sm:pb-16 bg-gradient-to-b from-[#faf7f2] via-[#fbf9f6] to-[#fbf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-6 text-center lg:text-left">
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-[1.15]">
              Les innovations utiles qui simplifient votre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d94f26] via-[#eb5a2d] to-[#f97316]">
                quotidien.
              </span>
            </h1>

            <p className="text-xs sm:text-base text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Sélection exclusive d'appareils fiables, testés et livrés rapidement chez vous. Contrôlez votre colis avant de régler.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 pt-1">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-xs sm:text-sm py-3.5 px-7 rounded-2xl shadow-md shadow-[#d94f26]/20 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
              >
                <span>DÉCOUVRIR LES PRODUITS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Compact Trust Chips */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-zinc-600">
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-zinc-200 shadow-2xs">
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                <span>Paiement à la livraison</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-zinc-200 shadow-2xs">
                <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d94f26]" />
                <span>Livraison 24h/48h</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-zinc-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Colis vérifié</span>
              </span>
            </div>

          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            {featuredProduct && (
              <div
                onClick={() => onSelectProduct(featuredProduct)}
                className="relative bg-white rounded-3xl p-3.5 sm:p-6 border border-zinc-200/90 shadow-md group cursor-pointer"
              >
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-[#faf8f5] px-2 py-0.5 rounded-full border border-zinc-200 text-[10px] font-bold text-zinc-800">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{featuredProduct.rating.toFixed(1)}</span>
                </div>

                {/* Product Image */}
                <div className="aspect-square w-full rounded-2xl bg-white border border-zinc-100 p-3 sm:p-4 flex items-center justify-center overflow-hidden mb-2.5">
                  <img
                    src={featuredProduct.images[0]?.url}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Info & Price */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">
                    {featuredProduct.category}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-lg text-zinc-900 group-hover:text-[#d94f26] transition-colors line-clamp-1">
                    {featuredProduct.name}
                  </h3>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 block font-medium">Prix direct :</span>
                      <span className="text-sm sm:text-lg font-black text-zinc-950">
                        {formatPrice(featuredProduct.price, featuredProduct.currency)}
                      </span>
                    </div>
                    <span className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#d94f26] text-white font-bold text-xs flex items-center gap-1">
                      <span>Commander</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
