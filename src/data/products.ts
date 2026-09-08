import type { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-ouvre-vin-electrique',
    slug: 'ouvre-vin-electrique',
    name: 'Ouvre-vin électrique',
    category: 'Maison & Art de la table',
    tagline: 'Profitez d’une ouverture simple, rapide et sans effort de vos bouteilles.',
    price: 10000,
    currency: 'FCFA',
    inStock: true,
    stockNote: 'En stock — expédié sous 24h',
    rating: 4.9,
    reviewCount: 28,
    valueProposition: 'Ouvrez vos bouteilles de vin en moins de 6 secondes d’une simple pression, sans forcer ni abîmer le bouchon.',
    images: [
      {
        id: 'img-ov-1',
        url: '/images/products/wine-opener-1.png',
        alt: 'Set Ouvre-vin électrique complet avec accessoires et coffret',
        isPrimary: true,
      }
    ],
    benefits: [
      {
        id: 'b-1',
        icon: 'lightning',
        title: 'Utilisation simple',
        description: 'Deux boutons intuitifs pour extraire et éjecter le bouchon en quelques secondes.',
      },
      {
        id: 'b-2',
        icon: 'battery',
        title: 'Fonctionnement à piles',
        description: 'Alimentation autonome par piles standard, utilisable partout sans fil.',
      },
      {
        id: 'b-3',
        icon: 'wine',
        title: 'Pratique au quotidien',
        description: 'Fini les bouchons cassés ou les efforts manuels lors de vos repas et réceptions.',
      },
      {
        id: 'b-4',
        icon: 'gift',
        title: 'Idée cadeau idéale',
        description: 'Livré dans un coffret soigné avec tous ses accessoires de dégustation.',
      }
    ],
    howItWorks: [
      {
        step: 'Étape 01',
        title: 'Positionnez l’appareil',
        description: 'Retirez la feuille protectrice avec le coupe-capsule puis placez l’ouvre-bouteille verticalement sur le goulot.',
      },
      {
        step: 'Étape 02',
        title: 'Activez l’extraction',
        description: 'Appuyez sur le bouton du bas : la vrille pénètre automatiquement et retire le bouchon de la bouteille.',
      },
      {
        step: 'Étape 03',
        title: 'Libérez le bouchon',
        description: 'Appuyez sur le bouton du haut pour faire ressortir le bouchon intact sans aucun effort.',
      }
    ],
    shortDescription: 'Un ouvre-bouteille électrique élégant et performant conçu pour déboucher toutes vos bouteilles de vin avec rapidité et précision.',
    detailedDescription: 'L’ouvre-vin électrique KayaShop transforme le débouchage de vos bouteilles en une formalité agréable et instantanée. Son moteur précis retire les bouchons en liège ou synthétiques sans risque d’effritement. Accompagné de ses accessoires indispensables (coupe-capsule, verseur aérateur et bouchon sous vide), c’est l’outil parfait pour vos dîners, fêtes et dégustations.',
    specifications: [
      { label: 'Type', value: 'Ouvre-bouteille électrique automatique' },
      { label: 'Alimentation', value: 'Fonctionnement à piles' },
      { label: 'Matériaux', value: 'Corps ABS finition mate & mécanisme renforcé' },
      { label: 'Compatibilité', value: 'Bouteilles de vin standard (liège et synthétique)' },
      { label: 'Temps d’ouverture', value: 'Environ 6 à 8 secondes' }
    ],
    packageContents: [
      '1x Ouvre-vin électrique principal',
      '1x Coupe-capsule pratique',
      '1x Bec verseur / aérateur de vin',
      '1x Bouchon sous vide pour conservation',
      '1x Guide d’utilisation en français'
    ],
    shipping: {
      badge: 'Livraison disponible au Bénin',
      zones: 'Cotonou, Abomey-Calavi, Porto-Novo, Parakou, Bohicon et tout le Bénin',
      estimatedTime: 'Livraison sous 24h à 48h ouvrées selon votre localité',
      details: [
        'Expédition rapide et soignée avec numéro de suivi',
        'Confirmation directe par appel ou message avant acheminement',
        'Vérification du colis à la réception'
      ]
    },
    reviewsSummary: {
      average: 4.9,
      total: 28,
      distribution: {
        5: 25,
        4: 3,
        3: 0,
        2: 0,
        1: 0,
      }
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Dossou Rodrigue',
        city: 'Cotonou (Haie Vive)',
        rating: 5,
        date: 'Il y a 3 jours',
        comment: 'Super pratique ! Plus besoin de forcer sur les bouchons durs pendant les repas de famille. Le coffret est très bien fini.',
        isVerifiedPurchase: true,
      },
      {
        id: 'rev-2',
        author: 'Sèdjro Agossa',
        city: 'Abomey-Calavi (Godomey)',
        rating: 5,
        date: 'Il y a 1 semaine',
        comment: 'Très bon achat. Le verseur et le bouchon sous vide sont un vrai plus. Reçu le jour même à Calavi.',
        isVerifiedPurchase: true,
      },
      {
        id: 'rev-3',
        author: 'Christian Mensah',
        city: 'Porto-Novo (Ouando)',
        rating: 5,
        date: 'Il y a 2 semaines',
        comment: 'Fonctionne parfaitement. Deuxième commande sur KayaShop et livreur très ponctuel.',
        isVerifiedPurchase: true,
      }
    ],
    socialProofItems: [
      {
        type: 'review',
        title: 'Simplicité absolue',
        caption: 'Recommandé par nos clients pour son efficacité et son design élégant.',
        author: 'Avis vérifiés KayaShop'
      },
      {
        type: 'review',
        title: 'Qualité éprouvée',
        caption: 'Testé et approuvé pour toutes les réceptions et moments de partage.',
        author: 'Satisfaction client'
      }
    ],
    faqs: [
      {
        question: 'Le produit est-il en stock actuellement ?',
        answer: 'Oui, l’ouvre-vin électrique est actuellement disponible dans nos entrepôts et prêt pour expédition.',
      },
      {
        question: 'Quels sont les délais de livraison ?',
        answer: 'Les livraisons s’effectuent généralement sous 24h à 48h ouvrées selon votre ville de résidence.',
      },
      {
        question: 'Comment passer commande ?',
        answer: 'Il vous suffit de cliquer sur le bouton "Commander maintenant", de renseigner vos coordonnées (nom, numéro de téléphone et ville de livraison), et notre équipe prépare immédiatement votre envoi.',
      },
      {
        question: 'Comment fonctionne l’alimentation de l’appareil ?',
        answer: 'Cet appareil fonctionne avec des piles standard, ce qui permet de l’emporter facilement partout sans avoir besoin d’une prise électrique à proximité.',
      },
      {
        question: 'Puis-je vérifier le colis à la livraison ?',
        answer: 'Absolument. Vous avez la possibilité de vérifier l’état du colis au moment de la réception.',
      }
    ],
    complementaryProducts: [
      {
        id: 'comp-piles',
        name: 'Pack 4 Piles Alcalines Longue Durée',
        price: 2000,
        image: '/images/products/wine-opener-2.png',
        tagline: 'Pour une autonomie prolongée dès le premier jour'
      }
    ],
    relatedProductIds: ['prod-tensiometre-rechargeable']
  },
  {
    id: 'prod-tensiometre-rechargeable',
    slug: 'tensiometre-electrique-rechargeable',
    name: 'Tensiomètre électrique rechargeable',
    category: 'Santé & Bien-être',
    tagline: 'Surveillez votre tension artérielle en toute simplicité à domicile.',
    price: 12500,
    currency: 'FCFA',
    inStock: true,
    stockNote: 'En stock — expédié sous 24h',
    rating: 4.9,
    reviewCount: 34,
    valueProposition: 'Mesurez précisément votre pression artérielle et fréquence cardiaque en quelques secondes grâce à un grand écran digital rétroéclairé et une batterie rechargeable.',
    images: [
      {
        id: 'img-bp-1',
        url: '/images/products/blood-pressure-1.png',
        alt: 'Tensiomètre électronique rechargeable avec grand écran digital',
        isPrimary: true,
      }
    ],
    benefits: [
      {
        id: 'b-bp-1',
        icon: 'heart',
        title: 'Mesure précise et rapide',
        description: 'Lecture instantanée de la tension systolique, diastolique et du pouls en un seul clic.',
      },
      {
        id: 'b-bp-2',
        icon: 'battery',
        title: 'Rechargeable par câble',
        description: 'Batterie intégrée rechargeable, plus besoin de changer constamment de piles.',
      },
      {
        id: 'b-bp-3',
        icon: 'sparkles',
        title: 'Grand écran très lisible',
        description: 'Affichage clair avec chiffres grands formats pour une lecture aisée par les seniors.',
      },
      {
        id: 'b-bp-4',
        icon: 'shield',
        title: 'Confort et simplicité',
        description: 'Brassard ergonomique et gonflage automatique doux et silencieux.',
      }
    ],
    howItWorks: [
      {
        step: 'Étape 01',
        title: 'Installez le brassard',
        description: 'Enfilez le brassard autour de votre bras/poignet à hauteur du cœur en restant assis et détendu.',
      },
      {
        step: 'Étape 02',
        title: 'Appuyez sur Démarrer',
        description: 'Pressez le bouton central unique : l’appareil gonfle automatiquement et effectue la mesure.',
      },
      {
        step: 'Étape 03',
        title: 'Lisez vos résultats',
        description: 'Vos valeurs de tension (SYS, DIA) et pulsations s’affichent clairement à l’écran avec code couleur.',
      }
    ],
    shortDescription: 'Un tensiomètre électronique moderne et rechargeable pour contrôler facilement votre santé et celle de vos proches au quotidien.',
    detailedDescription: 'Le tensiomètre électrique rechargeable KayaShop offre une fiabilité médicale à domicile. Compact, élégant et facile à transporter, il vous permet de suivre vos constantes en toute autonomie. Sa batterie rechargeable intégrée assure une grande durabilité sans contrainte.',
    specifications: [
      { label: 'Type', value: 'Tensiomètre électronique digital rechargeable' },
      { label: 'Mesures', value: 'Pression systolique, diastolique et fréquence cardiaque' },
      { label: 'Affichage', value: 'Écran LED rétroéclairé grand format' },
      { label: 'Alimentation', value: 'Batterie lithium rechargeable intégrée (USB)' },
      { label: 'Arrêt automatique', value: 'Oui, économie d’énergie après 60s' }
    ],
    packageContents: [
      '1x Tensiomètre électronique rechargeable',
      '1x Brassard ajustable tout confort',
      '1x Câble de recharge USB',
      '1x Boîte / pochette de rangement',
      '1x Manuel d’utilisation en français'
    ],
    shipping: {
      badge: 'Livraison disponible',
      zones: 'Abidjan, Dakar, Cotonou, Lomé, Yaoundé, Douala et zones environnantes',
      estimatedTime: 'Livraison sous 24h à 48h ouvrées selon votre localité',
      details: [
        'Expédition rapide et soignée avec numéro de suivi',
        'Confirmation directe par appel ou message avant acheminement',
        'Vérification du colis à la réception'
      ]
    },
    reviewsSummary: {
      average: 4.9,
      total: 34,
      distribution: {
        5: 31,
        4: 3,
        3: 0,
        2: 0,
        1: 0,
      }
    },
    reviews: [
      {
        id: 'rev-bp-1',
        author: 'Sossou Eric',
        city: 'Cotonou (Cadjèhoun)',
        rating: 5,
        date: 'Il y a 4 jours',
        comment: 'Acheté pour ma mère. Les chiffres sont très grands et la batterie rechargeable évite d’acheter des piles constamment.',
        isVerifiedPurchase: true,
      },
      {
        id: 'rev-bp-2',
        author: 'Bio Gounou',
        city: 'Parakou (Banikanni)',
        rating: 5,
        date: 'Il y a 10 jours',
        comment: 'Mesures constantes et très fiables comparées à celles du centre de santé. Expédition rapide et soignée jusqu’à Parakou.',
        isVerifiedPurchase: true,
      },
      {
        id: 'rev-bp-3',
        author: 'Fabrice Zinsou',
        city: 'Abomey-Calavi (Zogbadjè)',
        rating: 5,
        date: 'Il y a 3 semaines',
        comment: 'Très bon tensiomètre, simple pour les personnes âgées, un seul bouton suffit pour lancer la mesure.',
        isVerifiedPurchase: true,
      }
    ],
    socialProofItems: [
      {
        type: 'review',
        title: 'Fiabilité au quotidien',
        caption: 'Un indispensable pour le suivi de santé préventif à domicile.',
        author: 'Recommandation clients'
      },
      {
        type: 'review',
        title: 'Prise en main immédiate',
        caption: 'Adapté à tous les âges grâce à son bouton unique et ses grands chiffres.',
        author: 'Satisfaction KayaShop'
      }
    ],
    faqs: [
      {
        question: 'L’appareil est-il facile à utiliser pour une personne âgée ?',
        answer: 'Oui, tout a été pensé pour la simplicité : un seul bouton de mise en marche, un brassard facile à enfiler et un écran avec de très grands chiffres lumineux.',
      },
      {
        question: 'Comment se recharge le tensiomètre ?',
        answer: 'Il se recharge facilement à l’aide du câble USB fourni, branché sur n’importe quel chargeur de téléphone ou port USB.',
      },
      {
        question: 'Quels sont les délais de livraison ?',
        answer: 'Les livraisons sont assurées sous 24h à 48h ouvrées dans les principales villes.',
      },
      {
        question: 'Puis-je commander par téléphone ou assistance ?',
        answer: 'Oui, vous pouvez valider votre commande directement en ligne ou contacter notre équipe d’assistance pour vous accompagner.',
      }
    ],
    complementaryProducts: [
      {
        id: 'comp-pochette',
        name: 'Étui de protection rigide antichoc',
        price: 3000,
        image: '/images/products/blood-pressure-2.png',
        tagline: 'Protégez votre appareil lors de tous vos déplacements'
      }
    ],
    relatedProductIds: ['prod-ouvre-vin-electrique']
  }
];
