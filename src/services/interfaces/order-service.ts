import type { Order, DeliverySlot, DeliveryAddress, ShippingMethod, CartItem } from "@/types/domain";

export interface PlaceOrderInput {
  items: CartItem[];
  shippingMethod: ShippingMethod;
  deliverySlot: DeliverySlot;
  deliveryAddress: DeliveryAddress;
  subtotalCents: number;
  shippingCents: number;
}

export interface IOrderService {
  list(profileId: string): Promise<Order[]>;
  byId(orderId: string): Promise<Order | null>;
  place(input: PlaceOrderInput): Promise<Order>;
  allOrders(): Promise<Order[]>;
  updateStatus(orderId: string, status: Order["status"]): Promise<Order>;
  deliverySlots(): Promise<DeliverySlot[]>;
}
