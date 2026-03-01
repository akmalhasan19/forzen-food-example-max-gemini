"use client";

import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils/currency";
import { toast } from "sonner";
import type { Product } from "@/types/domain";

// Dedicated product objects for the homepage "Koleksi Kami" section.
// These ensure the cart displays the correct name, price, and image.
const koleksiProducts: Array<Product & { brand: string; rating: string; displayImage: string }> = [
    {
        id: "koleksi-salmon-fillet",
        slug: "salmon-fillet",
        categoryId: "cat-002",
        name: "Salmon Fillet",
        description: "Fillet salmon premium, segar dan berkualitas tinggi.",
        imageUrl: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=600&h=400&fit=crop&q=80",
        priceCents: 890,
        weightGrams: 500,
        temperatureRequirement: "frozen",
        dietTags: ["high_protein", "gluten_free"],
        inventoryAvailable: 50,
        flashSaleEndsAt: null,
        isActive: true,
        createdAt: "2025-01-10T10:00:00Z",
        brand: "Seafood",
        rating: "4.9",
        displayImage: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=600&h=400&fit=crop&q=80",
    },
    {
        id: "koleksi-wagyu-slice",
        slug: "wagyu-slice",
        categoryId: "cat-003",
        name: "Wagyu Slice",
        description: "Irisan daging wagyu premium untuk yakiniku dan shabu-shabu.",
        imageUrl: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=600&h=400&fit=crop&q=80",
        priceCents: 1250,
        weightGrams: 300,
        temperatureRequirement: "frozen",
        dietTags: ["high_protein"],
        inventoryAvailable: 30,
        flashSaleEndsAt: null,
        isActive: true,
        createdAt: "2025-01-15T10:00:00Z",
        brand: "Daging Premium",
        rating: "5.0",
        displayImage: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=600&h=400&fit=crop&q=80",
    },
    {
        id: "koleksi-dimsum-premium",
        slug: "dimsum-premium",
        categoryId: "cat-001",
        name: "Dimsum Premium",
        description: "Dimsum isi ayam dan udang, dibuat dengan bahan pilihan.",
        imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=400&fit=crop&q=80",
        priceCents: 450,
        weightGrams: 400,
        temperatureRequirement: "frozen",
        dietTags: [],
        inventoryAvailable: 60,
        flashSaleEndsAt: null,
        isActive: true,
        createdAt: "2025-02-01T10:00:00Z",
        brand: "Olahan",
        rating: "4.8",
        displayImage: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=400&fit=crop&q=80",
    },
    {
        id: "koleksi-udang-vaname",
        slug: "udang-vaname",
        categoryId: "cat-002",
        name: "Udang Vaname",
        description: "Udang vaname segar, cocok untuk berbagai masakan.",
        imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=400&fit=crop&q=80",
        priceCents: 720,
        weightGrams: 500,
        temperatureRequirement: "frozen",
        dietTags: ["high_protein", "gluten_free"],
        inventoryAvailable: 40,
        flashSaleEndsAt: null,
        isActive: true,
        createdAt: "2025-01-20T10:00:00Z",
        brand: "Seafood",
        rating: "4.7",
        displayImage: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=400&fit=crop&q=80",
    },
];

export function KoleksiProductGrid() {
    const addItem = useCartStore((s) => s.addItem);

    return (
        <>
            {koleksiProducts.map((product) => {
                const displayPrice = formatPrice(product.priceCents);

                return (
                    <div
                        key={product.id}
                        className="reveal-slide-up group bg-white dark:bg-zinc-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-5 z-20">
                            <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/50 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                <span className="material-icons-round text-xl">
                                    favorite_border
                                </span>
                            </button>
                        </div>
                        <div className="h-48 w-full rounded-2xl mb-4 relative overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt={product.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                src={product.displayImage}
                            />
                        </div>
                        <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                                        {product.brand}
                                    </p>
                                    <h4 className="font-display font-bold text-xl text-gray-900 dark:text-white leading-tight">
                                        {product.name}
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mb-4">
                                <span className="material-icons-round text-yellow-400 text-sm">
                                    star
                                </span>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {product.rating}
                                </span>
                            </div>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                                    {displayPrice}
                                </span>
                                <button
                                    className="w-12 h-12 rounded-2xl bg-[#93C572] text-white hover:bg-green-700 shadow-lg hover:shadow-green-700/50 dark:hover:shadow-none flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer"
                                    onClick={() => {
                                        addItem(product);
                                        toast.success(`${product.name} ditambahkan ke keranjang`);
                                    }}
                                >
                                    <span className="material-icons-round">add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
