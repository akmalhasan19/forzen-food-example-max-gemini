import { Badge } from "@/components/ui/badge";
import { formatWeight } from "@/lib/utils/weight";

interface WeightBadgeProps {
  grams: number;
}

export function WeightBadge({ grams }: WeightBadgeProps) {
  return (
    <Badge variant="secondary" className="text-xs">
      {formatWeight(grams)}
    </Badge>
  );
}
