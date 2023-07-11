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
  // These Terms of Use are organized as follows
  await expect(
    page.locator("//li[text()='These Terms of Use are organized as follows:']")
  ).toHaveText([
    "These Terms of Use are organized as follows:1. About the Site2. Ownership of the Site3. Use of the Site4. Access to the Site5. Modification6. Your Account7. Your Conduct8. Your Privacy9. Terms of Sale10. Special Programsa. GCI coinsb. Vouchers11. Copyright and Trademarks12. User Content13. Unsolicited Ideas14. Disclaimer of Warranty15. Limitation of Liability16. Electronic Communications17. Websites of Others18. Indemnification/Release19. Force Majeure20. Assignment21. Entire Agreement22. Choice of Law23. Dispute Resolution24. Additional Disclosures",
  ]);
  // 1. About the site
  await page.locator("//div[@id='1']").click();
  await page.waitForTimeout(2000);
  await expect(page.locator("//div[@id='1']")).toHaveText(
    "1. About the SiteThe Site is a platform through which certain merchants (“ Merchants ”) (a) sell vouchers for goods, services, or experiences (“ Vouchers ”), (b) sell services (“ Getaways ”), (c) sell services directly to you (“ Merchant Products ”), (d) make available coupons, promotional codes, giveaways, samples, and offers for software downloads (“ Voucher”), and (e) enable you to schedule use of your Voucher on a specific date and time (“ Bookings ”) (collectively (a)-(e),“ Merchant Offerings ”). Merchants are the sellers and issuers of the Merchant Offerings and are solely responsible to you for the care, quality, and delivery of the goods and services provided. Vouchers may be distributed by Fastboy Group, LLC or GoCheckIn Deals. More information about the distributor of a particular Voucher is available upon request. GoCheckIn Deals is not an agent of GCI Deals or Merchants"
  );
  // 2. Ownership of the Site
  await page.locator("//div[@id='2']").click();
  await page.waitForTimeout(2000);
  await expect(page.locator("//div[@id='2']")).toHaveText(
    "2. Ownership of the SiteThe Site, any content on the Site, and the infrastructure used to provide the Site are proprietary to us, our affiliates, Merchants, and other content providers. By using the Site and accepting these Terms of Use: (a) GoCheckIn Deals grants you a limited, personal, non transferable, nonexclusive, revocable license to use the Site pursuant to these Terms of Use and to any additional terms and policies set forth by GoCheckIn Deals; and (b) you agree not to reproduce, distribute, create derivative works from, publicly display, publicly perform, license, sell, or re-sell any content, software, or services obtained from or through the Site without the express permission of GoCheckIn Deals."
  );
  // 3. Use of the Site
  await page.locator("//div[@id='3']").click();
  await page.waitForTimeout(2000);
  await expect(page.locator("//div[@id='3']")).toHaveText(
    "3. Use of the SiteAs a condition of your use of the Site, you agree that:You have reached the age of majority in the state or province in which you reside;You are able to create a binding legal obligation;You are not barred from receiving products or services under applicable law;You will not attempt to use the Site with crawlers, robots, data mining, or extraction tools or any other functionality;Your use of the Site will at all times comply with these Terms of Use;You will only make legitimate purchases that comply with the letter and spirit of the terms of the respective offers;You will only make purchases on the Site for your own use and enjoyment or as a gift for another person;You have the right to provide any and all information you submit to the Site, and all such information is accurate, true, current, and complete;You will update and correct information you have submitted to the Site, including all account information, and ensure that it is accurate at all times (out-of-date information will invalidate your account); and,You will only purchase a Merchant Offering or participate in other available programs through the Site by creating an account or using the guest checkout feature on the Site, and any purchase will be subject to the applicable Terms of Sale set forth in these Terms of Use."
  );

  // 4. Access to the Site
  await page.locator("//div[@id='4']").click();
  await page.waitForTimeout(2000);
  await expect(page.locator("//div[@id='4']")).toHaveText(
    "4. Access to the SiteGoCheckIn Deals retains the right, at our sole discretion, to deny service or use of the Site or an account to anyone at any time and for any reason. While we use reasonable efforts to keep the Site and your account accessible, the Site and/or your account may be unavailable from time to time. You understand and agree that there may be interruptions in service or events, Site access, or access to your account due to circumstances both within our control (e.g., routine maintenance) and outside of our control."
  );
  // 5. Modification
  await page.locator("//div[@id='5']").click();
  await page.waitForTimeout(2000);
  await expect(page.locator("//div[@id='5']")).toHaveText(
    "5. ModificationWe reserve the right at all times to discontinue or modify any part of these Terms of Use in our sole discretion. If we make changes that affect your use of the Site or our services we will post notice of the change on the Terms of Use page. Any changes to these Terms of Use will be effective upon our posting of the notice; provided that these changes will be prospective only and not retroactive. If you do not agree to the changes, you may close your account and you should not use the Site or any services offered through the Site after the effective date of the changes. We suggest that you revisit our Terms of Use regularly to ensure that you stay informed of any changes. You agree that posting notice of any changes on the Terms of Use page is adequate notice to advise you of these changes, and that your continued use of the Site or our services will constitute acceptance of these changes and the Terms of Use as modified."
  );
  // 6. Your Account
  await page.locator("//div[@id='6']").click();
  await page.waitForTimeout(2000);
  await expect(page.locator("//div[@id='6']")).toHaveText(
    "6. Your AccountYou may only create and hold one account on the Site for your personal use and must register using a valid credit card. You are responsible for updating and correcting information you have submitted to create or maintain your account. As part of your account settings, you have the option to: (a) save, edit, or delete your personal information, including, without limitation, a valid credit card; and (b) opt-out of persistent login. You understand and agree that GoCheckIn Deals shall have no responsibility for any incident arising out of, or related to, your account settings. You must safeguard your password and supervise the use of your account. You are solely responsible for maintaining the security of your account and maintaining settings that reflect your preferences. We will assume that anyone using the Site or transacting through your account is you. You agree that you are solely responsible for any activity that occurs under your account.The Site may permit you to make purchases without an account or without logging in to your account by using the guest checkout feature. If you make a purchase in this manner and you do not already have an account with us, we will create an account for you based on the information provided to us in connection with the transaction (e.g., your name, address, e-mail address, and other transaction information). You may later claim this account by creating a password for the account.Your account is non-transferrable. You cannot sell, combine, or otherwise share it with any other person. Any violation of these Terms of Use, including, without limitation, failure to maintain updated and correct information about your account (e.g., valid credit card information) will cause your account to fall out of good standing and we may cancel your account at our sole discretion. If your account is canceled, you may forfeit any pending, current, or future account credits (e.g., GCI coins), and any other forms of unredeemed value in your account without notice. Upon termination, the provisions of these Terms of Use that are, by their nature, intended to survive termination (e.g., any disclaimers, all limitations of liability, and all indemnities) shall survive. We also reserve the right to change or discontinue any aspect or feature of our services or the Site, including, without limitation, requirements for use."
  );
  // 7. Your Conduct
  await page.locator("//div[@id='7']").click();
  await page.waitForTimeout(2000);
  await expect(page.locator("//div[@id='7']")).toHaveText(
    "7. Your ConductAll interactions on the Site must comply with these Terms of Use. To the extent your conduct, in our sole discretion, restricts or inhibits any other user from using or enjoying any part of the Site, we may limit or terminate your privileges on the Site and seek other remedies, including, without limitation, cancellation of your account or forfeiture of any forms of unredeemed value in your account.The following activities are prohibited on the Site and constitute violations of these Terms of Use:Submitting any content to the Site that:Violates applicable laws (including, without limitation, intellectual property laws, laws relating to rights of privacy and rights of publicity, and laws related to defamation);Contains personal information, except when we expressly ask you to provide such information;Contains viruses or malware;Offers unauthorized downloads of any copyrighted, confidential, or private information;Has the effect of impersonating others;Contains messages by non-spokesperson employees of GoCheckIn Deals purporting to speak on behalf of GoCheckIn Deals or provides confidential information concerning GoCheckIn Deals;Contains chain letters of any kind;Is purposely inaccurate, commits fraud, or falsified information in connection with your GoCheckIn Deals account or to create multiple GoCheckIn Deals accounts; orIs protected by copyright, trademark, or other proprietary right without the express permission of the owner of the copyright, trademark or other proprietary right.Attempting to do or actually doing any of the following:Accessing data not intended for you, such as logging into a server or an account which you are not authorized to access;Scanning or monitoring the Site for data gathering purposes in an effort to track sales, usage, aggregate offering information, pricing information, or similar data;Scanning or testing the security or configuration of the Site or breaching security or authentication measures; orInterfering with service to any user in any manner, including, without limitation, by means of submitting a virus to the Site or attempting to overload, “flood,” “spam,” “mail bomb,” or “crash” the Site.Using any of the following:Frames, framing techniques, or framing technology to enclose any content included on the Site without our express written permission;Any Site content, including, without limitation, User Content (defined below), in any meta tags or any other “hidden text” techniques or technologies without our express written permission;The Site or any of its contents to advertise or solicit, for any commercial, political, or religious purpose or to compete, directly or indirectly, with GoCheckIn Deals; orThe Site or any of its resources to solicit consumers, Merchants, or other third-parties to become users or partners of other online or offline services directly or indirectly competitive or potentially competitive with GoCheckIn Deals, including, without limitation, aggregating current or previously offered deals.Collecting any of the following:Content from the Site, including, without limitation, in connection with current or previously offered deals, and featuring such content to consumers in any manner that diverts traffic from the Site without our express written permission; orPersonal Information (defined in our Privacy Statement), User Content (defined in Section 12 below), or content of any consumers or Merchants.Engaging in any of the following:Tampering or interfering with the proper functioning of any part, page, or area of the Site or any functions or services provided by GoCheckIn Deals;Taking any action that places excessive demand on our services or imposes, or may impose, an unreasonable or disproportionately large load on our servers or other portion of our infrastructure (as determined in our sole discretion);Reselling or repurposing your access to the Site or any purchases made through the Site;Exceeding or attempting to exceed quantity limits when purchasing Merchant Offerings, or otherwise using any GoCheckIn Deals account to purchase Merchant Offerings for resale or for speculative, false, fraudulent, or any other purpose not expressly permitted by these Terms of Use and the terms of a specific offer on the Site;Accessing, monitoring, or copying any content from the Site using any “robot,” “spider,” “scraper,” or other automated means or any manual process for any purpose without our express written permission;Violating the restrictions in any robot exclusion headers on the Site or bypassing or circumventing other measures employed to prevent or limit access to the Site;Aggregating any current or previously-offered deals or content or other information from the Site (whether using links or other technical means or physical records associated with purchases made through the Site) with material from other sites or on a secondary site without our express written permission;Deep-linking to any portion of the Site (including, without limitation, the purchase path for any Voucher) without our express written permission;Hyperlinking to the Site from any other website without our initial and ongoing consent; orActing illegally or maliciously against the business interests or reputation of GoCheckIn Deals, our Merchants, or our services."
  );
  // await expect(page.locator("//div[@id='8']")).toHaveText("");
  // await expect(page.locator("//div[@id='9']")).toHaveText("");
  // await expect(page.locator("//div[@id='10']")).toHaveText("");
  // await expect(page.locator("//div[@id='11']")).toHaveText("");
  // await expect(page.locator("//div[@id='12']")).toHaveText("");
  // await expect(page.locator("//div[@id='13']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");
  // await expect(page.locator("//div[@id='5']")).toHaveText("");

  // await page.getByRole("button", { name: "8. Your Privacy" }).click();
  // await page.getByRole("button", { name: "9. Terms of Sale" }).click();
  // await page.getByRole("button", { name: "10. Special Programs" }).click();
  // await page
  //   .getByRole("button", { name: "11. Copyright and Trademarks" })
  //   .click();
  // await page.getByRole("button", { name: "13. Unsolicited Ideas" }).click();
  // await page
  //   .getByRole("button", { name: "14. Disclaimer of Warranty" })
  //   .click();
  // await page
  //   .getByRole("button", { name: "15. Limitation of Liability" })
  //   .click();
  // await page
  //   .getByRole("button", { name: "16. Electronic Communications" })
  //   .click();
  // await page.getByRole("button", { name: "17. Websites of Others" }).click();
  // await page
  //   .getByRole("button", { name: "18. Indemnification/Release" })
  //   .click();
  // await page.getByRole("button", { name: "19. Force Majeure" }).click();
  // await page.getByRole("button", { name: "20. Assignment" }).click();
  // await page.getByRole("button", { name: "21. Entire Agreement" }).click();
  // await page.getByRole("button", { name: "22. Choice of Law" }).click();
  // await page
  //   .getByRole("button", {
  //     name: "23. Dispute Resolution/Arbitration Agreement",
  //   })
  //   .click();
  // await page
  //   .getByRole("button", { name: "24. Additional Disclosures" })
  //   .click();

  page.close();
});
