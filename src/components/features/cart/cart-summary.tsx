"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils/currency";

export function CartSummary() {
  const { subtotalCents, items } = useCartStore();
  const totalAmt = subtotalCents();

  return (
    <div className="relative mt-2 mb-4 px-2 shrink-0">
      <div className="bg-[#C5E063] p-4 rounded-[24px] relative overflow-visible">
        {/* Wavy cutouts colored identically to cart's gray background */}
        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[16px] bg-zinc-700 rounded-b-[40px]"></div>
        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[16px] bg-zinc-700 rounded-t-[40px]"></div>

        <div className="flex justify-between items-center mb-2 pt-1 z-10 relative">
          <span className="text-black font-semibold text-sm">Delivery Amount</span>
          <span className="text-black font-bold text-base">-</span>
        </div>
        <div className="border-t border-black/10 pt-2 z-10 relative">
          <p className="text-black font-semibold text-sm mb-0.5">Total Amount</p>
          <div className="flex justify-between items-end">
            <span className="text-black font-extrabold text-xl sm:text-2xl">{formatPrice(totalAmt)}</span>
          </div>
        </div>

        {/* Product thumbnails - two rows on the right side */}
        {(() => {
          const shown = items.slice(0, 6);
          const count = shown.length;
          const size = count <= 2 ? 36 : count <= 4 ? 30 : 26;
          const overlap = Math.max(size * 0.3, 6);
          const bottomRow = shown.slice(0, 3);
          const topRow = shown.slice(3);
          const angles = ['-12deg', '10deg', '-6deg', '8deg', '-10deg', '14deg'];

          const renderRow = (rowItems: typeof shown, startIdx: number) =>
            rowItems.map((item, i) => {
              const idx = startIdx + i;
              return (
                <div
                  key={item.productId}
                  className="relative rounded-md overflow-hidden border-2 border-[#C5E063] shadow-md shrink-0"
                  style={{
                    width: size,
                    height: size,
                    transform: `rotate(${angles[idx]})`,
                    zIndex: 10 - idx,
                    marginLeft: i === 0 ? 0 : -overlap,
                  }}
                >
                  <Image src={item.imageUrl} alt="preview" fill sizes={`${size}px`} className="object-cover" />
                </div>
              );
            });

          return (
            <div className="absolute right-3 bottom-2 flex flex-col items-end gap-1">
              {topRow.length > 0 && (
                <div className="flex">{renderRow(topRow, 3)}</div>
              )}
              <div className="flex">{renderRow(bottomRow, 0)}</div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
