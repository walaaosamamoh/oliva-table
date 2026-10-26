import { menuData, type MenuItem } from "../data/MenuData";

export async function getFeaturedDishes() {
  return menuData.filter((dish) => dish.isFeatured);
}

export async function getMenuDishes() {
  return menuData;
}

export async function getDish(id: string): Promise<MenuItem> {
  const dish = menuData.find((dish) => dish.id === id);
  if (!dish) {
    throw new Error("Dish not found");
  }
  return dish;
}
