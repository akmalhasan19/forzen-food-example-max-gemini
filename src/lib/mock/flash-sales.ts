import type { FlashSale } from "@/types/domain";

export const MOCK_FLASH_SALES: FlashSale[] = [
  {
    id: "flash-001",
    productId: "prod-006",
    originalPriceCents: 1599,
    salePriceCents: 1199,
    endsAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    label: "🔥 Flash Sale — 25% Off Jumbo Shrimp!",
  },
  {
    id: "flash-002",
    productId: "prod-015",
    originalPriceCents: 899,
    salePriceCents: 599,
    endsAt: new Date(Date.now() + 86400000).toISOString(),
    label: "🍫 Chocolate Lava Cakes — 33% Off!",
  },
];
