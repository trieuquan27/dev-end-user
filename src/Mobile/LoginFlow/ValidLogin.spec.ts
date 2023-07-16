import { expect, test } from "@playwright/test";
import { userName } from "../../common/AccountList";

// Mobile viewport
test.use({ viewport: { width: 490, height: 896 } });
test("Login account", async ({ page }) => {
  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  // await page.fill('input[name="username"]', "a@a68.com");
  await page.fill('input[name="username"]', `${userName.Name}`);
  await page.fill('input[name="password"]', `${userName.Password}`);
  await page.waitForTimeout(1000);
  await expect(page.getByRole("checkbox", { name: "Remember me" })).toBeChecked;
  await expect(
    page.getByText(
      "By clicking below, I have read and agree the Term of Use and the Privacy Policy"
    )
  ).toBeVisible();
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL("/");
  page.close();
});
