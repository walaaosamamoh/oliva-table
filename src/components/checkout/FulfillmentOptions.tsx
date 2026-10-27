import { useTranslation } from "react-i18next";
import type { Fulfillment } from "../../pages/Main/Checkout";

interface Props {
  value: Fulfillment;
  onChange: (value: Fulfillment) => void;
}

export default function FulfillmentOptions({ value, onChange }: Props) {
  const { t } = useTranslation();

  const options: Fulfillment[] = ["delivery", "pickup"];

  return (
    <section className="space-y-4 rounded-2xl border border-sand p-6">
      <h2 className="text-xl font-semibold">
        {t("checkout.fulfillment")}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer gap-3 rounded-xl border p-4 ${
              value === option ? "border-olive bg-olive/5" : "border-sand"
            }`}
          >
            <input
              type="radio"
              name="fulfillment"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="mt-1 accent-olive"
            />

            <span>
              <span className="block font-medium">
                {t(`checkout.${option}`)}
              </span>
              <span className="mt-1 block text-sm opacity-70">
                {t(`checkout.${option}Description`)}
              </span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}