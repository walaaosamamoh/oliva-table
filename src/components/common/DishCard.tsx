import { ArrowUpRight, Plus } from "lucide-react";
import type { MenuItem } from "../../data/MenuData";
import { Link } from "react-router";

interface DishCardProps {
  dish: MenuItem;
  language: "en" | "ar";
  addToCart: (dish: MenuItem) => void;
}

export default function DishCard({
  dish,
  language,
  addToCart,
}: DishCardProps) {
  const isArabic = language === "ar";

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand/40 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-olive/10"
    >
      {/* Dish Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name[language]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {dish.isFeatured && (
          <span className="absolute inset-s-4 top-4 rounded-full bg-cream/95 px-3 py-1.5 text-xs font-medium text-olive shadow-sm">
            {isArabic ? "اختيار الشيف" : "Chef's Pick"}
          </span>
        )}
      </div>

      {/* Dish Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-olive transition-colors sm:text-xl">
            {dish.name[language]}
          </h3>

          <span className="shrink-0 pt-1 text-sm font-semibold text-terracotta sm:text-base">
            {isArabic ? "ج.م" : "EGP"} {dish.price}
          </span>
        </div>

        <p className="text-sm leading-6 text-charcoal/70">
          {dish.description[language]}
        </p>

        {/* Bottom Actions */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Link
            to={`/menu/${dish.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-olive transition-colors hover:text-terracotta"
          >
            {isArabic ? "اكتشف الطبق" : "Explore Dish"}
            <ArrowUpRight size={16} className={isArabic ? "-rotate-90" : ""} />
          </Link>

          <button
            type="button"
            onClick={() => addToCart(dish)}
            aria-label={
              isArabic
                ? `أضف ${dish.name.ar} إلى السلة`
                : `Add ${dish.name.en} to cart`
            }
            title={isArabic ? "أضف إلى السلة" : "Add to cart"}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-olive text-cream transition-all duration-200 hover:scale-105 hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive active:scale-95"
          >
            <Plus size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </article>
  );
}
