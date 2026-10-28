import { Plus } from "lucide-react";
import { Link } from "react-router";
import type { MenuItem } from "../../data/MenuData";

interface MenuItemCardProps {
  dish: MenuItem;
  language: "en" | "ar";
  addToCart: (dish: MenuItem) => void;
}

export default function MenuItemCard({ dish, language, addToCart }: MenuItemCardProps) {
  const isArabic = language === "ar";
  const label = isArabic ? "أضف للسلة" : "Add";

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className="group flex min-h-36 overflow-hidden rounded-2xl border border-sand/40 bg-white/40"
    >
      <div className="relative w-28 shrink-0 overflow-hidden sm:w-40">
        <img
          src={dish.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
        {dish.isFeatured && (
          <span className="absolute inset-s-2 top-2 hidden rounded-full bg-cream/95 px-3 py-1 text-xs font-medium text-olive shadow-sm sm:block">
            {isArabic ? "اختيار الشيف" : "Chef's Pick"}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3 sm:p-5">
        <h3 className="text-base font-semibold leading-snug sm:text-xl">
          <Link to={`/menu/${dish.id}`} className="text-olive hover:text-terracotta-text">
            {dish.name[language]}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm leading-6 text-charcoal/70 sm:line-clamp-3">
          {dish.description[language]}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-semibold text-terracotta-text sm:text-lg">
            {isArabic ? "ج.م" : "EGP"} {dish.price}
          </span>
          <button
            type="button"
            onClick={() => addToCart(dish)}
            aria-label={
              isArabic ? `أضف ${dish.name.ar} إلى السلة` : `Add ${dish.name.en} to cart`
            }
            className="inline-flex size-11 shrink-0 items-center justify-center gap-1 rounded-full bg-olive text-cream transition-colors hover:bg-terracotta-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive active:scale-95 sm:w-auto sm:rounded-xl sm:px-4"
          >
            <Plus size={20} className="sm:hidden" />
            <span className="hidden text-sm font-medium sm:inline">{label}</span>
          </button>
        </div>
      </div>
    </article>
  );
}