import { test, expect } from "@playwright/test";
import { userName6 } from "../../common/AccountList";
//test AfterEach
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
// Mobile viewport
test.use({ viewport: { width: 490, height: 896 } }),
  test("Mobile Visa refund with order in 24h ", async ({ page }) => {
    await page.goto("/");
    await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
    await page.click("(//span[contains(@class,'flex items-center')])[3]");
    await expect(page).toHaveURL("/signin");
    await page.fill('input[name="username"]', `${userName6.Name}`);
    await page.fill('input[name="password"]', `${userName6.Password}`);
    await page.click("(//button[contains(@class,'flex items-center')])[1]");
    await expect(page).toHaveURL("/");
    await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
    await page.click("//a[contains(text(),'Wallet')]");
    await expect(page.getByText("Current Deals")).toBeVisible();
    await page.click("(//a[contains(@class,'body-md-14 text-center')])[1]");
    await page.waitForTimeout(3000);
    await expect(page.getByText("•••• •••• •••• 4242")).toBeVisible();
    await page.click("//a[contains(text(),'Edit or Cancel Order')]");
    await expect(
      page.getByText("•••• •••• •••• 4242", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText(
        "With order in 24h or less at the time of purchase, you can only cancel your order. Please contact us to edit your order."
      )
    ).toBeVisible();
    expect(page.getByAltText("checked icon").isChecked).toBeTruthy();

    page.close();
  });
