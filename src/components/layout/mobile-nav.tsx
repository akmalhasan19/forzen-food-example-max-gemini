"use client";

import Link from "next/link";
import { Home, ShoppingBag, ShoppingCart, User, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUiStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { useState, useEffect } from "react";

export function MobileNav() {
  const { mobileNavOpen, toggleMobileNav } = useUiStore();
  const user = useAuthStore((s) => s.user);

  // Dark mode state – sync with the <html> classList
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, [mobileNavOpen]);

  const toggleDarkMode = () => {
    const dark = document.documentElement.classList.toggle("dark");
    sessionStorage.setItem("theme", dark ? "dark" : "light");
    setIsDark(dark);
  };

  const links = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/products", label: "Produk", icon: ShoppingBag },
    { href: "/cart", label: "Keranjang", icon: ShoppingCart },
    { href: "/profile", label: "Profil", icon: User },
  ];

  if (user?.role === "admin") {
    links.push({ href: "/admin", label: "Admin", icon: Shield });
  }

  return (
    <Sheet open={mobileNavOpen} onOpenChange={toggleMobileNav}>
      <SheetContent
        side="top"
        className="rounded-b-3xl px-5 pb-6 pt-4"
        showCloseButton={false}
      >
        {/* Header row: logo + close button */}
        <SheetHeader className="p-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <span className="material-icons-round text-2xl text-[#93C572]">eco</span>
              <span className="font-display font-bold text-xl tracking-tight">
                Cold<span className="text-[#93C572]">Fresh</span>
              </span>
            </SheetTitle>
            <button
              onClick={toggleMobileNav}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <span className="material-icons-round text-xl">close</span>
            </button>
          </div>
        </SheetHeader>

        <Separator className="my-3" />

        {/* Navigation links */}
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={toggleMobileNav}>
              <Button variant="ghost" className="w-full justify-start gap-3 text-base">
                <link.icon className="h-5 w-5" />
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <Separator className="my-3" />

        {/* Dark mode toggle */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <span className="material-icons-round text-xl text-gray-500 dark:text-gray-400">
              {isDark ? "dark_mode" : "light_mode"}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isDark ? "Mode Gelap" : "Mode Terang"}
            </span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${isDark
                ? "bg-[#93C572]"
                : "bg-gray-300 dark:bg-gray-600"
              }`}
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isDark ? "translate-x-5" : "translate-x-0"
                }`}
            />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
