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
      step: 2,
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

  it("blocks review action without delivery slot and valid address", () => {
    const { rerender } = renderPage();

    expect(screen.getByRole("button", { name: /tinjau pesanan/i })).toBeDisabled();

    act(() => {
      useCheckoutStore.setState({
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
          city: "New York",
          state: "NY",
          zip: "10001",
          phone: "+1-555-0100",
        },
      });
    });

    rerender(
      <QueryClientProvider client={new QueryClient()}>
        <CheckoutPage />
      </QueryClientProvider>
    );

    expect(screen.getByRole("button", { name: /tinjau pesanan/i })).toBeEnabled();
  });
});
