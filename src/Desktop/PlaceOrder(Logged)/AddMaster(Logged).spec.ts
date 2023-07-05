import { expect, test } from "@playwright/test";
import { randomFirstName, randomLastName } from "../../common/randomname";
import { randomCVV, randomZipCode } from "../../common/randomnumber";

test.use({ viewport: { width: 1257, height: 961 } }),
  test("view order detial after placing order successfully by mastercard", async ({
    browser,
  }) => {
    test.setTimeout(60000);
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/");
    await page
      .locator("div")
      .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
      .getByRole("button", { name: "Sign In" })
      .click();
    await page.getByPlaceholder("Enter your email").fill("a@a4.com");
    await page.getByPlaceholder("Enter your password").fill("Trieu123456789@");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL("/");
    await page.click("(//img[@class='object-cover'])[1]");
    await page.getByRole("button", { name: "Buy Now" }).click({ delay: 300 });
    await expect(page).toHaveURL("/cart");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Proceed To Checkout" }).click();
    await expect(page).toHaveURL(/.*checkout/);
    await page.click("//button[text()='Add']");
    await page.fill('input[name="firstName"]', `${randomFirstName}`);
    await page.fill('input[name="lastName"]', `${randomLastName}`);
    await page.fill('input[name="cardNumber"]', "5555555555554444");
    await page.fill('input[name="expireDate"]', "01/25");
    await page.fill('input[name="cvv"]', `${randomCVV}`);
    await page.fill('input[name="address"]', "623");
    await page.fill('input[name="zipcode"]', `${randomZipCode}`);
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Add Card" }).click();
    await page.waitForTimeout(3000);
    const checkBox = page.getByRole("button", { name: "checkbox" });
    // console.log(checkBox);
    expect(checkBox.isChecked).toBeTruthy();
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Place Order" }).dblclick();
    expect(await page.getByText("Something went wrong").count()).toEqual(0);
    expect(
      await page
        .getByText("Payment failed. Please check your payment information.")
        .count()
    ).toEqual(0);
    expect(await page.getByText("Cart Must have a payment.").count()).toEqual(
      0
    );
    // await expect(page).toHaveURL(/.*thank-you/);
    await page.waitForTimeout(3000);
    await page.click("//a[contains(text(),'View Order')]");
    await expect(page).toHaveURL(/.*order/);
    await expect(page.getByText("Receipt Details")).toBeVisible();
    page.close();
  });
