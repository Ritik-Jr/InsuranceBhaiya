/**
 * Insurance Bhaiya - Main Vanilla JavaScript Controller
 * Handles 10 reactive actuarial calculators, live regex search modal,
 * progressive article pagination & category filtering, 8-point policy audit, and navigation.
 */

// HTML Escaping Utility (Guarantees zero ReferenceErrors during search)
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Built-in Zero-Latency Local Fallback Index
const FALLBACK_INDEX = {
  "articles": [
    {
      "title": "How to Know If You Are Underinsured: 5 Dangerous Warning Signs",
      "slug": "how-to-know-if-you-are-underinsured",
      "description": "Identify the 5 tell-tale diagnostic red flags of underinsurance: building cost inflation gaps, state minimum auto traps, inadequate income replacement, and liability exposure.",
      "category": "insurance-basics"
    },
    {
      "title": "What Happens When Insurance Expires? Renewals, Terms, and Next Steps",
      "slug": "what-happens-when-insurance-expires",
      "description": "Learn what happens when term life, auto, and home insurance policies reach their expiration dates: automatic renewals, non-renewal notices, conversion privileges, and gap management.",
      "category": "insurance-basics"
    },
    {
      "title": "Agent vs. Broker vs. Insurer: Who Works for Whom?",
      "slug": "agent-vs-broker-vs-insurer",
      "description": "Demystify the insurance distribution chain: Captive Agents vs Independent Agents vs Insurance Brokers vs Insurers. Learn who owes a fiduciary duty to you.",
      "category": "insurance-basics"
    },
    {
      "title": "Coverage vs. Limits: Scope vs. Ceiling in Insurance Contracts",
      "slug": "coverage-vs-limits",
      "description": "Learn the distinction between insurance coverage (the scope of protected perils) and coverage limits (the dollar ceiling an insurer will pay).",
      "category": "insurance-basics"
    },
    {
      "title": "Deductible vs. Premium: How to Balance the Mathematical Tradeoff",
      "slug": "deductible-vs-premium",
      "description": "Master the inverse relationship between deductibles and premiums. Learn how to calculate the breakeven point and choose between high-deductible and low-deductible plans.",
      "category": "insurance-basics"
    },
    {
      "title": "How Often Should You Review Your Insurance? The Annual and Milestone Rule",
      "slug": "how-often-should-you-review-insurance",
      "description": "Discover when and how often to review your insurance coverage: the annual policy audit rhythm and the 7 life milestone triggers that demand immediate policy updates.",
      "category": "insurance-basics"
    },
    {
      "title": "How to Compare Insurance Policies: The Apples-to-Apples Method",
      "slug": "how-to-compare-insurance-policies",
      "description": "Learn how to compare insurance quotes and policies accurately: standardizing deductibles, matching liability limits, checking carrier ratings, and spotting hidden gaps.",
      "category": "insurance-basics"
    },
    {
      "title": "How to Read an Insurance Policy: The 6-Step Practical Guide",
      "slug": "how-to-read-an-insurance-policy",
      "description": "A step-by-step roadmap to deciphering policy legalese. Learn how to dissect the Declarations Page, read exclusions, identify conditions, and spot coverage traps.",
      "category": "insurance-basics"
    },
    {
      "title": "Named Insured vs. Additional Insured: Rights, Liabilities, and Differences",
      "slug": "named-insured-vs-additional-insured",
      "description": "Understand the legal distinction between Named Insureds (policy owners) and Additional Insureds (third parties granted liability defense), with real-world business and landlord examples.",
      "category": "insurance-basics"
    },
    {
      "title": "Quote vs. Premium vs. Deductible: Clearing the Confusion Once and for All",
      "slug": "quote-vs-premium-vs-deductible",
      "description": "Eliminate the confusion between quotes, premiums, and deductibles with an easy-to-understand side-by-side comparison, real-life examples, and decision guidelines.",
      "category": "insurance-basics"
    },
    {
      "title": "Term Insurance in India: 1 Crore Cover, IRDAI Guidelines & Claim Settlement Ratios",
      "slug": "term-insurance-india-guide",
      "description": "An exhaustive, actuarial guide to choosing a term insurance plan in India. Learn how Section 45 protects you, why Claim Settlement Ratio (CSR) alone is misleading, and how much coverage you actually need.",
      "category": "term-insurance"
    },
    {
      "title": "What Happens If You Stop Paying Insurance? Grace Periods and Lapses",
      "slug": "what-happens-if-you-stop-paying-insurance",
      "description": "Understand the consequences of missing insurance premium payments: 30-day grace periods, coverage lapses, DMV registration suspensions, and lender-placed insurance.",
      "category": "insurance-basics"
    },
    {
      "title": "Travel Insurance Decoded: Medical Evacuation, Trip Delays, and CFAR",
      "slug": "travel-insurance-guide",
      "description": "Why domestic healthcare stops at national borders, when emergency medical evacuation riders are mandatory, and how Cancel For Any Reason (CFAR) clauses function.",
      "category": "travel-insurance"
    },
    {
      "title": "What Is an Exclusion in Insurance? The Fine Print That Denies Claims",
      "slug": "what-is-an-exclusion-in-insurance",
      "description": "Learn what policy exclusions are, why carriers exclude specific perils like flood and wear-and-tear, how exclusions interact with endorsements, and how to spot them.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Insurance Claim? Step-by-Step Claims Process and Payouts",
      "slug": "what-is-an-insurance-claim",
      "description": "Understand the insurance claims process from start to finish: First Notice of Loss (FNOL), adjuster investigations, repair estimates, deductible subtractions, and payouts.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Insurance Endorsement? Customizing Your Base Policy",
      "slug": "what-is-an-insurance-endorsement",
      "description": "Discover what an insurance endorsement is: a written amendment that adds, deletes, or modifies coverage on property and casualty policies, with top examples.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Insurance Quote? How It Differs From a Final Policy",
      "slug": "what-is-an-insurance-quote",
      "description": "Learn what an insurance quote is: an initial price estimate based on self-reported data, how soft checks turn into binding contracts, and why quotes can change before issuance.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Insurance Rider? The Top Life and Health Policy Add-Ons",
      "slug": "what-is-an-insurance-rider",
      "description": "Learn what an insurance rider is in life and health contracts, comparing the top riders: accelerated death benefit, waiver of premium, guaranteed insurability, and long-term care.",
      "category": "life-insurance"
    },
    {
      "title": "What Is Insurance Underwriting? How Insurers Assess Risk and Price Policies",
      "slug": "what-is-insurance-underwriting",
      "description": "Explore the actuarial underwriting process: risk assessment, medical exams, motor vehicle records, credit-based insurance scores, and underwriting risk tiers.",
      "category": "insurance-basics"
    },
    {
      "title": "US Health Insurance Masterclass: HDHPs, HSAs, Copays, and Out-of-Pocket Maximums",
      "slug": "us-health-insurance-guide",
      "description": "Demystifying the United States healthcare financial maze. Compare High-Deductible Health Plans (HDHP) with PPOs, understand the triple-tax advantage of HSAs, and learn how to optimize open enrollment.",
      "category": "health-insurance"
    },
    {
      "title": "What Is a Coverage Limit? Per-Occurrence, Aggregate, and Sub-Limits",
      "slug": "what-is-a-coverage-limit",
      "description": "Understand insurance coverage limits: the maximum dollar amount an insurer will disburse, per-occurrence vs aggregate caps, split limits in auto, and internal sub-limits.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is a Deductible in Insurance? How It Works and How to Choose",
      "slug": "what-is-a-deductible",
      "description": "Learn what a deductible is, how per-incident vs calendar-year deductibles work, percentage hurricane deductibles, and how to find your optimal breakeven point.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Excess in Insurance? UK and Commonwealth Rules Explained",
      "slug": "what-is-an-excess",
      "description": "Learn what an excess is in UK, Australian, and Commonwealth insurance policies: compulsory vs voluntary excess, how voluntary excess lowers premiums, and recovery from third parties.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Insurance Premium? How It's Calculated and Billed",
      "slug": "what-is-an-insurance-premium",
      "description": "A complete guide to insurance premiums: how actuaries calculate your rate, payment frequencies, grace periods, fees, and the top factors driving premium increases.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is a Policyholder? Owner Rights, Legal Duties, and Privileges",
      "slug": "what-is-a-policyholder",
      "description": "Understand the legal definition of a policyholder: ownership authority, the power to name beneficiaries, assign coverage, and the crucial distinction between owner and insured.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Insurance Policy? The 5 Essential Sections Explained",
      "slug": "what-is-an-insurance-policy",
      "description": "Learn what an insurance policy is, its legal structure as a contract of adhesion, and the 5 critical sections you must read: Declarations, Insuring Agreement, Exclusions, Conditions, and Endorsements.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Insured Person? Primary, Additional, and Permissive Coverage",
      "slug": "what-is-an-insured-person",
      "description": "Learn who qualifies as an insured person under auto, home, and health policies: primary named insureds, resident family members, and permissive drivers.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is an Insurer? Carriers, Solvency, and Financial Strength Ratings",
      "slug": "what-is-an-insurer",
      "description": "Discover what an insurance company (carrier) is, how stock vs mutual insurers differ, how carriers maintain capital reserves, and why AM Best financial ratings matter.",
      "category": "insurance-basics"
    },
    {
      "title": "How Does Insurance Work? The Mathematics of Risk Pooling and Claims",
      "slug": "how-does-insurance-work",
      "description": "Understand the financial and mathematical engine powering modern insurance: actuarial risk pooling, loss reserves, underwriter loss ratios, and the claims pipeline.",
      "category": "insurance-basics"
    },
    {
      "title": "Insurance Explained for Beginners: The Zero-Jargon Master Guide",
      "slug": "insurance-for-beginners",
      "description": "New to insurance? Learn how insurance works in plain English. Master the 5 essential numbers: premium, deductible, copay, out-of-pocket maximum, and coverage limits.",
      "category": "insurance-basics"
    },
    {
      "title": "What Are the Different Types of Insurance? A Complete Landscape Map",
      "slug": "types-of-insurance",
      "description": "A comprehensive breakdown of all primary insurance sectors: personal lines (life, health, auto, home, disability) versus commercial lines, clarifying what each covers.",
      "category": "insurance-basics"
    },
    {
      "title": "Why Do People Need Insurance? 5 Realities That Protect Your Future",
      "slug": "why-do-people-need-insurance",
      "description": "Explore the 5 non-negotiable reasons individuals and families require insurance: bankruptcy shielding, statutory compliance, mortgage mandates, and intergenerational stability.",
      "category": "insurance-basics"
    },
    {
      "title": "What Is Insurance? Definition, How It Works, and Key Principles",
      "slug": "what-is-insurance",
      "description": "A complete guide to what insurance is, the legal contract of risk transfer, why society relies on risk pooling, and the core principles protecting your wealth.",
      "category": "insurance-basics"
    },
    {
      "title": "Term Insurance: The Definitive Guide to Pure Protection",
      "slug": "term-insurance-guide",
      "description": "Understand how term life insurance works, how coverage length is determined, and why it is the most cost-effective hedge against economic vulnerability.",
      "category": "term-insurance"
    },
    {
      "title": "What Is Life Insurance? Structure, Mechanics, and Modern Strategy",
      "slug": "what-is-life-insurance",
      "description": "A comprehensive primer on the fundamental mechanics of life insurance contracts, comparing pure risk policies against permanent cash-value structures.",
      "category": "life-insurance"
    },
    {
      "title": "Health Insurance Demystified: Deductibles, Copays, and Out-of-Pocket Limits",
      "slug": "health-insurance-basics",
      "description": "Navigate health plans with tactical clarity. Learn the mathematical relationship between premiums, deductibles, coinsurance, and maximum financial ceilings.",
      "category": "health-insurance"
    },
    {
      "title": "Car Insurance Architecture: Beyond State Minimums",
      "slug": "car-insurance-guide",
      "description": "Why minimum legal limits leave drivers catastrophically exposed, how collision and comprehensive differ, and how to calibrate your auto deductible.",
      "category": "car-insurance"
    },
    {
      "title": "Home Insurance Fundamentals: Replacement Cost vs. Market Value",
      "slug": "home-insurance-fundamentals",
      "description": "The crucial distinction between market valuation and true structural rebuild cost, plus essential riders for water backup, roof replacement, and liability.",
      "category": "home-insurance"
    },
    {
      "title": "Pet Insurance Explained: Veterinary Economics & Care Planning",
      "slug": "pet-insurance-explained",
      "description": "How veterinary medical inflation, hereditary condition exclusions, and reimbursement percentages impact whether pet insurance is mathematically prudent.",
      "category": "pet-insurance"
    },
    {
      "title": "Long-Term vs. Short-Term Disability: Income Protection Architecture",
      "slug": "long-term-vs-short-term-disability",
      "description": "Analyze the mathematical and legal distinctions between short-term and long-term disability insurance: elimination periods, benefit duration, and why long-term coverage shields against catastrophic career disruption.",
      "category": "disability-insurance"
    },
    {
      "title": "Own-Occupation vs. Any-Occupation Disability: The Crucial Clause",
      "slug": "own-occupation-disability-insurance",
      "description": "Understand the decisive legal clause governing disability claims: True Own-Occupation vs Modified Own-Occupation vs Any-Occupation definitions of total disability.",
      "category": "disability-insurance"
    },
    {
      "title": "Commercial General Liability (CGL): Third-Party Risk Management",
      "slug": "commercial-general-liability-guide",
      "description": "A master primer on Commercial General Liability insurance for business owners: bodily injury, property damage, personal and advertising injury, and duty to defend.",
      "category": "business-insurance"
    },
    {
      "title": "Business Owner's Policy (BOP): Bundling Property and Liability",
      "slug": "bop-business-owners-policy-explained",
      "description": "Learn how small-to-midsize businesses save up to 25% by packaging commercial property and general liability into a unified Business Owner's Policy (BOP).",
      "category": "business-insurance"
    },
    {
      "title": "Commercial Property Insurance: Shielding Facilities and Inventory",
      "slug": "commercial-property-insurance-guide",
      "description": "Examine how commercial property insurance values physical assets: Building Coverage, Business Personal Property, and Agreed Value vs Coinsurance penalties.",
      "category": "property-insurance"
    },
    {
      "title": "Inland Marine Insurance: Equipment and Goods in Transit",
      "slug": "inland-marine-insurance-explained",
      "description": "Demystifying the historical 'Inland Marine' category: how contractors, logistics firms, and creative agencies protect tools and high-value mobile equipment on the move.",
      "category": "property-insurance"
    }
  ],
  "calculators": [
    {
      "name": "Life Insurance Calculator",
      "slug": "life-insurance-calculator",
      "shortDescription": "Compute total capital required to settle liabilities and sustain your family's standard of living.",
      "category": "life-insurance"
    },
    {
      "name": "Term Insurance Calculator",
      "slug": "term-insurance-calculator",
      "shortDescription": "Forecast monthly and annual term premiums tailored to age, health tier, term duration, and coverage sum.",
      "category": "term-insurance"
    },
    {
      "name": "Health Insurance Calculator",
      "slug": "health-insurance-calculator",
      "shortDescription": "Evaluate total annual healthcare expenditure across premiums, deductibles, copays, and out-of-pocket maximums.",
      "category": "health-insurance"
    },
    {
      "name": "Car Insurance Calculator",
      "slug": "car-insurance-calculator",
      "shortDescription": "Simulate auto premium estimates based on vehicle replacement cost, driving mileage, liability limits, and collision deductibles.",
      "category": "car-insurance"
    },
    {
      "name": "Home Insurance Calculator",
      "slug": "home-insurance-calculator",
      "shortDescription": "Estimate structural rebuilding costs per square foot, personal property coverage, and premises liability.",
      "category": "home-insurance"
    },
    {
      "name": "Universal Premium Calculator",
      "slug": "premium-calculator",
      "shortDescription": "Calculate annual vs. semi-annual vs. monthly payment savings, installment fees, and payment cash flow impacts.",
      "category": "life-insurance"
    },
    {
      "name": "Coverage Ratio Calculator",
      "slug": "coverage-calculator",
      "shortDescription": "Assess total asset vulnerability against liability limits to determine whether an umbrella policy is warranted.",
      "category": "business-insurance"
    },
    {
      "name": "Insurance Needs (D.I.M.E.) Calculator",
      "slug": "insurance-needs-calculator",
      "shortDescription": "Execute the industry-standard D.I.M.E. formula (Debt, Income, Mortgage, Education) for methodical coverage precision.",
      "category": "term-insurance"
    },
    {
      "name": "Deductible Breakeven Calculator",
      "slug": "deductible-calculator",
      "shortDescription": "Determine how many claim-free years are required to justify a higher deductible for monthly premium savings.",
      "category": "car-insurance"
    },
    {
      "name": "Insurance Inflation Calculator",
      "slug": "inflation-calculator",
      "shortDescription": "Model the erosive impact of inflation on fixed death benefits and healthcare costs over 10, 20, and 30 years.",
      "category": "disability-insurance"
    }
  ],
  "categories": [
    {
      "name": "Life Insurance",
      "slug": "life-insurance",
      "shortDescription": "Financial security for your family and dependents in the event of unexpected loss."
    },
    {
      "name": "Health Insurance",
      "slug": "health-insurance",
      "shortDescription": "Coverage for preventative care, hospitalizations, surgeries, and prescriptions."
    },
    {
      "name": "Car Insurance",
      "slug": "car-insurance",
      "shortDescription": "Protection against vehicle collision damage, third-party liability, and theft."
    },
    {
      "name": "Home Insurance",
      "slug": "home-insurance",
      "shortDescription": "Shielding your dwelling, personal belongings, and personal liability."
    },
    {
      "name": "Travel Insurance",
      "slug": "travel-insurance",
      "shortDescription": "Coverage for trip cancellations, emergency medical abroad, and lost luggage."
    },
    {
      "name": "Term Insurance",
      "slug": "term-insurance",
      "shortDescription": "Pure risk life protection offering substantial coverage at affordable fixed rates."
    },
    {
      "name": "Business Insurance",
      "slug": "business-insurance",
      "shortDescription": "Commercial liability, business interruption, and professional indemnity."
    },
    {
      "name": "Property Insurance",
      "slug": "property-insurance",
      "shortDescription": "Specialized protection for commercial properties, rental units, and high-value real estate."
    },
    {
      "name": "Pet Insurance",
      "slug": "pet-insurance",
      "shortDescription": "Veterinary expense reimbursement for illnesses, accidents, and surgeries."
    },
    {
      "name": "Disability Insurance",
      "slug": "disability-insurance",
      "shortDescription": "Income replacement if illness or injury leaves you unable to practice your profession."
    }
  ],
  "glossary": [
    {
      "term": "Deductible",
      "slug": "deductible",
      "simpleDefinition": "The amount you agree to pay toward a covered loss or claim before the insurance company pays its share."
    },
    {
      "term": "Premium",
      "slug": "premium",
      "simpleDefinition": "The recurring payment (monthly, quarterly, or annually) you make to an insurance company to keep your policy active."
    },
    {
      "term": "Coinsurance",
      "slug": "coinsurance",
      "simpleDefinition": "The percentage of covered medical expenses you share with your insurer after reaching your deductible."
    },
    {
      "term": "Out-of-Pocket Maximum",
      "slug": "out-of-pocket-maximum",
      "simpleDefinition": "The legal upper limit on what you must spend on covered in-network medical care in a single policy year."
    },
    {
      "term": "Exclusion",
      "slug": "exclusion",
      "simpleDefinition": "Specific perils, conditions, or circumstances stated in your policy contract that will NOT be covered."
    },
    {
      "term": "Beneficiary",
      "slug": "beneficiary",
      "simpleDefinition": "The designated individual, trust, or entity entitled to receive the death benefit payout when a life insured passes away."
    },
    {
      "term": "Actual Cash Value (ACV)",
      "slug": "actual-cash-value",
      "simpleDefinition": "A valuation method that calculates the replacement cost of an item MINUS depreciation for age and wear-and-tear."
    },
    {
      "term": "Replacement Cost Value (RCV)",
      "slug": "replacement-cost",
      "simpleDefinition": "A claim valuation method that pays the full current market cost to repair or replace damaged property with new items of like kind and quality, with zero deduction for depreciation."
    }
  ]
};

