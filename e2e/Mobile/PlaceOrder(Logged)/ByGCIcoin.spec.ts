import { expect, test } from '@playwright/test';
test.use({viewport:{width:490,height:896}}),
test('Mobile Place order by GCI coin', async ({ page }) => {
  await page.goto('/');
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//button[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL('/signin');
  await page.fill('input[name="username"]', 'a@a68.com');
  await page.fill('input[name="password"]', 'Trieu123456789@');
  await page.click("(//button[contains(@class,'flex items-center')])[1]");
  await expect(page).toHaveURL('/');
  await page.click("img[alt='Nail Polish']");
  await page.getByRole('button', { name: 'Buy Now' }).click({delay:200});
  await expect(page).toHaveURL('/cart');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Proceed To Checkout' }).click();
  await expect(page).toHaveURL(/.*checkout/);
  // await page.waitForTimeout(5000);
  // await page.getByRole('radio', { name: 'Card type Visa •••• •••• •••• 1111' }).click();
  await page.waitForTimeout(6000);
  // await expect(page.getByText('Delete')).toBeVisible();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('Order placed successfully')).toBeVisible();
  await expect(page).toHaveURL(/.*thank-you/);
  await page.waitForTimeout(3000);
  await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText('Receipt Details')).toBeVisible();

});
