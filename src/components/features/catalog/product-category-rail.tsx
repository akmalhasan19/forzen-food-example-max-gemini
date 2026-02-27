"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RailProductCard } from "./rail-product-card";
import { ScrollRevealGroup } from "@/components/shared/animate-on-scroll";
import type { Product } from "@/types/domain";

interface ProductCategoryRailProps {
    id: string;
    title: string;
    subtitle: string;
    products: Product[];
    /** Per-product badge config (keyed by product id) */
    badges?: Record<string, { text: string; variant: "discount" | "new" | "promo" }>;
    /** Per-product original price in cents (keyed by product id) for strikethrough */
    originalPrices?: Record<string, number>;
    /** If true, this raill will animate immediately on load without waiting for scroll */
    isFirst?: boolean;
}

export function ProductCategoryRail({
    id,
    title,
    subtitle,
    products,
    badges,
    originalPrices,
    isFirst = false,
}: ProductCategoryRailProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 260; // card width + gap
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <ScrollRevealGroup
            className="relative group/section pl-4 sm:pl-6 lg:pl-8"
            id={id}
            forceReveal={isFirst}
        >
            {/* Section Header */}
            <div className="flex items-end justify-between pr-4 sm:pr-6 lg:pr-8 mb-6">
                <div>
                    <h2 className="reveal-slide-up-child font-display font-bold text-2xl sm:text-3xl text-foreground mb-1">
                        {title}
                    </h2>
                    <p className="reveal-slide-up-child text-muted-foreground text-sm sm:text-base font-body">
                        {subtitle}
                    </p>
                </div>
                <button className="reveal-slide-up-child text-primary font-display font-medium text-sm hover:underline flex items-center gap-1 group/link flex-shrink-0">
                    Lihat Semua
                    <span className="material-icons-round text-sm transition-transform group-hover/link:translate-x-1">
                        arrow_forward_ios
                    </span>
                </button>
            </div>

            {/* Scroll Left/Right Controls — desktop only */}
            <button
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white dark:bg-[var(--card)] rounded-full shadow-lg flex items-center justify-center text-primary opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-primary hover:text-white hidden md:flex -ml-6 lg:-ml-6"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white dark:bg-[var(--card)] rounded-full shadow-lg flex items-center justify-center text-primary opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-primary hover:text-white hidden md:flex -mr-2 lg:mr-2"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            {/* The Rail */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-8 pr-8"
            >
                {products.map((product) => (
                    <RailProductCard
                        key={product.id}
                        product={product}
                        badge={badges?.[product.id]?.text}
                        badgeVariant={badges?.[product.id]?.variant}
                        originalPriceCents={originalPrices?.[product.id]}
                    />
                ))}
            </div>
        </ScrollRevealGroup>
    );
}
