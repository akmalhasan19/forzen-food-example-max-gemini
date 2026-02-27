import { Metadata } from "next";
import { FlashSaleBanner } from "@/components/features/flash-sale/flash-sale-banner";
import { RecommendationStrip } from "@/components/features/recommendations/recommendation-strip";
import { ProductGallery } from "@/components/features/catalog/product-gallery";
import { getProductService } from "@/services/product.service";

export const metadata: Metadata = {
  title: "FrozenFresh | Makanan Beku Premium",
  description: "Belanja makanan beku, seafood, daging, dan kebutuhan sehat dengan pengiriman rantai dingin.",
};

export default async function HomePage() {
  const service = getProductService();
  const [featured, categories] = await Promise.all([
    service.list({ categoryIds: [], sortBy: "featured", viewMode: "grid" }),
    service.categories(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-8">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-r from-cyan-700 to-teal-600 text-white p-6 md:p-10">
        <h1 className="text-3xl md:text-5xl font-bold">Beku yang tepat.</h1>
        <p className="mt-3 max-w-2xl text-cyan-50">
          Belanjaan dilindungi rantai dingin, dikirim sesuai jadwal pilihan Anda.
        </p>
      </section>

      <FlashSaleBanner />
      <RecommendationStrip />

      {/* Featured Products */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Produk Unggulan</h2>
        <ProductGallery
          initialProducts={featured.slice(0, 12)}
          categories={categories}
          mode="preview"
        />
      </div>
    </main>
  );
}
