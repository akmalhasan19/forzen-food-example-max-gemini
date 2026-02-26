"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductService } from "@/services/product.service";

export function useInventoryQuery(options?: { refetchInterval?: number }) {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => getProductService().inventorySnapshot(),
    refetchInterval: options?.refetchInterval ?? 15000,
    staleTime: 15 * 1000,
  });
}
