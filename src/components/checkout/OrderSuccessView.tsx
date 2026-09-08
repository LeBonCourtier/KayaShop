import React from 'react';
import type { Order } from '../../types/order';
import { formatPrice } from '../../utils/formatters';
import { CheckCircle2, MessageCircle, Printer, ArrowRight, ShieldCheck, Clock, MapPin, Truck, Phone } from 'lucide-react';

interface OrderSuccessViewProps {
  order: Order;
  onClose: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Bonjour KayaShop ! Je viens de passer la commande *${order.orderNumber}* pour un montant de *${formatPrice(
        order.total,
        order.currency
      )}*.\nMon nom : ${order.customer.fullName}\nVille : ${order.customer.city}\nMerci de me confirmer la livraison !`
    );
    window.open(`https://wa.me/22943797042?text=${text}`, '_blank');
  };

  return (
    <div className="p-5 sm:p-8 space-y-6 max-w-2xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
          Commande Confirmée
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight mt-2">
          Merci pour votre confiance !
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
          Votre commande a été enregistrée avec succès. Notre équipe prépare votre colis avec le plus grand soin.
        </p>
      </div>

      {/* Order Badge & Reference */}
      <div className="p-4 rounded-2xl bg-[#faf7f2] border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-zinc-500 font-medium">Numéro de commande :</span>
          <p className="text-base sm:text-lg font-black text-zinc-900 tracking-wide">
            {order.orderNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" />
            En cours de traitement
          </span>
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 cursor-pointer shadow-2xs"
            title="Imprimer le bon de commande"
            aria-label="Imprimer le bon de commande"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SMS Alert Badge */}
      <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold">SMS de confirmation envoyé au <strong>{order.customer.phone}</strong></span>
        </div>
        <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-md font-bold hidden sm:inline">
          KayaShop SMS
        </span>
      </div>

      {/* Live Order Timeline */}
      <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Suivi en temps réel de votre commande :
        </h4>

        <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] sm:text-xs">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="font-bold text-zinc-900">Reçue</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-[#d94f26] text-white flex items-center justify-center font-bold animate-pulse">
              2
            </div>
            <span className="font-bold text-[#d94f26]">Préparation</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 opacity-40">
            <div className="w-7 h-7 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold">
              3
            </div>
            <span className="font-medium text-zinc-500">Expédiée</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 opacity-40">
            <div className="w-7 h-7 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold">
              4
            </div>
            <span className="font-medium text-zinc-500">Livrée</span>
          </div>
        </div>
      </div>

      {/* Delivery & Customer Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-zinc-900 border-b border-zinc-100 pb-2">
            <MapPin className="w-4 h-4 text-[#d94f26]" />
            <span>Adresse de Livraison</span>
          </div>
          <p className="font-semibold text-zinc-800">{order.customer.fullName}</p>
          <p className="text-zinc-600">{order.customer.city}</p>
          {order.customer.address && <p className="text-zinc-500">{order.customer.address}</p>}
          <p className="text-zinc-700 flex items-center gap-1 pt-1 font-medium">
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            {order.customer.phone}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-zinc-900 border-b border-zinc-100 pb-2">
            <Truck className="w-4 h-4 text-[#d94f26]" />
            <span>Mode de Règlement</span>
          </div>
          <p className="font-semibold text-zinc-800 capitalize">
            {order.paymentMethod === 'cash_on_delivery'
              ? 'Paiement à la livraison'
              : order.paymentMethod === 'saspay'
              ? 'SasPay (Mobile Money & Carte)'
              : order.paymentMethod.replace('_', ' ')}
          </p>
          <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5 mt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Vous vérifiez le colis avant de régler au livreur.</span>
          </div>
        </div>
      </div>

      {/* Ordered Items List */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Articles commandés ({order.items.reduce((s, i) => s + i.quantity, 0)}) :
        </h4>

        <div className="divide-y divide-zinc-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-contain bg-zinc-50 border border-zinc-200 p-1 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-bold text-zinc-900 truncate">{item.name}</p>
                  <p className="text-zinc-500">Quantité : {item.quantity}</p>
                  {item.complementaryOption && (
                    <p className="text-[11px] text-[#d94f26] font-medium">
                      + {item.complementaryOption.name}
                    </p>
                  )}
                </div>
              </div>

              <span className="font-black text-zinc-900 shrink-0">
                {formatPrice(
                  item.price * item.quantity +
                    (item.complementaryOption ? item.complementaryOption.price : 0),
                  order.currency
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="border-t border-zinc-200 pt-3 space-y-1.5 text-xs">
          <div className="flex justify-between text-zinc-600">
            <span>Sous-total :</span>
            <span>{formatPrice(order.subtotal, order.currency)}</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>Frais de livraison :</span>
            <span>
              {order.shippingFee === 0 ? 'Gratuit' : formatPrice(order.shippingFee, order.currency)}
            </span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Réduction code promo :</span>
              <span>-{formatPrice(order.discountAmount, order.currency)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-black text-zinc-950 border-t border-zinc-200 pt-2 mt-2">
            <span>Total à régler :</span>
            <span className="text-[#d94f26]">{formatPrice(order.total, order.currency)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={handleWhatsAppChat}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Suivre ma commande sur WhatsApp</span>
        </button>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#18181b] hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Continuer mes achats</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
