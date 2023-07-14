import { expect, test } from "@playwright/test";
import { randomEmail } from "../../common/Randomemail";
import {
  randomAddress,
  randomFirstName,
  randomLastName,
} from "../../common/randomname";
import { credit } from "../../common/CreditCard";
import { randomCVV, randomZipCode } from "../../common/RandomNumber";
test("Guest Please add card to process payment!", async ({ browser }) => {
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

test("Guest disagree terms", async ({ browser }) => {
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
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  //Add email
  await page.click("input[placeholder='Enter email']");
  await page.fill("input[placeholder='Enter email']", `${randomEmail}`);
  //Check term checkbox is unchecked
  await page.getByRole("checkbox").nth(1).click();
  await expect(page.getByRole("checkbox").nth(1)).toHaveAttribute(
    "data-state",
    "unchecked"
  );
  await expect(page.locator("//span[text()='Place Order']")).toBeDisabled();
  await page.waitForTimeout(1000);
  await page.close();
});
test("Guest invalid email", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 200 });
  await expect(page).toHaveURL("/cart");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.waitForTimeout(6000);
  await page.fill('//input[@placeholder="Enter email"]', "d@d+11.com");
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.mastercard}`);
  await page.fill('input[name="expireDate"]', "12/26");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.waitForTimeout(3000);
  await page.click("//button[normalize-space()='Add Card']");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Place Order" }).click();
  await page.waitForTimeout(3000);
  await expect(
    page.getByText("This value is not a valid email address.")
  ).toBeVisible();
  await page.close();
});
