import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Package,
  RotateCcw,
} from 'lucide-react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { ProductEditModal } from './ProductEditModal';

interface ProductListManagerProps {
  products: Product[];
  onSaveProduct: (product: Partial<Product> & { name: string; price: number }) => void;
  onDeleteProduct: (id: string) => void;
  onToggleStock: (id: string) => void;
  onResetDefaults: () => void;
  onPreviewProduct: (product: Product) => void;
}

export const ProductListManager: React.FC<ProductListManagerProps> = ({
  products,
  onSaveProduct,
  onDeleteProduct,
  onToggleStock,
  onResetDefaults,
  onPreviewProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Categories list
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchTag = (p.tagline || '').toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchTag) return false;
    }
    return true;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleDelete = (p: Product) => {
    if (window.confirm(`Voulez-vous vraiment supprimer le produit "${p.name}" du catalogue ?`)) {
      onDeleteProduct(p.id);
    }
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous réinitialiser le catalogue avec les produits initiaux de KayaShop ?')) {
      onResetDefaults();
    }
  };

  return (
    <div className="space-y-5">
      {/* Top action & search bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search & Category Pills */}
        <div className="w-full md:w-auto flex-1 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#d94f26] text-white'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              Toutes ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#d94f26] text-white'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold border border-zinc-800 transition-colors cursor-pointer"
            title="Réinitialiser le catalogue d'origine"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Réinitialiser</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d94f26] to-[#eb5a2d] hover:from-[#c03d15] hover:to-[#d94f26] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#d94f26]/20 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Produit</span>
          </button>
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((p) => {
          const mainImage = p.images[0]?.url || '/images/products/wine-opener-1.png';

          return (
            <div
              key={p.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-4 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all group"
            >
              {/* Top part: Image + Details */}
              <div className="space-y-3">
                
                <div className="flex gap-3.5 items-start">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-white p-1.5 border border-zinc-800 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={mainImage}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {p.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-zinc-100 line-clamp-1 mt-1">
                      {p.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-sm text-[#d94f26]">
                        {formatPrice(p.price, p.currency || 'FCFA')}
                      </span>
                      {p.compareAtPrice && p.compareAtPrice > p.price && (
                        <span className="text-[11px] text-zinc-500 line-through">
                          {formatPrice(p.compareAtPrice, p.currency || 'FCFA')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {p.tagline || p.shortDescription}
                </p>

                {/* Stock Toggle status */}
                <div className="flex items-center justify-between p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        p.inStock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                      }`}
                    />
                    <span className={p.inStock ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                      {p.inStock ? 'En stock' : 'Rupture'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleStock(p.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                      p.inStock
                        ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300'
                        : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {p.inStock ? 'Passer en Rupture' : 'Rétablir le Stock'}
                  </button>
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => onPreviewProduct(p)}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-800 transition-colors cursor-pointer"
                  title="Voir la fiche produit sur la boutique"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Voir</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(p)}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white font-semibold text-xs border border-blue-500/30 transition-colors cursor-pointer"
                  title="Modifier le produit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Modifier</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(p)}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white font-semibold text-xs border border-rose-500/20 transition-colors cursor-pointer"
                  title="Supprimer du catalogue"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Suppr.</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <Package className="w-10 h-10 text-zinc-600 mx-auto" />
          <p className="text-sm font-bold text-zinc-300">Aucun produit trouvé</p>
          <p className="text-xs text-zinc-500">
            Essayez de modifier votre recherche ou ajoutez un nouveau produit.
          </p>
        </div>
      )}

      {/* Edit / Create Modal */}
      <ProductEditModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveProduct}
      />
    </div>
  );
};
