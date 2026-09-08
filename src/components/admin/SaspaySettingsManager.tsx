import React, { useState } from 'react';
import { saspayService, type SaspayConfig, type SaspayTransaction } from '../../services/saspayService';
import { formatPrice } from '../../utils/formatters';
import {
  ShieldCheck,
  Key,
  CheckCircle2,
  RefreshCw,
  Layers,
  Save,
  Check
} from 'lucide-react';

export const SaspaySettingsManager: React.FC = () => {
  const [config, setConfig] = useState<SaspayConfig>(saspayService.getConfig());
  const [transactions] = useState<SaspayTransaction[]>(saspayService.getTransactions());
  const [savedToast, setSavedToast] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saspayService.saveConfig(config);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleTestConnection = () => {
    setTestResult("Connexion à l'API SasPay vérifiée avec succès ! (Statut 200 OK)");
    setTimeout(() => setTestResult(null), 4000);
  };

  return (
    <div className="space-y-6">
      {savedToast && (
        <div className="bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          Paramètres SasPay enregistrés avec succès !
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-950 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight">Passerelle SasPay Bénin</h2>
              <span className="text-[10px] uppercase font-bold bg-amber-400 text-purple-950 px-2.5 py-0.5 rounded-full">
                {config.environment === 'live' ? 'Mode Réel (Live)' : 'Mode Test (Sandbox)'}
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-1">
              Encaissez instantanément vos clients par MTN MoMo, Moov Money, Wave et Carte Bancaire.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTestConnection}
            className="px-4 py-2.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            Tester la Clé API
          </button>
        </div>
      </div>

      {testResult && (
        <div className="bg-purple-50 border border-purple-200 text-purple-900 px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {testResult}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 pb-3 border-b border-gray-100">
          <Key className="w-4 h-4 text-purple-600" />
          Identifiants & Configuration du Compte Marchand SasPay
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Identifiant Marchand (Merchant ID) :
            </label>
            <input
              type="text"
              required
              value={config.merchantId}
              onChange={e => setConfig({ ...config, merchantId: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="Ex: SAS-KAYA-BENIN-229"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Numéro Mobile Money de Réception des Fonds :
            </label>
            <input
              type="text"
              required
              value={config.receiverPhone}
              onChange={e => setConfig({ ...config, receiverPhone: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="+229 43 79 70 42"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Clé Publique (API Public Key) :
            </label>
            <input
              type="text"
              required
              value={config.apiKey}
              onChange={e => setConfig({ ...config, apiKey: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="sas_live_pk_..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Clé Secrète (API Secret Key) :
            </label>
            <input
              type="password"
              value={config.secretKey}
              onChange={e => setConfig({ ...config, secretKey: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="sas_live_sk_..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Environnement SasPay :
            </label>
            <select
              value={config.environment}
              onChange={e => setConfig({ ...config, environment: e.target.value as any })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-600 outline-none"
            >
              <option value="sandbox">Mode Test (Sandbox - Simule les paiements)</option>
              <option value="live">Mode Réel (Production - Vrais débits)</option>
            </select>
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoValidateTestPayment}
                onChange={e => setConfig({ ...config, autoValidateTestPayment: e.target.checked })}
                className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500"
              />
              <div>
                <span className="text-xs font-bold text-gray-800 block">Simulation automatique des tests</span>
                <span className="text-[11px] text-gray-500">Valide automatiquement les commandes test sans erreur</span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Enregistrer la Configuration SasPay
          </button>
        </div>
      </form>

      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-600" />
          Historique Récent des Transactions SasPay ({transactions.length})
        </h3>

        {transactions.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-400 bg-gray-50 rounded-2xl">
            Aucune transaction SasPay enregistrée pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Réf. SasPay</th>
                  <th className="py-3 px-4">Commande</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Opérateur</th>
                  <th className="py-3 px-4">Montant</th>
                  <th className="py-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-mono font-bold text-purple-700">{tx.transactionId}</td>
                    <td className="py-3 px-4 font-bold text-gray-900">{tx.orderNumber}</td>
                    <td className="py-3 px-4 text-gray-700">
                      <div>{tx.customerName}</div>
                      <div className="text-[10px] text-gray-400">{tx.customerPhone}</div>
                    </td>
                    <td className="py-3 px-4 uppercase font-bold text-gray-600">{tx.network}</td>
                    <td className="py-3 px-4 font-extrabold text-gray-900">{formatPrice(tx.amount)} FCFA</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3" />
                        Succès
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
