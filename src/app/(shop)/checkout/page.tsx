"use client";

import { useState, useEffect, useMemo } from "react";
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
import { PaymentStep } from "@/components/features/checkout/payment-step";
import { MockQrisPayment } from "@/components/features/checkout/mock-qris-payment";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { useAuthStore } from "@/store/auth-store";
import { getOrderService } from "@/services/order.service";
import { SHIPPING_RATES } from "@/lib/constants/shipping";
import { SELLER_LOCATION } from "@/lib/constants/seller";
import { haversineDistanceKm } from "@/lib/utils/distance";
import { formatPrice } from "@/lib/utils/currency";
import type { ShippingMethod } from "@/types/domain";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, shippingCents, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const {
    step,
    setStep,
    shippingMethod,
    setShippingMethod,
    deliverySlot,
    deliveryAddress,
    paymentMethod,
    setPaymentMethod,
    setDeliveryAddress,
    reset: resetCheckout,
  } = useCheckoutStore();
  const [submitting, setSubmitting] = useState(false);
  const [showMockQris, setShowMockQris] = useState(false);

  // Calculate distance between buyer and seller
  const distanceKm = useMemo(() => {
    if (deliveryAddress.lat != null && deliveryAddress.lng != null) {
      return haversineDistanceKm(
        SELLER_LOCATION.lat,
        SELLER_LOCATION.lng,
        deliveryAddress.lat,
        deliveryAddress.lng
      );
    }
    return 0;
  }, [deliveryAddress.lat, deliveryAddress.lng]);

  // Scroll to the top of the page whenever the checkout step changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

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

  // Step 1 validation: address + shipping method
  const addressValid =
    deliveryAddress.fullName.trim() !== "" &&
    deliveryAddress.street.trim() !== "" &&
    deliveryAddress.city.trim() !== "" &&
    deliveryAddress.state.trim() !== "" &&
    deliveryAddress.zip.trim() !== "" &&
    deliveryAddress.phone.trim() !== "";

  const canProceedToStep2 = !!shippingMethod && addressValid;

  // Step 2 validation: delivery slot only
  const canProceedToStep3 = !!deliverySlot;

  const executeOrderCheckout = async (redirectPath: string) => {
    setSubmitting(true);
    try {
      const orderService = getOrderService();
      await orderService.place({
        items,
        shippingMethod,
        deliverySlot,
        deliveryAddress,
        paymentMethod: paymentMethod!,
        subtotalCents: subtotalCents(),
        shippingCents: shippingCents(shippingMethod, distanceKm),
      } as any); // temporary cast if we need to update domain order types later
      clearCart();
      resetCheckout();
      toast.success("Pesanan berhasil dibuat!");
      router.push(redirectPath);
    } catch {
      toast.error("Gagal membuat pesanan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!deliverySlot || !paymentMethod) {
      if (!paymentMethod) {
        toast.error("Silakan pilih metode pembayaran");
      }
      return;
    }

    if (paymentMethod === "qris") {
      setShowMockQris(true);
      return;
    }

    await executeOrderCheckout(isAuthenticated ? "/orders" : "/");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 md:px-6 lg:px-8 space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Pembayaran</h1>

      <CheckoutStepper currentStep={step} />

      <div className="bg-white rounded-xl border p-6">
        {/* Step 1: Address + Map + Shipping Method */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Address Form */}
            <AddressForm />

            <MapPicker
              lat={deliveryAddress.lat}
              lng={deliveryAddress.lng}
              onSelect={(lat, lng) => setDeliveryAddress({ lat, lng })}
            />

            {/* Distance Info */}
            {distanceKm > 0 && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm">
                <p className="font-medium text-blue-800">
                  📍 Jarak dari {SELLER_LOCATION.label}: <strong>{distanceKm.toFixed(1)} km</strong>
                </p>
              </div>
            )}

            <Separator />

            {/* Shipping Method Selection */}
            <h2 className="text-lg font-semibold text-slate-900">Pilih Metode Pengiriman</h2>
            <RadioGroup
              value={shippingMethod}
              onValueChange={(val) => setShippingMethod(val as ShippingMethod)}
              className="space-y-3"
            >
              {(Object.keys(SHIPPING_RATES) as ShippingMethod[]).map((method) => {
                const rate = SHIPPING_RATES[method];
                const cost = shippingCents(method, distanceKm);
                return (
                  <div
                    key={method}
                    className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${shippingMethod === method
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
                      {distanceKm > 0 && (
                        <p className="text-xs text-teal-600 mt-0.5">
                          Termasuk biaya jarak {distanceKm.toFixed(1)} km
                        </p>
                      )}
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

        {/* Step 2: Delivery Slot Only */}
        {step === 2 && (
          <div className="space-y-8">
            <DeliverySlotPicker />

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
                onClick={() => setStep(4)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Buat Pesanan
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="space-y-6">
            {showMockQris ? (
              <MockQrisPayment
                totalAmount={(subtotalCents() + shippingCents(shippingMethod, distanceKm))}
                isAuthenticated={isAuthenticated}
                onSuccessAcknowledge={(redirectPath) => {
                  executeOrderCheckout(redirectPath);
                }}
              />
            ) : (
              <>
                <PaymentStep />

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Kembali
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={submitting || !paymentMethod}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {submitting ? (
                      "Memproses Pembayaran..."
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Konfirmasi & Bayar
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
