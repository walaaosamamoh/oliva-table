import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Dish } from "../types/database";

export type CartItem = Dish & {
  qty: number;
};

interface CartStore {
  cart: CartItem[];
  addToCart: (dish: Dish, qty?: number) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, qty: number) => void;
  clearCart: () => void;
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

      removeFromCart: (dishId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== dishId),
        }));
      },

      updateQuantity: (dishId, qty) => {
        if (qty < 1) {
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== dishId),
          }));
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === dishId ? { ...item, qty } : item,
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: "oliva-table-cart" },
  ),
);
