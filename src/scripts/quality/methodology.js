// "How this calculator works" — the real formula, assumptions and sources beneath every calculator, written
// from the code in app.js (initCalculators & co). seo-optimize rewrites the block on each run, so EDIT IT HERE,
// and update it whenever a calculation in app.js changes. Constants without a source are labelled as our own.
// Also corrects tool descriptions that described a different calculator from the one on the page.

const SRC = {
  hcDed: ['HealthCare.gov: Deductible', 'https://www.healthcare.gov/glossary/deductible/'],
  hcCopay: ['HealthCare.gov: Copayment', 'https://www.healthcare.gov/glossary/co-payment/'],
  hcCoins: ['HealthCare.gov: Coinsurance', 'https://www.healthcare.gov/glossary/co-insurance/'],
  hcOop: ['HealthCare.gov: Out-of-pocket maximum', 'https://www.healthcare.gov/glossary/out-of-pocket-maximum-limit/'],
  iiiHome: ['Insurance Information Institute: How much homeowners insurance do I need?', 'https://www.iii.org/article/how-much-homeowners-insurance-do-i-need'],
  iiiRenters: ['Insurance Information Institute: Renters insurance', 'https://www.iii.org/article/renters-insurance'],
  iiiAuto: ['Insurance Information Institute: How much auto coverage do I need?', 'https://www.iii.org/article/how-much-auto-coverage-do-i-need'],
  iiiLife: ['Insurance Information Institute: How much life insurance do I need?', 'https://www.iii.org/article/how-much-life-insurance-do-i-need'],
  iiiDed: ['Insurance Information Institute: Understanding your insurance deductibles', 'https://www.iii.org/article/understanding-your-insurance-deductibles'],
  iiiGap: ['Insurance Information Institute: What is gap insurance?', 'https://www.iii.org/article/what-is-gap-insurance'],
  iiiUm: ['Insurance Information Institute: Facts + Statistics: Uninsured motorists', 'https://www.iii.org/fact-statistic/facts-statistics-uninsured-motorists'],
  blsCpi: ['U.S. Bureau of Labor Statistics: Consumer Price Index', 'https://www.bls.gov/cpi/'],
  blsPpi: ['U.S. Bureau of Labor Statistics: Producer Price Indexes (incl. construction inputs)', 'https://www.bls.gov/ppi/'],
  irs525: ['IRS Publication 525: Taxable and Nontaxable Income (sickness and injury benefits)', 'https://www.irs.gov/publications/p525'],
};

const GAP_CHECKER = {
  intro: 'Compares the limit and deductible you enter with simple benchmarks and lists the items worth reviewing. It does not read your policy.',
  rules: true,
  steps: [
    'Auto: bodily injury liability under $250,000 per occurrence is flagged; a deductible above $1,500 is flagged; uninsured/underinsured motorist limits are always listed to check against your liability limits.',
    'Home: a dwelling limit under $300,000 is flagged; water backup cover and extended replacement cost are always listed to check.',
    'Renters, health and life: your limit and deductible are shown for reference, without a benchmark.',
  ],
  assumptions: [
    'The $250,000, $1,500 and $300,000 benchmarks are our assumptions. The right dwelling limit is your home&rsquo;s rebuild cost, which can be far above or below $300,000; the <a href="/home-replacement-cost-estimator/" class="article-link">Home Replacement Cost Estimator</a> gives a better figure.',
    'The endorsements, riders and household risks you select are not yet part of the result.',
  ],
  sources: ['iiiAuto', 'iiiHome', 'iiiUm'],
};

