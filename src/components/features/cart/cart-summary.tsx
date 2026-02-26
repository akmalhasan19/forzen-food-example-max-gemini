"use client";

import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils/currency";
import { formatWeight } from "@/lib/utils/weight";

export function CartSummary() {
  const { subtotalCents, totalWeightGrams, totalItems, shippingCents } = useCartStore();

  return (
    <div className="space-y-2 py-3 text-sm">
      <div className="flex justify-between text-slate-600">
        <span>Barang ({totalItems()})</span>
        <span>{formatPrice(subtotalCents())}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Total Berat</span>
        <span>{formatWeight(totalWeightGrams())}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Est. Ongkir (Standar)</span>
        <span>{formatPrice(shippingCents("standard"))}</span>
      </div>
      <div className="flex justify-between font-semibold text-slate-900 border-t pt-2">
        <span>Estimasi Total</span>
        <span>{formatPrice(subtotalCents() + shippingCents("standard"))}</span>
      </div>
    </div>
  );
}
