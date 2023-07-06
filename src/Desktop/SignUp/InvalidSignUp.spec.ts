import { test, expect } from "@playwright/test";
import { randomEmail } from "../../common/randomemail";
import { invalidString } from "../../common/Invalidstring";
import { randomNum } from "../../common/RandomNumber";

test("A mixture of numbers and combination of uppercase and lowercase letters", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign In" }).first().click();
  await expect(page).toHaveURL("/signin");
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.waitForTimeout(3000);
  await page.getByPlaceholder("Enter your email").fill(randomEmail);
  // Get sign-up password fill
  const enterPwd = page.getByPlaceholder("Enter your Password").first();
  await enterPwd.fill(invalidString);
  await page.getByPlaceholder("Re-Enter your Password").fill(invalidString);
  await page.getByRole("button", { name: "Sign Up" }).click();
  await expect(
    page
      .getByText(
        "A mixture of numbers and combination of uppercase and lowercase letters"
      )
      .count()
  ).toEqual[1];
  await page.waitForTimeout(2000);
  page.close();
});

test("Password not match", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign In" }).first().click();
  await expect(page).toHaveURL("/signin");
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.waitForTimeout(3000);
  await page.getByPlaceholder("Enter your email").fill(randomEmail);
  // Get sign-up password fill
  const enterPwd = page.getByPlaceholder("Enter your Password").first();
  await enterPwd.fill(`${randomNum}`);
  await page.getByPlaceholder("Re-Enter your Password").fill(invalidString);
  await page.getByRole("button", { name: "Sign Up" }).click();
  await expect(page.getByText("The password doesn't match").count()).toEqual[1];
  await page.waitForTimeout(2000);
  page.close();
});

test("At least 8 characters", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign In" }).first().click();
  await expect(page).toHaveURL("/signin");
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.waitForTimeout(3000);
  await page.getByPlaceholder("Enter your email").fill(randomEmail);
  // Get sign-up password fill
  const enterPwd = page.getByPlaceholder("Enter your Password").first();
  await enterPwd.fill(randomNum);
  await page.getByPlaceholder("Re-Enter your Password").fill(randomNum);
  await page.getByRole("button", { name: "Sign Up" }).click();
  await expect(page.getByText("At least 8 characters").count()).toEqual[1];
  await page.waitForTimeout(2000);
  page.close();
});
