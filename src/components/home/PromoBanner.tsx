import React from 'react';
import { Tag, Sparkles, ArrowRight, Check } from 'lucide-react';

interface PromoBannerProps {
  onExploreProducts: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onExploreProducts }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('KAYA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#09090b] text-white p-8 sm:p-12 shadow-2xl border border-zinc-800">
        
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#d94f26]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offre de Bienvenue KayaShop</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Profitez de -10% sur votre première commande
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Utilisez le code promo lors de votre commande et bénéficiez de la livraison rapide avec vérification du colis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleCopyCode}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Code : <strong>KAYA10</strong></span>
              {copied ? (
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <Check className="w-3.5 h-3.5" /> Copié !
                </span>
              ) : (
                <span className="text-zinc-400 text-[10px] underline">Copier</span>
              )}
            </button>

            <button
              onClick={onExploreProducts}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Voir les offres</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
