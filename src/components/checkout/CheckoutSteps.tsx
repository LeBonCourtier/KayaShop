import React from 'react';
import { User, MapPin, CreditCard, Check } from 'lucide-react';

interface CheckoutStepsProps {
  currentStep: number; // 1, 2, 3
  onStepClick?: (step: number) => void;
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, label: 'Coordonnées', icon: User },
    { number: 2, label: 'Livraison', icon: MapPin },
    { number: 3, label: 'Paiement', icon: CreditCard },
  ];

  return (
    <nav aria-label="Progression de la commande" className="w-full py-2">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-zinc-200 -z-0" />
        <div
          className="absolute top-1/2 left-6 -translate-y-1/2 h-0.5 bg-[#d94f26] transition-all duration-300 -z-0"
          style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const Icon = step.icon;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => {
                if (isCompleted && onStepClick) onStepClick(step.number);
              }}
              disabled={!isCompleted}
              className="flex flex-col items-center gap-1.5 relative z-10 group cursor-pointer disabled:cursor-default focus:outline-none"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-xs ${
                  isCompleted
                    ? 'bg-[#d94f26] text-white ring-4 ring-[#fff5f2]'
                    : isCurrent
                    ? 'bg-[#18181b] text-white ring-4 ring-zinc-100 scale-105'
                    : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold transition-colors ${
                  isCurrent ? 'text-zinc-900' : isCompleted ? 'text-[#d94f26]' : 'text-zinc-400'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
