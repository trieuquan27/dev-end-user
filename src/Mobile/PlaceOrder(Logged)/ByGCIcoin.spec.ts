import { expect, test } from "@playwright/test";
import { userName5 } from "../../common/AccountList";
//test AfterEach
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
// Mobile viewport
test.use({ viewport: { width: 490, height: 896 } });
test("Mobile Place order by GCI coin", async ({ page }) => {
  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  // await page.fill('input[name="username"]', "a@a68.com");
  await page.fill('input[name="username"]', `${userName5.Name}`);
  await page.fill('input[name="password"]', `${userName5.Password}`);
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL("/");
  await page
    .getByRole("link", { name: "Price & Percentage Sort" })
    .first()
    .click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 300 });
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("/cart");
  await expect(page.getByText("Price Details")).toBeVisible();
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL(/.*checkout/);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Place Order" }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText("Order placed successfully")).toBeVisible();
  await expect(page).toHaveURL(/.*thank-you/);
  await page.waitForTimeout(3000);
  await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Receipt Details")).toBeVisible();
  page.close();
});
