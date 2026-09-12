import React, { useState, useEffect } from 'react';
import type { Product, ComplementaryProduct } from '../../types/product';
import { sendWhatsAppOrder } from '../../utils/whatsapp';
import { Header } from '../layout/Header';
import { Breadcrumb } from '../layout/Breadcrumb';
import { ProductGallery } from './ProductGallery';
import { PriceDisplay } from './PriceDisplay';
import { RatingSummary } from './RatingSummary';
import { ActionButtons } from './ActionButtons';
import { TrustBadges } from './TrustBadges';
import { ProductBenefits } from './ProductBenefits';
import { HowItWorks } from './HowItWorks';
import { ProductDescription } from './ProductDescription';
import { ShippingInfo } from './ShippingInfo';
import { CustomerReviews } from './CustomerReviews';
import { SocialProof } from './SocialProof';
import { CrossSellBundle } from './CrossSellBundle';
import { RelatedProducts } from './RelatedProducts';
import { ProductFAQ } from './ProductFAQ';
import { FinalCTA } from './FinalCTA';
import { StickyBuyBar } from './StickyBuyBar';
import { OrderTrackingModal } from '../checkout/OrderTrackingModal';
import { CartDrawer, type CartItem } from '../ui/CartDrawer';
import { Footer } from '../layout/Footer';
import { CheckCircle2 } from 'lucide-react';
import { pixelService } from '../../services/pixelService';

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onNavigateHome,
  onNavigateShop,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedComplementary, setSelectedComplementary] = useState<ComplementaryProduct | null>(null);

  // Track product view
  useEffect(() => {
    if (product) {
      pixelService.trackViewContent(product);
    }
  }, [product]);

  // Cart Handlers
  const handleAddToCart = (quantity: number) => {
    pixelService.trackAddToCart(product, quantity);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
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
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Quick Direct Buy Now via WhatsApp
  const handleBuyNow = (qty: number = selectedQuantity) => {
    setSelectedQuantity(qty);
    pixelService.trackInitiateCheckout(
      [{ productId: product.id, name: product.name, price: product.price, quantity: qty, image: product.images[0]?.url || '', currency: product.currency }],
      product.price * qty
    );
    sendWhatsAppOrder({
      productName: product.name,
      price: product.price,
      quantity: qty,
      currency: product.currency,
      optionName: selectedComplementary?.name,
    });
  };

  const handleAddComplementary = (item: ComplementaryProduct) => {
    setSelectedComplementary((prev) => (prev?.id === item.id ? null : item));
  };

  const handleWhatsAppBuy = (qty: number) => {
    handleBuyNow(qty);
  };

  const handleScrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-zinc-900 flex flex-col antialiased pb-20 sm:pb-0">
      
      {/* 1. Header with live search, cart, and order tracking */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        products={allProducts}
        onSelectProduct={onSelectProduct}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* 2. Breadcrumb */}
        <Breadcrumb category={product.category} productName={product.name} />

        {/* 3. Hero Section (2-columns on Desktop) */}
        <section className="pt-2 pb-10 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              videoUrl={product.videoUrl}
              productName={product.name}
            />
          </div>

          {/* Right Column: Product Info & Buy Box */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            
            {/* Category & Stock Tag */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-zinc-500">
                {product.category}
              </span>

              {product.inStock && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>En stock</span>
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating Summary */}
            <RatingSummary
              rating={product.rating}
              reviewCount={product.reviewCount}
              onScrollToReviews={handleScrollToReviews}
            />

            {/* Price Display in FCFA */}
            <div className="pt-1 pb-2 border-y border-zinc-200/80 my-1">
              <PriceDisplay
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                currency={product.currency}
                size="xl"
              />
              {product.stockNote && (
                <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {product.stockNote}
                </p>
              )}
            </div>

            {/* Value Proposition Quote */}
            {product.valueProposition && (
              <div className="p-3.5 rounded-2xl bg-[#faf7f2] border-l-4 border-[#d94f26] border-zinc-200/70">
                <p className="text-xs sm:text-sm text-zinc-700 font-medium italic leading-relaxed">
                  "{product.valueProposition}"
                </p>
              </div>
            )}

            {/* Action Buttons: Dominant Buy Now + Secondary Cart */}
            <ActionButtons
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              onWhatsAppBuy={handleWhatsAppBuy}
              inStock={product.inStock}
            />

            {/* Trust Reassurance Badges */}
            <TrustBadges />

            {/* Cross-Sell Bundle Option (if available) */}
            {product.complementaryProducts && product.complementaryProducts.length > 0 && (
              <CrossSellBundle
                complementaryProducts={product.complementaryProducts}
                onAddComplementary={handleAddComplementary}
              />
            )}

          </div>
        </section>

        {/* 4. Product Benefits ("POURQUOI VOUS ALLEZ L'AIMER") */}
        <ProductBenefits benefits={product.benefits} />

        {/* 5. How It Works ("COMMENT ÇA MARCHE ?") */}
        <HowItWorks steps={product.howItWorks} />

        {/* 6. Product Description (Accordions / Tabs) */}
        <ProductDescription
          shortDescription={product.shortDescription}
          detailedDescription={product.detailedDescription}
          specifications={product.specifications}
          packageContents={product.packageContents}
        />

        {/* 7. Shipping Info ("LIVRAISON") */}
        <ShippingInfo shipping={product.shipping} />

        {/* 8. Customer Reviews ("AVIS CLIENTS") */}
        <CustomerReviews
          summary={product.reviewsSummary}
          reviews={product.reviews}
          productName={product.name}
        />

        {/* 9. Social Proof ("ILS NOUS FONT CONFIANCE") */}
        <SocialProof items={product.socialProofItems} />

        {/* 10. Cross-Selling & Related Products ("VOUS POURRIEZ AUSSI AIMER") */}
        <RelatedProducts
          products={allProducts}
          currentProductId={product.id}
          onSelectProduct={onSelectProduct}
        />

        {/* 11. FAQ ("QUESTIONS FRÉQUENTES") */}
        <ProductFAQ faqs={product.faqs} />

        {/* 12. Final CTA ("VOUS ÊTES PRÊT ?") */}
        <FinalCTA
          productName={product.name}
          price={product.price}
          currency={product.currency}
          thumbnailUrl={product.images[0]?.url || ''}
          onBuyNow={() => handleBuyNow(1)}
          inStock={product.inStock}
        />

      </main>

      {/* Sticky Bottom Buy Bar (Mobile First) */}
      <StickyBuyBar
        productName={product.name}
        price={product.price}
        currency={product.currency}
        thumbnailUrl={product.images[0]?.url || ''}
        onBuyNow={() => handleBuyNow(1)}
        onAddToCart={() => handleAddToCart(1)}
        inStock={product.inStock}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
