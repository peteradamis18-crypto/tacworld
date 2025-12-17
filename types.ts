
export enum Category {
  IWB = 'IWB Concealed',
  DUTY = 'Duty Holsters',
  HYBRID = 'OWB Hybrid',
  SHOULDER = 'Shoulder Systems',
  LEATHER = 'Premium Leather'
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  options: ProductOption[];
  features: string[];
  rating: number;
  reviews: number;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  cartId: string;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
