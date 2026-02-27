import { Metadata } from "next";
import { ProductGallery } from "@/components/features/catalog/product-gallery";
import { getProductService } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Produk | FrozenFresh",
  description: "Jelajahi makanan beku berdasarkan kategori, diet, suhu, dan harga.",
};

export default async function ProductsPage() {
  const service = getProductService();
  const [products, categories] = await Promise.all([
    service.list({ categoryIds: [], sortBy: "featured", viewMode: "grid" }),
    service.categories(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Semua Produk</h1>
      <ProductGallery initialProducts={products} categories={categories} mode="full" />
    </main>
  );
}
