import type { IUserService } from "@/services/interfaces/user-service";
import { MockUserRepository } from "@/services/adapters/mock/user.repository.mock";

let instance: IUserService | null = null;

export function getUserService(): IUserService {
  if (!instance) {
    instance = new MockUserRepository();
  }
  return instance;
}
