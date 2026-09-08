import type { Order, OrderCustomer, OrderItem, OrderStatus, PaymentMethodType } from '../types/order';

const STORAGE_KEY = 'kayashop_orders_v1';

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'order_demo_1',
    orderNumber: 'KS-2026-8942',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    status: 'received',
    customer: {
      fullName: 'Aurore Dossou',
      phone: '+229 97 12 34 56',
      city: 'Cotonou',
      address: 'Haie Vive, en face du supermarché du Pont',
      deliveryNotes: 'Appeler avant de venir svp',
    },
    items: [
      {
        productId: 'lumiled-pro',
        name: 'Lampe LED Sans Fil SensorPro',
        price: 12000,
        quantity: 2,
        image: '/products/lumiled-pro.png',
        currency: 'FCFA',
        complementaryOption: {
          name: 'Pack 2x Recharges Magnétiques',
          price: 3000,
        },
      },
    ],
    subtotal: 27000,
    shippingFee: 1000,
    discountAmount: 0,
    total: 28000,
    currency: 'FCFA',
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pending',
  },
  {
    id: 'order_demo_2',
    orderNumber: 'KS-2026-7419',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    status: 'in_transit',
    customer: {
      fullName: 'Koffi Mensah',
      phone: '+229 61 88 99 00',
      city: 'Abomey-Calavi',
      address: 'Carrefour Bidossessi, maison blanche portail noir',
    },
    items: [
      {
        productId: 'aerofresh-mini',
        name: 'Mini Humidificateur Aromathérapie PureBreeze',
        price: 9500,
        quantity: 1,
        image: '/products/aerofresh.png',
        currency: 'FCFA',
      },
    ],
    subtotal: 9500,
    shippingFee: 1500,
    discountAmount: 0,
    total: 11000,
    currency: 'FCFA',
    paymentMethod: 'mtn_momo',
    paymentStatus: 'paid',
  },
  {
    id: 'order_demo_3',
    orderNumber: 'KS-2026-6201',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
    status: 'delivered',
    customer: {
      fullName: 'Sidoine Agbessi',
      phone: '+229 95 44 22 11',
      city: 'Porto-Novo',
      address: 'Quartier Ouando, près de la pharmacie',
    },
    items: [
      {
        productId: 'thermo-cup-smart',
        name: 'Gourde Thermos Intelligente Affichage Digital LED',
        price: 8000,
        quantity: 2,
        image: '/products/thermo-cup.png',
        currency: 'FCFA',
      },
    ],
    subtotal: 16000,
    shippingFee: 2000,
    discountAmount: 0,
    total: 18000,
    currency: 'FCFA',
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'paid_on_delivery',
  },
];

export const orderService = {
  /**
   * Crée une nouvelle commande et la sauvegarde en local
   */
  createOrder(params: {
    customer: OrderCustomer;
    items: OrderItem[];
    subtotal: number;
    shippingFee: number;
    discountAmount: number;
    total: number;
    currency?: string;
    paymentMethod: PaymentMethodType;
  }): Order {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `KS-${new Date().getFullYear()}-${randomSuffix}`;
    const id = `order_${timestamp}_${randomSuffix}`;

    const newOrder: Order = {
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'received',
      customer: params.customer,
      items: params.items,
      subtotal: params.subtotal,
      shippingFee: params.shippingFee,
      discountAmount: params.discountAmount,
      total: params.total,
      currency: params.currency || 'FCFA',
      paymentMethod: params.paymentMethod,
      paymentStatus: 'pending',
    };

    const existingOrders = orderService.getOrders();
    existingOrders.unshift(newOrder);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingOrders));
    } catch (e) {
      console.warn('Erreur de sauvegarde locale', e);
    }

    return newOrder;
  },

  /**
   * Récupère toutes les commandes locales (ou initialise les données de démonstration)
   */
  getOrders(): Order[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Initialize with sample orders for seamless demo experience
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ORDERS));
        return SAMPLE_ORDERS;
      }
      return JSON.parse(data) as Order[];
    } catch (e) {
      return SAMPLE_ORDERS;
    }
  },

  /**
   * Met à jour le statut d'une commande
   */
  updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    paymentStatus?: 'pending' | 'paid_on_delivery' | 'paid'
  ): Order[] {
    const orders = orderService.getOrders();
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          paymentStatus:
            paymentStatus !== undefined
              ? paymentStatus
              : newStatus === 'delivered'
              ? 'paid_on_delivery'
              : o.paymentStatus,
        };
      }
      return o;
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Erreur de mise à jour locale', e);
    }
    return updated;
  },

  /**
   * Supprime une commande
   */
  deleteOrder(orderId: string): Order[] {
    const orders = orderService.getOrders();
    const updated = orders.filter((o) => o.id !== orderId);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Erreur de suppression locale', e);
    }
    return updated;
  },

  /**
   * Recherche une commande par son numéro ou le téléphone du client
   */
  findOrder(query: string): Order | undefined {
    const cleanQuery = query.trim().toLowerCase();
    const orders = orderService.getOrders();
    return orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === cleanQuery ||
        o.customer.phone.replace(/\s+/g, '').includes(cleanQuery.replace(/\s+/g, ''))
    );
  },

  /**
   * Statistiques globales du tableau de bord
   */
  getStats() {
    const orders = orderService.getOrders();
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const newOrders = orders.filter((o) => o.status === 'received').length;
    const inTransit = orders.filter((o) => o.status === 'in_transit' || o.status === 'confirmed').length;
    const delivered = orders.filter((o) => o.status === 'delivered').length;
    const cancelled = orders.filter((o) => o.status === 'cancelled').length;

    return {
      totalOrders,
      totalRevenue,
      newOrders,
      inTransit,
      delivered,
      cancelled,
    };
  },

  /**
   * Exporte les commandes au format CSV
   */
  exportToCSV() {
    const orders = orderService.getOrders();
    if (orders.length === 0) return;

    const headers = [
      'N° Commande',
      'Date',
      'Statut',
      'Client',
      'Téléphone',
      'Ville',
      'Adresse',
      'Articles',
      'Sous-total (FCFA)',
      'Frais Livraison (FCFA)',
      'Total (FCFA)',
      'Mode Paiement',
      'Statut Paiement',
      'Notes',
    ];

    const rows = orders.map((o) => {
      const itemsSummary = o.items.map((it) => `${it.quantity}x ${it.name}`).join(' | ');
      return [
        `"${o.orderNumber}"`,
        `"${new Date(o.createdAt).toLocaleString('fr-FR')}"`,
        `"${o.status}"`,
        `"${o.customer.fullName.replace(/"/g, '""')}"`,
        `"${o.customer.phone}"`,
        `"${o.customer.city}"`,
        `"${(o.customer.address || '').replace(/"/g, '""')}"`,
        `"${itemsSummary.replace(/"/g, '""')}"`,
        o.subtotal,
        o.shippingFee,
        o.total,
        `"${o.paymentMethod}"`,
        `"${o.paymentStatus}"`,
        `"${(o.customer.deliveryNotes || '').replace(/"/g, '""')}"`,
      ].join(';');
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `commandes_kayashop_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
