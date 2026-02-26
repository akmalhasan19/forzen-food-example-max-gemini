/**
 * Format ISO date string to Indonesian locale
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format ISO date string to Indonesian locale with time
 */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Format a time range (e.g., "14:00 - 16:00")
 */
export function formatTimeRange(startIso: string, endIso: string): string {
  const start = new Date(startIso).toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "2-digit",
  });
  const end = new Date(endIso).toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${start} - ${end}`;
}

/**
 * Get relative time description (e.g., "in 2 hours", "3 days ago")
 */
export function relativeTime(iso: string): string {
  const now = Date.now();
  const target = new Date(iso).getTime();
  const diffMs = target - now;
  const absDiff = Math.abs(diffMs);
  const isPast = diffMs < 0;

  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let text: string;
  if (days > 0) text = `${days} hari`;
  else if (hours > 0) text = `${hours} jam`;
  else text = `${minutes} menit`;

  return isPast ? `${text} yang lalu` : `${text} lagi`;
}

/**
 * Generate delivery slots for the next N days
 * Each day has 2-hour slots from 8am-8pm
 */
export function generateDeliverySlots(days: number = 7): import("@/types/domain").DeliverySlot[] {
  const slots: import("@/types/domain").DeliverySlot[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= days; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];

    const slotStarts = [8, 10, 12, 14, 16, 18];
    for (const hour of slotStarts) {
      const start = new Date(date);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(date);
      end.setHours(hour + 2, 0, 0, 0);

      const capacity = 10;
      const booked = Math.floor(Math.random() * 8);

      slots.push({
        id: `slot-${dateStr}-${hour}`,
        date: dateStr,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        capacity,
        booked,
      });
    }
  }

  return slots;
}
