"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/store/ui-store";
import { TEMPERATURE_OPTIONS, DIET_TAG_OPTIONS } from "@/lib/constants/filters";
import type { Category, TemperatureRequirement, DietTag } from "@/types/domain";

interface CatalogFiltersProps {
  categories: Category[];
}

export function CatalogFilters({ categories }: CatalogFiltersProps) {
  const { filters, setFilters, resetFilters } = useUiStore();

  const toggleCategory = (catId: string) => {
    const current = filters.categoryIds;
    const updated = current.includes(catId)
      ? current.filter((id) => id !== catId)
      : [...current, catId];
    setFilters({ categoryIds: updated });
  };

  const toggleTemperature = (temp: TemperatureRequirement) => {
    const current = filters.temperature ?? [];
    const updated = current.includes(temp)
      ? current.filter((t) => t !== temp)
      : [...current, temp];
    setFilters({ temperature: updated });
  };

  const toggleDietTag = (tag: DietTag) => {
    const current = filters.dietTags ?? [];
    const updated = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    setFilters({ dietTags: updated });
  };

  const setMinPrice = (value: string) => {
    const dollars = Number(value);
    setFilters({
      minPriceCents:
        Number.isFinite(dollars) && dollars > 0 ? Math.round(dollars * 100) : undefined,
    });
  };

  const setMaxPrice = (value: string) => {
    const dollars = Number(value);
    setFilters({
      maxPriceCents:
        Number.isFinite(dollars) && dollars > 0 ? Math.round(dollars * 100) : undefined,
    });
  };

  return (
    <aside className="hidden lg:block space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Filter</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-slate-500">
          Atur Ulang
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700">Kategori</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={filters.categoryIds.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-sm text-slate-600 cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700">Harga (IDR)</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="min-price" className="text-xs text-slate-500">
              Min
            </Label>
            <Input
              id="min-price"
              type="number"
              min={0}
              step={1}
              placeholder="0"
              value={filters.minPriceCents ? filters.minPriceCents / 100 : ""}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="max-price" className="text-xs text-slate-500">
              Max
            </Label>
            <Input
              id="max-price"
              type="number"
              min={0}
              step={1}
              placeholder="100"
              value={filters.maxPriceCents ? filters.maxPriceCents / 100 : ""}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Temperature */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700">Suhu</h4>
        <div className="space-y-2">
          {TEMPERATURE_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <Checkbox
                id={`temp-${opt.value}`}
                checked={(filters.temperature ?? []).includes(opt.value)}
                onCheckedChange={() => toggleTemperature(opt.value)}
              />
              <Label htmlFor={`temp-${opt.value}`} className="text-sm text-slate-600 cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Diet Tags */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700">Diet</h4>
        <div className="space-y-2">
          {DIET_TAG_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <Checkbox
                id={`diet-${opt.value}`}
                checked={(filters.dietTags ?? []).includes(opt.value)}
                onCheckedChange={() => toggleDietTag(opt.value)}
              />
              <Label htmlFor={`diet-${opt.value}`} className="text-sm text-slate-600 cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* In Stock Only */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStockOnly ?? false}
          onCheckedChange={(checked) => setFilters({ inStockOnly: !!checked })}
        />
        <Label htmlFor="in-stock" className="text-sm text-slate-600 cursor-pointer">
          In stock only
        </Label>
      </div>
    </aside>
  );
}
