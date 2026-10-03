#!/usr/bin/env node
/**
 * Insurance Bhaiya — site-wide SEO / AEO / GEO optimizer.
 *
 * Re-runnable (idempotent). Run after publishing new pages:
 *   node src/scripts/seo-optimize.js            # apply
 *   node src/scripts/seo-optimize.js --dry      # report only
 *
 * What it does:
 *  1. Contextual interlinking: inserts keyword-anchored links inside body copy
 *     (paragraphs, list items, table cells, FAQ answers) across learn, qa,
 *     compare, scenarios and glossary using the curated KEYWORDS map below.
 *  2. Link hygiene: trailing-slash canonical hrefs, repairs/unwraps links to
 *     pages that do not exist, renders stray markdown links/bold, refreshes
 *     stale "All N Questions" counts, canonicalizes legacy /tools/<calc>/ pages.
 *  3. Head tags: trims over-long titles/descriptions, keyword-rich titles for
 *     glossary, compare, scenario and short Q&A pages; keeps og/twitter in sync.
 *  4. Structured data: Article (compare, scenarios), DefinedTerm (glossary),
 *     FAQPage from visible FAQs, de-duplicated breadcrumbs, category hubs in
 *     learn breadcrumbs, markdown-free QAPage text, de-boilerplated FAQs.
 *  5. sitemap.xml (adds missing pages, bumps lastmod of changed pages) and a
 *     full llms.txt content map for generative engines.
 *  6. Mirrors inserted links into data.json / src/data/articles/*.json so the
 *     publisher keeps them on the next re-publish.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SITE = 'https://insurancebhaiya.com';
const DRY = process.argv.includes('--dry');
const TODAY = new Date().toISOString().slice(0, 10);
const CONTENT_SECTIONS = ['learn', 'qa', 'compare', 'scenarios', 'glossary'];

// ---------------------------------------------------------------------------
// 1. Curated keyword → target map.  [url, weight(1 generic..3 money), phrases]
//    Phrases are case-insensitive; prefix "=" for case-sensitive acronyms.
//    Spaces also match line breaks, hyphens are optional, plurals (s/es) match.
//    One phrase maps to ONE url site-wide so link equity never cannibalizes.
// ---------------------------------------------------------------------------
const KEYWORDS = [
  // ---- Learn: fundamentals ----
  ['/learn/what-is-insurance/', 2, ['what is insurance', 'definition of insurance']],
  ['/learn/how-does-insurance-work/', 2, ['how insurance works', 'risk pooling', 'risk pool', 'law of large numbers']],
  ['/learn/insurance-for-beginners/', 2, ['insurance for beginners', 'insurance jargon']],
  ['/learn/types-of-insurance/', 2, ['types of insurance', 'kinds of insurance', 'types of coverage']],
  ['/learn/why-do-people-need-insurance/', 1, ['why people need insurance', 'why you need insurance']],
  ['/learn/what-is-an-insurance-policy/', 1, ['insurance policy', 'insurance contract']],
  ['/learn/how-to-read-an-insurance-policy/', 2, ['declarations page', 'dec page', 'read your policy', 'read an insurance policy', 'fine print']],
  ['/learn/what-is-a-policyholder/', 2, ['policyholder', 'policy holder', 'policy owner']],
  ['/learn/what-is-an-insured-person/', 2, ['insured person', 'permissive use', 'permissive user', 'permissive driver']],
  ['/learn/named-insured-vs-additional-insured/', 2, ['additional insured', 'named insured']],
  ['/learn/what-is-an-insurer/', 2, ['financial strength rating', 'financial strength ratings', 'am best', 'a.m. best', 'solvency', 'insurance carrier']],
  ['/learn/what-is-insurance-underwriting/', 2, ['underwriting', 'underwriter']],
  ['/learn/what-is-an-insurance-premium/', 2, ['insurance premium', 'how premiums are calculated', 'premium calculation']],
  ['/learn/what-is-an-insurance-quote/', 2, ['insurance quote', 'getting a quote', 'get a quote']],
  ['/learn/quote-vs-premium-vs-deductible/', 2, ['quote vs premium', 'quote vs. premium', 'quote, premium, and deductible']],
  ['/learn/what-is-a-deductible/', 2, ['how deductibles work', 'choose a deductible', 'choosing a deductible', 'deductible works']],
  ['/learn/deductible-vs-premium/', 2, ['deductible vs premium', 'deductible vs. premium', 'deductible-to-premium']],
  ['/learn/what-is-an-excess/', 2, ['insurance excess', 'voluntary excess', 'compulsory excess', 'policy excess']],
  ['/learn/what-is-a-coverage-limit/', 2, ['coverage limit', 'policy limit', 'per-occurrence limit', 'aggregate limit', 'liability limit']],
  ['/learn/coverage-vs-limits/', 2, ['coverage vs limits', 'coverage vs. limits', 'scope of coverage']],
  ['/learn/what-is-an-exclusion-in-insurance/', 2, ['policy exclusion', 'exclusion clause', 'excluded peril', 'excluded perils']],
  ['/learn/what-is-an-insurance-endorsement/', 2, ['endorsement', 'policy endorsement']],
  ['/learn/what-is-an-insurance-rider/', 2, ['rider', 'policy rider']],
  ['/learn/what-is-an-insurance-claim/', 2, ['insurance claim', 'file a claim', 'filing a claim', 'claims process']],
  ['/learn/first-party-insurance-claims/', 2, ['first-party claim', 'first-party insurance claim']],
  ['/learn/what-happens-if-you-stop-paying-insurance/', 2, ['grace period', 'policy lapse', 'lapse in coverage', 'coverage lapse', 'stop paying']],
  ['/learn/what-happens-when-insurance-expires/', 2, ['non-renewal', 'nonrenewal', 'policy expiration', 'policy expires']],
  ['/learn/how-often-should-you-review-insurance/', 2, ['review your insurance', 'insurance review', 'review your coverage', 'annual review']],
  ['/learn/how-to-compare-insurance-policies/', 2, ['compare insurance policies', 'comparing policies', 'compare quotes', 'comparing quotes', 'apples-to-apples']],
  ['/learn/how-to-know-if-you-are-underinsured/', 3, ['underinsured', 'underinsurance'], { notBefore: /^\s+(?:motorist|driver)/i }],
  ['/learn/agent-vs-broker-vs-insurer/', 2, ['insurance broker', 'independent agent', 'agent vs broker', 'agent vs. broker']],
  ['/learn/insurance-company-reviews-is-brand-insurance-legit/', 3, ['insurance company reviews', 'legitimate insurer', 'legitimate insurance company', 'verify an insurer', 'verify the insurer', 'insurer is legit']],
  ['/learn/when-to-hire-an-insurance-lawyer/', 3, ['insurance lawyer', 'insurance attorney', 'hire a lawyer', 'hire an attorney']],
  ['/learn/can-you-have-multiple-insurance-policies-at-once/', 3, ['can you have multiple insurance policies at once', 'multiple insurance policies at once', 'multiple insurance policies', 'having two insurance policies']],
  ['/learn/what-is-coordination-of-benefits/', 3, ['what is coordination of benefits', 'coordination of benefits rules', 'how coordination of benefits works', '=COB rules']],
  // ---- Learn: auto ----
  ['/learn/car-insurance-guide/', 2, ['state minimum liability', 'state minimums', 'state minimum coverage', 'full coverage', 'full-coverage']],
  ['/learn/car-insurance-basics-registration-cost-claims/', 2, ['car insurance basics', 'car insurance cost factors']],
  ['/learn/insuring-a-car-thats-not-in-your-name/', 3, ["car that's not in your name", 'car not in your name', 'car not in my name', "car that isn't in your name"]],
  ['/learn/no-fault-vs-at-fault-car-insurance-states/', 3, ['no-fault vs at-fault car insurance states', 'no-fault vs at-fault', 'no-fault states', 'which states are no-fault', 'at-fault states']],
  ['/learn/new-york-no-fault-insurance/', 3, ['new york state no fault insurance', 'new york no-fault insurance', 'new york no-fault', 'ny no-fault', 'new york no-fault system']],
  // ---- Learn: health ----
  ['/learn/health-insurance-basics/', 2, ['health insurance basics', 'how health insurance works', 'explanation of benefits']],
  ['/learn/us-health-insurance-guide/', 2, ['high-deductible health plan', 'health savings account', '=HDHP', '=HSA']],
  ['/learn/what-does-health-insurance-actually-cover/', 2, ['essential health benefits', 'what health insurance covers', 'covered services']],
  ['/learn/medical-procedure-costs-with-and-without-insurance/', 3, ['medical procedure costs', 'procedure costs', 'medical costs without insurance']],
  ['/learn/site-of-service-medical-billing-explained/', 3, ['site-of-service', 'site of service', 'facility fee', 'hospital outpatient department']],
  ['/learn/dental-procedure-costs-with-and-without-insurance/', 2, ['dental insurance', 'dental procedure costs', 'dental coverage']],
  ['/learn/dental-insurance-waiting-periods-explained/', 3, ['dental waiting period', 'dental insurance waiting period']],
  // ---- Learn: life / term / disability ----
  ['/learn/what-is-life-insurance/', 1, ['life insurance', 'death benefit']],
  ['/learn/life-insurance-fundamentals-worth-it-payouts-ownership/', 3, ['is life insurance worth it', 'life insurance worth it', 'life insurance payout', 'policy ownership']],
  ['/learn/term-insurance-guide/', 2, ['term life insurance', 'term insurance', 'term life', 'term policy', 'level term']],
  ['/learn/term-insurance-india-guide/', 3, ['term insurance in india', '=IRDAI', 'claim settlement ratio', '1 crore']],
  ['/learn/life-insurance-broker/', 3, ['life insurance broker']],
  ['/learn/business-life-insurance/', 3, ['key person insurance', 'key person coverage', 'buy-sell agreement', 'business life insurance']],
  ['/learn/loyal-american-life-insurance/', 3, ['loyal american']],
  ['/learn/open-care-life-insurance/', 3, ['open care life insurance']],
  ['/learn/security-plan-life-insurance/', 3, ['security plan life']],
  ['/learn/quote-about-life-insurance/', 2, ['quotes about life insurance', 'life insurance sayings']],
  ['/learn/long-term-vs-short-term-disability/', 2, ['long-term disability', 'short-term disability', 'income protection']],
  ['/learn/own-occupation-disability-insurance/', 3, ['own-occupation', 'any-occupation']],
  ['/learn/workers-compensation-insurance-exemptions/', 3, ["workers' compensation insurance exemptions", 'workers compensation insurance exemptions', 'workers comp exemptions', 'workers compensation exemptions']],
  // ---- Learn: home / property / specialty ----
  ['/learn/home-insurance-fundamentals/', 2, ['homeowners insurance', "homeowner's insurance", 'market value', 'dwelling coverage']],
  ['/learn/renters-insurance-whats-covered-and-whats-not/', 3, ["renters insurance: what's covered and what's not", "renters insurance what's covered", "what does renters insurance cover", 'what renters insurance covers']],
  ['/learn/umbrella-insurance-guide/', 3, ['umbrella insurance', 'umbrella policy', 'personal umbrella', 'umbrella coverage']],
  ['/learn/pet-insurance-explained/', 2, ['pet insurance', 'vet bills', 'veterinary bills']],
  ['/learn/travel-insurance-guide/', 2, ['travel insurance', 'medical evacuation', 'trip delay', 'trip interruption']],
  // ---- Learn: boat / marine ----
  ['/learn/boat-insurance-by-state-requirements-costs/', 2, ['boat insurance', 'boat insurance requirements', 'boat insurance by state']],
  ['/learn/average-cost-of-boat-insurance/', 3, ['boat insurance cost', 'cost of boat insurance', 'average boat insurance']],
  ['/learn/boat-insurance-claims-what-to-expect/', 3, ['boat insurance claim', 'boat claim', 'marine surveyor']],
  ['/learn/boat-insurance-proof-of-coverage/', 3, ['proof of coverage', 'proof of boat insurance', 'proof of insurance'], { requires: /\bboat|marina|vessel/ }],
  ['/learn/boat-insurance-and-hurricane-season/', 3, ['hurricane season', 'named storm', 'hurricane haul-out', 'hurricane plan'], { requires: /\bboat|marina|vessel/ }],
  ['/learn/boat-rental-insurance/', 3, ['boat rental insurance', 'renting a boat', 'peer-to-peer boat rental']],
  ['/learn/boat-dealers-insurance/', 3, ['boat dealers insurance', 'boat dealer insurance', 'boat dealership']],
  ['/learn/classic-boat-insurance/', 3, ['classic boat', 'antique boat', 'wooden boat']],
  ['/learn/commercial-boat-insurance/', 3, ['commercial boat insurance', 'commercial boat']],
  ['/learn/houseboat-insurance/', 3, ['houseboat insurance', 'houseboat']],
  ['/learn/personal-watercraft-jet-ski-insurance/', 3, ['jet ski', 'personal watercraft', 'waverunner']],
  ['/learn/marina-insurance/', 3, ['marina insurance', 'marina operator', 'marina liability']],
  // ---- Learn: business / commercial ----
  ['/learn/bop-business-owners-policy-explained/', 3, ["business owner's policy", 'business owners policy', '=BOP']],
  ['/learn/commercial-general-liability-guide/', 3, ['commercial general liability', 'general liability insurance', 'general liability', '=CGL']],
  ['/learn/commercial-property-insurance-guide/', 3, ['commercial property insurance', 'commercial property']],
  ['/learn/inland-marine-insurance-explained/', 3, ['inland marine', 'equipment floater', 'goods in transit']],
  ['/learn/compound-insurance/', 3, ['compound insurance', 'multi-building']],
  ['/learn/product-liability-insurance/', 3, ['product liability', 'products liability']],
  ['/learn/professional-indemnity-insurance/', 3, ['professional indemnity', 'errors and omissions', 'professional liability']],
  ['/learn/medical-malpractice-insurance/', 3, ['medical malpractice', 'malpractice insurance']],
  ['/learn/event-liability-insurance/', 3, ['event liability', 'event insurance', 'special event insurance']],
  ['/learn/hotel-insurance/', 3, ['hotel insurance', 'hospitality insurance']],
  ['/learn/niche-commercial-insurance-hotels-marinas-malpractice/', 2, ['niche commercial insurance', 'niche commercial']],
  ['/learn/gas-engineer-public-liability-insurance/', 3, ['gas engineer', 'gas safe']],
  ['/learn/contractors-all-risk-contract-works-insurance-uk/', 3, ['contractors all risk', "contractors' all risk", 'contractors all-risk', '=CAR policy', '=CAR insurance']],
  ['/learn/quotes-for-commercial-insurance/', 3, ['commercial insurance quote', 'business insurance quote']],
  ['/learn/starting-and-running-an-insurance-agency/', 3, ['starting an insurance agency', 'running an insurance agency', 'start an insurance agency', 'agency owner']],

  // ---- Q&A ----
  ['/qa/insurance-agencies-near-me-independent-vs-captive/', 3, ['captive agent', 'captive agency', 'independent vs captive', 'independent vs. captive', 'insurance agency near', 'local insurance agency', 'local agent']],
  ['/qa/how-to-start-an-insurance-agency-business/', 3, ['start an insurance business', 'starting an insurance business']],
  ['/qa/insurance-agency-business-plan/', 3, ['insurance agency business plan', 'business plan'], { requires: /agency|agencies/ }],
  ['/qa/how-to-get-clients-for-insurance-business/', 3, ['get clients', 'find clients', 'client acquisition', 'referral partner'], { requires: /agency|agencies|producer/ }],
  ['/qa/how-much-do-insurance-agencies-make/', 3, ['insurance agencies make', 'agency revenue', 'commission income']],
  ['/qa/how-to-sell-commercial-insurance/', 3, ['sell commercial insurance', 'selling commercial insurance']],
  ['/qa/able-auto-insurance/', 3, ['able auto insurance', 'able insurance agency']],
  ['/qa/accusure-insurance/', 3, ['accusure']],
  ['/qa/airport-liability-insurance/', 3, ['airport liability']],
  ['/qa/aviation-products-liability-insurance/', 3, ['aviation products liability', 'aviation insurance']],
  ['/qa/allstate-home-insurance-quote/', 3, ['allstate']],
  ['/qa/amtex-auto-insurance/', 3, ['amtex']],
  ['/qa/apwu-imperial-lifex-innovative-partners-health-insurance-legit/', 3, ['=APWU', 'lifex', 'innovative partners']],
  ['/qa/are-car-insurance-companies-open-on-saturdays/', 2, ['open on saturday', 'open on weekends']],
  ['/qa/are-mens-health-clinics-covered-by-insurance/', 3, ["men's health clinic"]],
  ['/qa/are-spider-veins-covered-by-insurance/', 3, ['spider vein', 'varicose vein', 'sclerotherapy']],
  ['/qa/are-windshields-covered-by-insurance-in-florida/', 3, ['windshield', 'windscreen']],
  ['/qa/are-you-required-to-have-car-insurance-in-florida/', 3, ['car insurance in florida', 'florida car insurance', "florida's no-fault", 'florida no-fault']],
  ['/qa/can-i-drive-without-insurance-in-fl/', 3, ['drive without insurance in florida', 'driving without insurance in florida']],
  ['/qa/do-you-need-bodily-injury-insurance-in-florida/', 3, ['bodily injury insurance in florida', 'bodily injury coverage in florida', 'bodily injury liability in florida', 'florida bodily injury']],
  ['/qa/attorney-malpractice-insurance-california/', 3, ['attorney malpractice', 'legal malpractice', 'lawyers professional liability']],
  ['/qa/auto-insurance-lawyer-vs-attorney/', 3, ['lawyer vs attorney', 'lawyer vs. attorney', 'auto insurance attorney']],
  ['/qa/car-insurance-lawyer/', 3, ['car insurance lawyer', 'car accident lawyer', 'car insurance attorney']],
  ['/qa/life-insurance-lawyer/', 3, ['life insurance lawyer', 'life insurance attorney']],
  ['/qa/how-much-does-an-insurance-lawyer-cost/', 3, ['insurance lawyer cost', 'contingency fee']],
  ['/qa/first-party-insurance-claim-attorney/', 3, ['first-party claim attorney', 'first-party insurance claim attorney']],
  ['/qa/best-rate-on-car-insurance/', 3, ['best rate on car insurance', 'cheapest car insurance', 'cheaper car insurance', 'best car insurance rate', 'lower your car insurance']],
  ['/qa/boat-insurance-trailer-only-no-dock/', 3, ['trailer your boat', 'trailered boat', 'trailer-only']],
  ['/qa/does-boat-insurance-cover-your-trailer/', 3, ['boat trailer', 'trailer coverage']],
  ['/qa/how-much-boat-liability-insurance-do-you-need/', 3, ['boat liability', 'boating liability']],
  ['/qa/uninsured-boater-coverage/', 3, ['uninsured boater']],
  ['/qa/what-happens-to-boat-insurance-when-you-sell-your-boat/', 3, ['sell your boat', 'selling your boat', 'sold the boat', 'sell the boat']],
  ['/qa/bond-insurance-quotes/', 3, ['surety bond', 'bond insurance']],
  ['/qa/can-an-insurance-company-sue-you/', 3, ['insurance company sue you', 'insurer sue you', 'insurer can sue you', 'insurance company can sue you']],
  ['/qa/can-an-insurance-company-sue-you-for-an-accident/', 3, ['sue you for an accident', 'sue you after an accident']],
  ['/qa/can-a-car-insurance-company-sue-you/', 3, ['car insurance company sue', 'car insurer sue']],
  ['/qa/can-an-insurance-company-sue-an-uninsured-driver/', 3, ['sue an uninsured driver', 'sue the uninsured driver']],
  ['/qa/can-an-uninsured-driver-sue-an-insured-driver/', 3, ['uninsured driver sue', 'no pay, no play', 'no pay no play']],
  ['/qa/can-an-insurance-company-close-a-claim-without-my-consent/', 3, ['close a claim', 'closed the claim', 'claim closed', 'closing the claim']],
  ['/qa/can-firefighters-get-life-insurance/', 3, ['firefighter']],
  ['/qa/can-i-add-someone-elses-car-to-my-insurance/', 3, ["someone else's car", "add another person's car"]],
  ['/qa/can-i-refuse-a-recorded-statement-to-insurance-company/', 3, ['recorded statement']],
  ['/qa/can-i-sue-my-insurance-company-for-taking-too-long/', 3, ['taking too long', 'unreasonable delay', 'slow claim', 'claim delay']],
  ['/qa/can-insurance-drop-you-after-a-claim/', 3, ['drop you after a claim', 'cancel your policy after a claim', 'dropped after a claim', 'drop your policy']],
  ['/qa/can-you-buy-life-insurance-for-someone-else/', 3, ['life insurance for someone else', 'life insurance on someone else', 'insure someone else']],
  ['/qa/can-you-get-life-insurance-on-anyone/', 3, ['insurable interest']],
  ['/qa/can-you-cancel-insurance-anytime-get-refund/', 3, ['prorated refund', 'pro-rated refund', 'cancel your policy', 'cancellation fee', 'short-rate']],
  ['/qa/can-you-drive-without-insurance-in-ny/', 3, ['drive without insurance in new york', 'driving without insurance in new york', 'new york car insurance']],
  ['/qa/can-you-get-auto-insurance-with-a-suspended-license/', 3, ['suspended license', 'suspended driver', 'sr-22', 'fr-44']],
  ['/qa/can-you-have-two-dental-insurance-plans/', 3, ['two dental plans', 'two dental insurance', 'dual dental']],
  ['/qa/can-you-have-two-health-insurances/', 3, ['two health insurance', 'coordination of benefits', 'secondary insurance', 'dual coverage', 'secondary coverage']],
  ['/qa/can-you-pause-car-insurance/', 3, ['pause car insurance', 'pause your car insurance', 'storage coverage', 'suspend coverage']],
  ['/qa/can-you-register-a-car-without-insurance/', 3, ['register a car without insurance', 'registration without insurance']],
  ['/qa/do-you-need-insurance-to-register-a-car-in-california/', 3, ['register a car in california', 'registering a car in california']],
  ['/qa/do-you-need-insurance-to-register-a-car-in-indiana/', 3, ['register a car in indiana', 'indiana bmv']],
  ['/qa/do-you-need-insurance-to-register-a-car-in-ny/', 3, ['register a car in new york', 'register a car in ny', 'new york dmv']],
  ['/qa/can-you-sue-someone-after-settling-with-their-insurance/', 3, ['after settling', 'release of all claims', 'settlement release']],
  ['/qa/can-you-sue-your-own-insurance-company/', 3, ['sue your own insurance company', 'sue your insurance company', 'sue your insurer', 'sue your own insurer']],
  ['/qa/can-you-sue-your-insurance-company/', 3, ['bad faith', 'bad-faith']],
  ['/qa/cast-insurance/', 3, ['cast insurance', 'film production insurance']],
  ['/qa/colonial-penn-life-insurance-rate-chart-by-age/', 3, ['colonial penn']],
  ['/qa/contract-works-insurance-vs-public-liability-insurance/', 3, ['public liability']],
  ['/qa/what-is-contract-works-insurance/', 3, ['contract works insurance', 'contract works']],
  ['/qa/what-is-contractors-all-risk-insurance/', 3, ['what is contractors all risk']],
  ['/qa/how-much-does-contractors-all-risk-insurance-cost/', 3, ['contractors all risk insurance cost', 'contractors all risk cost']],
  ['/qa/what-does-contractors-all-risk-insurance-not-cover/', 3, ['contractors all risk exclusions', 'not covered by contractors all risk']],
  ['/qa/does-contractors-all-risk-insurance-cover-subcontractors/', 3, ['subcontractor', 'sub-contractor'], { requires: /contractors all|contract works|construction/ }],
  ['/qa/does-contractors-all-risk-insurance-cover-theft-of-materials/', 3, ['theft of materials', 'materials on site', 'site theft']],
  ['/qa/do-i-need-contract-works-insurance-for-a-self-build/', 3, ['self-build', 'self build']],
  ['/qa/how-long-does-contract-works-insurance-last/', 3, ['how long contract works insurance lasts']],
  ['/qa/what-is-hired-in-plant-insurance/', 3, ['hired-in plant', 'hired in plant', 'plant hire']],
  ['/qa/dairyland-insurance-phone-number/', 3, ['dairyland']],
  ['/qa/haven-insurance-contact-number/', 3, ['haven insurance']],
  ['/qa/health-plus-telephone-number/', 3, ['=Health Plus']],
  ['/qa/does-car-insurance-cover-rental-cars/', 3, ['rental car', 'rental counter', 'rental coverage']],
  ['/qa/how-long-will-insurance-pay-for-rental-car-after-accident/', 3, ['rental reimbursement', 'rental car after an accident', 'rental car after accident']],
  ['/qa/does-car-insurance-cover-repairs/', 3, ['car repairs', 'repair shop', 'auto repairs']],
  ['/qa/does-car-insurance-cover-vandalism/', 3, ['vandalism', 'vandalized']],
  ['/qa/does-dental-insurance-cover-teeth-whitening-or-veneers/', 3, ['teeth whitening', 'veneer', 'cosmetic dentistry']],
  ['/qa/does-health-insurance-cover-car-accidents-pip/', 2, ['health insurance cover car accidents']],
  ['/qa/does-health-insurance-cover-er-visits-out-of-network/', 3, ['out-of-network', 'surprise billing', 'no surprises act', 'surprise bill']],
  ['/qa/does-health-insurance-cover-eye-exams-dermatologist-chiropractic/', 3, ['eye exam', 'dermatologist', 'chiropractic', 'chiropractor']],
  ['/qa/does-health-insurance-cover-pre-existing-conditions/', 3, ['pre-existing condition', 'preexisting condition']],
  ['/qa/does-health-insurance-cover-pregnancy-maternity-care/', 3, ['maternity care', 'maternity coverage', 'prenatal care', 'pregnancy coverage', 'childbirth']],
  ['/qa/does-health-insurance-cover-surrogacy-or-surrogate-pregnancy/', 3, ['surrogacy', 'surrogate', 'gestational carrier']],
  ['/qa/how-much-does-surrogacy-cost-with-insurance-in-new-york/', 3, ['surrogacy cost', 'cost of surrogacy', 'surrogacy in new york']],
  ['/qa/does-health-insurance-cover-therapy-mental-health/', 3, ['mental health', 'behavioral health', 'talk therapy', 'psychotherapy']],
  ['/qa/does-health-insurance-cover-weight-loss-drugs-bariatric-surgery/', 3, ['ozempic', 'wegovy', 'weight loss drug', 'weight-loss drug', 'bariatric surgery', 'glp-1']],
  ['/qa/does-homeowners-insurance-cover-water-damage/', 3, ['water damage', 'burst pipe']],
  ['/qa/water-leak-insurance-claim-uk/', 3, ['water leak claim', 'escape of water', 'trace and access']],
  ['/qa/does-liability-insurance-cover-theft/', 3, ['liability insurance cover theft', 'liability-only car insurance', 'liability-only coverage']],
  ['/qa/does-my-personal-auto-insurance-cover-business-use/', 3, ['business use', 'rideshare', 'delivery driving', 'delivery driver']],
  ['/qa/does-renters-insurance-cover-firearms/', 3, ['firearm', 'gun collection']],
  ['/qa/does-renters-insurance-cover-theft-outside-home/', 3, ['renters insurance', "renter's insurance", 'off-premises theft', 'off-premises coverage']],
  ['/qa/is-essentia-insurance-legit/', 3, ['essentia']],
  ['/qa/how-does-life-insurance-create-an-immediate-estate/', 3, ['immediate estate', 'instant estate']],
  ['/qa/how-long-does-an-accident-stay-on-your-insurance/', 3, ['accident stay on your insurance', 'at-fault accident', 'accident surcharge']],
  ['/qa/how-long-do-accidents-stay-on-your-record-for-insurance/', 3, ['driving record', 'stay on your record']],
  ['/qa/how-long-does-reckless-driving-affect-insurance/', 3, ['reckless driving']],
  ['/qa/how-long-does-life-insurance-last/', 3, ['how long life insurance lasts', 'life insurance last']],
  ['/qa/how-long-does-life-insurance-payout-take/', 3, ['life insurance payout take', 'payout timeline', 'how long the payout takes']],
  ['/qa/is-life-insurance-payout-taxable/', 3, ['life insurance taxable', 'death benefit taxable', 'tax-free death benefit', 'income tax on life insurance', 'payout taxable']],
  ['/qa/how-much-life-insurance-do-i-need-rule-of-thumb/', 3, ['10x rule', '10x income', 'dime method', '=DIME']],
  ['/qa/how-much-life-insurance-do-i-need/', 3, ['how much life insurance', 'coverage amount']],
  ['/qa/how-to-use-life-insurance-while-alive/', 3, ['cash value', 'living benefits', 'policy loan', 'borrow against'], { requires: /whole life|permanent life|universal life|cash value life/ }],
  ['/qa/is-life-insurance-a-scam/', 3, ['life insurance a scam', 'life insurance scam']],
  ['/qa/is-life-insurance-an-asset/', 3, ['life insurance an asset', 'life insurance as an asset']],
  ['/qa/term-vs-whole-life-which-is-better-investment/', 3, ['buy term and invest the difference', 'whole life as an investment']],
  ['/qa/how-much-does-a-deep-cleaning-cost-with-insurance/', 3, ['deep cleaning', 'scaling and root planing']],
  ['/qa/how-much-does-a-dental-bridge-cost-without-insurance/', 3, ['dental bridge']],
  ['/qa/how-much-does-a-dental-implant-cost-without-insurance/', 3, ['dental implant']],
  ['/qa/how-much-does-a-root-canal-cost-with-insurance/', 3, ['root canal']],
  ['/qa/how-much-does-a-tooth-extraction-cost-without-insurance/', 3, ['tooth extraction', 'extraction cost']],
  ['/qa/how-much-does-fillings-cost-with-insurance/', 3, ['filling cost', 'cavity filling', 'composite filling', 'dental filling']],
  ['/qa/how-much-does-it-cost-for-braces-without-insurance/', 3, ['braces', 'cost of braces']],
  ['/qa/how-much-is-a-crown-without-insurance/', 3, ['dental crown', 'crown cost']],
  ['/qa/how-much-does-a-pet-scan-cost-with-insurance/', 3, ['pet scan', '=PET/CT']],
  ['/qa/how-much-does-an-mri-cost-without-insurance/', 3, ['=MRI']],
  ['/qa/how-much-does-an-x-ray-cost-without-insurance/', 3, ['x-ray']],
  ['/qa/how-much-is-a-ct-scan-with-insurance/', 3, ['ct scan', 'cat scan']],
  ['/qa/how-much-is-urgent-care-with-insurance/', 3, ['urgent care']],
  ['/qa/insured-closing-letter/', 3, ['closing letter']],
  ['/qa/is-amigo-insurance-legit/', 3, ['amigo insurance', 'amigomex']],
  ['/qa/is-bamboo-insurance-admitted-in-california/', 3, ['bamboo insurance']],
  ['/qa/is-car-insurance-cheaper-on-older-cars/', 3, ['older car', 'older vehicle']],
  ['/qa/is-health-insurance-worth-it/', 3, ['health insurance worth it', 'individual mandate']],
  ['/qa/is-insure-90-legit/', 3, ['insure 90']],
  ['/qa/is-nycm-a-good-insurance-company/', 3, ['=NYCM', 'new york central mutual']],
  ['/qa/is-puffin-travel-insurance-legit/', 3, ['puffin']],
  ['/qa/is-slide-insurance-going-out-of-business/', 3, ['slide insurance']],
  ['/qa/is-vasectomy-covered-by-insurance/', 3, ['vasectomy']],
  ['/qa/john-hancock-life-insurance/', 3, ['john hancock']],
  ['/qa/kyc-insurance/', 3, ['=KYC', 'know your customer']],
  ['/qa/my-adrian-flux/', 3, ['adrian flux']],
  ['/qa/new-york-marine-and-general-insurance-company/', 3, ['new york marine']],
  ['/qa/nyaip/', 3, ['=NYAIP', 'new york automobile insurance plan', 'assigned risk', 'assigned-risk']],
  ['/qa/planned-care/', 3, ['planned care']],
  ['/qa/plymouth-rock-insurance-quote/', 3, ['plymouth rock']],
  ['/qa/quote-erie-insurance/', 3, ['erie insurance']],
  ['/qa/smart-auto-insurance/', 3, ['smart auto']],
  ['/qa/the-responsive-auto-insurance/', 3, ['the responsive', 'responsive auto insurance']],
  ['/qa/what-happens-if-health-insurance-claim-denied/', 3, ['claim denied', 'claim denial', 'denied claim', 'internal appeal', 'external review'], { requires: /health plan|health insurer|prior authorization|medical necessity|explanation of benefits|in-network/ }],
  ['/qa/what-happens-if-you-crash-without-insurance/', 3, ['crash without insurance', 'uninsured driver', 'accident without insurance']],
  ['/qa/is-it-against-the-law-to-drive-without-insurance/', 3, ['driving without insurance', 'drive without insurance', 'illegal to drive without insurance']],
  ['/qa/what-is-a-named-non-owner-car-insurance-policy/', 3, ['non-owner', 'named non-owner']],
  ['/qa/what-is-actual-cash-value-vs-replacement-cost-claim/', 3, ['depreciation holdback', 'recoverable depreciation']],
  ['/qa/what-is-quotelab/', 3, ['quotelab']],
  ['/qa/why-did-car-insurance-go-up-without-accidents/', 3, ['rate increase', 'premium increase', 'car insurance went up', 'rates went up', 'rates go up']],
  ['/qa/why-is-car-insurance-so-expensive-in-california/', 3, ['california car insurance', 'car insurance in california', 'prop 103', 'proposition 103']],
  ['/qa/short-term-vs-long-term-disability-do-you-need-both/', 3, ['short-term and long-term disability', 'both short- and long-term']],
  ['/qa/is-texas-a-no-fault-state/', 3, ['is texas a no fault state', 'is texas a no-fault state', 'is texas an at-fault state', 'is texas an at fault state']],
  ['/qa/is-georgia-a-no-fault-state/', 3, ['is georgia a no fault state', 'is georgia a no-fault state', 'georgia at-fault state']],
  ['/qa/is-colorado-a-no-fault-state/', 3, ['is colorado a no fault state', 'is colorado a no-fault state']],
  ['/qa/is-uninsured-motorist-coverage-required-in-georgia/', 3, ['is uninsured motorist coverage required in georgia', 'uninsured motorist coverage in georgia', 'georgia uninsured motorist']],
  ['/qa/how-to-file-a-no-fault-insurance-claim-in-new-york/', 3, ['how to file a no-fault insurance claim in new york', 'file a no-fault claim in new york', 'file a no-fault claim in ny']],
  ['/qa/does-renters-insurance-cover-bike-theft/', 3, ['does renters insurance cover bike theft', 'bicycle theft renters insurance', 'bike theft covered by renters insurance']],
  ['/qa/does-renters-insurance-cover-water-damage-from-a-leak/', 3, ['does renters insurance cover water damage from a leak', 'water damage from a leak renters insurance', 'renters insurance water leak']],
  ['/qa/does-renters-insurance-cover-dog-bites/', 3, ['does renters insurance cover dog bites', 'renters insurance dog bite', 'dog bite liability']],
  ['/qa/does-renters-insurance-cover-mold/', 3, ['does renters insurance cover mold', 'renters insurance mold damage']],
  ['/qa/does-renters-insurance-cover-flood-or-earthquake-damage/', 3, ['does renters insurance cover flood or earthquake damage', 'renters insurance flood damage']],
  ['/qa/does-renters-insurance-cover-roommates-belongings/', 3, ["does renters insurance cover roommate's belongings", 'does renters insurance cover roommates belongings', 'renters insurance roommate']],
  ['/qa/how-much-renters-insurance-coverage-do-you-need/', 3, ['how much renters insurance coverage do you need', 'how much renters insurance do i need']],
  ['/qa/are-independent-contractors-exempt-from-workers-compensation/', 3, ['are independent contractors exempt from workers compensation', 'independent contractors exempt from workers comp']],
  ['/qa/are-sole-proprietors-required-to-have-workers-compensation-insurance/', 3, ['are sole proprietors required to have workers compensation insurance', 'sole proprietors workers comp']],
  ['/qa/how-many-employees-before-you-need-workers-compensation-insurance/', 3, ['how many employees before you need workers compensation insurance', 'how many employees before workers comp']],
  ['/qa/are-life-insurance-agents-exempt-from-workers-compensation/', 3, ['are life insurance agents exempt from workers compensation']],
  ['/qa/hurt-at-work-employer-exempt-from-workers-compensation/', 3, ['hurt at work employer exempt from workers compensation', 'injured at work employer exempt from workers comp']],
  ['/qa/can-you-have-two-health-insurances/', 3, ['can you have two health insurances', 'can you have 2 health insurances', 'two health insurance plans', 'two health insurances']],
  ['/qa/can-i-have-multiple-life-insurance-policies/', 3, ['can i have multiple life insurance policies', 'multiple life insurance policies']],
  ['/qa/can-you-have-two-auto-insurance-policies/', 3, ['can you have two auto insurance policies', 'two car insurance policies', 'two auto policies on one car']],
  ['/qa/can-you-have-multiple-disability-insurance-policies/', 3, ['can you have multiple disability insurance policies', 'multiple disability insurance policies']],

  // ---- Compare ----
  ['/compare/aca-marketplace-vs-employer-sponsored-health-insurance/', 3, ['aca marketplace', 'marketplace plan', 'healthcare.gov', 'employer-sponsored', 'affordable care act', '=ACA']],
  ['/compare/actual-cash-value-vs-replacement-cost/', 3, ['actual cash value vs replacement cost', 'actual cash value vs. replacement cost', 'acv vs rcv', 'acv vs. rcv']],
  ['/compare/agency-vs-direct-insurance/', 3, ['buy direct', 'buying direct', 'direct online', 'direct insurer', 'direct writer', 'direct-to-consumer']],
  ['/compare/agreed-value-vs-actual-cash-value-boat-insurance/', 3, ['agreed value'], { requires: /\bboat|vessel|yacht|watercraft/ }],
  ['/compare/agreed-value-vs-actual-cash-value-classic-car-insurance/', 3, ['agreed value'], { requires: /classic car|collector car|collector vehicle|vintage car|antique car/ }],
  ['/compare/agreed-value-vs-actual-cash-value-classic-car-insurance/', 3, ['classic car insurance', 'collector car', 'classic car']],
  ['/compare/bank-included-vs-standalone-travel-insurance/', 3, ['bank-included travel insurance', 'credit card travel insurance', 'packaged bank account', 'standalone travel']],
  ['/compare/bareboat-vs-captained-charter-insurance/', 3, ['bareboat', 'captained charter', 'yacht charter']],
  ['/compare/california-wildfire-home-insurance/', 3, ['surplus lines', 'surplus-lines', 'non-admitted', '=MGA', 'managing general agent', 'managing general agency', 'wildfire zone']],
  ['/compare/fair-plan-vs-admitted-homeowners-california/', 3, ['fair plan']],
  ['/compare/car-insurance-companies/', 3, ['regional insurer', 'regional auto insurer', 'agent-only', 'non-standard auto', 'non-standard insurer']],
  ['/compare/commercial-insurance-by-industry/', 3, ['commercial insurance by industry', 'professional services firm']],
  ['/compare/comprehensive-vs-collision/', 3, ['comprehensive coverage', 'collision coverage', 'comprehensive and collision', 'collision and comprehensive', 'comprehensive vs collision', 'comprehensive vs. collision']],
  ['/compare/deductible-vs-premium/', 3, ['high deductible vs low deductible', 'higher deductible', 'raising your deductible', 'raise your deductible', 'low deductible']],
  ['/compare/dental-implant-vs-dental-bridge/', 3, ['implant vs bridge', 'implant vs. bridge', 'implant or a bridge']],
  ['/compare/florida-homeowners-insurance/', 3, ['citizens property insurance', 'florida homeowners insurance', 'florida home insurance']],
  ['/compare/florida-homeowners-insurer-financial-strength-check/', 3, ['demotech', 'insurer insolvency', 'financial strength check']],
  ['/compare/hmo-vs-ppo/', 3, ['hmo vs ppo', 'hmo vs. ppo', '=HMO', '=PPO']],
  ['/compare/hmo-vs-ppo-vs-epo-vs-hdhp/', 3, ['=EPO', 'health plan type', 'plan types']],
  ['/compare/home-auto-bundling-discount-savings/', 3, ['bundling discount', 'multi-policy discount', 'bundle home and auto', 'bundling']],
  ['/compare/level-funded-vs-fully-insured-health-insurance/', 3, ['level-funded', 'fully insured', 'self-funded']],
  ['/compare/liability-only-vs-full-coverage-boat-insurance/', 3, ['liability-only boat', 'full coverage boat', 'hull coverage']],
  ['/compare/mexico-auto-insurance/', 3, ['mexico auto insurance', 'mexican auto insurance', 'mexico tourist auto', 'driving in mexico']],
  ['/compare/sailboat-vs-powerboat-insurance/', 3, ['sailboat', 'powerboat']],
  ['/compare/small-car-insurance/', 3, ['small car', 'discontinued model']],
  ['/compare/term-vs-whole-life/', 3, ['whole life', 'term vs whole', 'term vs. whole', 'permanent life insurance']],
  ['/compare/traditional-braces-vs-invisalign/', 3, ['invisalign', 'clear aligner']],
  ['/compare/travel-insurance-cancellation-cover/', 3, ['cancel for any reason', '=CFAR', 'trip cancellation', 'cancellation cover']],
  ['/compare/urgent-care-vs-emergency-room-cost-insurance/', 3, ['urgent care vs emergency room', 'urgent care vs. emergency room', 'emergency room', 'ER visit']],
  ['/compare/verify-independent-insurance-agency-license/', 3, ['license lookup', 'producer license', "agent's license", 'verify a license', 'state license']],
  ['/compare/verify-insurance-quote-site-before-entering-information/', 3, ['quote site', 'lead generator', 'lead-generation', 'lead generation', 'comparison site', 'verify insurance quote site']],
  ['/compare/pip-vs-medpay/', 3, ['pip vs medpay', 'pip vs. medpay', 'personal injury protection vs medpay', 'medpay vs pip', 'pip vs med pay']],
  ['/compare/renters-insurance-vs-landlord-insurance/', 3, ['renters insurance vs landlord insurance', 'renters vs landlord insurance', 'landlord vs renters insurance']],
  ['/compare/workers-compensation-vs-individual-disability-insurance/', 3, ["workers' compensation vs individual disability insurance", 'workers comp vs disability insurance', 'workers comp vs individual disability']],

  // ---- Scenarios ----
  ['/scenarios/alex-first-mortgage-london/', 3, ['first mortgage', 'mortgage protection', 'buildings insurance']],
  ['/scenarios/cross-border-trip-without-mexico-insurance/', 3, ['cross-border', 'cross the border', 'crossing the border']],
  ['/scenarios/elena-california-braces-insurance-gap/', 3, ['orthodontic rider', 'orthodontic coverage', 'orthodontic lifetime maximum']],
  ['/scenarios/jake-austin-wisdom-teeth-no-insurance/', 3, ['wisdom teeth', 'wisdom tooth']],
  ['/scenarios/jordan-california-auto-coverage/', 3, ['financed car', 'financing a car', 'car loan', 'auto loan']],
  ['/scenarios/marco-freelance-berlin/', 3, ['freelancer', 'self-employed']],
  ['/scenarios/marcus-small-business-health-plan-structure/', 3, ['small business health', 'small-group health', 'group health plan']],
  ['/scenarios/maria-first-boat-florida/', 3, ['first boat', 'first-time boat', 'new boat owner']],
  ['/scenarios/rachel-california-surrogacy-insurance-gap/', 3, ['=SB 729', 'surrogacy insurance gap']],
  ['/scenarios/lauren-health-insurance-diagnosis-coverage/', 3, ['new diagnosis', 'recently diagnosed', 'chronic condition']],
  ['/scenarios/renewal-notice-from-unfamiliar-insurer/', 3, ['renewal notice', 'unfamiliar insurer', 'renewal offer']],
  ['/scenarios/sarah-and-david-new-parents-toronto/', 3, ['new parents', 'new baby', 'growing family']],
  ['/scenarios/sold-my-info-after-one-quote-request/', 3, ['sold my information', 'sold your information', 'sold my info', 'robocall', 'spam calls']],
  ['/scenarios/tom-liveaboard-houseboat-retirement/', 3, ['liveaboard', 'live aboard']],
  ['/scenarios/two-neighbors-different-admitted-status/', 3, ['admitted insurer', 'admitted carrier', 'admitted status']],
  ['/scenarios/wrong-phone-number-delayed-claim/', 3, ['wrong phone number', 'claims phone number', 'claims number', 'delayed claim']],
  ['/scenarios/uninsured-driver-crash-georgia-um-claim/', 3, ['uninsured driver crash in georgia', 'atlanta uninsured driver scenario', 'atlanta uninsured driver crash']],
  ['/scenarios/carlos-texas-non-subscriber-workers-comp/', 3, ['texas non-subscriber', 'texas non-subscriber workers comp', 'texas non subscriber workers comp']],

  // ---- Glossary ----
  ['/glossary/actual-cash-value/', 2, ['actual cash value', '=ACV']],
  ['/glossary/replacement-cost/', 2, ['replacement cost', '=RCV']],
  ['/glossary/beneficiary/', 2, ['beneficiary', 'beneficiaries']],
  ['/glossary/bonus-malus-system/', 3, ['bonus-malus']],
  ['/glossary/cobra-continuation-coverage/', 3, ['=COBRA', 'cobra continuation']],
  ['/glossary/coinsurance/', 2, ['coinsurance', 'co-insurance']],
  ['/glossary/copay/', 2, ['copay', 'copayment', 'co-pay']],
  ['/glossary/deductible/', 2, ['deductible']],
  ['/glossary/elimination-period/', 3, ['elimination period']],
  ['/glossary/exclusion/', 2, ['exclusion']],
  ['/glossary/gap-insurance/', 3, ['gap insurance', 'guaranteed asset protection', 'gap coverage']],
  ['/glossary/incontestable-clause/', 3, ['incontestable clause', 'contestability period', 'contestable period']],
  ['/glossary/insurance-discovery/', 3, ['insurance discovery']],
  ['/glossary/lifetime-health-cover/', 3, ['lifetime health cover', '=LHC loading']],
  ['/glossary/no-claims-bonus/', 3, ['no claims bonus', 'no-claims bonus', 'no claims discount', 'no-claims discount', '=NCB', '=NCD']],
  ['/glossary/out-of-pocket-maximum/', 2, ['out-of-pocket maximum', 'out-of-pocket max', 'out-of-pocket limit']],
  ['/glossary/peo-health-plan/', 3, ['=PEO', 'professional employer organization', 'co-employment']],
  ['/glossary/premium/', 1, ['premium']],
  ['/glossary/principle-of-indemnity/', 3, ['principle of indemnity', 'indemnity principle']],
  ['/glossary/prior-authorization/', 3, ['prior authorization', 'pre-authorization', 'preauthorization', 'prior auth']],
  ['/glossary/sub-limit/', 3, ['sub-limit', 'inner limit']],
  ['/glossary/subrogation/', 3, ['subrogation']],
  ['/glossary/total-and-permanent-disability/', 3, ['total and permanent disability', '=TPD']],
  ['/glossary/umbrella-insurance/', 2, ['excess liability']],
  ['/glossary/personal-injury-protection/', 3, ['personal injury protection', '=PIP', 'pip coverage']],
  ['/glossary/tort-threshold/', 3, ['tort threshold', 'verbal threshold', 'monetary tort threshold']],

  // ---- Category hubs & tools (low weight, capped) ----
  ['/insurance/car-insurance/', 1, ['car insurance', 'auto insurance']],
  ['/insurance/health-insurance/', 1, ['health insurance']],
  ['/insurance/home-insurance/', 1, ['home insurance']],
  ['/insurance/disability-insurance/', 1, ['disability insurance']],
  ['/insurance/business-insurance/', 1, ['business insurance', 'commercial insurance']],
  ['/insurance/property-insurance/', 1, ['property insurance']],
  ['/coverage-gap-checker/', 1, ['coverage gap']],
  ['/policy-check/', 1, ['policy health check', 'policy audit']],
];

// Links to pages that do not exist → closest real page (or null = unwrap).
const REDIRECTS = {
  '/commercial-insurance-calculator/': '/business-insurance-checklist/',
  '/construction-insurance-calculator/': '/business-insurance-checklist/',
  '/travel-insurance-calculator/': '/travel-insurance-checklist/',
  '/editorial-standards/': '/editorial-policy/',
  '/privacy/': '/privacy-policy/',
  '/terms/': '/terms-of-service/',
  '/compare/contract-works-vs-contractors-all-risk/': '/learn/contractors-all-risk-contract-works-insurance-uk/',
  '/compare/declared-modifications-car-insurance-claims/': '/learn/car-insurance-guide/',
  '/compare/guaranteed-replacement-cost-home-insurance/': '/compare/actual-cash-value-vs-replacement-cost/',
  '/compare/insurance-lead-marketplace-vs-direct-carrier-quote/': '/compare/verify-insurance-quote-site-before-entering-information/',
  '/compare/lapse-in-auto-insurance-coverage-effect-on-rates/': '/learn/what-happens-if-you-stop-paying-insurance/',
  '/compare/mexico-auto-insurance-for-us-drivers/': '/compare/mexico-auto-insurance/',
  '/compare/new-york-vs-florida-car-insurance-requirements/': '/learn/car-insurance-basics-registration-cost-claims/',
  '/compare/non-standard-vs-standard-auto-insurance-claims/': '/compare/car-insurance-companies/',
  '/compare/sr22-vs-fr44-filing-requirements/': '/qa/can-you-get-auto-insurance-with-a-suspended-license/',
  '/compare/what-happens-when-your-insurer-is-acquired/': '/learn/what-is-an-insurer/',
  '/compare/windscreen-repair-cover-uk-motor-insurance/': '/qa/are-windshields-covered-by-insurance-in-florida/',
  '/glossary/admitted-insurer/': '/scenarios/two-neighbors-different-admitted-status/',
  '/glossary/am-best-rating/': '/learn/what-is-an-insurer/',
  '/glossary/co-employment/': '/glossary/peo-health-plan/',
  '/glossary/contract-works/': '/qa/what-is-contract-works-insurance/',
  '/glossary/coordination-of-benefits/': '/learn/what-is-coordination-of-benefits/',
  '/glossary/coverage/': '/learn/coverage-vs-limits/',
  '/glossary/death-benefit/': '/learn/what-is-life-insurance/',
  '/glossary/depreciation/': '/glossary/actual-cash-value/',
  '/glossary/eligibility-verification/': '/glossary/insurance-discovery/',
  '/glossary/explanation-of-benefits/': '/learn/health-insurance-basics/',
  '/glossary/grace-period/': '/learn/what-happens-if-you-stop-paying-insurance/',
  '/glossary/group-health-insurance/': '/compare/aca-marketplace-vs-employer-sponsored-health-insurance/',
  '/glossary/hired-in-plant-insurance/': '/qa/what-is-hired-in-plant-insurance/',
  '/glossary/insurable-interest/': '/qa/can-you-get-life-insurance-on-anyone/',
  '/glossary/level-funded-health-insurance/': '/compare/level-funded-vs-fully-insured-health-insurance/',
  '/glossary/managing-general-agent/': '/compare/california-wildfire-home-insurance/',
  '/glossary/medical-necessity/': '/glossary/prior-authorization/',
  '/glossary/naic-complaint-index/': '/learn/insurance-company-reviews-is-brand-insurance-legit/',
  '/glossary/qualifying-life-event/': '/glossary/cobra-continuation-coverage/',
  '/glossary/rider/': '/learn/what-is-an-insurance-rider/',
  '/glossary/small-group-plan/': '/compare/level-funded-vs-fully-insured-health-insurance/',
  '/glossary/special-enrollment-period/': '/compare/aca-marketplace-vs-employer-sponsored-health-insurance/',
  '/glossary/surplus-lines-insurance/': '/compare/california-wildfire-home-insurance/',
  '/glossary/term-life/': '/learn/term-insurance-guide/',
  '/glossary/underwriting/': '/learn/what-is-insurance-underwriting/',
  '/learn/insurance-company-reviews-is-brand-legit/': null, // real page; keep (listed so it is never "fixed")
  // scenarios renamed so personas match their country and no name repeats (old URLs hold redirect stubs)
  '/scenarios/meera-california-surrogacy-insurance-gap/': '/scenarios/rachel-california-surrogacy-insurance-gap/',
  '/scenarios/priya-health-insurance-diagnosis-coverage/': '/scenarios/lauren-health-insurance-diagnosis-coverage/',
  '/scenarios/rohan-first-sport-bike-texas/': '/scenarios/ethan-first-sport-bike-texas/',
  '/scenarios/marcus-texas-non-subscriber-workers-comp/': '/scenarios/carlos-texas-non-subscriber-workers-comp/',
  '/scenarios/daniel-first-cessna-182-texas/': '/scenarios/brian-first-cessna-182-texas/',
  '/scenarios/danny-construction-subcontractor-workers-comp-audit/': '/scenarios/travis-construction-subcontractor-workers-comp-audit/',
};

// ---------------------------------------------------------------------------
// 2. Title / H1 / description overrides (keyword-first, <= ~60 chars).
// ---------------------------------------------------------------------------
const GLOSSARY_TITLES = {
  'actual-cash-value': 'What Is Actual Cash Value (ACV)? Definition & Example',
  'beneficiary': 'What Is a Beneficiary in Insurance? Definition & Rules',
  'bonus-malus-system': 'What Is a Bonus-Malus System? Car Insurance Definition',
  'coinsurance': 'What Is Coinsurance? Definition & How It Works',
  'copay': 'What Is a Copay (Copayment)? Definition & Examples',
  'deductible': 'Deductible Meaning: Insurance Definition & Example',
  'elimination-period': 'What Is an Elimination Period? Disability Definition',
  'exclusion': 'Exclusion Meaning: Insurance Definition & Examples',
  'gap-insurance': 'What Is GAP Insurance? Definition & When You Need It',
  'incontestable-clause': 'What Is an Incontestable Clause? Life Insurance Definition',
  'lifetime-health-cover': 'What Is Lifetime Health Cover (LHC) Loading?',
  'no-claims-bonus': 'What Is a No Claims Bonus (NCB)? Definition & Rules',
  'out-of-pocket-maximum': 'What Is an Out-of-Pocket Maximum? Definition & Example',
  'premium': 'Premium Meaning in Insurance: Definition & Example',
  'principle-of-indemnity': 'What Is the Principle of Indemnity? Definition & Example',
  'replacement-cost': 'What Is Replacement Cost Value (RCV)? Definition & Example',
  'sub-limit': 'What Is a Sub-Limit in Insurance? Definition & Example',
  'subrogation': 'What Is Subrogation in Insurance? Definition & Example',
  'total-and-permanent-disability': 'What Is Total and Permanent Disability (TPD)?',
  'umbrella-insurance': 'Umbrella Policy Meaning: Excess Liability Definition',
  'personal-injury-protection': 'What Is Personal Injury Protection (PIP)? Definition & States',
  'tort-threshold': 'What Is a Tort Threshold? Definition, Verbal vs Monetary',
};

const QA_TITLES = {
  'best-rate-on-car-insurance': 'Best Rate on Car Insurance: What Actually Lowers Your Price',
  'car-insurance-lawyer': 'Car Insurance Lawyer: When You Actually Need One',
  'essentia-insurance': "Essentia Insurance: Hagerty's Classic Car Insurer Explained",
  'is-amtex-auto-insurance-legit': 'Amtex Auto Insurance: How the Texas Agency Works',
  'what-is-smart-auto-insurance': "Smart Auto Insurance: Which 'Smart' Company Do You Mean?",
  'what-is-amigo-insurance': 'Amigo Insurance: 3 Different Companies Explained',
  'is-puffin-travel-insurance-good': 'Puffin Travel Insurance: Who Underwrites It & Is It Good?',
  'nyaip': 'NYAIP: New York Automobile Insurance Plan (Assigned Risk)',
  'john-hancock-life-insurance': 'John Hancock Life Insurance: Ratings, Policies & Ownership',
  'life-insurance-lawyer': 'Life Insurance Lawyer: When a Denied Claim Needs One',
  'insurance-agency-near-me': 'Insurance Agency Near Me: How to Pick a Local Agency',
  'insurance-agencies-near-me-independent-vs-captive': 'Insurance Agencies Near Me: Captive vs. Independent',
  'health-plus-telephone-number': 'Health Plus Telephone Number: Which Health Plus Do You Need?',
  'what-is-quotelab': 'What Is QuoteLab? Insurance Lead-Gen Company Explained',
  'insurance-agency-business-plan': 'Insurance Agency Business Plan: The 6 Core Sections',
  'john-hancock-life-insurance-customer-service': 'John Hancock Life Insurance Customer Service Numbers',
  'colonial-penn-life-insurance-rate-chart-by-age': 'Colonial Penn Life Insurance Rate Chart by Age: How Units Work',
  'is-nycm-a-good-insurance-company': 'Is NYCM a Good Insurance Company? Ratings & Complaints',
  'plymouth-rock-insurance-quote': 'Plymouth Rock Insurance Quote: Online, Phone, or Agent',
  'is-slide-insurance-going-out-of-business': 'Is Slide Insurance Going Out of Business? Latest Facts',
  'how-to-sell-commercial-insurance': 'How to Sell Commercial Insurance: A Practical Playbook',
  'how-to-get-clients-for-insurance-business': 'How to Get Clients for an Insurance Business',
  'how-much-do-insurance-agencies-make': 'How Much Do Insurance Agencies Make? Agent vs. Agency Pay',
};

const SCENARIOS = {
  'alex-first-mortgage-london': ['First Mortgage in London: Life & Buildings Insurance Case Study', "Alex's First Mortgage in London: Which Insurance Does He Actually Need?", 'Alex, a first-time buyer with a £350,000 London mortgage, weighs life cover, mortgage protection, and buildings insurance. See the gaps and a costed plan.'],
  'cross-border-trip-without-mexico-insurance': ['Driving to Mexico Without Mexican Auto Insurance: Case Study', "Kevin's Texas-to-Mexico Road Trip: Does a U.S. Auto Policy Cover You?", "Kevin assumed his U.S. auto policy covered a weekend drive into Mexico. See why it doesn't, what Mexican liability law requires, and how to close the gap."],
  'elena-california-braces-insurance-gap': ['Braces Insurance Gap: Orthodontic Coverage Case Study', "Elena's Braces Bill: Where an Orthodontic Rider Leaves a Gap", "Elena's son needs braces, and her dental PPO's orthodontic rider pays 50% only up to a lifetime maximum. See the real out-of-pocket cost and ways to close the gap."],
  'jake-austin-wisdom-teeth-no-insurance': ['Wisdom Teeth Removal Without Insurance: Cost Case Study', "Jake's Wisdom Teeth Without Insurance: Costs, Options & Next Steps", 'Jake, a 19-year-old student with no dental coverage, needs four impacted wisdom teeth removed. Compare cash prices, discount plans, and new-policy waiting periods.'],
  'jordan-california-auto-coverage': ['Financed Car on California Minimum Liability: Case Study', "Jordan's Financed Car: What 'Full Coverage' Means in California", "Jordan is financing a $28,000 car on California's minimum liability limits. See what full coverage adds, why lenders require it, and a $110–$165/month plan."],
  'marco-freelance-berlin': ['Freelancer Insurance in Berlin: Health, Liability & Income', 'Marco, Freelancer in Berlin: Building a Safety Net Without Employer Benefits', 'Marco is a freelance web developer renting in Berlin with no employer benefits. See his health, liability, and income-protection gaps and a budgeted plan.'],
  'marcus-small-business-health-plan-structure': ['Small Business Health Plan Options: 14-Employee Case Study', "Marcus's First Group Health Plan: Fully Insured, Level-Funded, or PEO?", 'Marcus owns a 14-employee logistics firm and is losing hires over benefits. Compare fully insured, level-funded, and PEO health plan structures for small businesses.'],
  'maria-first-boat-florida': ['First Boat Insurance in Florida: Financed Boat Case Study', "Maria's First Boat in Florida: Insuring a Financed Center Console", 'Maria just financed a 24-foot center console kept at a Florida marina. See what her lender and marina require, hurricane rules, and the coverage she needs.'],
  'rachel-california-surrogacy-insurance-gap': ['Surrogacy Insurance Gap in California: SB 729 Case Study', "Rachel's Surrogacy Journey: Closing the Insurance Gap in California", "Rachel turned to gestational surrogacy after failed IVF. See what California's SB 729 does and doesn't cover, why costs still hit $175,000, and how to insure the surrogate."],
  'lauren-health-insurance-diagnosis-coverage': ['New Diagnosis on a PPO: Health Insurance Cost Case Study', "Lauren's New Diagnosis: What Her PPO Will Actually Cost This Year", 'Lauren has a $2,500 deductible, a $6,000 out-of-pocket maximum, and a new diagnosis. See how specialist visits, medication, and prior authorization add up.'],
  'renewal-notice-from-unfamiliar-insurer': ['Renewal Notice From an Unfamiliar Insurer: Florida Case Study', "Denise's Renewal Offer From an Insurer She'd Never Heard Of", "Denise's Florida home insurer exited the state and an unfamiliar company sent a renewal offer. Here's how to verify the insurer, its rating, and her options."],
  'sarah-and-david-new-parents-toronto': ['New Parents in Toronto: Life & Disability Insurance Case Study', 'Sarah & David, New Parents in Toronto: How Much Coverage Do They Need?', 'Sarah and David have a toddler and a C$650,000 mortgage in Toronto. See how much term life and disability coverage they need and what it should cost.'],
  'sold-my-info-after-one-quote-request': ['Sold My Info After One Insurance Quote Request: Case Study', 'Emily Asked for One Car Insurance Quote and Got Calls From Several Agents', 'One online car insurance quote form led to calls from several unrelated agents within the hour. Learn how lead-generation sites work and how to stop the calls.'],
  'tom-liveaboard-houseboat-retirement': ['Liveaboard Houseboat Insurance in Retirement: Case Study', 'Tom Retires to a Houseboat: Insuring a Liveaboard Home', 'Tom sold his house to live full-time on a 42-foot houseboat at a marina slip. See where marine and home insurance overlap and the gaps a liveaboard must close.'],
  'two-neighbors-different-admitted-status': ['Admitted vs. Surplus Lines Home Insurance: Wildfire Case Study', 'Two Neighbors, Two Insurers: Admitted vs. Surplus-Lines Coverage in a Wildfire Zone', 'Alan was dropped by his admitted insurer and placed with a surplus-lines carrier in a Los Angeles wildfire zone. See how protections, rates, and claims differ.'],
  'wrong-phone-number-delayed-claim': ['Wrong Claims Phone Number Delayed My Car Insurance Claim', 'Megan Called the Wrong Claims Number: How to Report an Auto Claim Fast', 'Rear-ended in traffic, Megan called an outdated claims number from a third-party listing and lost 45 minutes. See how to find the right number and report fast.'],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const decode = s => s.replace(/&amp;/g, '&').replace(/&#0?39;|&apos;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&nbsp;/g, ' ');
const encAttr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const encText = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripMd = s => s.replace(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\((?:\/|https?:\/\/)[^)\s]*\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
const stripTags = s => s.replace(/<[^>]+>/g, '');
const esc = s => s.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
const BRAND = ' | Insurance Bhaiya';

function smartTrim(s, max = 158) {
  s = s.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max + 1);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '), cut.endsWith('.') ? cut.length - 1 : -1);
  if (end >= 105) return cut.slice(0, end + 1);
  const base = s.slice(0, max); // leave room for the ellipsis so a second pass is a no-op
  return base.slice(0, base.lastIndexOf(' ')).replace(/[\s,;:(—–-]+$/, '') + '…';
}
const withBrand = t => (t.length + BRAND.length <= 65 ? t + BRAND : t);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || ['backups', 'src', 'images', 'node_modules', 'dist'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}
const FILES = walk(ROOT);
const urlOf = f => { const r = path.relative(ROOT, path.dirname(f)).replace(/\\/g, '/'); return r ? `/${r}/` : '/'; };
const VALID = new Set(FILES.map(urlOf));
// noindex pages (e.g. redirect stubs left at renamed URLs) are valid link targets but never content
const PAGES = FILES.map(f => ({ file: f, url: urlOf(f), section: urlOf(f).split('/')[1] || '' }))
  .filter(p => !/<meta name="robots" content="noindex/.test(fs.readFileSync(p.file, 'utf8').slice(0, 2000)));
const QA_COUNT = PAGES.filter(p => p.section === 'qa' && p.url.split('/').length === 4).length;
const assetHash = f => require('crypto').createHash('sha1').update(fs.readFileSync(path.join(ROOT, f))).digest('hex').slice(0, 10);
const ASSET_VER = { css: assetHash('styles.css'), js: assetHash('app.js') };
const DATA_PATH = path.join(ROOT, 'data.json');
const DATA = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

function resolveHref(href) {
  // returns new href, or null to unwrap
  const m = href.match(/^(\/[^?#]*)([?#].*)?$/);
  if (!m) return href;
  let [, p, rest = ''] = m;
  if (/\.[a-z0-9]{2,5}$/i.test(p)) return href; // asset
  if (!p.endsWith('/')) p += '/';
  p = p.replace(/\/{2,}/g, '/');
  const tool = p.match(/^\/tools\/([a-z0-9-]+)\/$/);
  if (tool && VALID.has(`/${tool[1]}/`)) p = `/${tool[1]}/`;
  if (REDIRECTS[p]) p = REDIRECTS[p]; // also covers renamed pages whose old URL is a redirect stub
  else if (!VALID.has(p)) return null;
  return p + rest;
}

// ---------------------------------------------------------------------------
// Keyword regex construction
// ---------------------------------------------------------------------------
function phraseSrc(p) {
  let out = '';
  for (const ch of p) {
    if (ch === ' ') out += '[\\s\\u00a0]+';
    else if (ch === '-') out += '[-\\s\\u00a0]?';
    else if (ch === "'") out += "(?:'|&#0?39;|&rsquo;|’)";
    else if (ch === '&') out += '(?:&amp;|&)';
    else out += esc(ch);
  }
  return out;
}
const ENTRIES = [];
for (const [url, weight, phrases, opts = {}] of KEYWORDS) {
  for (const raw of phrases) {
    const cs = raw.startsWith('=');
    const phrase = cs ? raw.slice(1) : raw;
    ENTRIES.push({ url, weight, phrase, cs, words: phrase.split(/\s+/).length, notBefore: opts.notBefore, requires: opts.requires });
  }
}
function buildRegex(entries, flags) {
  // one alternation group per distinct phrase; each keeps its candidate targets in KEYWORDS order,
  // and the first whose `requires` context matches the page wins
  const groups = new Map();
  for (const e of entries) {
    const k = flags.includes('i') ? e.phrase.toLowerCase() : e.phrase;
    if (!groups.has(k)) groups.set(k, { phrase: e.phrase, options: [] });
    groups.get(k).options.push(e);
  }
  const list = [...groups.values()].sort((a, b) => b.phrase.length - a.phrase.length);
  const src = list.map(g => `(${phraseSrc(g.phrase)}(?:e?s)?)`).join('|');
  return { re: new RegExp(`(?<![\\w&#;-])(?:${src})(?![\\w-])`, flags), list };
}
const RX_CI = buildRegex(ENTRIES.filter(e => !e.cs), 'gi');
const RX_CS = buildRegex(ENTRIES.filter(e => e.cs), 'g');
// sanity: every target must exist
for (const [url] of KEYWORDS) if (!VALID.has(url)) console.warn('WARN keyword target missing:', url);

// ---------------------------------------------------------------------------
// HTML tokenizer for <main> and link insertion
// ---------------------------------------------------------------------------
const TOKEN_RE = /(<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<[a-zA-Z!\/](?:[^>"']|"[^"]*"|'[^']*')*>)/;
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr', 'path', 'circle', 'line', 'polyline', 'polygon', 'rect']);
const BLOCK_TAGS = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'summary', 'button', 'th', 'nav', 'aside', 'header', 'label', 'select', 'option', 'svg', 'figcaption', 'strong', 'b', 'code']);
const BLOCK_CLASS = /(related-|qa-similar|qa-paa|qa-sidebar|breadcrumb|\bpill\b|decision-tool|author|compare-opt|why-label|cell-feature|quiz|qa-takeaways-title|qa-precedent|scenario-risk-title|scenario-strategy-title|faq-header|apple-disclaimer|qa-helpful|scenario-quote|scenario-take-label|qa-case-scenario-link|apple-article|footer)/;
const ELIGIBLE_TAGS = new Set(['p', 'li', 'td', 'dd', 'blockquote']);
const ELIGIBLE_CLASS = /(faq-answer|qa-section-content|qa-action-item)/;

function tagInfo(tok) {
  const m = tok.match(/^<(\/?)([a-zA-Z0-9-]+)/);
  if (!m) return null;
  const cls = (tok.match(/\sclass="([^"]*)"/) || [])[1] || '';
  const href = (tok.match(/\shref="([^"]*)"/) || [])[1];
  return { close: !!m[1], name: m[2].toLowerCase(), cls, href, self: /\/>$/.test(tok) };
}

const STOP = new Set(['insurance', 'what', 'is', 'a', 'an', 'the', 'how', 'does', 'do', 'you', 'your', 'can', 'i', 'my', 'to', 'of', 'in', 'for', 'and', 'vs', 'with', 'without', 'cost', 'much', 'are', 'it', 'on', 'be', 'or', 'guide', 'explained', 'need', 'get', 'which', 'when', 'why', 'much']);

function linkify(mainHtml, page, pageTextLower) {
  const toks = mainHtml.split(TOKEN_RE);
  const stack = [];
  const existing = new Set();
  const autoExisting = []; // links inserted by an earlier run (marked data-il)
  const autoBlocks = new Set(); // blocks that already received an auto link
  const blockLinks = new Map();
  const cands = []; // {ti, start, end, entry, block}
  let words = 0;
  const blockedNow = () => stack.some(s => BLOCK_TAGS.has(s.name) || BLOCK_CLASS.test(s.cls));
  const eligibleBlock = () => {
    for (let i = stack.length - 1; i >= 0; i--) {
      if (ELIGIBLE_TAGS.has(stack[i].name) || ELIGIBLE_CLASS.test(stack[i].cls)) return stack[i].id;
    }
    return -1;
  };
  for (let ti = 0; ti < toks.length; ti++) {
    const t = toks[ti];
    if (!t) continue;
    if (t[0] === '<' && TOKEN_RE.test(t) && !/^<(script|style|!--)/i.test(t)) {
      const info = tagInfo(t);
      if (!info) continue;
      if (info.close) {
        const idx = stack.map(s => s.name).lastIndexOf(info.name);
        if (idx >= 0) stack.length = idx;
        continue;
      }
      if (info.name === 'a' && info.href) {
        if (!stack.some(s => BLOCK_CLASS.test(s.cls) || ['nav', 'aside'].includes(s.name))) {
          existing.add(info.href.split(/[?#]/)[0]);
          const b = eligibleBlock();
          if (/\sdata-il="auto"/.test(t)) { autoExisting.push(info.href.split(/[?#]/)[0]); autoBlocks.add(b); }
          if (b >= 0) blockLinks.set(b, (blockLinks.get(b) || 0) + 1);
        }
      }
      if (!VOID.has(info.name) && !info.self) stack.push({ name: info.name, cls: info.cls, id: ti });
      continue;
    }
    if (t[0] === '<') continue; // script/style/comment
    if (blockedNow()) continue;
    const block = eligibleBlock();
    if (block < 0) continue;
    words += (t.match(/[A-Za-z]{2,}/g) || []).length;
    const found = [];
    for (const { re, list } of [RX_CI, RX_CS]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(t))) {
        let gi = 1; while (m[gi] === undefined) gi++;
        const entry = list[gi - 1].options.find(o => !o.requires || o.requires.test(pageTextLower));
        if (!entry) continue;
        if (entry.notBefore && entry.notBefore.test(t.slice(m.index + m[0].length))) continue;
        found.push({ start: m.index, end: m.index + m[0].length, entry });
      }
    }
    found.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
    let lastEnd = -1;
    for (const f of found) {
      if (f.start < lastEnd) continue; // overlap with a longer/earlier match
      lastEnd = f.end;
      cands.push({ ti, ...f, block });
    }
  }

  // --- selection ---
  const self = page.url;
  // Target link density ~1 per 110 words (4..14). Hand-written links count 1/3 (many are boilerplate
  // FAQ links); links this script added on earlier runs count fully, so re-runs are stable.
  const manualContentLinks = [...existing].filter(h => /^\/(learn|qa|compare|scenarios|glossary)\//.test(h) && !autoExisting.includes(h)).length;
  const budget = Math.max(0, Math.min(14, Math.max(4, Math.round(words / 110))) - Math.floor(manualContentLinks / 3) - autoExisting.length);
  const byUrl = new Map();
  for (const c of cands) {
    const u = c.entry.url;
    if (u === self || existing.has(u) || existing.has(u.replace(/\/$/, ''))) continue;
    if (!byUrl.has(u)) byUrl.set(u, []);
    byUrl.get(u).push(c);
  }
  const rel = url => {
    const toks = url.split('/').filter(Boolean).pop().split('-').filter(w => !STOP.has(w) && w.length > 2);
    if (!toks.length) return 0;
    return toks.filter(w => pageTextLower.includes(w)).length / toks.length;
  };
  const scored = [...byUrl.entries()].map(([u, list]) => {
    const best = list.reduce((a, c) => (c.entry.weight * 10 + Math.min(c.entry.words, 4) * 2 > a.entry.weight * 10 + Math.min(a.entry.words, 4) * 2 ? c : a));
    return { url: u, list, score: best.entry.weight * 10 + Math.min(best.entry.words, 4) * 2 + rel(u) * 12 + (u.split('/')[1] !== page.section ? 2 : 0) };
  }).sort((a, b) => b.score - a.score);

  const caps = { glossary: Math.max(2, Math.ceil(budget * 0.35)), insurance: 1, tool: 1 };
  const used = { glossary: 0, insurance: 0, tool: 0 };
  for (const h of autoExisting) {
    const sec = h.split('/')[1];
    if (sec === 'glossary' || sec === 'insurance') used[sec]++;
    else if (!CONTENT_SECTIONS.includes(sec)) used.tool++;
  }
  const usedBlocks = new Set(autoBlocks);
  const chosen = [];
  for (const s of scored) {
    if (chosen.length >= budget) break;
    const sec = s.url.split('/')[1];
    const capKey = sec === 'glossary' ? 'glossary' : sec === 'insurance' ? 'insurance' : CONTENT_SECTIONS.includes(sec) ? null : 'tool';
    if (capKey && used[capKey] >= caps[capKey]) continue;
    const c = s.list.find(c => !usedBlocks.has(c.block) && (blockLinks.get(c.block) || 0) < 2);
    if (!c) continue;
    usedBlocks.add(c.block);
    if (capKey) used[capKey]++;
    chosen.push(c);
  }
  // apply (right-to-left within each token)
  chosen.sort((a, b) => a.ti - b.ti || b.start - a.start);
  const out = [];
  for (const c of chosen) {
    const t = toks[c.ti];
    const anchor = t.slice(c.start, c.end);
    toks[c.ti] = t.slice(0, c.start) + `<a href="${c.entry.url}" class="article-link" data-il="auto">${anchor}</a>` + t.slice(c.end);
    out.push({ anchor: decode(anchor), url: c.entry.url });
  }
  if (process.env.IL_DEBUG === page.url) console.error({ words, budget, existing: [...existing], cands: cands.length });
  return { html: toks.join(''), links: out, words, budget };
}

// ---------------------------------------------------------------------------
// Schema helpers
// ---------------------------------------------------------------------------
function ldBlock(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>\n`;
}
function insertLd(html, obj) {
  const i = html.indexOf('<!-- Icons & Fonts -->');
  if (i > 0) return html.slice(0, i) + ldBlock(obj) + '\n  ' + html.slice(i);
  return html.replace('</head>', () => ldBlock(obj) + '</head>');
}
function visibleFaqs(html) {
  const out = [];
  for (const m of html.matchAll(/<details class="faq-item"[^>]*>\s*<summary class="faq-question">\s*<span>([\s\S]*?)<\/span>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/details>/g)) {
    out.push({ q: decode(stripTags(m[1])).trim(), a: decode(stripTags(m[2])).replace(/\s+/g, ' ').trim() });
  }
  return out;
}
const lastmodMap = (() => {
  const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const map = {};
  for (const m of sm.matchAll(/<loc>https:\/\/insurancebhaiya\.com([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) map[m[1]] = m[2];
  return map;
})();

const CATEGORY_HUB = {
  'insurance basics': 'insurance-basics', 'life insurance': 'life-insurance', 'term insurance': 'term-insurance', 'car insurance': 'car-insurance',
  'health insurance': 'health-insurance', 'home insurance': 'home-insurance', 'business insurance': 'business-insurance', 'property insurance': 'property-insurance',
  'pet insurance': 'pet-insurance', 'disability insurance': 'disability-insurance', 'travel insurance': 'travel-insurance',
};
const titleCase = s => s.replace(/\b[a-z]/g, c => c.toUpperCase());

const BOILERPLATE_FAQ = [
  'What is the most cost-effective way to manage this risk?',
  'Where should I go to compare policies and calculate my required limits?',
];

// ---------------------------------------------------------------------------
// Per-page processing
// ---------------------------------------------------------------------------
const report = { changed: 0, links: 0, perSection: {}, unwrapped: 0, repaired: 0, mdFixed: 0, titles: 0, descs: 0, schema: 0 };
const linkLog = {}; // url -> [{anchor,url}]
const changedUrls = new Set();
const pageMeta = {}; // url -> {title, desc, h1}

for (const page of PAGES) {
  const { file, url, section } = page;
  const orig = fs.readFileSync(file, 'utf8');
  let h = orig;
  const isDetail = url.split('/').length === 4 && [...CONTENT_SECTIONS, 'insurance'].includes(section);
  const slug = isDetail ? url.split('/')[2] : '';

  // --- 1. href normalization / repair ---
  h = h.replace(/<a\b([^>]*?)href="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (all, pre, href, post, inner) => {
    const n = resolveHref(href);
    if (n === null || (isDetail && n.split(/[?#]/)[0] === url && !href.startsWith('#'))) {
      if (n === null) report.unwrapped++;
      // unwrap dead links and in-copy self-links; drop self-pointing pills (e.g. a related-term chip
      // whose missing target was redirected back to this very page)
      if (n === null || /article-link/.test(pre + post) || !/class=/.test(pre + post)) return inner;
      if (/class="pill"/.test(pre + post) && !VALID.has(href.split(/[?#]/)[0])) return '';
      return all;
    }
    if (n !== href) { if (!VALID.has(href.split(/[?#]/)[0])) report.repaired++; return `<a${pre}href="${n}"${post}>${inner}</a>`; }
    return all;
  });
  // legacy /tools/<calc>/ duplicates → canonical root calculator
  const toolDup = url.match(/^\/tools\/([a-z0-9-]+)\/$/);
  if (toolDup && VALID.has(`/${toolDup[1]}/`)) {
    h = h.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${SITE}/${toolDup[1]}/">`);
  }

  // --- 2. stray markdown in visible HTML; markdown-free JSON-LD ---
  h = h.replace(/(<main[\s\S]*?<\/main>)/, main => {
    const before = main;
    main = main.replace(/\[((?:[^\[\]]|\[[^\]]*\])+)\]\(((?:\/|https?:\/\/)[^)\s]*)\)/g, (m, text, href) => {
      if (href.startsWith('/')) { const n = resolveHref(href); return n ? `<a href="${n}" class="article-link">${text}</a>` : text; }
      return `<a href="${href}" class="article-link" rel="noopener" target="_blank">${text}</a>`;
    });
    main = main.replace(/\*\*([^*<>\n]{1,120})\*\*/g, '<strong>$1</strong>');
    if (main !== before) report.mdFixed++;
    return main;
  });
  h = h.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (all, body) => {
    const cleaned = body.replace(/\[((?:[^\[\]"]|\[[^\]"]*\])+)\]\((?:\/|https?:\/\/)[^)\s"]*\)/g, '$1').replace(/\*\*([^*"]+)\*\*/g, '$1');
    return cleaned === body ? all : `<script type="application/ld+json">${cleaned}</script>`;
  });

  // --- 2b. cache-bust shared assets (.htaccess caches js/css for a year as immutable) ---
  h = h.replace(/(<link rel="stylesheet" href="\/styles\.css)(?:\?v=[\w-]+)?(")/g, (m, a, b) => `${a}?v=${ASSET_VER.css}${b}`)
    .replace(/(<script src="\/app\.js)(?:\?v=[\w-]+)?(")/g, (m, a, b) => `${a}?v=${ASSET_VER.js}${b}`);

  // tools hub: no "Actuarial Model" box on the calculator cards (owner's design choice)
  if (url === '/tools/') h = h.replace(/\s*<div class="apple-calc-formula">\s*<div[^>]*>[^<]*<\/div>[^<]*<\/div>/g, '');

  // publisher bug: reading time rendered as "7 min read min read"
  h = h.replace(/(\d+\s*min read)(?:\s*min read)+/g, '$1');

  // --- 3. stale counts ---
  h = h.replace(/(Explore|Browse) All \d+ Questions/g, `$1 All ${QA_COUNT} Questions`);

  // --- 4. title / H1 / description ---
  const curTitle = decode((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  let h1 = decode(stripTags((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '')).trim();
  let newTitle = null, newH1 = null, newDesc = null;
  if (isDetail && section === 'compare') {
    const base = h1;
    newTitle = withBrand(base.length <= 34 && /\bvs\.?\b/i.test(base) ? `${base}: Key Differences` : base);
  } else if (isDetail && section === 'glossary' && GLOSSARY_TITLES[slug]) {
    newTitle = withBrand(GLOSSARY_TITLES[slug]);
  } else if (isDetail && section === 'scenarios' && SCENARIOS[slug]) {
    [newTitle, newH1, newDesc] = SCENARIOS[slug];
    newTitle = withBrand(newTitle);
  } else if (isDetail && section === 'qa') {
    let q = h1;
    if (/^(can|do|does|is|are|how|what|why|when|should|will|who|which)\b/i.test(q) && !/\?$/.test(q)) q += '?';
    q = q.charAt(0).toUpperCase() + q.slice(1);
    q = q.replace(/\bsaturdays\b/g, 'Saturdays');
    if (q !== h1) newH1 = q;
    newTitle = QA_TITLES[slug] ? withBrand(QA_TITLES[slug]) : (q.length + ' | Insurance Bhaiya Q&A'.length <= 65 ? `${q} | Insurance Bhaiya Q&A` : withBrand(q));
  } else if (isDetail && section === 'learn') {
    newTitle = withBrand(h1);
  }
  if (newTitle && newTitle !== curTitle) {
    const t = encText(newTitle);
    // function replacers throughout: page text contains "$" amounts that would be read as $1/$2 patterns
    const a = encAttr(newTitle);
    h = h.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${t}</title>`)
      .replace(/(<meta name="title" content=")[^"]*(")/, (m, p, q) => p + a + q)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, (m, p, q) => p + a + q)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, (m, p, q) => p + a + q);
    report.titles++;
  }
  if (newH1) {
    h = h.replace(/(<h1[^>]*>)([\s\S]*?)(<\/h1>)/, (m, a, inner, c) => `${a}${inner.match(/^\s*/)[0]}${encText(newH1)}${inner.match(/\s*$/)[0]}${c}`);
    if (section === 'scenarios') {
      h = h.replace(/("@type": "Article",\s*"headline": )"[^"]*"/, (m, p) => p + JSON.stringify(newH1));
    }
    h1 = newH1;
  }
  const curDesc = decode((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  let desc = newDesc || stripMd(curDesc).replace(/^[A-Z][\w&' ]{1,40}'s Insurance Decision:\s*/, '');
  const TAILS = {
    glossary: [' Plain-English definition, real-world example & common pitfalls.', ' Definition, real-world example & common pitfalls.'],
    compare: [' Side-by-side costs, coverage, and exactly when to choose each.', ' Side-by-side costs, coverage & when to choose each.'],
  };
  if (isDetail && TAILS[section]) desc = desc.replace(/ (?:Side-by-side costs|Plain-English definition, real-world|Definition, real-world)[\s\S]*$/, '');
  if (isDetail && TAILS[section] && desc.length < 110) {
    const tail = TAILS[section].find(t => desc.replace(/\.?$/, '.').length + t.length <= 158);
    if (tail) desc = desc.replace(/\.?$/, '.') + tail;
  }
  desc = smartTrim(desc, 158);
  if (desc && desc !== curDesc) {
    if (process.env.DESC_DEBUG) console.error(url, '\n  OLD', JSON.stringify(curDesc), '\n  NEW', JSON.stringify(desc));
    const d = encAttr(desc);
    h = h.replace(/(<meta name="description" content=")[^"]*(")/, (m, p, q) => p + d + q)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, (m, p, q) => p + d + q)
      .replace(/(<meta name="twitter:description" content=")[^"]*(")/, (m, p, q) => p + d + q);
    report.descs++;
  }
  if (url === '/learn/health-insurance-guide-hindi/') h = h.replace('<html lang="en">', '<html lang="hi">');

  // --- 5. structured data ---
  const canonical = `${SITE}${url}`;
  const ldTypes = [...h.matchAll(/<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema.org",\s*"@type": "([^"]+)"/g)].map(m => m[1]);
  const authorName = decode(stripTags((h.match(/<span class="author-name">([\s\S]*?)<\/span>/) || [])[1] || 'Insurance Bhaiya Editorial Team')).trim();
  const published = lastmodMap[url] || TODAY;
  const publisher = { '@type': 'Organization', name: 'Insurance Bhaiya', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } };
  if (isDetail && section === 'glossary') {
    // drop the incomplete 2-item BreadcrumbList that precedes the full one
    h = h.replace(/<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema.org",\s*"@type": "BreadcrumbList",\s*"itemListElement": \[\s*\{[^{}]*"position": 1[^{}]*\},\s*\{\s*"@type": "ListItem",\s*"position": 2,\s*"name": "Glossary"\s*\}\s*\]\s*\}\s*<\/script>\s*/, '');
    if (!ldTypes.includes('DefinedTerm')) {
      const lead = decode(stripTags((h.match(/<p class="text-lead"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || desc)).trim();
      h = insertLd(h, {
        '@context': 'https://schema.org', '@type': 'DefinedTerm', name: h1, description: lead, url: canonical,
        inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Insurance Bhaiya Insurance Glossary', url: `${SITE}/glossary/` },
      });
      report.schema++;
    }
    // replace boilerplate FAQ #1 with the term's real definition + example
    const g = DATA.glossary.find(x => x.slug === slug);
    const boiler = `How does ${h1} apply in real-world insurance policies?`;
    if (g && h.includes(boiler)) {
      const q = `What does ${h1} mean in insurance?`;
      const ansText = `${stripMd(g.simpleDefinition).trim()} Example: ${stripMd(g.example).trim()}`;
      const ansHtml = encText(ansText);
      h = h.split(`<span>${encText(boiler)}</span>`).join(`<span>${encText(q)}</span>`);
      h = h.replace(new RegExp(`(<span>${esc(encText(q))}</span>[\\s\\S]*?<div class="faq-answer">)[\\s\\S]*?(</div>)`), (m, p, c) => `${p}\n            ${ansHtml}\n          ${c}`);
      h = h.replace(new RegExp(`"name": ${esc(JSON.stringify(boiler))},(\\s*"acceptedAnswer": \\{\\s*"@type": "Answer",\\s*"text": )"(?:[^"\\\\]|\\\\.)*"`), (m, p) => `"name": ${JSON.stringify(q)},${p}${JSON.stringify(ansText)}`);
    }
  }
  if (isDetail && (section === 'compare' || section === 'scenarios') && !ldTypes.includes('Article')) {
    h = insertLd(h, {
      '@context': 'https://schema.org', '@type': 'Article', headline: h1, description: desc,
      image: [(h.match(/<meta property="og:image" content="([^"]+)"/) || [])[1] || `${SITE}/images/hero-guide.jpg`],
      datePublished: published, dateModified: published,
      author: { '@type': 'Organization', name: authorName, url: `${SITE}/author/editorial-team/` },
      publisher, mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }, inLanguage: 'en',
      about: section === 'compare' ? undefined : { '@type': 'Thing', name: 'Insurance case study' },
    });
    report.schema++;
  }
  if (isDetail && section === 'learn' && ldTypes.includes('Article') && !/"author": \{\s*"@type": "Person",\s*"name": "[^"]*",\s*"jobTitle": "[^"]*",\s*"url"/.test(h)) {
    h = h.replace(/("author": \{\s*"@type": "Person",\s*"name": "[^"]*",\s*"jobTitle": "[^"]*")/, `$1,\n    "url": "${SITE}/author/editorial-team/"`);
  }
  if (isDetail && section === 'learn') {
    // category crumb → category hub instead of duplicating /learn/
    const cat = (h.match(/"position": 3,\s*"name": "([^"]+)",\s*"item": "https:\/\/insurancebhaiya\.com\/learn\/"/) || [])[1];
    const hub = cat && CATEGORY_HUB[cat.toLowerCase()];
    if (hub && VALID.has(`/insurance/${hub}/`)) {
      h = h.replace(/("position": 3,\s*"name": )"[^"]+",(\s*"item": )"https:\/\/insurancebhaiya\.com\/learn\/"/, `$1"${titleCase(cat)}",$2"${SITE}/insurance/${hub}/"`);
      h = h.replace(new RegExp(`<a href="/learn/" itemprop="item"><span itemprop="name">${esc(cat)}</span></a>`), `<a href="/insurance/${hub}/" itemprop="item"><span itemprop="name">${titleCase(cat)}</span></a>`);
    }
    // generic FAQs repeated on dozens of pages dilute the FAQPage entity; keep them visible, drop from schema
    for (const q of BOILERPLATE_FAQ) {
      const others = (h.match(/"@type": "Question"/g) || []).length;
      if (others > 1) h = h.replace(new RegExp(`,?\\s*\\{\\s*"@type": "Question",\\s*"name": ${esc(JSON.stringify(q))},\\s*"acceptedAnswer": \\{\\s*"@type": "Answer",\\s*"text": "(?:[^"\\\\]|\\\\.)*"\\s*\\}\\s*\\}`), '');
    }
    h = h.replace(/("mainEntity": \[)\s*,/, '$1');
    // irrelevant sitewide appendix → the page's own companion tool
    const toolHref = (h.match(/<a href="([^"]+)" class="decision-tool-btn"/) || [])[1];
    const toolName = (h.match(/<div class="decision-tool-title">([^<]+)<\/div>/) || [])[1];
    const appendix = / To simulate your personal figures, use our <a href="\/life-insurance-calculator\/">Actuarial Decision Calculator<\/a> or review our <a href="\/compare\/term-vs-whole-life\/">Policy Comparison Guide<\/a>\./;
    if (appendix.test(h)) h = h.replace(appendix, () => (toolHref && toolName ? ` To run your own numbers, use our <a href="${toolHref}">${toolName}</a>.` : ''));
    h = h.replace(/ To simulate your personal figures, use our <a href=\\"\/life-insurance-calculator\/?\\">Actuarial Decision Calculator<\/a> or review our <a href=\\"\/compare\/term-vs-whole-life\/?\\">Policy Comparison Guide<\/a>\./g, '');
  }
  if (isDetail && !ldTypes.includes('FAQPage') && section !== 'qa') {
    const faqs = visibleFaqs(h);
    if (faqs.length) {
      h = insertLd(h, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
      report.schema++;
    }
  }

  // --- 6. contextual interlinking ---
  if (isDetail && CONTENT_SECTIONS.includes(section) && slug !== 'health-insurance-guide-hindi') {
    h = h.replace(/(<main[\s\S]*?<\/main>)/, main => {
      const text = decode(stripTags(main.replace(/<script[\s\S]*?<\/script>/g, ''))).toLowerCase();
      const r = linkify(main, page, text);
      if (r.links.length) {
        linkLog[url] = r.links;
        report.links += r.links.length;
        report.perSection[section] = (report.perSection[section] || 0) + r.links.length;
      }
      return r.html;
    });
  }

  pageMeta[url] = {
    title: decode((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/ \| Insurance Bhaiya( Q&A)?$/, ''),
    desc: decode((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''),
    h1: decode(stripTags((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '')).trim(),
  };
  if (h !== orig) {
    report.changed++;
    // an asset cache-bust alone is not a content change: don't bump the sitemap lastmod for it
    const unver = s => s.replace(/(\/styles\.css|\/app\.js)\?v=[\w-]+/g, '$1');
    if (unver(h) !== unver(orig)) changedUrls.add(url);
    if (!DRY) fs.writeFileSync(file, h);
  }
}

// static error pages (403/404/5xx.html) share the same assets
for (const name of fs.readdirSync(ROOT).filter(n => /^\d{3}\.html$/.test(n))) {
  const f = path.join(ROOT, name);
  const orig = fs.readFileSync(f, 'utf8');
  const h = orig.replace(/(<link rel="stylesheet" href="\/styles\.css)(?:\?v=[\w-]+)?(")/g, (m, a, b) => `${a}?v=${ASSET_VER.css}${b}`)
    .replace(/(<script src="\/app\.js)(?:\?v=[\w-]+)?(")/g, (m, a, b) => `${a}?v=${ASSET_VER.js}${b}`);
  if (h !== orig && !DRY) fs.writeFileSync(f, h);
}

// ---------------------------------------------------------------------------
// 7. Mirror new links into the JSON sources (fields the publisher renders as markdown)
// ---------------------------------------------------------------------------
function mirrorInto(record, links, fields) {
  let n = 0;
  const blob = () => JSON.stringify(record);
  for (const { anchor, url } of links) {
    if (blob().includes(`](${url}`) || blob().includes(`](${url.replace(/\/$/, '')})`)) continue;
    const re = new RegExp(`(?<![\\w\\[-])${esc(anchor)}(?![\\w\\]-])`);
    const tryStr = s => {
      if (typeof s !== 'string' || !re.test(s)) return null;
      // skip if anchor sits inside an existing markdown link
      const idx = s.search(re);
      const before = s.slice(0, idx);
      if ((before.match(/\[/g) || []).length > (before.match(/\]/g) || []).length) return null;
      return s.replace(re, () => `[${anchor}](${url})`);
    };
    let done = false;
    for (const f of fields) {
      if (done) break;
      if (f === 'content' && Array.isArray(record.content)) {
        for (const blk of record.content) {
          if (blk.type !== 'paragraph') continue;
          const r = tryStr(blk.text);
          if (r) { blk.text = r; done = true; n++; break; }
        }
      } else {
        const r = tryStr(record[f]);
        if (r) { record[f] = r; done = true; n++; }
      }
    }
  }
  return n;
}
function fixJsonLinks(obj) {
  // repair markdown links to missing pages inside JSON text
  const s = JSON.stringify(obj).replace(/\]\((\/[^)\s"]*)\)/g, (m, href) => {
    const n = resolveHref(href);
    return n ? `](${n})` : m;
  });
  return JSON.parse(s);
}
let mirrored = 0;
const SRC_DIR = path.join(ROOT, 'src', 'data', 'articles');
for (const a of DATA.articles) {
  const links = linkLog[`/learn/${a.slug}/`];
  if (links) mirrored += mirrorInto(a, links, ['content']);
  const srcFile = path.join(SRC_DIR, `${a.slug}.json`);
  if (fs.existsSync(srcFile) && links) {
    const raw = fs.readFileSync(srcFile, 'utf8');
    const src = fixJsonLinks(JSON.parse(raw));
    mirrorInto(src, links, ['content']);
    const next = JSON.stringify(src, null, 2) + (raw.endsWith('\n') ? '\n' : '');
    if (next !== raw && !DRY) fs.writeFileSync(srcFile, next);
  }
}
for (const g of DATA.glossary) { const l = linkLog[`/glossary/${g.slug}/`]; if (l) mirrored += mirrorInto(g, l, ['scoutExplanation', 'whyItMatters']); }
for (const c of DATA.comparisons) { const l = linkLog[`/compare/${c.slug}/`]; if (l) mirrored += mirrorInto(c, l, ['decisionSummary']); }
for (const s of DATA.scenarios) { const l = linkLog[`/scenarios/${s.slug}/`]; if (l) mirrored += mirrorInto(s, l, ['scoutTake']); }
if (!DRY) {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const fixed = fixJsonLinks(DATA);
  const eol = raw.includes('\r\n') ? '\r\n' : '\n'; // the publisher writes CRLF; keep diffs minimal
  const next = JSON.stringify(fixed, null, 2).replace(/\n/g, eol) + (raw.endsWith('\n') ? eol : '');
  if (next !== raw) fs.writeFileSync(DATA_PATH, next);
}

// ---------------------------------------------------------------------------
// 8. sitemap.xml — add missing pages, refresh lastmod on changed pages
// ---------------------------------------------------------------------------
{
  const smPath = path.join(ROOT, 'sitemap.xml');
  let sm = fs.readFileSync(smPath, 'utf8');
  let added = 0, bumped = 0;
  for (const u of changedUrls) {
    const re = new RegExp(`(<loc>${esc(SITE + u)}</loc>\\s*<lastmod>)[^<]+(</lastmod>)`);
    if (re.test(sm)) { sm = sm.replace(re, `$1${TODAY}$2`); bumped++; }
  }
  const have = new Set([...sm.matchAll(/<loc>https:\/\/insurancebhaiya\.com([^<]*)<\/loc>/g)].map(m => m[1]));
  const pri = { learn: '0.8', qa: '0.7', compare: '0.8', scenarios: '0.6', glossary: '0.6', insurance: '0.7' };
  let extra = '';
  for (const p of PAGES) {
    const parts = p.url.split('/');
    if (parts.length !== 4 || !pri[p.section] || have.has(p.url)) continue;
    extra += `  <url>\n    <loc>${SITE}${p.url}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${pri[p.section]}</priority>\n  </url>\n`;
    added++;
  }
  sm = sm.replace('</urlset>', extra + '</urlset>');
  if (!DRY) fs.writeFileSync(smPath, sm);
  report.sitemap = { added, bumped };
}

// ---------------------------------------------------------------------------
// 9. llms.txt — full content map for generative engines (GEO)
// ---------------------------------------------------------------------------
{
  const llmsPath = path.join(ROOT, 'llms.txt');
  const head = fs.readFileSync(llmsPath, 'utf8').split('\n## Content Index')[0].trimEnd();
  const sections = [
    ['learn', 'Guides (Learn)'], ['compare', 'Side-by-Side Comparisons'], ['qa', 'Questions & Answers'],
    ['scenarios', 'Real-World Case Studies (Scenarios)'], ['glossary', 'Glossary of Insurance Terms'], ['insurance', 'Insurance Category Hubs'],
  ];
  let body = `\n\n## Content Index\nEvery published page, grouped by type. Each line: title, canonical URL, one-sentence summary.\n`;
  for (const [sec, label] of sections) {
    const list = PAGES.filter(p => p.section === sec && p.url.split('/').length === 4).sort((a, b) => a.url.localeCompare(b.url));
    body += `\n### ${label}\n`;
    for (const p of list) {
      const m = pageMeta[p.url] || {};
      const name = (sec === 'qa' || sec === 'glossary' || sec === 'scenarios' ? m.h1 : m.title) || p.url;
      body += `- [${name}](${SITE}${p.url}): ${smartTrim(m.desc || '', 150)}\n`;
    }
  }
  if (!DRY) fs.writeFileSync(llmsPath, head + body);
}

console.log(JSON.stringify({ ...report, mirroredIntoJson: mirrored, qaCount: QA_COUNT }, null, 2));
if (process.argv.includes('--log')) console.log(JSON.stringify(linkLog, null, 1));
