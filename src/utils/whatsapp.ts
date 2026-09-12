import { formatPrice } from './formatters';

const WHATSAPP_NUMBER = '22943797042';

export interface WhatsAppOrderParams {
  productName: string;
  price: number;
  quantity?: number;
  currency?: string;
  optionName?: string;
  customerName?: string;
  city?: string;
}

/**
 * Ouvre directement la conversation WhatsApp avec le message pré-rempli pour un produit
 */
export function sendWhatsAppOrder(params: WhatsAppOrderParams): void {
  const quantity = params.quantity || 1;
  const currency = params.currency || 'FCFA';
  const total = params.price * quantity;

  let message = `Bonjour KayaShop ! 👋\n\n`;
  message += `Je souhaite passer commande pour :\n`;
  message += `📦 *Produit :* ${params.productName}\n`;
  message += `🔢 *Quantité :* ${quantity}\n`;
  if (params.optionName) {
    message += `✨ *Option / Pack :* ${params.optionName}\n`;
  }
  message += `💰 *Montant :* ${formatPrice(total, currency)}\n\n`;
  if (params.customerName || params.city) {
    message += `👤 *Client :* ${params.customerName || '[À préciser]'}\n`;
    message += `📍 *Ville / Adresse :* ${params.city || '[À préciser]'}\n\n`;
  }
  message += `🚚 Merci de m'indiquer la disponibilité et le délai de livraison à mon adresse.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Ouvre la conversation WhatsApp avec le contenu complet du panier
 */
export function sendWhatsAppCartOrder(
  items: Array<{ name: string; price: number; quantity: number; currency?: string }>
): void {
  if (items.length === 0) return;

  const currency = items[0]?.currency || 'FCFA';
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let message = `Bonjour KayaShop ! 👋\n\n`;
  message += `Je souhaite valider mon panier de commande :\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. 📦 *${item.name}* (x${item.quantity}) — ${formatPrice(item.price * item.quantity, currency)}\n`;
  });

  message += `\n💵 *Total de la commande : ${formatPrice(total, currency)}*\n\n`;
  message += `📍 Merci de me contacter pour la confirmation et la livraison à mon adresse.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
