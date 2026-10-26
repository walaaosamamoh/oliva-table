import { create } from "zustand";
import type { MenuItem } from "../data/MenuData";

export type CartItem = MenuItem & {
  qty: number;
};

interface CartStore {
  cart: CartItem[];
  addToCart: (dish: MenuItem, qty?: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (dish, qty = 1) => {
    if (!Number.isInteger(qty) || qty < 1) return;

    set((state) => {
      const foundDish = state.cart.some((item) => item.id === dish.id);

      if (foundDish) {
        return {
          cart: state.cart.map((item) =>
            item.id === dish.id ? { ...item, qty: item.qty + qty } : item,
          ),
        };
      }

      return {
        cart: [...state.cart, { ...dish, qty }],
      };
    });
  },
}));
