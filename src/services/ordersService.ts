import { supabase } from "../lib/supabase";
import type { CartItem } from "../store/cartStore";
import type { CheckoutForm } from "../pages/Main/Checkout";

export async function createOrder(
  form: CheckoutForm,
  cart: CartItem[],
): Promise<string> {
  const { data, error } = await supabase.rpc("create_order", {
    p_customer_name: form.fullName,
    p_phone: form.phone,
    p_email: form.email || null,
    p_fulfillment: form.fulfillment,
    p_address: form.fulfillment === "delivery" ? form.address : null,
    p_city: form.fulfillment === "delivery" ? form.city : null,
    p_notes: form.notes || null,
    p_items: cart.map((item) => ({
      dish_id: item.id,
      quantity: item.qty,
    })),
  });

  if (error) throw error;

  return data;
}
