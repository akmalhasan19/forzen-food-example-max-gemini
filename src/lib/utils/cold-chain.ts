import { SHIPPING_RATES, PACKAGING_INSULATION_BONUS_MINUTES } from "@/lib/constants/shipping";
import type { ShippingMethod, TemperatureRequirement } from "@/types/domain";

/**
 * Calculate shipping cost using weight-based + distance-based formula:
 * base + (weightGrams / 500 rounded up * perHalfKgRate) + coldPackagingFee + (distanceKm * perKmRate)
 */
export function calculateShippingCents(
  weightGrams: number,
  method: ShippingMethod,
  distanceKm: number = 0
): number {
  const rate = SHIPPING_RATES[method];
  const halfKgUnits = Math.ceil(weightGrams / 500);
  const distanceSurcharge = Math.ceil(distanceKm) * rate.perKmCents;
  return rate.baseCents + halfKgUnits * rate.perHalfKgCents + rate.coldPackagingCents + distanceSurcharge;
}

/**
 * Estimate melting time based on shipping method and product temperature:
 * methodBaseMinutes - transitMinutes + packagingInsulationBonus - productRiskPenalty
 */
export function estimateMeltingMinutes(
  method: ShippingMethod,
  temperature: TemperatureRequirement,
  transitMinutes: number = 60
): number {
  const rate = SHIPPING_RATES[method];

  const riskPenalty: Record<TemperatureRequirement, number> = {
    frozen: 60,
    chilled: 30,
    ambient: 0,
  };

  const estimate =
    rate.methodBaseMinutes -
    transitMinutes +
    PACKAGING_INSULATION_BONUS_MINUTES -
    riskPenalty[temperature];

  return Math.max(0, estimate);
}

/**
 * Get a human-readable cold-chain status
 */
export function coldChainStatus(
  meltingMinutes: number
): { label: string; variant: "safe" | "warning" | "critical" } {
  if (meltingMinutes > 120) return { label: "Aman", variant: "safe" };
  if (meltingMinutes > 60) return { label: "Sedang", variant: "warning" };
  return { label: "Berisiko", variant: "critical" };
}
