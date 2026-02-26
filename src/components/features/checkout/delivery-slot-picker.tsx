"use client";

import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDeliverySlots } from "@/hooks/use-delivery-slots";
import { useCheckoutStore } from "@/store/checkout-store";
import { Skeleton } from "@/components/ui/skeleton";
import type { DeliverySlot } from "@/types/domain";

export function DeliverySlotPicker() {
  const { data: slots, isLoading } = useDeliverySlots();
  const { deliverySlot, setDeliverySlot } = useCheckoutStore();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  // Group slots by date
  const slotsByDate: Record<string, DeliverySlot[]> = {};
  for (const slot of slots ?? []) {
    if (!slotsByDate[slot.date]) slotsByDate[slot.date] = [];
    slotsByDate[slot.date].push(slot);
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Pilih Waktu Pengiriman</h3>
      {Object.entries(slotsByDate).map(([date, dateSlots]) => (
        <div key={date} className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Calendar className="h-4 w-4" />
            {new Date(date + "T00:00:00").toLocaleDateString("id-ID", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {dateSlots.map((slot) => {
              const available = slot.capacity - slot.booked;
              const isFull = available <= 0;
              const isSelected = deliverySlot?.id === slot.id;

              const startTime = new Date(slot.startTime).toLocaleTimeString("id-ID", {
                hour: "numeric",
                minute: "2-digit",
              });
              const endTime = new Date(slot.endTime).toLocaleTimeString("id-ID", {
                hour: "numeric",
                minute: "2-digit",
              });

              return (
                <button
                  key={slot.id}
                  onClick={() => !isFull && setDeliverySlot(slot)}
                  disabled={isFull}
                  className={`rounded-lg border p-3 text-left text-sm transition-all ${
                    isSelected
                      ? "border-teal-600 bg-teal-50 ring-2 ring-teal-200"
                      : isFull
                      ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                      : "border-slate-200 hover:border-teal-300 hover:bg-teal-50/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-medium">
                      {startTime} - {endTime}
                    </span>
                  </div>
                  <div className="mt-1">
                    {isFull ? (
                      <Badge variant="secondary" className="text-xs">
                        Penuh
                      </Badge>
                    ) : (
                      <span className="text-xs text-slate-500">
                        {available} slot tersisa
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
