import { supabase } from "../lib/supabase";
import type { Category } from "../types/database";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) throw error;

  const allCategory: Category = {
    id: "all",
    name: {
      en: "All Dishes",
      ar: "جميع الأطباق",
    },
    is_active: true,
    created_at: "",
  };

  return [allCategory, ...(data ?? [])];
}