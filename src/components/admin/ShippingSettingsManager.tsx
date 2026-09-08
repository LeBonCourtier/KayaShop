import React, { useState } from 'react';
import { shippingService, type ShippingZone } from '../../services/shippingService';
import { formatPrice } from '../../utils/formatters';
import {
  Truck,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  CheckCircle2,
  Clock,
  MapPin,
  Save,
  X
} from 'lucide-react';

export const ShippingSettingsManager: React.FC = () => {
  const [zones, setZones] = useState<ShippingZone[]>(shippingService.getZones());
  const [editingZone, setEditingZone] = useState<ShippingZone | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState(1000);
  const [estimatedDelay, setEstimatedDelay] = useState('2h a 4h');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleZone = (id: string, currentActive: boolean) => {
    const updated = shippingService.updateZone(id, { isActive: !currentActive });
    setZones(updated);
    showToast('Zone ' + (!currentActive ? 'activee' : 'desactivee'));
  };

  const handleDeleteZone = (id: string, zoneName: string) => {
    if (window.confirm('Supprimer la zone "' + zoneName + '" ?')) {
      const updated = shippingService.deleteZone(id);
      setZones(updated);
      showToast('Zone supprimee avec succes');
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingZone) return;
    const updated = shippingService.updateZone(editingZone.id, {
      name: editingZone.name,
      description: editingZone.description,
      fee: Number(editingZone.fee),
      estimatedDelay: editingZone.estimatedDelay,
    });
    setZones(updated);
    setEditingZone(null);
    showToast('Zone modifiee avec succes');
  };

  const handleAddZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const updated = shippingService.addZone({
      name,
      description,
      fee: Number(fee),
      estimatedDelay,
      isActive: true,
    });
    setZones(updated);
    setIsAdding(false);
    setName('');
    setDescription('');
    setFee(1000);
    setEstimatedDelay('2h a 4h');
    showToast('Nouvelle zone de livraison ajoutee !');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Retablir les zones et tarifs de livraison par defaut du Benin ?')) {
      const def = shippingService.resetToDefault();
      setZones(def);
      showToast('Zones reinitialisees avec succes');
    }
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className="bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          {notification}
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Tarification & Zones de Livraison (Bénin)</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Configurez les frais de port et delais appliques automatiquement lors de la commande client.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            Retablir Villes Benin
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="px-5 py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Ajouter une Zone
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-amber-50/60 border-2 border-amber-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-600" />
              Ajouter une Nouvelle Ville / Région de Livraison
            </h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAddZone} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nom de la Zone / Ville :</label>
              <input
                type="text"
                required
                placeholder="Ex: Ouidah & Pahou"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Frais de Livraison (FCFA) :</label>
              <input
                type="number"
                required
                min={0}
                step={100}
                value={fee}
                onChange={e => setFee(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none font-bold text-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Délai estimé :</label>
              <input
                type="text"
                required
                placeholder="Ex: 2h à 4h (Express) ou 24h ouvrées"
                value={estimatedDelay}
                onChange={e => setEstimatedDelay(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Quartiers / Précisions :</label>
              <input
                type="text"
                placeholder="Ex: Centre ville, Djègba, Tokpa, etc."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 rounded-xl"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow"
              >
                Enregistrer la Zone
              </button>
            </div>
          </form>
        </div>
      )}

      {editingZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-amber-500" />
                Modifier la zone : {editingZone.name}
              </h3>
              <button onClick={() => setEditingZone(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nom :</label>
                <input
                  type="text"
                  required
                  value={editingZone.name}
                  onChange={e => setEditingZone({ ...editingZone, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Frais de Livraison (FCFA) :</label>
                <input
                  type="number"
                  required
                  min={0}
                  step={100}
                  value={editingZone.fee}
                  onChange={e => setEditingZone({ ...editingZone, fee: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none font-bold text-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Délai estimé :</label>
                <input
                  type="text"
                  required
                  value={editingZone.estimatedDelay}
                  onChange={e => setEditingZone({ ...editingZone, estimatedDelay: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Détails / Quartiers :</label>
                <textarea
                  rows={2}
                  value={editingZone.description}
                  onChange={e => setEditingZone({ ...editingZone, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingZone(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map(zone => (
          <div
            key={zone.id}
            className={'p-5 rounded-3xl border transition flex flex-col justify-between ' + (
              zone.isActive ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-100/70 border-gray-200 opacity-60'
            )}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <h4 className="font-bold text-gray-900 text-sm leading-snug">{zone.name}</h4>
                </div>
                <span className="font-extrabold text-sm text-amber-600 shrink-0 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                  {formatPrice(zone.fee)} FCFA
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{zone.description}</p>

              <div className="flex items-center gap-1.5 mt-3 text-[11px] text-gray-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Délai : <strong className="text-gray-900">{zone.estimatedDelay}</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={zone.isActive}
                  onChange={() => handleToggleZone(zone.id, zone.isActive)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs font-semibold text-gray-600">
                  {zone.isActive ? 'Active' : 'Désactivée'}
                </span>
              </label>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingZone(zone)}
                  className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                  title="Modifier"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteZone(zone.id, zone.name)}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
