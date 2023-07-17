import { expect, test } from "@playwright/test";
import {
  randomAddress,
  randomFirstName,
  randomLastName,
} from "../../common/randomname";
import { randomCVV, randomZipCode } from "../../common/RandomNumber";
import {
  userName,
  userName2,
  userName3,
  userName4,
} from "../../common/AccountList";
import { credit } from "../../common/CreditCard";

//Before Each navigate to homepage
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
});
//After Each logout
test.afterEach(async ({ page }) => {
  page.close();
});

//Test scripts
test("Place order successfully by mastercard subcribed", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  // a@a4.com
  await page.getByPlaceholder("Enter your email").fill(`${userName2.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName2.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 300 });
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName2.Name}`
  );
  //Add card infor
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.mastercard}`);
  await page.fill('input[name="expireDate"]', "01/25");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomAddress}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(3000);
  // Check term checkbox is checked;
  await expect(page.getByRole("checkbox")).toHaveAttribute(
    "data-state",
    "checked"
  );
  await page.waitForTimeout(3000);
  //Place order

  await page.getByRole("button", { name: "Place Order" }).dblclick();
  expect(await page.getByText("Something went wrong").count()).toEqual(0);
  expect(
    await page
      .getByText("Payment failed. Please check your payment information.")
      .count()
  ).toEqual(0);
  expect(await page.getByText("Cart Must have a payment.").count()).toEqual(0);
  await page.waitForTimeout(3000);
  //Navigate to view order page
  await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Receipt Details")).toBeVisible();
});
test("Place order successfully by GCI coin subcribed", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  // account a@a.com
  await page.getByPlaceholder("Enter your email").fill(`${userName.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 200 });
  await page.waitForTimeout(5000);
  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  await page.waitForTimeout(3000);
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName.Name}`
  );

  // Check term checkbox is checked;
  await expect(page.getByRole("checkbox")).toHaveAttribute(
    "data-state",
    "checked"
  );
  //Place order
  await page
    .getByRole("button", { name: "Place Order" })
    .dblclick({ delay: 200 });
  expect(await page.getByText("Something went wrong").count()).toEqual(0);
  expect(
    await page
      .getByText("Payment failed. Please check your payment information.")
      .count()
  ).toEqual(0);
  expect(await page.getByText("Cart Must have a payment.").count()).toEqual(0);
  await expect(page.getByText("Order placed successfully")).toBeVisible();
  await expect(page).toHaveURL(/.*thank-you/);
  await page.waitForTimeout(3000);
  //Navigate to view order page
  await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Receipt Details")).toBeVisible();
});
test("Place order successfully by visa subcribed", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  // a@a78.com
  await page.getByPlaceholder("Enter your email").fill(`${userName3.Name}`);
  await page
    .getByPlaceholder("Enter your password")
    .fill(`${userName3.Password}`);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
  //Buy Voucher
  await page.click("(//img[@class='object-cover'])[1]");
  await page.getByRole("button", { name: "Buy Now" }).click({ delay: 500 });

  //Add cart item
  await expect(page).toHaveURL("/cart");
  await page.getByRole("button", { name: "Proceed To Checkout" }).click();
  await expect(page).toHaveURL(/.*checkout/);
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName3.Name}`
  );
  //Add card infor
  await page.click("//button[text()='Add']");
  await page.fill('input[name="firstName"]', `${randomFirstName}`);
  await page.fill('input[name="lastName"]', `${randomLastName}`);
  await page.fill('input[name="cardNumber"]', `${credit.visa2}`);
  await page.fill('input[name="expireDate"]', "01/26");
  await page.fill('input[name="cvv"]', `${randomCVV}`);
  await page.fill('input[name="address"]', `${randomCVV}`);
  await page.fill('input[name="zipcode"]', `${randomZipCode}`);
  await page.waitForTimeout(3000);
  // Check auto fill email
  await expect(page.getByPlaceholder("Enter email")).toHaveAttribute(
    "value",
    `${userName3.Name}`
  );
  await page.getByRole("button", { name: "Add Card" }).click();
  await page.waitForTimeout(3000);
  // Check term checkbox is checked;
  await expect(page.getByRole("checkbox")).toHaveAttribute(
    "data-state",
    "checked"
  );
  await page.waitForTimeout(3000);
  //Place order
  await page.getByRole("button", { name: "Place Order" }).click();
  expect(await page.getByText("Something went wrong").count()).toEqual(0);
  expect(
    await page
      .getByText("Payment failed. Please check your payment information.")
      .count()
  ).toEqual(0);
  expect(await page.getByText("Cart Must have a payment.").count()).toEqual(0);
  //Navigate to view order page
  await page.click("//a[contains(text(),'View Order')]");
  await expect(page).toHaveURL(/.*order/);
  await expect(page.getByText("Receipt Details")).toBeVisible();
});
test("Place order by JCB saved card subcribed", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
  // a@a88.com
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
  await page.getByRole("button", { name: "Buy Now" }).dblclick({ delay: 200 });
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
  // Open our term pop-up
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
});
