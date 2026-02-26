import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartState, Product, ShippingMethod } from "@/types/domain";
import { calculateShippingCents } from "@/lib/utils/cold-chain";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, qty: i.qty + qty }
                  : i
              ),
            };
          }
          const newItem: CartItem = {
            productId: product.id,
            qty,
            unitPriceCents: product.priceCents,
            unitWeightGrams: product.weightGrams,
            name: product.name,
            imageUrl: product.imageUrl,
            slug: product.slug,
          };
          return { items: [...state.items, newItem] };
        });
      },

      updateQty: (productId: string, qty: number) => {
        set((state) => {
          if (qty <= 0) {
            return { items: state.items.filter((i) => i.productId !== productId) };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, qty } : i
            ),
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      clearCart: () => set({ items: [] }),

      subtotalCents: () => {
        return get().items.reduce(
          (sum, item) => sum + item.unitPriceCents * item.qty,
          0
        );
      },

      totalWeightGrams: () => {
        return get().items.reduce(
          (sum, item) => sum + item.unitWeightGrams * item.qty,
          0
        );
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0);
      },

      shippingCents: (method: ShippingMethod) => {
        const totalWeight = get().totalWeightGrams();
        return calculateShippingCents(totalWeight, method);
      },
    }),
    {
      name: "frozen-cart-v1",
    }
  )
);
