import React from 'react';
import { Star } from 'lucide-react';

interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
  onScrollToReviews?: () => void;
}

export const RatingSummary: React.FC<RatingSummaryProps> = ({
  rating,
  reviewCount,
  onScrollToReviews,
}) => {
  return (
    <div
      onClick={onScrollToReviews}
      className="inline-flex items-center gap-2 text-xs sm:text-sm cursor-pointer group hover:opacity-90 transition-opacity"
      role="button"
      tabIndex={0}
      aria-label={`Noté ${rating} sur 5 basé sur ${reviewCount} avis`}
    >
      <div className="flex items-center gap-0.5 text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : star - rating < 1
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-zinc-300'
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5 font-medium text-zinc-700">
        <span className="font-bold text-zinc-900">{rating.toFixed(1)}</span>
        <span className="text-zinc-400">•</span>
        <span className="text-zinc-600 underline underline-offset-2 decoration-zinc-300 group-hover:decoration-zinc-700">
          {reviewCount} avis
        </span>
      </div>
    </div>
  );
};
