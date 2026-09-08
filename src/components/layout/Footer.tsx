import React from 'react';
import { ShieldCheck, Truck, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#18181b] text-white pt-12 pb-24 sm:pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3 Reassurance columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-zinc-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="p-3 rounded-2xl bg-zinc-800 text-[#d94f26]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Livraison Rapide</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Acheminement direct dans vos villes avec suivi personnalisé.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="p-3 rounded-2xl bg-zinc-800 text-[#d94f26]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Contrôle à Réception</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Vérifiez la conformité de votre article avant utilisation.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="p-3 rounded-2xl bg-zinc-800 text-[#d94f26]">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Assistance Dédiée</h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Une question ? Notre équipe vous répond 7j/7 avec le sourire.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#d94f26] flex items-center justify-center font-black text-white text-base">
                K
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                Kaya<span className="text-[#d94f26]">Shop</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Votre boutique en ligne moderne pour les produits pratiques du quotidien. Confort, innovation et fiabilité.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-200 mb-3 uppercase tracking-wider text-xs">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nos Produits</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Avis Clients</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Questions fréquentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-200 mb-3 uppercase tracking-wider text-xs">
              Informations
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Conditions de livraison</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de retour & échange</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Protection des données</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-zinc-200 mb-3 uppercase tracking-wider text-xs">
              Service Client
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-2">
              Besoin d'aide pour une commande en cours ?
            </p>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs">
              <span className="text-zinc-400">Contact direct :</span>
              <p className="font-bold text-white mt-0.5">contact@kayashop.com</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Admin Link */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <p>© {new Date().getFullYear()} KayaShop. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a
              href="#/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Espace Admin / Commandes</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
