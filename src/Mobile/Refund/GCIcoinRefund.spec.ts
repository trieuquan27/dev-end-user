import { test, expect } from "@playwright/test";
import { userName5 } from "../../common/AccountList";
test.use({ viewport: { width: 490, height: 896 } });
test("Mobile GCI coin refund", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("//button[contains(@name,'Sign In')]");
  await page.getByPlaceholder("Enter your email").fill(`${userName5.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName5.Password}`);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("//a[contains(text(),'Wallet')]");
  await expect(page.getByText("Current Deals")).toBeVisible();
  await page.click("(//a[contains(@class,'body-md-14 text-center')])[1]");
  await page.waitForTimeout(3000);
  await expect(
    page.getByText("GO CHECKIN COIN", { exact: true })
  ).toBeVisible();
  await page.click("//a[contains(text(),'Edit or Cancel Order')]");
  await page.getByRole("checkbox").click();
  await expect(
    page.getByText("GO CHECKIN COIN", { exact: true })
  ).toBeVisible();
  await page.getByRole("checkbox").isChecked();
  await page.getByRole("radio").click();
  expect(
    page.getByLabel(
      "//label[contains(@for,'select-1ee1f9a3-6da8-633a-beeb-27d968a5b782')]//button[1]"
    ).isDisabled
  ).toBeTruthy();
  page.close();
});
