import { test, expect } from "@playwright/test";
import { userName3 } from "../../common/AccountList";
import {
  randomFirstName,
  randomLastName,
  randomAddress,
} from "../../common/randomname";
import { credit } from "../../common/CreditCard";
import { randomZipCode } from "../../common/randomnumber";
import { randomCVV } from "../../common/randomnumber";

test("First name is required", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName3.Name}`);
  await page.fill('input[name="password"]', `${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Navigate to Payment Method
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Payment Method'])[1]");
  await expect(page).toHaveURL(
    "https://dev.gocheckin.io/profile/payment-method"
  );
  // Add new payment card
  await page.getByRole("button", { name: "add" }).click();
  await expect(page.getByText("Card Information")).toBeVisible();
  await page.getByPlaceholder("First Name").fill("");
  await page.getByPlaceholder("Last Name").fill(`${randomLastName}`);
  await page.getByPlaceholder("XXXX-XXXX-XXXX-XXXX").fill(`${credit.visa}`);
  await page.getByPlaceholder("MM/YY").fill("10/30");
  await page.getByPlaceholder("XXX", { exact: true }).fill(`${randomCVV}`);
  await page.getByPlaceholder("e.g. 77042").fill(`${randomZipCode}`);
  await page.getByPlaceholder("Address").fill(`${randomAddress}`);
  await page.getByRole("button", { name: "Add Card" }).click();
  await expect(page.getByText("First name is required")).toBeVisible();
  page.close();
});

test("Last name is required", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName3.Name}`);
  await page.fill('input[name="password"]', `${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Navigate to Payment Method
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Payment Method'])[1]");
  await expect(page).toHaveURL(
    "https://dev.gocheckin.io/profile/payment-method"
  );
  // Add new payment card
  await page.getByRole("button", { name: "add" }).click();
  await expect(page.getByText("Card Information")).toBeVisible();
  await page.getByPlaceholder("First Name").fill(`${randomFirstName}`);
  await page.getByPlaceholder("Last Name").fill("");
  await page.getByPlaceholder("XXXX-XXXX-XXXX-XXXX").fill(`${credit.visa}`);
  await page.getByPlaceholder("MM/YY").fill("10/30");
  await page.getByPlaceholder("XXX", { exact: true }).fill(`${randomCVV}`);
  await page.getByPlaceholder("e.g. 77042").fill(`${randomZipCode}`);
  await page.getByPlaceholder("Address").fill(`${randomAddress}`);
  await page.getByRole("button", { name: "Add Card" }).click();
  await expect(page.getByText("Last name is required")).toBeVisible();
  page.close();
});
test("CVV is required", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName3.Name}`);
  await page.fill('input[name="password"]', `${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Navigate to Payment Method
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Payment Method'])[1]");
  await expect(page).toHaveURL(
    "https://dev.gocheckin.io/profile/payment-method"
  );
  // Add new payment card
  await page.getByRole("button", { name: "add" }).click();
  await expect(page.getByText("Card Information")).toBeVisible();
  await page.getByPlaceholder("First Name").fill(`${randomFirstName}`);
  await page.getByPlaceholder("Last Name").fill(`${randomLastName}`);
  await page.getByPlaceholder("XXXX-XXXX-XXXX-XXXX").fill(`${credit.visa}`);
  await page.getByPlaceholder("MM/YY").fill("10/30");
  await page.getByPlaceholder("XXX", { exact: true }).fill("");
  await page.getByPlaceholder("e.g. 77042").fill(`${randomZipCode}`);
  await page.getByPlaceholder("Address").fill(`${randomAddress}`);
  await page.getByRole("button", { name: "Add Card" }).click();
  await expect(page.getByText("CVV is required")).toBeVisible();
  page.close();
});

test("Card number is required", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName3.Name}`);
  await page.fill('input[name="password"]', `${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Navigate to Payment Method
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Payment Method'])[1]");
  await expect(page).toHaveURL(
    "https://dev.gocheckin.io/profile/payment-method"
  );
  // Add new payment card
  await page.getByRole("button", { name: "add" }).click();
  await expect(page.getByText("Card Information")).toBeVisible();
  await page.getByPlaceholder("First Name").fill(`${randomFirstName}`);
  await page.getByPlaceholder("Last Name").fill(`${randomLastName}`);
  await page.getByPlaceholder("XXXX-XXXX-XXXX-XXXX").fill("");
  await page.getByPlaceholder("MM/YY").fill("10/30");
  await page.getByPlaceholder("XXX", { exact: true }).fill(`${randomCVV}`);
  await page.getByPlaceholder("e.g. 77042").fill(`${randomZipCode}`);
  await page.getByPlaceholder("Address").fill(`${randomAddress}`);
  await page.getByRole("button", { name: "Add Card" }).click();
  await expect(page.getByText("Card number is required")).toBeVisible();
  page.close();
});

