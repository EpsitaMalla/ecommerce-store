export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Wireless Headphones",
    price: 199,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Audio",
    rating: 4.8,
    reviews: 328,
    description: "Experience premium sound with our sleek wireless headphones. Featuring active noise cancellation and 30-hour battery life.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Premium aluminum construction",
      "Foldable design"
    ],
    colors: ["Black", "Silver", "Navy"],
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "2",
    name: "Smart Watch Elite",
    price: 349,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Wearables",
    rating: 4.6,
    reviews: 512,
    description: "Stay connected with our advanced smartwatch. Track fitness, receive notifications, and monitor your health.",
    features: [
      "5-day battery",
      "Heart rate monitor",
      "GPS tracking",
      "Water resistant",
      "Always-on display"
    ],
    colors: ["Black", "Gold", "Silver"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    id: "3",
    name: "Ultra-slim Laptop Stand",
    price: 89,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    category: "Accessories",
    rating: 4.7,
    reviews: 189,
    description: "Ergonomic aluminum laptop stand for enhanced productivity and comfort.",
    features: [
      "Adjustable height",
      "Aluminum construction",
      "Supports up to 17 inches",
      "Cable management",
      "Portable design"
    ],
    colors: ["Silver", "Space Gray"],
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "4",
    name: "Premium Camera Backpack",
    price: 159,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "Bags",
    rating: 4.9,
    reviews: 276,
    description: "Professional-grade backpack designed for photographers and content creators.",
    features: [
      "Weather-resistant",
      "Customizable compartments",
      "USB charging port",
      "Ergonomic padding",
      "Lifetime warranty"
    ],
    colors: ["Black", "Charcoal"],
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "5",
    name: "Mechanical Keyboard Pro",
    price: 179,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1587829191301-4f34d967fbb0?w=500&h=500&fit=crop",
    category: "Peripherals",
    rating: 4.8,
    reviews: 445,
    description: "High-performance mechanical keyboard with RGB backlighting and custom switches.",
    features: [
      "Mechanical switches",
      "RGB backlighting",
      "Programmable keys",
      "Aluminum frame",
      "Type-C connection"
    ],
    colors: ["Black", "White"],
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "6",
    name: "Premium Leather Mouse Pad",
    price: 49,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    category: "Accessories",
    rating: 4.7,
    reviews: 156,
    description: "Luxury leather mouse pad with non-slip base. Perfect for any workspace.",
    features: [
      "Genuine leather",
      "Non-slip base",
      "Stitched edges",
      "Easy to clean",
      "Large surface"
    ],
    colors: ["Black", "Brown", "Navy"],
    sizes: ["Standard", "Large"],
    inStock: true
  },
  {
    id: "7",
    name: "USB-C Hub Pro",
    price: 129,
    originalPrice: 179,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    category: "Tech",
    rating: 4.6,
    reviews: 234,
    description: "All-in-one USB-C hub with multiple ports for ultimate connectivity.",
    features: [
      "7-in-1 design",
      "4K video output",
      "100W power delivery",
      "Aluminum housing",
      "Fast charging"
    ],
    colors: ["Silver", "Gray"],
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "8",
    name: "Portable Phone Charger",
    price: 79,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    category: "Power",
    rating: 4.8,
    reviews: 678,
    description: "Fast-charging power bank with 20000mAh capacity and sleek design.",
    features: [
      "20000mAh capacity",
      "Fast charging",
      "Compact design",
      "LED display",
      "Multiple ports"
    ],
    colors: ["Black", "White", "Blue"],
    sizes: ["One Size"],
    inStock: true
  }
];
