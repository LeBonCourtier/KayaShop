import React from 'react';
import { HeartHandshake, ShieldCheck } from 'lucide-react';

interface SocialProofProps {
  items?: {
    type: 'review' | 'image';
    title: string;
    caption: string;
    author?: string;
  }[];
}

export const SocialProof: React.FC<SocialProofProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 bg-[#faf7f2] rounded-3xl p-6 sm:p-10 border border-zinc-200/80 my-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-bold text-zinc-800 shadow-2xs mb-3">
          <HeartHandshake className="w-4 h-4 text-[#d94f26]" />
          <span>Engagement Qualité</span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
          Ils nous font confiance
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl mx-auto">
          KayaShop s'engage pour une expérience d'achat fluide, honnête et sans mauvaise surprise.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fff5f2] border border-[#fbdcd2] flex items-center justify-center text-[#d94f26] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-900">{item.title}</h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">{item.caption}</p>
                {item.author && (
                  <span className="inline-block text-[11px] font-semibold text-[#d94f26] mt-2">
                    {item.author}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
