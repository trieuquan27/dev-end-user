import { expect, test } from "@playwright/test";
import { getApi } from "../../common/getapi";
import { userName6, userName4, userName2 } from "../../common/AccountList";
import {
  randomAddress,
  randomFirstName,
  randomLastName,
} from "../../common/randomname";
import { randomCVV, randomZipCode } from "../../common/RandomNumber";
import { credit } from "../../common/CreditCard";
//test AfterEach
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
// Mobile viewport
test.use({ viewport: { width: 490, height: 896 } });
test("Mobile Place order by Visa card", async ({ page, context }) => {
  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
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
test("Mobile auto fill email when place order by JCB", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Navigate to mainpage
  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  // await page.getByPlaceholder("Enter your email").fill("a@a88.com");
  await page.getByPlaceholder("Enter your email").fill(`${userName4.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName4.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await expect(
    page.getByText("Apply your Go Checkin Coin at checkout!")
  ).toBeVisible();
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).dblclick({ delay: 600 });
  await page.waitForTimeout(5000);
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.waitForTimeout(3000);
  await page
    .getByRole("radio", { name: "Card type JCB •••• •••• •••• 5841" })
    .click();
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName4.Name}`
  );
  // Check email placeoholder is disabled
  await expect(page.getByPlaceholder("Enter email")).toBeDisabled();
  await expect(
    page.getByText(
      "We’ll use your email to send you information related to this order"
    )
  ).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByRole("checkbox").click();
  // Check term checkbox is unchecked;
  await expect(page.getByRole("checkbox")).toHaveAttribute(
    "data-state",
    "unchecked"
  );
  await expect(page.getByText("Our Terms")).toHaveClass(
    "cursor-pointer font-bold text-primary underline"
  );
  await page.getByText("Our Terms").click();
  await expect(page.getByRole("button", { name: "I Agree" })).toBeVisible();
  await page.getByRole("button", { name: "I Agree" }).click();
  // Check term checkbox is checked;
  await expect(page.getByRole("checkbox")).toHaveAttribute(
    "data-state",
    "checked"
  );
  await page.waitForTimeout(2000);
  // Place order
  await page.getByRole("button", { name: "Place Order" }).dblclick();
  expect(await page.getByText("Something went wrong").count()).toEqual(0);
  expect(
    await page
      .getByText("Payment failed. Please check your payment information.")
      .count()
  ).toEqual(0);
  expect(await page.getByText("Cart Must have a payment.").count()).toEqual(0);
  await expect(page.getByText("Order placed successfully")).toBeVisible();
  // Navigate to thank you page
  await expect(page).toHaveURL(/.*thank-you/);
  await page.waitForTimeout(3000);
  await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Receipt Details")).toBeVisible();

  page.close();
});
test("Mobile Place order by Master Card", async ({ page, context }) => {
  await page.goto("/");
  await page.click("//*[name()='path' and contains(@fill-rule,'evenodd')]");
  await page.click("(//span[contains(@class,'flex items-center')])[3]");
  await expect(page).toHaveURL("/signin");
  // await page.fill('input[name="username"]', "a@a88.com");
  await page.fill('input[name="username"]', `${userName2.Name}`);
  await page.fill('input[name="password"]', `${userName2.Password}`);
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
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.mastercard}`);
  await page.fill('input[name="expireDate"]', "05/34");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.getByRole("button", { name: "Add Card" }).click({ delay: 500 });
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Place Order" }).click({ delay: 500 });
  await expect(page.getByText("Order placed successfully")).toBeVisible();
  await expect(page).toHaveURL(/.*thank-you/);
  await page.waitForTimeout(3000);
  await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Receipt Details")).toBeVisible();
  page.close();
});
