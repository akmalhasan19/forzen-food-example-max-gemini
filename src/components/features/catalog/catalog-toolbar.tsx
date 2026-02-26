"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUiStore } from "@/store/ui-store";
import { SORT_OPTIONS } from "@/lib/constants/filters";
import type { SortOption } from "@/types/domain";

interface CatalogToolbarProps {
  count: number;
  mode: "full" | "preview";
}

export function CatalogToolbar({ count, mode }: CatalogToolbarProps) {
  const { filters, setFilters, viewMode, setViewMode } = useUiStore();

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-500">
        {count} produk
      </p>

      <div className="flex items-center gap-2">
        {mode === "full" && (
          <Select
            value={filters.sortBy}
            onValueChange={(value) => setFilters({ sortBy: value as SortOption })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex rounded-md border">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            className="h-9 w-9 rounded-r-none"
            onClick={() => setViewMode("grid")}
            aria-label="Tampilan grid"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            className="h-9 w-9 rounded-l-none"
            onClick={() => setViewMode("list")}
            aria-label="Tampilan daftar"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
