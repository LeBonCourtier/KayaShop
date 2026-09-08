import React, { useState, useEffect } from 'react';
import type { ProductImage } from '../../types/product';
import { Maximize2, X, ChevronLeft, ChevronRight, Play, Eye } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  videoUrl?: string;
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  videoUrl,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Reset selected index when images change
  useEffect(() => {
    setSelectedIndex(0);
    setShowVideo(false);
  }, [images]);

  const activeImage = images[selectedIndex] || images[0];

  // Mobile Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      if (selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
        setShowVideo(false);
      }
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
        setShowVideo(false);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowVideo(false);
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowVideo(false);
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 sm:gap-4 select-none">
      
      {/* Thumbnails (Only if multiple images or video exists) */}
      {(images.length > 1 || videoUrl) && (
        <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto max-h-[500px] scrollbar-none py-1">
          {images.map((img, index) => {
            const isSelected = selectedIndex === index && !showVideo;
            return (
              <button
                key={img.id || index}
                onClick={() => {
                  setSelectedIndex(index);
                  setShowVideo(false);
                }}
                className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border-2 transition-all p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d94f26] ${
                  isSelected
                    ? 'border-[#d94f26] ring-2 ring-[#d94f26]/20 shadow-sm scale-102'
                    : 'border-zinc-200/80 hover:border-zinc-400 opacity-80 hover:opacity-100'
                }`}
                aria-label={`Afficher image ${index + 1}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-contain object-center rounded-lg"
                  loading="lazy"
                />
              </button>
            );
          })}

          {/* Video Thumbnail placeholder if video exists */}
          {videoUrl && (
            <button
              onClick={() => setShowVideo(true)}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 border-2 transition-all flex flex-col items-center justify-center text-white cursor-pointer ${
                showVideo
                  ? 'border-[#d94f26] ring-2 ring-[#d94f26]/20 shadow-sm'
                  : 'border-zinc-700 hover:border-zinc-500 opacity-80'
              }`}
              aria-label="Afficher la vidéo produit"
            >
              <Play className="w-6 h-6 text-[#d94f26] fill-[#d94f26]" />
              <span className="text-[10px] font-bold mt-1">VIDÉO</span>
            </button>
          )}
        </div>
      )}

      {/* Main Showcase Image */}
      <div className="relative flex-1 bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/80 p-4 sm:p-8 flex items-center justify-center aspect-square max-h-[460px] sm:max-h-[520px] shadow-sm overflow-hidden group">
        
        {/* Mobile Swipe Container */}
        <div
          className="w-full h-full flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {showVideo && videoUrl ? (
            <div className="w-full h-full flex items-center justify-center bg-black rounded-2xl">
              <iframe
                src={videoUrl}
                title="Vidéo de présentation produit"
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={activeImage?.url}
              alt={activeImage?.alt || productName}
              className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-103 cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
              loading="eager"
            />
          )}
        </div>

        {/* Top Badges: Counter (Only if multiple images) */}
        {images.length > 1 && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 pointer-events-none">
            <span className="bg-zinc-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-zinc-950 shadow-md backdrop-blur-md transition-all sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
          aria-label="Agrandir en plein écran"
          title="Zoom plein écran"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Prev / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-zinc-800 shadow-md backdrop-blur-md transition-all sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-white/85 hover:bg-white text-zinc-800 shadow-md backdrop-blur-md transition-all sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Hint for Mobile */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none sm:hidden">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
            <Eye className="w-3 h-3" />
            <span>Glisser pour naviguer • Toucher pour zoomer</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-lg animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Vue plein écran du produit"
        >
          {/* Header of modal */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-zinc-100">{productName}</h3>
              <p className="text-xs text-zinc-400">
                Image {selectedIndex + 1} sur {images.length}
              </p>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
              aria-label="Fermer le plein écran"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Fullscreen Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={activeImage?.url}
              alt={activeImage?.alt || productName}
              className="max-h-[80vh] max-w-[90vw] object-contain object-center rounded-xl transition-all"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-6 p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-6 p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails inside Modal */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all p-1 bg-zinc-900 cursor-pointer ${
                  selectedIndex === idx ? 'border-[#d94f26] scale-105' : 'border-zinc-700 opacity-60'
                }`}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
