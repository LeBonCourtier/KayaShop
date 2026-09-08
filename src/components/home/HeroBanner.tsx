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
  const featuredProduct = products[0]; // Ouvre-vin ou tensiometre

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 bg-gradient-to-b from-[#faf7f2] via-[#fbf9f6] to-[#fbf9f6]">
      
      {/* Decorative floating animated background blobs */}
      <div className="absolute top-0 right-1/4 -mt-16 w-96 h-96 bg-[#d94f26]/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-0 left-10 -mb-16 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-slide-up">

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight leading-[1.12]">
              Les innovations utiles qui simplifient votre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d94f26] via-[#eb5a2d] to-[#f97316]">
                quotidien.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Sélection exclusive d'appareils fiables, testés et livrés rapidement chez vous. Contrôlez votre colis avant de régler.
            </p>

            {/* CTAs with Shimmer Animation */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto btn-shimmer bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-sm sm:text-base py-4 px-8 rounded-2xl shadow-lg shadow-[#d94f26]/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-98 hover:scale-[1.02] cursor-pointer group"
              >
                <span>DÉCOUVRIR LES PRODUITS</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={() => {
                  if (featuredProduct) onSelectProduct(featuredProduct);
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 shadow-2xs transition-all hover:border-zinc-400 hover:scale-[1.01] cursor-pointer"
              >
                Voir le produit vedette
              </button>
            </div>

            {/* Trust Points under CTA */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-zinc-600">
              <span className="flex items-center gap-1.5 font-medium transition-transform hover:scale-105">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Paiement à la livraison</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium transition-transform hover:scale-105">
                <Truck className="w-4 h-4 text-[#d94f26]" />
                <span>Livraison 24h/48h</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium transition-transform hover:scale-105">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Colis vérifié</span>
              </span>
            </div>

          </div>

          {/* Right Visual Showcase Card with card-lift physics */}
          <div className="lg:col-span-5 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            {featuredProduct && (
              <div
                onClick={() => onSelectProduct(featuredProduct)}
                className="card-lift relative bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xl group cursor-pointer"
              >

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-[#faf8f5] px-2.5 py-1 rounded-full border border-zinc-200 text-xs font-bold text-zinc-800 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{featuredProduct.rating.toFixed(1)}</span>
                </div>

                {/* Product Image Frame */}
                <div className="aspect-square w-full rounded-2xl bg-[#faf7f2] border border-zinc-100 p-6 flex items-center justify-center overflow-hidden mb-5">
                  <img
                    src={featuredProduct.images[0]?.url}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info & Price */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-zinc-400">
                    {featuredProduct.category}
                  </span>
                  <h3 className="font-extrabold text-lg sm:text-xl text-zinc-900 group-hover:text-[#d94f26] transition-colors line-clamp-1">
                    {featuredProduct.name}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {featuredProduct.tagline}
                  </p>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-zinc-400 block font-medium">Prix direct :</span>
                      <span className="text-xl font-black text-zinc-950">
                        {formatPrice(featuredProduct.price, featuredProduct.currency)}
                      </span>
                    </div>
                    <span className="px-4 py-2.5 rounded-xl bg-[#d94f26] group-hover:bg-[#c03d15] text-white font-bold text-xs flex items-center gap-1.5 transition-all group-hover:shadow-md shadow-sm">
                      <span>Commander</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
