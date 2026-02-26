import { test, expect } from "@playwright/test";

test("admin can access dashboard and see analytics widgets @smoke", async ({ page }) => {
  await page.goto("/profile");
  await page.getByRole("button", { name: /sign in as admin/i }).click();

  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
  await expect(page.getByText(/sales \(today\)/i)).toBeVisible();
  await expect(page.getByText(/top products/i)).toBeVisible();
  await expect(page.getByText(/expiry alerts/i)).toBeVisible();
});
