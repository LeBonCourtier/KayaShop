import type { SMSNotification } from '../types/sms';
import type { Order } from '../types/order';

const SMS_STORAGE_KEY = 'kayashop_sms_logs_v1';
const SMS_SETTINGS_KEY = 'kayashop_sms_settings_v1';

export interface SMSSettings {
  autoSendOnOrder: boolean;
  autoSendOnDispatch: boolean;
  senderName: string;
  apiKey?: string;
}

const DEFAULT_SETTINGS: SMSSettings = {
  autoSendOnOrder: true,
  autoSendOnDispatch: true,
  senderName: 'KayaShop',
};

const TEMPLATES: Record<string, string> = {
  order_received:
    'Bonjour {prenom}, votre commande KayaShop #{orderNumber} de {total} FCFA a bien été enregistrée. Notre équipe prépare votre colis pour livraison à {ville}. Merci de votre confiance ! Info: +229 43 79 70 42',
  in_transit:
    'Bonjour {prenom}, votre colis KayaShop #{orderNumber} est en cours d\'acheminement vers {ville}. Montant à préparer à la livraison : {total_cash} FCFA. Restez joignable au {telephone}.',
  delivered:
    'Merci {prenom} d\'avoir choisi KayaShop ! Votre commande #{orderNumber} a été remise. Pour tout conseil ou retour : WhatsApp +229 43 79 70 42.',
};

export const smsService = {
  /**
   * Récupère les paramètres SMS
   */
  getSettings(): SMSSettings {
    try {
      const data = localStorage.getItem(SMS_SETTINGS_KEY);
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  /**
   * Met à jour les paramètres SMS
   */
  saveSettings(settings: SMSSettings): void {
    try {
      localStorage.setItem(SMS_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Erreur sauvegarde SMS settings', e);
    }
  },

  /**
   * Génère le texte d'un SMS à partir du template et de la commande
   */
  generateSMS(order: Order, type: 'order_received' | 'in_transit' | 'delivered'): string {
    const template = TEMPLATES[type] || TEMPLATES.order_received;
    const prenom = order.customer.fullName.trim().split(' ')[0] || order.customer.fullName;
    const totalCash =
      order.paymentStatus === 'paid' ? '0 (Déjà réglé)' : order.total.toLocaleString('fr-FR');

    return template
      .replace(/{prenom}/g, prenom)
      .replace(/{nom}/g, order.customer.fullName)
      .replace(/{orderNumber}/g, order.orderNumber)
      .replace(/{total}/g, order.total.toLocaleString('fr-FR'))
      .replace(/{total_cash}/g, totalCash)
      .replace(/{ville}/g, order.customer.city)
      .replace(/{adresse}/g, order.customer.address || order.customer.city)
      .replace(/{telephone}/g, order.customer.phone);
  },

  /**
   * Enregistre un SMS envoyé dans le journal d'historique
   */
  logSMS(notification: Omit<SMSNotification, 'id' | 'sentAt' | 'status' | 'senderName'>): SMSNotification {
    const settings = smsService.getSettings();
    const newLog: SMSNotification = {
      id: `sms_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      orderNumber: notification.orderNumber,
      recipientPhone: notification.recipientPhone,
      recipientName: notification.recipientName,
      message: notification.message,
      type: notification.type,
      sentAt: new Date().toISOString(),
      status: 'delivered',
      senderName: settings.senderName || 'KayaShop',
    };

    const logs = smsService.getLogs();
    logs.unshift(newLog);
    try {
      localStorage.setItem(SMS_STORAGE_KEY, JSON.stringify(logs));
    } catch (e) {
      console.warn('Erreur log SMS', e);
    }
    return newLog;
  },

  /**
   * Récupère l'historique complet des SMS envoyés
   */
  getLogs(): SMSNotification[] {
    try {
      const data = localStorage.getItem(SMS_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as SMSNotification[];
    } catch {
      return [];
    }
  },

  /**
   * Récupère les SMS liés à une commande précise
   */
  getLogsForOrder(orderNumber: string): SMSNotification[] {
    const logs = smsService.getLogs();
    return logs.filter((l) => l.orderNumber.toLowerCase() === orderNumber.toLowerCase());
  },

  /**
   * Génère l'URL de déclenchement SMS natif pour smartphone (sms:phone?body=...)
   */
  getNativeSMSLink(phone: string, message: string): string {
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    const encodedBody = encodeURIComponent(message);
    
    // Check if user agent is iOS for proper sms: format separator
    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const separator = isIOS ? '&body=' : '?body=';
    
    return `sms:${cleanPhone}${separator}${encodedBody}`;
  },

  /**
   * Supprime l'historique des SMS
   */
  clearLogs(): void {
    try {
      localStorage.removeItem(SMS_STORAGE_KEY);
    } catch (e) {
      console.warn('Erreur purge SMS logs', e);
    }
  },
};
