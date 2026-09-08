export interface SMSNotification {
  id: string;
  orderNumber: string;
  recipientPhone: string;
  recipientName: string;
  message: string;
  type: 'order_received' | 'in_transit' | 'delivered' | 'custom';
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
  senderName: string; // e.g. "KayaShop"
}

export interface SMSTemplate {
  id: string;
  name: string;
  type: 'order_received' | 'in_transit' | 'delivered' | 'custom';
  content: string;
}
