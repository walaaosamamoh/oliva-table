
export interface MenuCategory {
  id: string;
  name: {
    en: string;
    ar: string;
  };
}

export const categoriesData: MenuCategory[] = [
  {
    id: "all",
    name: {
      en: "All Dishes",
      ar: "جميع الأطباق",
    },
  },
  {
    id: "starters",
    name: {
      en: "Starters",
      ar: "المقبلات",
    },
  },
  {
    id: "main-courses",
    name: {
      en: "Main Courses",
      ar: "الأطباق الرئيسية",
    },
  },
  {
    id: "desserts",
    name: {
      en: "Desserts",
      ar: "الحلويات",
    },
  },
  {
    id: "drinks",
    name: {
      en: "Drinks",
      ar: "المشروبات",
    },
  },
];
