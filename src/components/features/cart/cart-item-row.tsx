"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/utils/currency";
import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/types/domain";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQty, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-3 group">
      <div className="w-16 h-16 shrink-0 rounded-full bg-white flex items-center justify-center p-2 relative overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="64px"
          className="object-contain p-1.5"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => removeItem(item.productId)}
            className="text-white hover:text-red-400 p-1.5"
          >
            <span className="material-icons-round text-lg">delete</span>
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-white text-base leading-tight line-clamp-2">{item.name}</h3>
        <p className="text-xs text-gray-300 mt-0.5">{item.brand || 'Fresh Product'}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <button
            onClick={() => updateQty(item.productId, Math.max(0, item.qty - 1))}
            className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <span className="material-icons-round text-[12px] -mt-[1px]">remove</span>
          </button>
          <span className="text-white font-medium text-xs w-3 text-center">{item.qty}</span>
          <button
            onClick={() => updateQty(item.productId, item.qty + 1)}
            className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <span className="material-icons-round text-[12px] -mt-[1px]">add</span>
          </button>
        </div>
      </div>

      <div className="bg-white px-3 py-1.5 rounded-full self-start mt-1">
        <span className="font-bold text-black text-xs whitespace-nowrap">
          {formatPrice(item.unitPriceCents * item.qty).replace(/\,00$/, '')}
        </span>
      </div>
    </div>
  );
}
