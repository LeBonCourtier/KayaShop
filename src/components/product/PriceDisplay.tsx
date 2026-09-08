import React from 'react';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  compareAtPrice,
  currency = 'FCFA',
  size = 'xl',
}) => {
  const discount = calculateDiscount(price, compareAtPrice);

  const sizeClasses = {
    sm: 'text-base font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl sm:text-3xl font-extrabold',
    xl: 'text-3xl sm:text-4xl font-extrabold tracking-tight',
  };

  return (
    <div className="flex items-baseline flex-wrap gap-2.5">
      <span className={`${sizeClasses[size]} text-zinc-950 text-[#18181b]`}>
        {formatPrice(price, currency)}
      </span>

      {/* Affiché uniquement si un ancien prix réel existe dans la structure de données */}
      {compareAtPrice && compareAtPrice > price && (
        <span className="text-sm sm:text-base font-medium text-zinc-400 line-through">
          {formatPrice(compareAtPrice, currency)}
        </span>
      )}

      {discount && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-[#fff5f2] text-[#d94f26] border border-[#fbdcd2]">
          -{discount}%
        </span>
      )}
    </div>
  );
};
