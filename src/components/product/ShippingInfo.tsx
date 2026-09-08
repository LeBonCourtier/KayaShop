import React from 'react';
import { MapPin, Clock, CheckCircle } from 'lucide-react';

interface ShippingInfoProps {
  shipping: {
    badge: string;
    zones: string;
    estimatedTime: string;
    details: string[];
  };
}

export const ShippingInfo: React.FC<ShippingInfoProps> = ({ shipping }) => {
  return (
    <section className="py-10 sm:py-16 bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 my-8 shadow-xs">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#d94f26] bg-[#fff5f2] px-3 py-1 rounded-full border border-[#fbdcd2]">
              Acheminement
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-2 tracking-tight">
              Informations de Livraison
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
            <CheckCircle className="w-3.5 h-3.5" />
            {shipping.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zones de livraison */}
          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-zinc-200/80 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white text-[#d94f26] shadow-2xs shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Zones desservies</h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                {shipping.zones}
              </p>
            </div>
          </div>

          {/* Délais */}
          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-zinc-200/80 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white text-[#d94f26] shadow-2xs shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Délais estimés</h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                {shipping.estimatedTime}
              </p>
            </div>
          </div>
        </div>

        {/* Modalités & engagements */}
        <div className="mt-6 pt-6 border-t border-zinc-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Engagements KayaShop :
          </h4>
          <div className="space-y-2">
            {shipping.details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
