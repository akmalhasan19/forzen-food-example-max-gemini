import { test, expect } from "@playwright/test";

test("admin can access dashboard and see analytics widgets @smoke", async ({ page }) => {
  await page.goto("/profile");
  await page.getByRole("button", { name: /masuk sebagai admin/i }).click();

  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
  await expect(page.getByText(/penjualan \(hari ini\)/i)).toBeVisible();
  await expect(page.getByText(/produk teratas/i)).toBeVisible();
  await expect(page.getByText(/peringatan kedaluwarsa/i)).toBeVisible();
});
