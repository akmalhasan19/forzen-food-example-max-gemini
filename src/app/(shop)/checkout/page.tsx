"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckoutStepper } from "@/components/features/checkout/checkout-stepper";
import { DeliverySlotPicker } from "@/components/features/checkout/delivery-slot-picker";
import { AddressForm } from "@/components/features/checkout/address-form";
import { MapPicker } from "@/components/features/checkout/map-picker";
import { OrderReview } from "@/components/features/checkout/order-review";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { getOrderService } from "@/services/order.service";
import { SHIPPING_RATES } from "@/lib/constants/shipping";
import { formatPrice } from "@/lib/utils/currency";
import type { ShippingMethod } from "@/types/domain";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, shippingCents, clearCart } = useCartStore();
  const {
    step,
    setStep,
    shippingMethod,
    setShippingMethod,
    deliverySlot,
    deliveryAddress,
    setDeliveryAddress,
    reset: resetCheckout,
  } = useCheckoutStore();
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Truck className="h-16 w-16 mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Tidak ada yang dipesan</h1>
        <p className="text-slate-500 mb-4">Tambahkan barang ke keranjang terlebih dahulu.</p>
        <Button onClick={() => router.push("/products")} className="bg-teal-600 hover:bg-teal-700">
          Lihat Produk
        </Button>
      </main>
    );
  }

  const canProceedToStep2 = !!shippingMethod;
  const canProceedToStep3 =
    !!deliverySlot &&
    deliveryAddress.fullName.trim() !== "" &&
    deliveryAddress.street.trim() !== "" &&
    deliveryAddress.city.trim() !== "" &&
    deliveryAddress.state.trim() !== "" &&
    deliveryAddress.zip.trim() !== "" &&
    deliveryAddress.phone.trim() !== "";

  const handlePlaceOrder = async () => {
    if (!deliverySlot) return;
    setSubmitting(true);
    try {
      const orderService = getOrderService();
      await orderService.place({
        items,
        shippingMethod,
        deliverySlot,
        deliveryAddress,
        subtotalCents: subtotalCents(),
        shippingCents: shippingCents(shippingMethod),
      });
      clearCart();
      resetCheckout();
      toast.success("Pesanan berhasil dibuat!");
      router.push("/orders");
    } catch {
      toast.error("Gagal membuat pesanan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 md:px-6 lg:px-8 space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Pembayaran</h1>

      <CheckoutStepper currentStep={step} />

      <div className="bg-white rounded-xl border p-6">
        {/* Step 1: Shipping Method */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">Pilih Metode Pengiriman</h2>
            <RadioGroup
              value={shippingMethod}
              onValueChange={(val) => setShippingMethod(val as ShippingMethod)}
              className="space-y-3"
            >
              {(Object.keys(SHIPPING_RATES) as ShippingMethod[]).map((method) => {
                const rate = SHIPPING_RATES[method];
                const cost = shippingCents(method);
                return (
                  <div
                    key={method}
                    className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                      shippingMethod === method
                        ? "border-teal-600 bg-teal-50"
                        : "hover:border-slate-300"
                    }`}
                    onClick={() => setShippingMethod(method)}
                  >
                    <RadioGroupItem value={method} id={method} className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor={method} className="text-sm font-medium cursor-pointer">
                        {rate.label}
                      </Label>
                      <p className="text-xs text-slate-500 mt-0.5">{rate.description}</p>
                      <p className="text-xs text-slate-500">{rate.estimatedDays}</p>
                    </div>
                    <span className="font-semibold text-teal-700">{formatPrice(cost)}</span>
                  </div>
                );
              })}
            </RadioGroup>

            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceedToStep2}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Lanjutkan
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Delivery Slot + Address */}
        {step === 2 && (
          <div className="space-y-8">
            <DeliverySlotPicker />

            <Separator />

            <AddressForm />

            <MapPicker
              lat={deliveryAddress.lat}
              lng={deliveryAddress.lng}
              onSelect={(lat, lng) => setDeliveryAddress({ lat, lng })}
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Kembali
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedToStep3}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Tinjau Pesanan
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review + Place Order */}
        {step === 3 && (
          <div className="space-y-6">
            <OrderReview />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Kembali
              </Button>
              <Button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {submitting ? (
                  "Memproses Pesanan..."
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Buat Pesanan
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
