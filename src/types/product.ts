export interface ProductBenefit {
  id: string;
  icon: 'lightning' | 'battery' | 'wine' | 'gift' | 'heart' | 'shield' | 'check' | 'clock' | 'sparkles' | 'user' | 'zap';
  title: string;
  description: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city?: string;
  rating: number;
  date: string;
  comment: string;
  isVerifiedPurchase: boolean;
  photoUrl?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ComplementaryProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  tagline: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  price: number; // in FCFA (e.g. 10000)
  compareAtPrice?: number;
  currency: string; // e.g. "FCFA"
  inStock: boolean;
  stockNote?: string;
  rating: number; // e.g. 4.9
  reviewCount: number;
  images: ProductImage[];
  videoUrl?: string;
  valueProposition: string;
  benefits: ProductBenefit[];
  howItWorks: HowItWorksStep[];
  shortDescription: string;
  detailedDescription: string;
  specifications: ProductSpecification[];
  packageContents: string[];
  shipping: {
    badge: string;
    zones: string;
    estimatedTime: string;
    details: string[];
  };
  reviewsSummary: {
    average: number;
    total: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  reviews: ProductReview[];
  socialProofItems?: {
    type: 'review' | 'image';
    title: string;
    caption: string;
    author?: string;
  }[];
  faqs: ProductFAQ[];
  complementaryProducts?: ComplementaryProduct[];
  relatedProductIds?: string[];
}
