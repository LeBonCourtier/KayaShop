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
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-10 sm:pb-16 bg-gradient-to-b from-[#faf5ef] via-[#fcfbf9] to-[#fbf9f6]">
      {/* Soft Animated Decorative Ambient Orbs */}
      <div className="absolute -top-12 left-1/4 w-80 h-80 bg-orange-200/35 rounded-full blur-3xl animate-subtle-float pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl animate-subtle-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">

            {/* Open, Warm & Catchy Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-[1.18]">
              Des pépites pratiques qui vous facilitent la vie au{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d94f26] via-[#eb5a2d] to-[#f97316]">
                quotidien.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Faites-vous plaisir avec des objets malins, utiles et testés avec soin. Commandez en toute simplicité, inspectez votre colis à l'arrivée et réglez à la livraison !
            </p>

            {/* CTAs with animated shimmer & hover effects */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto btn-shimmer bg-gradient-to-r from-[#d94f26] via-[#e5572b] to-[#f97316] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-sm py-4 px-8 rounded-2xl shadow-lg shadow-[#d94f26]/30 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 hover:scale-[1.02] cursor-pointer animate-pulse-glow"
              >
                <span>DÉCOUVRIR LES PRODUITS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Compact Trust Chips with subtle hover bounce */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs text-zinc-700 font-medium">
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs hover:border-emerald-300 transition-all hover:scale-105">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Paiement à la livraison</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs hover:border-orange-300 transition-all hover:scale-105">
                <Truck className="w-4 h-4 text-[#d94f26] shrink-0" />
                <span>Livraison 24h/48h Bénin</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs hover:border-emerald-300 transition-all hover:scale-105">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Colis vérifié</span>
              </span>
            </div>

          </div>

          {/* Right Visual Card with floating physics */}
          <div className="lg:col-span-5">
            {featuredProduct && (
              <div
                onClick={() => onSelectProduct(featuredProduct)}
                className="relative bg-white rounded-3xl p-4 sm:p-6 border border-zinc-200/90 shadow-xl shadow-zinc-200/50 hover:shadow-2xl group cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Rating Badge */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-zinc-200 text-xs font-black text-zinc-900 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{featuredProduct.rating.toFixed(1)}</span>
                </div>

                {/* Product Image with smooth hover scale */}
                <div className="aspect-square w-full rounded-2xl bg-[#faf7f2]/60 border border-zinc-100/80 p-4 sm:p-6 flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={featuredProduct.images[0]?.url}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info & Price */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 block">
                    {featuredProduct.category}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-xl text-zinc-900 group-hover:text-[#d94f26] transition-colors line-clamp-1">
                    {featuredProduct.name}
                  </h3>

                  <div className="pt-2.5 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 block font-semibold uppercase">Prix direct :</span>
                      <span className="text-base sm:text-xl font-black text-zinc-950">
                        {formatPrice(featuredProduct.price, featuredProduct.currency)}
                      </span>
                    </div>
                    <span className="btn-shimmer px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-[#d94f26]/20 transition-all group-hover:scale-105">
                      <span>Commander</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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
