import Link from "next/link";
import { Snowflake } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AppFooter() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Snowflake className="h-6 w-6 text-teal-600" />
              <span className="text-lg font-bold text-teal-800">
                Frozen<span className="text-orange-500">Fresh</span>
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Makanan beku premium dengan pengiriman rantai dingin. Rasa segar, kemudahan beku.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Belanja</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/products" className="hover:text-teal-600 transition-colors">Semua Produk</Link></li>
              <li><Link href="/products?category=frozen-meals" className="hover:text-teal-600 transition-colors">Makanan Beku</Link></li>
              <li><Link href="/products?category=seafood" className="hover:text-teal-600 transition-colors">Seafood</Link></li>
              <li><Link href="/products?category=meats" className="hover:text-teal-600 transition-colors">Daging & Unggas</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Bantuan</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><span className="hover:text-teal-600 cursor-pointer transition-colors">Info Pengiriman</span></li>
              <li><span className="hover:text-teal-600 cursor-pointer transition-colors">Garansi Rantai Dingin</span></li>
              <li><span className="hover:text-teal-600 cursor-pointer transition-colors">Kebijakan Pengembalian</span></li>
              <li><span className="hover:text-teal-600 cursor-pointer transition-colors">FAQ</span></li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Akun</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/profile" className="hover:text-teal-600 transition-colors">Profil Saya</Link></li>
              <li><Link href="/orders" className="hover:text-teal-600 transition-colors">Riwayat Pesanan</Link></li>
              <li><Link href="/cart" className="hover:text-teal-600 transition-colors">Keranjang Belanja</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} FrozenFresh. Hak cipta dilindungi.</p>
          <p>Pengiriman dilindungi rantai dingin.</p>
        </div>
      </div>
    </footer>
  );
}