// Global State
let siteData = FALLBACK_INDEX;

// Format Currency
// Format Currency
function formatCurrency(amount, currency = '$') {
  if (isNaN(amount) || amount === null) return currency + '0';
  return currency + Math.round(amount).toLocaleString('en-US');
}

// Universal Input Range Slider Blue Track Fill
function updateSliderTrackFill(slider) {
  if (!slider || !slider.style) return;
  const min = parseFloat(slider.min) !== undefined && !isNaN(parseFloat(slider.min)) ? parseFloat(slider.min) : 0;
  const max = parseFloat(slider.max) !== undefined && !isNaN(parseFloat(slider.max)) ? parseFloat(slider.max) : 100;
  const val = parseFloat(slider.value) !== undefined && !isNaN(parseFloat(slider.value)) ? parseFloat(slider.value) : 0;
  const pct = max > min ? Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100)) : 0;
  slider.style.setProperty('--range-progress', pct + '%');
  slider.style.background = `linear-gradient(to right, #0071e3 0%, #0071e3 ${pct}%, #e5e5ea ${pct}%, #e5e5ea 100%)`;
}

function initSliderFills() {
  const sliders = document.querySelectorAll('input[type="range"], .calc-slider');
  sliders.forEach(slider => {
    updateSliderTrackFill(slider);
    slider.addEventListener('input', () => updateSliderTrackFill(slider));
    slider.addEventListener('change', () => updateSliderTrackFill(slider));
  });
}

