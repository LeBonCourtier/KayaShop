import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../utils/formatters';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface StickyBuyBarProps {
  productName: string;
  price: number;
  currency?: string;
  thumbnailUrl: string;
  onBuyNow: () => void;
  onAddToCart: () => void;
  inStock?: boolean;
}

export const StickyBuyBar: React.FC<StickyBuyBarProps> = ({
  productName,
  price,
  currency = 'FCFA',
  thumbnailUrl,
  onBuyNow,
  onAddToCart,
  inStock = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once scrolled past 420px (past hero buy box)
      if (window.scrollY > 420) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Barre d'achat rapide"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/90 py-2.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 transform translate-y-0"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Thumbnail & Price */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={thumbnailUrl}
            alt={productName}
            className="w-10 h-10 rounded-lg object-contain bg-zinc-50 border border-zinc-200 p-0.5 shrink-0 hidden xs:block"
          />
          <div className="truncate">
            <p className="text-xs text-zinc-500 font-medium truncate hidden sm:block">
              {productName}
            </p>
            <p className="text-base sm:text-lg font-extrabold text-zinc-950 tracking-tight leading-tight">
              {formatPrice(price, currency)}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onAddToCart}
            className="p-2.5 rounded-xl border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button
            onClick={onBuyNow}
            disabled={!inStock}
            className="bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-bold text-sm px-5 py-2.5 sm:py-3 rounded-xl shadow-md shadow-[#d94f26]/25 flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
          >
            <span>COMMANDER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
