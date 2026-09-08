/**
 * Formate un nombre en FCFA avec les séparateurs de milliers corrects
 * Exemple: 10000 -> "10 000 FCFA"
 */
export function formatPrice(amount: number, currency: string = 'FCFA'): string {
  if (typeof amount !== 'number' || isNaN(amount)) return `0 ${currency}`;
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} ${currency}`;
}

/**
 * Calcul du pourcentage de réduction si applicable
 */
export function calculateDiscount(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
