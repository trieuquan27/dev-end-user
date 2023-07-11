import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1920, height: 961 } });

test("continue as guest", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  await page.click("(//a[normalize-space()='Continue as Guest'])");
  await expect(page).toHaveURL("/");
  page.close();
});
