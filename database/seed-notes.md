# FrozenFresh – Seed Data Notes

## Overview

The application ships with a comprehensive mock data layer (`src/lib/mock/`) that mirrors
the Supabase schema structure. When migrating to a live database, these files serve as
the source for seed scripts.

## Mock Data Inventory

| Entity           | File                     | Count | Notes                                       |
| ---------------- | ------------------------ | ----- | ------------------------------------------- |
| Categories       | `mock/categories.ts`     | 6     | Frozen Meals, Seafood, Meats, Vegetables, Desserts, Healthy Essentials |
| Products         | `mock/products.ts`       | 20    | Spread across all 6 categories              |
| Inventory Batches| `mock/inventory-batches.ts`| 20  | One batch per product, varied expiry dates   |
| Users            | `mock/users.ts`          | 2     | 1 admin + 1 customer                        |
| Orders           | `mock/orders.ts`         | 2     | Sample delivered and pending orders          |
| Flash Sales      | `mock/flash-sales.ts`    | 2     | Shrimp 25% off, Lava Cakes 33% off          |

## Generating SQL Seed

To convert mock data into SQL INSERT statements:

1. Import the mock arrays
2. Map each object to the snake_case schema columns
3. Handle type conversions:
   - `id` → UUID (mock uses `prod-001` style, replace with `uuid_generate_v4()` or keep deterministic UUIDs)
   - `dietTags` → PostgreSQL array literal `'{vegan,keto}'`
   - `deliveryAddress` → JSONB `'{"fullName": "...", ...}'::jsonb`
   - Dates → `TIMESTAMPTZ` format

## Data Constraints

- All `priceCents` are positive integers (cheapest: 399, most expensive: 2799)
- All `weightGrams` ≥ 200g
- `inventoryAvailable` ranges from 0 (out of stock) to 80
- Expiry dates span from near-past (for testing alerts) to 1+ year ahead
- Storage temps range from -25°C (deep frozen) to 4°C (chilled)
- Two warehouse locations: "Freezer-A" and "Freezer-B"

## Recommended Seed Order

Due to foreign key constraints, seed tables in this order:

1. `profiles` (no dependencies)
2. `categories` (no dependencies)
3. `products` (depends on `categories`)
4. `inventory_batches` (depends on `products`)
5. `orders` (depends on `profiles`)
6. `order_items` (depends on `orders`, `products`, optionally `inventory_batches`)
