import { test, expect } from "@playwright/test";
import { userName8 } from "../../common/AccountList";
//Mobile viewport
test.use({ viewport: { width: 490, height: 896 } });
//Test script
test("Must be a number", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  // a@a68.com
  await page.fill('input[name="username"]', `${userName8.Name}`);
  await page.fill('input[name="password"]', `${userName8.Password}`);
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL("/");
  //Navigate to Go checkin coin
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//button[@name='Go Checkin Coin'])[1]");
  await expect(page.getByText("Go Checkin Coin Activity")).toBeVisible();
  await page.getByRole("button", { name: "Add Funds" }).click();
  //Navigae to add funds
  await expect(page.getByText("You’ll have total")).toBeVisible();
  await page.fill("input", "10");
  await page.getByRole("button", { name: "Add Funds" }).click();
  page.close();
});
