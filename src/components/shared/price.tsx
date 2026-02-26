import { formatPrice } from "@/lib/utils/currency";

interface PriceProps {
  cents: number;
  originalCents?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Price({ cents, originalCents, className = "", size = "md" }: PriceProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const hasDiscount = originalCents && originalCents > cents;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-bold text-teal-700 ${sizeClasses[size]}`}>
        {formatPrice(cents)}
      </span>
      {hasDiscount && (
        <span className={`line-through text-slate-400 ${size === "lg" ? "text-base" : "text-xs"}`}>
          {formatPrice(originalCents)}
        </span>
      )}
    </div>
  );
}
