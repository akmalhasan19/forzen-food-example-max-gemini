"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrderService } from "@/services/order.service";

export function useDeliverySlots() {
  return useQuery({
    queryKey: ["delivery-slots"],
    queryFn: () => getOrderService().deliverySlots(),
    staleTime: 5 * 60 * 1000,
  });
}