// Gambling Machine / Slot Reel Number Animation with Delay and Up/Down reels
function formatSlotNumber(val, prefix, suffix, decimals) {
  if (isNaN(val) || val === null) return prefix + '0' + suffix;
  const numStr = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-US');
  return prefix + numStr + suffix;
}

function animateCalculatedNumber(element, targetValue, options = {}) {
  if (!element) return;
  const prefix = options.prefix || '';
  const suffix = options.suffix || '';
  const decimals = options.decimals || 0;
  const delay = options.delay !== undefined ? options.delay : 120; // gambling delay
  const duration = options.duration || 460; // slot reel spin duration

  const cleanTarget = typeof targetValue === 'number' ? targetValue : parseFloat(targetValue) || 0;

  // If first time initializing on this element, render directly without delay
  if (element._currentValue === undefined) {
    element._currentValue = cleanTarget;
    element.textContent = formatSlotNumber(cleanTarget, prefix, suffix, decimals);
    return;
  }

  const startValue = element._currentValue;
  if (Math.abs(startValue - cleanTarget) < 0.0001) {
    element.textContent = formatSlotNumber(cleanTarget, prefix, suffix, decimals);
    return;
  }

  const isUp = cleanTarget > startValue;

  // Clear pending timers or animation frames on this element
  if (element._slotTimer) {
    clearTimeout(element._slotTimer);
    element._slotTimer = null;
  }
  if (element._slotRaf) {
    cancelAnimationFrame(element._slotRaf);
    element._slotRaf = null;
  }

  // Visual slot anticipation during the delay
  element.classList.remove('slot-spin-up', 'slot-spin-down', 'slot-locked');
  element.classList.add(isUp ? 'slot-anticipating-up' : 'slot-anticipating-down');

  element._slotTimer = setTimeout(() => {
    element.classList.remove('slot-anticipating-up', 'slot-anticipating-down');
    element.classList.add(isUp ? 'slot-spin-up' : 'slot-spin-down');

    const startTime = performance.now();

    function updateReel(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Decelerating cubic ease-out like a mechanical spinning reel
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = startValue + (cleanTarget - startValue) * ease;

      // Slot machine jitter: in the first 75% of travel, rapidly spin digits
      let displayVal = currentVal;
      const diff = Math.abs(cleanTarget - startValue);
      if (progress < 0.75 && diff > 10) {
        const jitter = (Math.random() - 0.5) * diff * 0.04 * (1 - progress);
        displayVal = currentVal + jitter;
      }

      element.textContent = formatSlotNumber(displayVal, prefix, suffix, decimals);

      if (progress < 1) {
        element._slotRaf = requestAnimationFrame(updateReel);
      } else {
        // Locked in final number!
        element._currentValue = cleanTarget;
        element.textContent = formatSlotNumber(cleanTarget, prefix, suffix, decimals);
        element.classList.remove('slot-spin-up', 'slot-spin-down');
        element.classList.add('slot-locked');
        setTimeout(() => {
          element.classList.remove('slot-locked');
        }, 400);
      }
    }

    element._slotRaf = requestAnimationFrame(updateReel);
  }, delay);
}

