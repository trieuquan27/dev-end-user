import { expect, test } from "@playwright/test";
import { isFinished } from "../../common/getapi";

test.use({ viewport: { width: 1257, height: 961 } }),
  test("view order detail after placing order successfully by SAVED JCB", async ({
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
    //await page.getByPlaceholder('Enter your phone/email').click();
    await page.getByPlaceholder("Enter your email").fill("a@a88.com");
    //await page.getByPlaceholder('Enter your phone').press('Tab');
    await page.getByPlaceholder("Enter your password").fill("Trieu123456789@");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL("/");
    await page.click("img[alt='Nail Polish']");
    await page.getByRole("button", { name: "Buy Now" }).click({ delay: 200 });
    await expect(page).toHaveURL("/cart");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Proceed To Checkout" }).click();
    await expect(page).toHaveURL(/.*checkout/);
    const response = await page.waitForResponse(
      async (response) =>
        await isFinished({
          response: response,
          path: "https://dev.gocheckin.io/graphql?CustomerPaymentMethod",
        })
    );
    if (response.status() === 200) {
      console.log("result success", response.url());
      await page
        .getByRole("radio", { name: "Card type JCB •••• •••• •••• 5841" })
        .click();
      await page.getByRole("button", { name: "Place Order" }).dblclick();
      await page.waitForTimeout(5000);
      //   await expect(
      //     page.getByText("Something went wrong. Please try again later.")
      //   ).not.toBeVisible();

      //   await expect(page.getByText("Cart Must have a payment.")).toBeVisible();
      //   await expect(page.getByText("Order placed successfully")).toBeVisible();
      await expect(
        page.getByText("Payment failed. Please check your payment information.")
      ).not.toBeVisible();
      await expect(page).toHaveURL(/.*thank-you/);
      await page.waitForTimeout(3000);
      await page.click("//a[contains(text(),'View Order')]");
      await expect(page).toHaveURL(/.*order/);
      await expect(page.getByText("Receipt Details")).toBeVisible();
    } else {
      console.log("result failed", response.url());
    }

    page.close();
  });
