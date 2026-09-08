import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import type { Product } from '../types/product';

const PRODUCTS_STORAGE_KEY = 'kayashop_custom_products_v2';

export const productService = {
  /**
   * Récupère tous les produits (locaux modifiés ou initiaux par défaut)
   */
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        return DEFAULT_PRODUCTS;
      }
      const parsed = JSON.parse(data) as Product[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return DEFAULT_PRODUCTS;
      }
      // Ensure all products have valid images and properties
      const valid = parsed.filter((p) => p && p.id && p.name && Array.isArray(p.images) && p.images.length > 0);
      if (valid.length === 0) {
        return DEFAULT_PRODUCTS;
      }
      return valid;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  },

  /**
   * Trouve un produit par son slug ou son ID
   */
  findProduct(slugOrId: string): Product | undefined {
    const products = productService.getProducts();
    const clean = slugOrId.toLowerCase().trim();
    return products.find((p) => p.slug === clean || p.id === clean || p.id === slugOrId);
  },

  /**
   * Ajoute ou met à jour un produit dans le catalogue
   */
  saveProduct(product: Partial<Product> & { name: string; price: number }): { products: Product[]; saved: Product } {
    const products = productService.getProducts();
    const now = Date.now();

    const slug =
      product.slug ||
      product.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const id = product.id || `prod_${now}`;

    const existingIndex = products.findIndex((p) => p.id === id || p.slug === slug);

    const completeProduct: Product = {
      id,
      slug,
      name: product.name,
      category: product.category || 'Innovations & Maison',
      tagline: product.tagline || 'Produit pratique et innovant pour faciliter votre quotidien.',
      price: Number(product.price) || 10000,
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : undefined,
      currency: product.currency || 'FCFA',
      inStock: product.inStock !== undefined ? product.inStock : true,
      stockNote: product.stockNote || 'En stock — expédié sous 24h',
      rating: product.rating || 4.9,
      reviewCount: product.reviewCount || 18,
      valueProposition:
        product.valueProposition ||
        `Découvrez ${product.name}, une solution fiable et moderne conçue pour vous apporter satisfaction dès la première utilisation.`,
      images:
        product.images && product.images.length > 0
          ? product.images
          : [
              {
                id: `img_${now}`,
                url: '/images/products/wine-opener-1.png',
                alt: product.name,
                isPrimary: true,
              },
            ],
      benefits:
        product.benefits && product.benefits.length > 0
          ? product.benefits
          : [
              {
                id: `b1_${now}`,
                icon: 'lightning',
                title: 'Simple d’utilisation',
                description: 'Prise en main immédiate et intuitive sans effort particulier.',
              },
              {
                id: `b2_${now}`,
                icon: 'shield',
                title: 'Qualité certifiée',
                description: 'Matériaux durables et contrôlés avant expédition.',
              },
              {
                id: `b3_${now}`,
                icon: 'clock',
                title: 'Gain de temps',
                description: 'Efficace au quotidien pour simplifier vos tâches.',
              },
              {
                id: `b4_${now}`,
                icon: 'gift',
                title: 'Idée cadeau parfaite',
                description: 'Présentation soignée idéale pour offrir.',
              },
            ],
      howItWorks:
        product.howItWorks && product.howItWorks.length > 0
          ? product.howItWorks
          : [
              {
                step: 'Étape 01',
                title: 'Déballez et préparez',
                description: 'Retirez votre article de son emballage et lisez la notice rapide.',
              },
              {
                step: 'Étape 02',
                title: 'Mettez en marche',
                description: 'Allumez ou positionnez l’appareil selon vos besoins.',
              },
              {
                step: 'Étape 03',
                title: 'Profitez du résultat',
                description: 'Un résultat impeccable et un confort garanti au quotidien.',
              },
            ],
      shortDescription:
        product.shortDescription ||
        `${product.name} réunit technologie, ergonomie et praticité pour vous offrir le meilleur au meilleur prix.`,
      detailedDescription:
        product.detailedDescription ||
        `Conçu selon les standards de qualité KayaShop, ${product.name} répond à toutes vos exigences de performance et de durabilité.`,
      specifications:
        product.specifications && product.specifications.length > 0
          ? product.specifications
          : [
              { label: 'Garantie', value: '12 mois constructeur' },
              { label: 'Origine', value: 'Conforme CE & RoHS' },
              { label: 'Expédition', value: 'Livraison express 24h Bénin' },
            ],
      packageContents:
        product.packageContents && product.packageContents.length > 0
          ? product.packageContents
          : [`1x ${product.name}`, '1x Guide d’utilisation en français', '1x Emballage de protection renforcé'],
      shipping: {
        badge: 'Livraison Express Bénin',
        zones: 'Cotonou, Abomey-Calavi, Porto-Novo, Parakou et toutes les villes du Bénin.',
        estimatedTime: 'Livré sous 24h à 48h ouvrées',
        details: [
          'Contrôle complet du colis avant remise du paiement au livreur',
          'Paiement en espèces ou par Mobile Money (MTN / Moov / Wave)',
          'Service client joignable 7j/7 au +229 43 79 70 42',
        ],
      },
      reviewsSummary: {
        average: 4.9,
        total: product.reviewCount || 18,
        distribution: { 5: 15, 4: 3, 3: 0, 2: 0, 1: 0 },
      },
      reviews: [
        {
          id: `rev_1_${now}`,
          author: 'Brice K.',
          city: 'Cotonou (Haie Vive)',
          rating: 5,
          date: 'Il y a 3 jours',
          comment: 'Très bon produit, conforme à la description. Livré très rapidement.',
          isVerifiedPurchase: true,
        },
        {
          id: `rev_2_${now}`,
          author: 'Carine T.',
          city: 'Abomey-Calavi',
          rating: 5,
          date: 'Il y a 1 semaine',
          comment: 'Je recommande à 100%, le service client WhatsApp est très réactif.',
          isVerifiedPurchase: true,
        },
      ],
      faqs: [
        {
          question: `Comment fonctionne la garantie pour ${product.name} ?`,
          answer:
            'Tous nos produits bénéficient d’une garantie d’échange immédiat en cas de défaut constaté à la réception.',
        },
        {
          question: 'Quels sont les délais de livraison au Bénin ?',
          answer:
            'Livraison en 24h sur Cotonou et Calavi, 24h à 48h pour Porto-Novo, Parakou et les autres localités.',
        },
      ],
      complementaryProducts: product.complementaryProducts || [],
    };

    let updatedList: Product[];
    if (existingIndex >= 0) {
      updatedList = [...products];
      updatedList[existingIndex] = completeProduct;
    } else {
      updatedList = [completeProduct, ...products];
    }

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.warn('Erreur sauvegarde produit', e);
    }

    return { products: updatedList, saved: completeProduct };
  },

  /**
   * Supprime un produit
   */
  deleteProduct(id: string): Product[] {
    const products = productService.getProducts();
    const updated = products.filter((p) => p.id !== id);
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Erreur suppression produit', e);
    }
    return updated;
  },

  /**
   * Bascule le statut de stock (En stock / Rupture)
   */
  toggleStock(id: string): Product[] {
    const products = productService.getProducts();
    const updated = products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          inStock: !p.inStock,
          stockNote: !p.inStock ? 'En stock — expédié sous 24h' : 'Rupture temporaire',
        };
      }
      return p;
    });

    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Erreur toggle stock', e);
    }
    return updated;
  },

  /**
   * Réinitialise le catalogue aux produits d'origine
   */
  resetToDefaults(): Product[] {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    } catch (e) {
      console.warn('Erreur reset catalogue', e);
    }
    return DEFAULT_PRODUCTS;
  },
};