// 1. Initialize Site Data
async function initSiteData() {
  try {
    const res = await fetch('/data.json');
    if (res.ok) {
      const liveData = await res.json();
      if (liveData && liveData.articles) {
        siteData = liveData;
        console.log('Insurance Bhaiya Data Loaded:', siteData.articles.length, 'articles');
      }
    }
  } catch (err) {
    console.warn('Using embedded fallback index:', err);
  }
}

// ==========================================================================
// 2. Ten Dedicated Actuarial Calculators
// ==========================================================================

function initCalculators() {
  // Tab Switching (if present)
  const tabBtns = document.querySelectorAll('.calc-tab-btn');
  const panels = document.querySelectorAll('.calc-tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // --- 1. Life Insurance Calculator (life-insurance-calculator) ---
  const lifeIncome = document.getElementById('lifeIncome');
  const lifeIncomeVal = document.getElementById('lifeIncomeVal');
  const lifeDependents = document.getElementById('lifeDependents');
  const lifeDebt = document.getElementById('lifeDebt');
  const lifeDebtVal = document.getElementById('lifeDebtVal');
  const lifeAssets = document.getElementById('lifeAssets');
  const lifeAssetsVal = document.getElementById('lifeAssetsVal');
  const lifeResultNeed = document.getElementById('lifeResultNeed');
  const lifeResultMonthly = document.getElementById('lifeResultMonthly');
  const lifeIncomeRepVal = document.getElementById('lifeIncomeRepVal');
  const lifeDebtPayoffVal = document.getElementById('lifeDebtPayoffVal');
  const lifeNetDeficitVal = document.getElementById('lifeNetDeficitVal');

  function updateLifeCalc() {
    if (!lifeIncome) return;
    const income = parseFloat(lifeIncome.value) || 85000;
    const deps = parseFloat(lifeDependents ? lifeDependents.value : 2) || 0;
    const debt = parseFloat(lifeDebt ? lifeDebt.value : 280000) || 0;
    const assets = parseFloat(lifeAssets ? lifeAssets.value : 45000) || 0;

    if (lifeIncomeVal) lifeIncomeVal.textContent = formatCurrency(income);
    if (lifeDebtVal) lifeDebtVal.textContent = formatCurrency(debt);
    if (lifeAssetsVal) lifeAssetsVal.textContent = formatCurrency(assets);

    [lifeIncome, lifeDebt, lifeAssets].forEach(updateSliderTrackFill);

    const incomeReplacement = income * 10;
    const childEducationReserve = deps * 75000;
    const grossNeed = incomeReplacement + childEducationReserve + debt;
    const netCoverageNeed = Math.max(100000, grossNeed - assets);
    const estMonthlyRate = Math.round((netCoverageNeed / 1000) * 0.048);

    if (lifeResultNeed) animateCalculatedNumber(lifeResultNeed, netCoverageNeed, { prefix: '$' });
    if (lifeResultMonthly) animateCalculatedNumber(lifeResultMonthly, estMonthlyRate, { prefix: '~$', suffix: '/mo (20-Yr Level Term)' });
    if (lifeIncomeRepVal) animateCalculatedNumber(lifeIncomeRepVal, incomeReplacement, { prefix: '$' });
    if (lifeDebtPayoffVal) animateCalculatedNumber(lifeDebtPayoffVal, debt + childEducationReserve, { prefix: '$' });
    if (lifeNetDeficitVal) animateCalculatedNumber(lifeNetDeficitVal, netCoverageNeed, { prefix: '$' });
  }
  if (lifeIncome) {
    [lifeIncome, lifeDependents, lifeDebt, lifeAssets].forEach(el => {
      if (el) el.addEventListener('input', updateLifeCalc);
    });
    updateLifeCalc();
  }

  // --- 2. Term Rates Estimator (term-insurance-calculator) ---
  const termAge = document.getElementById('termAge');
  const termAgeVal = document.getElementById('termAgeVal');
  const termYears = document.getElementById('termYears');
  const termCoverage = document.getElementById('termCoverage');
  const termCoverageVal = document.getElementById('termCoverageVal');
  const termHealth = document.getElementById('termHealth');
  const termResultMonthly = document.getElementById('termResultMonthly');
  const termResultAnnual = document.getElementById('termResultAnnual');
  const termResultTotal = document.getElementById('termResultTotal');

  function updateTermCalc() {
    if (!termAge) return;
    const age = parseInt(termAge.value, 10) || 30;
    const years = parseInt(termYears ? termYears.value : 20, 10) || 20;
    const coverage = parseInt(termCoverage ? termCoverage.value : 500000, 10) || 500000;
    const healthMultiplier = parseFloat(termHealth ? termHealth.value : 1.0) || 1.0;

    if (termAgeVal) termAgeVal.textContent = age + ' yrs';
    if (termCoverageVal) termCoverageVal.textContent = formatCurrency(coverage);

    [termAge, termCoverage].forEach(updateSliderTrackFill);

    const basePerThousand = 0.024 * Math.pow(1.055, (age - 20)) * (years === 30 ? 1.45 : years === 20 ? 1.15 : 1.0);
    const monthlyRate = Math.max(14, Math.round((coverage / 1000) * basePerThousand * healthMultiplier));
    const annualRate = monthlyRate * 12;
    const totalCost = annualRate * years;

    if (termResultMonthly) animateCalculatedNumber(termResultMonthly, monthlyRate, { prefix: '$', suffix: '/mo' });
    if (termResultAnnual) animateCalculatedNumber(termResultAnnual, annualRate, { prefix: '$' });
    if (termResultTotal) animateCalculatedNumber(termResultTotal, totalCost, { prefix: '$' });
  }
  if (termAge) {
    [termAge, termYears, termCoverage, termHealth].forEach(el => {
      if (el) el.addEventListener('input', updateTermCalc);
    });
    updateTermCalc();
  }

  // --- 3. Health Cost Analyzer (health-insurance-calculator) ---
  const healthVisits = document.getElementById('healthVisits');
  const healthVisitsVal = document.getElementById('healthVisitsVal');
  const healthProcedure = document.getElementById('healthProcedure');
  const healthResultPPO = document.getElementById('healthResultPPO');
  const healthResultHDHP = document.getElementById('healthResultHDHP');
  const healthRecommendation = document.getElementById('healthRecommendation');

  function updateHealthCalc() {
    if (!healthVisits) return;
    const visits = parseInt(healthVisits.value, 10) || 3;
    const hasMajorProcedure = healthProcedure && healthProcedure.checked;

    if (healthVisitsVal) healthVisitsVal.textContent = visits + ' visits/yr';
    updateSliderTrackFill(healthVisits);

    const ppoFixedPrem = 550 * 12;
    const ppoCareCost = Math.min(3500, (visits * 30) + (hasMajorProcedure ? 1500 : 0));
    const ppoTotal = ppoFixedPrem + ppoCareCost;

    const hdhpFixedPrem = 320 * 12;
    const hdhpCareCost = Math.min(6500, (visits * 160) + (hasMajorProcedure ? 3000 : 0));
    const hdhpTotal = hdhpFixedPrem + hdhpCareCost;

    if (healthResultPPO) animateCalculatedNumber(healthResultPPO, ppoTotal, { prefix: '$', suffix: '/yr' });
    if (healthResultHDHP) animateCalculatedNumber(healthResultHDHP, hdhpTotal, { prefix: '$', suffix: '/yr' });

    if (healthRecommendation) {
      if (hdhpTotal < ppoTotal) {
        const diff = ppoTotal - hdhpTotal;
        healthRecommendation.innerHTML = '<strong>HDHP Saves ' + formatCurrency(diff) + '/year:</strong> Because your anticipated medical usage is low-to-moderate, paying lower monthly premiums and contributing to a triple-tax-advantaged HSA is mathematically superior.';
      } else {
        const diff = hdhpTotal - ppoTotal;
        healthRecommendation.innerHTML = '<strong>PPO Saves ' + formatCurrency(diff) + '/year:</strong> High routine doctor visits and procedure risk make the low-deductible copay structure more cost-effective overall.';
      }
    }
  }
  if (healthVisits) {
    [healthVisits, healthProcedure].forEach(el => {
      if (el) el.addEventListener('input', updateHealthCalc);
      if (el) el.addEventListener('change', updateHealthCalc);
    });
    updateHealthCalc();
  }

  // --- 4. Car Insurance Estimator (car-insurance-calculator) ---
  const autoValue = document.getElementById('autoValue');
  const autoValueVal = document.getElementById('autoValueVal');
  const autoDeductible = document.getElementById('autoDeductible');
  const autoResultPrem = document.getElementById('autoResultPrem');
  const autoResultGap = document.getElementById('autoResultGap');

  function updateAutoCalc() {
    if (!autoValue) return;
    const val = parseFloat(autoValue.value) || 25000;
    const ded = parseFloat(autoDeductible ? autoDeductible.value : 500) || 500;

    if (autoValueVal) autoValueVal.textContent = formatCurrency(val);
    updateSliderTrackFill(autoValue);

    const baseCollision = (val * 0.022) * (ded === 1000 ? 0.82 : ded === 250 ? 1.25 : 1.0);
    const liabilityBase = 65;
    const totalMonthly = Math.round(liabilityBase + (baseCollision / 12));

    if (autoResultPrem) animateCalculatedNumber(autoResultPrem, totalMonthly, { prefix: '$', suffix: '/mo' });
    if (autoResultGap) animateCalculatedNumber(autoResultGap, Math.max(0, val - ded), { prefix: '$' });
  }
  if (autoValue) {
    [autoValue, autoDeductible].forEach(el => {
      if (el) el.addEventListener('input', updateAutoCalc);
      if (el) el.addEventListener('change', updateAutoCalc);
    });
    updateAutoCalc();
  }

  // --- 5. Home Replacement Cost (home-insurance-calculator) ---
  const homeSqft = document.getElementById('homeSqft');
  const homeSqftVal = document.getElementById('homeSqftVal');
  const homeCostPerSqft = document.getElementById('homeCostPerSqft');
  const homeCostPerSqftVal = document.getElementById('homeCostPerSqftVal');
  const homeResultDwelling = document.getElementById('homeResultDwelling');
  const homeResultPersonal = document.getElementById('homeResultPersonal');

  function updateHomeCalc() {
    if (!homeSqft) return;
    const sqft = parseInt(homeSqft.value, 10) || 2000;
    const costPerSqft = parseInt(homeCostPerSqft ? homeCostPerSqft.value : 180, 10) || 180;

    if (homeSqftVal) homeSqftVal.textContent = sqft.toLocaleString() + ' sq ft';
    if (homeCostPerSqftVal) homeCostPerSqftVal.textContent = formatCurrency(costPerSqft) + '/sq ft';

    [homeSqft, homeCostPerSqft].forEach(updateSliderTrackFill);

    const dwelling = sqft * costPerSqft;
    const personalProperty = Math.round(dwelling * 0.6);

    if (homeResultDwelling) animateCalculatedNumber(homeResultDwelling, dwelling, { prefix: '$' });
    if (homeResultPersonal) animateCalculatedNumber(homeResultPersonal, personalProperty, { prefix: '$' });
  }
  if (homeSqft) {
    [homeSqft, homeCostPerSqft].forEach(el => {
      if (el) el.addEventListener('input', updateHomeCalc);
    });
    updateHomeCalc();
  }

  // --- 6. Premium Breakeven Calculator (premium-calculator) ---
  const premBase = document.getElementById('premBase');
  const premBaseVal = document.getElementById('premBaseVal');
  const premTier = document.getElementById('premTier');
  const premTierVal = document.getElementById('premTierVal');
  const premDedGap = document.getElementById('premDedGap');
  const premDedGapVal = document.getElementById('premDedGapVal');
  const premResultAnnualSavings = document.getElementById('premResultAnnualSavings');
  const premResultBreakevenMonths = document.getElementById('premResultBreakevenMonths');
  const premRecommendation = document.getElementById('premRecommendation');

  function updatePremiumCalc() {
    if (!premBase) return;
    const baseMonthly = parseFloat(premBase.value) || 160;
    const tierMonthly = parseFloat(premTier.value) || 110;
    const dedGap = parseFloat(premDedGap ? premDedGap.value : 1000) || 1000;

    if (premBaseVal) premBaseVal.textContent = formatCurrency(baseMonthly) + '/mo';
    if (premTierVal) premTierVal.textContent = formatCurrency(tierMonthly) + '/mo';
    if (premDedGapVal) premDedGapVal.textContent = formatCurrency(dedGap);

    [premBase, premTier, premDedGap].forEach(updateSliderTrackFill);

    const monthlySavings = Math.max(1, baseMonthly - tierMonthly);
    const annualSavings = monthlySavings * 12;
    const breakevenMonths = Math.round((dedGap / monthlySavings) * 10) / 10;

    if (premResultAnnualSavings) animateCalculatedNumber(premResultAnnualSavings, annualSavings, { prefix: '$', suffix: '/yr' });
    if (premResultBreakevenMonths) animateCalculatedNumber(premResultBreakevenMonths, breakevenMonths, { suffix: ' Months', decimals: 1 });

    if (premRecommendation) {
      if (breakevenMonths <= 24) {
        premRecommendation.innerHTML = '<strong>Highly Recommended:</strong> With a breakeven timeline of just ' + breakevenMonths + ' months, choosing the higher deductible saves significant capital if you go 2+ years without a claim.';
      } else {
        premRecommendation.innerHTML = '<strong>Caution:</strong> It takes ' + breakevenMonths + ' months (' + (breakevenMonths / 12).toFixed(1) + ' years) of claim-free driving to recoup the out-of-pocket deductible risk.';
      }
    }
  }
  if (premBase) {
    [premBase, premTier, premDedGap].forEach(el => {
      if (el) el.addEventListener('input', updatePremiumCalc);
    });
    updatePremiumCalc();
  }

  // --- 7. Umbrella / Liability Limits (coverage-calculator) ---
  const covNetWorth = document.getElementById('covNetWorth');
  const covNetWorthVal = document.getElementById('covNetWorthVal');
  const covRealEstate = document.getElementById('covRealEstate');
  const covRealEstateVal = document.getElementById('covRealEstateVal');
  const covRiskProfile = document.getElementById('covRiskProfile');
  const covResultRecommended = document.getElementById('covResultRecommended');
  const covResultBaseline = document.getElementById('covResultBaseline');
  const covResultGap = document.getElementById('covResultGap');

  function updateCoverageCalc() {
    if (!covNetWorth) return;
    const netWorth = parseFloat(covNetWorth.value) || 650000;
    const realEstate = parseFloat(covRealEstate ? covRealEstate.value : 350000) || 0;
    const riskFactor = parseFloat(covRiskProfile ? covRiskProfile.value : 1.2) || 1.0;

    if (covNetWorthVal) covNetWorthVal.textContent = formatCurrency(netWorth);
    if (covRealEstateVal) covRealEstateVal.textContent = formatCurrency(realEstate);

    [covNetWorth, covRealEstate].forEach(updateSliderTrackFill);

    const totalAtRisk = (netWorth + realEstate) * riskFactor;
    const recMillions = Math.max(1, Math.ceil(totalAtRisk / 1000000));
    const recCoverage = recMillions * 1000000;
    const baselineAutoHome = 500000;
    const umbrellaGap = Math.max(0, recCoverage - baselineAutoHome);

    if (covResultRecommended) animateCalculatedNumber(covResultRecommended, recCoverage, { prefix: '$' });
    if (covResultBaseline) animateCalculatedNumber(covResultBaseline, baselineAutoHome, { prefix: '$' });
    if (covResultGap) animateCalculatedNumber(covResultGap, umbrellaGap, { prefix: '$', suffix: ' Umbrella' });
  }
  if (covNetWorth) {
    [covNetWorth, covRealEstate, covRiskProfile].forEach(el => {
      if (el) el.addEventListener('input', updateCoverageCalc);
      if (el) el.addEventListener('change', updateCoverageCalc);
    });
    updateCoverageCalc();
  }

  // --- 8. Multi-Pillar Insurance Needs (insurance-needs-calculator) ---
  const needsIncome = document.getElementById('needsIncome');
  const needsIncomeVal = document.getElementById('needsIncomeVal');
  const needsYears = document.getElementById('needsYears');
  const needsYearsVal = document.getElementById('needsYearsVal');
  const needsDebt = document.getElementById('needsDebt');
  const needsDebtVal = document.getElementById('needsDebtVal');
  const needsSavings = document.getElementById('needsSavings');
  const needsSavingsVal = document.getElementById('needsSavingsVal');
  const needsResultTotal = document.getElementById('needsResultTotal');
  const needsResultIncomeGap = document.getElementById('needsResultIncomeGap');
  const needsResultLiabilities = document.getElementById('needsResultLiabilities');

  function updateNeedsCalc() {
    if (!needsIncome) return;
    const income = parseFloat(needsIncome.value) || 95000;
    const years = parseInt(needsYears ? needsYears.value : 15, 10) || 15;
    const debt = parseFloat(needsDebt ? needsDebt.value : 320000) || 0;
    const savings = parseFloat(needsSavings ? needsSavings.value : 50000) || 0;

    if (needsIncomeVal) needsIncomeVal.textContent = formatCurrency(income);
    if (needsYearsVal) needsYearsVal.textContent = years + ' Years';
    if (needsDebtVal) needsDebtVal.textContent = formatCurrency(debt);
    if (needsSavingsVal) needsSavingsVal.textContent = formatCurrency(savings);

    [needsIncome, needsYears, needsDebt, needsSavings].forEach(updateSliderTrackFill);

    const incomeObligation = income * years * 0.75;
    const totalGross = incomeObligation + debt;
    const netInsuranceNeed = Math.max(100000, totalGross - savings);

    if (needsResultTotal) animateCalculatedNumber(needsResultTotal, netInsuranceNeed, { prefix: '$' });
    if (needsResultIncomeGap) animateCalculatedNumber(needsResultIncomeGap, incomeObligation, { prefix: '$' });
    if (needsResultLiabilities) animateCalculatedNumber(needsResultLiabilities, debt, { prefix: '$' });
  }
  if (needsIncome) {
    [needsIncome, needsYears, needsDebt, needsSavings].forEach(el => {
      if (el) el.addEventListener('input', updateNeedsCalc);
    });
    updateNeedsCalc();
  }

  // --- 9. Deductible Optimization (deductible-calculator) ---
  const dedCurrent = document.getElementById('dedCurrent');
  const dedProposed = document.getElementById('dedProposed');
  const dedAnnualSavings = document.getElementById('dedAnnualSavings');
  const dedAnnualSavingsVal = document.getElementById('dedAnnualSavingsVal');
  const dedResultBreakeven = document.getElementById('dedResultBreakeven');
  const dedResultRiskYears = document.getElementById('dedResultRiskYears');
  const dedRecommendation = document.getElementById('dedRecommendation');

  function updateDeductibleCalc() {
    if (!dedCurrent) return;
    const cur = parseFloat(dedCurrent.value) || 500;
    const prop = parseFloat(dedProposed ? dedProposed.value : 1500) || 1500;
    const savings = parseFloat(dedAnnualSavings ? dedAnnualSavings.value : 320) || 320;

    if (dedAnnualSavingsVal) dedAnnualSavingsVal.textContent = formatCurrency(savings) + '/yr';
    updateSliderTrackFill(dedAnnualSavings);

    const extraRisk = Math.max(0, prop - cur);
    const yearsToBreakeven = savings > 0 ? (extraRisk / savings).toFixed(1) : '0';

    if (dedResultBreakeven) animateCalculatedNumber(dedResultBreakeven, parseFloat(yearsToBreakeven) || 0, { suffix: ' Years', decimals: 1 });
    if (dedResultRiskYears) animateCalculatedNumber(dedResultRiskYears, extraRisk, { prefix: '$', suffix: ' Risk Gap' });

    if (dedRecommendation) {
      if (parseFloat(yearsToBreakeven) <= 3) {
        dedRecommendation.innerHTML = '<strong>Favorable Breakeven:</strong> If you remain claim-free for ' + yearsToBreakeven + ' years, the higher deductible is mathematically optimal.';
      } else {
        dedRecommendation.innerHTML = '<strong>High Risk Horizon:</strong> A ' + yearsToBreakeven + ' year breakeven window is risky. Consider keeping the lower deductible if you drive in high-incident zones.';
      }
    }
  }
  if (dedCurrent) {
    [dedCurrent, dedProposed, dedAnnualSavings].forEach(el => {
      if (el) el.addEventListener('input', updateDeductibleCalc);
      if (el) el.addEventListener('change', updateDeductibleCalc);
    });
    updateDeductibleCalc();
  }

  // --- 10. Building Inflation Deficit (inflation-calculator) ---
  const infInitialLimit = document.getElementById('infInitialLimit');
  const infInitialLimitVal = document.getElementById('infInitialLimitVal');
  const infYearsAgo = document.getElementById('infYearsAgo');
  const infYearsAgoVal = document.getElementById('infYearsAgoVal');
  const infRate = document.getElementById('infRate');
  const infRateVal = document.getElementById('infRateVal');
  const infResultCurrentValue = document.getElementById('infResultCurrentValue');
  const infResultDeficit = document.getElementById('infResultDeficit');
  const infResultRequiredIncrease = document.getElementById('infResultRequiredIncrease');

  function updateInflationCalc() {
    if (!infInitialLimit) return;
    const initial = parseFloat(infInitialLimit.value) || 350000;
    const years = parseInt(infYearsAgo ? infYearsAgo.value : 5, 10) || 5;
    const rate = parseFloat(infRate ? infRate.value : 4.5) || 4.5;

    if (infInitialLimitVal) infInitialLimitVal.textContent = formatCurrency(initial);
    if (infYearsAgoVal) infYearsAgoVal.textContent = years + ' Years Ago';
    if (infRateVal) infRateVal.textContent = rate + '% / year';

    [infInitialLimit, infYearsAgo, infRate].forEach(updateSliderTrackFill);

    const trueCurrentCost = Math.round(initial * Math.pow(1 + (rate / 100), years));
    const deficit = Math.max(0, trueCurrentCost - initial);
    const pctUnderinsured = Math.round((deficit / trueCurrentCost) * 100);

    if (infResultCurrentValue) animateCalculatedNumber(infResultCurrentValue, trueCurrentCost, { prefix: '$' });
    if (infResultDeficit) animateCalculatedNumber(infResultDeficit, deficit, { prefix: '$' });
    if (infResultRequiredIncrease) animateCalculatedNumber(infResultRequiredIncrease, pctUnderinsured, { suffix: '% Coverage Deficit' });
  }
  if (infInitialLimit) {
    [infInitialLimit, infYearsAgo, infRate].forEach(el => {
      if (el) el.addEventListener('input', updateInflationCalc);
    });
    updateInflationCalc();
  }
}

// ==========================================================================
// 3. Universal Search System (Prefilled Intent Pills & Live Matcher)
// ==========================================================================

// Minimal Vector Icons for Search System (Apple Spotlight aesthetic)
const SEARCH_ICONS = {
  calc: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
  guide: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
  compare: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
  glossary: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  scenario: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>`,
  arrow: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-item-arrow"><polyline points="9 18 15 12 9 6"/></svg>`
};

function renderSearchItemRow({ url, title, desc, intent, intentClass, iconType }) {
  const iconSvg = SEARCH_ICONS[iconType] || SEARCH_ICONS.guide;
  return `
    <a href="${url}" class="search-result-item">
      <div class="search-item-icon search-icon-${iconType}">
        ${iconSvg}
      </div>
      <div class="search-item-content">
        <span class="search-item-title">${escapeHtml(title)}</span>
        ${desc ? `<span class="search-item-desc">${escapeHtml(desc)}</span>` : ''}
      </div>
      <div class="search-item-meta">
        <span class="pill-intent ${intentClass}">${escapeHtml(intent)}</span>
        ${SEARCH_ICONS.arrow}
      </div>
    </a>
  `;
}

const PREFILLED_SEARCH_ITEMS = [
  {
    title: 'Life Insurance Needs Calculator',
    url: '/tools/life-insurance-calculator',
    desc: 'Calculate exact capital needed to protect your family.',
    intent: 'Calculator',
    intentClass: 'pill-intent-calc',
    iconType: 'calc'
  },
  {
    title: 'Insurance Explained for Beginners',
    url: '/learn/insurance-for-beginners',
    desc: 'The zero-jargon guide to premiums, deductibles, and limits.',
    intent: 'Guide',
    intentClass: 'pill-intent-guide',
    iconType: 'guide'
  },
  {
    title: 'Term vs. Whole Life Insurance',
    url: '/compare/term-vs-whole-life',
    desc: 'Side-by-side comparison: pure protection versus cash value.',
    intent: 'Compare',
    intentClass: 'pill-intent-compare',
    iconType: 'compare'
  },
  {
    title: 'Deductible Definition & Rules',
    url: '/glossary/deductible',
    desc: 'What you pay out-of-pocket before coverage begins.',
    intent: 'Term',
    intentClass: 'pill-intent-glossary',
    iconType: 'glossary'
  },
  {
    title: 'First-Time Homeowner Story',
    url: '/scenarios/alex-first-mortgage-london',
    desc: 'Case study: Protecting a new mortgage without kids.',
    intent: 'Scenario',
    intentClass: 'pill-intent-scenario',
    iconType: 'scenario'
  },
  {
    title: 'Health Insurance Plan Calculator',
    url: '/tools/health-insurance-calculator',
    desc: 'Compare annual costs between HDHP and PPO plans.',
    intent: 'Calculator',
    intentClass: 'pill-intent-calc',
    iconType: 'calc'
  }
];

function buildSearchResultsHtml(query) {
  if (!query || !query.trim()) {
    let html = '<div class="search-section-header">Popular Searches &amp; Quick Starts</div>';
    html += PREFILLED_SEARCH_ITEMS.map(item => renderSearchItemRow(item)).join('');
    return html;
  }

  const cleanQuery = query.trim();
  let regex;
  try {
    regex = new RegExp(cleanQuery, 'i');
  } catch (err) {
    regex = new RegExp(cleanQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  }

  const matchedTools = (siteData?.calculators || []).filter(t =>
    regex.test(t.name) || regex.test(t.shortDescription) || regex.test(t.slug)
  ).slice(0, 4);

  const matchedArticles = (siteData?.articles || []).filter(a =>
    regex.test(a.title) || regex.test(a.description) || regex.test(a.slug)
  ).slice(0, 5);

  const matchedComparisons = (siteData?.comparisons || []).filter(c =>
    regex.test(c.title) || regex.test(c.subtitle || '') || regex.test(c.description || '') || regex.test(c.slug)
  ).slice(0, 3);

  const matchedGlossary = (siteData?.glossary || []).filter(g =>
    regex.test(g.term) || regex.test(g.simpleDefinition || g.plainEnglish || '') || regex.test(g.slug)
  ).slice(0, 3);

  const matchedScenarios = (siteData?.scenarios || []).filter(s =>
    regex.test(s.name) || regex.test(s.situation || '') || regex.test(s.coreQuestion || '') || regex.test(s.slug)
  ).slice(0, 3);

  const totalMatches = matchedTools.length + matchedArticles.length + matchedComparisons.length + matchedGlossary.length + matchedScenarios.length;

  if (totalMatches === 0) {
    return `<div style="padding: 32px 16px; text-align: center; color: var(--color-secondary); font-size: 0.9375rem;">No matching guides, tools, or terms found for "<strong>${escapeHtml(cleanQuery)}</strong>".</div>`;
  }

  let html = '';

  if (matchedTools.length > 0) {
    html += '<div class="search-section-header">Calculators</div>';
    html += matchedTools.map(t => renderSearchItemRow({
      url: `/tools/${t.slug}`,
      title: t.name,
      desc: t.shortDescription,
      intent: 'Calculator',
      intentClass: 'pill-intent-calc',
      iconType: 'calc'
    })).join('');
  }

  if (matchedArticles.length > 0) {
    html += '<div class="search-section-header">Guides</div>';
    html += matchedArticles.map(a => renderSearchItemRow({
      url: `/learn/${a.slug}`,
      title: a.title,
      desc: a.description,
      intent: 'Guide',
      intentClass: 'pill-intent-guide',
      iconType: 'guide'
    })).join('');
  }

  if (matchedComparisons.length > 0) {
    html += '<div class="search-section-header">Comparisons</div>';
    html += matchedComparisons.map(c => renderSearchItemRow({
      url: `/compare/${c.slug}`,
      title: c.title,
      desc: c.subtitle || c.description || 'Side-by-side policy comparison',
      intent: 'Compare',
      intentClass: 'pill-intent-compare',
      iconType: 'compare'
    })).join('');
  }

  if (matchedGlossary.length > 0) {
    const def = g => g.simpleDefinition || g.plainEnglish || '';
    html += '<div class="search-section-header">Dictionary Terms</div>';
    html += matchedGlossary.map(g => renderSearchItemRow({
      url: `/glossary/${g.slug}`,
      title: g.term,
      desc: def(g),
      intent: 'Term',
      intentClass: 'pill-intent-glossary',
      iconType: 'glossary'
    })).join('');
  }

  if (matchedScenarios.length > 0) {
    html += '<div class="search-section-header">Real Scenarios</div>';
    html += matchedScenarios.map(s => renderSearchItemRow({
      url: `/scenarios/${s.slug}`,
      title: `${s.name}'s Story`,
      desc: s.situation || s.coreQuestion || '',
      intent: 'Scenario',
      intentClass: 'pill-intent-scenario',
      iconType: 'scenario'
    })).join('');
  }

  return html;
}

function initSearchModal() {
  const modal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInputField');
  const searchResults = document.getElementById('searchResultsList');
  const searchTriggers = document.querySelectorAll('.search-trigger-btn, .mobile-search-btn');
  const closeBtn = document.getElementById('searchCloseBtn');

  if (!modal || !searchInput) return;

  function openSearch() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (searchResults) {
      searchResults.innerHTML = buildSearchResultsHtml(searchInput.value);
    }
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearch() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
  }

  searchTriggers.forEach(t => t.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      modal.classList.contains('active') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    }
  });

  searchInput.addEventListener('input', (e) => {
    if (searchResults) {
      searchResults.innerHTML = buildSearchResultsHtml(e.target.value);
    }
  });
}

