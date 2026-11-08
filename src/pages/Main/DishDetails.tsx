import { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Minus, Plus } from "lucide-react";
import { useDish } from "../../hooks/useDish";
import { useMenuDishes } from "../../hooks/useMenuDishes";
import DishCard from "../../components/common/DishCard";
import { useCartStore } from "../../store/cartStore";

export default function DishDetails() {
  const { id } = useParams();
  const { data: dish, isPending, isError } = useDish(id!);
  const { data: menuDishes } = useMenuDishes();
  const addToCart = useCartStore((state)=> state.addToCart)

  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("ar") ? "ar" : "en";
  const isArabic = language === "ar";

  const [quantity, setQuantity] = useState(1);

  const relatedDishes = menuDishes
    ?.filter((item) => item.category_id === dish?.category_id && item.id !== dish?.id)
    .slice(0, 3);

  if (isPending) {
    return (
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="px-6 py-12 md:px-16 lg:px-24"
      >
        <p className="text-olive">
          {isArabic ? "جارٍ تحميل الطبق..." : "Loading dish..."}
        </p>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="px-6 py-12 md:px-16 lg:px-24"
      >
        <p className="text-terracotta">
          {isArabic
            ? "تعذّر تحميل الطبق. يرجى المحاولة مرة أخرى."
            : "Couldn't load the dish. Please try again."}
        </p>
      </section>
    );
  }

  if (!dish) {
    return (
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="px-6 py-12 md:px-16 lg:px-24"
      >
        <p className="text-terracotta">
          {isArabic ? "الطبق غير موجود." : "Dish not found."}
        </p>
      </section>
    );
  }

  return (
    <section dir={isArabic ? "rtl" : "ltr"} className="pb-12">
      {/* Dish Image */}
      <div className="h-64 overflow-hidden sm:h-80 lg:h-120 flex items-center justify-center">
        <img
          src={dish.image}
          alt={dish.name[language]}
          className="h-full object-cover"
        />
      </div>

      {/* Dish Information */}
      <div className="px-6 py-10 md:px-16 md:py-12 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold leading-snug text-olive md:text-4xl">
              {dish.name[language]}
            </h1>

            <span className="shrink-0 text-2xl font-semibold text-terracotta">
              {isArabic ? "ج.م" : "EGP"} {dish.price}
            </span>
          </div>

          <p className="max-w-3xl leading-7 text-charcoal/70">
            {dish.description[language]}
          </p>

          {/* Quantity and Add to Cart */}
          <div className="my-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                disabled={quantity === 1}
                aria-label={isArabic ? "تقليل الكمية" : "Decrease quantity"}
                className="flex h-10 items-center justify-center rounded-s-md border border-sand/50 px-3 transition-colors hover:bg-sand/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span
                aria-live="polite"
                className="flex h-10 min-w-14 items-center justify-center border-y border-sand/50 px-3"
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label={isArabic ? "زيادة الكمية" : "Increase quantity"}
                className="flex h-10 items-center justify-center rounded-e-md border border-sand/50 px-3 transition-colors hover:bg-sand/20"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={()=>addToCart(dish, quantity)}
              className="w-full rounded-xl bg-olive px-6 py-3 font-medium text-cream transition-colors hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive active:scale-[0.98] sm:w-auto"
            >
              {isArabic ? "أضف إلى السلة" : "Add to Cart"}
            </button>
          </div>

          {/* You May Also Like */}
          {relatedDishes && relatedDishes.length > 0 && (
            <div className="mt-16 space-y-6">
              <h2 className="text-xl font-semibold leading-snug text-olive md:text-3xl">
                {isArabic ? "قد يعجبك أيضاً" : "You May Also Like"}
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedDishes.map((relatedDish) => (
                  <DishCard
                    key={relatedDish.id}
                    dish={relatedDish}
                    language={language}
                    addToCart = {addToCart}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
