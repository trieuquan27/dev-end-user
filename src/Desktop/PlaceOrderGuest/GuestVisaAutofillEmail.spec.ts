import { expect, test } from "@playwright/test";

test("Guest using visa", async ({ browser }) => {
  const context = await browser.newContext();
  test.setTimeout(60000);
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.click("img[alt='Nail Polish']");
  await page.getByRole("button", { name: "Buy Now" }).click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL("/cart");
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.click("input[placeholder='Enter email']");
  await page.fill("input[placeholder='Enter email']", "b@b.com");
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', "Test");
  await page.fill('input[name="lastName"]', "Abc");
  await page.fill('input[name="cardNumber"]', "4242424242424242");
  await page.fill('input[name="expireDate"]', "01/26");
  await page.fill('input[name="cvv"]', "123");
  await page.fill('input[name="address"]', "aaa");
  // await page.fill('input[name="city"]', '123');
  // await page.fill('input[name="state"]', '123');
  await page.fill('input[name="zipcode"]', "128");

  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(3000);
  // await expect(page.getByText('Delete')).toBeVisible();
  await page.getByRole("button", { name: "Place Order" }).dblclick();
  await page.waitForTimeout(5000);
  await expect(page.getByText("Order placed successfully")).toBeVisible();
  await expect(page).toHaveURL(/.*thank-you/);
  // await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Create Account")).toBeVisible();
  await expect(page.getByText("b@b.com")).toBeVisible();
  await expect(page.getByPlaceholder("Enter your email")).toHaveValue(
    "b@b.com"
  );
});
