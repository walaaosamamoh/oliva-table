import { Clock3, MapPin, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function VisitInfo() {
  const { t } = useTranslation();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");

  return (
    <section className="px-6 py-12 md:px-16 lg:px-24">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Delivery & Pickup */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-sand/60 bg-white/60 p-6 sm:flex-row sm:items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-olive">
              <Truck size={20} />
              <h2 className="font-serif text-xl font-semibold">
                {t("visitInfo.title")}
              </h2>
            </div>

            <p className="text-sm leading-6 text-charcoal/70">
              {t("visitInfo.description")}
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setOrderType("delivery")}
                aria-pressed={orderType === "delivery"}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  orderType === "delivery"
                    ? "border-olive bg-olive text-cream"
                    : "border-sand text-olive hover:bg-cream"
                }`}
              >
                {t("visitInfo.delivery")}
              </button>

              <button
                type="button"
                onClick={() => setOrderType("pickup")}
                aria-pressed={orderType === "pickup"}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  orderType === "pickup"
                    ? "border-olive bg-olive text-cream"
                    : "border-sand text-olive hover:bg-cream"
                }`}
              >
                {t("visitInfo.pickup")}
              </button>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-olive transition-colors hover:text-terracotta"
            >
              {orderType === "delivery"
                ? t("visitInfo.exploreDelivery")
                : t("visitInfo.explorePickup")}
              <ShoppingBag size={16} />
            </Link>
          </div>

          <div className="hidden shrink-0 rounded-full bg-cream p-5 text-olive sm:block">
            {orderType === "delivery" ? (
              <Truck size={30} strokeWidth={1.5} />
            ) : (
              <ShoppingBag size={30} strokeWidth={1.5} />
            )}
          </div>
        </div>

        {/* Opening Hours */}
        <div className="rounded-2xl border border-sand/60 bg-white/60 p-6">
          <div className="mb-5 flex items-center gap-2 text-olive">
            <Clock3 size={20} />
            <h2 className="font-serif text-xl font-semibold">
              {t("visitInfo.openingHours")}
            </h2>
          </div>

          <div className="flex items-start justify-between gap-4 border-b border-sand/50 pb-4">
            <div>
              <p className="font-medium text-charcoal">
                {t("visitInfo.everyDay")}
              </p>
              <p className="mt-1 text-sm text-charcoal/60">
                {t("visitInfo.visitOrOrder")}
              </p>
            </div>

            <p className="shrink-0 text-sm font-medium text-olive">
              {t("visitInfo.hours")}
            </p>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <MapPin size={19} className="mt-0.5 shrink-0 text-terracotta" />
            <div>
              <p className="font-medium text-charcoal">
                {t("visitInfo.comeVisit")}
              </p>
              <p className="mt-1 text-sm leading-6 text-charcoal/70">
                {t("visitInfo.address")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
