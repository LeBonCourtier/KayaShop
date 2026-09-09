import React from 'react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProductSpotlightProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

export const ProductSpotlight: React.FC<ProductSpotlightProps> = ({
  product,
  onSelectProduct,
  onQuickBuy,
}) => {
  if (!product) return null;

  return (
    <section className="py-12 sm:py-20 bg-[#faf7f2] border-y border-zinc-200/80 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-zinc-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Big Showcase Image */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div
              onClick={() => onSelectProduct(product)}
              className="relative aspect-square max-h-[400px] w-full rounded-2xl bg-[#faf8f5] border border-zinc-100 p-8 flex items-center justify-center group cursor-pointer overflow-hidden"
            >
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute top-4 left-4 bg-zinc-900 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          </div>

          {/* Right: Content & Value Prop */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <h2
              onClick={() => onSelectProduct(product)}
              className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight cursor-pointer hover:text-[#d94f26] transition-colors leading-tight"
            >
              {product.name}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.detailedDescription}
            </p>

            {/* Key Benefits Checklist */}
            <div className="space-y-2.5 pt-2">
              {product.benefits.slice(0, 3).map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-zinc-900">{b.title} :</strong>{' '}
                    <span className="text-zinc-600">{b.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price & Buy Now */}
            <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-400 block font-medium">Prix promotionnel :</span>
                <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                  {formatPrice(product.price, product.currency)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="px-5 py-3.5 rounded-xl border border-zinc-300 font-bold text-xs sm:text-sm text-zinc-800 hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  Détails complets
                </button>

                <button
                  onClick={() => onQuickBuy(product)}
                  className="btn-shimmer px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d94f26] via-[#e5572b] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#d94f26]/20 flex items-center gap-2 transition-all transform active:scale-95 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Commander maintenant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
