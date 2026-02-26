import type { Product } from "@/types/domain";
import { formatPrice } from "@/lib/utils/currency";
import { APP_URL } from "@/lib/constants/theme";

/**
 * Build OpenGraph description for a product
 */
export function productOgDescription(product: Product): string {
  return `${product.name} — ${formatPrice(product.priceCents)}. ${product.description.slice(0, 120)}`;
}

/**
 * Build canonical URL for product
 */
export function productCanonicalUrl(slug: string): string {
  return `${APP_URL}/products/${slug}`;
}
