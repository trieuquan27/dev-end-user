import { test, expect } from "@playwright/test";
test("Remove cart item", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("/cart");
  await page.getByText("Remove").dblclick();
  await expect(
    page.getByText("Please add deals to your shopping cart")
  ).toBeVisible();
});
