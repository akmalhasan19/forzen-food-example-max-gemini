"use client";

import { useMemo } from "react";
import { CreditCard, Wallet, Building2, QrCode } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { formatPrice } from "@/lib/utils/currency";
import { SHIPPING_RATES } from "@/lib/constants/shipping";
import { SELLER_LOCATION } from "@/lib/constants/seller";
import { haversineDistanceKm } from "@/lib/utils/distance";
import type { PaymentMethod } from "@/types/domain";

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode; description: string }[] = [
    { id: "bca_va", label: "BCA Virtual Account", icon: <Building2 className="h-5 w-5" />, description: "Pembayaran otomatis terverifikasi" },
    { id: "mandiri_va", label: "Mandiri Virtual Account", icon: <Building2 className="h-5 w-5" />, description: "Pembayaran otomatis terverifikasi" },
    { id: "bni_va", label: "BNI Virtual Account", icon: <Building2 className="h-5 w-5" />, description: "Pembayaran otomatis terverifikasi" },
    { id: "bri_va", label: "BRI Virtual Account", icon: <Building2 className="h-5 w-5" />, description: "Pembayaran otomatis terverifikasi" },
    { id: "gopay", label: "GoPay", icon: <Wallet className="h-5 w-5" />, description: "Bayar dengan instan menggunakan aplikasi Gojek" },
    { id: "qris", label: "QRIS", icon: <QrCode className="h-5 w-5" />, description: "Scan QR code menggunakan e-wallet atau m-banking" },
    { id: "credit_card", label: "Kartu Kredit", icon: <CreditCard className="h-5 w-5" />, description: "Visa, Mastercard, JCB" },
];

export function PaymentStep() {
    const { items, subtotalCents, shippingCents } = useCartStore();
    const { shippingMethod, deliveryAddress, paymentMethod, setPaymentMethod } = useCheckoutStore();

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

    return (
        <div className="space-y-8">
            {/* Receipt Preview */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4 relative overflow-hidden">
                {/* Decorative receipt edges top & bottom could be added, but simple border works well too */}
                <h3 className="text-lg font-semibold text-slate-900 border-b border-dashed border-slate-300 pb-4 text-center">
                    Detail Pembayaran
                </h3>

                <div className="space-y-3 pt-2">
                    {items.map((item) => (
                        <div key={item.productId} className="flex justify-between text-sm">
                            <span className="text-slate-600">
                                {item.name} × {item.qty}
                            </span>
                            <span className="font-medium">{formatPrice(item.unitPriceCents * item.qty)}</span>
                        </div>
                    ))}
                </div>

                <Separator className="border-dashed bg-transparent border-t border-slate-300" />

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotalCents())}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Ongkir ({rate.label})</span>
                        <span>{formatPrice(shipping)}</span>
                    </div>
                </div>

                <Separator className="border-dashed bg-transparent border-t border-slate-300" />

                <div className="flex justify-between font-bold text-lg text-slate-900 pt-2">
                    <span>Total Pembayaran</span>
                    <span className="text-teal-700">{formatPrice(total)}</span>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Pilih Metode Pembayaran</h3>
                <RadioGroup
                    value={paymentMethod || ""}
                    onValueChange={(val) => setPaymentMethod(val as PaymentMethod)}
                    className="space-y-3"
                >
                    {PAYMENT_METHODS.map((method) => (
                        <div
                            key={method.id}
                            className={`flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-all ${paymentMethod === method.id
                                    ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600/20"
                                    : "hover:border-slate-300 bg-white"
                                }`}
                            onClick={() => setPaymentMethod(method.id)}
                        >
                            <RadioGroupItem value={method.id} id={method.id} className="mt-1 flex-shrink-0" />
                            <div className="flex items-center gap-3 flex-1">
                                <div className={`p-2 rounded-md flex-shrink-0 transition-colors ${paymentMethod === method.id ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {method.icon}
                                </div>
                                <div>
                                    <Label htmlFor={method.id} className="text-sm font-medium cursor-pointer text-slate-900">
                                        {method.label}
                                    </Label>
                                    <p className="text-xs text-slate-500 mt-0.5">{method.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
}
