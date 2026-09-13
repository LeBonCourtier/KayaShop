import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../../types/product';
import { sendWhatsAppOrder } from '../../utils/whatsapp';
import { X, Play, Volume2, VolumeX, MessageCircle, CheckCircle2, RotateCcw } from 'lucide-react';

interface UGCVideoModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface ScriptScene {
  time: number; // in seconds
  caption: string;
  highlight?: string;
  image?: string;
}

const PRODUCT_SCRIPTS: Record<string, { voiceText: string; scenes: ScriptScene[]; ugcImage: string }> = {
  'ouvre-vin-electrique': {
    ugcImage: '/images/ugc/ugc-wine-1.jpg',
    voiceText:
      "Si toi aussi tu en as marre des bouchons de vin cassés, regarde ça ! Avec l'ouvre-vin électrique KayaShop, tu poses l'appareil sur la bouteille, tu appuies sur le bouton, et en moins de six secondes ta bouteille est ouverte sans aucun effort. Livré avec son coffret complet. Commande dès maintenant sur WhatsApp, livraison 24h partout au Bénin avec contrôle du colis avant paiement !",
    scenes: [
      { time: 0, caption: "Fini les bouchons de vin cassés ! 🍷", highlight: "Fini les bouchons", image: '/images/ugc/ugc-wine-1.jpg' },
      { time: 3.5, caption: "Pose l'appareil sur la bouteille et appuie sur le bouton ⚡", highlight: "Pose l'appareil", image: '/images/ugc/ugc-wine-3.jpg' },
      { time: 8, caption: "Ouvert en 6 secondes chrono sans forcer ! ✨", highlight: "6 secondes chrono", image: '/images/ugc/ugc-wine-3.jpg' },
      { time: 13, caption: "Coffret complet avec accessoires inclus 🎁", highlight: "Coffret complet", image: '/images/ugc/ugc-wine-2.jpg' },
      { time: 17, caption: "Livraison 24h au Bénin • Contrôle du colis avant paiement 🚚", highlight: "Paiement à la livraison", image: '/images/ugc/ugc-wine-1.jpg' },
    ],
  },
  'tensiometre-electrique-rechargeable': {
    ugcImage: '/images/ugc/ugc-tensio-1.jpg',
    voiceText:
      "Surveiller sa tension à la maison n'a jamais été aussi simple. Ce tensiomètre digital de bras mesure votre pression artérielle et votre pouls en un seul clic. Grand écran ultra lisible, idéal pour vous et vos parents. Commandez maintenant sur WhatsApp, livraison rapide au Bénin avec paiement à la réception !",
    scenes: [
      { time: 0, caption: "Surveillez votre santé facilement à domicile 🩺", highlight: "Santé à domicile", image: '/images/ugc/ugc-tensio-1.jpg' },
      { time: 4, caption: "Un seul clic pour une mesure ultra précise 📊", highlight: "Mesure précise", image: '/images/ugc/ugc-tensio-2.jpg' },
      { time: 9, caption: "Grand écran digital clair & facile à lire 👀", highlight: "Grand écran", image: '/images/ugc/ugc-tensio-3.jpg' },
      { time: 14, caption: "Idéal pour toute la famille et vos parents ❤️", highlight: "Toute la famille", image: '/images/ugc/ugc-tensio-1.jpg' },
      { time: 18, caption: "Livraison 24h/48h Bénin • Paiement à la réception 🚀", highlight: "Paiement à la réception", image: '/images/ugc/ugc-tensio-2.jpg' },
    ],
  },
  'tensiometre-bras-electronique': {
    ugcImage: '/images/ugc/ugc-tensio-1.jpg',
    voiceText:
      "Surveiller sa tension à la maison n'a jamais été aussi simple. Ce tensiomètre digital de bras mesure votre pression artérielle et votre pouls en un seul clic. Grand écran ultra lisible, idéal pour vous et vos parents. Commandez maintenant sur WhatsApp, livraison rapide au Bénin avec paiement à la réception !",
    scenes: [
      { time: 0, caption: "Surveillez votre santé facilement à domicile 🩺", highlight: "Santé à domicile", image: '/images/ugc/ugc-tensio-1.jpg' },
      { time: 4, caption: "Un seul clic pour une mesure ultra précise 📊", highlight: "Mesure précise", image: '/images/ugc/ugc-tensio-2.jpg' },
      { time: 9, caption: "Grand écran digital clair & facile à lire 👀", highlight: "Grand écran", image: '/images/ugc/ugc-tensio-3.jpg' },
      { time: 14, caption: "Idéal pour toute la famille et vos parents ❤️", highlight: "Toute la famille", image: '/images/ugc/ugc-tensio-1.jpg' },
      { time: 18, caption: "Livraison 24h/48h Bénin • Paiement à la réception 🚀", highlight: "Paiement à la réception", image: '/images/ugc/ugc-tensio-2.jpg' },
    ],
  },
};

