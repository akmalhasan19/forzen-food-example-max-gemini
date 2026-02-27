"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import { MOCK_CATEGORIES } from "@/lib/mock/categories";
import { formatCurrency } from "@/lib/utils/currency";
import { formatWeight } from "@/lib/utils/weight";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");

  const categoryMap = new Map(MOCK_CATEGORIES.map((c) => [c.id, c.name]));

  const filtered = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produk</h1>
          <p className="text-sm text-slate-500">
            {MOCK_PRODUCTS.length} total produk
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Produk</th>
                  <th className="px-4 py-3 font-medium">Kategori</th>
                  <th className="px-4 py-3 font-medium">Harga</th>
                  <th className="px-4 py-3 font-medium">Berat</th>
                  <th className="px-4 py-3 font-medium">Stok</th>
                  <th className="px-4 py-3 font-medium">Suhu</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-slate-400">{product.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {categoryMap.get(product.categoryId) ?? product.categoryId}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatCurrency(product.priceCents)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatWeight(product.weightGrams)}
                    </td>
                    <td className="px-4 py-3">
                      {product.inventoryAvailable === 0 ? (
                        <Badge className="bg-red-100 text-red-800 border-0">
                          Stok Habis
                        </Badge>
                      ) : product.inventoryAvailable <= 10 ? (
                        <Badge className="bg-orange-100 text-orange-800 border-0">
                          Sedikit ({product.inventoryAvailable})
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border-0">
                          {product.inventoryAvailable}
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className="capitalize text-xs"
                      >
                        {product.temperatureRequirement}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {product.isActive ? (
                        <Badge className="bg-green-100 text-green-800 border-0">
                          Aktif
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-600 border-0">
                          Nonaktif
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-slate-400 py-8">
              Tidak ada produk yang sesuai pencarian.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
