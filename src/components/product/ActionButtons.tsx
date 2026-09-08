import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Minus, Plus, Check, MessageCircle } from 'lucide-react';

interface ActionButtonsProps {
  onBuyNow: (quantity: number) => void;
  onAddToCart: (quantity: number) => void;
  onWhatsAppBuy?: (quantity: number) => void;
  inStock?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBuyNow,
  onAddToCart,
  onWhatsAppBuy,
  inStock = true,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleAddToCartClick = () => {
    onAddToCart(quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-2.5">
      {/* Quantity & Stock */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
          Quantité :
        </span>
        <div className="flex items-center border border-zinc-300 rounded-xl bg-white p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 cursor-pointer"
            aria-label="Diminuer"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-7 text-center font-bold text-xs text-zinc-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            disabled={quantity >= 10}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 cursor-pointer"
            aria-label="Augmenter"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Primary Row: Dominant Buy Now + Compact Cart Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onBuyNow(quantity)}
          disabled={!inStock}
          className="flex-1 bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md shadow-[#d94f26]/20 flex items-center justify-center gap-1.5 transition-all transform active:scale-98 cursor-pointer"
        >
          <span>COMMANDER MAINTENANT</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleAddToCartClick}
          disabled={!inStock}
          className={'p-3.5 rounded-2xl border-2 transition-all flex items-center justify-center cursor-pointer ' + (
            justAdded
              ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
              : 'bg-white border-zinc-300 text-zinc-800 hover:border-zinc-800'
          )}
          title="Ajouter au panier"
        >
          {justAdded ? (
            <Check className="w-5 h-5 text-emerald-600 animate-bounce" />
          ) : (
            <ShoppingBag className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* WhatsApp Compact Order */}
      {onWhatsAppBuy && (
        <button
          type="button"
          onClick={() => onWhatsAppBuy(quantity)}
          className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Commander sur WhatsApp (+229 43 79 70 42)</span>
        </button>
      )}
    </div>
  );
};
