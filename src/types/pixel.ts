export interface PixelSettings {
  facebookPixelId?: string;
  facebookEnabled: boolean;
  tiktokPixelId?: string;
  tiktokEnabled: boolean;
  googleAnalyticsId?: string;
  googleEnabled: boolean;
  debugMode: boolean;
}

export interface PixelEventLog {
  id: string;
  timestamp: string;
  eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'Contact';
  channel: 'Meta' | 'TikTok' | 'Google' | 'All';
  data: Record<string, any>;
}
