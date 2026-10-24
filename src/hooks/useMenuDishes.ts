import { useQuery } from "@tanstack/react-query";
import { getMenuDishes } from "../services/menuService";

export function useMenuDishes(){
    return useQuery({
        queryKey: ["menu-dishes"],
        queryFn: getMenuDishes
    })
}