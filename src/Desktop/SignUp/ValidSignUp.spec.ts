import { test, expect } from "@playwright/test";
import { makeEmail } from "../../common/randomemail";
import { emailPwd } from "../../common/randompwd";

test("Valid Signup", async ({ page }) => {
  await page.goto("/");
  // for (let index = 0; index < 5; index++) {}
  await page.getByRole("button", { name: "Sign In" }).first().click();
  await expect(page).toHaveURL("/signin");
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.waitForTimeout(3000);
  await page.getByPlaceholder("Enter your email").fill(makeEmail());
  const enterPwd = page.getByPlaceholder("Enter your Password").first();
  await enterPwd.fill(emailPwd);
  await page.getByPlaceholder("Re-Enter your Password").fill(emailPwd);
  await page.getByRole("button", { name: "Sign Up" }).click();
  await page.waitForTimeout(5000);
  await page.close();
});
