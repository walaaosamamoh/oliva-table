import { create } from "zustand";
import type { MenuItem } from "../data/MenuData";
import { persist } from "zustand/middleware";

export type CartItem = MenuItem & {
  qty: number;
};

interface CartStore {
  cart: CartItem[];
  addToCart: (dish: MenuItem, qty?: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (dish, qty = 1) => {
        if (!Number.isInteger(qty) || qty < 1) return;

        set((state) => {
          const foundDish = state.cart.some((item) => item.id === dish.id);

          const updatedCart = foundDish
            ? state.cart.map((item) =>
                item.id === dish.id ? { ...item, qty: item.qty + qty } : item,
              )
            : [...state.cart, { ...dish, qty }];

          console.log("Updated cart:", updatedCart);

          return { cart: updatedCart };
        });
      },
    }),
    { name: "oliva-table-cart" },
  ),
);
