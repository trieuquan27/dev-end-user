import { expect, test } from "@playwright/test";

test("Guest Fail", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Navigate to mainpage
  await page.goto("/");
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick();
  await page.waitForTimeout(3000);
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  //Add email
  await page.click("input[placeholder='Enter email']");
  await page.fill("input[placeholder='Enter email']", "d@a.com");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Place Order" }).dblclick();
  await expect(
    page.getByText("Please add card to process payment!")
  ).toBeVisible();
  page.close();
});
