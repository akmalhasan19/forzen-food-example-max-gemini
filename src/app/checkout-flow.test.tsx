import { describe, expect, it, beforeEach, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CheckoutPage from "@/app/(shop)/checkout/page";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/components/features/checkout/delivery-slot-picker", () => ({
  DeliverySlotPicker: () => <div data-testid="delivery-slot-picker" />,
}));

vi.mock("@/components/features/checkout/map-picker", () => ({
  MapPicker: () => <div data-testid="map-picker" />,
}));

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <CheckoutPage />
    </QueryClientProvider>
  );
}

describe("checkout workflow validation", () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [
        {
          productId: "prod-001",
          qty: 1,
          unitPriceCents: 899,
          unitWeightGrams: 340,
          name: "Grilled Chicken & Quinoa Bowl",
          imageUrl: "/images/products/placeholder.svg",
          slug: "grilled-chicken-bowl",
        },
      ],
    });

    useCheckoutStore.setState({
      step: 1,
      shippingMethod: "standard",
      deliverySlot: null,
      deliveryAddress: {
        fullName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
      },
    });
  });

  it("blocks proceeding without valid address on step 1", () => {
    renderPage();

    // Step 1: Lanjutkan button should be disabled without address
    expect(screen.getByRole("button", { name: /lanjutkan/i })).toBeDisabled();
  });

  it("enables proceeding when address is filled on step 1", () => {
    act(() => {
      useCheckoutStore.setState({
        deliveryAddress: {
          fullName: "Jane Doe",
          street: "123 Main St",
          city: "Jakarta",
          state: "DKI Jakarta",
          zip: "10110",
          phone: "+62-812-3456-7890",
        },
      });
    });

    renderPage();

    expect(screen.getByRole("button", { name: /lanjutkan/i })).toBeEnabled();
  });

  it("blocks review action without delivery slot on step 2", () => {
    act(() => {
      useCheckoutStore.setState({
        step: 2,
        deliveryAddress: {
          fullName: "Jane Doe",
          street: "123 Main St",
          city: "Jakarta",
          state: "DKI Jakarta",
          zip: "10110",
          phone: "+62-812-3456-7890",
        },
      });
    });

    renderPage();

    expect(screen.getByRole("button", { name: /tinjau pesanan/i })).toBeDisabled();
  });

  it("enables review when delivery slot is selected on step 2", () => {
    act(() => {
      useCheckoutStore.setState({
        step: 2,
        deliverySlot: {
          id: "slot-1",
          date: "2026-03-01",
          startTime: "2026-03-01T10:00:00.000Z",
          endTime: "2026-03-01T12:00:00.000Z",
          capacity: 10,
          booked: 2,
        },
        deliveryAddress: {
          fullName: "Jane Doe",
          street: "123 Main St",
          city: "Jakarta",
          state: "DKI Jakarta",
          zip: "10110",
          phone: "+62-812-3456-7890",
        },
      });
    });

    renderPage();

    expect(screen.getByRole("button", { name: /tinjau pesanan/i })).toBeEnabled();
  });
});
