import { test, expect } from "@playwright/test";
import { userName, userName8 } from "../../common/AccountList";
import { invalidString } from "../../common/Invalidstring";
//Before each
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
});
// Test scripts
test("Invalid credentials login ", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  await expect(page).toHaveURL("https://dev.gocheckin.io/signin");
  await page.getByPlaceholder("Enter your email").fill(`${userName8.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName.Password}`);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Invalid")).toBeVisible();
  await page.close();
});

test("Login email & password is required", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  await expect(page).toHaveURL("https://dev.gocheckin.io/signin");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("Email address is required")).toBeVisible();
  await expect(page.getByText("Password is required")).toBeVisible();
  await page.close();
});
test("Login email required", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  await expect(page).toHaveURL("https://dev.gocheckin.io/signin");
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName.Password}`);
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Email address is required")).toBeVisible();
  await page.close();
});
test("Login password required", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  await expect(page).toHaveURL("https://dev.gocheckin.io/signin");
  await page.getByPlaceholder("Enter your email").fill(`${userName.Name}`);
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Password is required")).toBeVisible();
  await page.close();
});
test("Your email is invalid", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  await expect(page).toHaveURL("https://dev.gocheckin.io/signin");
  await page.getByPlaceholder("Enter your email").fill(`${invalidString}`);
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByPlaceholder("Enter your email").clear();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByPlaceholder("Enter your email").fill(`${invalidString}`);
  await expect(page.getByText("Your email is invalid")).toBeVisible();
  await page.close();
});
