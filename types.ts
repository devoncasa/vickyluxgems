

export enum Material {
  Amber = 'Amber',
  Spinel = 'Spinel',
  Ruby = 'Ruby',
  Sapphire = 'Sapphire',
  FossilCoral = 'Fossil Coral',
  Agate = 'Agate',
  Jade = 'Jade',
  Alexandrite = 'Alexandrite',
  Diamond = 'Diamond',
  Emerald = 'Emerald',
  Pearl = 'Pearl',
  Tanzanite = 'Tanzanite',
  Aquamarine = 'Aquamarine',
  Citrine = 'Citrine',
  Garnet = 'Garnet',
  Jadeite = 'Jadeite',
  LapisLazuli = 'Lapis Lazuli',
  Morganite = 'Morganite',
  Onyx = 'Onyx',
  Opal = 'Opal',
  Peridot = 'Peridot',
  Topaz = 'Topaz',
  Tourmaline = 'Tourmaline',
  Zircon = 'Zircon'
}

export enum Metal {
  None = 'None',
  Gold = 'Yellow Gold 96.5%',
  Silver = 'Silver',
  Gold18K = '18K Gold',
  Gold14K = '14K Gold',
  Gold9K = '9K Gold',
  Copper = 'Copper',
  Brass = 'Brass',
}

export type BeadSize = number;
export type BeadQuantity = 27 | 54 | 99 | 108;

export type ClarityTier = 'all' | 'visible' | 'semi-clear' | 'high';
export type Grade = 'Standard' | 'Silver' | 'High';

// New Grade enum specifically for the Tesbih/Rosary builder to avoid conflicts
export enum TesbihRosaryGrade {
  Standard = 'Standard Grade',
  Premium = 'Premium Grade',
  Exceptional = 'Exceptional Grade',
}

export interface NavLink {
  name: string;
  path?: string;
  submenus?: NavLink[];
}

export interface ShopCategory {
  name: string;
  slug: string;
  subCategories?: ShopCategory[];
  material?: Material;
}


export interface Filters {
  amberColors: string[];
  clarity: ClarityTier;
  beadSizeMax: number;
  certifications: string[];
}

export interface Product {
  id: string; // Unique ID for this specific configuration
  sku: string;
  name: string; // e.g., "Mila Amber Bracelet (8mm, 108 beads)"
  category: string; // e.g., 'bracelets', 'prayer-beads-108', 'rings'
  material: Material;

  // For display on cards and lists
  price: number; // Final price for this specific product in THB
  bestseller?: boolean;
  isNewArrival?: boolean;

  // Detailed information
  story: string;
  energyProperties: string[];
  hashtags?: {
    en: string[];
    th: string[];
  };
  
  // All products have media
  media: {
    mainImageUrl: string;
    gallery: string[];
  };

  // All products have specs
  specifications: {
    productForm?: string[];
    beadSize_mm?: BeadSize;
    beadCount?: BeadQuantity;
    ringSize?: string;
    pendantMetal?: Metal;
    dimensions_mm?: string;
    totalWeight_grams: number;
    clarityLevel?: string;
    finish?: string;
    patterns?: string; // Optional
    origin: string;
    setting?: string;
    band?: string;
  };

  // Certification is for all
  certification: {
    isCertified: boolean;
    authority?: string;
    certificateNumber?: string;
  };
  
  // Amber-specific details
  amberDetails?: {
    colorTier: string; // "Mila (Emperor Gold)"
    colorSlug: string; // "mila"
    description: string;
    rarity: string;
    specialNote: string;
    basePricePerGram: number;
    richnessScore?: number; // For Mila (e.g., 1-10)
    purityLevel?: 'Standard' | 'Pure' | 'Deep Black'; // For Black Amber
  };

  tierExplanations?: { // For special amber like Mila, Black
    [key: string]: string;
  };

  inventory: {
    stock: number;
    isAvailable: boolean;
  };
}


