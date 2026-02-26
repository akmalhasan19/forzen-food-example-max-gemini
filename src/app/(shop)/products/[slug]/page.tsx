import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductService } from "@/services/product.service";
import { buildMetadata } from "@/lib/seo/metadata";
import { productOgDescription } from "@/lib/seo/og";
import { ProductDetailClient } from "./product-detail-client";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductService().bySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: productOgDescription(product),
    path: `/products/${slug}`,
    image: product.imageUrl,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const service = getProductService();
  const product = await service.bySlug(slug);

  if (!product) {
    notFound();
  }

  const [categories, allProducts] = await Promise.all([
    service.categories(),
    service.list({ categoryIds: [], sortBy: "featured", viewMode: "grid" }),
  ]);

  const category = categories.find((c) => c.id === product.categoryId);

  return <ProductDetailClient product={product} category={category ?? null} allProducts={allProducts} />;
}
