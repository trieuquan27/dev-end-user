import { test, expect } from "@playwright/test";
import { makeEmail } from "../../common/randomemail";

test("Valid Signup", async ({ page }) => {
  await page.goto("/");
  for (let index = 0; index < 5; index++) {
    await page.getByRole("button", { name: "Sign In" }).first().click();
    await expect(page).toHaveURL("/signin");
    await page.getByRole("link", { name: "Sign Up" }).click();
    await page.getByPlaceholder("Enter your email").fill(makeEmail());
    await page.getByPlaceholder("Enter your Password").fill("Trieu123456789@");
    await page
      .getByPlaceholder("Re-Enter your Password")
      .fill("Trieu123456789@");
    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.close();
  }
});
