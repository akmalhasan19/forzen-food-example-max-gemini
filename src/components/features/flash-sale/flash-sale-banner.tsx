"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { formatPrice, discountPercent } from "@/lib/utils/currency";
import { MOCK_FLASH_SALES } from "@/lib/mock/flash-sales";
import { MOCK_PRODUCTS } from "@/lib/mock/products";

export function FlashSaleBanner() {
  const activeSale = MOCK_FLASH_SALES[0];
  if (!activeSale) return null;
  const saleProduct = MOCK_PRODUCTS.find((p) => p.id === activeSale.productId);
  if (!saleProduct) return null;

  const discount = discountPercent(activeSale.originalPriceCents, activeSale.salePriceCents);

  return (
    <section className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6" />
            <h2 className="text-xl md:text-2xl font-bold">Flash Sale</h2>
          </div>
          <p className="text-orange-100">{activeSale.label}</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">{formatPrice(activeSale.salePriceCents)}</span>
            <span className="text-orange-200 line-through">{formatPrice(activeSale.originalPriceCents)}</span>
            <span className="bg-white/20 rounded-full px-2.5 py-0.5 text-sm font-semibold">
              -{discount}%
            </span>
          </div>
          <CountdownTimer endsAt={activeSale.endsAt} className="text-white" />
        </div>

        <Button
          asChild
          className="bg-white text-orange-600 hover:bg-orange-50 font-semibold"
        >
          <Link href={`/products/${saleProduct.slug}`}>Belanja Sekarang</Link>
        </Button>
      </div>
    </section>
  );
}
