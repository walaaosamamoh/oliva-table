import { ArrowUpRight } from "lucide-react";
import type { MenuItem } from "../../data/MenuData";
import { Link } from "react-router";

interface DishCardProps {
  dish: MenuItem;
}

export default function DishCard({ dish }: DishCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white">
      {/* Dish Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name.en}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {dish.isFeatured && (
          <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 text-xs font-medium text-olive">
            Chef's Pick
          </span>
        )}
      </div>

      {/* Dish Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-olive">{dish.name.en}</h3>

          <span className="shrink-0 font-semibold text-terracotta">
            EGP {dish.price}
          </span>
        </div>

        <p className="text-sm leading-6 text-charcoal/70">
          {dish.description.en}
        </p>

        <Link
          to={`/dish-details/${dish.id}`}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-olive transition-colors hover:text-terracotta"
        >
          Explore Dish
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
