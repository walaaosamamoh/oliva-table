import { Link, useNavigate } from "react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCartStore } from "../../store/cartStore";

export default function Cart() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.resolvedLanguage?.startsWith("ar");
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(isArabic ? "ar-EG" : "en-EG", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 2,
    }).format(price);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-[60vh] px-6 py-10 md:px-16 md:py-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-semibold leading-snug text-olive md:text-4xl">
          {t("cart.title")}
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-charcoal/70">
          {t("cart.subtitle")}
        </p>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <ShoppingBag
              size={56}
              strokeWidth={1.3}
              className="mb-5 text-olive/50"
            />

            <h2 className="text-xl font-semibold text-olive md:text-2xl">
              {t("cart.empty")}
            </h2>

            <p className="mt-3 max-w-md leading-7 text-charcoal/70">
              {t("cart.emptyDescription")}
            </p>

            <Link
              to="/menu"
              className="mt-6 inline-flex rounded-xl bg-olive px-6 py-3 font-medium text-cream transition-colors hover:bg-terracotta"
            >
              {t("cart.exploreMenu")}
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-5">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-sand/50 bg-white/40 p-3 sm:gap-5 sm:p-5"
                >
                  <Link
                    to={`/menu/${item.id}`}
                    className="h-28 w-28 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-36"
                  >
                    <img
                      src={item.image}
                      alt={item.name[isArabic ? "ar" : "en"]}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/menu/${item.id}`}
                          className="font-semibold text-olive transition-colors hover:text-terracotta sm:text-lg"
                        >
                          {item.name[isArabic ? "ar" : "en"]}
                        </Link>

                        <p className="mt-2 text-sm text-charcoal/70">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={t("cart.removeItem", {
                          name: item.name[isArabic ? "ar" : "en"],
                        })}
                        title={t("cart.removeItemTitle")}
                        className="shrink-0 rounded-lg p-2 text-charcoal/60 transition-colors hover:bg-terracotta/10 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center rounded-lg border border-sand/60">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          aria-label={t("cart.decreaseQuantity")}
                          className="p-2 text-olive transition-colors hover:bg-sand/20"
                        >
                          <Minus size={16} />
                        </button>

                        <span
                          aria-live="polite"
                          className="min-w-8 text-center text-sm font-medium text-olive"
                        >
                          {item.qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          aria-label={t("cart.increaseQuantity")}
                          className="p-2 text-olive transition-colors hover:bg-sand/20"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <span className="font-semibold text-terracotta">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}

              <Link
                to="/menu"
                className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-olive transition-colors hover:text-terracotta"
              >
                <span aria-hidden="true">{isArabic ? "→" : "←"}</span>
                {t("cart.continueShopping")}
              </Link>
            </div>

            <aside className="rounded-2xl border border-sand/50 bg-white/40 p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-semibold text-olive">
                {t("cart.orderSummary")}
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-3 text-sm text-charcoal/70">
                  <span>{t("cart.items", { count: totalItems })}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm text-charcoal/70">
                  <span>{t("cart.delivery")}</span>
                  <span>{t("cart.deliveryLater")}</span>
                </div>

                <div className="border-t border-sand/60 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-olive">
                      {t("cart.subtotal")}
                    </span>

                    <span className="text-lg font-semibold text-terracotta">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-charcoal/60">
                    {t("cart.deliveryNote")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full cursor-pointer rounded-xl bg-olive px-6 py-3 font-medium text-cream transition-colors hover:bg-olive/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
              >
                {t("cart.checkout")}
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
