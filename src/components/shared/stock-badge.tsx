import { Badge } from "@/components/ui/badge";

interface StockBadgeProps {
  quantity: number;
}

export function StockBadge({ quantity }: StockBadgeProps) {
  if (quantity <= 0) {
    return (
      <Badge variant="destructive" className="text-xs">
        Stok Habis
      </Badge>
    );
  }

  if (quantity <= 5) {
    return (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs">
        Stok Sedikit ({quantity} tersisa)
      </Badge>
    );
  }

  return (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
      Tersedia
    </Badge>
  );
}
