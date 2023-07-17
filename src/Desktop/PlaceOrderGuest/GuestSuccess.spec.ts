import { expect, test } from "@playwright/test";
import {
  randomAddress,
  randomFirstName,
  randomLastName,
} from "../../common/randomname";
import { randomCVV, randomZipCode } from "../../common/RandomNumber";
import { credit } from "../../common/CreditCard";

test("Guest using master", async ({ browser }) => {
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
  await page.fill("input[placeholder='Enter email']", "d@v.com");
  //Add card infor
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
  //Check checkbox is checked
  expect(page.getByRole("checkbox").nth(1)).toHaveAttribute(
    "data-state",
    "checked"
  );
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

test("Guest using master uncheck save money checkbox", async ({ browser }) => {
  const context = await browser.newContext();
  test.setTimeout(60000);
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
  await page.fill("input[placeholder='Enter email']", "d@v.com");
  //Check subcribe checkbox is unchecked
  await page.getByRole("checkbox").first().uncheck();
  expect(page.getByRole("checkbox").first()).toHaveAttribute(
    "data-state",
    "unchecked"
  );
  //Add card infor
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.mastercard}`);
  await page.fill('input[name="expireDate"]', "03/29");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(3000);
  //Terms checkbox is checked
  expect(page.getByRole("checkbox").nth(1)).toHaveAttribute(
    "data-state",
    "checked"
  );
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
test("Guest using visa", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick();
  await page.waitForTimeout(3000);
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  //Add email
  await page.click("input[placeholder='Enter email']");
  await page.fill("input[placeholder='Enter email']", "v@v.com");
  //Add card infor
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.visa}`);
  await page.fill('input[name="expireDate"]', "01/32");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(5000);
  //Check term checkbox is checked
  expect(page.getByRole("checkbox").nth(1)).toHaveAttribute(
    "data-state",
    "checked"
  );
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
  await expect(page).toHaveURL(/.*thank-you/);
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Create Account")).toBeVisible();
  await expect(page.getByText("v@v.com")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your email")).toHaveValue(
    "v@v.com"
  );
  page.close();
});
test("Guest using american express", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Navigate to homepage
  await page.goto("/");
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click();
  await page.waitForTimeout(3000);
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  //Add email
  await page.click("input[placeholder='Enter email']");
  await page.fill("input[placeholder='Enter email']", "b@b.com");
  //Add card infor
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.americanexpress}`);
  await page.fill('input[name="expireDate"]', "09/27");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(5000);
  // Check term checkbox is checked;
  await expect(page.getByRole("checkbox")).toHaveAttribute(
    "data-state",
    "checked"
  );
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
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Create Account")).toBeVisible();
  await expect(page.getByText("b@b.com")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your email")).toHaveValue(
    "b@b.com"
  );
  page.close();
});
