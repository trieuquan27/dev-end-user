import { test, expect } from "@playwright/test";
//test AftereEach
// test.afterEach(async ({ page }, testInfo) => {
//   console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

//   if (testInfo.status !== testInfo.expectedStatus)
//     console.log(`Did not run as expected, ended up at ${page.url()}`);
// });
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
