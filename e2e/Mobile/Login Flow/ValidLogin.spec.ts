import { expect, test } from '@playwright/test';
test.use({viewport:{width:490,height:896}}),
test('Login account', async ({ page }) => {
  await page.goto('/');
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//button[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL('/signin');
  await page.fill('input[name="username"]', 'a@a68.com');
  await page.fill('input[name="password"]', 'Trieu123456789@');
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL('/');
});
