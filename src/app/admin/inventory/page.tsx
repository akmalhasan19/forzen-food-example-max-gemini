"use client";

import { AlertTriangle, Clock, Thermometer, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_INVENTORY_BATCHES } from "@/lib/mock/inventory-batches";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import { formatDate } from "@/lib/utils/datetime";

export default function AdminInventoryPage() {
  const now = new Date();
  const sevenDays = new Date(now.getTime() + 7 * 86_400_000);
  const thirtyDays = new Date(now.getTime() + 30 * 86_400_000);

  const productMap = new Map(MOCK_PRODUCTS.map((p) => [p.id, p]));

  const sorted = [...MOCK_INVENTORY_BATCHES].sort(
    (a, b) =>
      new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
  );

  const expired = sorted.filter((b) => new Date(b.expiresAt) < now).length;
  const expiringSoon = sorted.filter(
    (b) => new Date(b.expiresAt) >= now && new Date(b.expiresAt) < sevenDays
  ).length;
  const totalQty = sorted.reduce((s, b) => s + b.quantityAvailable, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
        <p className="text-sm text-slate-500">
          {sorted.length} batches &middot; {totalQty} total units
        </p>
      </div>

      {/* Summary badges */}
      <div className="flex gap-3 flex-wrap">
        {expired > 0 && (
          <Badge className="bg-red-100 text-red-800 border-0 py-1 px-3 text-sm">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            {expired} expired
          </Badge>
        )}
        {expiringSoon > 0 && (
          <Badge className="bg-orange-100 text-orange-800 border-0 py-1 px-3 text-sm">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {expiringSoon} expiring within 7 days
          </Badge>
        )}
        <Badge className="bg-slate-100 text-slate-700 border-0 py-1 px-3 text-sm">
          {sorted.length} batches total
        </Badge>
      </div>

      {/* Inventory table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Batch Code</th>
                  <th className="px-4 py-3 font-medium">Qty</th>
                  <th className="px-4 py-3 font-medium">Received</th>
                  <th className="px-4 py-3 font-medium">Expires</th>
                  <th className="px-4 py-3 font-medium">Temp (°C)</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sorted.map((batch) => {
                  const product = productMap.get(batch.productId);
                  const expiresAt = new Date(batch.expiresAt);
                  const isExpired = expiresAt < now;
                  const isExpiringSoon =
                    !isExpired && expiresAt < sevenDays;
                  const isExpiring30d =
                    !isExpired && !isExpiringSoon && expiresAt < thirtyDays;

                  return (
                    <tr
                      key={batch.id}
                      className={`hover:bg-slate-50 ${
                        isExpired ? "bg-red-50/50" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium">
                          {product?.name ?? batch.productId}
                        </p>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">
                        {batch.batchCode}
                      </td>
                      <td className="px-4 py-3">
                        {batch.quantityAvailable === 0 ? (
                          <span className="text-red-500 font-medium">0</span>
                        ) : batch.quantityAvailable <= 5 ? (
                          <span className="text-orange-600 font-medium">
                            {batch.quantityAvailable}
                          </span>
                        ) : (
                          batch.quantityAvailable
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatDate(batch.receivedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {formatDate(batch.expiresAt)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          <Thermometer className="h-3 w-3 text-blue-400" />
                          {batch.storageTempC}°C
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          {batch.warehouseLocation}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {isExpired ? (
                          <Badge className="bg-red-100 text-red-800 border-0">
                            Expired
                          </Badge>
                        ) : isExpiringSoon ? (
                          <Badge className="bg-orange-100 text-orange-800 border-0">
                            &lt; 7 days
                          </Badge>
                        ) : isExpiring30d ? (
                          <Badge className="bg-yellow-100 text-yellow-800 border-0">
                            &lt; 30 days
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
    </div>
  );
}
