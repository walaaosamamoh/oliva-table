import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { findOrderForTracking } from "../../services/ordersService";

export default function OrderLookup() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    try {
      setError("");
      setIsSubmitting(true);

      const orderId = await findOrderForTracking(orderNumber, phone);

      if (!orderId) {
        setError(t("tracking.lookupNotFound"));
        return;
      }

      navigate(`/track-order/${orderId}`);
    } catch (err) {
      console.error("Order lookup failed:", err);
      setError(t("tracking.lookupError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-3xl font-semibold text-olive">
          {t("tracking.lookupTitle")}
        </h1>

        <p className="text-sm leading-6 opacity-70">
          {t("tracking.lookupDescription")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-sand p-6 sm:p-8"
      >
        <div>
          <label
            htmlFor="orderNumber"
            className="mb-2 block text-sm font-medium"
          >
            {t("tracking.orderNumber")}
          </label>

          <input
            id="orderNumber"
            type="text"
            value={orderNumber}
            onChange={(event) => setOrderNumber(event.target.value)}
            placeholder="OT-0001"
            required
            className="w-full rounded-xl border border-sand bg-transparent px-4 py-3 outline-none focus:border-olive"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            {t("tracking.phoneNumber")}
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="01XXXXXXXXX"
            required
            className="w-full rounded-xl border border-sand bg-transparent px-4 py-3 outline-none focus:border-olive"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-olive px-6 py-3 font-medium text-cream transition hover:bg-olive/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? t("tracking.lookingUp")
            : t("tracking.trackOrder")}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/" className="text-sm text-olive underline">
          {t("checkout.backHome")}
        </Link>
      </div>
    </main>
  );
}