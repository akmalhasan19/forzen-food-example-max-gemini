"use client";

import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { formatPrice } from "@/lib/utils/currency";
import { formatWeight } from "@/lib/utils/weight";
import { SHIPPING_RATES } from "@/lib/constants/shipping";
import { SELLER_LOCATION } from "@/lib/constants/seller";
import { haversineDistanceKm } from "@/lib/utils/distance";
import { estimateMeltingMinutes, coldChainStatus } from "@/lib/utils/cold-chain";

export function OrderReview() {
  const { items, subtotalCents, totalWeightGrams, shippingCents } = useCartStore();
  const { shippingMethod, deliverySlot, deliveryAddress } = useCheckoutStore();

  const rate = SHIPPING_RATES[shippingMethod];

  const distanceKm = useMemo(() => {
    if (deliveryAddress.lat != null && deliveryAddress.lng != null) {
      return haversineDistanceKm(
        SELLER_LOCATION.lat, SELLER_LOCATION.lng,
        deliveryAddress.lat, deliveryAddress.lng
      );
    }
    return 0;
  }, [deliveryAddress.lat, deliveryAddress.lng]);

  const shipping = shippingCents(shippingMethod, distanceKm);
  const total = subtotalCents() + shipping;
  const meltingEst = estimateMeltingMinutes(shippingMethod, "frozen");
  const chainStatus = coldChainStatus(meltingEst);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Tinjauan Pesanan</h3>

      {/* Items */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700">Barang ({items.length})</h4>
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span className="text-slate-600">
              {item.name} × {item.qty}
            </span>
            <span className="font-medium">{formatPrice(item.unitPriceCents * item.qty)}</span>
          </div>
        ))}
      </div>

      <Separator />

      {/* Shipping */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-slate-700">Pengiriman</h4>
        <div className="text-sm text-slate-600">
          <p>{rate.label} — {rate.estimatedDays}</p>
          <p>Total berat: {formatWeight(totalWeightGrams())}</p>
        </div>
      </div>

      {/* Delivery Slot */}
      {deliverySlot && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-700">Jadwal Pengiriman</h4>
          <p className="text-sm text-slate-600">
            {new Date(deliverySlot.startTime).toLocaleString("id-ID", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(deliverySlot.endTime).toLocaleTimeString("id-ID", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}

      {/* Address */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-slate-700">Alamat Pengiriman</h4>
        <div className="text-sm text-slate-600">
          <p>{deliveryAddress.fullName}</p>
          <p>{deliveryAddress.street}</p>
          <p>
            {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zip}
          </p>
          <p>{deliveryAddress.phone}</p>
        </div>
      </div>

      {/* Cold Chain */}
      <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200 text-sm">
        <p className="font-medium text-cyan-800">Estimasi Rantai Dingin</p>
        <p className="text-cyan-600">
          Jendela aman: ~{meltingEst} menit •{" "}
          <span
            className={
              chainStatus.variant === "safe"
                ? "text-green-600"
                : chainStatus.variant === "warning"
                  ? "text-amber-600"
                  : "text-red-600"
            }
          >
            {chainStatus.label}
          </span>
        </p>
      </div>

      <Separator />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotalCents())}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Ongkir ({rate.label})</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg text-slate-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
