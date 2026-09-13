import React from 'react';
import type { Product } from '../../types/product';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../../data/products';
import { CheckCircle2 } from 'lucide-react';

interface ProductUGCShowcaseProps {
  product: Product;
}

export const ProductUGCShowcase: React.FC<ProductUGCShowcaseProps> = ({
  product,
}) => {
  const fallbackGallery = DEFAULT_PRODUCTS.find(
    (p) => p.id === product.id || p.slug === product.slug
  )?.ugcGallery;

  const gallery = (product.ugcGallery && product.ugcGallery.length > 0)
    ? product.ugcGallery
    : (fallbackGallery || []);

  if (gallery.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Clean, direct section header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            Le produit en images réelles
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1.5">
            Découvrez nos prises de vue authentiques pour apprécier la qualité et la prise en main au quotidien.
          </p>
        </div>

        {/* 3 Photos Grid / Stack - Superbly positioned & 100% mobile responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {gallery.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Photo Box: Clean framing with perfect aspect ratio */}
              <div className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full border border-white/20 shadow-md">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Photo Card Description */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
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
    </section>
  );
};
