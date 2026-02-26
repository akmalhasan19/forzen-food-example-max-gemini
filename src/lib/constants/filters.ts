import type { CatalogFilters, DietTag, TemperatureRequirement } from "@/types/domain";

export const DEFAULT_FILTERS: CatalogFilters = {
  categoryIds: [],
  sortBy: "featured",
  viewMode: "grid",
  inStockOnly: false,
};

export const SORT_OPTIONS = [
  { value: "featured", label: "Unggulan" },
  { value: "price_asc", label: "Harga: Rendah ke Tinggi" },
  { value: "price_desc", label: "Harga: Tinggi ke Rendah" },
  { value: "newest", label: "Terbaru" },
] as const;

export const TEMPERATURE_OPTIONS: { value: TemperatureRequirement; label: string; color: string }[] = [
  { value: "frozen", label: "Beku", color: "bg-blue-100 text-blue-800" },
  { value: "chilled", label: "Dingin", color: "bg-cyan-100 text-cyan-800" },
  { value: "ambient", label: "Suhu Ruang", color: "bg-amber-100 text-amber-800" },
];

export const DIET_TAG_OPTIONS: { value: DietTag; label: string }[] = [
  { value: "vegan", label: "Vegan" },
  { value: "keto", label: "Keto" },
  { value: "gluten_free", label: "Bebas Gluten" },
  { value: "high_protein", label: "Tinggi Protein" },
  { value: "halal", label: "Halal" },
];

export const PRICE_RANGE = {
  min: 0,
  max: 10000, // Rp100.000 dalam sen
  step: 100,
} as const;
