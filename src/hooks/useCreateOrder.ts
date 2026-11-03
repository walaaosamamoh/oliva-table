import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/ordersService";
import type { CartItem } from "../store/cartStore";
import type { CheckoutForm } from "../pages/Main/Checkout";

export function useCreateOrder() {
    return useMutation({
        mutationFn: ({form, cart}: {form: CheckoutForm, cart: CartItem[]})=> createOrder(form, cart)
    })
}