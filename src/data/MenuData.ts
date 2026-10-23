import salad from '../assets/menuDishes/salad.jpg'
import hummus from '../assets/menuDishes/classic-hummus.jpg'
import bruschetta from '../assets/menuDishes/bruschetta.jpg'
import pasta from '../assets/menuDishes/creamy-mushroom-pasta.jpg'
import grilledChicken from '../assets/menuDishes/grilled-chicken.jpg'
import pizza from '../assets/menuDishes/margherita-pizza.jpg'

export interface MenuItem {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  category: string;
  image: string;
  isFeatured: boolean;
}

export const menuData: MenuItem[] = [
  // Starters
  {
    id: "mediterranean-salad",
    name: {
      en: "Mediterranean Salad",
      ar: "سلطة البحر المتوسط",
    },
    description: {
      en: "Fresh greens, cherry tomatoes, olives, cucumber, and feta cheese.",
      ar: "خضروات طازجة وطماطم كرزية وزيتون وخيار وجبنة فيتا.",
    },
    price: 180,
    category: "starters",
    image: salad,
    isFeatured: true,
  },
  {
    id: "classic-hummus",
    name: {
      en: "Classic Hummus",
      ar: "حمص كلاسيكي",
    },
    description: {
      en: "Creamy chickpea hummus with tahini, olive oil, and warm pita bread.",
      ar: "حمص كريمي بالطحينة وزيت الزيتون وخبز البيتا الدافئ.",
    },
    price: 120,
    category: "starters",
    image: hummus,
    isFeatured: false,
  },
  {
    id: "bruschetta",
    name: {
      en: "Tomato Bruschetta",
      ar: "بروشيتا بالطماطم",
    },
    description: {
      en: "Toasted artisan bread topped with fresh tomatoes, basil, and olive oil.",
      ar: "خبز محمص مع الطماطم الطازجة والريحان وزيت الزيتون.",
    },
    price: 140,
    category: "starters",
    image: bruschetta,
    isFeatured: false,
  },

  // Main Courses
  {
    id: "creamy-mushroom-pasta",
    name: {
      en: "Creamy Mushroom Pasta",
      ar: "باستا كريمية بالمشروم",
    },
    description: {
      en: "Pasta tossed in a creamy mushroom and herb sauce.",
      ar: "باستا بصوص كريمي بالمشروم والأعشاب.",
    },
    price: 280,
    category: "main-courses",
    image: pasta,
    isFeatured: true,
  },
  {
    id: "mediterranean-grilled-chicken",
    name: {
      en: "Mediterranean Grilled Chicken",
      ar: "دجاج مشوي على الطريقة المتوسطية",
    },
    description: {
      en: "Herb-marinated chicken served with roasted seasonal vegetables.",
      ar: "دجاج متبل بالأعشاب يقدم مع الخضروات الموسمية المشوية.",
    },
    price: 340,
    category: "main-courses",
    image: grilledChicken,
    isFeatured: true,
  },
  {
    id: "margherita-pizza",
    name: {
      en: "Margherita Pizza",
      ar: "بيتزا مارغريتا",
    },
    description: {
      en: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
      ar: "بيتزا كلاسيكية بصلصة الطماطم والموزاريلا والريحان الطازج.",
    },
    price: 260,
    category: "main-courses",
    image: pizza,
    isFeatured: true,
  },
  {
    id: "grilled-salmon",
    name: {
      en: "Herb-Grilled Salmon",
      ar: "سلمون مشوي بالأعشاب",
    },
    description: {
      en: "Grilled salmon with lemon, fresh herbs, and seasonal vegetables.",
      ar: "سلمون مشوي بالليمون والأعشاب الطازجة والخضروات الموسمية.",
    },
    price: 420,
    category: "main-courses",
    image: "/images/menu/grilled-salmon.webp",
    isFeatured: false,
  },
  {
    id: "vegetable-risotto",
    name: {
      en: "Roasted Vegetable Risotto",
      ar: "ريزوتو بالخضروات المشوية",
    },
    description: {
      en: "Creamy risotto with roasted vegetables, parmesan, and fresh herbs.",
      ar: "ريزوتو كريمي بالخضروات المشوية والبارميزان والأعشاب الطازجة.",
    },
    price: 290,
    category: "main-courses",
    image: "/images/menu/vegetable-risotto.webp",
    isFeatured: false,
  },

  // Desserts
  {
    id: "classic-tiramisu",
    name: {
      en: "Classic Tiramisu",
      ar: "تيراميسو كلاسيكي",
    },
    description: {
      en: "Layers of coffee-soaked biscuits and mascarpone cream.",
      ar: "طبقات من البسكويت بالقهوة وكريمة الماسكاربوني.",
    },
    price: 160,
    category: "desserts",
    image: "/images/menu/tiramisu.webp",
    isFeatured: false,
  },
  {
    id: "panna-cotta",
    name: {
      en: "Vanilla Panna Cotta",
      ar: "بانا كوتا بالفانيليا",
    },
    description: {
      en: "Silky vanilla cream served with a fresh berry sauce.",
      ar: "كريمة فانيليا ناعمة تقدم مع صلصة التوت الطازج.",
    },
    price: 150,
    category: "desserts",
    image: "/images/menu/panna-cotta.webp",
    isFeatured: false,
  },

  // Drinks
  {
    id: "fresh-lemonade",
    name: {
      en: "Fresh Mint Lemonade",
      ar: "ليمونادة بالنعناع الطازج",
    },
    description: {
      en: "Freshly squeezed lemons blended with mint and ice.",
      ar: "ليمون طازج مع النعناع والثلج.",
    },
    price: 95,
    category: "drinks",
    image: "/images/menu/mint-lemonade.webp",
    isFeatured: false,
  },
  {
    id: "iced-coffee",
    name: {
      en: "Iced Coffee",
      ar: "قهوة مثلجة",
    },
    description: {
      en: "Chilled coffee served over ice with your choice of milk.",
      ar: "قهوة باردة تقدم مع الثلج والحليب حسب اختيارك.",
    },
    price: 110,
    category: "drinks",
    image: "/images/menu/iced-coffee.webp",
    isFeatured: false,
  },
];
