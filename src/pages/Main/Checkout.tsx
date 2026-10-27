import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useCartStore } from "../../store/cartStore";
import ContactDetails from "../../components/checkout/ContactDetails";
import FulfillmentOptions from "../../components/checkout/FulfillmentOptions";
import DeliveryFields from "../../components/checkout/DeliveryFields";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import OrderSummary from "../../components/checkout/OrderSummary";
import OrderSuccessModal from "../../components/checkout/OrderSuccessModal";

export type Fulfillment = "delivery" | "pickup";

export interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  fulfillment: Fulfillment;
  address: string;
  city: string;
  notes: string;
}

export default function Checkout() {
  const { t } = useTranslation();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    phone: "",
    email: "",
    fulfillment: "delivery",
    address: "",
    city: "",
    notes: "",
  });

  const [orderNumber, setOrderNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = <K extends keyof CheckoutForm>(
    field: K,
    value: CheckoutForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const handleSubmit = () => {
    if (!form.fullName.trim() || !form.phone.trim()) return;
    if (
      form.fulfillment === "delivery" &&
      (!form.address.trim() || !form.city.trim())
    )
      return;
    if (form.phone.replace(/\D/g, "").length < 10) return;

    const newOrderNumber = `OT${Date.now().toString().slice(-6)}`;

    console.log({ orderNumber: newOrderNumber, form, cart, subtotal });

    setOrderNumber(newOrderNumber);
    setShowSuccess(true);
    clearCart();
  };

  if (cart.length === 0 && !showSuccess) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="mb-4 text-2xl font-semibold">
          {t("checkout.emptyCart")}
        </h1>
        <p className="mb-6">{t("checkout.emptyCartDescription")}</p>
        <Link to="/menu" className="rounded-full bg-olive px-6 py-3 text-cream">
          {t("checkout.exploreMenu")}
        </Link>
      </section>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-semibold">{t("checkout.title")}</h1>
      <p className="mb-8">{t("checkout.subtitle")}</p>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <ContactDetails form={form} updateField={updateField} />

          <FulfillmentOptions
            value={form.fulfillment}
            onChange={(value) => updateField("fulfillment", value)}
          />

          {form.fulfillment === "delivery" && (
            <DeliveryFields form={form} updateField={updateField} />
          )}

          <PaymentMethod />
        </div>

        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          notes={form.notes}
          updateNotes={(value) => updateField("notes", value)}
          onSubmit={handleSubmit}
        />
      </div>

      <Link to="/cart" className="mt-6 inline-block underline">
        {t("checkout.backToCart")}
      </Link>

      {showSuccess && (
        <OrderSuccessModal
          orderNumber={orderNumber}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </main>
  );
}
