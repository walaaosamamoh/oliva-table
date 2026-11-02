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
  category_id: string | null;
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