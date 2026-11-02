import { supabase } from "../lib/supabase";
import { dishImages } from "../data/dishImages";
import type { Dish } from "../types/database";

export async function getMenuDishes(): Promise<Dish[]> {
  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .eq("is_available", true);

  if (error) throw error;

  return (data ?? []).map((dish) => ({
    ...dish,
    price: Number(dish.price),
    image: dishImages[dish.id] ?? "",
  }));
}

export async function getFeaturedDishes(): Promise<Dish[]> {
  const dishes = await getMenuDishes();
  return dishes.filter((dish) => dish.is_featured);
}

export async function getDish(id: string): Promise<Dish> {
  const dishes = await getMenuDishes();
  const dish = dishes.find((dish) => dish.id === id);

  if (!dish) throw new Error("Dish not found");

  return dish;
}