import React, { useState, useEffect } from 'react';
import type { OrderItem, Order, PaymentMethodType } from '../../types/order';
import { CheckoutSteps } from './CheckoutSteps';
import { OrderSuccessView } from './OrderSuccessView';
import { SaspayPaymentModal } from './SaspayPaymentModal';
import { orderService } from '../../services/orderService';
import { smsService } from '../../services/smsService';
import { pixelService } from '../../services/pixelService';
import { shippingService, type ShippingZone } from '../../services/shippingService';
import { formatPrice } from '../../utils/formatters';
import {
  X,
  User,
  MapPin,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Clock,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  currency?: string;
  onOrderCompleted?: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency = 'FCFA',
  onOrderCompleted,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Active Shipping Zones
  const [zones] = useState<ShippingZone[]>(shippingService.getActiveZones());
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || 'cotonou');

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cash_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaspayModalOpen, setIsSaspayModalOpen] = useState(false);
  const [tempSaspayOrderNum, setTempSaspayOrderNum] = useState<string>('');

  const currentZone = zones.find(z => z.id === selectedZoneId) || zones[0];
  const cityName = currentZone ? currentZone.name : 'Cotonou';
  const shippingFee = currentZone ? currentZone.fee : 1000;

  // Pricing calculations
  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity +
      (item.complementaryOption ? item.complementaryOption.price : 0),
    0
  );

  const discountAmount = 0;
  const total = subtotal + shippingFee;

  // Track InitiateCheckout on open
  useEffect(() => {
    if (isOpen && items.length > 0) {
      pixelService.trackInitiateCheckout(items, total);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 3 Confirmation
      if (paymentMethod === 'saspay') {
        const generatedNum = 'KS-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
        setTempSaspayOrderNum(generatedNum);
        setIsSaspayModalOpen(true);
        return;
      }

      // Cash or direct payment
      processFinalOrder('pending');
    }
  };

  const processFinalOrder = (paymentStatus: 'pending' | 'paid' = 'pending') => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order = orderService.createOrder({
        customer: {
          fullName,
          phone,
          email,
          city: cityName + (currentZone?.estimatedDelay ? ' (' + currentZone.estimatedDelay + ')' : ''),
          address,
          deliveryNotes,
        },
        items,
        subtotal,
        shippingFee,
        discountAmount,
        total,
        currency,
        paymentMethod,
      });

      if (paymentStatus === 'paid') {
        order.paymentStatus = 'paid';
      }

      // Track Purchase event
      pixelService.trackPurchase(order);

      // Auto-trigger SMS notification logging
      try {
        const smsText = smsService.generateSMS(order, 'order_received');
        smsService.logSMS({
          orderNumber: order.orderNumber,
          recipientPhone: order.customer.phone,
          recipientName: order.customer.fullName,
          message: smsText,
          type: 'order_received',
        });
      } catch (e) {
        console.warn('SMS logging failed:', e);
      }

      // Fire confetti
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }

      setCompletedOrder(order);
      setIsSubmitting(false);

      if (onOrderCompleted) {
        onOrderCompleted(order);
      }
    }, 600);
  };

  const handleSaspaySuccess = (_txRef: string) => {
    setIsSaspayModalOpen(false);
    processFinalOrder('paid');
  };

  const handleResetAndClose = () => {
    setCurrentStep(1);
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d94f26] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Finalisation Rapide & Sécurisée
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-zinc-900">
              {completedOrder ? 'Confirmation de commande' : 'Commander vos articles'}
            </h3>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {completedOrder ? (
            <OrderSuccessView order={completedOrder} onClose={handleResetAndClose} />
          ) : (
            <>
              {/* Steps Progress */}
              <CheckoutSteps currentStep={currentStep} />

              {/* Items Mini Summary Bar */}
              <div className="bg-zinc-50 rounded-2xl p-3 border border-zinc-100">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                  <span className="font-bold text-zinc-700">Articles sélectionnés ({items.length})</span>
                  <span className="font-extrabold text-[#d94f26]">
                    Sous-total : {formatPrice(subtotal)} {currency}
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-zinc-200 shrink-0 text-xs"
                    >
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-7 h-7 rounded-lg object-contain bg-zinc-50 border border-zinc-100 p-0.5"
                      />
                      <span className="font-semibold text-zinc-900 truncate max-w-[120px]">
                        {it.name} (x{it.quantity})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Steps */}
              <form onSubmit={handleNextStep} className="space-y-4">
                
                {/* STEP 1: COORDONNÉES */}
                {currentStep === 1 && (
                  <div className="space-y-3.5 text-xs animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                      <User className="w-4 h-4 text-[#d94f26]" />
                      <h4 className="font-extrabold text-sm text-zinc-900">
                        Vos informations de contact
                      </h4>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">Nom & Prénom *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Dossou Rodrigue"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">
                        Numéro de Téléphone (WhatsApp / Appel) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: +229 97 00 00 00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                      />
                      <span className="text-[11px] text-zinc-400 mt-1 block">
                        Ce numéro servira au livreur pour vous joindre avant son passage.
                      </span>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">
                        Adresse Email (Optionnel)
                      </label>
                      <input
                        type="email"
                        placeholder="Ex: rodrigue.dossou@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: LIVRAISON & ADRESSE (Zones Dynamiques Bénin) */}
                {currentStep === 2 && (
                  <div className="space-y-3.5 text-xs animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                      <MapPin className="w-4 h-4 text-[#d94f26]" />
                      <h4 className="font-extrabold text-sm text-zinc-900">
                        Zone et Modalités de Livraison au Bénin
                      </h4>
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-2">
                        Choisissez votre Ville / Zone de Livraison :
                      </label>
                      <div className="space-y-2">
                        {zones.map((zone) => (
                          <div
                            key={zone.id}
                            onClick={() => setSelectedZoneId(zone.id)}
                            className={'p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ' + (
                              selectedZoneId === zone.id
                                ? 'border-[#d94f26] bg-[#d94f26]/5 ring-2 ring-[#d94f26]'
                                : 'border-zinc-200 hover:border-zinc-300 bg-white'
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shippingZone"
                                checked={selectedZoneId === zone.id}
                                onChange={() => setSelectedZoneId(zone.id)}
                                className="w-4 h-4 text-[#d94f26] focus:ring-[#d94f26]"
                              />
                              <div>
                                <div className="font-bold text-zinc-900 text-xs sm:text-sm flex items-center gap-1.5">
                                  <span>{zone.name}</span>
                                </div>
                                <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3 text-[#d94f26]" />
                                  <span>Délai : {zone.estimatedDelay}</span>
                                </div>
                              </div>
                            </div>
                            <span className="font-extrabold text-xs sm:text-sm text-[#d94f26] bg-white px-2.5 py-1 rounded-xl border border-zinc-200 shrink-0">
                              {formatPrice(zone.fee)} FCFA
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="block font-bold text-zinc-700 mb-1">
                        Quartier, Rue & Repère Précis *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Haie Vive, en face de la pharmacie, 2e von à droite"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">
                        Instructions particulières de livraison (Optionnel)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Livrer de préférence entre 14h et 18h / Appeler à l'avance"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: MODE DE PAIEMENT */}
                {currentStep === 3 && (
                  <div className="space-y-4 text-xs animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                      <CreditCard className="w-4 h-4 text-[#d94f26]" />
                      <h4 className="font-extrabold text-sm text-zinc-900">
                        Choisissez votre moyen de paiement
                      </h4>
                    </div>

                    <div className="space-y-2.5">
                      {/* Cash on delivery */}
                      <label
                        className={'flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ' + (
                          paymentMethod === 'cash_on_delivery'
                            ? 'border-[#d94f26] bg-[#d94f26]/5 ring-1 ring-[#d94f26]'
                            : 'border-zinc-200 hover:border-zinc-300'
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash_on_delivery"
                          checked={paymentMethod === 'cash_on_delivery'}
                          onChange={() => setPaymentMethod('cash_on_delivery')}
                          className="mt-0.5 text-[#d94f26] focus:ring-[#d94f26]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                              <Banknote className="w-4 h-4 text-emerald-600" />
                              Paiement à la livraison (Espèces)
                            </span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                              Recommandé
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-1">
                            Payez en toute sérénité en liquide directement au livreur une fois votre colis inspecté.
                          </p>
                        </div>
                      </label>

                      {/* SasPay Gateway Option */}
                      <label
                        className={'flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ' + (
                          paymentMethod === 'saspay'
                            ? 'border-purple-600 bg-purple-50/50 ring-1 ring-purple-600'
                            : 'border-zinc-200 hover:border-zinc-300'
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="saspay"
                          checked={paymentMethod === 'saspay'}
                          onChange={() => setPaymentMethod('saspay')}
                          className="mt-0.5 text-purple-600 focus:ring-purple-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-purple-600" />
                              SasPay — Mobile Money MTN / Moov / Wave & Carte
                            </span>
                            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                              Instantané
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-1">
                            Paiement sécurisé en ligne sans contact par MTN MoMo, Moov Flooz, Wave ou Carte Visa/Mastercard.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Order Summary Recap Box */}
                    <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 space-y-2 text-xs">
                      <div className="flex justify-between text-zinc-600">
                        <span>Sous-total articles :</span>
                        <span className="font-bold">{formatPrice(subtotal)} {currency}</span>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span>Frais de livraison ({cityName}) :</span>
                        <span className="font-bold text-emerald-700">+{formatPrice(shippingFee)} {currency}</span>
                      </div>
                      <div className="border-t border-zinc-200 pt-2 flex justify-between text-zinc-900 font-extrabold text-sm">
                        <span>Total net à payer :</span>
                        <span className="text-[#d94f26] text-base">{formatPrice(total)} {currency}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-100">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 font-bold text-xs hover:bg-zinc-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Retour</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-[#d94f26] hover:bg-[#c2431e] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#d94f26]/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Validation en cours...</span>
                    ) : currentStep < 3 ? (
                      <>
                        <span>Continuer vers {currentStep === 1 ? 'la livraison' : 'le paiement'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{paymentMethod === 'saspay' ? 'Payer avec SasPay' : 'Confirmer la commande'} ({formatPrice(total)} {currency})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* SasPay Payment Modal */}
      {isSaspayModalOpen && (
        <SaspayPaymentModal
          isOpen={isSaspayModalOpen}
          onClose={() => setIsSaspayModalOpen(false)}
          orderNumber={tempSaspayOrderNum}
          amount={total}
          currency={currency}
          customerName={fullName}
          customerPhone={phone}
          onPaymentSuccess={handleSaspaySuccess}
        />
      )}
    </div>
  );
};
