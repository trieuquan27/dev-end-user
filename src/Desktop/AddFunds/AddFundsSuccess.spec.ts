import { expect, test } from "@playwright/test";
import { getApi } from "../../common/getapi";
// test.use({viewport:{width:490,height:896}}),
test("Add Funds Success", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button").first().click();
  await expect(page).toHaveURL("/signin");
  await page.fill('input[name="username"]', "a@a68.com");
  await page.fill('input[name="password"]', "Trieu123456789@");
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL("/");
  await page.click("((//button[contains(@class,'flex items-center')])[1])");
  await page.click("(//img[@class='mr-2'])[1]");
  await page.click("(//div[contains(@class,'w-full flex-none')]//button[1])");
  const response = await page.waitForResponse(
    async (response) =>
      await getApi({
        response: response,
        path: "/graphql?CustomerPaymentMethod",
      })
  );
  if (response.status() === 200) {
    console.log("result success", response.url());
    await page.fill("input", "10");
    await page.click("//div[@class='flex items-center']");
    await page.waitForTimeout(3000);
    await expect(page.getByText("Add funds successfully!")).toBeVisible();
  } else {
    console.log("result failed", response.url());
  }

  page.close();
});
