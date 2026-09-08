import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  category: string;
  productName: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ category, productName }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 sm:py-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-zinc-500">
        <li className="flex items-center gap-1.5 hover:text-zinc-800 transition-colors">
          <a href="#" className="flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">Accueil</span>
          </a>
        </li>
        <li className="text-zinc-300">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="hover:text-zinc-800 transition-colors">
          <a href="#">Boutique</a>
        </li>
        {category && (
          <>
            <li className="text-zinc-300">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="hidden sm:inline-block hover:text-zinc-800 transition-colors">
              <a href="#">{category}</a>
            </li>
          </>
        )}
        <li className="text-zinc-300">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li className="font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
          {productName}
        </li>
      </ol>
    </nav>
  );
};
