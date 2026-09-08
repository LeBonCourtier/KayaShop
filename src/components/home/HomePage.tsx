import React, { useState } from 'react';
import type { Product } from '../../types/product';
import type { OrderItem } from '../../types/order';
import { Header } from '../layout/Header';
import { HeroBanner } from './HeroBanner';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedProducts } from './FeaturedProducts';
import { ProductSpotlight } from './ProductSpotlight';
import { TrustSection } from './TrustSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';
import { CheckoutModal } from '../checkout/CheckoutModal';
import { OrderTrackingModal } from '../checkout/OrderTrackingModal';
import { CartDrawer, type CartItem } from '../ui/CartDrawer';
import { Footer } from '../layout/Footer';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateToShop?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onNavigateToShop,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<OrderItem[]>([]);

  // Cart Management
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0]?.url || '',
          currency: product.currency,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Quick Direct Buy from Homepage Card
  const handleQuickBuy = (product: Product) => {
    setCheckoutItems([
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0]?.url || '',
        currency: product.currency,
      },
    ]);
    setIsCheckoutOpen(true);
  };

  const handleExploreScroll = () => {
    if (onNavigateToShop) {
      onNavigateToShop();
    } else {
      const el = document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-zinc-900 flex flex-col antialiased">
      
      {/* 1. Header with live search, cart, and tracking */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        products={products}
        onSelectProduct={onSelectProduct}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateShop={handleExploreScroll}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* 2. Hero Banner */}
        <HeroBanner
          products={products}
          onSelectProduct={onSelectProduct}
          onExploreProducts={handleExploreScroll}
        />

        {/* 3. Category Grid */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleExploreScroll();
          }}
        />

        {/* 4. Featured Products Catalog */}
        <FeaturedProducts
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={onSelectProduct}
          onQuickBuy={handleQuickBuy}
          onAddToCart={handleAddToCart}
        />

        {/* 5. Spotlight on Featured Product */}
        {products[0] && (
          <ProductSpotlight
            product={products[0]}
            onSelectProduct={onSelectProduct}
            onQuickBuy={handleQuickBuy}
          />
        )}

        {/* 6. Why Choose KayaShop (Trust Pillars) */}
        <TrustSection />

        {/* 7. Customer Testimonials */}
        <TestimonialsSection />

        {/* 8. Help and FAQ Section */}
        <FAQSection />

      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={
          checkoutItems.length > 0
            ? checkoutItems
            : cartItems.map((ci) => ({
                productId: ci.id,
                name: ci.name,
                price: ci.price,
                quantity: ci.quantity,
                image: ci.image,
                currency: ci.currency,
              }))
        }
        currency="FCFA"
        onOrderCompleted={() => {
          setCartItems([]);
          setCheckoutItems([]);
        }}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setCheckoutItems(
            cartItems.map((ci) => ({
              productId: ci.id,
              name: ci.name,
              price: ci.price,
              quantity: ci.quantity,
              image: ci.image,
              currency: ci.currency,
            }))
          );
          setIsCheckoutOpen(true);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
