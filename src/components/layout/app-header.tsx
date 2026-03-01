"use client";

import { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils/currency";
import { ProfileDropdown } from "./profile-dropdown";

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
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/products" },
              { label: "Contact", href: "/contact" },
              ...(user?.role === "admin" ? [{ label: "Admin", href: "/admin" }] : []),
            ].map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === pathname) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`relative font-medium transition-colors ${isActive
                    ? "text-[#93C572] dark:text-[#93C572]"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <svg
                      className="absolute w-[120%] h-3 -bottom-1 -left-[10%] -z-10 text-[#93C572]"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 20"
                    >
                      <path
                        d="M0 15 Q 50 25 100 15"
                        fill="none"
                        opacity="0.6"
                        stroke="currentColor"
                        strokeWidth="12"
                      />
                    </svg>
                  )}
                </Link>
              );
            })}
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

            <ProfileDropdown />

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
