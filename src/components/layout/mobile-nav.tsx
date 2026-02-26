"use client";

import Link from "next/link";
import { Home, ShoppingBag, ShoppingCart, User, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUiStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";

export function MobileNav() {
  const { mobileNavOpen, toggleMobileNav } = useUiStore();
  const user = useAuthStore((s) => s.user);

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
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-teal-800">
            Frozen<span className="text-orange-500">Fresh</span>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={toggleMobileNav}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
