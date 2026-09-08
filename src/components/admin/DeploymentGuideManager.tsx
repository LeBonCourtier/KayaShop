import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  Copy,
  ShieldCheck
} from 'lucide-react';

export const DeploymentGuideManager: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
            <Globe className="w-8 h-8 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Mise en Ligne & Nom de Domaine</h2>
            <p className="text-xs text-emerald-200 mt-1">
              Déployez KayaShop gratuitement sur le web avec certificat SSL (HTTPS) et connectez votre nom de domaine (.bj, .com, etc.).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Fichiers Vercel & Netlify prêts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-base">
              ▲
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm">Déploiement sur Vercel (Recommandé)</h3>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                100% Gratuit & Ultra Rapide
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Vercel offre des performances optimales avec CDN mondial et SSL automatique.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 text-xs">
            <div className="font-bold text-gray-700">Paramètres de Build sur Vercel :</div>
            <div className="font-mono text-[11px] text-gray-800 space-y-1">
              <div>• <strong>Framework Preset :</strong> Vite</div>
              <div>• <strong>Build Command :</strong> <code className="bg-white px-1.5 py-0.5 rounded border">npm run build</code></div>
              <div>• <strong>Output Directory :</strong> <code className="bg-white px-1.5 py-0.5 rounded border">dist</code></div>
            </div>
          </div>
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Déployer sur Vercel</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base">
              ⚡
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm">Déploiement sur Netlify</h3>
              <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full">
                Glisser-Déposer Instantané
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Vous pouvez simplement glisser-déposer le dossier <code className="bg-gray-100 px-1 py-0.5 rounded font-mono font-bold">dist</code> sur Netlify Drop pour une mise en ligne en 10 secondes.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 text-xs">
            <div className="font-bold text-gray-700">Lien Direct Netlify Drop :</div>
            <p className="text-[11px] text-gray-500">
              Glissez le dossier <code>dist</code> généré par la compilation.
            </p>
          </div>
          <a
            href="https://app.netlify.com/drop"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Ouvrir Netlify Drop</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-sm">
              Comment connecter votre Nom de Domaine Personnalisé (ex: kayashop.bj ou kayashop.com)
            </h3>
            <p className="text-xs text-gray-500">
              Associez votre nom de domaine acheté chez Jeny SAS, LWS, Namecheap ou GoDaddy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">1. Enregistrement CNAME (Sous-domaine www)</span>
              <button
                onClick={() => copyToClipboard('cname.vercel-dns.com', 'cname')}
                className="text-[10px] text-purple-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <Copy className="w-3 h-3" />
                {copied === 'cname' ? 'Copié !' : 'Copier la cible'}
              </button>
            </div>
            <div className="text-xs font-mono bg-white p-2.5 rounded-xl border border-gray-200 text-gray-800">
              <div>Type: <strong>CNAME</strong></div>
              <div>Nom: <strong>www</strong></div>
              <div>Valeur: <strong>cname.vercel-dns.com</strong></div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">2. Enregistrement A (Domaine racine @)</span>
              <button
                onClick={() => copyToClipboard('76.76.21.21', 'a')}
                className="text-[10px] text-purple-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <Copy className="w-3 h-3" />
                {copied === 'a' ? 'Copié !' : "Copier l'IP"}
              </button>
            </div>
            <div className="text-xs font-mono bg-white p-2.5 rounded-xl border border-gray-200 text-gray-800">
              <div>Type: <strong>A</strong></div>
              <div>Nom: <strong>@</strong></div>
              <div>Valeur: <strong>76.76.21.21</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
