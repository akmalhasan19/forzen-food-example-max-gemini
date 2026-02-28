"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils/currency";

export function AppHeader() {
  const totalItems = useCartStore((s) => s.totalItems);
  const subtotalCents = useCartStore((s) => s.subtotalCents);
  const user = useAuthStore((s) => s.user);
  const { toggleCart, toggleMobileNav } = useUiStore();
  const pathname = usePathname();
  const isShopRoute = pathname?.startsWith("/products");

  // Defer cart count/total to avoid hydration mismatch with persisted Zustand store
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    setCartCount(totalItems());
    setCartTotal(subtotalCents());
  });
  // Also subscribe to store changes so the badge/price stays reactive
  useEffect(() => {
    const unsub = useCartStore.subscribe(() => {
      setCartCount(useCartStore.getState().totalItems());
      setCartTotal(useCartStore.getState().subtotalCents());
    });
    return unsub;
  }, []);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-neutral-50/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <span className="material-icons-round text-3xl text-[#93C572]">
              eco
            </span>
            <span className="font-display font-bold text-2xl tracking-tight">
              Cold<span className="text-[#93C572]">Fresh</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className="text-gray-900 dark:text-gray-100 font-medium hover:text-[#93C572] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Shop
            </Link>

            <Link
              href="/contact"
              className="text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Contact
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="material-icons-round">search</span>
            </button>
            <div
              className="relative group cursor-pointer"
              onClick={toggleCart}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleCart()}
              aria-label="Open cart"
            >
              <div
                className={`flex items-center justify-center shadow-lg transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 bg-[#93C572] ${isShopRoute && cartCount > 0
                  ? "px-5 py-2.5 rounded-xl text-black max-md:w-11 max-md:h-11 max-md:p-0 max-md:text-white"
                  : "w-11 h-11 rounded-xl text-white"
                  }`}
              >
                <span className="material-icons-round text-[20px] transition-colors duration-300">
                  shopping_bag
                </span>

                {/* Price Label (Expands on Desktop, hidden on Mobile) */}
                <span
                  className={`font-bold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hidden md:block ${isShopRoute && cartCount > 0
                    ? "max-w-[150px] ml-3 opacity-100"
                    : "max-w-0 ml-0 opacity-0"
                    }`}
                >
                  {formatPrice(cartTotal)}
                </span>

                {/* Counter Badge */}
                <span
                  className={`absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
                    // Desktop: Show if not expanded (or not shop route). Mobile: Show always if > 0
                    (!isShopRoute || cartCount === 0) && cartCount > 0
                      ? "opacity-100 scale-100 max-md:opacity-100 max-md:scale-100"
                      : "opacity-0 scale-50 pointer-events-none max-md:opacity-100 max-md:scale-100 max-md:pointer-events-auto"
                    } ${cartCount === 0 ? "hidden" : ""}`}
                >
                  {cartCount}
                </span>
              </div>
            </div>

            {/* Desktop User Avatar (mock layout) */}
            <div className="hidden md:flex ml-2 h-10 w-10 bg-teal-100 rounded-full border-2 border-white shadow-sm overflow-hidden items-end justify-center">
              {/* using an arbitrary user-like visual to match reference */}
              <span className="material-icons-round text-3xl text-teal-700 relative top-1">person</span>
            </div>

            {/* Mobile menu button (Hidden - Replaced by Bottom Nav) */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden"
              onClick={toggleMobileNav}
              aria-label="Open menu"
            >
              <span className="material-icons-round">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
