"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/shared/price";
import { StockBadge } from "@/components/shared/stock-badge";
import { WeightBadge } from "@/components/shared/weight-badge";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { useCartStore } from "@/store/cart-store";
import { TEMPERATURE_OPTIONS } from "@/lib/constants/filters";
import type { Product } from "@/types/domain";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const tempInfo = TEMPERATURE_OPTIONS.find(
    (t) => t.value === product.temperatureRequirement
  );

  return (
    <Card
      className="group overflow-hidden transition-shadow hover:shadow-lg"
      data-testid="product-card"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ viewTransitionName: `product-image-${product.id}` }}
          />
          {product.flashSaleEndsAt && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-orange-500 text-white border-0">Promo</Badge>
            </div>
          )}
          <div className="absolute top-2 right-2">
            {tempInfo && (
              <Badge className={`${tempInfo.color} border-0 text-xs`}>
                {tempInfo.label}
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <CardContent className="p-3 space-y-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm text-slate-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <StockBadge quantity={product.inventoryAvailable} />
          <WeightBadge grams={product.weightGrams} />
        </div>

        {product.dietTags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {product.dietTags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-1.5 py-0"
              >
                {tag.replace("_", " ")}
              </Badge>
            ))}
            {product.dietTags.length > 2 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                +{product.dietTags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {product.flashSaleEndsAt && <CountdownTimer endsAt={product.flashSaleEndsAt} />}

        <div className="flex items-center justify-between pt-1">
          <Price cents={product.priceCents} />
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            disabled={product.inventoryAvailable <= 0}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
            Tambah
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
