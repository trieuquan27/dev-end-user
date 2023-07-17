import { expect, test } from "@playwright/test";
import { userName, userName8 } from "../../common/AccountList";

//Before each sign in
test.beforeEach(async ({ page }) => {
  //Navigate to homepage
  await page.goto("/");
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
});

//After each logout
test.afterEach(async ({ page }) => {
  page.close();
});

//Test scripts
test("Remove Cart subcribed", async ({ page }) => {
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
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.waitForTimeout(3000);
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName.Name}`
  );
  // back to cart item page
  await page.locator("//div[contains(@class,'mb-5 mt-7')]//a[1]").click();
  await expect(page).toHaveURL(/.*cart/);
  // Add cart item
  await expect(page).toHaveURL("/cart");
  //Remove cart item
  await page.waitForTimeout(1000);
  await page.getByText("Remove").click();
  await expect(
    page.getByText("Please add deals to your shopping cart")
  ).toBeVisible();
});

test("Remove cart unsubcribed ", async ({ page }) => {
  //a@a8.com
  await page.getByPlaceholder("Enter your email").fill(`${userName8.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName8.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick({ delay: 300 });
  await page.waitForTimeout(3000);
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.waitForTimeout(3000);
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName8.Name}`
  );
  // Check subcribe checkbox is checked;
  await expect(page.getByRole("checkbox").first()).toHaveAttribute(
    "data-state",
    "checked"
  );
  // back to cart item page
  await page.locator("//div[contains(@class,'mb-5 mt-7')]//a[1]").click();
  await expect(page).toHaveURL(/.*cart/);
  // Add cart item
  await expect(page).toHaveURL("/cart");
  //Remove cart item
  await page.waitForTimeout(1000);
  await page.getByText("Remove").click();
  await expect(
    page.getByText("Please add deals to your shopping cart")
  ).toBeVisible();
});
