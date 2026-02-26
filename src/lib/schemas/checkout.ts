import { z } from "zod/v4";

export const DeliveryAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Valid US ZIP code required"),
  phone: z.string().min(10, "Valid phone number required"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const CheckoutSchema = z.object({
  shippingMethod: z.enum(["standard", "express", "priority_cold"]),
  deliverySlotId: z.string().min(1, "Delivery slot is required"),
  deliveryAddress: DeliveryAddressSchema,
});

export type DeliveryAddressInput = z.infer<typeof DeliveryAddressSchema>;
export type CheckoutInput = z.infer<typeof CheckoutSchema>;
