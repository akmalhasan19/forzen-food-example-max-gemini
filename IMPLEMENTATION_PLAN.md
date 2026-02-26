# Frozen Food E-commerce MVP Plan (Decision-Complete)

## Summary
Build a greenfield Next.js 14 App Router app using `pnpm`, Tailwind, shadcn/ui, TanStack Query, and Zustand, with fully implemented Phase 1 features and lightweight but functional "Extra Mile" slices.
Data will be mock-driven through a typed service/repository layer so Supabase can be swapped in later without UI rewrites.
UI will be mobile-first, blue/teal + orange/red themed, with SEO metadata, skeleton states, inventory polling, cart persistence, delivery-slot checkout, and role-aware mock auth.

## Delivery Scope Locked
- [x] Core Features: full implementation.
- [x] Extra Mile: MVP slices.
- [x] Market defaults: US (`USD`, `lb/oz`, US datetime).
- [x] Checkout UX: 3-step wizard.
- [x] Address map: Leaflet + OpenStreetMap.
- [x] Recommendations: rule-based.
- [x] Testing: unit + integration + smoke E2E.
- [x] Data boundary: typed services + mock repository.
- [x] DB prep output: SQL schema + TS types + ERD doc.
- [x] Cold-chain model: shipping-rule formula.
- [x] Delivery slots: 2-hour windows for next 7 days.
- [x] Admin KPIs: Today/7d/30d + top products.

## Project Structure (Complete Initial Layout)
```txt
forzen-food-example-max-gemini/
  package.json
  pnpm-lock.yaml
  next.config.ts
  tsconfig.json
  postcss.config.js
  tailwind.config.ts
  components.json
  .env.example
  README.md

  database/
    schema.sql
    erd.md
    seed-notes.md

  public/
    images/
      products/
      og/
    icons/

  src/
    app/
      (shop)/
        layout.tsx
        page.tsx
        products/
          page.tsx
          [slug]/
            page.tsx
            loading.tsx
        cart/
          page.tsx
        checkout/
          page.tsx
      (account)/
        profile/
          page.tsx
        orders/
          page.tsx
      admin/
        page.tsx
        products/
          page.tsx
        orders/
          page.tsx
        inventory/
          page.tsx
      api/
        health/route.ts
      globals.css
      layout.tsx
      loading.tsx
      not-found.tsx

    components/
      ui/                     # shadcn generated components
      layout/
        app-header.tsx
        app-footer.tsx
        mobile-nav.tsx
      shared/
        price.tsx
        stock-badge.tsx
        weight-badge.tsx
        countdown-timer.tsx
        skeleton-card.tsx
      features/
        catalog/
          catalog-toolbar.tsx
          catalog-filters.tsx
          product-card.tsx
          product-list-row.tsx
          product-gallery.tsx
        cart/
          cart-drawer.tsx
          cart-item-row.tsx
          cart-summary.tsx
        checkout/
          checkout-stepper.tsx
          delivery-slot-picker.tsx
          address-form.tsx
          map-picker.tsx
          order-review.tsx
        recommendations/
          recommendation-strip.tsx
        flash-sale/
          flash-sale-banner.tsx
        admin/
          kpi-cards.tsx
          expiry-alert-table.tsx
          fulfillment-board.tsx

    hooks/
      queries/
        use-products-query.ts
        use-categories-query.ts
        use-inventory-query.ts
        use-orders-query.ts
      use-delivery-slots.ts
      use-geo-location.ts

    lib/
      constants/
        theme.ts
        shipping.ts
        filters.ts
      mock/
        products.ts
        categories.ts
        inventory-batches.ts
        users.ts
        orders.ts
        flash-sales.ts
      schemas/
        product.ts
        checkout.ts
      utils/
        cn.ts
        currency.ts
        weight.ts
        datetime.ts
        cold-chain.ts
        recommendation.ts
      seo/
        metadata.ts
        og.ts

    services/
      interfaces/
        product-service.ts
        order-service.ts
        user-service.ts
      product.service.ts
      order.service.ts
      user.service.ts
      adapters/
        mock/
          product.repository.mock.ts
          order.repository.mock.ts
          user.repository.mock.ts
        supabase/
          README.md

    store/
      cart-store.ts
      auth-store.ts
      ui-store.ts
      checkout-store.ts

    types/
      domain.ts
      database.ts
      api.ts
```

## Public Interfaces / Types (Important Contracts)
- [x] `Product`
```ts
type TemperatureRequirement = "frozen" | "chilled" | "ambient";
type DietTag = "vegan" | "keto" | "gluten_free" | "high_protein" | "halal";

interface Product {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string;
  priceCents: number;
  weightGrams: number;
  temperatureRequirement: TemperatureRequirement;
  dietTags: DietTag[];
  inventoryAvailable: number;
  flashSaleEndsAt?: string | null;
  isActive: boolean;
}
```

