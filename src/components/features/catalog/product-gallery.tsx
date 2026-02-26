"use client";

import { useMemo } from "react";
import { useProductsQuery } from "@/hooks/queries/use-products-query";
import { useInventoryQuery } from "@/hooks/queries/use-inventory-query";
import { useUiStore } from "@/store/ui-store";
import { ProductCard } from "./product-card";
import { ProductListRow } from "./product-list-row";
import { CatalogToolbar } from "./catalog-toolbar";
import { CatalogFilters } from "./catalog-filters";
import { SkeletonCard } from "@/components/shared/skeleton-card";
import type { Product, Category } from "@/types/domain";

interface ProductGalleryProps {
  initialProducts: Product[];
  categories: Category[];
  mode: "full" | "preview";
}

export function ProductGallery({ initialProducts, categories, mode }: ProductGalleryProps) {
  const { filters, viewMode } = useUiStore();
  const productsQuery = useProductsQuery(filters, initialProducts);
  const inventoryQuery = useInventoryQuery({ refetchInterval: 15000 });

  const products = useMemo(
    () =>
      (productsQuery.data ?? []).map((p) => ({
        ...p,
        inventoryAvailable: inventoryQuery.data?.[p.id] ?? p.inventoryAvailable,
      })),
    [productsQuery.data, inventoryQuery.data]
  );

  const displayProducts = mode === "preview" ? products.slice(0, 12) : products;

  return (
    <section className="space-y-4">
      <CatalogToolbar count={displayProducts.length} mode={mode} />
      <div className={mode === "full" ? "grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]" : ""}>
        {mode === "full" && <CatalogFilters categories={categories} />}
        {productsQuery.isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {displayProducts.map((p) => (
              <ProductListRow key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
