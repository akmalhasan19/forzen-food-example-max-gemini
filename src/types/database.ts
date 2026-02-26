// Database-level types (mirrors Supabase schema)

export type DbRole = "admin" | "customer";
export type DbTemperature = "frozen" | "chilled" | "ambient";
export type DbOrderStatus = "pending" | "paid" | "packed" | "shipped" | "delivered" | "cancelled";
export type DbShippingMethod = "standard" | "express" | "priority_cold";

export interface DbProfile {
  id: string;
  email: string;
  full_name: string;
  role: DbRole;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface DbCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  is_active: boolean;
}

export interface DbProduct {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  description: string;
  price_cents: number;
  weight_grams: number;
  temperature_requirement: DbTemperature;
  diet_tags: string[];
  image_url: string;
  is_flash_sale: boolean;
  flash_sale_ends_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbInventoryBatch {
  id: string;
  product_id: string;
  batch_code: string;
  quantity_available: number;
  received_at: string;
  expires_at: string;
  storage_temp_c: number;
  warehouse_location: string;
}

export interface DbOrder {
  id: string;
  profile_id: string;
  status: DbOrderStatus;
  shipping_method: DbShippingMethod;
  subtotal_cents: number;
  shipping_cents: number;
  discount_cents: number;
  total_cents: number;
  delivery_slot_start: string;
  delivery_slot_end: string;
  delivery_address: Record<string, unknown>;
  melting_estimate_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  inventory_batch_id: string | null;
  quantity: number;
  unit_price_cents: number;
  line_weight_grams: number;
  line_total_cents: number;
}
