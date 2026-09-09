import React, { useState, useRef, useEffect } from 'react';
import type { Product } from '../../types/product';
import { ShoppingBag, Search, Menu, X, ArrowRight, PackageCheck, ChevronDown } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  products?: Product[];
  onSelectProduct?: (product: Product) => void;
  onOpenTracking?: () => void;
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  products = [],
  onSelectProduct,
  onOpenTracking,
  onNavigateHome,
  onNavigateShop,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Main Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* Left: Mobile menu toggle + Clean Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-zinc-700 hover:text-zinc-950 rounded-xl hover:bg-zinc-100 transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-[#d94f26] cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo KayaShop -> Navigate Home */}
            <button
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
              }}
              className="group cursor-pointer text-left focus:outline-none transition-transform active:scale-95"
            >
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-zinc-900 leading-none select-none">
                Kaya<span className="text-[#d94f26]">Shop</span>
              </span>
            </button>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 font-medium text-sm text-zinc-600">
            <button
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
              }}
              className="hover:text-[#d94f26] font-semibold transition-colors cursor-pointer"
            >
              Accueil
            </button>

            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className="hover:text-[#d94f26] transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Nos Produits</span>
                <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold rounded-full bg-[#fff5f2] text-[#d94f26]">
                  {products.length}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${productsDropdownOpen ? 'rotate-180 text-[#d94f26]' : ''}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-zinc-200 p-3 space-y-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Sélectionnez un produit :
                  </div>
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(p);
                        setProductsDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#faf7f2] transition-colors text-left group cursor-pointer"
                    >
                      <img
                        src={p.images[0]?.url}
                        alt={p.name}
                        className="w-11 h-11 rounded-lg object-contain bg-zinc-50 border border-zinc-200 p-1 shrink-0 group-hover:border-[#d94f26]/40"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-900 truncate group-hover:text-[#d94f26]">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">{p.category}</p>
                        <p className="text-xs font-extrabold text-[#d94f26]">
                          {formatPrice(p.price, p.currency)}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#d94f26] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {onOpenTracking && (
              <button
                onClick={onOpenTracking}
                className="hover:text-[#d94f26] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <PackageCheck className="w-4 h-4 text-amber-500" />
                <span>Suivre ma commande</span>
              </button>
            )}

            <a href="#faq" className="hover:text-[#d94f26] transition-colors">
              Aide & FAQ
            </a>
          </nav>

          {/* Right: Search, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-full transition-all cursor-pointer ${
                searchOpen
                  ? 'bg-zinc-100 text-[#d94f26]'
                  : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 active:scale-95'
              }`}
              aria-label="Rechercher un produit"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button with animated badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 active:scale-95 rounded-full transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d94f26]"
              aria-label={`Panier (${cartCount} articles)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d94f26] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Live Search Bar with Results Dropdown */}
        {searchOpen && (
          <div className="border-t border-zinc-200/80 bg-zinc-50/95 backdrop-blur-md px-4 py-4 sm:px-6 shadow-inner animate-in fade-in duration-150">
            <div className="max-w-xl mx-auto space-y-3">
              <div className="flex items-center gap-2 bg-white rounded-2xl border border-zinc-300 px-3.5 py-2.5 shadow-sm">
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher (ex: Ouvre-vin, Tensiomètre, piles)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm bg-transparent border-none focus:outline-none text-zinc-800 placeholder-zinc-400"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-zinc-400 hover:text-zinc-700 px-1.5 cursor-pointer"
                  >
                    Effacer
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 ml-1 cursor-pointer"
                >
                  Fermer
                </button>
              </div>

              {/* Live search results */}
              {searchQuery && (
                <div className="bg-white rounded-2xl border border-zinc-200 p-2 shadow-lg divide-y divide-zinc-100 max-h-60 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <p className="p-3 text-xs text-zinc-500 text-center">
                      Aucun produit trouvé pour "{searchQuery}".
                    </p>
                  ) : (
                    searchResults.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(p);
                          setSearchOpen(false);
                          setSearchQuery('');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center justify-between p-2.5 hover:bg-[#faf7f2] rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]?.url}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-contain bg-zinc-50 border border-zinc-200 p-0.5 shrink-0"
                          />
                          <div>
                            <p className="text-xs font-bold text-zinc-900">{p.name}</p>
                            <p className="text-[11px] text-zinc-400">{p.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-[#d94f26]">
                            {formatPrice(p.price, p.currency)}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <button
              className="w-full text-left font-semibold text-zinc-900 py-2 border-b border-zinc-100"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
            >
              Accueil
            </button>
            <button
              className="w-full text-left font-semibold text-[#d94f26] py-2 border-b border-zinc-100"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateShop) onNavigateShop();
                else if (products[0] && onSelectProduct) onSelectProduct(products[0]);
              }}
            >
              Boutique
            </button>
            {onOpenTracking && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracking();
                }}
                className="w-full text-left font-medium text-amber-800 py-2 border-b border-zinc-100 flex items-center gap-1.5 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 text-amber-600" />
                <span>Suivre ma commande</span>
              </button>
            )}
            <a
              href="#faq"
              className="block font-medium text-zinc-700 py-2 border-b border-zinc-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Questions fréquentes
            </a>
            <div className="pt-2 text-xs text-zinc-500 flex items-center justify-between">
              <span>Service client KayaShop</span>
              <span className="font-semibold text-zinc-800">Support 7j/7</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