export interface Amulet {
  id: string;
  name: string;
  price: number;
  material: string;
  imageUrl: string;
}

export interface CartItem {
  id: string; // Unique ID for this cart item instance, e.g., `${product.id}-${selectedBeadSize}`
  product: Product;
  quantity: number;
  price: number; // Price at the time of adding to cart
  selectedBeadSize?: BeadSize;
}

export interface MaterialDetail {
  name: Material;
  description: string;
  significance: string;
  imageUrl: string;
}

export interface Author {
    name: string;
    title: string;
    imageUrl: string;
    bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Soul' | 'Science' | 'Craftsmanship' | 'GemTech Insights';
  summary: string;
  author: Author;
  date: string;
  featuredImage: string;
  readingTime: number;
}

export interface AmberColorDetail {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  rarity: string;
  specialNote: string;
  imageUrl: string;
  basePricePerGram: number; // in THB
  cuttingYield?: string;
  appearance?: string;
  qualityNote?: string;
  selectionCriteria?: string;
}

export interface CustomPreOrderDetails {
    amberColor: AmberColorDetail;
    grade: Grade;
    beadSize: BeadSize;
    beadQuantity: BeadQuantity;
    amulet: Amulet | null;
    metal: Metal;
}

export interface PriceBreakdown {
  beadsPrice: number;
  amuletPrice: number;
  metalPrice: number;
  totalPrice: number;
}

export interface CustomBraceletDetails {
    wristSize_cm: number;
    beadSize_mm: BeadSize;
    comfortFit_cm: number;
    amberColor: AmberColorDetail;
    beadCount: number;
    totalWeight_g: number;
    totalPrice: number;
}


export interface AmberSpectrumDetail {
  id: string;
  title: string;
  subtitle: string;
  visual: string;
  science: string;
  rarity: string;
  symbolism: string;
  suits: string;
  element: string;
  why: string;
  bgColor: string;
  borderColor: string;
  textColor?: string;
  imageUrl: string;
}

export interface BeadConfig {
  id: string;
  colorId: string;
  size: BeadSize;
}

export interface CustomBraceletFromBuilderDetails {
    designCode: string;
    beads: BeadConfig[];
    totalLength_mm: number;
    estimatedWristSize_cm: number;
    totalWeight_g: number;
    totalPrice: number;
}

// --- New Types for Tesbih & Rosary Builder ---

export interface TesbihRosaryMaterial {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    prices: {
        [TesbihRosaryGrade.Standard]: number;
        [TesbihRosaryGrade.Premium]: number;
        [TesbihRosaryGrade.Exceptional]: number;
    }
}

export interface TesbihRosaryComponent {
    id: string;
    name: string;
    type: 'tassel' | 'imame' | 'disk' | 'crucifix' | 'centerpiece';
    weight_g: number;
    price_thb: number; // Can be a fixed price for some components
    material: string;
    imageUrl: string;
}

export interface CustomTesbihRosaryDetails {
    tradition: 'Tesbih' | 'Rosary';
    grade: TesbihRosaryGrade;
    mainBeadMaterial: TesbihRosaryMaterial | AmberColorDetail;
    beadSize: BeadSize;
    beadCount: 33 | 99 | 59; // 53 Hail Mary + 6 Our Father
    totalWeight_g: number;
    totalPrice: number;
    // Component details can be added here
}

// --- New Types for Interactive Prayer Bead Customizer ---
export interface PrayerBeadComponent {
  name: string;
  options: string[];
}

export interface PrayerBead {
  name: string;
  imageUrl: string;
  components: PrayerBeadComponent[];
}

export interface PrayerBeadData {
  rosary: PrayerBead;
  tasbih: PrayerBead;
}


// --- New Types for Unified Prayer Bead Builder ---
export enum PrayerBeadTradition {
    Juzu = 'Juzu',
    Tesbih = 'Tesbih',
    Rosary = 'Rosary',
}

