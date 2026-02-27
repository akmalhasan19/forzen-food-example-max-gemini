import type { UserProfile } from "@/types/domain";

export const MOCK_USERS: UserProfile[] = [
  {
    id: "user-001",
    email: "admin@frozenfresh.com",
    fullName: "Admin Pengguna",
    role: "admin",
    phone: "+62-812-0001-0100",
    avatarUrl: undefined,
  },
  {
    id: "user-002",
    email: "pelanggan@contoh.com",
    fullName: "Sari Wulandari",
    role: "customer",
    phone: "+62-813-0002-0200",
    avatarUrl: undefined,
  },
];
