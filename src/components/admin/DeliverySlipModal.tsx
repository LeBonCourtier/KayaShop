import React from 'react';
import { X, Printer, Phone, MapPin, Package } from 'lucide-react';
import type { Order } from '../../types/order';

interface DeliverySlipModalProps {
  order: Order | null;
  onClose: () => void;
}

export const DeliverySlipModal: React.FC<DeliverySlipModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'saspay':
        return 'SasPay (Paiement en ligne sécurisé)';
      case 'cash_on_delivery':
        return 'Paiement en espèces à la livraison';
      case 'mtn_momo':
        return 'MTN Mobile Money';
      case 'moov_money':
        return 'Moov Money Flooz';
      case 'wave':
        return 'Wave Mobile Money';
      default:
        return 'Espèces à la livraison';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      {/* Container */}
      <div className="bg-white text-zinc-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar (Hidden on print) */}
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d94f26] text-white flex items-center justify-center font-bold text-sm">
              KS
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-900">
                Bon de Livraison & Facture Colis
              </h3>
              <p className="text-xs text-zinc-500">N° {order.orderNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer le Bon</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Delivery Slip Content */}
        <div className="p-6 sm:p-8 overflow-y-auto print:p-0 print:overflow-visible">
          <div id="printable-slip" className="border border-zinc-200 rounded-2xl p-6 print:border-none print:p-0">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-zinc-200 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-[#d94f26] text-white flex items-center justify-center font-extrabold text-lg">
                    K
                  </div>
                  <span className="font-extrabold text-2xl tracking-tight text-zinc-900">
                    Kaya<span className="text-[#d94f26]">Shop</span>
                  </span>
                </div>
                <p className="text-xs text-zinc-500">Service Logistique & Expédition Bénin</p>
                <p className="text-xs text-zinc-500">WhatsApp / Tél : +229 43 79 70 42</p>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-lg bg-zinc-100 font-mono font-bold text-sm text-zinc-800 border border-zinc-200">
                  {order.orderNumber}
                </span>
                <p className="text-xs text-zinc-500 mt-1">
                  Date : {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                  Fiche de route Livreur
                </p>
              </div>
            </div>

            {/* Customer & Delivery Info Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div>
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Destinataire / Client
                </span>
                <p className="font-bold text-sm text-zinc-900">{order.customer.fullName}</p>
                <p className="text-xs text-zinc-700 font-medium flex items-center gap-1.5 mt-1">
                  <Phone className="w-3.5 h-3.5 text-[#d94f26]" />
                  <span>{order.customer.phone}</span>
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Lieu de Livraison
                </span>
                <p className="font-bold text-sm text-zinc-900 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#d94f26]" />
                  <span>{order.customer.city}</span>
                </p>
                <p className="text-xs text-zinc-600 mt-1">
                  {order.customer.address || 'Point de rencontre convenu avec le client'}
                </p>
                {order.customer.deliveryNotes && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 rounded p-1.5 mt-1.5 border border-amber-200 font-medium">
                    Note : {order.customer.deliveryNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="my-5">
              <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-zinc-600" />
                Détail du colis ({order.items.length} article{order.items.length > 1 ? 's' : ''})
              </h4>
              <div className="border border-zinc-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-100 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-2 text-center">Qté</th>
                      <th className="py-2.5 px-3 text-right">Prix Unitaire</th>
                      <th className="py-2.5 px-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-800">
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50">
                        <td className="py-2.5 px-3">
                          <p className="font-bold text-zinc-900">{item.name}</p>
                          {item.complementaryOption && (
                            <p className="text-[11px] text-zinc-500">
                              + Option : {item.complementaryOption.name} (+{item.complementaryOption.price.toLocaleString('fr-FR')} FCFA)
                            </p>
                          )}
                        </td>
                        <td className="py-2.5 px-2 text-center font-bold">{item.quantity}</td>
                        <td className="py-2.5 px-3 text-right text-zinc-600">
                          {item.price.toLocaleString('fr-FR')} FCFA
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-zinc-900">
                          {((item.price + (item.complementaryOption?.price || 0)) * item.quantity).toLocaleString('fr-FR')} FCFA
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Recap & Cash to Collect */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-zinc-200 pt-4 my-4">
              <div className="text-xs text-zinc-600 space-y-1">
                <p>
                  <strong className="text-zinc-800">Mode de règlement :</strong> {getPaymentLabel(order.paymentMethod)}
                </p>
                <p>
                  <strong className="text-zinc-800">Statut du paiement :</strong>{' '}
                  <span className={order.paymentStatus === 'paid' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                    {order.paymentStatus === 'paid' ? 'Payé d’avance' : 'À encaisser à la livraison'}
                  </span>
                </p>
              </div>

              <div className="w-full sm:w-64 bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs space-y-1.5">
                <div className="flex justify-between text-zinc-600">
                  <span>Sous-total :</span>
                  <span>{order.subtotal.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Frais de livraison :</span>
                  <span>{order.shippingFee.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-zinc-900 border-t border-zinc-200 pt-1.5">
                  <span>TOTAL À PERCEVOIR :</span>
                  <span className="text-[#d94f26]">
                    {order.paymentStatus === 'paid' ? '0 FCFA (Déjà payé)' : `${order.total.toLocaleString('fr-FR')} FCFA`}
                  </span>
                </div>
              </div>
            </div>

            {/* Signatures & Instructions */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 pt-4 mt-4 text-xs text-zinc-500">
              <div className="border border-dashed border-zinc-300 rounded-xl p-3 h-24 flex flex-col justify-between">
                <span className="font-semibold text-zinc-700 text-[11px]">Signature du Livreur :</span>
                <span className="text-[10px] text-zinc-400">Date et heure de remise</span>
              </div>
              <div className="border border-dashed border-zinc-300 rounded-xl p-3 h-24 flex flex-col justify-between">
                <span className="font-semibold text-zinc-700 text-[11px]">Signature du Client Réceptionnaire :</span>
                <span className="text-[10px] text-zinc-400">« Bon pour accord et réception conforme »</span>
              </div>
            </div>

            {/* Reassurance Footer */}
            <div className="mt-5 text-center text-[10px] text-zinc-400 border-t border-zinc-100 pt-3">
              KayaShop Bénin — Pour toute assistance livraison : +229 43 79 70 42 — Merci de votre confiance !
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
