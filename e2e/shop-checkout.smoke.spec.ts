import { test, expect } from "@playwright/test";

test("catalog to checkout flow @smoke", async ({ page }) => {
  await page.goto("/products");

  const addButtons = page.getByRole("button", { name: /tambah|add/i });
  await expect(addButtons.first()).toBeVisible();
  await addButtons.first().click();

  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: /pembayaran|checkout/i })).toBeVisible();

  const continueButton = page.getByRole("button", { name: /lanjutkan|continue/i });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  const reviewOrderButton = page.getByRole("button", { name: /tinjau pesanan|review order/i });
  await expect(reviewOrderButton).toBeDisabled();

  await page.getByRole("button", { name: /slot tersisa/i }).first().click();
  await page.getByLabel(/nama lengkap|full name/i).fill("Jane Smith");
  await page.getByLabel(/telepon|phone/i).fill("+1-555-0100");
  await page.getByLabel(/alamat jalan|street address/i).fill("123 Main St");
  await page.getByLabel(/kota|city/i).fill("New York");
  await page.getByLabel(/provinsi|state/i).fill("NY");
  await page.getByLabel(/kode pos|zip code/i).fill("10001");

  await expect(reviewOrderButton).toBeEnabled();
  await reviewOrderButton.click();
  await page.getByRole("button", { name: /buat pesanan|place order/i }).click();

  await expect(page).toHaveURL(/\/orders$/);
});