const METHODS = {
  '/life-insurance-calculator/': {
    intro: 'A rule-of-thumb estimate of how much life cover would replace your income and clear your family&rsquo;s debts, worked out from the four inputs above.',
    steps: [
      'Income replacement = annual income &times; 10',
      'Dependent reserve = number of dependents &times; $75,000',
      'Gross need = income replacement + dependent reserve + total debts (including the mortgage)',
      'Coverage estimate = gross need &minus; liquid savings and investments, never below $100,000',
      'Monthly premium indication = coverage estimate &divide; 1,000 &times; $0.048',
    ],
    assumptions: [
      '&ldquo;10 times income&rdquo; is a common rule of thumb, not a full needs analysis. The III article below walks through other methods that give different answers.',
      '$75,000 per dependent for childcare and education is our assumption.',
      'The premium indication ($0.048 per $1,000 a month) is our rough figure for a healthy non-smoker buying 20-year level term. Real prices depend on age, health and insurer.',
      'Not included: inflation, investment returns on the payout, Social Security survivor benefits and any group life cover through work.',
    ],
    sources: ['iiiLife'],
  },
  '/term-insurance-calculator/': {
    intro: 'A rough monthly premium for level term life insurance from your age, term length, coverage amount and health class.',
    steps: [
      'Base rate per $1,000 of cover per month = $0.024 &times; 1.055<sup>(age &minus; 20)</sup>',
      'Term-length factor: 10 years &times; 1.00, 20 years &times; 1.15, 30 years &times; 1.45',
      'Health-class factor: Preferred Plus &times; 0.85, Preferred &times; 1.00, Standard &times; 1.35, Smoker / moderate risk &times; 2.10',
      'Monthly premium = coverage &divide; 1,000 &times; base rate &times; term factor &times; health factor, with a $14 minimum',
      'Annual premium = monthly &times; 12; cost over the whole term = annual &times; number of years',
    ],
    assumptions: [
      'Every factor above is our assumption. The 5.5%-a-year rise with age is a smoothed curve meant to resemble how published term prices climb; it is not built from a mortality table or any insurer&rsquo;s rates.',
      'Real prices also depend on sex, state, medical and family history, hobbies and each insurer&rsquo;s underwriting, none of which this tool asks about.',
      'Use the result to sanity-check quotes, not to replace them.',
    ],
    sources: ['iiiLife'],
  },
  '/health-insurance-calculator/': {
    intro: 'Splits one covered bill between you and your insurer, step by step, the way cost-sharing usually works.',
    steps: [
      'Remaining deductible = deductible &minus; amount already paid (not below $0)',
      'You pay first: the smaller of the bill and the remaining deductible',
      'Copay (health plans only): the smaller of the copay and what is left of the bill',
      'Coinsurance: the rest of the bill is split by your coinsurance percentage (you) and the remainder (insurer)',
      'Health plans: your total is capped at the out-of-pocket maximum minus what you have already paid; the insurer pays everything above that',
      'Auto medical (PIP / MedPay) and property: the insurer&rsquo;s share is capped at the policy limit, and anything above it is yours',
    ],
    assumptions: [
      'Assumes the whole bill is covered, in-network and allowed in full. Out-of-network charges, balance billing and excluded services are not modelled.',
      'Applies one copay per bill. Real plans may charge a copay per visit or service, and some services skip the deductible.',
      'Only what you have paid toward the deductible counts toward the out-of-pocket maximum here.',
    ],
    sources: ['hcDed', 'hcCopay', 'hcCoins', 'hcOop'],
  },
  '/car-insurance-calculator/': {
    intro: 'A rule-based checklist, not a price quote. Your answers decide which coverages are flagged as required, advised or optional.',
    rules: true,
    steps: [
      'Collision and comprehensive are marked required when the car is financed or leased, because lenders require them.',
      'Collision is marked optional when an older car is worth under $4,000; comprehensive is marked optional under $3,000.',
      'The liability suggestion grows with your assets: modest assets &rarr; 50/100/50 or 100/300/100; $250,000&ndash;$1 million &rarr; 100/300/100 or 250/500/100; over $1 million &rarr; 250/500/100 plus a $1&ndash;3 million umbrella policy.',
      'Uninsured/underinsured motorist cover is flagged as critical above 12,000 miles a year.',
      'Personal injury protection (PIP) is marked mandatory when you choose a no-fault state.',
      'Gap insurance is flagged for financed or leased cars that are new or a few years old.',
    ],
    assumptions: [
      'The $3,000 and $4,000 value thresholds and the asset bands are our assumptions, not legal or insurer rules.',
      'State minimum limits and no-fault rules change; check your state insurance department for current requirements.',
      'In 2023, 15.4% of U.S. motorists (more than one in seven) were uninsured, according to Insurance Research Council figures reported by III.',
    ],
    sources: ['iiiAuto', 'iiiUm', 'iiiGap'],
  },
  '/car-insurance-deductible-calculator/': {
    intro: 'Compares collision and comprehensive deductible options side by side for one year, with and without a claim.',
    steps: [
      'Physical-damage share = 50% of your current annual premium; the other 50% (liability and the rest) does not change',
      'Price factors relative to a $500 deductible: $250 &times; 1.14, $500 &times; 1.00, $1,000 &times; 0.86, $1,500 &times; 0.78, $2,000 &times; 0.73, $2,500 &times; 0.69',
      'Premium at each deductible = fixed half + physical-damage half &times; (its factor &divide; the factor for your current deductible)',
      'Claim out-of-pocket = the smaller of the claim and the deductible; one-year outlay = premium + claim out-of-pocket',
      'Breakeven = extra deductible &divide; annual premium saving, in claim-free years',
      'A warning appears when the deductible is 40% or more of the car&rsquo;s value',
    ],
    assumptions: [
      'The 50% split and every price factor are our assumptions about typical pricing; real discounts vary by insurer and state. Ask your insurer to quote each deductible.',
      'Assumes at most one claim a year, and that the claim is covered.',
    ],
    sources: ['iiiDed'],
  },
  '/deductible-calculator/': {
    intro: 'Compares two deductible choices for auto, home, health or business property insurance over a year with or without a claim.',
    steps: [
      'Estimated premium saving (unless you enter your own) = base premium &times; discount, where discount = log<sub>2</sub>(higher deductible &divide; lower deductible) &times; type factor, kept between 4% and 35%',
      'Type factors: auto 0.14, home 0.12, health 0.18, business property 0.11',
      'Higher-deductible premium = base premium &minus; saving (not below $100)',
      'Risk gap = higher deductible &minus; lower deductible; breakeven = risk gap &divide; annual saving, in claim-free years',
      'Total yearly outlay = premium + the smaller of the claim and the deductible',
    ],
    assumptions: [
      'The type factors and the 4&ndash;35% range are our assumptions. Entering the saving from a real quote gives a much better answer.',
      'Assumes at most one claim, and that the claim is covered.',
    ],
    sources: ['iiiDed', 'hcDed'],
  },
  '/home-insurance-calculator/': {
    intro: 'Suggests a limit for each part of a standard homeowners policy, starting from the cost to rebuild your home.',
    steps: [
      'Rebuild cost per sq ft = build-quality rate (standard $160, upgraded $210, custom $290, luxury $380) &times; area factor (suburban 1.00, urban 1.20, wildfire zone 1.40, coastal 1.45) &times; home-type factor (single-family 1.00, townhouse 0.92, condo 0.50, multi-family 1.15)',
      'Dwelling (Coverage A) = square feet &times; rebuild cost per sq ft',
      'Other structures (B) = 10% of A + outbuildings you select (garage $35,000, pool $40,000, shed $12,000, guest house $80,000)',
      'Personal property (C) = the higher of your belongings estimate and 50% of A, plus scheduled valuables (jewelry $10,000, art $15,000, firearms $5,000, instruments $8,000)',
      'Loss of use (D) = 20% of A',
      'Liability (E) = the limit you choose; guest medical (F) is shown as $5,000',
    ],
    assumptions: [
      'The per-square-foot rates, factors and outbuilding and valuables amounts are our assumptions. Building costs vary widely by area; an insurer&rsquo;s replacement-cost estimate or a contractor&rsquo;s quote is more reliable.',
      'The 10%, 50% and 20% figures follow common policy defaults: III notes belongings are usually insured at about 50&ndash;70% of the dwelling limit and loss of use at about 20%.',
      'Market value and land value are not rebuild cost and are not used.',
    ],
    sources: ['iiiHome'],
  },
  '/home-replacement-cost-estimator/': {
    intro: 'Estimates a range for rebuilding your house from the foundation up.',
    steps: [
      'Base rate per sq ft by region: South $155, Midwest $160, Northeast $200, West $240, other / international $185',
      '&times; stories factor (one story 1.05, two stories 1.00, split-level 1.08, custom or complex 1.15)',
      '&times; foundation factor (slab 1.00, crawlspace 1.06, unfinished basement 1.12, finished basement 1.22)',
      '&times; finish-grade factor (economy 1.00, custom 1.30, luxury 1.75)',
      'Midpoint = square feet &times; adjusted rate + add-ons you select (gourmet kitchen $35,000, masonry $25,000, roof upgrade $20,000, deck $15,000)',
      'Range = 90% to 112% of the midpoint, rounded to $1,000. The cost breakdown splits the midpoint 38% shell and roof, 22% plumbing, electrical and HVAC, 28% finishes, 12% demolition and permits',
    ],
    assumptions: [
      'All rates, factors and add-on amounts are our assumptions, set as broad regional averages. They are not taken from a licensed construction-cost database.',
      'Rebuilding costs can jump after a regional disaster; III notes that extended replacement cost endorsements pay 5&ndash;25% above the dwelling limit for this reason.',
      'Get your insurer&rsquo;s replacement-cost valuation before changing your dwelling limit.',
    ],
    sources: ['iiiHome', 'blsPpi'],
  },
  '/inflation-calculator/': {
    intro: 'Shows how far rising building costs may have pushed today&rsquo;s rebuild cost above the dwelling limit you set years ago.',
    steps: [
      'Today&rsquo;s rebuild cost = original dwelling limit &times; (1 + annual inflation rate)<sup>years</sup>',
      'Shortfall = today&rsquo;s rebuild cost &minus; original limit',
      'Coverage deficit = shortfall &divide; today&rsquo;s rebuild cost',
    ],
    assumptions: [
      'You choose the inflation rate; the 4.5% a year default is our assumption. Construction costs can move very differently from general consumer prices, and from one region to another.',
      'Assumes your original limit matched the full rebuild cost when it was set, and that the policy has no automatic inflation-guard increase.',
    ],
    sources: ['blsPpi', 'blsCpi', 'iiiHome'],
  },
  '/insurance-needs-calculator/': {
    intro: 'A rule-based checklist, not a dollar calculation. Your answers decide which of 10 insurance types are shown as priorities.',
    rules: true,
    steps: [
      'Health insurance is always shown as essential.',
      'Life insurance is high priority if you have dependents or a mortgage.',
      'Auto is essential if you own a vehicle; homeowners if you own your home; renters if you rent.',
      'Disability income protection is high priority unless you are retired.',
      'Travel insurance is high priority for international travel and moderate for frequent travel.',
      'Business insurance is high priority if you run any business; pet insurance is shown as relevant if you have a pet.',
      'Umbrella liability is high priority if your net worth is $400,000 or more, or you own two or more vehicles.',
    ],
    assumptions: [
      'The $400,000 net-worth threshold is our assumption.',
      'Priorities are general. Employer benefits, state rules and your own finances can change what you actually need.',
    ],
    sources: ['iiiLife', 'iiiHome', 'iiiAuto'],
  },
  '/coverage-gap-checker/': GAP_CHECKER,
  '/coverage-calculator/': GAP_CHECKER,
  '/premium-calculator/': {
    intro: 'Works out how long the lower premium of a higher-deductible policy takes to pay back the extra deductible you would owe after a claim.',
    steps: [
      'Monthly saving = current premium &minus; higher-deductible premium (at least $1)',
      'Annual saving = monthly saving &times; 12',
      'Breakeven = deductible increase &divide; monthly saving, in months',
      '24 months or less is labelled favourable; anything longer is labelled caution',
    ],
    assumptions: [
      'Uses your own two premiums, so the result is only as good as those quotes.',
      'The 24-month line is our rule of thumb. It assumes no claim during the breakeven period and enough savings to pay the higher deductible.',
    ],
    sources: ['iiiDed'],
  },
  '/renters-insurance-calculator/': {
    intro: 'Adds up what it would cost to replace your belongings and suggests a policy limit.',
    steps: [
      'Total = the sum of your nine category values',
      'Suggested limit = total rounded up to the next $5,000, with a $15,000 minimum',
      'Monthly premium indication = $12 + $2.50 per $10,000 of limit, shown as a $6 range',
      'Jewelry above $1,500 is flagged as likely to exceed the usual theft limit; electronics plus computers above $5,000 are flagged so you can check your policy&rsquo;s electronics limit',
    ],
    assumptions: [
      'The premium indication and the $5,000 electronics threshold are our assumptions. The $1,500 jewelry limit is typical according to III, but your policy may differ.',
      'Enter replacement cost (what it would cost to buy new), not what you paid or the resale value.',
    ],
    sources: ['iiiRenters'],
  },
  '/disability-insurance-calculator/': {
    intro: 'Compares your essential monthly expenses with what you would receive if illness or injury stopped your pay.',
    steps: [
      'Standard group long-term disability: 60% of gross monthly pay, capped at $5,000 a month',
      'Generous group plan: 66% of gross monthly pay, capped at $10,000 a month',
      'Taxable group benefits &times; 0.75 = estimated take-home benefit',
      'Protected income = take-home group benefit + other income + any individual disability policy',
      'Monthly gap = essential expenses &minus; protected income',
      'Savings runway = savings &divide; monthly gap, in months',
    ],
    assumptions: [
      'The 60% and 66% replacement rates, the caps and the 25% tax allowance are our assumptions about typical plans. Your plan summary gives the real percentage, cap, waiting period and definition of disability.',
      'Benefits from an employer-paid plan are generally taxable; IRS Publication 525 explains when disability pay is taxable.',
      'Social Security disability benefits and short-term disability are not included.',
    ],
    sources: ['irs525'],
  },
};

