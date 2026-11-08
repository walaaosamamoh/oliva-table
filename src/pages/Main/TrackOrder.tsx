import { useParams, Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  Clock,
  ChefHat,
  PackageCheck,
  XCircle,
} from "lucide-react";
import { useOrderTracking } from "../../hooks/useOrderTracking";

const statuses = ["pending", "confirmed", "preparing", "completed"] as const;

export default function TrackOrder() {
  const { orderId = "" } = useParams();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.resolvedLanguage?.startsWith("ar");

  const {
    data: order,
    isLoading,
    isError,
    isFetching,
  } = useOrderTracking(orderId);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(isArabic ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 2,
    }).format(price);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p>{t("tracking.loading")}</p>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="mb-4 text-2xl font-semibold">
          {t("tracking.notFound")}
        </h1>
        <Link to="/" className="text-olive underline">
          {t("checkout.backHome")}
        </Link>
      </main>
    );
  }

  const currentStatusIndex = statuses.indexOf(
    order.status as (typeof statuses)[number],
  );

  const isCancelled = order.status === "cancelled";

  const statusIcons = [
    <Clock key="pending" />,
    <CheckCircle2 key="confirmed" />,
    <ChefHat key="preparing" />,
    <PackageCheck key="completed" />,
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm opacity-70">
          {t("tracking.orderReference")}
        </p>
        <h1 className="text-3xl font-semibold text-olive">
          #{order.order_number}
        </h1>
        <p className="mt-3 text-sm opacity-70">
          {new Date(order.created_at).toLocaleString(
            isArabic ? "ar-EG" : "en-EG",
          )}
        </p>
      </div>

      <section className="mb-8 rounded-2xl border border-sand p-6 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">{t("tracking.orderStatus")}</h2>

          <span className="rounded-full bg-olive/10 px-3 py-1 text-sm font-medium text-olive">
            {t(`tracking.status.${order.status}`)}
          </span>
        </div>

        {isFetching && (
          <p className="text-xs text-olive">{t("tracking.updating")}</p>
        )}

        {isCancelled ? (
          <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-600">
            <XCircle size={28} />
            <span className="font-semibold">
              {t("tracking.status.cancelled")}
            </span>
          </div>
        ) : (
          <>
            {/* Desktop progress */}
            <div className="relative hidden sm:block">
              <div className="absolute inset-x-8 top-5 h-1 rounded-full bg-sand/50" />

              <div
                className="absolute top-5 h-1 rounded-full bg-olive transition-all duration-500"
                style={{
                  width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%`,
                  left: isArabic ? "auto" : "2rem",
                  right: isArabic ? "2rem" : "auto",
                }}
              />

              <div className="relative grid grid-cols-4">
                {statuses.map((status, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;

                  return (
                    <div
                      key={status}
                      className="flex flex-col items-center gap-3 text-center"
                    >
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isCompleted
                            ? "border-olive bg-olive text-cream"
                            : "border-sand bg-cream text-charcoal/40"
                        }`}
                      >
                        {statusIcons[index]}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isCurrent ? "text-olive" : "text-charcoal/60"
                          }`}
                        >
                          {t(`tracking.status.${status}`)}
                        </p>

                        {isCurrent && (
                          <p className="mt-1 text-xs text-olive">
                            {t("tracking.currentStatus")}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile progress */}
            <div className="space-y-6 sm:hidden">
              {statuses.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={status} className="relative flex items-start gap-4">
                    {index !== statuses.length - 1 && (
                      <div
                        className={`absolute inset-s-5 top-10 h-10 w-0.5 ${
                          index < currentStatusIndex ? "bg-olive" : "bg-sand/50"
                        }`}
                      />
                    )}

                    <div
                      className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                        isCompleted
                          ? "border-olive bg-olive text-cream"
                          : "border-sand bg-cream text-charcoal/40"
                      }`}
                    >
                      {statusIcons[index]}
                    </div>

                    <div className="pt-1">
                      <p
                        className={`font-medium ${
                          isCurrent ? "text-olive" : "text-charcoal/60"
                        }`}
                      >
                        {t(`tracking.status.${status}`)}
                      </p>

                      {isCurrent && (
                        <p className="mt-1 text-sm text-olive">
                          {t("tracking.currentStatus")}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      <section className="mb-8 rounded-2xl border border-sand p-6">
        <h2 className="mb-5 text-xl font-semibold">
          {t("tracking.orderDetails")}
        </h2>

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between gap-4">
              <div>
                <p className="font-medium">
                  {item.dish_name[isArabic ? "ar" : "en"]}
                </p>
                <p className="text-sm opacity-60">
                  {formatPrice(Number(item.unit_price))} × {item.quantity}
                </p>
              </div>

              <p className="font-medium">
                {formatPrice(Number(item.unit_price) * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-between border-t border-sand pt-4 text-lg font-semibold">
          <span>{t("checkout.total")}</span>
          <span>{formatPrice(Number(order.total))}</span>
        </div>
      </section>

      <section className="rounded-2xl border border-sand p-6">
        <h2 className="mb-3 text-xl font-semibold">
          {t("tracking.fulfillment")}
        </h2>
        <p>{t(`tracking.${order.fulfillment}`)}</p>
      </section>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-block rounded-full bg-olive px-8 py-3 font-medium text-cream transition hover:bg-olive/90"
        >
          {t("checkout.backHome")}
        </Link>
      </div>
    </main>
  );
}
