import React from 'react';
import type { ProductBenefit } from '../../types/product';
import { Zap, BatteryCharging, Wine, Gift, Heart, Shield, Clock, Sparkles, UserCheck } from 'lucide-react';

interface ProductBenefitsProps {
  benefits: ProductBenefit[];
}

export const ProductBenefits: React.FC<ProductBenefitsProps> = ({ benefits }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'lightning':
      case 'zap':
        return <Zap className="w-6 h-6 text-[#d94f26]" />;
      case 'battery':
        return <BatteryCharging className="w-6 h-6 text-[#d94f26]" />;
      case 'wine':
        return <Wine className="w-6 h-6 text-[#d94f26]" />;
      case 'gift':
        return <Gift className="w-6 h-6 text-[#d94f26]" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-[#d94f26]" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-[#d94f26]" />;
      case 'clock':
        return <Clock className="w-6 h-6 text-[#d94f26]" />;
      case 'user':
        return <UserCheck className="w-6 h-6 text-[#d94f26]" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-[#d94f26]" />;
    }
  };

  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 border-t border-zinc-200/80">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
          Points forts
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-3 tracking-tight">
          Pourquoi vous allez l'aimer
        </h2>
        <p className="text-sm text-zinc-600 mt-2">
          Conçu pour vous offrir le maximum de confort et de praticité au quotidien.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {benefits.map((benefit, idx) => (
          <div
            key={benefit.id || idx}
            className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs hover:shadow-md hover:border-[#d94f26]/40 transition-all duration-300 flex flex-col items-start group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fff5f2] border border-[#fbdcd2] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              {getIcon(benefit.icon)}
            </div>
            <h3 className="font-bold text-base text-zinc-900 mb-1.5 group-hover:text-[#d94f26] transition-colors">
              {benefit.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
