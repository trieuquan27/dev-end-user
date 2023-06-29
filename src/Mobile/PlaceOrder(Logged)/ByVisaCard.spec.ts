import { expect, test } from "@playwright/test";
import { isFinished } from "../../common/getapi";

test.use({ viewport: { width: 490, height: 896 } }),
  test("Mobile Place order by Visa card", async ({ page, context }) => {
    await page.goto("/");
    await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
    await page.click("(//span[contains(@class,'flex items-center')])[3]");
    await expect(page).toHaveURL("/signin");
    await page.fill('input[name="username"]', "a@a0.com");
    await page.fill('input[name="password"]', "123456");
    await page.click("(//button[contains(@class,'flex items-center')])[1]");
    await expect(page).toHaveURL("/");

    const storageState = await context.storageState();
    console.log(storageState.origins[0].localStorage);

    await page.click("img[alt='Nail Polish']");
    // await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Buy Now" }).click({ delay: 600 });
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL("/cart");
    await page.waitForTimeout(5000);
    await page.getByRole("button", { name: "Proceed To Checkout" }).click();
    await expect(page).toHaveURL(/.*checkout/);
    await page.click("//button[text()='Add']");
    await page.fill('input[name="firstName"]', "Test");
    await page.fill('input[name="lastName"]', "Abc");
    await page.fill('input[name="cardNumber"]', "4242424242424242");
    await page.fill('input[name="expireDate"]', "10/27");
    await page.fill('input[name="cvv"]', "456");
    await page.fill('input[name="address"]', "433");
    await page.fill('input[name="zipcode"]', "11113");
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Add Card" }).click();
    await page.waitForTimeout(5000);

    await page
      .getByRole("button", { name: "Place Order" })
      .click({ delay: 500 });

    const response = await page.waitForResponse(
      async (response) =>
        await isFinished({ response: response, path: "/xml/v1/request.api" })
    );
    if (response.status() === 200) {
      console.log("result success", response.url());
      await page.waitForTimeout(5000);
      await expect(page.getByText("Order placed successfully")).toBeVisible();
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
    // const responseAPICreateCart = await page.waitForResponse(
    //   async (response) =>
    //     await isFinished({ response: response, path: "CreateCart" })
    // );
    // if (response.status() === 200) {
    //   console.log("result success", response.url());
    // } else {
    //   console.log("result failed", response.url());
    // }
  });
