import { useTranslation } from "react-i18next";
import type { CheckoutForm } from "../../pages/Main/Checkout";

interface Props {
  form: CheckoutForm;
  updateField: <K extends keyof CheckoutForm>(
    field: K,
    value: CheckoutForm[K],
  ) => void;
}

export default function DeliveryFields({ form, updateField }: Props) {
  const { t } = useTranslation();

  return (
    <section className="space-y-5 rounded-2xl border border-sand p-6">
      <h2 className="text-xl font-semibold">
        {t("checkout.deliveryAddress")}
      </h2>

      <div className="space-y-2">
        <label htmlFor="address" className="block text-sm font-medium">
          {t("checkout.deliveryAddress")}
        </label>
        <input
          id="address"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          placeholder={t("checkout.addressPlaceholder")}
          required
          className="w-full rounded-xl border border-sand bg-transparent px-4 py-3 outline-none focus:border-olive"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="city" className="block text-sm font-medium">
          {t("checkout.city")}
        </label>
        <input
          id="city"
          value={form.city}
          onChange={(e) => updateField("city", e.target.value)}
          placeholder={t("checkout.cityPlaceholder")}
          required
          className="w-full rounded-xl border border-sand bg-transparent px-4 py-3 outline-none focus:border-olive"
        />
      </div>
    </section>
  );
}