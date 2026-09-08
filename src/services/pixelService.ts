import type { PixelSettings, PixelEventLog } from '../types/pixel';
import type { Product } from '../types/product';
import type { Order, OrderItem } from '../types/order';

const PIXEL_SETTINGS_KEY = 'kayashop_pixel_settings_v1';
const PIXEL_LOGS_KEY = 'kayashop_pixel_logs_v1';

const DEFAULT_SETTINGS: PixelSettings = {
  facebookPixelId: '123456789012345',
  facebookEnabled: true,
  tiktokPixelId: 'CXXXXXXXXXXXXXXX',
  tiktokEnabled: true,
  googleAnalyticsId: 'G-XXXXXXXXXX',
  googleEnabled: true,
  debugMode: true,
};

// Global window extensions
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    ttq?: {
      track: (...args: any[]) => void;
      page: () => void;
      load: (id: string) => void;
    };
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const pixelService = {
  /**
   * Récupère la configuration des Pixels
   */
  getSettings(): PixelSettings {
    try {
      const data = localStorage.getItem(PIXEL_SETTINGS_KEY);
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  /**
   * Sauvegarde la configuration des Pixels
   */
  saveSettings(settings: PixelSettings): void {
    try {
      localStorage.setItem(PIXEL_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Erreur sauvegarde Pixel settings', e);
    }
  },

  /**
   * Enregistre un log d'événement pour le débogueur
   */
  logEvent(eventName: PixelEventLog['eventName'], channel: PixelEventLog['channel'], data: Record<string, any>): void {
    const log: PixelEventLog = {
      id: `ev_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      eventName,
      channel,
      data,
    };

    const logs = pixelService.getLogs();
    logs.unshift(log);
    // Keep last 40 logs
    const trimmed = logs.slice(0, 40);
    try {
      localStorage.setItem(PIXEL_LOGS_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn('Erreur logging pixel', e);
    }
  },

  /**
   * Récupère l'historique des événements déclenchés
   */
  getLogs(): PixelEventLog[] {
    try {
      const data = localStorage.getItem(PIXEL_LOGS_KEY);
      if (!data) return [];
      return JSON.parse(data) as PixelEventLog[];
    } catch {
      return [];
    }
  },

  /**
   * Efface le journal des événements
   */
  clearLogs(): void {
    try {
      localStorage.removeItem(PIXEL_LOGS_KEY);
    } catch (e) {
      console.warn('Erreur clear pixel logs', e);
    }
  },

  /**
   * Événement : PageView
   */
  trackPageView(pageName: string = 'KayaShop Boutique'): void {
    const settings = pixelService.getSettings();
    const data = { page: pageName, url: window.location.href };

    // Meta Pixel
    if (settings.facebookEnabled && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
    // TikTok Pixel
    if (settings.tiktokEnabled && window.ttq && typeof window.ttq.page === 'function') {
      window.ttq.page();
    }
    // Google
    if (settings.googleEnabled && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_title: pageName });
    }

    if (settings.debugMode) {
      pixelService.logEvent('PageView', 'All', data);
    }
  },

  /**
   * Événement : ViewContent (Consultation d'un produit)
   */
  trackViewContent(product: Product): void {
    const settings = pixelService.getSettings();
    const data = {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: product.currency || 'XOF',
    };

    if (settings.facebookEnabled && typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', data);
    }
    if (settings.tiktokEnabled && window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track('ViewContent', {
        content_id: product.id,
        content_name: product.name,
        content_category: product.category,
        value: product.price,
        currency: 'XOF',
      });
    }
    if (settings.googleEnabled && typeof window.gtag === 'function') {
      window.gtag('event', 'view_item', {
        items: [{ item_id: product.id, item_name: product.name, price: product.price }],
        value: product.price,
        currency: 'XOF',
      });
    }

    if (settings.debugMode) {
      pixelService.logEvent('ViewContent', 'All', data);
    }
  },

  /**
   * Événement : AddToCart (Ajout au panier)
   */
  trackAddToCart(product: Product, quantity: number = 1): void {
    const settings = pixelService.getSettings();
    const data = {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price * quantity,
      currency: product.currency || 'XOF',
      quantity,
    };

    if (settings.facebookEnabled && typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', data);
    }
    if (settings.tiktokEnabled && window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track('AddToCart', {
        content_id: product.id,
        content_name: product.name,
        value: product.price * quantity,
        currency: 'XOF',
        quantity,
      });
    }
    if (settings.googleEnabled && typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity }],
        value: product.price * quantity,
        currency: 'XOF',
      });
    }

    if (settings.debugMode) {
      pixelService.logEvent('AddToCart', 'All', data);
    }
  },

  /**
   * Événement : InitiateCheckout (Début du tunnel de commande)
   */
  trackInitiateCheckout(items: OrderItem[], total: number): void {
    const settings = pixelService.getSettings();
    const data = {
      content_ids: items.map((i) => i.productId),
      num_items: items.reduce((sum, i) => sum + i.quantity, 0),
      value: total,
      currency: 'XOF',
    };

    if (settings.facebookEnabled && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', data);
    }
    if (settings.tiktokEnabled && window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track('InitiateCheckout', {
        contents: items.map((i) => ({ content_id: i.productId, content_name: i.name, quantity: i.quantity })),
        value: total,
        currency: 'XOF',
      });
    }
    if (settings.googleEnabled && typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', {
        value: total,
        currency: 'XOF',
        items: items.map((i) => ({ item_id: i.productId, item_name: i.name, price: i.price, quantity: i.quantity })),
      });
    }

    if (settings.debugMode) {
      pixelService.logEvent('InitiateCheckout', 'All', data);
    }
  },

  /**
   * Événement : Purchase / CompletePayment (Achat validé)
   */
  trackPurchase(order: Order): void {
    const settings = pixelService.getSettings();
    const data = {
      content_ids: order.items.map((i) => i.productId),
      content_type: 'product',
      value: order.total,
      currency: 'XOF',
      num_items: order.items.reduce((sum, i) => sum + i.quantity, 0),
      order_id: order.orderNumber,
    };

    if (settings.facebookEnabled && typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', data);
    }
    if (settings.tiktokEnabled && window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track('CompletePayment', {
        contents: order.items.map((i) => ({
          content_id: i.productId,
          content_name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        value: order.total,
        currency: 'XOF',
      });
    }
    if (settings.googleEnabled && typeof window.gtag === 'function') {
      window.gtag('event', 'purchase', {
        transaction_id: order.orderNumber,
        value: order.total,
        currency: 'XOF',
        shipping: order.shippingFee,
        items: order.items.map((i) => ({
          item_id: i.productId,
          item_name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
      });
    }

    if (settings.debugMode) {
      pixelService.logEvent('Purchase', 'All', data);
    }
  },
};
