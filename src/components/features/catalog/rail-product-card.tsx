"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils/currency";
import { formatWeight } from "@/lib/utils/weight";
import type { Product } from "@/types/domain";

interface RailProductCardProps {
    product: Product;
    /** Optional badge text, e.g. "-20%", "Baru", "Promo" */
    badge?: string;
    /** Badge color variant */
    badgeVariant?: "discount" | "new" | "promo";
    /** Optional original price in cents for showing strikethrough */
    originalPriceCents?: number;
}

export function RailProductCard({
    product,
    badge,
    badgeVariant = "discount",
    originalPriceCents,
}: RailProductCardProps) {
    const addItem = useCartStore((s) => s.addItem);
    const updateQty = useCartStore((s) => s.updateQty);
    const cartItems = useCartStore((s) => s.items);

    const cartItem = cartItems.find((i) => i.productId === product.id);
    const qty = cartItem?.qty ?? 0;
    const isInCart = qty > 0;

    const badgeColorMap = {
        discount: "bg-amber-500",
        new: "bg-emerald-500",
        promo: "bg-amber-500",
    };

    return (
        <article className="reveal-slide-up-child flex-none w-[240px] h-[360px] bg-white dark:bg-[var(--card)] rounded-lg shadow-[0_4px_20px_-2px_rgba(0,77,64,0.08)] hover:shadow-[0_10px_25px_-5px_rgba(0,77,64,0.15)] hover:-translate-y-1 transition-all duration-300 snap-start group relative overflow-hidden border border-slate-100 dark:border-[var(--border)]">
            {/* Image Section */}
            <Link href={`/products/${product.slug}`}>
                <div className="h-[200px] w-full relative bg-gray-100 dark:bg-muted/30">
                    {badge && (
                        <span
                            className={`absolute top-3 left-3 ${badgeColorMap[badgeVariant]} text-white text-xs font-bold px-2.5 py-1 rounded-md z-10 font-display`}
                        >
                            {badge}
                        </span>
                    )}
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="240px"
                    />
                </div>
            </Link>

            {/* Info Section */}
            <div className="p-4 flex flex-col justify-between h-[160px]">
                <div>
                    <Link href={`/products/${product.slug}`}>
                        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-1 line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm font-body">
                        {formatWeight(product.weightGrams)}
                    </p>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <div className="flex flex-col">
                        {originalPriceCents && (
                            <span className="text-xs text-muted-foreground line-through font-display">
                                {formatPrice(originalPriceCents)}
                            </span>
                        )}
                        <span className="font-display font-bold text-xl text-primary">
                            {formatPrice(product.priceCents)}
                        </span>
                    </div>

                    {isInCart ? (
                        <div className="flex items-center gap-1.5">
                            <button
                                className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors active:scale-95"
                                onClick={() => updateQty(product.id, qty - 1)}
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-display font-bold text-sm w-5 text-center text-foreground">
                                {qty}
                            </span>
                            <button
                                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:brightness-110 transition-all active:scale-95 disabled:opacity-40"
                                onClick={() => addItem(product)}
                                disabled={product.inventoryAvailable <= qty}
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="group/btn w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:brightness-110 transition-all active:scale-95 disabled:opacity-40"
                            onClick={() => addItem(product)}
                            disabled={product.inventoryAvailable <= 0}
                        >
                            <Plus className="h-5 w-5 transition-transform group-hover/btn:rotate-90" />
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
