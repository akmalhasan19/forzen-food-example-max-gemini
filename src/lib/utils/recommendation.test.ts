import { describe, expect, it } from "vitest";
import { getRecommendations } from "@/lib/utils/recommendation";
import { MOCK_PRODUCTS } from "@/lib/mock/products";

describe("recommendation engine", () => {
  it("excludes viewed and cart products", () => {
    const viewed = MOCK_PRODUCTS[0];
    const cart = MOCK_PRODUCTS[1];
    const result = getRecommendations(MOCK_PRODUCTS, {
      viewedProductId: viewed.id,
      cartProductIds: [cart.id],
      limit: 6,
    });

    expect(result.some((p) => p.id === viewed.id)).toBe(false);
    expect(result.some((p) => p.id === cart.id)).toBe(false);
  });

  it("returns at most the requested limit", () => {
    const result = getRecommendations(MOCK_PRODUCTS, { limit: 4 });
    expect(result.length).toBeLessThanOrEqual(4);
  });
});
