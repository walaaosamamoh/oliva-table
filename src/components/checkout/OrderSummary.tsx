import { useTranslation } from "react-i18next";
import type { CartItem } from "../../store/cartStore";

interface Props {
  cart: CartItem[];
  subtotal: number;
  notes: string;
  updateNotes: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function OrderSummary({
  cart,
  subtotal,
  notes,
  updateNotes,
  onSubmit,
  isSubmitting,
}: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.resolvedLanguage?.startsWith("ar");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(isArabic ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 2,
    }).format(price);

  return (
    <aside className="h-fit space-y-5 rounded-2xl border border-sand p-6">
      <h2 className="text-xl font-semibold">{t("checkout.orderSummary")}</h2>

      <div className="max-h-72 space-y-4 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name[isArabic ? "ar" : "en"]}
              className="h-16 w-16 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="font-medium">{item.name[isArabic ? "ar" : "en"]}</p>
              <p className="text-sm opacity-70">
                {formatPrice(item.price)} × {item.qty}
              </p>
            </div>

            <p className="text-sm font-medium">
              {formatPrice(item.price * item.qty)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium">
          {t("checkout.notes")}
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => updateNotes(e.target.value)}
          placeholder={t("checkout.notesPlaceholder")}
          rows={3}
          className="w-full resize-y rounded-xl border border-sand bg-transparent px-4 py-3 outline-none focus:border-olive"
        />
      </div>

      <div className="space-y-3 border-t border-sand pt-4">
        <div className="flex justify-between gap-4">
          <span>
            {t("checkout.items", {
              count: cart.reduce((sum, item) => sum + item.qty, 0),
            })}
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between gap-4 text-sm">
          <span>{t("checkout.deliveryFee")}</span>
          <span>{t("checkout.calculatedLater")}</span>
        </div>

        <div className="flex justify-between gap-4 border-t border-sand pt-3 text-lg font-semibold">
          <span>{t("checkout.total")}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full rounded-full bg-olive px-6 py-3 font-medium text-cream transition hover:bg-olive/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? t("checkout.submitting") : t("checkout.placeOrder")}
      </button>
    </aside>
  );
}
