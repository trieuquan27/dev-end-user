import { test, expect } from "@playwright/test";
import { randomEmail } from "../../common/randomemail";
import { emailPwd } from "../../common/randompwd";
import { userName } from "../../common/AccountList";

test("Valid Signup", async ({ page }) => {
  await page.goto("/");
  // for (let index = 0; index < 5; index++) {}
  await page.getByRole("button", { name: "Sign In" }).first().click();
  await expect(page).toHaveURL("/signin");
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.waitForTimeout(3000);
  await page.getByPlaceholder("Enter your email").fill(randomEmail);
  // enter password
  let enterPwd = page.getByPlaceholder("Enter your Password").first();
  await enterPwd.fill(`${userName.Password}`);
  await page
    .locator(
      "(//span[contains(@class,'cursor-pointer text-neutral-tints')])[1]"
    )
    .click();
  await expect(enterPwd).toHaveAttribute("type", "text");
  //re-enter password
  let reenterPwd = page.getByPlaceholder("Re-Enter your Password");
  await reenterPwd.fill(`${userName.Password}`);
  await page
    .locator(
      "(//span[contains(@class,'cursor-pointer text-neutral-tints')])[2]"
    )
    .click();
  await expect(reenterPwd).toHaveAttribute("type", "text");
  await page.getByRole("button", { name: "Sign Up" }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/.*verification/);
  await expect(
    page.getByRole("button", { name: "Resend Email" })
  ).toBeVisible();
  await page.close();
});
