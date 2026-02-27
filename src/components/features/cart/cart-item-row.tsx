"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/shared/price";
import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/types/domain";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQty, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 rounded-2xl border border-[#d4d4d4] bg-white p-3">
      <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-[#E1F0ED]">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <h4 className="text-sm font-medium text-[#003032] truncate">{item.name}</h4>
        <Price cents={item.unitPriceCents} size="sm" />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQty(item.productId, item.qty - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQty(item.productId, item.qty + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <Price cents={item.unitPriceCents * item.qty} size="sm" />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-[#8fb3b5] hover:text-red-500"
          onClick={() => removeItem(item.productId)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
