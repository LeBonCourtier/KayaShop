import React, { useState, useEffect } from 'react';
import {
  Save,
  CheckCircle2,
  Activity,
  Trash2,
  Play,
  Layers,
  Sparkles,
  Eye,
  ShoppingBag,
  CreditCard,
} from 'lucide-react';
import type { PixelSettings, PixelEventLog } from '../../types/pixel';
import { pixelService } from '../../services/pixelService';

interface PixelSettingsManagerProps {
  onShowToast: (msg: string) => void;
}

export const PixelSettingsManager: React.FC<PixelSettingsManagerProps> = ({ onShowToast }) => {
  const [settings, setSettings] = useState<PixelSettings>(() => pixelService.getSettings());
  const [logs, setLogs] = useState<PixelEventLog[]>(() => pixelService.getLogs());

  const refreshLogs = () => {
    setLogs(pixelService.getLogs());
  };

  useEffect(() => {
    const interval = setInterval(refreshLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    pixelService.saveSettings(settings);
    onShowToast('Paramètres des Pixels enregistrés avec succès !');
  };

  const handleClearLogs = () => {
    pixelService.clearLogs();
    setLogs([]);
    onShowToast('Journal des événements réinitialisé.');
  };

  // Test Event Simulators
  const triggerTestPageView = () => {
    pixelService.trackPageView('Accueil KayaShop');
    refreshLogs();
    onShowToast('Événement PageView déclenché !');
  };

  const triggerTestViewContent = () => {
    pixelService.trackViewContent({
      id: 'prod-ouvre-vin-electrique',
      slug: 'ouvre-vin-electrique',
      name: 'Ouvre-vin électrique',
      category: 'Maison & Art de la table',
      price: 10000,
      currency: 'FCFA',
    } as any);
    refreshLogs();
    onShowToast('Événement ViewContent (10 000 FCFA) déclenché !');
  };

  const triggerTestAddToCart = () => {
    pixelService.trackAddToCart(
      {
        id: 'prod-ouvre-vin-electrique',
        name: 'Ouvre-vin électrique',
        price: 10000,
        currency: 'FCFA',
      } as any,
      1
    );
    refreshLogs();
    onShowToast('Événement AddToCart déclenché !');
  };

  const triggerTestInitiateCheckout = () => {
    pixelService.trackInitiateCheckout(
      [
        {
          productId: 'prod-ouvre-vin-electrique',
          name: 'Ouvre-vin électrique',
          price: 10000,
          quantity: 1,
          image: '',
          currency: 'FCFA',
        },
      ],
      11000
    );
    refreshLogs();
    onShowToast('Événement InitiateCheckout (11 000 FCFA) déclenché !');
  };

  const triggerTestPurchase = () => {
    pixelService.trackPurchase({
      id: 'test_order',
      orderNumber: `KS-${new Date().getFullYear()}-TEST`,
      createdAt: new Date().toISOString(),
      status: 'received',
      total: 11000,
      shippingFee: 1000,
      currency: 'FCFA',
      customer: { fullName: 'Client Test', phone: '+229 00 00 00 00', city: 'Cotonou' },
      items: [
        {
          productId: 'prod-ouvre-vin-electrique',
          name: 'Ouvre-vin électrique',
          price: 10000,
          quantity: 1,
          image: '',
          currency: 'FCFA',
        },
      ],
      subtotal: 10000,
      discountAmount: 0,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pending',
    });
    refreshLogs();
    onShowToast('🎉 Événement Purchase / Vente (11 000 FCFA) déclenché !');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-black text-lg sm:text-xl text-white">
              Pixels & Suivi Publicitaire (Marketing)
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#d94f26]/20 text-[#d94f26] border border-[#d94f26]/30">
              Meta • TikTok • Google
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Configurez vos identifiants pour traquer automatiquement vos ventes, rentabiliser vos publicités sponsorisées (Facebook Ads, TikTok Ads) et recibler vos visiteurs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Traceur Actif</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Pixel Credentials Config Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <h3 className="font-extrabold text-sm sm:text-base text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Layers className="w-4 h-4 text-[#d94f26]" />
            Identifiants des Plateformes Publicitaires
          </h3>

          {/* 1. Facebook / Meta Pixel */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                  f
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-100">Pixel Meta / Facebook</h4>
                  <p className="text-[11px] text-zinc-400">Pour Facebook Ads & Instagram Ads</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.facebookEnabled}
                  onChange={(e) => setSettings({ ...settings, facebookEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Pixel ID (Identifiant de Pixel Meta)
              </label>
              <input
                type="text"
                value={settings.facebookPixelId || ''}
                onChange={(e) => setSettings({ ...settings, facebookPixelId: e.target.value })}
                placeholder="Ex: 849201948201928"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#d94f26]"
              />
            </div>
          </div>

          {/* 2. TikTok Pixel */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-black border border-zinc-700 flex items-center justify-center text-white font-black text-xs">
                  TT
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-100">Pixel TikTok</h4>
                  <p className="text-[11px] text-zinc-400">Pour TikTok Ads Manager & Campagnes Vidéos</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.tiktokEnabled}
                  onChange={(e) => setSettings({ ...settings, tiktokEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#d94f26]"></div>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                TikTok Pixel ID / Code
              </label>
              <input
                type="text"
                value={settings.tiktokPixelId || ''}
                onChange={(e) => setSettings({ ...settings, tiktokPixelId: e.target.value })}
                placeholder="Ex: C849201948201928ABC"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#d94f26]"
              />
            </div>
          </div>

          {/* 3. Google Analytics 4 */}
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-white font-black text-xs">
                  G
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-zinc-100">Google Analytics 4 & Ads</h4>
                  <p className="text-[11px] text-zinc-400">Pour Google Ads & Mesure d'Audience</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.googleEnabled}
                  onChange={(e) => setSettings({ ...settings, googleEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Measurement ID (ID de mesure GA4)
              </label>
              <input
                type="text"
                value={settings.googleAnalyticsId || ''}
                onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                placeholder="Ex: G-XXXXXXXXXX"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#d94f26]"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#d94f26] hover:bg-[#c2431e] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#d94f26]/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer la Configuration</span>
            </button>
          </div>
        </form>

        {/* Right Column: Live Testing Tools & Event Feed */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Test Event Simulator */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-[#d94f26]" />
                Simulateur d'Événements en Direct
              </span>
              <span className="text-[10px] text-zinc-500">Test Pixel</span>
            </div>

            <p className="text-xs text-zinc-400">
              Cliquez sur un événement pour tester son déclenchement instantané dans le flux :
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={triggerTestPageView}
                className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 text-left transition-colors cursor-pointer flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>1. PageView</span>
              </button>

              <button
                type="button"
                onClick={triggerTestViewContent}
                className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 text-left transition-colors cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>2. ViewContent</span>
              </button>

              <button
                type="button"
                onClick={triggerTestAddToCart}
                className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 text-left transition-colors cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>3. AddToCart</span>
              </button>

              <button
                type="button"
                onClick={triggerTestInitiateCheckout}
                className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 text-left transition-colors cursor-pointer flex items-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-orange-400" />
                <span>4. Checkout</span>
              </button>
            </div>

            <button
              type="button"
              onClick={triggerTestPurchase}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>5. Simuler un Achat Reçu (Purchase - 11 000 FCFA)</span>
            </button>
          </div>

          {/* Live Event Debugger Feed */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Flux d'Événements Capturés ({logs.length})
              </span>
              <button
                type="button"
                onClick={handleClearLogs}
                className="text-[11px] text-zinc-500 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
                title="Vider le journal"
              >
                <Trash2 className="w-3 h-3" />
                <span>Vider</span>
              </button>
            </div>

            {logs.length === 0 ? (
              <div className="text-center py-6 text-xs text-zinc-500">
                Aucun événement capturé pour le moment. Naviguez sur la boutique ou utilisez les boutons de test ci-dessus.
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/90 text-xs space-y-1 font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {log.eventName}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {new Date(log.timestamp).toLocaleTimeString('fr-FR')}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-400 truncate">
                      {log.data.content_name || log.data.page || `Commande ${log.data.order_id || ''}`}
                      {log.data.value ? ` • ${log.data.value.toLocaleString('fr-FR')} FCFA` : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