test("Expire Date is required", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName3.Name}`);
  await page.fill('input[name="password"]', `${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Navigate to Payment Method
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Payment Method'])[1]");
  await expect(page).toHaveURL(
    "https://dev.gocheckin.io/profile/payment-method"
  );
  // Add new payment card
  await page.getByRole("button", { name: "add" }).click();
  await expect(page.getByText("Card Information")).toBeVisible();
  await page.getByPlaceholder("First Name").fill(`${randomFirstName}`);
  await page.getByPlaceholder("Last Name").fill(`${randomLastName}`);
  await page.getByPlaceholder("XXXX-XXXX-XXXX-XXXX").fill(`${credit.visa}`);
  await page.getByPlaceholder("MM/YY").fill("");
  await page.getByPlaceholder("XXX", { exact: true }).fill(`${randomCVV}`);
  await page.getByPlaceholder("e.g. 77042").fill(`${randomZipCode}`);
  await page.getByPlaceholder("Address").fill(`${randomAddress}`);
  await page.getByRole("button", { name: "Add Card" }).click();
  await expect(page.getByText("Expire Date is required")).toBeVisible();
  page.close();
});

test("Zipcode is required", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName3.Name}`);
  await page.fill('input[name="password"]', `${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Navigate to Payment Method
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Payment Method'])[1]");
  await expect(page).toHaveURL(
    "https://dev.gocheckin.io/profile/payment-method"
  );
  // Add new payment card
  await page.getByRole("button", { name: "add" }).click();
  await expect(page.getByText("Card Information")).toBeVisible();
  await page.getByPlaceholder("First Name").fill(`${randomFirstName}`);
  await page.getByPlaceholder("Last Name").fill(`${randomLastName}`);
  await page.getByPlaceholder("XXXX-XXXX-XXXX-XXXX").fill(`${credit.visa}`);
  await page.getByPlaceholder("MM/YY").fill("03/30");
  await page.getByPlaceholder("XXX", { exact: true }).fill(`${randomCVV}`);
  await page.getByPlaceholder("e.g. 77042").fill("");
  await page.getByPlaceholder("Address").fill(`${randomAddress}`);
  await page.getByRole("button", { name: "Add Card" }).click();
  await expect(page.getByText("Zipcode is required")).toBeVisible();
  page.close();
});

test("Address is required", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName3.Name}`);
  await page.fill('input[name="password"]', `${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Navigate to Payment Method
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Payment Method'])[1]");
  await expect(page).toHaveURL(
    "https://dev.gocheckin.io/profile/payment-method"
  );
  // Add new payment card
  await page.getByRole("button", { name: "add" }).click();
  await expect(page.getByText("Card Information")).toBeVisible();
  await page.getByPlaceholder("First Name").fill(`${randomFirstName}`);
  await page.getByPlaceholder("Last Name").fill(`${randomLastName}`);
  await page.getByPlaceholder("XXXX-XXXX-XXXX-XXXX").fill(`${credit.visa}`);
  await page.getByPlaceholder("MM/YY").fill("03/30");
  await page.getByPlaceholder("XXX", { exact: true }).fill(`${randomCVV}`);
  await page.getByPlaceholder("e.g. 77042").fill(`${randomZipCode}`);
  await page.getByPlaceholder("Address").fill("");
  await page.getByRole("button", { name: "Add Card" }).click();
  await expect(page.getByText("Address is required")).toBeVisible();
  page.close();
});

test("Cancel", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName3.Name}`);
  await page.fill('input[name="password"]', `${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Navigate to Payment Method
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Payment Method'])[1]");
  await expect(page).toHaveURL(
    "https://dev.gocheckin.io/profile/payment-method"
  );
  // Add new payment card
  await page.getByRole("button", { name: "add" }).click();
  await expect(page.getByText("Card Information")).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByText("Card Information")).not.toBeVisible();
  page.close();
});
