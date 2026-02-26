import type { IProductService } from "@/services/interfaces/product-service";
import { MockProductRepository } from "@/services/adapters/mock/product.repository.mock";

let instance: IProductService | null = null;

export function getProductService(): IProductService {
  if (!instance) {
    instance = new MockProductRepository();
  }
  return instance;
}
