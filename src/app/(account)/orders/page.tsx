"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth-store";
import { useOrdersQuery } from "@/hooks/queries/use-orders-query";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate, formatTimeRange } from "@/lib/utils/datetime";
import type { Order, OrderStatus } from "@/types/domain";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; variant: string; Icon: React.ElementType }
> = {
  pending: { label: "Menunggu", variant: "bg-yellow-100 text-yellow-800", Icon: Clock },
  paid: { label: "Dibayar", variant: "bg-blue-100 text-blue-800", Icon: Package },
  packed: { label: "Dikemas", variant: "bg-indigo-100 text-indigo-800", Icon: Package },
  shipped: { label: "Dikirim", variant: "bg-teal-100 text-teal-800", Icon: Truck },
  delivered: { label: "Terkirim", variant: "bg-green-100 text-green-800", Icon: CheckCircle2 },
  cancelled: { label: "Dibatalkan", variant: "bg-red-100 text-red-800", Icon: XCircle },
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[order.status];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="space-y-1">
            <CardTitle className="text-base">Pesanan #{order.id.slice(0, 8)}</CardTitle>
            <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
          </div>
          <Badge className={`${cfg.variant} border-0 gap-1`}>
            <cfg.Icon className="h-3 w-3" />
            {cfg.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-slate-500">Pengiriman</span>
            <p className="font-medium capitalize">{order.shippingMethod.replace("_", " ")}</p>
          </div>
          <div>
            <span className="text-slate-500">Total</span>
            <p className="font-semibold text-teal-700">{formatCurrency(order.totalCents)}</p>
          </div>
          <div className="col-span-2">
            <span className="text-slate-500">Jadwal Pengiriman</span>
            <p className="font-medium">
              {formatDate(order.deliverySlotStart)} &middot;{" "}
              {formatTimeRange(order.deliverySlotStart, order.deliverySlotEnd)}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              Sembunyikan Barang <ChevronUp className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              Lihat {order.items.length} Barang <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>

        {expanded && (
          <>
            <Separator />
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    Product {item.productId.slice(0, 8)} &times; {item.quantity}
                  </span>
                  <span className="font-medium">{formatCurrency(item.lineTotalCents)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span>{formatCurrency(order.subtotalCents)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Ongkir</span>
                <span>{formatCurrency(order.shippingCents)}</span>
              </div>
              {order.discountCents > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Diskon</span>
                  <span className="text-green-600">-{formatCurrency(order.discountCents)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold">
                <span>Total</span>
                <span className="text-teal-700">{formatCurrency(order.totalCents)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { data: orders, isLoading } = useOrdersQuery(user?.id);

  if (!isAuthenticated) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Pesanan Saya</h1>
        <p className="text-slate-500 mb-6">
          Masuk untuk melihat riwayat pesanan Anda.
        </p>
        <Link href="/login">
          <Button className="bg-teal-600 hover:bg-teal-700">Masuk</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 md:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Pesanan Saya</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : !orders || orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 mb-4">Belum ada pesanan.</p>
            <Link href="/products">
              <Button variant="outline" size="sm">
                Mulai Belanja
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}
