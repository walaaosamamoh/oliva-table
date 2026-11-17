import { useQuery } from "@tanstack/react-query";
import { getOrderTracking } from "../services/ordersService";

export function useOrderTracking(orderNumber: string, phone: string) {
  return useQuery({
    queryKey: ["orderTracking", orderNumber, phone],
    queryFn: () => getOrderTracking(orderNumber, phone),
    enabled: Boolean(orderNumber.trim() && phone.trim()),
    refetchInterval: 15000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
