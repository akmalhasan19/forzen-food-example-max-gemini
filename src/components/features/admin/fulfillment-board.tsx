"use client";

import { useState } from "react";
import {
  Clock,
  Truck,
  Package,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MOCK_ORDERS } from "@/lib/mock/orders";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/datetime";
import { toast } from "sonner";
import type { Order, OrderStatus } from "@/types/domain";

const COLUMNS: { status: OrderStatus; label: string; Icon: React.ElementType; color: string }[] = [
  { status: "pending", label: "Menunggu", Icon: Clock, color: "bg-yellow-500" },
  { status: "paid", label: "Dibayar", Icon: CreditCard, color: "bg-blue-500" },
  { status: "packed", label: "Dikemas", Icon: Package, color: "bg-indigo-500" },
  { status: "shipped", label: "Dikirim", Icon: Truck, color: "bg-teal-500" },
  { status: "delivered", label: "Terkirim", Icon: CheckCircle2, color: "bg-green-500" },
];

const NEXT_STATUS: Record<string, OrderStatus | null> = {
  pending: "paid",
  paid: "packed",
  packed: "shipped",
  shipped: "delivered",
  delivered: null,
  cancelled: null,
};

export function FulfillmentBoard() {
  const [orders, setOrders] = useState<Order[]>([...MOCK_ORDERS]);

  const advance = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const next = NEXT_STATUS[o.status];
        if (!next) return o;
        toast.success(
          `Pesanan #${o.id.slice(0, 8)} dipindahkan ke ${next}`
        );
        return { ...o, status: next, updatedAt: new Date().toISOString() };
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Papan Pemenuhan Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {COLUMNS.map((col) => {
            const colOrders = orders.filter((o) => o.status === col.status);
            return (
              <div key={col.status} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${col.color}`} />
                  <h3 className="text-sm font-semibold text-slate-700">
                    {col.label}
                  </h3>
                  <Badge variant="secondary" className="ml-auto">
                    {colOrders.length}
                  </Badge>
                </div>
                <Separator />
                {colOrders.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">
                    Tidak ada pesanan
                  </p>
                ) : (
                  colOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-lg border bg-white p-3 space-y-2 text-sm shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">
                          #{order.id.slice(0, 8)}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                      <p className="font-semibold">
                        {formatCurrency(order.totalCents)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {order.items.length} barang &middot;{" "}
                        {order.shippingMethod.replace("_", " ")}
                      </p>
                      {NEXT_STATUS[order.status] && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                          onClick={() => advance(order.id)}
                        >
                          Pindah ke {NEXT_STATUS[order.status]}
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
