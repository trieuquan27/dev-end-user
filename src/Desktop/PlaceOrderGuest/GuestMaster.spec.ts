import { expect, test } from "@playwright/test";
import {
  randomAddress,
  randomFirstName,
  randomLastName,
} from "../../common/randomname";
import { randomCVV, randomZipCode } from "../../common/RandomNumber";
import { credit } from "../../common/CreditCard";
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
test("Guest using visa", async ({ browser }) => {
  const context = await browser.newContext();
  test.setTimeout(60000);
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("/cart");
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.click("input[placeholder='Enter email']");
  await page.fill("input[placeholder='Enter email']", "d@v.com");
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.mastercard}`);
  await page.fill('input[name="expireDate"]', "01/27");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(5000);
  expect(page.getByRole("checkbox").nth(1).isChecked());
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Place Order" }).dblclick();
  expect(await page.getByText("Something went wrong").count()).toEqual(0);
  expect(
    await page
      .getByText("Payment failed. Please check your payment information.")
      .count()
  ).toEqual(0);
  expect(await page.getByText("Cart Must have a payment.").count()).toEqual(0);
  expect(await page.getByText("Order placed successfully")).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/.*thank-you/);
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Create Account")).toBeVisible();
  await expect(page.getByText("d@v.com")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your email")).toHaveValue(
    "d@v.com"
  );
  page.close();
});

test("Guest using visa uncheck save money checkbox", async ({ browser }) => {
  const context = await browser.newContext();
  test.setTimeout(60000);
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("/cart");
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.click("input[placeholder='Enter email']");
  await page.fill("input[placeholder='Enter email']", "d@v.com");
  await page.getByRole("checkbox").first().uncheck();
  expect(page.getByRole("checkbox").first().isChecked);
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.mastercard}`);
  await page.fill('input[name="expireDate"]', "01/29");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(3000);
  expect(page.getByRole("checkbox").nth(1).isChecked());
  await page.getByRole("button", { name: "Place Order" }).dblclick();
  expect(await page.getByText("Something went wrong").count()).toEqual(0);
  expect(
    await page
      .getByText("Payment failed. Please check your payment information.")
      .count()
  ).toEqual(0);
  expect(await page.getByText("Cart Must have a payment.").count()).toEqual(0);
  expect(await page.getByText("Order placed successfully")).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/.*thank-you/);
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Create Account")).toBeVisible();
  await expect(page.getByText("d@v.com")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your email")).toHaveValue(
    "d@v.com"
  );
  page.close();
});
