import { create } from "zustand";
import type { CheckoutState, CheckoutStep, ShippingMethod, DeliverySlot, DeliveryAddress, PaymentMethod } from "@/types/domain";

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
  paymentMethod: null as PaymentMethod | null,
  deliverySlot: null,
  deliveryAddress: { ...defaultAddress },

  setStep: (step: CheckoutStep) => set({ step }),

  setShippingMethod: (method: ShippingMethod) => set({ shippingMethod: method }),

  setPaymentMethod: (method: PaymentMethod | null) => set({ paymentMethod: method }),

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
      paymentMethod: null,
      deliverySlot: null,
      deliveryAddress: { ...defaultAddress },
    }),
}));
