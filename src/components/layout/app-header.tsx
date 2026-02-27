"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

export function AppHeader() {
  const totalItems = useCartStore((s) => s.totalItems);
  const user = useAuthStore((s) => s.user);
  const { toggleCart, toggleMobileNav } = useUiStore();

  // Defer cart count to avoid hydration mismatch with persisted Zustand store
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(totalItems());
  });
  // Also subscribe to store changes so the badge stays reactive
  useEffect(() => {
    const unsub = useCartStore.subscribe(() => {
      setCartCount(useCartStore.getState().totalItems());
    });
    return unsub;
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    sessionStorage.setItem("theme", isDark ? "dark" : "light");
  };

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
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Our Story
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Contact
            </a>
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
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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
              <div className="bg-[#93C572] text-white p-3 rounded-2xl flex items-center justify-center shadow-lg transform transition group-hover:scale-105">
                <span className="material-icons-round">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-2"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              <span className="material-icons-round dark:hidden">
                dark_mode
              </span>
              <span className="material-icons-round hidden dark:block">
                light_mode
              </span>
            </button>
            {/* Mobile menu button */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
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
