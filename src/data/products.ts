import { Product, ProductCategory } from "@/types";

export const categories: ProductCategory[] = [
  {
    id: "clothing",
    name: "Clothing",
    slug: "clothing",
    subcategories: [
      { id: "tops", name: "Tops", slug: "tops", parentId: "clothing" },
      { id: "bottoms", name: "Bottoms", slug: "bottoms", parentId: "clothing" },
      { id: "dresses", name: "Dresses", slug: "dresses", parentId: "clothing" },
      {
        id: "outerwear",
        name: "Outerwear",
        slug: "outerwear",
        parentId: "clothing",
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    subcategories: [
      {
        id: "jewelry",
        name: "Jewelry",
        slug: "jewelry",
        parentId: "accessories",
      },
      { id: "bags", name: "Bags", slug: "bags", parentId: "accessories" },
      { id: "hats", name: "Hats", slug: "hats", parentId: "accessories" },
    ],
  },
  {
    id: "shoes",
    name: "Shoes",
    slug: "shoes",
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White Button-Up Shirt",
    description:
      "A timeless white button-up shirt made from premium cotton. Perfect for both professional and casual settings.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=600&fit=crop",
    ],
    model3D: "/models/white-shirt.glb",
    category: { id: "tops", name: "Tops", slug: "tops", parentId: "clothing" },
    tags: ["classic", "professional", "cotton", "versatile"],
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        rgb: [255, 255, 255],
        isAvailable: true,
      },
      {
        name: "Light Blue",
        hex: "#E6F3FF",
        rgb: [230, 243, 255],
        isAvailable: true,
      },
      {
        name: "Cream",
        hex: "#F5F5DC",
        rgb: [245, 245, 220],
        isAvailable: false,
      },
    ],
    sizes: [
      {
        name: "XS",
        measurements: { chest: 32, waist: 26, length: 24 },
        isAvailable: true,
      },
      {
        name: "S",
        measurements: { chest: 34, waist: 28, length: 25 },
        isAvailable: true,
      },
      {
        name: "M",
        measurements: { chest: 36, waist: 30, length: 26 },
        isAvailable: true,
      },
      {
        name: "L",
        measurements: { chest: 38, waist: 32, length: 27 },
        isAvailable: true,
      },
      {
        name: "XL",
        measurements: { chest: 40, waist: 34, length: 28 },
        isAvailable: false,
      },
    ],
    brand: "StyleCo",
    rating: 4.5,
    reviewCount: 234,
    isAvailableForTryOn: true,
    metadata: {
      material: "100% Cotton",
      careInstructions: [
        "Machine wash cold",
        "Tumble dry low",
        "Iron on medium heat",
      ],
      countryOfOrigin: "Turkey",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: "2",
    name: "High-Waisted Denim Jeans",
    description:
      "Comfortable high-waisted jeans with a flattering fit. Made from sustainable denim with stretch.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=600&fit=crop",
    ],
    model3D: "/models/denim-jeans.glb",
    category: {
      id: "bottoms",
      name: "Bottoms",
      slug: "bottoms",
      parentId: "clothing",
    },
    tags: ["denim", "high-waisted", "sustainable", "stretch"],
    colors: [
      {
        name: "Dark Wash",
        hex: "#1E3A8A",
        rgb: [30, 58, 138],
        isAvailable: true,
      },
      {
        name: "Medium Wash",
        hex: "#3B82F6",
        rgb: [59, 130, 246],
        isAvailable: true,
      },
      {
        name: "Light Wash",
        hex: "#93C5FD",
        rgb: [147, 197, 253],
        isAvailable: true,
      },
    ],
    sizes: [
      {
        name: "24",
        measurements: { waist: 24, hips: 34, length: 32 },
        isAvailable: true,
      },
      {
        name: "26",
        measurements: { waist: 26, hips: 36, length: 32 },
        isAvailable: true,
      },
      {
        name: "28",
        measurements: { waist: 28, hips: 38, length: 32 },
        isAvailable: true,
      },
      {
        name: "30",
        measurements: { waist: 30, hips: 40, length: 32 },
        isAvailable: true,
      },
      {
        name: "32",
        measurements: { waist: 32, hips: 42, length: 32 },
        isAvailable: true,
      },
    ],
    brand: "EcoFashion",
    rating: 4.7,
    reviewCount: 456,
    isAvailableForTryOn: true,
    metadata: {
      material: "92% Cotton, 6% Polyester, 2% Elastane",
      careInstructions: ["Machine wash cold", "Turn inside out", "Hang to dry"],
      countryOfOrigin: "Mexico",
    },
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-02-25"),
  },
  {
    id: "3",
    name: "Flowing Maxi Dress",
    description:
      "Elegant flowing maxi dress perfect for summer occasions. Features a flattering A-line silhouette.",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-0e060e4b3893?w=400&h=600&fit=crop",
    ],
    model3D: "/models/maxi-dress.glb",
    category: {
      id: "dresses",
      name: "Dresses",
      slug: "dresses",
      parentId: "clothing",
    },
    tags: ["maxi", "elegant", "summer", "flowy"],
    colors: [
      {
        name: "Navy Blue",
        hex: "#1E3A8A",
        rgb: [30, 58, 138],
        isAvailable: true,
      },
      {
        name: "Sage Green",
        hex: "#84CC16",
        rgb: [132, 204, 22],
        isAvailable: true,
      },
      {
        name: "Rose Pink",
        hex: "#F472B6",
        rgb: [244, 114, 182],
        isAvailable: true,
      },
    ],
    sizes: [
      {
        name: "XS",
        measurements: { chest: 32, waist: 26, length: 58 },
        isAvailable: true,
      },
      {
        name: "S",
        measurements: { chest: 34, waist: 28, length: 58 },
        isAvailable: true,
      },
      {
        name: "M",
        measurements: { chest: 36, waist: 30, length: 59 },
        isAvailable: true,
      },
      {
        name: "L",
        measurements: { chest: 38, waist: 32, length: 59 },
        isAvailable: true,
      },
      {
        name: "XL",
        measurements: { chest: 40, waist: 34, length: 60 },
        isAvailable: true,
      },
    ],
    brand: "FlowStyle",
    rating: 4.3,
    reviewCount: 189,
    isAvailableForTryOn: true,
    metadata: {
      material: "100% Viscose",
      careInstructions: [
        "Hand wash only",
        "Lay flat to dry",
        "Cool iron if needed",
      ],
      countryOfOrigin: "India",
    },
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-28"),
  },
  {
    id: "4",
    name: "Wool Blend Coat",
    description:
      "Sophisticated wool blend coat perfect for colder weather. Features a classic tailored fit.",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    ],
    model3D: "/models/wool-coat.glb",
    category: {
      id: "outerwear",
      name: "Outerwear",
      slug: "outerwear",
      parentId: "clothing",
    },
    tags: ["wool", "winter", "tailored", "sophisticated"],
    colors: [
      { name: "Black", hex: "#000000", rgb: [0, 0, 0], isAvailable: true },
      {
        name: "Camel",
        hex: "#C19A6B",
        rgb: [193, 154, 107],
        isAvailable: true,
      },
      {
        name: "Grey",
        hex: "#6B7280",
        rgb: [107, 114, 128],
        isAvailable: false,
      },
    ],
    sizes: [
      {
        name: "XS",
        measurements: { chest: 34, waist: 28, length: 32 },
        isAvailable: true,
      },
      {
        name: "S",
        measurements: { chest: 36, waist: 30, length: 33 },
        isAvailable: true,
      },
      {
        name: "M",
        measurements: { chest: 38, waist: 32, length: 34 },
        isAvailable: true,
      },
      {
        name: "L",
        measurements: { chest: 40, waist: 34, length: 35 },
        isAvailable: true,
      },
    ],
    brand: "LuxWear",
    rating: 4.8,
    reviewCount: 67,
    isAvailableForTryOn: true,
    metadata: {
      material: "70% Wool, 30% Polyester",
      careInstructions: ["Dry clean only", "Store on hanger"],
      countryOfOrigin: "Italy",
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "5",
    name: "Silk Scarf",
    description:
      "Luxurious silk scarf with intricate patterns. Perfect accessory for any outfit.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596364104097-e5c4b7b7b6a7?w=400&h=600&fit=crop",
    ],
    category: { id: "accessories", name: "Accessories", slug: "accessories" },
    tags: ["silk", "luxury", "pattern", "versatile"],
    colors: [
      {
        name: "Burgundy",
        hex: "#7C2D12",
        rgb: [124, 45, 18],
        isAvailable: true,
      },
      {
        name: "Emerald",
        hex: "#059669",
        rgb: [5, 150, 105],
        isAvailable: true,
      },
      {
        name: "Royal Blue",
        hex: "#1D4ED8",
        rgb: [29, 78, 216],
        isAvailable: true,
      },
    ],
    sizes: [
      {
        name: "Standard",
        measurements: { length: 36, waist: 36 },
        isAvailable: true,
      },
    ],
    brand: "SilkLux",
    rating: 4.6,
    reviewCount: 143,
    isAvailableForTryOn: false,
    metadata: {
      material: "100% Silk",
      careInstructions: ["Dry clean only", "Store flat"],
      countryOfOrigin: "France",
    },
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-22"),
  },
];

// Mock API functions
export const getProducts = async (filters?: {
  category?: string;
  priceRange?: [number, number];
  colors?: string[];
  sizes?: string[];
  search?: string;
}): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  if (filters) {
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.id === filters.category ||
          product.category.parentId === filters.category
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }
  }

  return filteredProducts;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts.find((product) => product.id === id) || null;
};

export const getRecommendations = async (
  userId?: string,
  context?: any
): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Mock recommendation logic - return random products
  const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
};
