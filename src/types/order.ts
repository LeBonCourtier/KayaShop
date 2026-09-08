export type OrderStatus = 'received' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';

export type PaymentMethodType = 'cash_on_delivery' | 'saspay' | 'wave' | 'orange_money' | 'mtn_momo' | 'moov_money';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  deliveryNotes?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  currency: string;
  complementaryOption?: {
    name: string;
    price: number;
  };
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "KS-2026-8942"
  createdAt: string;
  status: OrderStatus;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  currency: string;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'pending' | 'paid_on_delivery' | 'paid';
}
