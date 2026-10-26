import { useQuery } from "@tanstack/react-query";
import { getDish } from "../services/menuService";

export function useDish(id: string) {
  return useQuery({
    queryKey: ["menu", "dish", id],
    queryFn: () => getDish(id),
  });
}
