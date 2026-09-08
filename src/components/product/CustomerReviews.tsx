import React, { useState } from 'react';
import type { ProductReview } from '../../types/product';
import { Star, ShieldCheck, MessageSquarePlus, Check } from 'lucide-react';

interface CustomerReviewsProps {
  summary: {
    average: number;
    total: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  reviews: ProductReview[];
  productName: string;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  summary,
  reviews,
  productName,
}) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showReviewFormModal, setShowReviewFormModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter reviews
  const displayedReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  return (
    <section id="reviews" className="py-10 sm:py-16 border-t border-zinc-200/80">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
              Retours d'expérience
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-3 tracking-tight">
              Avis Clients ({summary.total})
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Les avis sont recueillis auprès de clients ayant commandé sur KayaShop.
            </p>
          </div>

          <button
            onClick={() => setShowReviewFormModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-800 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#d94f26]" />
            <span>Donner mon avis</span>
          </button>
        </div>

        {/* Global Rating & Distribution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-xs mb-10">
          
          {/* Average Score Box (Left) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-zinc-200/80">
            <span className="text-5xl sm:text-6xl font-black text-zinc-900 tracking-tight">
              {summary.average.toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-zinc-400 mt-1">sur 5 étoiles</span>

            <div className="flex items-center gap-1 my-3 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(summary.average)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-zinc-300'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-zinc-600 font-medium">
              Basé sur <span className="font-bold text-zinc-900">{summary.total} avis certifiés</span>
            </p>
          </div>

          {/* Star Distribution Bars (Right) */}
          <div className="md:col-span-8 flex flex-col justify-center gap-2.5">
            {[5, 4, 3, 2, 1].map((starCount) => {
              const count = summary.distribution[starCount as 1 | 2 | 3 | 4 | 5] || 0;
              const percentage = summary.total > 0 ? Math.round((count / summary.total) * 100) : 0;
              const isSelected = filterRating === starCount;

              return (
                <button
                  key={starCount}
                  onClick={() => setFilterRating(isSelected ? null : starCount)}
                  className={`w-full flex items-center gap-3 text-xs group cursor-pointer p-1 rounded-lg transition-colors ${
                    isSelected ? 'bg-zinc-100 font-bold' : 'hover:bg-zinc-50'
                  }`}
                >
                  <span className="w-14 flex items-center gap-1 font-semibold text-zinc-700 text-left">
                    <span>{starCount}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </span>

                  {/* Progress bar */}
                  <div className="flex-1 h-3 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 transition-all duration-500 rounded-full group-hover:bg-amber-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <span className="w-12 text-right font-medium text-zinc-500">
                    {count} ({percentage}%)
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Reset if active */}
        {filterRating && (
          <div className="flex items-center justify-between bg-zinc-100 px-4 py-2 rounded-xl mb-6 text-xs">
            <span className="font-medium text-zinc-700">
              Affichage des avis avec <strong>{filterRating} étoiles</strong> ({displayedReviews.length})
            </span>
            <button
              onClick={() => setFilterRating(null)}
              className="font-bold text-[#d94f26] hover:underline cursor-pointer"
            >
              Afficher tous les avis
            </button>
          </div>
        )}

        {/* Individual Reviews List */}
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900">{review.author}</span>
                    {review.city && (
                      <span className="text-xs text-zinc-400">({review.city})</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-400">{review.date}</span>
                  </div>
                </div>

                {/* Badge Achat Vérifié - UNIQUEMENT SI CONFIRMÉ DANS LA STRUCTURE */}
                {review.isVerifiedPurchase && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Achat vérifié</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                "{review.comment}"
              </p>

              {review.photoUrl && (
                <div className="mt-2">
                  <img
                    src={review.photoUrl}
                    alt="Photo fournie par le client"
                    className="w-16 h-16 rounded-lg object-cover border border-zinc-200"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal : Préparation de l'architecture d'avis après achat */}
        {showReviewFormModal && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h3 className="font-bold text-base text-zinc-900">Donner votre avis</h3>
                <button
                  onClick={() => {
                    setShowReviewFormModal(false);
                    setFormSubmitted(false);
                  }}
                  className="text-zinc-400 hover:text-zinc-600 text-sm font-semibold cursor-pointer"
                >
                  Fermer
                </button>
              </div>

              {formSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-zinc-900">Merci pour votre retour !</h4>
                  <p className="text-xs text-zinc-600">
                    Votre avis a été transmis à l'équipe KayaShop. Il sera validé et rattaché à votre commande.
                  </p>
                  <button
                    onClick={() => {
                      setShowReviewFormModal(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-2 px-5 py-2 bg-[#18181b] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-3.5 text-left text-xs"
                >
                  <p className="text-zinc-500 text-xs">
                    Partagez votre expérience sur <strong>{productName}</strong>.
                  </p>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Votre prénom / nom</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean K."
                      className="w-full border border-zinc-300 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Ville</label>
                    <input
                      type="text"
                      placeholder="Ex: Abidjan, Dakar..."
                      className="w-full border border-zinc-300 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Votre note</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          className="p-1.5 rounded-lg border border-zinc-200 hover:border-amber-400 text-amber-500 cursor-pointer"
                        >
                          <Star className="w-5 h-5 fill-amber-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Votre commentaire</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Qu'avez-vous pensé de la qualité et de la prise en main ?"
                      className="w-full border border-zinc-300 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#d94f26] hover:bg-[#c03d15] text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Envoyer mon avis
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
