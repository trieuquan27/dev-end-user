import { expect, test } from '@playwright/test';

test.use({viewport:{width:1920,height:961}})

test('GCI coin refund', async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/');
 
  await page
    .locator('div')
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole('button', { name: 'Sign In' })
    .click();
  //await page.getByPlaceholder('Enter your phone/email').click();
  await page.getByPlaceholder('Enter your email').fill('a@a.com');
  //await page.getByPlaceholder('Enter your phone').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('Trieu123456789@');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/');
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await page.click("(//p[text()='Wallet'])[1]");
  await page.click("//button[text()='Current Deals']");
  await page.click("(//a[contains(@class,'body-md-14 text-center')])[1]");
  await expect(page.getByText("Receipt Details")).toBeVisible();
  await expect(page.getByText('GO CHECKIN COIN',{exact: true})).toBeVisible();
  await page.click("//a[contains(text(),'Edit or Cancel Order')]");
  await page.waitForTimeout(3000);
  await expect(page.getByText("Edit Order")).toBeVisible();
  await page.click("button[role='checkbox']");
  await page.click("button[value='original_payment_method']");
  await page.click("(//div[contains(@class,'flex flex-col')])[3]");
  await page.waitForTimeout(2000);
  await page.click("//button[text()='Cancel Order']");
  await page.click("//button[text()='Order Refund (']");
  await expect(page.getByText("Receipt Refund Details")).toBeVisible();
  await expect(page.getByText("Your cancel request has been submitted")).toBeVisible();
  await expect(page.getByText("GO CHECKIN COIN",{exact: true})).toBeVisible();
});