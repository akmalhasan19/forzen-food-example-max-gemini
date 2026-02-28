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
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 font-body transition-colors duration-300 selection:bg-amber-200 selection:text-black pb-16 md:pb-0">
      <AppHeader />
      <MobileNav />
      <CartDrawer />

      <div className="flex-1">
        {children}
      </div>

      <AppFooter />
    </div>
  );
}
