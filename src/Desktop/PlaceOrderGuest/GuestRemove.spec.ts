import { test, expect } from "@playwright/test";

test("Remove cart item", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Navigate to homepage
  await page.goto("/");
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick();
  await page.waitForTimeout(3000);
  //Add cart item
  await expect(page).toHaveURL("/cart");
  //Remove cart item
  await page.getByText("Remove").dblclick();
  await expect(
    page.getByText("Please add deals to your shopping cart")
  ).toBeVisible();
  await page.close();
});
