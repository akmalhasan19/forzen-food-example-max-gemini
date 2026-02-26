"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/shared/price";
import { StockBadge } from "@/components/shared/stock-badge";
import { WeightBadge } from "@/components/shared/weight-badge";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { useCartStore } from "@/store/cart-store";
import { TEMPERATURE_OPTIONS } from "@/lib/constants/filters";
import type { Product } from "@/types/domain";

interface ProductListRowProps {
  product: Product;
}

export function ProductListRow({ product }: ProductListRowProps) {
  const addItem = useCartStore((s) => s.addItem);
  const tempInfo = TEMPERATURE_OPTIONS.find(
    (t) => t.value === product.temperatureRequirement
  );

  return (
    <div
      className="flex gap-4 rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
      data-testid="product-list-row"
    >
      <Link href={`/products/${product.slug}`} className="relative h-24 w-24 shrink-0 rounded-md overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 space-y-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-slate-900 hover:text-teal-600 transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 line-clamp-1">{product.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <StockBadge quantity={product.inventoryAvailable} />
          <WeightBadge grams={product.weightGrams} />
          {tempInfo && (
            <Badge className={`${tempInfo.color} border-0 text-xs`}>{tempInfo.label}</Badge>
          )}
          {product.dietTags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag.replace("_", " ")}
            </Badge>
          ))}
        </div>
        {product.flashSaleEndsAt && <CountdownTimer endsAt={product.flashSaleEndsAt} />}
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <Price cents={product.priceCents} size="md" />
        <Button
          size="sm"
          onClick={() => addItem(product)}
          disabled={product.inventoryAvailable <= 0}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <ShoppingCart className="h-3.5 w-3.5 mr-1" />
          Tambah
        </Button>
      </div>
    </div>
  );
}
