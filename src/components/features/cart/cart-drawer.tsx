"use client";

import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SlideToPayButton } from "./slide-to-pay-button";

export function CartDrawer() {
  const { cartOpen, toggleCart } = useUiStore();
  const items = useCartStore((s) => s.items);
  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Sheet open={cartOpen} onOpenChange={toggleCart}>
      <SheetContent
        showCloseButton={false}
        className="flex flex-col w-full sm:max-w-[320px] p-0 bg-white border-none overflow-hidden"
      >
        <VisuallyHidden>
          <SheetTitle>Shopping Cart</SheetTitle>
        </VisuallyHidden>
        <div className="px-6 py-6 flex items-center justify-between bg-white shrink-0">
          <h2 className="font-display text-2xl font-extrabold text-black tracking-tight">Cart</h2>
          <div className="flex items-center gap-3">
            <span className="bg-[#FFEC8B] text-black text-base font-bold w-10 h-8 flex items-center justify-center rounded-xl">
              {totalQty}
            </span>
            <button
              aria-label="Close cart"
              className="p-1 text-slate-400 hover:text-black transition-colors"
              onClick={toggleCart}
            >
              <span className="material-icons-round text-2xl">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 bg-zinc-700 rounded-t-[32px] mt-2 flex flex-col px-6 pt-6 pb-4 overflow-hidden relative">
          {/* Top Wavy Cutout matching the cart summary style */}
          <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[16px] bg-white rounded-b-[40px] z-20"></div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-white">
              <span className="material-icons-round text-5xl opacity-40">shopping_bag</span>
              <p className="font-semibold text-base text-white">Keranjang Anda kosong</p>
              <button
                className="bg-white text-black font-extrabold py-2.5 px-6 text-sm rounded-full flex items-center justify-center active:scale-[0.98] transition-transform mt-3"
                onClick={toggleCart}
              >
                Belanja Sekarang
              </button>
            </div>
          ) : (
            <>
              {items.length > 2 ? (
                <div className="flex-1 relative overflow-hidden flex flex-col -mx-2 px-2 pb-6">
                  {/* Fading overlay at top/bottom for aesthetic scrolling effect. */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-zinc-700 to-transparent z-10 pointer-events-none"></div>

                  <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar rounded-lg">
                    {items.map((item) => (
                      <CartItemRow key={item.productId} item={item} />
                    ))}
                  </div>

                  <div className="absolute bottom-6 left-0 right-0 h-8 bg-gradient-to-t from-zinc-700 to-transparent z-10 pointer-events-none"></div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col pt-2 pb-6">
                  <div className="space-y-6 flex-1">
                    {items.map((item) => (
                      <CartItemRow key={item.productId} item={item} />
                    ))}
                  </div>
                </div>
              )}

              <CartSummary />

              <div className="shrink-0">
                <SlideToPayButton
                  onSuccess={() => {
                    toggleCart();
                    window.location.href = "/checkout";
                  }}
                />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
