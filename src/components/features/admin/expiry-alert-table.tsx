"use client";

import { AlertTriangle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_INVENTORY_BATCHES } from "@/lib/mock/inventory-batches";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import { formatDate } from "@/lib/utils/datetime";

export function ExpiryAlertTable() {
  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 86_400_000);

  const productMap = new Map(MOCK_PRODUCTS.map((p) => [p.id, p]));

  const sorted = [...MOCK_INVENTORY_BATCHES]
    .filter((b) => b.quantityAvailable > 0)
    .sort(
      (a, b) =>
        new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
    )
    .slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Expiry Alerts
        </CardTitle>
        <CardDescription>
          Inventory batches sorted by nearest expiration date
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="pb-2 pr-4 font-medium">Product</th>
                <th className="pb-2 pr-4 font-medium">Batch</th>
                <th className="pb-2 pr-4 font-medium">Qty</th>
                <th className="pb-2 pr-4 font-medium">Expires</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sorted.map((batch) => {
                const product = productMap.get(batch.productId);
                const expiresAt = new Date(batch.expiresAt);
                const isExpired = expiresAt < now;
                const isExpiringSoon =
                  !isExpired && expiresAt < sevenDaysFromNow;

                return (
                  <tr key={batch.id} className="hover:bg-slate-50">
                    <td className="py-2.5 pr-4 font-medium">
                      {product?.name ?? batch.productId}
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-slate-500">
                      {batch.batchCode}
                    </td>
                    <td className="py-2.5 pr-4">{batch.quantityAvailable}</td>
                    <td className="py-2.5 pr-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {formatDate(batch.expiresAt)}
                      </span>
                    </td>
                    <td className="py-2.5">
                      {isExpired ? (
                        <Badge className="bg-red-100 text-red-800 border-0">
                          Expired
                        </Badge>
                      ) : isExpiringSoon ? (
                        <Badge className="bg-orange-100 text-orange-800 border-0">
                          Expiring Soon
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border-0">
                          OK
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
