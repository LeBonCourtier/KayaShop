import React, { useState } from 'react';
import type { Order } from '../../types/order';
import { orderService } from '../../services/orderService';
import { formatPrice } from '../../utils/formatters';
import { X, Search, PackageCheck, Clock, MessageCircle } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null | undefined>(undefined);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const result = orderService.findOrder(query);
    setSearchedOrder(result || null);
  };

  const handleWhatsAppContact = (order: Order) => {
    const text = encodeURIComponent(
      `Bonjour KayaShop ! Je souhaite avoir des nouvelles de ma commande *${order.orderNumber}* pour *${order.customer.fullName}*. Merci !`
    );
    window.open(`https://wa.me/22943797042?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Suivre ma commande"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-zinc-100 my-auto">
        
        {/* Header */}
        <div className="bg-[#18181b] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#d94f26]" />
            <h3 className="font-extrabold text-sm sm:text-base">Suivi de Commande</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-zinc-600">
            Entrez votre <strong>numéro de commande</strong> (ex: <code>KS-2026-XXXX</code>) ou le <strong>numéro de téléphone</strong> utilisé lors de votre achat.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                required
                placeholder="Ex: KS-2026-8942 ou 0700000000"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-[#d94f26] hover:bg-[#c03d15] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Rechercher</span>
            </button>
          </form>

          {/* Results */}
          {searchedOrder === null && (
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-center text-xs text-zinc-600 space-y-2">
              <p className="font-bold text-zinc-800">Aucune commande trouvée</p>
              <p className="text-zinc-500">
                Vérifiez le numéro ou contactez directement notre support client par WhatsApp.
              </p>
            </div>
          )}

          {searchedOrder && (
            <div className="p-4 bg-[#faf8f5] border border-zinc-200 rounded-2xl space-y-3 text-xs animate-in fade-in">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <div>
                  <span className="text-zinc-500">Commande :</span>
                  <p className="font-black text-sm text-zinc-900">{searchedOrder.orderNumber}</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 text-[11px]">
                  <Clock className="w-3 h-3" />
                  En cours
                </span>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-zinc-800">Client : {searchedOrder.customer.fullName}</p>
                <p className="text-zinc-600">Ville : {searchedOrder.customer.city}</p>
                <p className="text-zinc-600">
                  Total : <strong>{formatPrice(searchedOrder.total, searchedOrder.currency)}</strong>
                </p>
              </div>

              <button
                onClick={() => handleWhatsAppContact(searchedOrder)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Demander le statut exact au livreur</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
