import { Link } from "react-router";
import type { MenuItem } from "../../data/MenuData";

interface MenuItemCardProps {
  dish: MenuItem;
  language: "en" | "ar";
  addToCart: (dish: MenuItem) => void;
}

export default function MenuItemCard({
  dish,
  language,
  addToCart,
}: MenuItemCardProps) {
  const isArabic = language === "ar";

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className="group flex min-h-36 overflow-hidden rounded-2xl border border-sand/40 bg-white/40"
    >
      {/* Dish Image */}
      <div className="relative w-28 shrink-0 self-stretch overflow-hidden sm:w-40">
        <img
          src={dish.image}
          alt={dish.name[language]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {dish.isFeatured && (
          <span className="absolute inset-s-2 top-2 rounded-full bg-cream/95 px-2 py-1 text-[10px] font-medium text-olive shadow-sm sm:inset-s-3 sm:top-3 sm:px-3 sm:text-xs">
            {isArabic ? "اختيار الشيف" : "Chef's Pick"}
          </span>
        )}
      </div>

      {/* Dish Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-3 sm:p-5">
        <h3 className="text-base font-semibold leading-snug sm:text-xl">
          <Link
            to={`/menu/${dish.id}`}
            className="text-olive transition-colors hover:text-terracotta"
          >
            {dish.name[language]}
          </Link>
        </h3>

        <p className="text-sm leading-6 text-charcoal/70">
          {dish.description[language]}
        </p>

        <span className="font-semibold text-terracotta sm:text-lg">
          {isArabic ? "ج.م" : "EGP"} {dish.price}
        </span>
      </div>

      {/* Add to Cart */}
      <div className="flex shrink-0 items-end p-3 sm:items-center sm:p-4">
        <button
          type="button"
          onClick={() => addToCart(dish)}
          aria-label={
            isArabic
              ? `أضف ${dish.name.ar} إلى السلة`
              : `Add ${dish.name.en} to cart`
          }
          title={isArabic ? "أضف إلى السلة" : "Add to cart"}
          className="shrink-0 whitespace-nowrap rounded-xl bg-olive px-3 py-2 text-sm font-medium text-cream transition-colors hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive active:scale-95 sm:px-4"
        >
          {isArabic ? "أضف للسلة" : "Add"}
        </button>
      </div>
    </article>
  );
}
