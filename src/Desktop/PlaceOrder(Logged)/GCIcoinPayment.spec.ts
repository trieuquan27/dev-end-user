import { expect, test } from "@playwright/test";
import { userName } from "../../common/AccountList";
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
test("Place order successfully by GCI coin", async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();

  // account a@a.com
  await page.getByPlaceholder("Enter your email").fill(`${userName.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 200 });
  await page.waitForTimeout(5000);
  await expect(page).toHaveURL("/cart");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  // await page.getByRole('radio', { name: 'Card type Visa •••• •••• •••• 1111' }).click();
  await page.waitForTimeout(3000);
  // Get checkbox locator
  const checkBox = page.getByRole("button", { name: "checkbox" });
  // console.log(checkBox);
  expect(checkBox.isChecked).toBeTruthy();
  await page.waitForTimeout(3000);
  await page
    .getByRole("button", { name: "Place Order" })
    .dblclick({ delay: 200 });
  expect(await page.getByText("Something went wrong").count()).toEqual(0);
  expect(
    await page
      .getByText("Payment failed. Please check your payment information.")
      .count()
  ).toEqual(0);
  expect(await page.getByText("Cart Must have a payment.").count()).toEqual(0);
  await expect(page.getByText("Order placed successfully")).toBeVisible();
  await expect(page).toHaveURL(/.*thank-you/);
  await page.waitForTimeout(3000);
  await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Receipt Details")).toBeVisible();
  page.close();
});
