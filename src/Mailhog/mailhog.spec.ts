import { test, expect } from "@playwright/test";

test.skip("mailhog", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://deal.mailhog.fastboy.dev/");
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.getByPlaceholder("Username").fill("fastboy");
  await page.getByPlaceholder("Password").fill("ilovefastboy");
});
