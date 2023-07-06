import { randomEmail } from "../../common/randomemail";
import { emailPwd } from "../../common/randompwd";
import { userName } from "../../common/AccountList";
import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 490, height: 896 } }),
  test("Mobile Valid Signup", async ({ page }) => {
    await page.goto("/");
    await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
    await page.click("(//span[contains(@class,'flex items-center')])[3]");
    await expect(page).toHaveURL("/signin");
    await page.getByRole("link", { name: "Sign Up" }).click();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder("Enter your email").fill(randomEmail);
    const enterPwd = page.getByPlaceholder("Enter your Password").first();
    await enterPwd.fill(`${userName.Password}`);
    await page
      .getByPlaceholder("Re-Enter your Password")
      .fill(`${userName.Password}`);
    await page.getByRole("button", { name: "Sign Up" }).click();
    await page.waitForTimeout(5000);
    await page.close();
  });
