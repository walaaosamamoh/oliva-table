import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useCartStore } from "../../store/cartStore";
import ContactDetails from "../../components/checkout/ContactDetails";
import FulfillmentOptions from "../../components/checkout/FulfillmentOptions";
import DeliveryFields from "../../components/checkout/DeliveryFields";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import OrderSummary from "../../components/checkout/OrderSummary";
import OrderSuccessModal from "../../components/checkout/OrderSuccessModal";
import { useCreateOrder } from "../../hooks/useCreateOrder";

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
  const createOrderMutation = useCreateOrder();
  const [submitError, setSubmitError] = useState("");
  const [phoneError, setPhoneError] = useState("");

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
    if (field === "phone") {
      setPhoneError("");
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (createOrderMutation.isPending || cart.length === 0) return;

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10) {
      setPhoneError(t("checkout.invalidPhone"));
      document.getElementById("phone")?.focus();
      return;
    }

    try {
      setSubmitError("");
      setPhoneError("");

      const result = await createOrderMutation.mutateAsync({
        form,
        cart,
      });

      setOrderNumber(result.order_number);
      setShowSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Order submission failed:", error);
      setSubmitError(t("checkout.submitError"));
    }
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

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <ContactDetails
              form={form}
              updateField={updateField}
              phoneError={phoneError}
            />

            <FulfillmentOptions
              value={form.fulfillment}
              onChange={(value) => updateField("fulfillment", value)}
            />

            {form.fulfillment === "delivery" && (
              <DeliveryFields form={form} updateField={updateField} />
            )}

            <PaymentMethod />
          </div>

          <div>
            {submitError && (
              <p className="mb-3 text-sm text-red-600" role="alert">
                {submitError}
              </p>
            )}

            {createOrderMutation.isPending && (
              <p className="mb-3 text-sm text-olive" role="status">
                {t("checkout.submitting")}
              </p>
            )}

            <OrderSummary
              cart={cart}
              subtotal={subtotal}
              fulfillment={form.fulfillment}
              notes={form.notes}
              updateNotes={(value) => updateField("notes", value)}
              isSubmitting={createOrderMutation.isPending}
            />
          </div>
        </div>

        <Link to="/cart" className="mt-6 inline-block underline">
          {t("checkout.backToCart")}
        </Link>
      </form>

      {showSuccess && (
        <OrderSuccessModal
          orderNumber={orderNumber}
          phone={form.phone}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </main>
  );
}
