import type { IUserService } from "@/services/interfaces/user-service";
import type { UserProfile } from "@/types/domain";
import { MOCK_USERS } from "@/lib/mock/users";

export class MockUserRepository implements IUserService {
  private users = [...MOCK_USERS];

  async byEmail(email: string): Promise<UserProfile | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async byId(id: string): Promise<UserProfile | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }

  async list(): Promise<UserProfile[]> {
    return this.users;
  }
}
