"use client";

import { useQuery } from "@tanstack/react-query";
import type { Product, CatalogFilters } from "@/types/domain";
import { getProductService } from "@/services/product.service";

export function useProductsQuery(filters: CatalogFilters, initialData?: Product[]) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProductService().list(filters),
    initialData,
    staleTime: 60 * 1000,
  });
}
