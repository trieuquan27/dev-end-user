import { expect, test } from "@playwright/test";
import { randomEmail } from "../../common/Randomemail";
import {
  randomAddress,
  randomFirstName,
  randomLastName,
} from "../../common/randomname";
import { userName, userName8 } from "../../common/AccountList";
import { credit } from "../../common/CreditCard";
import { randomCVV, randomZipCode } from "../../common/RandomNumber";

//Before each navigate to dev.gocheckin.io
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
});

//After each logout
test.afterEach(async ({ page }) => {
  await page.close();
});

//Test scripts
test("Please add card to process payment!", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  // a@a4.com
  await page.getByPlaceholder("Enter your email").fill(`${userName8.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName8.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 300 });
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName8.Name}`
  );
  //Place order
  await page.getByRole("button", { name: "Place Order" }).dblclick();
  await expect(
    page.getByText("Please add card to process payment!")
  ).toBeVisible();
});

test("Disagree terms", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  // a@a4.com
  await page.getByPlaceholder("Enter your email").fill(`${userName8.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName8.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 300 });
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName8.Name}`
  );
  //Check term checkbox is unchecked
  await page.getByRole("checkbox").nth(1).click();
  await expect(page.getByRole("checkbox").nth(1)).toHaveAttribute(
    "data-state",
    "unchecked"
  );
  //Place order
  await expect(
    page.getByRole("button", { name: "Place Order" })
  ).toBeDisabled();
});
