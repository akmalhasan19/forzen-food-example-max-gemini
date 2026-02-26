"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geo-location";

const MapPickerInner = dynamic(() => import("./map-picker-inner"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full rounded-lg" />,
});

interface MapPickerProps {
  lat?: number;
  lng?: number;
  onSelect: (lat: number, lng: number) => void;
}

export function MapPicker({ lat, lng, onSelect }: MapPickerProps) {
  const { requestLocation, loading, error } = useGeoLocation();

  const handleUseCurrentLocation = () => {
    requestLocation((position) => onSelect(position.lat, position.lng));
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleUseCurrentLocation}
        disabled={loading}
        className="gap-1"
      >
        <MapPin className="h-4 w-4" />
        {loading ? "Locating..." : "Use current location"}
      </Button>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
      <MapPickerInner lat={lat} lng={lng} onSelect={onSelect} />
    </div>
  );
}
