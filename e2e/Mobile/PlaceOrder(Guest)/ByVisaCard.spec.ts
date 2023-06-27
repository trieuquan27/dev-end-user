import { expect, test } from '@playwright/test';
test.use({viewport:{width:490,height:896}}),
test('Mobile Place order by Visa Guest', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await page.click("img[alt='Nail Polish']");
  await page.getByRole('button', { name: 'Buy Now' }).click({delay:200});
  await expect(page).toHaveURL('/cart');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Proceed To Checkout' }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.waitForTimeout(6000);
  await page.fill('//input[@placeholder="Enter email"]','d@a.com');
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', 'Test');
  await page.fill('input[name="lastName"]', 'Abc');
  await page.fill('input[name="cardNumber"]', '4242424242424242');
  await page.fill('input[name="expireDate"]', '11/26');
  await page.fill('input[name="cvv"]', '123');
  await page.fill('input[name="address"]', '345');
  await page.fill('input[name="zipcode"]', '123');
  await page.waitForTimeout(3000);
  await page.click("//button[normalize-space()='Add Card']");
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Place Order' }).dblclick();
  await page.waitForTimeout(3000);
  await expect(page.getByText('Order placed successfully')).toBeVisible();
  await expect(page).toHaveURL(/.*thank-you/);
  await page.waitForTimeout(3000);
  await page.click("//button[normalize-space()='View Order']");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText('Create an Account')).toBeVisible();

});
