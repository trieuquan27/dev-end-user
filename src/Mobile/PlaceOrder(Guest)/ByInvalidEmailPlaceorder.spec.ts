import { expect, test } from "@playwright/test";
test.use({ viewport: { width: 490, height: 896 } }),
  test("Invalid Mobile Place order by Guest", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
    await page.click("img[alt='Nail Polish']");
    await page.getByRole("button", { name: "Buy Now" }).click({ delay: 200 });
    await expect(page).toHaveURL("/cart");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Proceed To Checkout" }).click();
    await expect(page).toHaveURL(/.*checkout/);
    await page.waitForTimeout(6000);
    await page.fill('//input[@placeholder="Enter email"]', "d@d+11.com");
    await page.click("//button[text()='Add']");
    await page.fill('input[name="firstName"]', "Test");
    await page.fill('input[name="lastName"]', "Abc");
    await page.fill('input[name="cardNumber"]', "4242424242424242");
    await page.fill('input[name="expireDate"]', "11/26");
    await page.fill('input[name="cvv"]', "123");
    await page.fill('input[name="address"]', "345");
    await page.fill('input[name="zipcode"]', "123");
    await page.waitForTimeout(3000);
    await page.click("//button[normalize-space()='Add Card']");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Place Order" }).click();
    await page.waitForTimeout(3000);
    await expect(
      page.getByText("This value is not a valid email address.")
    ).toBeVisible();
  });
