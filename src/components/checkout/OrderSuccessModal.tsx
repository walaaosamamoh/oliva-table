import { CheckCircle2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

interface Props {
  onClose: () => void;
  orderNumber: string;
  orderId: string;
}

export default function OrderSuccessModal({
  onClose,
  orderNumber,
  orderId,
}: Props) {
  const { t } = useTranslation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title"
        className="relative w-full max-w-md rounded-3xl bg-cream p-8 text-center text-charcoal shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("checkout.close")}
          className="absolute inset-e-4 top-4 rounded-full p-2 transition hover:bg-olive/10"
        >
          <X size={20} />
        </button>

        <CheckCircle2
          size={56}
          className="mx-auto mb-5 rounded-full bg-olive p-2 text-cream"
          strokeWidth={1.5}
        />

        <h2 id="order-success-title" className="mb-3 text-2xl font-semibold">
          {t("checkout.orderPlaced")}
        </h2>

        <p className="mb-3 text-sm leading-6 opacity-75">
          {t("checkout.orderThanks")}
        </p>

        <p className="mb-7 text-xl font-semibold text-olive">#{orderNumber}</p>

        <Link
          to={`/track-order/${orderId}`}
          onClick={onClose}
          className="mb-3 block rounded-full bg-olive px-6 py-3 font-medium text-cream transition hover:bg-olive/90"
        >
          {t("checkout.trackOrder")}
        </Link>

        <Link
          to="/"
          onClick={onClose}
          className="block rounded-full border border-olive px-6 py-3 font-medium text-olive transition hover:bg-olive/10"
        >
          {t("checkout.backHome")}
        </Link>
      </div>
    </div>
  );
}
