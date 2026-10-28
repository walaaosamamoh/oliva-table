import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { useCategories } from "../../hooks/useCategories";
import { useMenuDishes } from "../../hooks/useMenuDishes";
import MenuItemCard from "../../components/menu/MenuItemCard";
import { useCartStore } from "../../store/cartStore";

const chip =
  "min-h-11 shrink-0 cursor-pointer rounded-full border px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive";

export default function Menu() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("ar") ? "ar" : "en";

  const dishesQ = useMenuDishes();
  const catsQ = useCategories();
  const addToCart = useCartStore((s) => s.addToCart);

  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "all";
  const query = (params.get("search") ?? "").trim().toLocaleLowerCase(language);

  const handleCategoryChange = (id: string) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (id === "all") {
          next.delete("category");
        } else {
          next.set("category", id);
        }

        next.delete("search");

        return next;
      },
      { replace: true },
    );
  };

  const filtered = useMemo(
    () =>
      (dishesQ.data ?? []).filter(
        (d) =>
          (category === "all" || d.category === category) &&
          d.name[language].toLocaleLowerCase(language).includes(query),
      ),
    [dishesQ.data, category, query, language],
  );

  const clearFilters = () => setParams({}, { replace: true });

  return (
    <section className="px-6 py-12 md:px-16 lg:px-24">
      <h1 className="mb-8 font-serif text-3xl text-olive md:text-4xl">
        {t("menu.title")}
      </h1>

      {catsQ.data && (
        <div
          role="group"
          aria-label={t("menu.categories")}
          className="-mx-6 mb-8 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          {catsQ.data.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => handleCategoryChange(cat.id)}
                className={`${chip} ${
                  active
                    ? "border-olive bg-olive text-cream"
                    : "border-terracotta text-olive hover:bg-olive hover:text-cream"
                }`}
              >
                {cat.name[language]}
              </button>
            );
          })}
        </div>
      )}

      {dishesQ.isPending ? (
        <div
          aria-busy="true"
          className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6"
        >
          <p role="status" className="sr-only">
            {t("menu.loading")}
          </p>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-sand/30"
            />
          ))}
        </div>
      ) : dishesQ.isError ? (
        <div role="alert" className="py-8">
          <p className="mb-3 text-terracotta-text">{t("menu.error")}</p>
          <button
            type="button"
            onClick={() => dishesQ.refetch()}
            className={`${chip} border-olive text-olive`}
          >
            {t("common.retry")}
          </button>
        </div>
      ) : (
        <>
          <p role="status" className="mb-4 text-sm text-charcoal/70">
            {t("menu.results", { count: filtered.length })}
          </p>

          {filtered.length ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              {filtered.map((dish) => (
                <MenuItemCard
                  key={dish.id}
                  dish={dish}
                  language={language}
                  addToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="py-8">
              <p className="mb-3 text-olive">{t("menu.empty")}</p>
              <button
                type="button"
                onClick={clearFilters}
                className={`${chip} border-olive text-olive`}
              >
                {t("menu.clearFilters")}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
