import { describe, expect, it, beforeEach } from "vitest";
import { useCartStore } from "@/store/cart-store";
import { MOCK_PRODUCTS } from "@/lib/mock/products";

describe("cart store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    localStorage.removeItem("frozen-cart-v1");
  });

  it("adds, updates, and removes items", () => {
    const product = MOCK_PRODUCTS[0];
    useCartStore.getState().addItem(product, 2);
    expect(useCartStore.getState().items[0]?.qty).toBe(2);

    useCartStore.getState().updateQty(product.id, 3);
    expect(useCartStore.getState().items[0]?.qty).toBe(3);

    useCartStore.getState().removeItem(product.id);
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it("persists and rehydrates cart state", async () => {
    const product = MOCK_PRODUCTS[1];
    useCartStore.setState({ items: [] });
    localStorage.setItem(
      "frozen-cart-v1",
      JSON.stringify({
        state: {
          items: [
            {
              productId: product.id,
              qty: 1,
              unitPriceCents: product.priceCents,
              unitWeightGrams: product.weightGrams,
              name: product.name,
              imageUrl: product.imageUrl,
              slug: product.slug,
            },
          ],
        },
        version: 0,
      })
    );
    await useCartStore.persist.rehydrate();

    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0]?.productId).toBe(product.id);
  });
});
