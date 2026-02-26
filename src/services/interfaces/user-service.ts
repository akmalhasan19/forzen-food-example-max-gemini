import type { UserProfile } from "@/types/domain";

export interface IUserService {
  byEmail(email: string): Promise<UserProfile | null>;
  byId(id: string): Promise<UserProfile | null>;
  list(): Promise<UserProfile[]>;
}
