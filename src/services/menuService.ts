import { supabase } from "../lib/supabase";
import { dishImages } from "../data/dishImages";
import type { Dish } from "../types/database";

function mapDish(dish: Dish): Dish {
  return {
    ...dish,
    price: Number(dish.price),
    image: dishImages[dish.id] ?? "",
  };
}

export async function getMenuDishes(): Promise<Dish[]> {
  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .eq("is_available", true);

  if (error) throw error;

  return (data ?? []).map(mapDish);
}

export async function getFeaturedDishes(): Promise<Dish[]> {
  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .eq("is_available", true)
    .eq("is_featured", true);

  if (error) throw error;

  return (data ?? []).map(mapDish);
}

export async function getDish(id: string): Promise<Dish> {
  const { data, error } = await supabase
    .from("dishes")
    .select("*")
    .eq("id", id)
    .eq("is_available", true)
    .single();

  if (error) throw error;

  return mapDish(data);
}