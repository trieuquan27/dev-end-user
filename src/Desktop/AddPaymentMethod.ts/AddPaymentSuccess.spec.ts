import { test, expect } from "@playwright/test";
import { userName4, userName5 } from "../../common/AccountList";
import {
  randomFirstName,
  randomLastName,
  randomAddress,
} from "../../common/randomname";
import { credit } from "../../common/CreditCard";
import { randomZipCode } from "../../common/randomnumber";
import { randomCVV } from "../../common/randomnumber";

test("Add visa card", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button").first().click();
  expect(page).toHaveURL("/signin");
  //a@a88.com
  await page.fill('input[name="username"]', `${userName4.Name}`);
  await page.fill('input[name="password"]', `${userName4.Password}`);
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
  await page.getByPlaceholder("XXX", { exact: true }).fill(`${randomCVV}`);
  await page.getByPlaceholder("e.g. 77042").fill(`${randomZipCode}`);
  await page.getByPlaceholder("Address").fill(`${randomAddress}`);
  await page.getByRole("button", { name: "Add Card" }).click();
  await expect(page.getByText("Your card added successful")).toBeVisible();
  page.close();
});
