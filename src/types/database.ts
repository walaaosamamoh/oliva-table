export interface Category {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  is_active: boolean;
  created_at: string;
}

export interface Dish {
  id: string;
  category_id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  image: string;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
}

export interface OrderTrackingItem {
  dish_name: {
    en: string;
    ar: string;
  };
  unit_price: number;
  quantity: number;
}

export interface OrderTracking {
  id: string;
  order_number: string;
  status: "pending" | "confirmed" | "preparing" | "completed" | "cancelled";
  fulfillment: "delivery" | "pickup";
  total: number;
  created_at: string;
  items: OrderTrackingItem[];
}