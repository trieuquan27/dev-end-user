import { expect, test } from "@playwright/test";
import { userName5 } from "../../common/AccountList";
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
// test.use({viewport:{width:490,height:896}}),
test("Add Funds Success", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button").first().click();
  await expect(page).toHaveURL("/signin");
  // a@a68.com
  await page.fill('input[name="username"]', `${userName5.Name}`);
  await page.fill('input[name="password"]', `${userName5.Password}`);
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL("/");
  await page.click("((//button[contains(@class,'flex items-center')])[1])");
  await page.click("(//img[@class='mr-2'])[1]");
  await page.click("(//div[contains(@class,'w-full flex-none')]//button[1])");
  await page.fill("input", "10");
  await page.click("//div[@class='flex items-center']");
  await page.waitForTimeout(2000);
  await expect(page.getByText("Add funds successfully!")).toBeVisible();
  page.close();
});
