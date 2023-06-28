import { expect, test } from "@playwright/test";
// test.use({viewport:{width:490,height:896}}),
test("Add Funds Should more than zero", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button").first().click();
  await expect(page).toHaveURL("/signin");
  await page.fill('input[name="username"]', "a@a68.com");
  await page.fill('input[name="password"]', "Trieu123456789@");
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL("/");

  await page.click("((//button[contains(@class,'flex items-center')])[1])");
  //   await page.getByRole('link', { name: 'GOCheckin Coin Go Checkin Coin $2,252,693.25' }).click();

  await page.click("(//img[@class='mr-2'])[1]");
  await page.click("(//div[contains(@class,'w-full flex-none')]//button[1])");
  await page.fill("input", "0000");
  await expect(page.getByText("Amount should more than zero")).toBeVisible();
});
