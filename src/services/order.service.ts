import type { IOrderService } from "@/services/interfaces/order-service";
import { MockOrderRepository } from "@/services/adapters/mock/order.repository.mock";

let instance: IOrderService | null = null;

export function getOrderService(): IOrderService {
  if (!instance) {
    instance = new MockOrderRepository();
  }
  return instance;
}
