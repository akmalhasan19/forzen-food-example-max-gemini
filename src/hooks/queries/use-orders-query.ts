"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrderService } from "@/services/order.service";

export function useOrdersQuery(profileId?: string) {
  return useQuery({
    queryKey: ["orders", profileId],
    queryFn: () =>
      profileId
        ? getOrderService().list(profileId)
        : getOrderService().allOrders(),
    staleTime: 30 * 1000,
  });
}
