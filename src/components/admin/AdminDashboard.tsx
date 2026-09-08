import React, { useState, useEffect } from 'react';
import {
  Package,
  TrendingUp,
  CheckCircle2,
  Clock,
  Search,
  Download,
  Printer,
  MessageCircle,
  Phone,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  MapPin,
  RefreshCw,
  MessageSquare,
  Layers,
  Activity,
  Truck,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import { smsService } from '../../services/smsService';
import { productService } from '../../services/productService';
import type { Order, OrderStatus } from '../../types/order';
import type { Product } from '../../types/product';
import { DeliverySlipModal } from './DeliverySlipModal';
import { SMSModal } from './SMSModal';
import { ProductListManager } from './ProductListManager';
import { PixelSettingsManager } from './PixelSettingsManager';
import { ShippingSettingsManager } from './ShippingSettingsManager';
import { SaspaySettingsManager } from './SaspaySettingsManager';
import { DeploymentGuideManager } from './DeploymentGuideManager';

interface AdminDashboardProps {
  onBackToShop: () => void;
  onNavigateToProduct?: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToShop,
  onNavigateToProduct,
}) => {
  const [currentTab, setCurrentTab] = useState<'orders' | 'products' | 'shipping' | 'saspay' | 'pixels' | 'deployment'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedOrderForSlip, setSelectedOrderForSlip] = useState<Order | null>(null);
  const [selectedOrderForSMS, setSelectedOrderForSMS] = useState<Order | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const loadData = () => {
    setOrders(orderService.getOrders());
    setProducts(productService.getProducts());
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // Polling local changes
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Product Handlers
  const handleSaveProduct = (prodData: Partial<Product> & { name: string; price: number }) => {
    const { products: updated } = productService.saveProduct(prodData);
    setProducts(updated);
    showToast('Produit enregistré et publié avec succès !');
  };

  const handleDeleteProduct = (id: string) => {
    const updated = productService.deleteProduct(id);
    setProducts(updated);
    showToast('Produit retiré du catalogue.');
  };

  const handleToggleStock = (id: string) => {
    const updated = productService.toggleStock(id);
    setProducts(updated);
    showToast('Statut de stock mis à jour.');
  };

  const handleResetDefaults = () => {
    const updated = productService.resetToDefaults();
    setProducts(updated);
    showToast('Catalogue réinitialisé avec les produits initiaux.');
  };

  const handlePreviewProduct = (p: Product) => {
    if (onNavigateToProduct) {
      onNavigateToProduct(p);
    } else {
      window.location.hash = `#/produit/${p.slug}`;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    const updated = orderService.updateOrderStatus(orderId, newStatus);
    setOrders(updated);

    if (targetOrder && (newStatus === 'in_transit' || newStatus === 'delivered')) {
      try {
        const smsText = smsService.generateSMS(targetOrder, newStatus === 'in_transit' ? 'in_transit' : 'delivered');
        smsService.logSMS({
          orderNumber: targetOrder.orderNumber,
          recipientPhone: targetOrder.customer.phone,
          recipientName: targetOrder.customer.fullName,
          message: smsText,
          type: newStatus === 'in_transit' ? 'in_transit' : 'delivered',
        });
        showToast(`Statut : ${getStatusLabel(newStatus)} • SMS notifié`);
        return;
      } catch (e) {
        console.warn('SMS log error', e);
      }
    }

    showToast(`Statut mis à jour : ${getStatusLabel(newStatus)}`);
  };

  const handleDeleteOrder = (order: Order) => {
    if (window.confirm(`Voulez-vous vraiment supprimer la commande ${order.orderNumber} ?`)) {
      const updated = orderService.deleteOrder(order.id);
      setOrders(updated);
      showToast(`Commande ${order.orderNumber} supprimée.`);
    }
  };

  const handleExportCSV = () => {
    orderService.exportToCSV();
    showToast('Export CSV téléchargé avec succès');
  };

  // Helper labels & colors
  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return 'Nouvelle';
      case 'confirmed':
        return 'Confirmée';
      case 'in_transit':
        return 'En livraison';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-zinc-100 text-zinc-800 border-zinc-300';
    }
  };

  const getPaymentBadge = (method: string, paymentStatus: string) => {
    let name = 'Espèces';
    if (method === 'saspay') name = 'SasPay';
    if (method === 'mtn_momo') name = 'MTN MoMo';
    if (method === 'moov_money') name = 'Moov Flooz';
    if (method === 'wave') name = 'Wave';

    const isPaid = paymentStatus === 'paid';
    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
        method === 'saspay'
          ? 'bg-purple-900/30 text-purple-300 border border-purple-500/30'
          : isPaid
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
      }`}>
        <span>{name}</span>
        <span className="text-[10px] opacity-75">({isPaid ? 'Payé' : 'À la livr.'})</span>
      </span>
    );
  };

  // Format WhatsApp message to customer based on order status
  const sendWhatsAppToCustomer = (order: Order) => {
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
    let msg = '';

    if (order.status === 'received' || order.status === 'confirmed') {
      msg = `Bonjour *${order.customer.fullName}* ! Ici KayaShop Bénin.\n\nNous confirmons bien la réception de votre commande *${order.orderNumber}* (${order.total.toLocaleString('fr-FR')} FCFA).\n\nVotre colis est en cours de préparation pour livraison à *${order.customer.city}* (${order.customer.address || ''}).\n\nNotre livreur prendra contact avec vous très bientôt. Merci pour votre confiance !`;
    } else if (order.status === 'in_transit') {
      msg = `Bonjour *${order.customer.fullName}* ! Votre colis KayaShop *${order.orderNumber}* est actuellement *en cours de livraison*.\n\nLieu convenu : ${order.customer.city}, ${order.customer.address || ''}.\nMontant à préparer : *${order.paymentStatus === 'paid' ? '0 FCFA (Déjà réglé)' : `${order.total.toLocaleString('fr-FR')} FCFA`}*.\n\nÊtes-vous bien disponible pour réceptionner le colis ?`;
    } else if (order.status === 'delivered') {
      msg = `Bonjour *${order.customer.fullName}*, votre commande *${order.orderNumber}* a été marquée comme livrée avec succès.\n\nNous espérons que vos articles vous plaisent ! N'hésitez pas si vous avez la moindre question.\n\nÀ très bientôt sur KayaShop !`;
    } else {
      msg = `Bonjour *${order.customer.fullName}*, nous vous contactons concernant votre commande KayaShop *${order.orderNumber}*.`;
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Calculate statistics
  const totalOrdersCount = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const newOrdersCount = orders.filter((o) => o.status === 'received').length;
  const inTransitCount = orders.filter((o) => o.status === 'in_transit' || o.status === 'confirmed').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Status Filter
    if (selectedStatusFilter !== 'all' && order.status !== selectedStatusFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchNumber = order.orderNumber.toLowerCase().includes(q);
      const matchName = order.customer.fullName.toLowerCase().includes(q);
      const matchPhone = order.customer.phone.toLowerCase().includes(q);
      const matchCity = order.customer.city.toLowerCase().includes(q);
      const matchItems = order.items.some((it) => it.name.toLowerCase().includes(q));
      if (!matchNumber && !matchName && !matchPhone && !matchCity && !matchItems) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl font-medium text-xs sm:text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#d94f26] flex items-center justify-center font-black text-white text-base shadow-lg shadow-[#d94f26]/20">
            K
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                Kaya<span className="text-[#d94f26]">Shop</span>
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[11px] font-bold text-zinc-300 border border-zinc-700">
                Administration
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Gestionnaire des commandes et livraisons
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
            title="Télécharger toutes les commandes en CSV pour Excel"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exporter CSV</span>
          </button>

          <button
            onClick={onBackToShop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#d94f26] hover:bg-[#c2431e] text-white text-xs font-bold shadow-lg shadow-[#d94f26]/20 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voir la Boutique</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Navigation Tabs (Commandes vs Catalogue) */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setCurrentTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
              currentTab === 'orders'
                ? 'bg-[#d94f26] text-white shadow-lg shadow-[#d94f26]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Commandes & Livraisons</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              currentTab === 'orders' ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-300'
            }`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
              currentTab === 'products'
                ? 'bg-[#d94f26] text-white shadow-lg shadow-[#d94f26]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Gestion du Catalogue</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              currentTab === 'products' ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-300'
            }`}>
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('shipping')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
              currentTab === 'shipping'
                ? 'bg-[#d94f26] text-white shadow-lg shadow-[#d94f26]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Zones Livraison</span>
          </button>

          <button
            onClick={() => setCurrentTab('saspay')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
              currentTab === 'saspay'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Passerelle SasPay</span>
          </button>

          <button
            onClick={() => setCurrentTab('pixels')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
              currentTab === 'pixels'
                ? 'bg-[#d94f26] text-white shadow-lg shadow-[#d94f26]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Pixels & Ads</span>
          </button>

          <button
            onClick={() => setCurrentTab('deployment')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
              currentTab === 'deployment'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Mise en Ligne & Domaine</span>
          </button>
        </div>

        {/* Tab 1: Products Manager */}
        {currentTab === 'products' && (
          <ProductListManager
            products={products}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onToggleStock={handleToggleStock}
            onResetDefaults={handleResetDefaults}
            onPreviewProduct={handlePreviewProduct}
          />
        )}

        {/* Tab: Shipping Zones Manager */}
        {currentTab === 'shipping' && (
          <ShippingSettingsManager />
        )}

        {/* Tab: SasPay Settings Manager */}
        {currentTab === 'saspay' && (
          <SaspaySettingsManager />
        )}

        {/* Tab: Pixels Manager */}
        {currentTab === 'pixels' && (
          <PixelSettingsManager onShowToast={showToast} />
        )}

        {/* Tab: Deployment Guide Manager */}
        {currentTab === 'deployment' && (
          <DeploymentGuideManager />
        )}

        {/* Tab 3: Orders Manager */}
        {currentTab === 'orders' && (
          <>
            {/* KPI Summary Cards */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Revenue */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-zinc-400">Chiffre d'Affaires</p>
                <h3 className="text-lg sm:text-2xl font-black text-white mt-1">
                  {totalRevenue.toLocaleString('fr-FR')} <span className="text-xs font-semibold text-[#d94f26]">FCFA</span>
                </h3>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#d94f26]/10 text-[#d94f26]">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Cumul des commandes actives
            </p>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-zinc-400">Total Commandes</p>
                <h3 className="text-lg sm:text-2xl font-black text-white mt-1">
                  {totalOrdersCount}
                </h3>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Enregistrées dans le système
            </p>
          </div>

          {/* Card 3: Pending / New */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-zinc-400">Nouvelles / À préparer</p>
                <h3 className="text-lg sm:text-2xl font-black text-amber-400 mt-1">
                  {newOrdersCount}
                </h3>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              {inTransitCount} en cours d'acheminement
            </p>
          </div>

          {/* Card 4: Delivered */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 sm:p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-zinc-400">Livrées & Encaissées</p>
                <h3 className="text-lg sm:text-2xl font-black text-emerald-400 mt-1">
                  {deliveredCount}
                </h3>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              {totalOrdersCount > 0 ? `${Math.round((deliveredCount / totalOrdersCount) * 100)}% de taux de succès` : '0%'}
            </p>
          </div>

        </section>

        {/* Filter & Search Bar */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par N°, nom, tél, ville..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#d94f26]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'Toutes', count: totalOrdersCount },
                { id: 'received', label: 'Nouvelles', count: newOrdersCount },
                { id: 'in_transit', label: 'En livraison', count: inTransitCount },
                { id: 'delivered', label: 'Livrées', count: deliveredCount },
                { id: 'cancelled', label: 'Annulées', count: orders.filter((o) => o.status === 'cancelled').length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedStatusFilter === tab.id
                      ? 'bg-[#d94f26] text-white shadow-sm'
                      : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${
                    selectedStatusFilter === tab.id ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Orders Table / Cards */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-sm sm:text-base text-zinc-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#d94f26]" />
                Commandes clients ({filteredOrders.length})
              </h2>
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Actualiser</span>
            </button>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <Package className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm font-semibold text-zinc-300">Aucune commande trouvée</p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                {searchQuery || selectedStatusFilter !== 'all'
                  ? 'Essayez de modifier vos filtres ou termes de recherche.'
                  : 'Les commandes passées par vos clients sur la boutique apparaîtront ici en temps réel.'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">N° & Date</th>
                      <th className="py-3 px-4">Client & Contact</th>
                      <th className="py-3 px-4">Ville & Adresse</th>
                      <th className="py-3 px-4">Articles commandés</th>
                      <th className="py-3 px-4">Total & Règlement</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-zinc-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-800/40 transition-colors">
                        
                        {/* Order Number & Date */}
                        <td className="py-3.5 px-4 align-top">
                          <span className="font-mono font-bold text-zinc-100 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                            {order.orderNumber}
                          </span>
                          <p className="text-[11px] text-zinc-400 mt-1">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </td>

                        {/* Customer Info */}
                        <td className="py-3.5 px-4 align-top">
                          <p className="font-bold text-zinc-100">{order.customer.fullName}</p>
                          <a
                            href={`tel:${order.customer.phone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-[#d94f26] hover:underline mt-0.5"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.customer.phone}</span>
                          </a>
                        </td>

                        {/* City & Address */}
                        <td className="py-3.5 px-4 align-top max-w-[200px]">
                          <p className="font-semibold text-zinc-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#d94f26]" />
                            <span>{order.customer.city}</span>
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5" title={order.customer.address}>
                            {order.customer.address || 'Non spécifiée'}
                          </p>
                          {order.customer.deliveryNotes && (
                            <p className="text-[10px] text-amber-400 italic mt-0.5 truncate" title={order.customer.deliveryNotes}>
                              Note : {order.customer.deliveryNotes}
                            </p>
                          )}
                        </td>

                        {/* Items */}
                        <td className="py-3.5 px-4 align-top max-w-[220px]">
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-xs">
                                <span className="font-bold text-zinc-100">{item.quantity}x</span>
                                <span className="text-zinc-300 truncate" title={item.name}>
                                  {item.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Total & Payment */}
                        <td className="py-3.5 px-4 align-top">
                          <p className="font-extrabold text-sm text-[#d94f26]">
                            {order.total.toLocaleString('fr-FR')} FCFA
                          </p>
                          <div className="mt-1">
                            {getPaymentBadge(order.paymentMethod, order.paymentStatus)}
                          </div>
                        </td>

                        {/* Status Select */}
                        <td className="py-3.5 px-4 align-top">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${getStatusBadgeClass(
                              order.status
                            )}`}
                          >
                            <option value="received">🟡 Nouvelle</option>
                            <option value="confirmed">🔵 Confirmée</option>
                            <option value="in_transit">🟣 En livraison</option>
                            <option value="delivered">🟢 Livrée</option>
                            <option value="cancelled">🔴 Annulée</option>
                          </select>
                        </td>

                        {/* Quick Actions */}
                        <td className="py-3.5 px-4 align-top text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* WhatsApp button */}
                            <button
                              onClick={() => sendWhatsAppToCustomer(order)}
                              title="Contacter le client sur WhatsApp"
                              className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>

                            {/* SMS Notification button */}
                            <button
                              onClick={() => setSelectedOrderForSMS(order)}
                              title="Envoyer un SMS de notification au client"
                              className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>

                            {/* Print Slip */}
                            <button
                              onClick={() => setSelectedOrderForSlip(order)}
                              title="Imprimer le bon de livraison"
                              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                            >
                              <Printer className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteOrder(order)}
                              title="Supprimer la commande"
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet Cards View */}
              <div className="lg:hidden divide-y divide-zinc-800">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 space-y-3">
                    
                    {/* Top Row: Order # and Status Selector */}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-mono font-bold text-xs bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 text-zinc-100">
                          {order.orderNumber}
                        </span>
                        <p className="text-[10px] text-zinc-400 mt-1">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-bold rounded-lg px-2 py-1 border focus:outline-none cursor-pointer ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        <option value="received">🟡 Nouvelle</option>
                        <option value="confirmed">🔵 Confirmée</option>
                        <option value="in_transit">🟣 En livraison</option>
                        <option value="delivered">🟢 Livrée</option>
                        <option value="cancelled">🔴 Annulée</option>
                      </select>
                    </div>

                    {/* Customer & Location */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="font-bold text-zinc-100">{order.customer.fullName}</span>
                        <span className="font-semibold text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#d94f26]" />
                          {order.customer.city}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {order.customer.address || 'Adresse non spécifiée'}
                      </p>
                      {order.customer.deliveryNotes && (
                        <p className="text-[10px] text-amber-400 italic">
                          Note : {order.customer.deliveryNotes}
                        </p>
                      )}
                    </div>

                    {/* Items & Total */}
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <p className="text-zinc-400 text-[11px]">
                          {order.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                        </p>
                        <div className="mt-1">
                          {getPaymentBadge(order.paymentMethod, order.paymentStatus)}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-[#d94f26]">
                          {order.total.toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-zinc-800/60">
                      <button
                        onClick={() => sendWhatsAppToCustomer(order)}
                        className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30 active:scale-95 transition-all cursor-pointer"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>

                      <button
                        onClick={() => setSelectedOrderForSMS(order)}
                        className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 font-semibold text-xs border border-blue-500/30 active:scale-95 transition-all cursor-pointer"
                        title="SMS"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>SMS</span>
                      </button>

                      <button
                        onClick={() => setSelectedOrderForSlip(order)}
                        className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 font-semibold text-xs border border-zinc-700 active:scale-95 transition-all cursor-pointer"
                        title="Bon de livraison"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Bon</span>
                      </button>

                      <button
                        onClick={() => handleDeleteOrder(order)}
                        className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 font-semibold text-xs border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Suppr.</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </>
    )}
  </main>

      {/* Delivery Slip Modal */}
      {selectedOrderForSlip && (
        <DeliverySlipModal
          order={selectedOrderForSlip}
          onClose={() => setSelectedOrderForSlip(null)}
        />
      )}

      {/* SMS Notification Modal */}
      {selectedOrderForSMS && (
        <SMSModal
          order={selectedOrderForSMS}
          onClose={() => setSelectedOrderForSMS(null)}
          onSMSSent={(msg) => showToast(msg)}
        />
      )}
    </div>
  );
};
