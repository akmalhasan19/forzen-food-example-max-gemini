import type { IOrderService, PlaceOrderInput } from "@/services/interfaces/order-service";
import type { Order, DeliverySlot } from "@/types/domain";
import { MOCK_ORDERS } from "@/lib/mock/orders";
import { generateDeliverySlots } from "@/lib/utils/datetime";
import { estimateMeltingMinutes } from "@/lib/utils/cold-chain";

export class MockOrderRepository implements IOrderService {
  private orders: Order[] = [...MOCK_ORDERS];

  async list(profileId: string): Promise<Order[]> {
    return this.orders
      .filter((o) => o.profileId === profileId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async byId(orderId: string): Promise<Order | null> {
    return this.orders.find((o) => o.id === orderId) ?? null;
  }

  async place(input: PlaceOrderInput): Promise<Order> {
    const orderId = `order-${Date.now()}`;
    const meltingEst = estimateMeltingMinutes(input.shippingMethod, "frozen");

    const order: Order = {
      id: orderId,
      profileId: "user-002",
      status: "pending",
      shippingMethod: input.shippingMethod,
      subtotalCents: input.subtotalCents,
      shippingCents: input.shippingCents,
      discountCents: 0,
      totalCents: input.subtotalCents + input.shippingCents,
      deliverySlotStart: input.deliverySlot.startTime,
      deliverySlotEnd: input.deliverySlot.endTime,
      deliveryAddress: input.deliveryAddress,
      meltingEstimateMinutes: meltingEst,
      items: input.items.map((item, i) => ({
        id: `oi-${Date.now()}-${i}`,
        orderId,
        productId: item.productId,
        inventoryBatchId: null,
        quantity: item.qty,
        unitPriceCents: item.unitPriceCents,
        lineWeightGrams: item.unitWeightGrams * item.qty,
        lineTotalCents: item.unitPriceCents * item.qty,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.orders.push(order);
    return order;
  }

  async allOrders(): Promise<Order[]> {
    return this.orders.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateStatus(orderId: string, status: Order["status"]): Promise<Order> {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) throw new Error(`Order ${orderId} not found`);
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  async deliverySlots(): Promise<DeliverySlot[]> {
    return generateDeliverySlots(7);
  }
}
