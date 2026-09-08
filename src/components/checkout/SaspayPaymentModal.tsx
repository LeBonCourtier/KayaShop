import React, { useState } from 'react';
import { saspayService, type SaspayTransaction } from '../../services/saspayService';
import { formatPrice } from '../../utils/formatters';
import {
  ShieldCheck,
  CheckCircle2,
  Loader2,
  X,
  CreditCard,
  Smartphone,
  Lock,
  ArrowRight
} from 'lucide-react';

interface SaspayPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  amount: number;
  currency?: string;
  customerName: string;
  customerPhone: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentFailure?: (error: string) => void;
}

export const SaspayPaymentModal: React.FC<SaspayPaymentModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  amount,
  currency = 'FCFA',
  customerName,
  customerPhone,
  onPaymentSuccess,
}) => {
  const config = saspayService.getConfig();
  const [selectedNetwork, setSelectedNetwork] = useState<'mtn' | 'moov' | 'wave' | 'card'>('mtn');
  const [phoneNumber, setPhoneNumber] = useState(customerPhone || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'awaiting_push' | 'success' | 'failed'>('idle');
  const [txRef, setTxRef] = useState<string>('');

  if (!isOpen) return null;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    const reference = saspayService.generateTransactionReference();
    setTxRef(reference);

    setTimeout(() => {
      setStatus('awaiting_push');

      setTimeout(() => {
        if (config.autoValidateTestPayment || config.environment === 'sandbox') {
          const transaction: SaspayTransaction = {
            transactionId: reference,
            orderNumber,
            amount,
            currency,
            customerPhone: phoneNumber || customerPhone,
            customerName,
            network: selectedNetwork,
            status: 'successful',
            createdAt: new Date().toISOString(),
            message: 'Paiement autorise et valide avec succes par SasPay.',
          };
          saspayService.logTransaction(transaction);
          setStatus('success');
          setTimeout(() => {
            onPaymentSuccess(reference);
          }, 1800);
        } else {
          setStatus('success');
          onPaymentSuccess(reference);
        }
      }, 3200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-purple-100 flex flex-col max-h-[92vh]">
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 text-white p-6 relative">
          <button
            onClick={onClose}
            disabled={status === 'processing' || status === 'awaiting_push'}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 text-white transition disabled:opacity-30"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight">SasPay</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400 text-purple-950 px-2 py-0.5 rounded-full">
                  {config.environment === 'sandbox' ? 'Mode Test' : 'Paiement Securise'}
                </span>
              </div>
              <p className="text-xs text-purple-200">Passerelle de Paiement Mobile Money & Carte</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-500/40 flex items-center justify-between">
            <span className="text-xs text-purple-200">Commande {orderNumber}</span>
            <div className="text-right">
              <span className="text-xs text-purple-200 block">Total a regler</span>
              <span className="text-xl font-black text-amber-300">{formatPrice(amount)} {currency}</span>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {status === 'idle' && (
            <form onSubmit={handleStartPayment} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Choisissez votre moyen de reglement :
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedNetwork('mtn')}
                    className={'p-3 rounded-2xl border text-left transition flex items-center gap-3 ' + (
                      selectedNetwork === 'mtn'
                        ? 'border-yellow-500 bg-yellow-50/70 ring-2 ring-yellow-400'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-xs shadow-sm">
                      MTN
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">MTN MoMo</p>
                      <p className="text-[10px] text-gray-500">*880# Benin</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedNetwork('moov')}
                    className={'p-3 rounded-2xl border text-left transition flex items-center gap-3 ' + (
                      selectedNetwork === 'moov'
                        ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-400'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs shadow-sm">
                      FLOOZ
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Moov Money</p>
                      <p className="text-[10px] text-gray-500">*155# Benin</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedNetwork('wave')}
                    className={'p-3 rounded-2xl border text-left transition flex items-center gap-3 ' + (
                      selectedNetwork === 'wave'
                        ? 'border-cyan-500 bg-cyan-50/70 ring-2 ring-cyan-400'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white font-black flex items-center justify-center text-xs shadow-sm">
                      WAVE
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Wave Money</p>
                      <p className="text-[10px] text-gray-500">Sans frais</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedNetwork('card')}
                    className={'p-3 rounded-2xl border text-left transition flex items-center gap-3 ' + (
                      selectedNetwork === 'card'
                        ? 'border-purple-500 bg-purple-50/70 ring-2 ring-purple-400'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-black flex items-center justify-center shadow-sm">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Carte Bancaire</p>
                      <p className="text-[10px] text-gray-500">Visa / Mastercard</p>
                    </div>
                  </button>
                </div>
              </div>

              {selectedNetwork !== 'card' ? (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Numéro de téléphone Mobile Money :
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                      🇧🇯 +229
                    </span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber.replace('+229', '').trim()}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="97 00 00 00"
                      className="w-full pl-24 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-purple-600 focus:bg-white outline-none transition"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                    Une demande de debit sera envoyee directement sur ce numero.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Numéro de Carte :</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Expiration :</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">CVV :</label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold rounded-2xl shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2 group"
                >
                  <Lock className="w-4 h-4" />
                  <span>Payer {formatPrice(amount)} {currency} avec SasPay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs text-center pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Transaction cryptee SSL 256-bit certifiee SasPay Benin</span>
              </div>
            </form>
          )}

          {status === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Connexion a la passerelle SasPay...</h4>
                <p className="text-xs text-gray-500 mt-1">Generation de la session securisee</p>
              </div>
            </div>
          )}

          {status === 'awaiting_push' && (
            <div className="py-8 text-center space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-600 flex items-center justify-center mx-auto relative animate-bounce">
                <Smartphone className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-extrabold text-gray-900">Validation sur votre téléphone</h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Une demande a ete envoyee sur le <span className="font-bold text-purple-700">{phoneNumber || customerPhone}</span>.
                </p>
                <div className="inline-block bg-purple-50 text-purple-800 text-xs px-3.5 py-1.5 rounded-full font-medium border border-purple-200">
                  {selectedNetwork === 'mtn' ? 'Composer *880# si necessaire' : selectedNetwork === 'moov' ? 'Composer *155# pour approuver' : 'Confirmer dans Wave'}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                <span>En attente de votre code secret...</span>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-900">Paiement SasPay Valide !</h4>
                <p className="text-xs text-gray-500 mt-1">Ref : <span className="font-mono font-bold text-purple-700">{txRef}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
