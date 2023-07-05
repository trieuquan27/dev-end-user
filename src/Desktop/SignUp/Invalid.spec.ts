import { test, expect } from "@playwright/test";

test("Invalid Signup", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign In" }).first().click();
  await expect(page).toHaveURL("/signin");
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.getByPlaceholder("Enter your email").fill("p@p.com");
  await page.getByPlaceholder("Enter your Password").fill("");
  await page.getByPlaceholder("Re-Enter your Password").fill("Trieu123456789@");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await page.close();
});
