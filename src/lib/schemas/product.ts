import { z } from "zod/v4";

export const ProductFilterSchema = z.object({
  categoryIds: z.array(z.string()).default([]),
  minPriceCents: z.number().min(0).optional(),
  maxPriceCents: z.number().min(0).optional(),
  temperature: z.array(z.enum(["frozen", "chilled", "ambient"])).optional(),
  dietTags: z.array(z.enum(["vegan", "keto", "gluten_free", "high_protein", "halal"])).optional(),
  inStockOnly: z.boolean().optional(),
  sortBy: z.enum(["featured", "price_asc", "price_desc", "newest"]).default("featured"),
  viewMode: z.enum(["grid", "list"]).default("grid"),
});

export type ProductFilterInput = z.infer<typeof ProductFilterSchema>;
