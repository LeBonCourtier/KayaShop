import React from 'react';
import { formatPrice } from '../../utils/formatters';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FinalCTAProps {
  productName: string;
  price: number;
  currency?: string;
  thumbnailUrl?: string;
  onBuyNow: () => void;
  inStock?: boolean;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  productName,
  price,
  currency = 'FCFA',
  onBuyNow,
  inStock = true,
}) => {
  return (
    <section className="py-12 sm:py-20 my-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#09090b] text-white p-8 sm:p-12 shadow-xl border border-zinc-800">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#d94f26]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Vous êtes prêt ?
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-md">
            Commandez votre <strong>{productName}</strong> au prix exceptionnel de{' '}
            <span className="text-white font-black underline decoration-[#d94f26]">
              {formatPrice(price, currency)}
            </span>
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Expédition rapide • Colis vérifié à la livraison</span>
          </div>

          <div className="mt-8 w-full sm:w-auto">
            <button
              onClick={onBuyNow}
              disabled={!inStock}
              className="w-full sm:w-auto bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-base py-4 px-8 rounded-2xl shadow-xl shadow-[#d94f26]/30 flex items-center justify-center gap-3 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>COMMANDER MAINTENANT</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
