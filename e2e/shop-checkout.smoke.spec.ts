import { test, expect } from "@playwright/test";

test("catalog to checkout flow @smoke", async ({ page }) => {
  await page.goto("/products");

  const addButtons = page.getByRole("button", { name: /^add$/i });
  await expect(addButtons.first()).toBeVisible();
  await addButtons.first().click();

  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();

  await page.getByRole("button", { name: /continue/i }).click();
  await expect(page.getByRole("button", { name: /review order/i })).toBeDisabled();

  await page.locator("button:has-text('left')").first().click();
  await page.getByLabel("Full Name").fill("Jane Smith");
  await page.getByLabel("Phone").fill("+1-555-0100");
  await page.getByLabel("Street Address").fill("123 Main St");
  await page.getByLabel("City").fill("New York");
  await page.getByLabel("State").fill("NY");
  await page.getByLabel("ZIP Code").fill("10001");

  await expect(page.getByRole("button", { name: /review order/i })).toBeEnabled();
  await page.getByRole("button", { name: /review order/i }).click();
  await page.getByRole("button", { name: /place order/i }).click();

  await expect(page).toHaveURL(/\/orders$/);
});