function initHomeSearch() {
  const homeInput = document.getElementById('siteSearchInput');
  const suggestionsBox = document.getElementById('searchSuggestionsBox');
  const searchContainer = document.querySelector('.home-search-container');

  if (!homeInput || !suggestionsBox) return;

  function showSuggestions() {
    suggestionsBox.innerHTML = buildSearchResultsHtml(homeInput.value);
    suggestionsBox.style.display = 'block';
  }

  function hideSuggestions() {
    suggestionsBox.style.display = 'none';
  }

  homeInput.addEventListener('focus', showSuggestions);
  homeInput.addEventListener('click', showSuggestions);
  homeInput.addEventListener('input', showSuggestions);

  document.addEventListener('click', (e) => {
    if (searchContainer && !searchContainer.contains(e.target)) {
      hideSuggestions();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideSuggestions();
    }
  });
}

// ==========================================================================
// 4. Progressive Article Pagination & Smooth Category Filtering
// ==========================================================================

function initArticleFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = Array.from(document.querySelectorAll('.article-card, .apple-article-card'));
  const loadMoreBtn = document.getElementById('loadMoreArticlesBtn');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const emptyNotice = document.getElementById('articlesEmptyNotice');
  const liveSearchInput = document.getElementById('blogLiveSearch');

  if (!cards.length) return;

  const PAGE_SIZE = 12;
  let currentVisibleCount = PAGE_SIZE;
  let activeCategory = 'all';
  let searchQuery = '';

  // Check URL hash or search params on load
  try {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    const hash = window.location.hash.replace('#', '');
    const initialCat = catParam || hash;
    if (initialCat) {
      filterPills.forEach(p => {
        if (p.getAttribute('data-category') === initialCat) {
          filterPills.forEach(pill => pill.classList.remove('active'));
          p.classList.add('active');
          activeCategory = initialCat;
        }
      });
    }
  } catch (e) {}

  function applyPaginationAndFilters() {
    let matchingCards = [];

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category') || '';
      const cardText = (card.textContent || '').toLowerCase();
      const matchesCategory = activeCategory === 'all' || cardCat.includes(activeCategory) || activeCategory === cardCat;
      const matchesSearch = !searchQuery || cardText.includes(searchQuery.toLowerCase());

      if (matchesCategory && matchesSearch) {
        matchingCards.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    // Show matching up to currentVisibleCount
    matchingCards.forEach((card, idx) => {
      if (idx < currentVisibleCount) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Manage Load More button
    if (loadMoreWrap && loadMoreBtn) {
      const remaining = matchingCards.length - currentVisibleCount;
      if (remaining > 0) {
        loadMoreWrap.style.display = 'block';
        loadMoreBtn.textContent = 'Load More Guides (' + remaining + ' remaining)';
      } else {
        loadMoreWrap.style.display = 'none';
      }
    }

    // Manage Featured Hero Card visibility
    const featuredHero = document.getElementById('featuredBlogHero');
    if (featuredHero) {
      const heroCategory = featuredHero.getAttribute('data-category') || 'insurance-basics';
      const heroText = (featuredHero.textContent || '').toLowerCase();
      const heroMatchesCategory = activeCategory === 'all' || heroCategory.includes(activeCategory) || activeCategory === heroCategory;
      const heroMatchesSearch = !searchQuery || heroText.includes(searchQuery.toLowerCase());

      if (heroMatchesCategory && heroMatchesSearch) {
        featuredHero.style.display = 'grid';
      } else {
        featuredHero.style.display = 'none';
      }
    }

    // Empty state handling
    if (emptyNotice) {
      if (matchingCards.length === 0) {
        emptyNotice.style.display = 'block';
      } else {
        emptyNotice.style.display = 'none';
      }
    }
  }

  // Hook up filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      currentVisibleCount = PAGE_SIZE;
      applyPaginationAndFilters();
    });
  });

  // Hook up live search input
  if (liveSearchInput) {
    liveSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      currentVisibleCount = PAGE_SIZE;
      applyPaginationAndFilters();
    });
  }

  // Hook up load more button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentVisibleCount += PAGE_SIZE;
      applyPaginationAndFilters();
    });
  }

  // Initial display run
  applyPaginationAndFilters();
}


