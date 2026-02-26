import { describe, expect, it } from "vitest";
import { MockProductRepository } from "@/services/adapters/mock/product.repository.mock";

describe("MockProductRepository filters", () => {
  it("combines category, price, temperature, and diet filters", async () => {
    const repo = new MockProductRepository();
    const categories = await repo.categories();
    const targetCategoryId = categories[0]?.id;
    expect(targetCategoryId).toBeTruthy();

    const result = await repo.list({
      categoryIds: [targetCategoryId!],
      minPriceCents: 700,
      maxPriceCents: 1200,
      temperature: ["frozen"],
      dietTags: ["gluten_free"],
      inStockOnly: true,
      sortBy: "featured",
      viewMode: "grid",
    });

    expect(result.length).toBeGreaterThan(0);
    for (const product of result) {
      expect(product.categoryId).toBe(targetCategoryId);
      expect(product.priceCents).toBeGreaterThanOrEqual(700);
      expect(product.priceCents).toBeLessThanOrEqual(1200);
      expect(product.temperatureRequirement).toBe("frozen");
      expect(product.dietTags.includes("gluten_free")).toBe(true);
      expect(product.inventoryAvailable).toBeGreaterThan(0);
    }
  });
});
