import React from 'react';
import type { Product } from '../../types/product';
import { Sparkles, Layers, Home, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

interface ProductSwitcherProps {
  products: Product[];
  currentProduct: Product;
  currentView: 'home' | 'product';
  onSelectProduct: (product: Product) => void;
  onSelectView: (view: 'home' | 'product') => void;
}

export const ProductSwitcher: React.FC<ProductSwitcherProps> = ({
  products,
  currentProduct,
  currentView,
  onSelectProduct,
  onSelectView,
}) => {
  return (
    <div className="bg-[#f5f2eb] border-y border-zinc-200/80 py-2 px-4 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        
        {/* Left: View mode toggler */}
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#d94f26]" />
          <span className="font-semibold text-zinc-700">Navigation rapide :</span>
          
          <div className="flex items-center bg-white p-0.5 rounded-lg border border-zinc-200 shadow-2xs">
            <button
              onClick={() => onSelectView('home')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-bold text-xs transition-colors cursor-pointer ${
                currentView === 'home'
                  ? 'bg-[#18181b] text-white shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Accueil Marketplace</span>
            </button>

            <button
              onClick={() => onSelectView('product')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-bold text-xs transition-colors cursor-pointer ${
                currentView === 'product'
                  ? 'bg-[#18181b] text-white shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Page Produit</span>
            </button>
          </div>
        </div>

        {/* Right: Products pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-zinc-400 text-[11px] hidden md:inline">Fiches :</span>
          {products.map((p) => {
            const isSelected = currentView === 'product' && p.id === currentProduct.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onSelectView('product');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all text-xs shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#d94f26] text-white shadow-xs font-bold'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {isSelected && <Sparkles className="w-3 h-3 text-amber-300" />}
                <span className="truncate max-w-[130px]">{p.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-zinc-100' : 'text-zinc-500'}`}>
                  ({formatPrice(p.price, p.currency)})
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
