// Pages retired in the October 2026 quality cleanup (after the September 2026 spam update).
//   '/old/': '/new/'  merged: the old URL keeps a noindex redirect stub to the page that already covers the topic
//   '/old/': null     removed: navigational pages built around another company's phone number / login / quote form
// Used by consolidate.js (stubs, data.json) and seo-optimize.js (link repair, card removal, sitemap pruning).
// Before publishing anything new, check this list: never recreate a retired topic as a new page.
const RETIRED = {
  // same question asked several ways -> one page
  '/qa/can-a-insurance-company-sue-you/': '/qa/can-an-insurance-company-sue-you/',
  '/qa/can-a-car-insurance-company-sue-you/': '/qa/can-an-insurance-company-sue-you/',
  '/qa/can-an-insurance-company-sue-you-for-an-accident/': '/qa/can-an-insurance-company-sue-you/',
  '/qa/can-you-sue-your-own-insurance-company/': '/qa/can-you-sue-your-insurance-company/',
  '/qa/how-long-do-accidents-stay-on-your-record-for-insurance/': '/qa/how-long-does-an-accident-stay-on-your-insurance/',
  '/qa/how-much-life-insurance-do-i-need-rule-of-thumb/': '/qa/how-much-life-insurance-do-i-need/',
  '/qa/can-you-get-life-insurance-on-anyone/': '/qa/can-you-buy-life-insurance-for-someone-else/',
  '/qa/auto-insurance-lawyer-vs-attorney/': '/qa/car-insurance-lawyer/',
  '/qa/home-and-auto-insurance-near-me/': '/qa/insurance-agencies-near-me-independent-vs-captive/',
  '/qa/insurance-agency-near-me/': '/qa/insurance-agencies-near-me-independent-vs-captive/',
  // one page per company
  '/qa/what-is-smart-auto-insurance/': '/qa/smart-auto-insurance/',
  '/qa/is-amtex-auto-insurance-legit/': '/qa/amtex-auto-insurance/',
  '/qa/essentia-insurance/': '/qa/is-essentia-insurance-legit/',
  '/qa/is-amigo-insurance-legit/': '/qa/what-is-amigo-insurance/',
  '/qa/is-puffin-travel-insurance-good/': '/qa/is-puffin-travel-insurance-legit/',
  '/qa/john-hancock-life-insurance-customer-service/': '/qa/john-hancock-life-insurance/',
  '/qa/accusure-insurance/': '/learn/accusure-insurance/',
  // Q&A pages that duplicate a full guide on the same topic -> the guide
  '/qa/can-i-insure-a-car-not-in-my-name/': '/learn/insuring-a-car-thats-not-in-your-name/',
  '/qa/can-you-insure-a-car-not-in-your-name/': '/learn/insuring-a-car-thats-not-in-your-name/',
  '/qa/can-you-get-insurance-car-not-your-name/': '/learn/insuring-a-car-thats-not-in-your-name/',
  '/qa/what-is-contractors-all-risk-insurance/': '/learn/contractors-all-risk-contract-works-insurance-uk/',
  '/qa/what-is-contractors-all-risk-insurance-uk/': '/learn/contractors-all-risk-contract-works-insurance-uk/',
  '/qa/what-is-contract-works-insurance/': '/learn/contractors-all-risk-contract-works-insurance-uk/',
  '/qa/what-is-personal-accident-insurance/': '/learn/personal-accident-insurance-explained/',
  '/qa/short-term-vs-long-term-disability-do-you-need-both/': '/learn/long-term-vs-short-term-disability/',
  '/qa/term-vs-whole-life-which-is-better-investment/': '/compare/term-vs-whole-life/',
  '/qa/is-gap-insurance-worth-it/': '/learn/gap-insurance-worth-it-and-cost/',
  '/qa/how-much-is-gap-insurance-for-a-car/': '/learn/gap-insurance-worth-it-and-cost/',
  '/qa/is-title-insurance-worth-it/': '/learn/title-insurance-do-you-need-it/',
  '/qa/what-does-title-insurance-cover/': '/learn/title-insurance-do-you-need-it/',
  '/qa/how-much-does-title-insurance-cost-and-who-pays/': '/learn/title-insurance-do-you-need-it/',
  '/qa/is-pet-insurance-worth-it/': '/learn/pet-insurance-guide/',
  '/qa/how-much-does-pet-insurance-cost/': '/learn/pet-insurance-guide/',
  '/qa/what-insurance-do-i-need-as-a-sole-trader/': '/learn/what-insurance-does-a-sole-trader-need/',
  '/qa/do-sole-traders-need-insurance/': '/learn/what-insurance-does-a-sole-trader-need/',
  '/qa/how-much-business-insurance-do-i-need/': '/learn/how-much-business-insurance-do-i-need/',
  '/qa/marine-business-insurance/': '/learn/marine-business-insurance/',
  // duplicate guides / comparisons -> the stronger page
  '/learn/pet-insurance-explained/': '/learn/pet-insurance-guide/',
  '/learn/insurance-company-reviews-is-brand-legit/': '/learn/insurance-company-reviews-is-brand-insurance-legit/',
  '/compare/hmo-vs-ppo/': '/compare/hmo-vs-ppo-vs-epo-vs-hdhp/',
  // navigational pages for other companies (unverifiable phone numbers, logins, quote forms): removed
  '/qa/dairyland-insurance-phone-number/': null,
  '/qa/haven-insurance-contact-number/': null,
  '/qa/health-plus-telephone-number/': null,
  '/qa/my-adrian-flux/': null,
  '/qa/quote-erie-insurance/': null,
  '/qa/plymouth-rock-insurance-quote/': null,
  '/qa/allstate-home-insurance-quote/': null,
};

module.exports = { RETIRED };
