import { describe, expect, it } from "vitest";
import { haversineDistanceKm } from "@/lib/utils/distance";

describe("haversineDistanceKm", () => {
    it("returns 0 for identical points", () => {
        expect(haversineDistanceKm(-6.2088, 106.8456, -6.2088, 106.8456)).toBe(0);
    });

    it("calculates distance between Jakarta and Bandung (~120-150 km)", () => {
        const dist = haversineDistanceKm(-6.2088, 106.8456, -6.9175, 107.6191);
        expect(dist).toBeGreaterThan(100);
        expect(dist).toBeLessThan(200);
    });

    it("calculates distance between nearby points (< 5 km)", () => {
        // ~2.5 km apart in Jakarta
        const dist = haversineDistanceKm(-6.2088, 106.8456, -6.2200, 106.8600);
        expect(dist).toBeGreaterThan(1);
        expect(dist).toBeLessThan(5);
    });
});
