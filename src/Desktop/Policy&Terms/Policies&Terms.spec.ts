import { test, expect } from "@playwright/test";

test("Policy page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.click("//a[normalize-space()='Privacy Policy']");
  await expect(page).toHaveURL("https://dev.gocheckin.io/privacy-policy");
  await expect(
    page.locator("div").filter({ hasText: /^Privacy Policy$/ })
  ).toBeVisible();
  page.close();
});

test("Terms page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/");
  await page.click("//a[normalize-space()='Terms']");
  await expect(page).toHaveURL("https://dev.gocheckin.io/terms-of-use");
  await expect(
    page.locator("div").filter({ hasText: /^Terms of Use$/ })
  ).toBeVisible();
  await expect(
    page.locator("ul>li").filter({
      hasText:
        /^By entering your email, logging into your account, or accepting notifications, you agree to receive personalized GoCheckIn Deals deals each day. You may unsubscribe at any time.$/,
    })
  ).toBeVisible();
  await expect(
    page.locator(
      "(//ul[@class='mb-10 text-[16px] leading-[29px] text-neutral-darkest'])[1]"
    )
  ).toHaveText(
    'By entering your email, logging into your account, or accepting notifications, you agree to receive personalized GoCheckIn Deals deals each day. You may unsubscribe at any time.Welcome to the GoCheckIn Deals Site (defined below). By using it, you are agreeing to these Terms of Use (defined below). Please read them carefully. If you have any questions, contact us here .These Terms of Use were last updated on September 7, 2021. ACCEPTANCE OF TERMS OF USEFastboy Group LLC., (“GoCheckIn Deals,” “us,” “our,” and “we”) owns and operates the website, www.gocheckin.io , the mobile and touch versions and any sites we have now or in the future that reference these Terms of Use (collectively, " Site "). By (a) using the Site and GoCheckIn Deals ’s services through the Site, (b) signing up for an account and/or (c) completing a purchase on the Site, you agree to these Terms of Use (defined below) and any additional terms applicable to certain programs in which you may elect to participate. You also agree to our Privacy Statement, incorporated herein by reference and located within our Privacy Policy ( "Privacy Statement" ), and acknowledge that you will regularly visit the Terms of Use (defined below) to familiarize yourself with any updates. The Privacy Statement, together with these terms of use, and any other terms contained herein or incorporated herein by reference, are collectively referred to as the " Terms of Use ." The term "using" also includes any person or entity that accesses or uses the Site with crawlers, robots, data mining, or extraction tools or any other functionality.IF YOU DO NOT AGREE TO THESE TERMS OF USE, IMMEDIATELY STOP USING THE SITE AND DO NOT USE ANY GOCHECKIN DEALS SERVICE, PARTICIPATE IN ANY PROGRAM OR PURCHASE ANY VOUCHER OR SERVICE OFFERED THROUGH THE SITE.PLEASE REVIEW THE FOLLOWING SECTIONS OF THESE TERMS OF USE CAREFULLY: (A) DISPUTE RESOLUTION/ARBITRATION AGREEMENT, INCLUDING THE CLASS ACTION WAIVER DESCRIBED THEREIN, (B) LIMITATION OF LIABILITY, AND (C) INDEMNIFICATION/RELEASE.These Terms of Use are organized as follows:1. About the Site2. Ownership of the Site3. Use of the Site4. Access to the Site5. Modification6. Your Account7. Your Conduct8. Your Privacy9. Terms of Sale10. Special Programsa. GCI coinsb. Vouchers11. Copyright and Trademarks12. User Content13. Unsolicited Ideas14. Disclaimer of Warranty15. Limitation of Liability16. Electronic Communications17. Websites of Others18. Indemnification/Release19. Force Majeure20. Assignment21. Entire Agreement22. Choice of Law23. Dispute Resolution24. Additional Disclosures'
  );
  // about the site
  await expect(
    page.locator("//li[text()='These Terms of Use are organized as follows:']")
  ).toHaveText([
    "These Terms of Use are organized as follows:1. About the Site2. Ownership of the Site3. Use of the Site4. Access to the Site5. Modification6. Your Account7. Your Conduct8. Your Privacy9. Terms of Sale10. Special Programsa. GCI coinsb. Vouchers11. Copyright and Trademarks12. User Content13. Unsolicited Ideas14. Disclaimer of Warranty15. Limitation of Liability16. Electronic Communications17. Websites of Others18. Indemnification/Release19. Force Majeure20. Assignment21. Entire Agreement22. Choice of Law23. Dispute Resolution24. Additional Disclosures",
  ]);
  await page.getByRole("button", { name: "1. About the Site" }).click();
  // await expect(
  //   page.locator("/html/body/div[2]/div[2]/div[2]/div/div[1]/div/div")
  // ).toHaveText(
  //   "The Site is a platform through which certain merchants (“ Merchants ”) (a) sell vouchers for goods, services, or experiences (“ Vouchers ”), (b) sell services (“ Getaways ”), (c) sell services directly to you (“ Merchant Products ”), (d) make available coupons, promotional codes, giveaways, samples, and offers for software downloads (“ Voucher”), and (e) enable you to schedule use of your Voucher on a specific date and time (“ Bookings ”) (collectively (a)-(e),“ Merchant Offerings ”). Merchants are the sellers and issuers of the Merchant Offerings and are solely responsible to you for the care, quality, and delivery of the goods and services provided. Vouchers may be distributed by Fastboy Group, LLC or GoCheckIn Deals. More information about the distributor of a particular Voucher is available upon request. GoCheckIn Deals is not an agent of GCI Deals or Merchants"
  // );
  await page.getByRole("button", { name: "2. Ownership of the Site" }).click();
  await page.getByRole("button", { name: "3. Use of the Site" }).click();
  await page.getByRole("button", { name: "4. Access to the Site" }).click();
  await page.getByRole("button", { name: "5. Modification" }).click();
  await page.getByRole("button", { name: "6. Your Account" }).click();
  await page.getByRole("button", { name: "7. Your Conduct" }).click();
  await page.getByRole("button", { name: "8. Your Privacy" }).click();
  await page.getByRole("button", { name: "9. Terms of Sale" }).click();
  await page.getByRole("button", { name: "10. Special Programs" }).click();
  await page
    .getByRole("button", { name: "11. Copyright and Trademarks" })
    .click();
  await page.getByRole("button", { name: "13. Unsolicited Ideas" }).click();
  await page
    .getByRole("button", { name: "14. Disclaimer of Warranty" })
    .click();
  await page
    .getByRole("button", { name: "15. Limitation of Liability" })
    .click();
  await page
    .getByRole("button", { name: "16. Electronic Communications" })
    .click();
  await page.getByRole("button", { name: "17. Websites of Others" }).click();
  await page
    .getByRole("button", { name: "18. Indemnification/Release" })
    .click();
  await page.getByRole("button", { name: "19. Force Majeure" }).click();
  await page.getByRole("button", { name: "20. Assignment" }).click();
  await page.getByRole("button", { name: "21. Entire Agreement" }).click();
  await page.getByRole("button", { name: "22. Choice of Law" }).click();
  await page
    .getByRole("button", {
      name: "23. Dispute Resolution/Arbitration Agreement",
    })
    .click();
  await page
    .getByRole("button", { name: "24. Additional Disclosures" })
    .click();
  // await expect(page.get("")).toHaveText(
  //   "The Site is a platform through which certain merchants (“ Merchants ”) (a) sell vouchers for goods, services, or experiences (“ Vouchers ”), (b) sell services (“ Getaways ”), (c) sell services directly to you (“ Merchant Products ”), (d) make available coupons, promotional codes, giveaways, samples, and offers for software downloads (“ Voucher”), and (e) enable you to schedule use of your Voucher on a specific date and time (“ Bookings ”) (collectively (a)-(e),“ Merchant Offerings ”). Merchants are the sellers and issuers of the Merchant Offerings and are solely responsible to you for the care, quality, and delivery of the goods and services provided. Vouchers may be distributed by Fastboy Group, LLC or GoCheckIn Deals. More information about the distributor of a particular Voucher is available upon request. GoCheckIn Deals is not an agent of GCI Deals or Merchants"
  // );

  page.close();
});
