export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  biometricData?: BiometricData;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  favoriteColors: string[];
  styles: string[];
  sizes: string[];
  budget: {
    min: number;
    max: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
  };
}

export interface BiometricData {
  faceShape: "round" | "oval" | "square" | "heart" | "diamond";
  skinTone: "fair" | "light" | "medium" | "tan" | "deep";
  bodyType: "pear" | "apple" | "hourglass" | "rectangle" | "inverted-triangle";
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    height?: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  model3D?: string;
  category: ProductCategory;
  tags: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  brand: string;
  rating: number;
  reviewCount: number;
  isAvailableForTryOn: boolean;
  metadata: {
    material: string;
    careInstructions: string[];
    countryOfOrigin: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  subcategories?: ProductCategory[];
}

export interface ProductColor {
  name: string;
  hex: string;
  rgb: [number, number, number];
  isAvailable: boolean;
}

export interface ProductSize {
  name: string;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    length?: number;
  };
  isAvailable: boolean;
}

export interface TryOnSession {
  id: string;
  userId: string;
  products: Product[];
  snapshots: TryOnSnapshot[];
  startedAt: Date;
  endedAt?: Date;
  deviceInfo: {
    userAgent: string;
    screenResolution: string;
    cameraResolution: string;
  };
}

export interface TryOnSnapshot {
  id: string;
  sessionId: string;
  imageData: string; // base64 encoded image
  products: Product[];
  timestamp: Date;
  isShared: boolean;
  socialPlatforms?: string[];
}

export interface Recommendation {
  id: string;
  userId: string;
  products: Product[];
  type: "collaborative" | "content-based" | "llm-generated";
  confidence: number;
  context: {
    currentOutfit?: Product[];
    occasion?: string;
    weather?: string;
    budget?: number;
  };
  createdAt: Date;
}

export interface GestureCommand {
  type: "swipe" | "pinch" | "tap" | "hold" | "wave";
  direction?: "left" | "right" | "up" | "down";
  action: string;
  confidence: number;
}

export interface VoiceCommand {
  text: string;
  action: string;
  confidence: number;
  language: string;
}

export interface ShoppingCart {
  id: string;
  userId?: string;
  items: CartItem[];
  totalPrice: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  addedAt: Date;
}
