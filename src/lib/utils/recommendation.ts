import type { Product } from "@/types/domain";

/**
 * Rule-based recommendation engine.
 * Returns recommended product IDs based on current cart / viewed product.
 */
export function getRecommendations(
  allProducts: Product[],
  context: {
    cartProductIds?: string[];
    viewedProductId?: string;
    limit?: number;
  }
): Product[] {
  const { cartProductIds = [], viewedProductId, limit = 6 } = context;

  const excludeIds = new Set([...cartProductIds, viewedProductId].filter(Boolean));

  // Score products based on relevance rules
  const scored = allProducts
    .filter((p) => p.isActive && !excludeIds.has(p.id) && p.inventoryAvailable > 0)
    .map((p) => {
      let score = 0;

      // If viewing a product, boost same category
      if (viewedProductId) {
        const viewedProduct = allProducts.find((vp) => vp.id === viewedProductId);
        if (viewedProduct && p.categoryId === viewedProduct.categoryId) {
          score += 10;
        }
        // Boost complementary temperature
        if (viewedProduct && p.temperatureRequirement !== viewedProduct.temperatureRequirement) {
          score += 3;
        }
        // Boost shared diet tags
        if (viewedProduct) {
          const sharedTags = p.dietTags.filter((t) => viewedProduct.dietTags.includes(t));
          score += sharedTags.length * 5;
        }
      }

      // If cart has items, boost complementary categories
      if (cartProductIds.length > 0) {
        const cartProducts = allProducts.filter((cp) => cartProductIds.includes(cp.id));
        const cartCategories = new Set(cartProducts.map((cp) => cp.categoryId));
        if (!cartCategories.has(p.categoryId)) {
          score += 5; // Variety bonus
        }
      }

      // Boost flash sale items
      if (p.flashSaleEndsAt) score += 8;

      // Small boost for higher-priced items (cross-sell)
      if (p.priceCents > 1000) score += 2;

      return { product: p, score };
    });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);
}
