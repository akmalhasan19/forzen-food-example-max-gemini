import { Metadata } from "next";
import { ShopMain } from "@/components/features/catalog/shop-main";
import { getProductService } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Shop | ColdFresh",
  description:
    "Jelajahi makanan beku premium — dari daging segar, seafood pilihan, hingga sayuran dan olahan siap masak.",
};

export default async function ProductsPage() {
  const service = getProductService();
  const [products, categories] = await Promise.all([
    service.list({ categoryIds: [], sortBy: "featured", viewMode: "grid" }),
    service.categories(),
  ]);

  return (
    <main className="pt-0">
      <ShopMain products={products} categories={categories} />
    </main>
  );
}
