import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UiState, CatalogFilters, ViewMode } from "@/types/domain";
import { DEFAULT_FILTERS } from "@/lib/constants/filters";

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      filters: { ...DEFAULT_FILTERS },
      viewMode: "grid" as ViewMode,
      cartOpen: false,
      mobileNavOpen: false,

      setFilters: (partial: Partial<CatalogFilters>) => {
        set((state) => ({
          filters: { ...state.filters, ...partial },
        }));
      },

      setViewMode: (mode: ViewMode) => {
        set({ viewMode: mode });
      },

      toggleCart: () => {
        set((state) => ({ cartOpen: !state.cartOpen }));
      },

      toggleMobileNav: () => {
        set((state) => ({ mobileNavOpen: !state.mobileNavOpen }));
      },

      resetFilters: () => {
        set({ filters: { ...DEFAULT_FILTERS } });
      },
    }),
    {
      name: "frozen-ui-v1",
      partialize: (state) => ({
        filters: state.filters,
        viewMode: state.viewMode,
      }),
    }
  )
);
