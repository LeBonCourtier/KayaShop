import React from 'react';
import { formatPrice } from '../../utils/formatters';
import { sendWhatsAppCartOrder } from '../../utils/whatsapp';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, MessageCircle } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  currency: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleValidateWhatsApp = () => {
    sendWhatsAppCartOrder(items);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Mon panier"
    >
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d94f26]" />
            <h3 className="font-extrabold text-base text-zinc-900">
              Votre Panier ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-zinc-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-bold text-base text-zinc-800">Votre panier est vide</p>
              <p className="text-xs text-zinc-500 max-w-xs">
                Découvrez nos produits pratiques et ajoutez-les en un clic.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-contain bg-zinc-50 border border-zinc-200 p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-900 truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer"
                      aria-label="Supprimer l'article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-extrabold text-[#d94f26] mt-0.5">
                    {formatPrice(item.price, item.currency)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:bg-white rounded cursor-pointer"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:bg-white rounded cursor-pointer"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Total */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50/80 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-medium">Sous-total :</span>
              <span className="text-lg font-black text-zinc-950">
                {formatPrice(total, items[0]?.currency || 'FCFA')}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Paiement & vérification à la livraison</span>
            </div>

            <button
              onClick={handleValidateWhatsApp}
              className="w-full btn-shimmer py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>COMMANDER SUR WHATSAPP</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
