"use client";

import { KpiCards } from "@/components/features/admin/kpi-cards";
import { ExpiryAlertTable } from "@/components/features/admin/expiry-alert-table";
import { FulfillmentBoard } from "@/components/features/admin/fulfillment-board";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of your frozen food store performance
        </p>
      </div>

      <KpiCards />
      <FulfillmentBoard />
      <ExpiryAlertTable />
    </div>
  );
}