// ==========================================================================
// 5. 8-Point Policy Audit Interactive Scoring
// ==========================================================================

function initPolicyAudit() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const scoreCircle = document.getElementById('auditScoreCircle');
  const scoreStatusText = document.getElementById('auditStatusText');

  if (!checkboxes.length || !scoreCircle) return;

  function recalculateScore() {
    let checkedCount = 0;
    checkboxes.forEach(cb => {
      const parentItem = cb.closest('.checklist-item');
      if (cb.checked) {
        checkedCount++;
        if (parentItem) parentItem.classList.add('checked');
      } else {
        if (parentItem) parentItem.classList.remove('checked');
      }
    });

    const scorePct = Math.round((checkedCount / checkboxes.length) * 100);
    scoreCircle.textContent = scorePct + '%';

    if (!scoreStatusText) return;

    if (scorePct >= 90) {
      scoreStatusText.innerHTML = '<span style="color: #059669;">Excellent Coverage</span> · Low Underinsurance Risk';
    } else if (scorePct >= 70) {
      scoreStatusText.innerHTML = '<span style="color: #0284c7;">Solid Foundation</span> · Few Vulnerabilities Detected';
    } else if (scorePct >= 40) {
      scoreStatusText.innerHTML = '<span style="color: #d97706;">Moderate Risk</span> · Review Recommended Endorsements';
    } else {
      scoreStatusText.innerHTML = '<span style="color: #dc2626;">High Exposure Risk</span> · Critical Gaps Detected';
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', recalculateScore);
    const parent = cb.closest('.checklist-item');
    if (parent) {
      parent.addEventListener('click', (e) => {
        if (e.target !== cb) {
          cb.checked = !cb.checked;
          recalculateScore();
        }
      });
    }
  });

  recalculateScore();
}

