// ─── Temperature & Diet Enums ────────────────────────────
export type TemperatureRequirement = "frozen" | "chilled" | "ambient";
export type DietTag = "vegan" | "keto" | "gluten_free" | "high_protein" | "halal";

// ─── Category ────────────────────────────────────────────
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}

// ─── Product ─────────────────────────────────────────────
export interface Product {
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
  createdAt: string;
}

// ─── Inventory Batch ─────────────────────────────────────
export interface InventoryBatch {
  id: string;
  productId: string;
  batchCode: string;
  quantityAvailable: number;
  receivedAt: string;
  expiresAt: string;
  storageTempC: number;
  warehouseLocation: string;
}

// ─── Cart ────────────────────────────────────────────────
export interface CartItem {
  productId: string;
  qty: number;
  unitPriceCents: number;
  unitWeightGrams: number;
  name: string;
  imageUrl: string;
  slug: string;
  brand?: string;
}

export type ShippingMethod = "standard" | "express" | "priority_cold";

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  subtotalCents: () => number;
  totalWeightGrams: () => number;
  totalItems: () => number;
  shippingCents: (method: ShippingMethod) => number;
}

// ─── Catalog Filters ─────────────────────────────────────
export type SortOption = "featured" | "price_asc" | "price_desc" | "newest";
export type ViewMode = "grid" | "list";

export interface CatalogFilters {
  categoryIds: string[];
  minPriceCents?: number;
  maxPriceCents?: number;
  temperature?: TemperatureRequirement[];
  dietTags?: DietTag[];
  inStockOnly?: boolean;
  sortBy: SortOption;
  viewMode: ViewMode;
}

// ─── Order ───────────────────────────────────────────────
export type OrderStatus = "pending" | "paid" | "packed" | "shipped" | "delivered" | "cancelled";

export interface DeliveryAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  lat?: number;
  lng?: number;
}

export interface DeliverySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  inventoryBatchId?: string | null;
  quantity: number;
  unitPriceCents: number;
  lineWeightGrams: number;
  lineTotalCents: number;
}

export interface Order {
  id: string;
  profileId: string;
  status: OrderStatus;
  shippingMethod: ShippingMethod;
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  totalCents: number;
  deliverySlotStart: string;
  deliverySlotEnd: string;
  deliveryAddress: DeliveryAddress;
  meltingEstimateMinutes: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// ─── User / Profile ──────────────────────────────────────
export type UserRole = "admin" | "customer";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone: string;
  avatarUrl?: string;
}

// ─── Flash Sale ──────────────────────────────────────────
export interface FlashSale {
  id: string;
  productId: string;
  originalPriceCents: number;
  salePriceCents: number;
  endsAt: string;
  label: string;
}

// ─── Auth State ──────────────────────────────────────────
export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

// ─── UI State ────────────────────────────────────────────
export interface UiState {
  filters: CatalogFilters;
  viewMode: ViewMode;
  cartOpen: boolean;
  mobileNavOpen: boolean;
  setFilters: (filters: Partial<CatalogFilters>) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleCart: () => void;
  toggleMobileNav: () => void;
  resetFilters: () => void;
}

// ─── Checkout State ──────────────────────────────────────
export type CheckoutStep = 1 | 2 | 3;

export interface CheckoutState {
  step: CheckoutStep;
  shippingMethod: ShippingMethod;
  deliverySlot: DeliverySlot | null;
  deliveryAddress: DeliveryAddress;
  setStep: (step: CheckoutStep) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setDeliverySlot: (slot: DeliverySlot | null) => void;
  setDeliveryAddress: (address: Partial<DeliveryAddress>) => void;
  reset: () => void;
}
