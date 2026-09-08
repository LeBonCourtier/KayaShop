import React, { useState } from 'react';
import type { ProductSpecification } from '../../types/product';
import { ChevronDown, ChevronUp, Package, Sliders, FileText, Check } from 'lucide-react';

interface ProductDescriptionProps {
  shortDescription: string;
  detailedDescription: string;
  specifications: ProductSpecification[];
  packageContents: string[];
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  shortDescription,
  detailedDescription,
  specifications,
  packageContents,
}) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'package'>('desc');
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-10 sm:py-16 border-t border-zinc-200/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
            Détails complets
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-3 tracking-tight">
            Description & Caractéristiques
          </h2>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center justify-center gap-3 border-b border-zinc-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('desc')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'desc'
                ? 'bg-[#18181b] text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Description détaillée</span>
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-[#18181b] text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Caractéristiques ({specifications.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('package')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'package'
                ? 'bg-[#18181b] text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Contenu du colis ({packageContents.length})</span>
          </button>
        </div>

        {/* Desktop Content Panel */}
        <div className="hidden md:block bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-xs">
          {activeTab === 'desc' && (
            <div className="space-y-4">
              <p className="text-base font-semibold text-zinc-900 leading-relaxed">
                {shortDescription}
              </p>
              <div className="h-px bg-zinc-100 my-4" />
              <p className="text-sm text-zinc-600 leading-relaxed">
                {detailedDescription}
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="divide-y divide-zinc-100">
              {specifications.map((spec, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between text-sm">
                  <span className="font-semibold text-zinc-700">{spec.label}</span>
                  <span className="text-zinc-900 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'package' && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-zinc-900 mb-4">
                Ce que vous recevrez dans votre commande :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packageContents.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#faf8f5] border border-zinc-200/70"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-zinc-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Accordions */}
        <div className="md:hidden space-y-3">
          {/* Accordion 1: Description */}
          <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('desc')}
              className="w-full p-4 flex items-center justify-between font-bold text-sm text-zinc-900 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#d94f26]" />
                <span>Description détaillée</span>
              </div>
              {openAccordion === 'desc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'desc' && (
              <div className="p-4 pt-0 text-xs sm:text-sm text-zinc-600 space-y-3 border-t border-zinc-100">
                <p className="font-semibold text-zinc-900 pt-3">{shortDescription}</p>
                <p className="leading-relaxed">{detailedDescription}</p>
              </div>
            )}
          </div>

          {/* Accordion 2: Specs */}
          <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('specs')}
              className="w-full p-4 flex items-center justify-between font-bold text-sm text-zinc-900 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#d94f26]" />
                <span>Caractéristiques ({specifications.length})</span>
              </div>
              {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'specs' && (
              <div className="p-4 pt-0 divide-y divide-zinc-100 text-xs border-t border-zinc-100">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-zinc-500">{spec.label}</span>
                    <span className="font-semibold text-zinc-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 3: Package Contents */}
          <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('package')}
              className="w-full p-4 flex items-center justify-between font-bold text-sm text-zinc-900 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#d94f26]" />
                <span>Contenu du colis ({packageContents.length})</span>
              </div>
              {openAccordion === 'package' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'package' && (
              <div className="p-4 pt-0 space-y-2 text-xs border-t border-zinc-100">
                <p className="font-semibold text-zinc-800 pt-3">Inclus dans la boîte :</p>
                {packageContents.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-1 text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
