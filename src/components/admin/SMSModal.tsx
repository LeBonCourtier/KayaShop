import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Smartphone,
  CheckCircle2,
  Copy,
  Clock,
  MessageSquare,
  Phone,
  User,
  ShieldCheck,
} from 'lucide-react';
import type { Order } from '../../types/order';
import type { SMSNotification } from '../../types/sms';
import { smsService } from '../../services/smsService';

interface SMSModalProps {
  order: Order | null;
  onClose: () => void;
  onSMSSent?: (msg: string) => void;
}

export const SMSModal: React.FC<SMSModalProps> = ({ order, onClose, onSMSSent }) => {
  if (!order) return null;

  const [activeTab, setActiveTab] = useState<'order_received' | 'in_transit' | 'delivered' | 'custom'>(
    order.status === 'in_transit'
      ? 'in_transit'
      : order.status === 'delivered'
      ? 'delivered'
      : 'order_received'
  );

  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<SMSNotification[]>([]);
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Load template whenever activeTab changes
  useEffect(() => {
    if (activeTab === 'custom') {
      setMessage(`Bonjour ${order.customer.fullName}, concernant votre commande ${order.orderNumber} sur KayaShop...`);
    } else {
      const generated = smsService.generateSMS(order, activeTab);
      setMessage(generated);
    }
  }, [activeTab, order]);

  // Load history
  useEffect(() => {
    const logs = smsService.getLogsForOrder(order.orderNumber);
    setHistory(logs);
  }, [order.orderNumber, sentSuccess]);

  const charCount = message.length;
  const smsSegments = Math.ceil(charCount / 160) || 1;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateSend = () => {
    smsService.logSMS({
      orderNumber: order.orderNumber,
      recipientPhone: order.customer.phone,
      recipientName: order.customer.fullName,
      message,
      type: activeTab,
    });

    setSentSuccess(true);
    if (onSMSSent) onSMSSent(`SMS envoyé au ${order.customer.phone}`);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  const nativeLink = smsService.getNativeSMSLink(order.customer.phone, message);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-zinc-900 text-zinc-100 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-zinc-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#d94f26] text-white flex items-center justify-center font-bold text-base shadow-lg shadow-[#d94f26]/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  Centre de Notification SMS
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Bénin Direct
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Commande <span className="font-mono font-bold text-zinc-200">{order.orderNumber}</span> • {order.customer.fullName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Recipient summary banner */}
          <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-zinc-900 text-zinc-300">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-zinc-200">{order.customer.fullName}</p>
                <p className="text-zinc-400">{order.customer.city} • {order.customer.address || 'Adresse à confirmer'}</p>
              </div>
            </div>

            <a
              href={`tel:${order.customer.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d94f26]/10 hover:bg-[#d94f26]/20 text-[#d94f26] rounded-xl font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{order.customer.phone}</span>
            </a>
          </div>

          {/* Template Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Modèle de SMS Automatique
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('order_received')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                  activeTab === 'order_received'
                    ? 'bg-[#d94f26] text-white shadow-md shadow-[#d94f26]/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                1. Confirmation
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('in_transit')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                  activeTab === 'in_transit'
                    ? 'bg-[#d94f26] text-white shadow-md shadow-[#d94f26]/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                2. Départ Livreur
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('delivered')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                  activeTab === 'delivered'
                    ? 'bg-[#d94f26] text-white shadow-md shadow-[#d94f26]/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                3. Livré / Merci
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                  activeTab === 'custom'
                    ? 'bg-[#d94f26] text-white shadow-md shadow-[#d94f26]/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                4. Personnalisé
              </button>
            </div>
          </div>

          {/* Smartphone Preview & Message Editor */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Editor */}
            <div className="md:col-span-7 space-y-2">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Message à expédier :</span>
                <span className="font-mono text-[11px] text-zinc-400">
                  {charCount} caractères ({smsSegments} SMS)
                </span>
              </div>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26] leading-relaxed resize-none"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copié !' : 'Copier le texte'}</span>
                </button>

                <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Sender : KayaShop</span>
                </span>
              </div>
            </div>

            {/* Virtual Smartphone Bubble Preview */}
            <div className="md:col-span-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-[#d94f26]" />
                  <span>Aperçu SMS Client</span>
                </span>
                <span className="text-[10px] text-zinc-500">Aujourd'hui</span>
              </div>

              {/* Chat Bubble */}
              <div className="bg-[#242427] text-zinc-100 rounded-2xl rounded-tl-xs p-3 text-xs leading-relaxed border border-zinc-700/50 shadow-inner">
                <p className="font-semibold text-[#d94f26] text-[10px] uppercase tracking-wider mb-1">
                  KayaShop Bénin
                </p>
                <p className="text-zinc-200 text-[11px] whitespace-pre-line">{message}</p>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
            {/* Native Mobile SMS */}
            <a
              href={nativeLink}
              onClick={() => {
                smsService.logSMS({
                  orderNumber: order.orderNumber,
                  recipientPhone: order.customer.phone,
                  recipientName: order.customer.fullName,
                  message,
                  type: activeTab,
                });
                if (onSMSSent) onSMSSent('Ouverture SMS mobile...');
              }}
              className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-zinc-700 transition-all cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-[#d94f26]" />
              <span>Ouvrir sur Téléphone (SMS Direct)</span>
            </a>

            {/* Instant Send / Log */}
            <button
              type="button"
              onClick={handleSimulateSend}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#d94f26]/20 transition-all cursor-pointer active:scale-95"
            >
              {sentSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                  <span>SMS Envoyé & Enregistré !</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Envoyer la Notification SMS</span>
                </>
              )}
            </button>
          </div>

          {/* History of Sent SMS for this order */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                Historique des SMS envoyés pour cette commande ({history.length})
              </h4>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {history.map((h) => (
                  <div key={h.id} className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80 text-xs">
                    <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Remis au {h.recipientPhone}
                      </span>
                      <span>
                        {new Date(h.sentAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-zinc-300 text-[11px] truncate">{h.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
