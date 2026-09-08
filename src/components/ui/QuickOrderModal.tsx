import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { X, CheckCircle, ShieldCheck, Phone, User, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickOrderModalProps {
  product: Product;
  quantity: number;
  isOpen: boolean;
  onClose: () => void;
  complementaryItem?: { name: string; price: number } | null;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  product,
  quantity,
  isOpen,
  onClose,
  complementaryItem,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalPrice = product.price * quantity + (complementaryItem ? complementaryItem.price : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore confetti errors
      }
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Bonjour KayaShop ! Je souhaite commander :\n- Produit : ${product.name} (x${quantity})\n${
        complementaryItem ? `- Option : ${complementaryItem.name}\n` : ''
      }- Total : ${formatPrice(totalPrice, product.currency)}\n\nNom : ${fullName || '[À préciser]'}\nVille : ${
        city || '[À préciser]'
      }`
    );
    window.open(`https://wa.me/22943797042?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Commander votre article"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-zinc-100 my-auto">
        
        {/* Header */}
        <div className="bg-[#18181b] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#d94f26] flex items-center justify-center font-bold text-xs">
              K
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Finaliser votre commande</h3>
              <p className="text-[11px] text-zinc-400">Paiement & vérification à la livraison</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-extrabold text-zinc-900">
              Commande Enregistrée avec Succès !
            </h4>

            <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
              Merci <strong>{fullName || 'cher client'}</strong> ! Notre équipe KayaShop vous contactera au{' '}
              <strong className="text-zinc-900">{phone}</strong> pour confirmer les détails de la livraison à{' '}
              <strong className="text-zinc-900">{city || 'votre adresse'}</strong>.
            </p>

            <div className="p-4 bg-[#faf8f5] rounded-2xl border border-zinc-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-600">
                <span>Article :</span>
                <span className="font-semibold text-zinc-900">{product.name} (x{quantity})</span>
              </div>
              {complementaryItem && (
                <div className="flex justify-between text-zinc-600">
                  <span>Option :</span>
                  <span className="font-semibold text-zinc-900">{complementaryItem.name}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-zinc-900 border-t border-zinc-200 pt-1.5 mt-1">
                <span>Montant total :</span>
                <span className="text-[#d94f26] text-sm">{formatPrice(totalPrice, product.currency)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Recevoir un suivi sur WhatsApp</span>
              </button>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 bg-[#18181b] hover:bg-zinc-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Retourner à la boutique
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            
            {/* Product Summary Card */}
            <div className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-2xl border border-zinc-200/80">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-14 h-14 rounded-xl object-contain bg-white border border-zinc-200 p-1 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-zinc-500">
                  Quantité : {quantity} {complementaryItem ? `(+ ${complementaryItem.name})` : ''}
                </p>
                <p className="text-xs font-extrabold text-[#d94f26] mt-0.5">
                  Total : {formatPrice(totalPrice, product.currency)}
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#d94f26]" />
                  <span>Nom & Prénom *</span>
                </label>
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
                <label className="block font-bold text-zinc-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#d94f26]" />
                  <span>Numéro de Téléphone (WhatsApp / Appel) *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: +229 97 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d94f26]" />
                    <span>Ville / Commune *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cotonou (Haie Vive)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    Précision adresse / Quartier
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Rue 380, face pharmacie"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-zinc-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                  />
                </div>
              </div>
            </div>

            {/* Reassurance Info */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Vous ne payez qu'après réception et vérification de votre colis.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#d94f26]/25 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>CONFIRMER LA COMMANDE • {formatPrice(totalPrice, product.currency)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* WhatsApp Alternative */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ou commander directement via WhatsApp</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
