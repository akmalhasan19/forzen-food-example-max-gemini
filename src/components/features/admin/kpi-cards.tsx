"use client";

import {
  CalendarDays,
  CalendarRange,
  TrendingUp,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ORDERS } from "@/lib/mock/orders";
import { MOCK_PRODUCTS } from "@/lib/mock/products";
import { formatCurrency } from "@/lib/utils/currency";

interface KpiItem {
  title: string;
  value: string;
  subtitle: string;
  Icon: React.ElementType;
  color: string;
}

function atStartOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function computeKpis(): KpiItem[] {
  const todayStart = atStartOfToday();
  const sevenDaysAgo = new Date(todayStart.getTime() - 7 * 86_400_000);
  const thirtyDaysAgo = new Date(todayStart.getTime() - 30 * 86_400_000);

  const ordersToday = MOCK_ORDERS.filter((o) => new Date(o.createdAt) >= todayStart);
  const orders7d = MOCK_ORDERS.filter((o) => new Date(o.createdAt) >= sevenDaysAgo);
  const orders30d = MOCK_ORDERS.filter((o) => new Date(o.createdAt) >= thirtyDaysAgo);

  const salesToday = ordersToday.reduce((sum, o) => sum + o.totalCents, 0);
  const sales7d = orders7d.reduce((sum, o) => sum + o.totalCents, 0);
  const sales30d = orders30d.reduce((sum, o) => sum + o.totalCents, 0);
  const avg30d = orders30d.length ? Math.round(sales30d / orders30d.length) : 0;

  return [
    {
      title: "Sales (Today)",
      value: formatCurrency(salesToday),
      subtitle: `${ordersToday.length} order(s)`,
      Icon: CalendarDays,
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      title: "Sales (7d)",
      value: formatCurrency(sales7d),
      subtitle: `${orders7d.length} order(s)`,
      Icon: CalendarRange,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Sales (30d)",
      value: formatCurrency(sales30d),
      subtitle: `${orders30d.length} order(s)`,
      Icon: TrendingUp,
      color: "text-teal-600 bg-teal-50",
    },
    {
      title: "Avg Order (30d)",
      value: formatCurrency(avg30d),
      subtitle: "rolling window",
      Icon: Package,
      color: "text-orange-600 bg-orange-50",
    },
  ];
}

function topProducts(limit = 5) {
  const quantityByProduct: Record<string, number> = {};
  for (const order of MOCK_ORDERS) {
    for (const item of order.items) {
      quantityByProduct[item.productId] = (quantityByProduct[item.productId] ?? 0) + item.quantity;
    }
  }

  const productNameById = new Map(MOCK_PRODUCTS.map((p) => [p.id, p.name]));

  return Object.entries(quantityByProduct)
    .map(([productId, qty]) => ({
      productId,
      qty,
      name: productNameById.get(productId) ?? productId,
    }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, limit);
}

export function KpiCards() {
  const kpis = computeKpis();
  const top = topProducts();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {kpi.title}
              </CardTitle>
              <div className={`rounded-md p-2 ${kpi.color}`}>
                <kpi.Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-slate-500 mt-1">{kpi.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Products (by units sold)</CardTitle>
        </CardHeader>
        <CardContent>
          {top.length === 0 ? (
            <p className="text-sm text-slate-500">No sales yet.</p>
          ) : (
            <div className="space-y-2">
              {top.map((item, index) => (
                <div key={item.productId} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">
                    {index + 1}. {item.name}
                  </span>
                  <span className="font-semibold text-slate-900">{item.qty} unit(s)</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
