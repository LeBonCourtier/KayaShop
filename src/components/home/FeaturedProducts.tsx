import React from 'react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickBuy,
  onAddToCart,
}) => {
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalog" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header with Title and Category Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
            Catalogue KayaShop
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 mt-3 tracking-tight">
            Nos Produits Vedettes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            Sélectionnés pour leur efficacité, leur robustesse et leur facilité d'utilisation.
          </p>
        </div>

        {/* Filter Pills with smooth bounce */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {['all', 'Maison & Art de la table', 'Santé & Bien-être'].map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95 shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#18181b] text-white shadow-md scale-102'
                  : 'bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {cat === 'all' ? 'Tous les produits' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid with card-lift physics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="card-lift bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-7 shadow-xs flex flex-col justify-between group"
            >
              <div>
                {/* Image Showcase with Zoom */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-square w-full rounded-2xl bg-[#faf7f2] border border-zinc-100 p-6 flex items-center justify-center overflow-hidden mb-5 cursor-pointer"
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108"
                  />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-zinc-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs">
                    {product.category}
                  </span>

                  {/* Stock Tag with pulse */}
                  <span className="absolute bottom-3 left-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En stock
                  </span>
                </div>

                {/* Rating & Review */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <span className="text-xs font-bold text-zinc-900">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-zinc-400">({product.reviewCount} avis certifiés)</span>
                </div>

                {/* Name */}
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="font-black text-lg sm:text-xl text-zinc-900 group-hover:text-[#d94f26] transition-colors cursor-pointer line-clamp-1"
                >
                  {product.name}
                </h3>

                {/* Short Tagline */}
                <p className="text-xs sm:text-sm text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                  {product.valueProposition || product.tagline}
                </p>
              </div>

              {/* Price & Action Buttons */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-zinc-400 block font-medium">Prix spécial :</span>
                  <span className="text-2xl font-black text-zinc-950">
                    {formatPrice(product.price, product.currency)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-3 rounded-xl border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-all transform active:scale-90 hover:scale-105 cursor-pointer shadow-2xs"
                    title="Ajouter au panier"
                    aria-label="Ajouter au panier"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onQuickBuy(product)}
                    className="flex-1 sm:flex-none btn-shimmer px-5 py-3 rounded-xl bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#d94f26]/20 flex items-center justify-center gap-1.5 transition-all transform active:scale-95 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Commander</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
