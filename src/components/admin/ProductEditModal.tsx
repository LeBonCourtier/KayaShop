import React, { useState, useEffect } from 'react';
import { X, Save, Sparkles, CheckCircle2, Eye } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';

interface ProductEditModalProps {
  product: Product | null; // null means creating a new product
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product> & { name: string; price: number }) => void;
}

const PRESET_IMAGES = [
  { label: 'Ouvre-vin électrique', url: '/images/products/wine-opener-1.png' },
  { label: 'Tensiomètre Électronique', url: '/images/products/blood-pressure-1.png' },
];

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isEditing = !!product;

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || 'Maison & Art de la table');
  const [price, setPrice] = useState<number | string>(product?.price || 10000);
  const [compareAtPrice, setCompareAtPrice] = useState<number | string>(product?.compareAtPrice || '');
  const [tagline, setTagline] = useState(product?.tagline || '');
  const [valueProposition, setValueProposition] = useState(product?.valueProposition || '');
  const [imageUrl, setImageUrl] = useState(product?.images[0]?.url || '/images/products/wine-opener-1.png');
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [stockNote, setStockNote] = useState(product?.stockNote || 'En stock — expédié sous 24h');
  const [shortDescription, setShortDescription] = useState(product?.shortDescription || '');
  const [packageContents, setPackageContents] = useState(
    product?.packageContents?.join('\n') || '1x Appareil\n1x Câble / Accessoire\n1x Manuel d’utilisation'
  );

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setCompareAtPrice(product.compareAtPrice || '');
      setTagline(product.tagline);
      setValueProposition(product.valueProposition);
      setImageUrl(product.images[0]?.url || '/images/products/wine-opener-1.png');
      setInStock(product.inStock);
      setStockNote(product.stockNote || 'En stock — expédié sous 24h');
      setShortDescription(product.shortDescription);
      setPackageContents(product.packageContents?.join('\n') || '');
    } else {
      setName('');
      setCategory('Maison & Art de la table');
      setPrice(10000);
      setCompareAtPrice(15000);
      setTagline('Solution pratique et innovante pour simplifier votre quotidien.');
      setValueProposition('Gagnez du temps et profitez d’un confort maximal à chaque utilisation.');
      setImageUrl('/images/products/wine-opener-1.png');
      setInStock(true);
      setStockNote('En stock — expédié sous 24h');
      setShortDescription('Un appareil moderne et performant spécialement sélectionné par KayaShop.');
      setPackageContents('1x Article principal\n1x Manuel d’utilisation\n1x Coffret de protection');
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedContents = packageContents
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      ...(product || {}),
      id: product?.id,
      name: name.trim(),
      category: category.trim(),
      price: Number(price) || 10000,
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      tagline: tagline.trim(),
      valueProposition: valueProposition.trim(),
      inStock,
      stockNote: stockNote.trim(),
      shortDescription: shortDescription.trim(),
      packageContents: parsedContents,
      images: [
        {
          id: product?.images[0]?.id || `img_${Date.now()}`,
          url: imageUrl.trim() || '/images/products/wine-opener-1.png',
          alt: name.trim(),
          isPrimary: true,
        },
      ],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-zinc-900 text-zinc-100 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-zinc-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#d94f26] text-white flex items-center justify-center font-bold text-base shadow-lg shadow-[#d94f26]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                {isEditing ? `Modifier : ${product.name}` : 'Ajouter un Nouveau Produit'}
              </h3>
              <p className="text-xs text-zinc-400">
                Catalogue Boutique KayaShop
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Form Fields Left Column */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Product Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Nom du Produit *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Humidificateur LED Silencieux"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Catégorie *
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ex: Maison, Santé, Accessoires..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26]"
                  />
                </div>
              </div>

              {/* Price & Compare Price (in FCFA) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Prix de Vente (FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    step={100}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="10000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26] font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Ancien Prix / Barré (FCFA)
                  </label>
                  <input
                    type="number"
                    min={100}
                    step={100}
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    placeholder="15000 (Optionnel)"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26] font-mono"
                  />
                </div>
              </div>

              {/* Tagline & Value Proposition */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Phrase d'Accroche Courte (Tagline)
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Profitez d'un confort unique au quotidien..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Proposition de Valeur / Argument Fort
                </label>
                <textarea
                  rows={2}
                  value={valueProposition}
                  onChange={(e) => setValueProposition(e.target.value)}
                  placeholder="Expliquez en 1 ou 2 phrases pourquoi le client doit absolument commander ce produit..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26] resize-none"
                />
              </div>

              {/* Image URL & Presets */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Image Principale du Produit (URL ou chemin local)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/images/products/... ou https://..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26]"
                  />
                </div>
                
                {/* Image Presets */}
                <div className="flex flex-wrap gap-2 mt-2 items-center">
                  <span className="text-[11px] text-zinc-400">Suggestions d'images :</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className="px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] rounded-lg text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Management */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="stock-toggle"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 accent-[#d94f26] rounded cursor-pointer"
                  />
                  <label htmlFor="stock-toggle" className="text-xs font-bold text-zinc-200 cursor-pointer">
                    Produit disponible en stock
                  </label>
                </div>

                <div>
                  <input
                    type="text"
                    value={stockNote}
                    onChange={(e) => setStockNote(e.target.value)}
                    placeholder="En stock — expédié sous 24h"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-[#d94f26]"
                  />
                </div>
              </div>

              {/* Package contents */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Contenu du Colis / Coffret (1 élément par ligne)
                </label>
                <textarea
                  rows={3}
                  value={packageContents}
                  onChange={(e) => setPackageContents(e.target.value)}
                  placeholder="1x Produit principal&#10;1x Câble de recharge&#10;1x Manuel"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26] font-mono text-xs resize-none"
                />
              </div>

            </div>

            {/* Right Column: Live Card Preview */}
            <div className="lg:col-span-4 bg-zinc-950 rounded-2xl p-4 border border-zinc-800 space-y-3 sticky top-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#d94f26]" />
                  Aperçu Carte Boutique
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                  En Direct
                </span>
              </div>

              {/* Mini Product Card Preview */}
              <div className="bg-white rounded-2xl p-3 text-zinc-900 shadow-md space-y-2.5">
                <div className="relative aspect-square rounded-xl bg-zinc-50 overflow-hidden flex items-center justify-center p-2 border border-zinc-100">
                  <img
                    src={imageUrl || '/images/products/wine-opener-1.png'}
                    alt={name || 'Aperçu'}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d94f26] text-white">
                    {category || 'Catégorie'}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-zinc-900 line-clamp-1">
                    {name || 'Nom du produit'}
                  </h4>
                  <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                    {tagline || 'Description d’accroche...'}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pt-1 border-t border-zinc-100">
                  <span className="font-black text-sm text-[#d94f26]">
                    {formatPrice(Number(price) || 10000, 'FCFA')}
                  </span>
                  {compareAtPrice && Number(compareAtPrice) > Number(price) && (
                    <span className="text-[11px] text-zinc-400 line-through">
                      {formatPrice(Number(compareAtPrice), 'FCFA')}
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{inStock ? stockNote || 'En stock' : 'Rupture temporaire'}</span>
                </div>
              </div>

              <div className="text-[11px] text-zinc-500 space-y-1 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/60">
                <p>💡 <strong>Note :</strong> Dès la sauvegarde, la page produit dédiée sera automatiquement créée avec la structure complète.</p>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#d94f26] hover:bg-[#c2431e] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#d94f26]/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Enregistrer les Modifications' : 'Créer et Publier le Produit'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
