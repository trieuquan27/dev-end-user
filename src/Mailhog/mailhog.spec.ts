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
  await page.goto("https://deal.mailhog.fastboy.dev/");
  await expect(page).toHaveURL("https://deal.mailhog.fastboy.dev/");
  await page.close();
});
