import React from 'react';
import { ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#18181b] text-white pt-8 pb-20 sm:pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Mini Reassurance Bar (Horizontal & Elegant on Mobile) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 pb-6 border-b border-zinc-800 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#d94f26] shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-zinc-200">Livraison 24h/48h</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-zinc-200">Paiement à réception</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-zinc-200">Colis Vérifié</span>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="mb-2">
              <span className="font-black text-xl sm:text-2xl tracking-tight">
                Kaya<span className="text-[#d94f26]">Shop</span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
              Votre boutique en ligne moderne pour les produits pratiques du quotidien. Confort, innovation et fiabilité au Bénin.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[11px] sm:text-xs text-zinc-300 uppercase tracking-wider mb-2">
              Navigation Rapide
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-zinc-400">
              <li><a href="#/" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Catalogue Produits</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Avis Clients Bénin</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Questions fréquentes (FAQ)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11px] sm:text-xs text-zinc-300 uppercase tracking-wider mb-2">
              Garanties & Engagements
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-zinc-400">
              <li>• Paiement en espèces après inspection</li>
              <li>• Paiement sécurisé SasPay (MoMo / Carte)</li>
              <li>• Échange garanti sous 48h en cas de défaut</li>
              <li>• Expédition dans toutes les villes du Bénin</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-zinc-500 gap-1 text-center sm:text-left">
          <p>© 2026 KayaShop Bénin. Tous droits réservés.</p>
          <p>Cotonou • Calavi • Porto-Novo • Parakou</p>
        </div>

      </div>
    </footer>
  );
};
