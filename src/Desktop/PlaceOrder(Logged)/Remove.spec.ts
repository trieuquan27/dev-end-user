import { expect, test } from "@playwright/test";
import { userName } from "../../common/AccountList";

test("Remove Cart Logged Case", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Navigate to homepage
  await page.goto("/");
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  //a@a.com
  await page.getByPlaceholder("Enter your email").fill(`${userName.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick({ delay: 300 });
  await page.waitForTimeout(3000);
  // Add cart item
  await expect(page).toHaveURL("/cart");
  //Remove cart item
  await page.getByText("Remove").click();
  await expect(
    page.getByText("Please add deals to your shopping cart")
  ).toBeVisible();
  page.close();
});
