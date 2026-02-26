import type { UserProfile } from "@/types/domain";

export const MOCK_USERS: UserProfile[] = [
  {
    id: "user-001",
    email: "admin@frozenfresh.com",
    fullName: "Admin User",
    role: "admin",
    phone: "+1-555-0100",
    avatarUrl: undefined,
  },
  {
    id: "user-002",
    email: "customer@example.com",
    fullName: "Jane Smith",
    role: "customer",
    phone: "+1-555-0200",
    avatarUrl: undefined,
  },
];
