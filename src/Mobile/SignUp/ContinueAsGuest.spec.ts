import { expect, test } from "@playwright/test";
//test AfterEach
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
// Mobile viewport
test.use({ viewport: { width: 490, height: 896 } });
test("continue as guest", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  //   let guestBtn = await page.$("a");
  //   await guestBtn?.click();
  await page.click("(//a[normalize-space()='Continue as Guest'])");
  await expect(page).toHaveURL("/");
  page.close();
});
