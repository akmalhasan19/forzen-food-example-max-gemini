"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils/currency";
import { formatWeight } from "@/lib/utils/weight";
import { TEMPERATURE_OPTIONS } from "@/lib/constants/filters";
import type { Product } from "@/types/domain";

interface ProductCardHomeProps {
  product: Product;
}

export function ProductCardHome({ product }: ProductCardHomeProps) {
  const addItem = useCartStore((s) => s.addItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const cartItems = useCartStore((s) => s.items);

  const cartItem = cartItems.find((i) => i.productId === product.id);
  const qty = cartItem?.qty ?? 0;
  const isInCart = qty > 0;

  const tempInfo = TEMPERATURE_OPTIONS.find(
    (t) => t.value === product.temperatureRequirement
  );

  return (
    <div
      className="bg-[var(--card)] rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] flex flex-col items-center justify-between transition-all duration-300 hover:shadow-lg h-full group relative pb-0 overflow-hidden"
      data-testid="product-card"
    >
      {/* Content area */}
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col items-center w-full px-4 pt-6 pb-2 z-10"
      >
        {/* Product Image */}
        <div className="h-32 w-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={128}
            className="h-full w-auto object-contain drop-shadow-md"
            style={{ viewTransitionName: `product-image-${product.id}` }}
          />
        </div>

        {/* Product Name & Category */}
        <h3 className="text-foreground text-lg font-bold text-center leading-tight">
          {product.name}
          <br />
          <span className="text-sm font-semibold text-foreground/70">
            ({tempInfo?.label ?? product.temperatureRequirement})
          </span>
        </h3>

        {/* Weight */}
        <p className="text-muted-foreground text-xs mt-1">
          {formatWeight(product.weightGrams)}
        </p>

        {/* Price */}
        <div className="mt-2 text-foreground font-bold text-2xl">
          {formatPrice(product.priceCents)}
        </div>
      </Link>

      {/* Concave button area */}
      <div
        className={`w-full mt-auto product-card-home-btn pt-4 pb-0 h-16 flex items-center justify-center relative ${isInCart
          ? "bg-[#C5E1A5] dark:bg-[#5a7a2e]"
          : "bg-[#F0F4EF] dark:bg-[#1a2e2e]"
          }`}
      >
        {isInCart ? (
          /* Quantity controls */
          <div className="w-full h-full flex items-center justify-between px-6 text-foreground z-[2]">
            <button
              aria-label="Kurangi"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              onClick={() => updateQty(product.id, qty - 1)}
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="text-xl font-bold">{qty}</span>
            <button
              aria-label="Tambah"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              onClick={() => addItem(product)}
              disabled={product.inventoryAvailable <= qty}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        ) : (
          /* Add to cart button */
          <button
            aria-label="Tambah"
            className="w-full h-full flex items-center justify-center text-foreground transition-colors duration-200 z-[2] disabled:opacity-40"
            onClick={() => addItem(product)}
            disabled={product.inventoryAvailable <= 0}
          >
            <Plus className="h-7 w-7" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}
