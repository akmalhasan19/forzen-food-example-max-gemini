import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { ProductGallery } from "@/components/features/catalog/product-gallery";
import { useUiStore } from "@/store/ui-store";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import { MOCK_CATEGORIES } from "@/lib/mock/categories";

function renderWithQuery(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("ProductGallery view mode", () => {
  beforeEach(() => {
    localStorage.clear();
    useUiStore.setState({
      filters: {
        categoryIds: [],
        sortBy: "featured",
        viewMode: "grid",
        inStockOnly: false,
      },
      viewMode: "grid",
      cartOpen: false,
      mobileNavOpen: false,
    });
  });

  it("toggles grid/list and persists view mode", async () => {
    const user = userEvent.setup();
    renderWithQuery(
      <ProductGallery
        initialProducts={MOCK_PRODUCTS.slice(0, 3)}
        categories={MOCK_CATEGORIES}
        mode="full"
      />
    );

    expect(screen.getAllByTestId("product-card").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: /tampilan daftar/i }));
    expect(screen.getAllByTestId("product-list-row").length).toBeGreaterThan(0);

    await waitFor(() => {
      const persisted = localStorage.getItem("frozen-ui-v1");
      expect(persisted).toContain('"viewMode":"list"');
    });
  });
});