export const UGCVideoModal: React.FC<UGCVideoModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeCaption, setActiveCaption] = useState('');
  
  const timerRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const productData = PRODUCT_SCRIPTS[product.slug] || {
    ugcImage: product.images[0]?.url || '/images/products/wine-opener-1.png',
    voiceText: `Découvrez ${product.name} chez KayaShop. Pratique, fiable et testé. Commandez sur WhatsApp avec livraison rapide au Bénin et paiement à réception !`,
    scenes: [
      { time: 0, caption: `Découvrez ${product.name} ! ✨`, highlight: product.name },
      { time: 4, caption: "Qualité certifiée et simplicité au quotidien ⚡", highlight: "Qualité certifiée" },
      { time: 9, caption: "Commandez en 1 clic sur WhatsApp 📲", highlight: "WhatsApp" },
      { time: 14, caption: "Paiement et contrôle à la livraison 🚚", highlight: "Paiement à la livraison" },
    ],
  };

  const totalDuration = 22; // 22 seconds

  // Initialize Speech
  const startVoice = () => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(productData.voiceText);
      utterance.lang = 'fr-FR';
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Find French voice if available
      const voices = window.speechSynthesis.getVoices();
      const frVoice = voices.find((v) => v.lang.startsWith('fr'));
      if (frVoice) utterance.voice = frVoice;

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopVoice();
    } else {
      setIsPlaying(true);
      if (currentTime >= totalDuration) {
        setCurrentTime(0);
      }
      startVoice();
    }
  };

  // Auto-start on open
  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      setIsPlaying(true);
      const timer = setTimeout(() => {
        startVoice();
      }, 300);
      return () => {
        clearTimeout(timer);
        stopVoice();
      };
    } else {
      setIsPlaying(false);
      stopVoice();
    }
  }, [isOpen, product.slug]);

  // Handle Mute toggle
  useEffect(() => {
    if (isMuted) {
      stopVoice();
    } else if (isPlaying) {
      startVoice();
    }
  }, [isMuted]);

  // Main video clock loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= totalDuration) {
            setIsPlaying(false);
            stopVoice();
            return totalDuration;
          }
          return next;
        });
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const [activeImage, setActiveImage] = useState(productData.ugcImage);

  // Update current caption and image based on timestamp
  useEffect(() => {
    const scenes = productData.scenes;
    let found = scenes[0];
    for (let i = scenes.length - 1; i >= 0; i--) {
      if (currentTime >= scenes[i].time) {
        found = scenes[i];
        break;
      }
    }
    setActiveCaption(found.caption);
    if (found.image) {
      setActiveImage(found.image);
    }
  }, [currentTime, productData.scenes]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, (currentTime / totalDuration) * 100);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Vidéo de démonstration UGC"
    >
      <div className="relative w-full max-w-[360px] sm:max-w-[390px] aspect-[9/16] max-h-[92vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-700 flex flex-col justify-between select-none">
        
        {/* Background Image with Cinematic Ken Burns Movement */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-900">
          <img
            key={activeImage}
            src={activeImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out animate-fade-in ${
              isPlaying ? 'scale-110 translate-y-[-2%]' : 'scale-100 translate-y-0'
            }`}
          />
          {/* Top & Bottom Gradient Shadows */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
        </div>

        {/* Top Controls Bar */}
        <div className="relative z-20 p-3.5 space-y-2">
          {/* Progress Bar (Stories / TikTok style) */}
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d94f26] to-amber-400 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wide">Démo UGC Direct</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 hover:text-white border border-white/15 cursor-pointer transition-transform active:scale-90"
                title={isMuted ? 'Activer le son' : 'Couper le son'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />}
              </button>

              <button
                onClick={() => {
                  stopVoice();
                  onClose();
                }}
                className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 hover:text-white border border-white/15 cursor-pointer transition-transform active:scale-90"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Tap to Play / Pause Icon Overlay */}
        <div
          onClick={togglePlay}
          className="relative z-10 flex-1 flex items-center justify-center cursor-pointer"
        >
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transition-transform transform active:scale-90 hover:scale-110">
              {currentTime >= totalDuration ? (
                <RotateCcw className="w-8 h-8 text-amber-400" />
              ) : (
                <Play className="w-8 h-8 fill-white ml-1" />
              )}
            </div>
          )}
        </div>

        {/* Bottom Overlay: Animated Captions + Product Box + WhatsApp Button */}
        <div className="relative z-20 p-3.5 sm:p-4 space-y-3">
          
          {/* Animated TikTok / Reels Style Yellow Captions */}
          <div className="text-center min-h-[52px] flex items-center justify-center">
            <div className="inline-block bg-black/75 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl shadow-xl animate-fade-in-up">
              <p className="text-xs sm:text-sm font-black text-amber-300 tracking-wide leading-snug drop-shadow-md">
                {activeCaption}
              </p>
            </div>
          </div>

          {/* Product Mini Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-lg border border-white/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-11 h-11 rounded-xl object-contain bg-[#faf7f2] border border-zinc-200 p-0.5 shrink-0"
              />
              <div className="truncate">
                <h4 className="font-black text-xs text-zinc-900 truncate">{product.name}</h4>
                <p className="text-xs font-black text-[#d94f26]">
                  {new Intl.NumberFormat('fr-FR').format(product.price)} {product.currency || 'FCFA'}
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              24h Bénin
            </span>
          </div>

          {/* WhatsApp Direct Buy Button */}
          <button
            onClick={() => {
              stopVoice();
              sendWhatsAppOrder({
                productName: product.name,
                price: product.price,
                quantity: 1,
                currency: product.currency,
              });
            }}
            className="w-full btn-shimmer py-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>COMMANDER SUR WHATSAPP</span>
          </button>
        </div>

      </div>
    </div>
  );
};