// ==========================================================================
// 6. Mobile Drawer Navigation System (Robust Toggle & Close Handlers)
// ==========================================================================

function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawerOverlay = document.getElementById('mobileDrawerOverlay') || document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerCloseBtn');
  const backdrop = document.getElementById('mobileDrawerBackdrop');

  if (!menuBtn || !drawerOverlay) return;

  function openDrawer() {
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleDrawer() {
    if (drawerOverlay.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  // Toggle on hamburger button click (prevents getting stuck)
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDrawer();
  });

  // Close on close button click
  if (drawerClose) {
    drawerClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Close on backdrop click
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeDrawer();
    });
  }

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerOverlay.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Close when clicking any link inside drawer to allow smooth navigation
  drawerOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Quick search trigger inside drawer closes drawer and opens main search
  const drawerSearch = drawerOverlay.querySelector('.drawer-search-trigger');
  if (drawerSearch) {
    drawerSearch.addEventListener('click', () => {
      closeDrawer();
      const searchModal = document.getElementById('searchModal');
      const searchInput = document.getElementById('searchInputField');
      if (searchModal && searchInput) {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 80);
      }
    });
  }
}

// Bootstrapping
document.addEventListener('DOMContentLoaded', async () => {
  await initSiteData();
  initCalculators();
  initSliderFills();
  initSearchModal();
  initHomeSearch();
  initArticleFilters();
  initPolicyAudit();
  initMobileNav();
});


