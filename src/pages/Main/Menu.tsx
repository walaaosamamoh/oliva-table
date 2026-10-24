import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../hooks/useCategories";
import { useMenuDishes } from "../../hooks/useMenuDishes";
import DishCard from "../../components/common/DishCard";

export default function Menu() {
  const { data: menuDishes, isPending, isError } = useMenuDishes();

  const {
    data: categories,
    isPending: isCatPending,
    isError: isCatError,
  } = useCategories();

  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("ar") ? "ar" : "en";
  const isArabic = language === "ar";

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDishes =
    selectedCategory === "all"
      ? menuDishes
      : menuDishes?.filter((dish) => dish.category === selectedCategory);

  if (isPending || isCatPending) {
    return (
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="px-6 py-12 md:px-16 lg:px-24"
      >
        <p className="text-olive">
          {isArabic ? "جارٍ تحميل القائمة..." : "Loading menu..."}
        </p>
      </section>
    );
  }

  if (isError || isCatError) {
    return (
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="px-6 py-12 md:px-16 lg:px-24"
      >
        <p className="text-terracotta">
          {isArabic ? "تعذّر تحميل القائمة." : "Couldn't load the menu."}
        </p>
      </section>
    );
  }

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="px-6 py-12 md:px-16 lg:px-24"
    >
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {categories?.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            aria-pressed={selectedCategory === cat.id}
            className={`cursor-pointer rounded-full border px-4 py-2 transition-colors ${
              selectedCategory === cat.id
                ? "border-olive bg-olive text-cream"
                : "border-terracotta text-olive hover:bg-olive hover:text-cream"
            }`}
          >
            {cat.name[language]}
          </button>
        ))}
      </div>

      {filteredDishes?.length ? (
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              language={language}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-olive">
          {isArabic
            ? "لا توجد أطباق في هذا التصنيف."
            : "No dishes found in this category."}
        </p>
      )}
    </section>
  );
}
