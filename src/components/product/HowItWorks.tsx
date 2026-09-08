import React from 'react';
import type { HowItWorksStep } from '../../types/product';
import { CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  steps: HowItWorksStep[];
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 bg-[#faf7f2] rounded-3xl p-6 sm:p-10 border border-zinc-200/80 my-8">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-white px-3 py-1 rounded-full border border-zinc-200 shadow-2xs">
          Guide d'utilisation
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-3 tracking-tight">
          Comment ça marche ?
        </h2>
        <p className="text-sm text-zinc-600 mt-2">
          Une prise en main immédiate en seulement 3 étapes simples.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-extrabold text-xs tracking-wider uppercase text-[#d94f26] bg-[#fff5f2] px-2.5 py-1 rounded-lg border border-[#fbdcd2]">
                  {step.step || `Étape 0${idx + 1}`}
                </span>
                <span className="text-3xl font-black text-zinc-200">0{idx + 1}</span>
              </div>

              <h3 className="font-bold text-base sm:text-lg text-zinc-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-semibold text-emerald-600 gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Simple et rapide</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
