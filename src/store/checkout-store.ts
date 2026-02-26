import { create } from "zustand";
import type { CheckoutState, CheckoutStep, ShippingMethod, DeliverySlot, DeliveryAddress } from "@/types/domain";

const defaultAddress: DeliveryAddress = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  step: 1 as CheckoutStep,
  shippingMethod: "standard" as ShippingMethod,
  deliverySlot: null,
  deliveryAddress: { ...defaultAddress },

  setStep: (step: CheckoutStep) => set({ step }),

  setShippingMethod: (method: ShippingMethod) => set({ shippingMethod: method }),

  setDeliverySlot: (slot: DeliverySlot | null) => set({ deliverySlot: slot }),

  setDeliveryAddress: (partial: Partial<DeliveryAddress>) => {
    set((state) => ({
      deliveryAddress: { ...state.deliveryAddress, ...partial },
    }));
  },

  reset: () =>
    set({
      step: 1,
      shippingMethod: "standard",
      deliverySlot: null,
      deliveryAddress: { ...defaultAddress },
    }),
}));
