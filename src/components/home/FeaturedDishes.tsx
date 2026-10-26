
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useFeaturedDishes } from "../../hooks/useFeaturedDishes";
import DishCard from "../common/DishCard";
import { useCartStore } from "../../store/cartStore";

export default function FeaturedDishes() {
  const { t, i18n } = useTranslation();
  const { data, isPending, isError } = useFeaturedDishes();
  const addToCart = useCartStore((state)=> state.addToCart)

  const language = i18n.resolvedLanguage?.startsWith("ar") ? "ar" : "en";
  const isArabic = language === "ar";

  if (isPending) {
    return (
      <section dir={isArabic ? "rtl" : "ltr"} className="px-6 py-12 md:px-16 lg:px-24">
        <p className="text-olive">{t("featured.loading")}</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section dir={isArabic ? "rtl" : "ltr"} className="px-6 py-12 md:px-16 lg:px-24">
        <p className="text-terracotta">
          {t("featured.error")}
        </p>
      </section>
    );
  }

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="px-6 py-12 md:px-16 lg:px-24"
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-semibold text-olive md:text-4xl">
            {t("featured.title")}
          </h2>

          <p className="max-w-lg font-serif text-charcoal/80 md:text-2xl">
            {t("featured.subtitle")}
          </p>
        </div>

        <Link
          to="/menu"
          className="shrink-0 font-semibold text-olive transition-colors hover:text-terracotta"
        >
          {t("featured.viewAll")}
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="text-charcoal/70">
          {t("featured.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((dish) => (
            <DishCard key={dish.id} dish={dish} language={language} addToCart={addToCart} />
          ))}
        </div>
      )}
    </section>
  );
}
