import { test, expect } from "@playwright/test";

// test script
test("mailhog", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: "fastboy",
      password: "ilovefastboy",
    },
  });
  const page = await context.newPage();
  // Navigate to mailhog page
  await page.goto("https://deal.mailhog.fastboy.dev/");
  await expect(page).toHaveURL("https://deal.mailhog.fastboy.dev/");
  await page
    .locator("(//div[contains(@class,'msglist-message row')])[1]")
    .click();
  const wait = page.waitForTimeout(2000);
  await wait;
  await page.getByTitle("Back to Inbox").click();
  await wait;
  await expect(page).toHaveURL("https://deal.mailhog.fastboy.dev/");
  await page.close();
});
