"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItemRow } from "@/components/features/cart/cart-item-row";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils/currency";
import { formatWeight } from "@/lib/utils/weight";
import { SHIPPING_RATES } from "@/lib/constants/shipping";
import type { ShippingMethod } from "@/types/domain";

export default function CartPage() {
  const { items, subtotalCents, totalWeightGrams, totalItems, shippingCents, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 text-center">
        <ShoppingCart className="h-16 w-16 mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-6">Add some frozen goodies to get started!</p>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link href="/products">Browse Products</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/products" className="text-slate-500 hover:text-teal-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
          <span className="text-sm text-slate-500">({totalItems()} items)</span>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-700">
          <Trash2 className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <CartItemRow key={item.productId} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border p-6 h-fit space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotalCents())}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Total Weight</span>
              <span>{formatWeight(totalWeightGrams())}</span>
            </div>

            <Separator className="my-3" />

            <h3 className="text-sm font-medium text-slate-700">Shipping Options</h3>
            {(Object.keys(SHIPPING_RATES) as ShippingMethod[]).map((method) => {
              const rate = SHIPPING_RATES[method];
              const cost = shippingCents(method);
              return (
                <div key={method} className="flex justify-between text-slate-600">
                  <span>{rate.label}</span>
                  <span>{formatPrice(cost)}</span>
                </div>
              );
            })}
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-slate-900">
            <span>Est. Total (Standard)</span>
            <span>{formatPrice(subtotalCents() + shippingCents("standard"))}</span>
          </div>

          <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
