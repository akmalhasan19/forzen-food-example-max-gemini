"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/shared/price";
import { StockBadge } from "@/components/shared/stock-badge";
import { WeightBadge } from "@/components/shared/weight-badge";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { ProductCard } from "@/components/features/catalog/product-card";
import { useCartStore } from "@/store/cart-store";
import { getRecommendations } from "@/lib/utils/recommendation";
import { TEMPERATURE_OPTIONS } from "@/lib/constants/filters";
import { estimateMeltingMinutes, coldChainStatus } from "@/lib/utils/cold-chain";
import type { Product, Category } from "@/types/domain";

interface ProductDetailClientProps {
  product: Product;
  category: Category | null;
  allProducts: Product[];
}

export function ProductDetailClient({
  product,
  category,
  allProducts,
}: ProductDetailClientProps) {
  const addItem = useCartStore((s) => s.addItem);
  const tempInfo = TEMPERATURE_OPTIONS.find(
    (t) => t.value === product.temperatureRequirement
  );
  const meltingMinutes = estimateMeltingMinutes(
    "standard",
    product.temperatureRequirement
  );
  const chainStatus = coldChainStatus(meltingMinutes);

  const recommendations = getRecommendations(allProducts, {
    viewedProductId: product.id,
    limit: 4,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/products" className="hover:text-teal-600 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          Products
        </Link>
        {category && (
          <>
            <span>/</span>
            <span>{category.name}</span>
          </>
        )}
        <span>/</span>
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-xl bg-slate-100 relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.flashSaleEndsAt && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-orange-500 text-white border-0 text-base px-3 py-1">
                Flash Sale
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {product.name}
            </h1>
            {category && <p className="text-sm text-slate-500 mt-1">{category.name}</p>}
          </div>

          <Price cents={product.priceCents} size="lg" />

          {product.flashSaleEndsAt && (
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-sm font-medium text-orange-700">Sale ends in:</span>
              <CountdownTimer endsAt={product.flashSaleEndsAt} />
            </div>
          )}

          <p className="text-slate-600 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3 flex-wrap">
            <StockBadge quantity={product.inventoryAvailable} />
            <WeightBadge grams={product.weightGrams} />
            {tempInfo && <Badge className={`${tempInfo.color} border-0`}>{tempInfo.label}</Badge>}
          </div>

          {product.dietTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {product.dietTags.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag.replace("_", " ")}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
            <Thermometer className="h-5 w-5 text-cyan-600" />
            <div>
              <p className="text-sm font-medium text-cyan-800">
                Cold-Chain Estimate (Standard Shipping)
              </p>
              <p className="text-xs text-cyan-600">
                Safe window: ~{meltingMinutes} min | Status:{" "}
                <span
                  className={
                    chainStatus.variant === "safe"
                      ? "text-green-600"
                      : chainStatus.variant === "warning"
                        ? "text-amber-600"
                        : "text-red-600"
                  }
                >
                  {chainStatus.label}
                </span>
              </p>
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => addItem(product)}
            disabled={product.inventoryAvailable <= 0}
            className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {product.inventoryAvailable <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
