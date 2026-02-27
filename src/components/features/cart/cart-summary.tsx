"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils/currency";

export function CartSummary() {
  const { subtotalCents, shippingCents, items } = useCartStore();
  const deliveryAmt = shippingCents("standard");
  const totalAmt = subtotalCents() + deliveryAmt;

  return (
    <div className="relative mt-2 mb-4 px-2 shrink-0">
      <div className="bg-[#C5E063] p-4 rounded-[24px] relative overflow-visible">
        {/* Wavy cutouts colored identically to cart's gray background */}
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[16px] bg-zinc-700 rounded-b-[40px]"></div>
        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[16px] bg-zinc-700 rounded-t-[40px]"></div>

        <div className="flex justify-between items-center mb-2 pt-1 z-10 relative">
          <span className="text-black font-semibold text-sm">Delivery Amount</span>
          <span className="text-black font-bold text-base">{formatPrice(deliveryAmt)}</span>
        </div>
        <div className="border-t border-black/10 pt-2 z-10 relative">
          <p className="text-black font-semibold text-sm mb-0.5">Total Amount</p>
          <div className="flex justify-between items-end">
            <span className="text-black font-extrabold text-xl sm:text-2xl">{formatPrice(totalAmt)}</span>
          </div>
        </div>

        <div className="absolute right-3 bottom-1 flex -space-x-2">
          {items.slice(0, 3).map((item, idx) => {
            const angle = idx === 0 ? '-15deg' : idx === 1 ? '10deg' : '5deg';
            return (
              <div
                key={item.productId}
                className="relative w-8 h-8 drop-shadow-md"
                style={{ transform: `rotate(${angle})`, zIndex: 10 - idx }}
              >
                <Image src={item.imageUrl} alt="preview" fill sizes="32px" className="object-contain" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