const H4 = 'style="font-size: 1rem; font-weight: 600; color: var(--color-text); margin: 20px 0 8px;"';
const LIST = 'style="color: var(--color-secondary); line-height: 1.65; padding-left: 20px; margin: 0 0 12px;"';
const items = (list, ind) => list.map(x => `${ind}<li>${x}</li>`).join('\n');

function methodBlock(m) {
  const ind = '      ';
  const srcs = m.sources.map(k => `<a href="${SRC[k][1]}" class="article-link" rel="noopener" target="_blank">${SRC[k][0]}</a>`);
  return `<!-- Mathematical Assumptions & Formula -->
    <div class="tool-method" style="margin: 36px 0;">
      <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px;">How This Calculator Works</h3>
      <p style="color: var(--color-secondary); line-height: 1.65; margin-bottom: 8px;">${m.intro}</p>
      <h4 ${H4}>${m.rules ? 'The rules' : 'The formula'}</h4>
      <ol ${LIST}>
${items(m.steps, ind + '  ')}
      </ol>
      <h4 ${H4}>Assumptions and limits</h4>
      <ul ${LIST}>
${items(m.assumptions, ind + '  ')}
      </ul>
      <h4 ${H4}>Sources</h4>
      <ul ${LIST}>
${items(srcs, ind + '  ')}
      </ul>
      <p style="color: var(--color-secondary); font-size: 0.875rem; line-height: 1.6; margin: 12px 0 0;">Figures marked as our assumption are simplifications chosen by the Insurance Bhaiya Editorial Team, not market data. Results are rough estimates, not quotes or advice; check them against real quotes or a licensed professional.</p>
      <div class="callout callout-info" style="margin: 20px 0;">
        <strong>Zero Sales Pressure Guarantee:</strong> Insurance Bhaiya will never ask for your email or phone number to unlock calculation results. All mathematical models operate locally in your browser.
      </div>
    </div>
`;
}

