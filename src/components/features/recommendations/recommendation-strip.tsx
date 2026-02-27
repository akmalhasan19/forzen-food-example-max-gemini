"use client";

import { Sparkles } from "lucide-react";
import { ProductCardHome } from "@/components/features/catalog/product-card-home";
import { getRecommendations } from "@/lib/utils/recommendation";
import { useCartStore } from "@/store/cart-store";
import { MOCK_PRODUCTS } from "@/lib/mock/products";

export function RecommendationStrip() {
  const cartItems = useCartStore((s) => s.items);
  const cartProductIds = cartItems.map((i) => i.productId);

  const recommendations = getRecommendations(MOCK_PRODUCTS, {
    cartProductIds,
    limit: 4,
  });

  if (recommendations.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-teal-600" />
        <h2 className="text-lg font-semibold text-slate-900">Rekomendasi untuk Anda</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {recommendations.map((product) => (
          <ProductCardHome key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
