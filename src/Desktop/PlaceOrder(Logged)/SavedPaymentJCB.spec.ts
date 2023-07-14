import { expect, test } from "@playwright/test";
import { getApi } from "../../common/getapi";
import { userName4 } from "../../common/AccountList";

test("Auto fill email when place order by JCB", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //Navigate to mainpage
  await page.goto("/");
  await page
    .locator("div")
    .filter({ hasText: /^HomeSell on Go Checkin DealsGet the AppSign In$/ })
    .getByRole("button", { name: "Sign In" })
    .click();
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
