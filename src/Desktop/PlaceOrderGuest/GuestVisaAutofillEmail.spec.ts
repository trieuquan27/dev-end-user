import { expect, test } from "@playwright/test";
import {
  randomAddress,
  randomFirstName,
  randomLastName,
} from "../../common/randomname";
import { credit } from "../../common/CreditCard";
import { randomCVV, randomZipCode } from "../../common/RandomNumber";

test("Guest using visa", async ({ browser }) => {
  const context = await browser.newContext();
  test.setTimeout(60000);
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("/cart");
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.click("input[placeholder='Enter email']");
  await page.fill("input[placeholder='Enter email']", "b@b.com");
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.visa2}`);
  await page.fill('input[name="expireDate"]', "01/26");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);

  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(5000);
  const checkBox = page.getByRole("button", { name: "checkbox" });
  // console.log(checkBox);
  expect(checkBox.isChecked).toBeTruthy();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Place Order" }).dblclick();
  expect(await page.getByText("Something went wrong").count()).toEqual(0);
  expect(
    await page
      .getByText("Payment failed. Please check your payment information.")
      .count()
  ).toEqual(0);
  expect(await page.getByText("Cart Must have a payment.").count()).toEqual(0);
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/.*thank-you/);
  // await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Create Account")).toBeVisible();
  await expect(page.getByText("b@b.com")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your email")).toHaveValue(
    "b@b.com"
  );
  page.close();
});
