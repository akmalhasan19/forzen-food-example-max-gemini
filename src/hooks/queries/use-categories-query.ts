"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductService } from "@/services/product.service";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getProductService().categories(),
    staleTime: 5 * 60 * 1000,
  });
}
