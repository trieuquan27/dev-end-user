import { expect, test } from "@playwright/test";
import { invalidString } from "../../common/Invalidstring";

// Mobile viewport
test.use({ viewport: { width: 490, height: 896 } });
//Before each
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
});
test("Invalid credentials Login account", async ({ page }) => {
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  await page.fill('input[name="username"]', "a@a18.com");
  await page.fill('input[name="password"]', "Trieu123456789");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText("Invalid")).toBeVisible();
  page.close();
});

test("Login Email & Password Required", async ({ page }) => {
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText("Password is required")).toBeVisible();
  await expect(page.getByText("Email address is required")).toBeVisible();
  page.close();
});

test("Login Email Required", async ({ page }) => {
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText("Email address is required")).toBeVisible();
  page.close();
});

test("Login Password Required", async ({ page }) => {
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  await page.fill('input[name="username"]', "a@a2.com");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText("Password is required")).toBeVisible();
  page.close();
});

test("Your email is invalid", async ({ page }) => {
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  await page.fill('input[name="username"]', `${invalidString}`);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByPlaceholder("Enter your email").clear();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByPlaceholder("Enter your email").fill(`${invalidString}`);
  await expect(page.getByText("Your email is invalid")).toBeVisible();
  page.close();
});
