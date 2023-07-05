import { expect, test } from "@playwright/test";
import { getApi } from "../../common/getapi";
import { randomCVV } from "../../common/randomnumber";
import { randomFirstName } from "../../common/randomname";
import { randomLastName } from "../../common/randomname";

test.use({ viewport: { width: 1920, height: 961 } });

test("view order detail after placing order successfully by visa", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  await page.getByPlaceholder("Enter your email").fill("a@a78.com");
  await page.getByPlaceholder("Enter your password").fill("Trieu123456789@");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  const storageState = await context.storageState();
  console.log(storageState.origins[0]);
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 500 });
  await expect(page).toHaveURL("/cart");
  const response = await page.waitForResponse(
    async (response) =>
      await getApi({ response: response, path: "/graphql?CartByPK" }),
    { timeout: 10000 }
  );
  if (response.status() === 200) {
    console.log(response);
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: "Proceed To Checkout" }).click();
    await expect(page).toHaveURL(/.*checkout/);
    await page.click("//button[text()='Add']");
    await page.fill('input[name="firstName"]', `${randomFirstName}`);
    await page.fill('input[name="lastName"]', `${randomLastName}`);
    await page.fill('input[name="cardNumber"]', "4111111111111111");
    await page.fill('input[name="expireDate"]', "01/26");
    await page.fill('input[name="cvv"]', `${randomCVV}`);
    await page.fill('input[name="address"]', `${randomCVV}`);
    await page.fill('input[name="zipcode"]', "123");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Add Card" }).click();
    await page.waitForTimeout(3000);
    const checkBox = page.getByRole("button", { name: "checkbox" });
    // console.log(checkBox);
    expect(checkBox.isChecked).toBeTruthy();
    await page.waitForTimeout(5000);
    await page.getByRole("button", { name: "Place Order" }).click();
    expect(await page.getByText("Something went wrong").count()).toEqual(0);
    expect(
      await page
        .getByText("Payment failed. Please check your payment information.")
        .count()
    ).toEqual(0);
    expect(await page.getByText("Cart Must have a payment.").count()).toEqual(
      0
    );
    // await expect(page.getByText("Order placed successfully")).toBeVisible();
    await page.click("//a[contains(text(),'View Order')]");
    await expect(page).toHaveURL(/.*order/);
    await expect(page.getByText("Receipt Details")).toBeVisible();
  }

  page.close();
});
