import { useTranslation } from "react-i18next";

export default function PaymentMethod() {
  const { t } = useTranslation();

  return (
    <section className="space-y-4 rounded-2xl border border-sand p-6">
      <h2 className="text-xl font-semibold">
        {t("checkout.paymentMethod")}
      </h2>

      <div className="flex items-start gap-3 rounded-xl border border-olive p-4">
        <input
          id="cash"
          type="radio"
          name="payment"
          checked
          readOnly
          className="mt-1 accent-olive"
        />

        <label htmlFor="cash">
          <span className="block font-medium">
            {t("checkout.cash")}
          </span>
          <span className="mt-1 block text-sm opacity-70">
            {t("checkout.cashDescription")}
          </span>
        </label>
      </div>
    </section>
  );
}