"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckoutStore } from "@/store/checkout-store";

export function AddressForm() {
  const { deliveryAddress, setDeliveryAddress } = useCheckoutStore();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">Alamat Pengiriman</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nama Lengkap</Label>
          <Input
            id="fullName"
            value={deliveryAddress.fullName}
            onChange={(e) => setDeliveryAddress({ fullName: e.target.value })}
            placeholder="Budi Santoso"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telepon</Label>
          <Input
            id="phone"
            value={deliveryAddress.phone}
            onChange={(e) => setDeliveryAddress({ phone: e.target.value })}
            placeholder="+62-812-3456-7890"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Alamat Jalan</Label>
        <Input
          id="street"
          value={deliveryAddress.street}
          onChange={(e) => setDeliveryAddress({ street: e.target.value })}
          placeholder="Jl. Sudirman No. 123"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Kota</Label>
          <Input
            id="city"
            value={deliveryAddress.city}
            onChange={(e) => setDeliveryAddress({ city: e.target.value })}
            placeholder="Jakarta"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Provinsi</Label>
          <Input
            id="state"
            value={deliveryAddress.state}
            onChange={(e) => setDeliveryAddress({ state: e.target.value })}
            placeholder="DKI Jakarta"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">Kode Pos</Label>
          <Input
            id="zip"
            value={deliveryAddress.zip}
            onChange={(e) => setDeliveryAddress({ zip: e.target.value })}
            placeholder="10110"
          />
        </div>
      </div>
    </div>
  );
}
