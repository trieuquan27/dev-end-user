import { test, expect } from "@playwright/test";
import { userName } from "../../common/AccountList";

test("Valid login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.getByRole("button", { name: "Sign in" }).first().click();
  await expect(page).toHaveURL(/.*signin/);
  await page.getByPlaceholder("Enter your email").fill(`${userName.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName.Password}`);
  await page.waitForTimeout(1000);
  await expect(page.getByRole("checkbox", { name: "Remember me" })).toBeChecked;
  await expect(
    page.getByText(
      "By clicking below, I have read and agree the Term of Use and the Privacy Policy"
    )
  ).toBeVisible();
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL("/");
  await page.close();
});
