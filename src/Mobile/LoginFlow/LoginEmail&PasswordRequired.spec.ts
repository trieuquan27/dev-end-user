// import { expect, test } from "@playwright/test";
// test.use({ viewport: { width: 490, height: 896 } }),
//   test("Login Email & Password Required", async ({ page }) => {
//     await page.goto("/");
//     await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
//     await page.click("(//span[contains(@class,'flex items-center')])[3]");
//     await expect(page).toHaveURL("/signin");
//     await page.click("(//button[contains(@class,'flex items-center')])[1]");
//     await page.waitForTimeout(3000);
//     await expect(page.getByText("Password is required")).toBeVisible();
//     await expect(page.getByText("Email address is required")).toBeVisible();
//     page.close();
//   });
// test("Login Email Required", async ({ page }) => {
//   await page.goto("/");
//   await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
//   await page.click("(//span[contains(@class,'flex items-center')])[3]");
//   await expect(page).toHaveURL("/signin");
//   await page.click("(//button[contains(@class,'flex items-center')])[1]");
//   await page.waitForTimeout(3000);
//   await expect(page.getByText("Email address is required")).toBeVisible();
//   page.close();
// });
// test("Login Password Required", async ({ page }) => {
//   await page.goto("/");
//   await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
//   await page.click("(//span[contains(@class,'flex items-center')])[3]");
//   await expect(page).toHaveURL("/signin");
//   await page.fill('input[name="username"]', "a@a2.com");
//   await page.click("(//button[contains(@class,'flex items-center')])[1]");
//   await page.waitForTimeout(3000);
//   await expect(page.getByText("Password is required")).toBeVisible();
//   page.close();
// });
