import type { ShippingMethod } from "@/types/domain";

export interface ShippingRate {
  method: ShippingMethod;
  label: string;
  description: string;
  baseCents: number;
  perHalfKgCents: number;
  coldPackagingCents: number;
  estimatedDays: string;
  methodBaseMinutes: number;
}

export const SHIPPING_RATES: Record<ShippingMethod, ShippingRate> = {
  standard: {
    method: "standard",
    label: "Pengiriman Standar",
    description: "Kemasan insulasi, 3-5 hari kerja",
    baseCents: 599,
    perHalfKgCents: 99,
    coldPackagingCents: 199,
    estimatedDays: "3-5 hari",
    methodBaseMinutes: 300,
  },
  express: {
    method: "express",
    label: "Pengiriman Ekspres",
    description: "Kemasan dingin premium, 1-2 hari kerja",
    baseCents: 999,
    perHalfKgCents: 149,
    coldPackagingCents: 299,
    estimatedDays: "1-2 hari",
    methodBaseMinutes: 180,
  },
  priority_cold: {
    method: "priority_cold",
    label: "Prioritas Rantai Dingin",
    description: "Dijamin beku, pengiriman hari ini/besok",
    baseCents: 1499,
    perHalfKgCents: 199,
    coldPackagingCents: 499,
    estimatedDays: "Hari ini/besok",
    methodBaseMinutes: 90,
  },
} as const;

export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
export const PACKAGING_INSULATION_BONUS_MINUTES = 30;