export interface VisualMaterial {
  id: string;
  name: string;
  imageUrl: string;
  mapsTo: string;
}

// Juzu Specific
export enum JuzuGenderStyle {
    Mens = "Men's",
    Womens = "Women's",
}

export enum JuzuType {
    Formal = "Formal (108 beads)",
    Informal = "Informal (abbreviated)",
}

export enum TasselShape {
    Head = "Tassel with Head",
    String = "String Tassel",
    Cut = "Cut Tassel",
    Bonten = "Bonten Tassel",
}

export enum TasselMaterial {
    PureSilk = "Pure Silk (Luxury)",
    Rayon = "Rayon (Standard)",
}

// Tesbih Specific
export type TesbihBeadCount = 33 | 99;

export interface DecorativeComponent {
    id: string;
    name: string;
    price: number;
    material: string;
    imageUrl: string;
}

// Main Configuration Interface
export interface CustomPrayerBead {
    tradition: PrayerBeadTradition;
    mainBeadSize: BeadSize;
    mainBeadMaterial: string; // ID of the material
    burmeseAmberColor: AmberColorDetail | null;
    metalGrade: TesbihRosaryGrade;

    // Tradition-specific fields
    juzu?: {
        gender: JuzuGenderStyle;
        type: JuzuType;
        tasselShape: TasselShape;
        tasselMaterial: TasselMaterial;
    };
    tesbih?: {
        beadCount: TesbihBeadCount;
        tassel: DecorativeComponent | null;
        imame: DecorativeComponent | null;
    };
    rosary?: {
        crucifix: DecorativeComponent | null;
        centerpiece: DecorativeComponent | null;
    };
}

export interface CustomJuzuDetails {
    genderStyle: JuzuGenderStyle;
    juzuType: JuzuType;
    omodamaMaterial: string;
    omodamaSize: BeadSize;
    oyadamaSize: BeadSize;
    shitentamaSize: BeadSize;
    deshidamaSize: BeadSize;
    tasselShape: TasselShape;
    tasselMaterial: TasselMaterial;
    totalPrice: number;
}


// --- New Types for Admin Panel Gem Data ---
export interface GemDetails {
  colors: string[];
  origins?: string[];
  cuts?: string[];
}

export interface GemCategoryData {
  [gemstoneName: string]: GemDetails;
}

export interface GemData {
  cuts: {
    standard: string[];
    jade: string[];
  };
  origins: {
    standard: string[];
  };
  categories: {
    [categoryName: string]: GemCategoryData;
  }
}

// --- NEW TYPES FOR ROSARY CONFIGURATOR ---
export type RosaryPathway = 'Gemstone' | 'Amber';

export interface RosaryGemstone {
  id: string;
  name: string;
  mohs: number;
  priceTier: number; // 1 (least expensive) to 5 (most expensive)
  imageUrl: string;
  advisory?: string;
  description: string;
}

export interface RosaryAmber {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface RosaryMetal {
  id: string;
  name: string;
  costTier: number; // 1 to 5
  color: string;
  description: string;
}

export interface RosaryComponent {
  id: string;
  name: string;
  imageUrl: string;
  weightG: number;
}

export type RosaryBeadSelection = {
  materialId: string;
  size: number;
};

export interface RosaryConfig {
  pathway: RosaryPathway | null;
  metal: RosaryMetal | null;
  crucifix: RosaryComponent | null;
  centerpiece: RosaryComponent | null;
  decadeAveBeads: RosaryBeadSelection;
  decadePaterBeads: RosaryBeadSelection;
  invitatoryAveBeads: RosaryBeadSelection;
  invitatoryPaterBead: RosaryBeadSelection;
}

export type RosaryPart = 
  | 'decadeAveBeads'
  | 'decadePaterBeads'
  | 'invitatoryAveBeads'
  | 'invitatoryPaterBead';