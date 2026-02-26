"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

export function CartDrawer() {
  const { cartOpen, toggleCart } = useUiStore();
  const items = useCartStore((s) => s.items);

  return (
    <Sheet open={cartOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Keranjang Belanja
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
            <ShoppingCart className="h-12 w-12" />
            <p>Keranjang Anda kosong</p>
            <Button variant="outline" onClick={toggleCart} asChild>
              <Link href="/products">Lihat Produk</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-3 py-4">
                {items.map((item) => (
                  <CartItemRow key={item.productId} item={item} />
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <CartSummary />

            <SheetFooter className="flex-col gap-2 sm:flex-col">
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700" onClick={toggleCart}>
                <Link href="/checkout">Lanjut ke Pembayaran</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild onClick={toggleCart}>
                <Link href="/cart">Lihat Keranjang Lengkap</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
