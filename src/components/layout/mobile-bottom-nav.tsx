"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

const navItems = [
    { label: "Home", href: "/", icon: "home" },
    { label: "Shop", href: "/products", icon: "store" },
    { label: "Cart", href: "/cart", icon: "shopping_cart", isCart: true },
    { label: "Profile", href: "/profile", icon: "person" },
];

export function MobileBottomNav() {
    const pathname = usePathname();
    const totalItems = useCartStore((s) => s.totalItems);
    const { toggleCart } = useUiStore();

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(totalItems());
    });

    useEffect(() => {
        const unsub = useCartStore.subscribe(() => {
            setCartCount(useCartStore.getState().totalItems());
        });
        return unsub;
    }, []);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 pb-safe md:hidden shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

                    // Use toggleCart for the Cart item to mimic header behavior if desired,
                    // but since href is /cart let's allow actual navigation if that's what the mobile sheet did.
                    // Let's stick to true navigation for simplicity unless they want a drawer on mobile too.
                    const isCart = item.isCart;

                    return (
                        <div key={item.label} className="relative flex-1">
                            {isCart ? (
                                <button
                                    onClick={toggleCart}
                                    className="w-full flex flex-col items-center justify-center gap-1 h-full text-gray-500 hover:text-primary dark:text-gray-400 py-1"
                                >
                                    <div className="relative">
                                        <span className="material-icons-round text-2xl">
                                            {item.icon}
                                        </span>
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white dark:border-zinc-900">
                                                {cartCount}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-medium tracking-wide">
                                        {item.label}
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`w-full flex flex-col items-center justify-center gap-1 h-full py-1 ${isActive
                                        ? "text-[#93C572] dark:text-[#93C572]"
                                        : "text-gray-500 hover:text-primary dark:text-gray-400"
                                        }`}
                                >
                                    <span className="material-icons-round text-2xl">
                                        {item.icon}
                                    </span>
                                    <span className={`text-[10px] font-medium tracking-wide ${isActive ? "font-bold" : ""}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
