export interface ShippingZone {
  id: string;
  name: string;
  description: string;
  fee: number; // in FCFA
  estimatedDelay: string;
  isDefault?: boolean;
  isActive: boolean;
}

const STORAGE_KEY = 'kayashop_shipping_zones_v1';

export const DEFAULT_SHIPPING_ZONES: ShippingZone[] = [
  {
    id: 'cotonou',
    name: 'Cotonou (Tous Quartiers)',
    description: 'Haie Vive, Cadjèhoun, Akpakpa, Fidjrossè, Menontin, Kouhounou, Agla, Gbégamey, etc.',
    fee: 1000,
    estimatedDelay: '2h à 4h (Livraison Express)',
    isDefault: true,
    isActive: true,
  },
  {
    id: 'calavi_godomey',
    name: 'Abomey-Calavi & Godomey',
    description: 'Arconville, Tankpè, Bidossessi, Zogbadjè, IITA, Godomey Magasin, Togoudo',
    fee: 1500,
    estimatedDelay: '3h à 6h (Même jour)',
    isActive: true,
  },
  {
    id: 'porto_novo_seme',
    name: 'Porto-Novo & Sèmè-Kpodji',
    description: 'Centre-ville Porto-Novo, Ouando, Djassin, Sèmè-Podji, Ekpè, Djeffa',
    fee: 2000,
    estimatedDelay: 'Même jour (4h à 8h)',
    isActive: true,
  },
  {
    id: 'ouidah_allada',
    name: 'Ouidah, Allada & Pahou',
    description: 'Pahou, Ouidah Centre, Allada, Tori-Bossito',
    fee: 2500,
    estimatedDelay: '24h ouvrées',
    isActive: true,
  },
  {
    id: 'bohicon_abomey',
    name: 'Bohicon & Abomey (Zou)',
    description: 'Bohicon Gare, Abomey Centre, Djidja',
    fee: 2500,
    estimatedDelay: '24h ouvrées (Par Bus / Colis)',
    isActive: true,
  },
  {
    id: 'parakou_nord',
    name: 'Parakou & Villes du Nord',
    description: 'Parakou, Natitingou, Djougou, Kandi, Malanville',
    fee: 3000,
    estimatedDelay: '24h à 48h (Colis sécurisé)',
    isActive: true,
  },
];

export const shippingService = {
  getZones(): ShippingZone[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SHIPPING_ZONES));
        return DEFAULT_SHIPPING_ZONES;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_SHIPPING_ZONES;
    }
  },

  getActiveZones(): ShippingZone[] {
    return this.getZones().filter(zone => zone.isActive);
  },

  getZoneById(id: string): ShippingZone | undefined {
    return this.getZones().find(zone => zone.id === id);
  },

  saveZones(zones: ShippingZone[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(zones));
    } catch (e) {
      console.error('Erreur sauvegarde shipping zones:', e);
    }
  },

  updateZone(id: string, updates: Partial<ShippingZone>): ShippingZone[] {
    const zones = this.getZones().map(zone => {
      if (zone.id === id) {
        return { ...zone, ...updates };
      }
      return zone;
    });
    this.saveZones(zones);
    return zones;
  },

  addZone(newZone: Omit<ShippingZone, 'id'>): ShippingZone[] {
    const id = 'zone_' + Date.now();
    const zones = [...this.getZones(), { ...newZone, id }];
    this.saveZones(zones);
    return zones;
  },

  deleteZone(id: string): ShippingZone[] {
    const zones = this.getZones().filter(zone => zone.id !== id);
    this.saveZones(zones);
    return zones;
  },

  resetToDefault(): ShippingZone[] {
    this.saveZones(DEFAULT_SHIPPING_ZONES);
    return DEFAULT_SHIPPING_ZONES;
  },
};
