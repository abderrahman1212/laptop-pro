export interface Product {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  stock: 'in_stock' | 'low_stock' | 'out_of_stock';
  rating: number;
  reviewCount: number;
  specs?: Record<string, string>;
  compatibility?: string[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
