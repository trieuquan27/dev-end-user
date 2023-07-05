import { expect, test } from "@playwright/test";
import { getApi } from "../../common/getapi";
import { userName6 } from "../../common/AccountList";
import {
  randomAddress,
  randomFirstName,
  randomLastName,
} from "../../common/randomname";
import { randomCVV, randomZipCode } from "../../common/randomnumber";

test.use({ viewport: { width: 490, height: 896 } }),
  test("Mobile Place order by Visa card", async ({ page, context }) => {
    await page.goto("/");
    await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
    await page.click("(//span[contains(@class,'flex items-center')])[3]");
    await expect(page).toHaveURL("/signin");
    // await page.fill('input[name="username"]', "a@a0.com");
    await page.fill('input[name="username"]', `${userName6.Name}`);
    await page.fill('input[name="password"]', `${userName6.Password}`);
    await page.click("(//button[contains(@class,'flex items-center')])[1]");
    await expect(page).toHaveURL("/");
    const storageState = await context.storageState();
    console.log(storageState.origins[0].localStorage);
    await page.click("(//img[@class='object-cover'])[1]", { delay: 500 });
    await page.getByRole("button", { name: "Buy Now" }).click({ delay: 600 });
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL("/cart");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Proceed To Checkout" }).click();
    await expect(page).toHaveURL(/.*checkout/);
    await page.click("//button[text()='Add']");
    await page.fill('input[name="firstName"]', `${randomFirstName}`);
    await page.fill('input[name="lastName"]', `${randomLastName}`);
    await page.fill('input[name="cardNumber"]', "4242424242424242");
    await page.fill('input[name="expireDate"]', "10/27");
    await page.fill('input[name="cvv"]', `${randomCVV}`);
    await page.fill('input[name="address"]', `${randomAddress}`);
    await page.fill('input[name="zipcode"]', `${randomZipCode}`);
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Add Card" }).click();
    const response = await page.waitForResponse(
      async (response) =>
        await getApi({ response: response, path: "/xml/v1/request.api" })
    );
    if (response.status() === 200) {
      console.log("result success", response.url());
      await page.waitForTimeout(5000);
      const checkBox = page.getByRole("button", { name: "checkbox" });
      // console.log(checkBox);
      expect(checkBox.isChecked).toBeTruthy();
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
      expect(page.getByText("Order placed successfully")).toBeVisible();
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL(/.*thank-you/);
      await page.click("//a[contains(text(),'View Order')]");
      await expect(page).toHaveURL(/.*order/);
      await expect(page.getByText("Receipt Details")).toBeVisible();
    } else {
      await expect(page.getByText("Payment Failed")).toBeVisible();
      console.log("result failed", response.url());
    }

    page.close();
  });
