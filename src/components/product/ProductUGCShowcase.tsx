import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { Sparkles, Maximize2, X, CheckCircle2 } from 'lucide-react';

interface ProductUGCShowcaseProps {
  product: Product;
}

export const ProductUGCShowcase: React.FC<ProductUGCShowcaseProps> = ({
  product,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!product.ugcGallery || product.ugcGallery.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center sm:text-left mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#d94f26]/10 text-[#d94f26] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>APERÇU EN SITUATION RÉELLE</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-900 tracking-tight">
            Le produit sous tous ses angles
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl">
            Découvrez nos photos réelles pour apprécier les finitions, la prise en main et la qualité au quotidien.
          </p>
        </div>

        {/* 3 UGC Images Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {product.ugcGallery.map((item, index) => (
            <div
              key={item.id || index}
              className="group relative bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Zoom Trigger */}
              <div
                onClick={() => setSelectedImage(item.url)}
                className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-zinc-100 cursor-pointer"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Subtle Gradient & Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Floating Tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom Icon overlay */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Conforme & Testé KayaShop</span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-zinc-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Full View */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-2 sm:p-4 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Aperçu photo"
                className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
