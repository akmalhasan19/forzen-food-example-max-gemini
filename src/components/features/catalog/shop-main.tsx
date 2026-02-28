"use client";

import { useState } from "react";
import { ProductCategoryRail } from "./product-category-rail";
import type { Product, Category } from "@/types/domain";

interface ShopMainProps {
    products: Product[];
    categories: Category[];
}

/** Category navigation items — always show "Semua" first, then specific categories */
const NAV_ITEMS = [
    { id: "all", label: "Semua" },
    { id: "paling-laris", label: "Paling Laris" },
] as const;

export function ShopMain({ products, categories }: ShopMainProps) {
    const [activeNav, setActiveNav] = useState("all");

    // Build dynamic nav items from categories
    const dynamicNav = categories
        .filter((c) => c.isActive)
        .map((c) => ({ id: c.slug, label: c.name }));

    const allNavItems = [
        ...NAV_ITEMS,
        ...dynamicNav.filter(
            (d) => !NAV_ITEMS.some((n) => n.id === d.id)
        ),
    ];

    // Group products by category
    const productsByCategory = categories
        .filter((c) => c.isActive)
        .map((category) => ({
            category,
            products: products.filter((p) => p.categoryId === category.id),
        }))
        .filter((group) => group.products.length > 0);

    // "Paling Laris" — take top 8 products by somewhat mimicking popularity
    const bestSellers = [...products]
        .sort((a, b) => b.inventoryAvailable - a.inventoryAvailable)
        .slice(0, 8);

    const handleNavClick = (id: string) => {
        setActiveNav(id);
        if (id === "all") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            {/* Sticky Category Nav */}
            <nav className="sticky top-20 z-40 w-full bg-white/80 dark:bg-[var(--card)]/80 backdrop-blur-lg border-b border-slate-100/50 dark:border-white/5 py-4">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto hide-scrollbar">
                    <div className="flex items-center gap-6 min-w-max pb-1">
                        {allNavItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`px-6 py-2.5 rounded-full font-display font-medium text-sm transition-all active:scale-95 whitespace-nowrap ${activeNav === item.id
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-[var(--border)] text-primary hover:border-primary hover:bg-primary/5"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Sections */}
            <div className="max-w-[1440px] mx-auto pb-24 space-y-12 sm:space-y-16 mt-24">
                {/* Paling Laris */}
                <ProductCategoryRail
                    id="paling-laris"
                    title="Paling Laris"
                    subtitle="Pilihan favorit minggu ini"
                    products={bestSellers}
                    isFirst={true}
                />

                {/* Category Sections */}
                {productsByCategory.map(({ category, products: catProducts }) => (
                    <ProductCategoryRail
                        key={category.id}
                        id={category.slug}
                        title={category.name}
                        subtitle={category.description}
                        products={catProducts}
                    />
                ))}
            </div>
        </>
    );
}
