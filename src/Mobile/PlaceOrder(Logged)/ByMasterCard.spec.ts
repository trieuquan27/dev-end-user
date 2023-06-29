import { expect, test } from "@playwright/test";
test.use({ viewport: { width: 490, height: 896 } }),
  test("Mobile Place order by Master Card", async ({ page, context }) => {
    await page.goto("/");
    await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
    await page.click("(//span[contains(@class,'flex items-center')])[3]");
    await expect(page).toHaveURL("/signin");
    await page.fill('input[name="username"]', "a@a88.com");
    await page.fill('input[name="password"]', "Trieu123456789@");
    await page.click("(//button[contains(@class,'flex items-center')])[1]");
    await expect(page).toHaveURL("/");

    const storageState = await context.storageState();
    console.log(storageState.origins[0].localStorage);

    await page.click("(//img[@class='object-cover'])[1]");
    // await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Buy Now" }).click({ delay: 500 });
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL("/cart");
    await page
      .getByRole("button", { name: "Proceed To Checkout" })
      .click({ delay: 500 });
    await expect(page).toHaveURL(/.*checkout/);
    await page.click("//button[text()='Add']");
    await page.fill('input[name="firstName"]', "Test");
    await page.fill('input[name="lastName"]', "Abc");
    await page.fill('input[name="cardNumber"]', "5555555555554444");
    await page.fill('input[name="expireDate"]', "05/26");
    await page.fill('input[name="cvv"]', "123");
    await page.fill('input[name="address"]', "123");
    await page.fill('input[name="zipcode"]', "123");
    await page.getByRole("button", { name: "Add Card" }).click({ delay: 500 });
    await page.waitForTimeout(3000);
    await page
      .getByRole("button", { name: "Place Order" })
      .click({ delay: 500 });
    await page.waitForTimeout(3000);
    await expect(page.getByText("Order placed successfully")).toBeVisible();
    await expect(page).toHaveURL(/.*thank-you/);
    await page.waitForTimeout(3000);
    await page.click("//a[contains(text(),'View Order')]");
    await expect(page).toHaveURL(/.*order/);
    await expect(page.getByText("Receipt Details")).toBeVisible();
  });
