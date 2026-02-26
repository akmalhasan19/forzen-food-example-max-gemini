"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

export function AppHeader() {
  const totalItems = useCartStore((s) => s.totalItems);
  const user = useAuthStore((s) => s.user);
  const { toggleCart, toggleMobileNav } = useUiStore();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileNav}
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Snowflake className="h-7 w-7 text-teal-600" />
          <span className="text-xl font-bold text-teal-800">
            Frozen<span className="text-orange-500">Fresh</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            Produk
          </Link>
          <Link
            href="/cart"
            className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            Keranjang
          </Link>
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Auth */}
          <Link href="/profile">
            <Button variant="ghost" size="icon" aria-label="Profil">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
            aria-label="Buka keranjang"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems() > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 text-white border-0">
                {totalItems()}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
