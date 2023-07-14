import { randomEmail } from "../../common/randomemail";
import { userName } from "../../common/AccountList";
import { test, expect } from "@playwright/test";
//test AfterEach
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
// Mobile viewport
test.use({ viewport: { width: 490, height: 896 } });
test("Mobile Valid Signup", async ({ page }) => {
  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
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
  await page
    .locator(
      "(//span[contains(@class,'cursor-pointer text-neutral-tints')])[1]"
    )
    .click();
  await expect(enterPwd).toHaveAttribute("type", "password");
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
