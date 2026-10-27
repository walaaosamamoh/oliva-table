import { useTranslation } from "react-i18next";
import type { CheckoutForm } from "../../pages/Main/Checkout";

interface Props {
  form: CheckoutForm;
  updateField: <K extends keyof CheckoutForm>(
    field: K,
    value: CheckoutForm[K],
  ) => void;
}

export default function ContactDetails({ form, updateField }: Props) {
  const { t } = useTranslation();

  const fields = [
    {
      name: "fullName" as const,
      label: t("checkout.fullName"),
      placeholder: t("checkout.namePlaceholder"),
      type: "text",
      required: true,
    },
    {
      name: "phone" as const,
      label: t("checkout.phone"),
      placeholder: t("checkout.phonePlaceholder"),
      type: "tel",
      required: true,
    },
    {
      name: "email" as const,
      label: t("checkout.email"),
      placeholder: t("checkout.emailPlaceholder"),
      type: "email",
      required: false,
    },
  ];

  return (
    <section className="space-y-5 rounded-2xl border border-sand p-6">
      <h2 className="text-xl font-semibold">
        {t("checkout.contactDetails")}
      </h2>

      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label htmlFor={field.name} className="block text-sm font-medium">
            {field.label}
          </label>

          <input
            id={field.name}
            type={field.type}
            value={form[field.name]}
            onChange={(e) => updateField(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full rounded-xl border border-sand bg-transparent px-4 py-3 outline-none focus:border-olive"
          />
        </div>
      ))}
    </section>
  );
}