import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, UserProfile, UserRole } from "@/types/domain";
import { MOCK_USERS } from "@/lib/mock/users";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string) => {
        const user = MOCK_USERS.find((u) => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      switchRole: (role: UserRole) => {
        set((state) => {
          if (!state.user) return state;
          const matchedUser = MOCK_USERS.find((u) => u.role === role);
          if (matchedUser) {
            return { user: matchedUser, isAuthenticated: true };
          }
          return { user: { ...state.user, role } as UserProfile };
        });
      },
    }),
    {
      name: "frozen-auth-v1",
    }
  )
);
