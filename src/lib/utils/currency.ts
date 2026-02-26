/**
 * Format cents to IDR currency string
 */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents * 100);
}

/**
 * Format cents to a compact representation (e.g. Rp12.900)
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents * 100);
}

/**
 * Calculate discount percentage
 */
export function discountPercent(originalCents: number, saleCents: number): number {
  if (originalCents <= 0) return 0;
  return Math.round(((originalCents - saleCents) / originalCents) * 100);
}
