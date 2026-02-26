import type { Product, Category, CatalogFilters } from "@/types/domain";

export interface IProductService {
  list(filters: CatalogFilters): Promise<Product[]>;
  bySlug(slug: string): Promise<Product | null>;
  byId(id: string): Promise<Product | null>;
  categories(): Promise<Category[]>;
  inventorySnapshot(): Promise<Record<string, number>>;
  search(query: string): Promise<Product[]>;
}
