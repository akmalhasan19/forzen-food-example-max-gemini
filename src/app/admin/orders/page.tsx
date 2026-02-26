"use client";

import { useState } from "react";
import {
  Clock,
  CreditCard,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS } from "@/lib/mock/orders";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate, formatTimeRange } from "@/lib/utils/datetime";
import { toast } from "sonner";
import type { Order, OrderStatus } from "@/types/domain";

const BADGE_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; Icon: React.ElementType }
> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", Icon: Clock },
  paid: { label: "Paid", color: "bg-blue-100 text-blue-800", Icon: CreditCard },
  packed: { label: "Packed", color: "bg-indigo-100 text-indigo-800", Icon: Package },
  shipped: { label: "Shipped", color: "bg-teal-100 text-teal-800", Icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", Icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", Icon: XCircle },
};

const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "paid",
  "packed",
  "shipped",
  "delivered",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([...MOCK_ORDERS]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const advanceStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const idx = STATUS_FLOW.indexOf(o.status);
        if (idx < 0 || idx >= STATUS_FLOW.length - 1) return o;
        const next = STATUS_FLOW[idx + 1];
        toast.success(`Order #${o.id.slice(0, 8)} → ${next}`);
        return { ...o, status: next, updatedAt: new Date().toISOString() };
      })
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        if (o.status === "delivered" || o.status === "cancelled") return o;
        toast.info(`Order #${o.id.slice(0, 8)} cancelled`);
        return { ...o, status: "cancelled" as OrderStatus, updatedAt: new Date().toISOString() };
      })
    );
  };

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500">{orders.length} total orders</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All ({orders.length})
        </Button>
        {STATUS_FLOW.map((status) => {
          const count = orders.filter((o) => o.status === status).length;
          return (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {BADGE_CONFIG[status].label} ({count})
            </Button>
          );
        })}
      </div>

      {/* Order list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-slate-400">
              No orders found.
            </CardContent>
          </Card>
        ) : (
          filtered.map((order) => {
            const cfg = BADGE_CONFIG[order.status];
            const canAdvance =
              STATUS_FLOW.indexOf(order.status) >= 0 &&
              STATUS_FLOW.indexOf(order.status) < STATUS_FLOW.length - 1;
            const canCancel =
              order.status !== "delivered" && order.status !== "cancelled";

            return (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold">
                          #{order.id.slice(0, 8)}
                        </span>
                        <Badge className={`${cfg.color} border-0 gap-1`}>
                          <cfg.Icon className="h-3 w-3" />
                          {cfg.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        {formatDate(order.createdAt)} &middot;{" "}
                        {order.items.length} items &middot;{" "}
                        {order.shippingMethod.replace("_", " ")}
                      </p>
                      <p className="text-xs text-slate-500">
                        Delivery: {formatDate(order.deliverySlotStart)},{" "}
                        {formatTimeRange(
                          order.deliverySlotStart,
                          order.deliverySlotEnd
                        )}
                      </p>
                      <p className="text-xs text-slate-500">
                        To: {order.deliveryAddress.fullName},{" "}
                        {order.deliveryAddress.city},{" "}
                        {order.deliveryAddress.state}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-lg font-bold text-teal-700">
                        {formatCurrency(order.totalCents)}
                      </p>
                      <div className="flex gap-1 justify-end">
                        {canAdvance && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => advanceStatus(order.id)}
                          >
                            Advance
                          </Button>
                        )}
                        {canCancel && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs text-red-600 hover:text-red-700"
                            onClick={() => cancelOrder(order.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
