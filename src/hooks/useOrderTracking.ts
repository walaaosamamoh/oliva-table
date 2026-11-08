import { useQuery } from "@tanstack/react-query";
import { getOrderTracking } from "../services/ordersService";

export function useOrderTracking(orderId: string) {
  return useQuery({
    queryKey: ["orderTracking", orderId],
    queryFn: () => getOrderTracking(orderId),
    enabled: Boolean(orderId),
    refetchInterval: 15000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}