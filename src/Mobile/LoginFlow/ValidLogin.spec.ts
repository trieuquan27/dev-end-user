import { expect, test } from "@playwright/test";
import { userName } from "../../common/AccountList";
test.use({ viewport: { width: 490, height: 896 } }),
  test("Login account", async ({ page }) => {
    await page.goto("/");
    await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
    await page.click("(//span[contains(@class,'flex items-center')])[3]");
    await expect(page).toHaveURL("/signin");
    // await page.fill('input[name="username"]', "a@a68.com");
    await page.fill('input[name="username"]', `${userName.Name}`);
    await page.fill('input[name="password"]', `${userName.Password}`);
    await page.click("(//button[contains(@class,'flex items-center')])[1]");
    await expect(page).toHaveURL("/");
    page.close();
  });
