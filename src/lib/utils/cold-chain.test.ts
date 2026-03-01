import { describe, expect, it } from "vitest";
import {
  calculateShippingCents,
  estimateMeltingMinutes,
  coldChainStatus,
} from "@/lib/utils/cold-chain";

describe("cold-chain utils", () => {
  it("calculates shipping cents with weight formula", () => {
    const cents = calculateShippingCents(1200, "standard");
    expect(cents).toBe(1095);
  });

  it("adds distance surcharge when distanceKm is provided", () => {
    const withoutDistance = calculateShippingCents(1200, "standard", 0);
    const withDistance = calculateShippingCents(1200, "standard", 10);
    // 10 km * 5 perKmCents = 50 cents surcharge
    expect(withDistance - withoutDistance).toBe(50);
  });

  it("estimates melting minutes and clamps at zero", () => {
    expect(estimateMeltingMinutes("priority_cold", "frozen", 999)).toBe(0);
    expect(estimateMeltingMinutes("express", "chilled", 60)).toBeGreaterThan(0);
  });

  it("returns cold-chain status variants", () => {
    expect(coldChainStatus(130).variant).toBe("safe");
    expect(coldChainStatus(80).variant).toBe("warning");
    expect(coldChainStatus(20).variant).toBe("critical");
  });
});
