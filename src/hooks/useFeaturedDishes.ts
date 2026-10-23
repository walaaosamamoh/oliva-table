import { useQuery } from "@tanstack/react-query";
import { getFeaturedDishes } from "../services/menuService";

export function useFeaturedDishes(){
    return useQuery({
        queryKey: ["menu", "featured"],
        queryFn: getFeaturedDishes
    })
}