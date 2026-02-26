import type { IProductService } from "@/services/interfaces/product-service";
import type { Product, Category, CatalogFilters } from "@/types/domain";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import { MOCK_CATEGORIES } from "@/lib/mock/categories";
import { MOCK_INVENTORY_BATCHES } from "@/lib/mock/inventory-batches";

export class MockProductRepository implements IProductService {
  private products = [...MOCK_PRODUCTS];
  private categoriesList = [...MOCK_CATEGORIES];

  async list(filters: CatalogFilters): Promise<Product[]> {
    let result = this.products.filter((p) => p.isActive);

    // Category filter
    if (filters.categoryIds.length > 0) {
      result = result.filter((p) => filters.categoryIds.includes(p.categoryId));
    }

    // Price filter
    if (filters.minPriceCents !== undefined) {
      result = result.filter((p) => p.priceCents >= filters.minPriceCents!);
    }
    if (filters.maxPriceCents !== undefined) {
      result = result.filter((p) => p.priceCents <= filters.maxPriceCents!);
    }

    // Temperature filter
    if (filters.temperature && filters.temperature.length > 0) {
      result = result.filter((p) => filters.temperature!.includes(p.temperatureRequirement));
    }

    // Diet tags filter
    if (filters.dietTags && filters.dietTags.length > 0) {
      result = result.filter((p) =>
        filters.dietTags!.some((tag) => p.dietTags.includes(tag))
      );
    }

    // In stock only
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inventoryAvailable > 0);
    }

    // Sort
    switch (filters.sortBy) {
      case "price_asc":
        result.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price_desc":
        result.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "featured":
      default:
        // Featured: flash sale items first, then by inventory
        result.sort((a, b) => {
          if (a.flashSaleEndsAt && !b.flashSaleEndsAt) return -1;
          if (!a.flashSaleEndsAt && b.flashSaleEndsAt) return 1;
          return b.inventoryAvailable - a.inventoryAvailable;
        });
        break;
    }

    return result;
  }

  async bySlug(slug: string): Promise<Product | null> {
    return this.products.find((p) => p.slug === slug) ?? null;
  }

  async byId(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) ?? null;
  }

  async categories(): Promise<Category[]> {
    return this.categoriesList.filter((c) => c.isActive);
  }

  async inventorySnapshot(): Promise<Record<string, number>> {
    const snapshot: Record<string, number> = {};
    for (const batch of MOCK_INVENTORY_BATCHES) {
      snapshot[batch.productId] = (snapshot[batch.productId] ?? 0) + batch.quantityAvailable;
    }
    return snapshot;
  }

  async search(query: string): Promise<Product[]> {
    const lower = query.toLowerCase();
    return this.products.filter(
      (p) =>
        p.isActive &&
        (p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower))
    );
  }
}
