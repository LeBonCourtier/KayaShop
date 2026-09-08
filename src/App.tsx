import { useState, useEffect } from 'react';
import { productService } from './services/productService';
import type { Product } from './types/product';
import { ProductPage } from './components/product/ProductPage';
import { HomePage } from './components/home/HomePage';
import { AdminDashboard } from './components/admin/AdminDashboard';

export function App() {
  const [productsList, setProductsList] = useState<Product[]>(() => productService.getProducts());

  // Parse initial route strictly from URL hash
  const getInitialState = (currentProducts: Product[] = productsList) => {
    const defaultProduct = currentProducts[0] || productService.getProducts()[0];
    const hash = window.location.hash || '';

    if (hash === '#/admin' || hash.startsWith('#/admin')) {
      return { view: 'admin' as const, product: defaultProduct };
    }
    
    if (hash.startsWith('#/produit/')) {
      const slug = hash.replace('#/produit/', '').split('?')[0];
      const found = currentProducts.find((p) => p.slug === slug || p.id === slug);
      if (found) {
        return { view: 'product' as const, product: found };
      }
    }

    // Default to Home for root, #/, #/home, #/catalog, or any unknown route
    return { view: 'home' as const, product: defaultProduct };
  };

  const initial = getInitialState();
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'admin'>(initial.view);
  const [currentProduct, setCurrentProduct] = useState<Product>(initial.product);

  // Sync hash and localStorage on state change
  const navigateToProduct = (product: Product) => {
    setCurrentProduct(product);
    setCurrentView('product');
    window.location.hash = `#/produit/${product.slug}`;
    localStorage.setItem('kayashop_view', 'product');
    localStorage.setItem('kayashop_product_id', product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    // Refresh product list from storage
    const latest = productService.getProducts();
    setProductsList(latest);
    setCurrentView('home');
    window.location.hash = '#/';
    localStorage.setItem('kayashop_view', 'home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateShop = () => {
    const latest = productService.getProducts();
    setProductsList(latest);
    setCurrentView('home');
    window.location.hash = '#/catalog';
    localStorage.setItem('kayashop_view', 'home');
    setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  // Listen to browser Back/Forward navigation & storage changes
  useEffect(() => {
    const handleHashChange = () => {
      const latest = productService.getProducts();
      setProductsList(latest);
      const state = getInitialState(latest);
      setCurrentView(state.view);
      setCurrentProduct(state.product);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main View Router */}
      {currentView === 'admin' ? (
        <AdminDashboard
          onBackToShop={navigateToHome}
          onNavigateToProduct={navigateToProduct}
        />
      ) : currentView === 'home' ? (
        <HomePage
          products={productsList}
          onSelectProduct={navigateToProduct}
          onNavigateToShop={handleNavigateShop}
        />
      ) : (
        <ProductPage
          product={currentProduct}
          allProducts={productsList}
          onSelectProduct={navigateToProduct}
          onNavigateHome={navigateToHome}
          onNavigateShop={handleNavigateShop}
        />
      )}
    </div>
  );
}

export default App;
