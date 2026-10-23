import { Link } from "react-router";
import { useFeaturedDishes } from "../../hooks/useFeaturedDishes";
import DishCard from "../common/DishCard";

export default function FeaturedDishes() {
  const { data, isPending, isError } = useFeaturedDishes();

  if (isPending) {
    return (
      <section className="px-6 py-12 md:px-16 lg:px-24">
        <p className="text-olive">Loading featured dishes...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-6 py-12 md:px-16 lg:px-24">
        <p className="text-terracotta">
          Unable to load featured dishes. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 md:px-16 lg:px-24">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-semibold text-olive md:text-4xl">
            Featured Dishes
          </h2>

          <p className="max-w-lg font-serif text-charcoal/80 md:text-2xl">
            Fresh favorites, made daily
          </p>
        </div>

        <Link
          to="/menu"
          className="shrink-0 font-semibold text-olive transition-colors hover:text-terracotta"
        >
          View All
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="text-charcoal/70">
          No featured dishes available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </section>
  );
}