- [x] `CatalogFilters`
```ts
interface CatalogFilters {
  categoryIds: string[];
  minPriceCents?: number;
  maxPriceCents?: number;
  temperature?: TemperatureRequirement[];
  dietTags?: DietTag[];
  inStockOnly?: boolean;
  sortBy: "featured" | "price_asc" | "price_desc" | "newest";
  viewMode: "grid" | "list";
}
```

- [x] `CartState` (Zustand persisted)
```ts
interface CartItem {
  productId: string;
  qty: number;
  unitPriceCents: number;
  unitWeightGrams: number;
}
interface CartState {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  subtotalCents: () => number;
  totalWeightGrams: () => number;
  shippingCents: (method: "standard" | "express" | "priority_cold") => number;
}
```

- [x] Service contracts
```ts
interface ProductService {
  list(filters: CatalogFilters): Promise<Product[]>;
  bySlug(slug: string): Promise<Product | null>;
  categories(): Promise<Category[]>;
  inventorySnapshot(): Promise<Record<string, number>>;
}
```

## Supabase Schema Design (Prepared, Not Connected)
`database/schema.sql` will include:
- [x] `profiles`: `id uuid pk`, `email`, `full_name`, `role enum('admin','customer')`, `phone`, timestamps.
- [x] `categories`: `id uuid pk`, `slug unique`, `name`, `description`, `image_url`, `is_active`.
- [x] `products`: `id uuid pk`, `category_id fk`, `slug unique`, `name`, `description`, `price_cents`, `weight_grams`, `temperature_requirement enum`, `diet_tags text[]`, `image_url`, `is_flash_sale`, `flash_sale_ends_at`, `is_active`, timestamps.
- [x] `inventory_batches`: `id uuid pk`, `product_id fk`, `batch_code unique`, `quantity_available`, `received_at`, `expires_at`, `storage_temp_c`, `warehouse_location`.
- [x] `orders`: `id uuid pk`, `profile_id fk`, `status enum('pending','paid','packed','shipped','delivered','cancelled')`, `shipping_method enum`, `subtotal_cents`, `shipping_cents`, `discount_cents`, `total_cents`, `delivery_slot_start`, `delivery_slot_end`, `delivery_address jsonb`, `melting_estimate_minutes`, timestamps.
- [x] `order_items`: `id uuid pk`, `order_id fk`, `product_id fk`, `inventory_batch_id fk nullable`, `quantity`, `unit_price_cents`, `line_weight_grams`, `line_total_cents`.

Indexes/constraints:
- [x] Unique: `products.slug`, `categories.slug`, `inventory_batches.batch_code`.
- [x] Check constraints: nonnegative prices/qty/weights.
- [x] Indexes: `products(category_id, is_active)`, `products(temperature_requirement)`, `inventory_batches(product_id, expires_at)`, `orders(profile_id, created_at desc)`, `orders(status, created_at desc)`.

## Homepage Initial Code Blueprint
`src/app/(shop)/page.tsx`
```tsx
import { Metadata } from "next";
import { FlashSaleBanner } from "@/components/features/flash-sale/flash-sale-banner";
import { RecommendationStrip } from "@/components/features/recommendations/recommendation-strip";
import { ProductGallery } from "@/components/features/catalog/product-gallery";
import { getProductService } from "@/services/product.service";

export const metadata: Metadata = {
  title: "FrozenFresh | Premium Frozen Foods",
  description: "Shop frozen meals, seafood, meats, and healthy essentials with cold-chain delivery.",
};

export default async function HomePage() {
  const service = getProductService();
  const [featured, categories] = await Promise.all([
    service.list({ categoryIds: [], sortBy: "featured", viewMode: "grid" }),
    service.categories(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-cyan-700 to-teal-600 text-white p-6 md:p-10">
        <h1 className="text-3xl md:text-5xl font-bold">Frozen done right.</h1>
        <p className="mt-3 max-w-2xl text-cyan-50">
          Cold-chain protected groceries delivered in your selected time slot.
        </p>
      </section>

      <FlashSaleBanner />
      <RecommendationStrip />
      <ProductGallery
        initialProducts={featured.slice(0, 12)}
        categories={categories}
        mode="preview"
      />
    </main>
  );
}
```

