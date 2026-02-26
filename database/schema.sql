-- ============================================================
-- FrozenFresh – Supabase-Ready Schema
-- ============================================================
-- This file is an artifact prepared for future Supabase migration.
-- Currently the app uses mock data; enable this when connecting to a real DB.
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Enums ────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('admin', 'customer');
CREATE TYPE temperature_requirement AS ENUM ('frozen', 'chilled', 'ambient');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'packed', 'shipped', 'delivered', 'cancelled');
CREATE TYPE shipping_method AS ENUM ('standard', 'express', 'priority_cold');

-- ── Profiles ─────────────────────────────────────────────────
CREATE TABLE profiles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT NOT NULL,
  role        user_role NOT NULL DEFAULT 'customer',
  phone       TEXT NOT NULL DEFAULT '',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Categories ───────────────────────────────────────────────
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url   TEXT NOT NULL DEFAULT '',
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Products ─────────────────────────────────────────────────
CREATE TABLE products (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id              UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  slug                     TEXT NOT NULL UNIQUE,
  name                     TEXT NOT NULL,
  description              TEXT NOT NULL DEFAULT '',
  image_url                TEXT NOT NULL DEFAULT '',
  price_cents              INTEGER NOT NULL CHECK (price_cents >= 0),
  weight_grams             INTEGER NOT NULL CHECK (weight_grams > 0),
  temperature_requirement  temperature_requirement NOT NULL DEFAULT 'frozen',
  diet_tags                TEXT[] NOT NULL DEFAULT '{}',
  is_flash_sale            BOOLEAN NOT NULL DEFAULT FALSE,
  flash_sale_ends_at       TIMESTAMPTZ,
  is_active                BOOLEAN NOT NULL DEFAULT TRUE,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Inventory Batches ────────────────────────────────────────
CREATE TABLE inventory_batches (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id          UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  batch_code          TEXT NOT NULL UNIQUE,
  quantity_available  INTEGER NOT NULL CHECK (quantity_available >= 0),
  received_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at          TIMESTAMPTZ NOT NULL,
  storage_temp_c      NUMERIC(5,2) NOT NULL,
  warehouse_location  TEXT NOT NULL DEFAULT ''
);

-- ── Orders ───────────────────────────────────────────────────
CREATE TABLE orders (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id                UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  status                    order_status NOT NULL DEFAULT 'pending',
  shipping_method           shipping_method NOT NULL DEFAULT 'standard',
  subtotal_cents            INTEGER NOT NULL CHECK (subtotal_cents >= 0),
  shipping_cents            INTEGER NOT NULL CHECK (shipping_cents >= 0),
  discount_cents            INTEGER NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  total_cents               INTEGER NOT NULL CHECK (total_cents >= 0),
  delivery_slot_start       TIMESTAMPTZ NOT NULL,
  delivery_slot_end         TIMESTAMPTZ NOT NULL,
  delivery_address          JSONB NOT NULL,
  melting_estimate_minutes  INTEGER NOT NULL DEFAULT 0,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Order Items ──────────────────────────────────────────────
CREATE TABLE order_items (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id           UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id         UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  inventory_batch_id UUID REFERENCES inventory_batches(id) ON DELETE SET NULL,
  quantity           INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_cents   INTEGER NOT NULL CHECK (unit_price_cents >= 0),
  line_weight_grams  INTEGER NOT NULL CHECK (line_weight_grams >= 0),
  line_total_cents   INTEGER NOT NULL CHECK (line_total_cents >= 0)
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_products_temperature     ON products(temperature_requirement);
CREATE INDEX idx_products_slug            ON products(slug);

CREATE INDEX idx_inventory_product_expiry ON inventory_batches(product_id, expires_at);
CREATE INDEX idx_inventory_expires        ON inventory_batches(expires_at);

CREATE INDEX idx_orders_profile_created   ON orders(profile_id, created_at DESC);
CREATE INDEX idx_orders_status_created    ON orders(status, created_at DESC);

CREATE INDEX idx_order_items_order        ON order_items(order_id);
CREATE INDEX idx_order_items_product      ON order_items(product_id);

-- ── Updated-at Trigger ───────────────────────────────────────
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
