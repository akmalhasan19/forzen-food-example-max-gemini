import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CartDrawer } from "@/components/features/cart/cart-drawer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <MobileNav />
      <CartDrawer />
      <div className="flex-1">{children}</div>
      <AppFooter />
    </div>
  );
}
