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
  { status: "pending", label: "Pending", Icon: Clock, color: "bg-yellow-500" },
  { status: "paid", label: "Paid", Icon: CreditCard, color: "bg-blue-500" },
  { status: "packed", label: "Packed", Icon: Package, color: "bg-indigo-500" },
  { status: "shipped", label: "Shipped", Icon: Truck, color: "bg-teal-500" },
  { status: "delivered", label: "Delivered", Icon: CheckCircle2, color: "bg-green-500" },
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
          `Order #${o.id.slice(0, 8)} moved to ${next}`
        );
        return { ...o, status: next, updatedAt: new Date().toISOString() };
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fulfillment Board</CardTitle>
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
                    No orders
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
                        {order.items.length} item(s) &middot;{" "}
                        {order.shippingMethod.replace("_", " ")}
                      </p>
                      {NEXT_STATUS[order.status] && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                          onClick={() => advance(order.id)}
                        >
                          Move to {NEXT_STATUS[order.status]}
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