## Product Gallery Initial Code Blueprint
`src/app/(shop)/products/page.tsx`
```tsx
import { Metadata } from "next";
import { ProductGallery } from "@/components/features/catalog/product-gallery";
import { getProductService } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Products | FrozenFresh",
  description: "Browse frozen foods by category, diet, temperature, and price.",
};

export default async function ProductsPage() {
  const service = getProductService();
  const [products, categories] = await Promise.all([
    service.list({ categoryIds: [], sortBy: "featured", viewMode: "grid" }),
    service.categories(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <ProductGallery initialProducts={products} categories={categories} mode="full" />
    </main>
  );
}
```

`src/components/features/catalog/product-gallery.tsx`
```tsx
"use client";

import { useMemo } from "react";
import { useProductsQuery } from "@/hooks/queries/use-products-query";
import { useInventoryQuery } from "@/hooks/queries/use-inventory-query";
import { useUiStore } from "@/store/ui-store";
import { ProductCard } from "./product-card";
import { ProductListRow } from "./product-list-row";
import { CatalogToolbar } from "./catalog-toolbar";
import { CatalogFilters } from "./catalog-filters";
import { SkeletonCard } from "@/components/shared/skeleton-card";

export function ProductGallery({ initialProducts, categories, mode }) {
  const { filters, viewMode } = useUiStore();
  const productsQuery = useProductsQuery(filters, initialProducts);
  const inventoryQuery = useInventoryQuery({ refetchInterval: 15000 });

  const products = useMemo(
    () => (productsQuery.data ?? []).map((p) => ({
      ...p,
      inventoryAvailable: inventoryQuery.data?.[p.id] ?? p.inventoryAvailable,
    })),
    [productsQuery.data, inventoryQuery.data]
  );

  return (
    <section className="space-y-4">
      <CatalogToolbar count={products.length} mode={mode} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <CatalogFilters categories={categories} />
        {productsQuery.isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}</div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => <ProductListRow key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
```

## Feature Behavior Details
- [x] Real-time inventory: React Query polling every 15s, stock badges `In Stock` / `Low Stock` / `Out of Stock`.
- [x] Cart persistence: Zustand `persist` with `localStorage` key `frozen-cart-v1`.
- [x] Weight shipping formula:
`base + (weightGrams / 500 rounded up * perHalfKgRate) + coldPackagingFee`.
- [x] Melting estimate:
`methodBaseMinutes - transitMinutes + packagingInsulationBonus - productRiskPenalty`.
- [x] Delivery slot validation:
must choose slot, slot must be future, and slot must have mock capacity > 0.
- [x] Role gating:
mock auth store with `admin` and `customer`; admin routes protected by layout guard.

## SEO / Performance Plan
- [x] Product detail pages use `generateMetadata` with canonical + OpenGraph image.
- [x] `next/image` for all product/media assets.
- [x] Route-level loading UIs and card skeletons.
- [x] Dynamic import for Leaflet map (client only, no SSR mismatch).
- [x] Query caching and stale times tuned per domain (`products: 60s`, `inventory: 15s`).

## Test Cases and Scenarios
- [x] Unit: shipping/weight calculator, melting-time formula, recommendation engine ranking.
- [x] Unit: cart store add/update/remove/rehydration.
- [x] Integration: product filters combine correctly across category/price/temp/diet.
- [x] Integration: grid/list toggle state persists and renders correct card/row component.
- [x] Integration: checkout blocks submit without delivery slot or valid address.
- [x] Integration: admin expiry alerts sort by nearest expiration.
- [x] E2E smoke: browse products -> add to cart -> choose slot/address -> place mock order.
- [x] E2E smoke: login as admin -> view KPI cards -> see low-stock + expiry alerts.

## Implementation Sequence
- [x] Scaffold Next.js + Tailwind + shadcn + base theme tokens.
- [x] Build domain types and mock repository/service layer.
- [x] Implement TanStack Query provider and Zustand stores.
- [x] Implement homepage and product gallery (grid/list/filter/inventory polling).
- [x] Implement cart with weight-based shipping and persistence.
- [x] Implement 3-step checkout with slot picker + Leaflet address picker.
- [x] Implement mock auth/profile/orders and role-protected admin pages.
- [x] Add Extra Mile slices (flash timer, recommendations, melting estimator).
- [x] Add Supabase-ready schema artifacts (`schema.sql`, `types`, `erd.md`).
- [x] Add tests and smoke E2E.

## Assumptions and Defaults
- [x] Repository initialized from empty directory (completed during scaffold phase).
- [x] `pnpm` is the package manager.
- [x] US market defaults for formatting and units.
- [x] Mock data is source of truth until Supabase adapter is enabled.
- [x] Extra Mile features are lightweight but user-visible in MVP.
- [x] No payment gateway integration in this phase (mock place-order success).

