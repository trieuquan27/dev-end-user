import { expect, test } from "@playwright/test";

test("Visa Refund", async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  await page.getByPlaceholder("Enter your email").fill("a@a78.com");
  await page.getByPlaceholder("Enter your password").fill("Trieu123456789@");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Wallet'])[1]");
  await page.click("//button[text()='Current Deals']");
  await page.click("(//a[contains(@class,'body-md-14 text-center')])[1]");
  await expect(page.getByText("Receipt Details")).toBeVisible();
  await expect(page.getByText("1111")).toBeVisible();
  await page.click("//a[contains(text(),'Edit or Cancel Order')]");
  await page.waitForTimeout(3000);
  await expect(page.getByText("Edit Order")).toBeVisible();
  await page.click("button[value='original_payment_method']");
  await page.click("//div[contains(@class,'flex flex-col')]//button[1]");
  await page.waitForTimeout(2000);
  await page.click("//button[text()='Cancel Order']");
  page.close();
});
