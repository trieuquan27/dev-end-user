// import { expect, test } from "@playwright/test";

// test("locate multi links in web", async ({ browser }) => {
//   test.setTimeout(60000);
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto("/");
//   const links = await page.$$("a");
//   //   console.log("Links", links);
//   for (const link of links) {
//     const linkTest = await link.textContent();
//     console.log(linkTest);
//   }
// });
