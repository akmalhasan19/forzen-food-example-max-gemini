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
    <div className="flex min-h-screen flex-col bg-[#064C4F]">
      <AppHeader />
      <MobileNav />
      <CartDrawer />

      {/* GClippedContainer — content sheet with curved top overlapping header */}
      <div className="gromuse-content-sheet flex-1">
        <div className="gromuse-drag-handle" />
        {children}
      </div>

      <AppFooter />
    </div>
  );
}