// tool descriptions (cards, hub JSON, meta) that described a different calculator: [old, new]
const DESC_FIXES = [
  ['Actuarial baseline model factoring age-band mortality curves, term lengths (10, 20, 30 yrs), and lifestyle health classifications.',
    'Rough monthly premium: $0.024 per $1,000 of cover at age 20, rising 5.5% per year of age, adjusted for term length and health class.'],
  ['Models High-Deductible Health Plans (HDHP) vs. Low-Deductible PPOs across low, medium, and catastrophic care consumption scenarios.',
    'Splits a covered bill into deductible, copay, coinsurance and insurer share, capped by your out-of-pocket maximum or policy limit.'],
  ['Blends state risk averages with collision, comprehensive, and comprehensive liability tiers.',
    'Rule-based checklist: loan status, car value, assets, mileage and state fault rules decide which coverages are flagged.'],
  ['Models physical damage rate elasticities across deductible tiers and calculates your net out-of-pocket outlay and claim-free breakeven horizon.',
    'Assumes collision and comprehensive are half your premium and applies typical discounts per deductible tier to find claim-free breakeven years.'],
  ['Separates Dwelling, Other Structures (10%), Personal Property (60%), Loss of Use (20%), and Personal Liability ($300k-$500k).',
    'Dwelling = square feet × local rebuild cost; other structures 10%, belongings at least 50% and loss of use 20% of the dwelling limit.'],
  ['Calculates modal installment surcharges (typically 3-8% annual penalty) when paying monthly rather than annually.',
    'Breakeven months = deductible increase ÷ monthly premium saving.'],
  ['Calculate annual vs. semi-annual vs. monthly payment savings, installment fees, and payment cash flow impacts.',
    'See how many claim-free months the lower premium of a higher deductible takes to pay back the extra deductible.'],
  ['Discover how much money you save by switching insurance payments from monthly installments to annual billing.',
    'See how many claim-free months the lower premium of a higher deductible takes to pay back the extra deductible.'],
  ['Balances aggregate personal net worth against current underlying auto and homeowners liability thresholds.',
    'Checks your limit and deductible against simple benchmarks, such as $250,000 auto bodily injury liability, and lists items to review.'],
  ['Assess total asset vulnerability against liability limits to determine whether an umbrella policy is warranted.',
    'Check your policy limit and deductible against simple benchmarks and see which items are worth reviewing.'],
  ['Audit your personal liability limits against your net worth to prevent catastrophic litigation vulnerability.',
    'Check your policy limit and deductible against simple benchmarks and see which items are worth reviewing.'],
  ['D.I.M.E. = Current Non-Mortgage Debt + (Income x Years) + Mortgage Balance + Projected Higher Education Costs.',
    'Rule-based radar: household, housing, vehicles, work and assets decide which of 10 coverage types are flagged as priorities.'],
  ['Comprehensive whole-life risk and coverage radar mapping 9 core insurance sectors to your life situation.',
    'Coverage radar mapping 10 insurance types to your household, home, vehicles, work and assets.'],
  ['Breakeven Months = (High Deductible - Low Deductible) / (High Premium - Low Premium).',
    'Breakeven years = deductible increase ÷ annual premium saving.'],
  ['Future Real Value = Nominal Benefit / (1 + r)^t across custom compound inflation rate assumptions.',
    'Current rebuild cost = original dwelling limit × (1 + annual construction inflation) ^ years.'],
  ['Model the erosive impact of inflation on fixed death benefits and healthcare costs over 10, 20, and 30 years.',
    'Estimate how far construction inflation has pushed the current rebuild cost above your original dwelling limit.'],
  ['Visualize how inflation impacts the purchasing power of your insurance policy over decades.',
    'Estimate how far construction inflation has pushed the current rebuild cost above your original dwelling limit.'],
  ['Combines 10-year income replacement with outstanding debt, mortgage, and higher-education reserves minus existing liquid assets.',
    '10 × income + $75,000 per dependent + debts − liquid assets, with a $100,000 minimum.'],
  ['health HDHP vs PPO', 'health out-of-pocket costs'],
];

const BLOCK_RE = /<!-- Mathematical Assumptions & Formula -->[\s\S]*?(?=[ \t]*<!-- Tool Search-Intent FAQs -->)/;

function applyMethodology(h, url) {
  for (const [from, to] of DESC_FIXES) h = h.split(from).join(to);
  const m = METHODS[url.replace(/^\/tools\//, '/')]; // legacy /tools/<calc>/ copies share the root calculator's code
  const eol = h.includes('\r\n') ? '\r\n' : '\n';
  if (m && BLOCK_RE.test(h)) h = h.replace(BLOCK_RE, () => (methodBlock(m) + '\n').replace(/\n/g, eol));
  return h;
}

module.exports = { applyMethodology, DESC_FIXES, METHODS };
