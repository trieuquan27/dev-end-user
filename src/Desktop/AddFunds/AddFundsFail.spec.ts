import { expect, test } from "@playwright/test";
import { userName5 } from "../../common/AccountList";
//Before Each
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button").first().click();
  await expect(page).toHaveURL("/signin");
});

test("Add Funds Should more than zero", async ({ page }) => {
  // a@a68.com
  await page.fill('input[name="username"]', `${userName5.Name}`);
  await page.fill('input[name="password"]', `${userName5.Password}`);
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL("/");
  await page.click("((//button[contains(@class,'flex items-center')])[1])");
  await page.click("(//img[@class='mr-2'])[1]");
  await page.click("(//div[contains(@class,'w-full flex-none')]//button[1])");
  await page.fill("input", "0000");
  await expect(page.getByText("Amount should more than zero")).toBeVisible();
  page.close();
});

test("Add Funds Must be a number", async ({ page }) => {
  // a@a68.com
  await page.fill('input[name="username"]', `${userName5.Name}`);
  await page.fill('input[name="password"]', `${userName5.Password}`);
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL("/");
  await page.click("((//button[contains(@class,'flex items-center')])[1])");
  await page.click("(//img[@class='mr-2'])[1]");
  await page.click("(//div[contains(@class,'w-full flex-none')]//button[1])");
  await page.fill("input", "");
  await expect(page.getByText("Must be a number")).toBeVisible();
  page.close();
});
