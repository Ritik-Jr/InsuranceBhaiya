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
    "title": "When & How to Hire an Insurance Lawyer (or Insurance Attorney)",
    "slug": "when-to-hire-an-insurance-lawyer",
    "description": "When it actually makes sense to hire an insurance lawyer or insurance attorney, what they cost, and how a first-party dispute differs from a third-party auto claim.",
    "category": "insurance-basics"
},

    {
    "title": "Business Life Insurance: Key Person Coverage, Buy-Sell Funding, and Executive Benefits",
    "slug": "business-life-insurance",
    "description": "Business life insurance covers key person risk, funds buy-sell agreements, and supports executive benefit plans \u2014 here's how each structure actually works.",
    "category": "life-insurance"
},

    {
    "title": "Loyal American Life Insurance: Who Owns It and What It Actually Sells",
    "slug": "loyal-american-life-insurance",
    "description": "Loyal American Life Insurance Company is a real, Cigna-owned carrier focused on Medicare supplement and supplemental health products, not major term life.",
    "category": "life-insurance"
},

    {
    "title": "What a Life Insurance Broker Actually Does, and When You Need One",
    "slug": "life-insurance-broker",
    "description": "What a life insurance broker actually does, how they're paid, and when working with one beats buying a policy directly from a single carrier.",
    "category": "life-insurance"
},

    {
    "title": "Professional Indemnity Insurance: What It Covers and Who Needs It",
    "slug": "professional-indemnity-insurance",
    "description": "How professional indemnity insurance works, how it differs from public liability and errors & omissions, and who's typically required to carry it \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Event Liability Insurance: What Hotels, Venues, and Planners Need",
    "slug": "event-liability-insurance",
    "description": "How event liability and event cancellation insurance work, who's actually required to carry it, and how it fits alongside a hotel or venue's own policy \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Product Liability Insurance: What It Covers and Who Needs It",
    "slug": "product-liability-insurance",
    "description": "How product liability insurance works for manufacturers, distributors, and sellers, and how it differs from a specialty line like aviation products liability \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Marina Insurance: Protecting the Property, Not Just the Boats",
    "slug": "marina-insurance",
    "description": "What a marina operator's own commercial insurance needs to cover \u2014 docks, storage, fuel operations, and liability \u2014 separate from the watercraft it rents or stores, answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Medical Malpractice Insurance: What It Covers and Who Needs It",
    "slug": "medical-malpractice-insurance",
    "description": "How medical malpractice insurance actually works, the difference between claims-made and occurrence policies, and what tail coverage protects against \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "First-Party Insurance Claims: What They Are and How to File One",
    "slug": "first-party-insurance-claims",
    "description": "What a first-party insurance claim actually is, how it differs from a third-party liability claim, and the practical steps to filing one \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "How to Get Commercial Insurance Quotes: A Step-by-Step Guide",
    "slug": "quotes-for-commercial-insurance",
    "description": "How commercial insurance quoting actually works, what information you need ready, and why niche businesses often can't just use an online small-business quote tool \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Boat Rental Insurance: What It Covers for Owners and Renters",
    "slug": "boat-rental-insurance",
    "description": "What a boat rental or charter operator's insurance actually needs to cover, and what a renter's own policy typically doesn't \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Hotel Insurance: What It Covers and Why Every Hotel Needs It",
    "slug": "hotel-insurance",
    "description": "What a hotel insurance policy actually includes, how it differs from a standard business policy, and what commonly gets missed \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Public Liability Insurance for Gas Engineers: What UK Tradespeople Actually Need",
    "slug": "gas-engineer-public-liability-insurance",
    "description": "How much public liability cover a Gas Safe-registered engineer needs, what it covers, and how it differs from professional indemnity insurance \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Compound Insurance: Covering a Multi-Building Commercial Property",
    "slug": "compound-insurance",
    "description": "What compound insurance actually covers, who needs it, and how it differs from insuring a single standalone building \u2014 answered question by question.",
    "category": "insurance-basics"
},

    {
    "title": "Niche Commercial Insurance: Hotels, Marinas & Malpractice \u2014 A Buyer's Q&A Guide",
    "slug": "niche-commercial-insurance-hotels-marinas-malpractice",
    "description": "Answers to the specific questions business owners actually ask about hard-to-place commercial insurance: hotels, boat rentals, aviation liability, malpractice, and first-party property claims.",
    "category": "insurance-basics"
},

    {
    "title": "Life Insurance Fundamentals: Is It Worth It, How Payouts Work, and Who Can Own a Policy",
    "slug": "life-insurance-fundamentals-worth-it-payouts-ownership",
    "description": "A complete guide to life insurance fundamentals: whether it's worth it, how much you need, how payouts and ownership rules actually work.",
    "category": "life-insurance"
},

    {
    "title": "Starting & Running an Insurance Agency: The Complete Guide for New and Growing Owners",
    "slug": "starting-and-running-an-insurance-agency",
    "description": "A complete guide to starting an insurance agency and running an insurance agency profitably \u2014 licensing steps, business plans, commissions, client acquisition, and commercial sales.",
    "category": "insurance-basics"
},

    {
    "title": "Insurance Company Reviews: Is [Brand] Insurance Legit? A Consumer's Verification Framework",
    "slug": "insurance-company-reviews-is-brand-insurance-legit",
    "description": "Learn how to verify any insurance company's legitimacy using licensing status, financial ratings, and complaint records before you buy, renew, or file a claim.",
    "category": "insurance-basics"
},

    {
    "title": "Insurance Company Reviews: Is [Brand] Insurance Legit? A Practical Guide to Vetting Any Insurer",
    "slug": "insurance-company-reviews-is-brand-legit",
    "description": "A step-by-step method for checking whether any insurance company, MGA, agency, or quote site is legitimate before you pay a premium or trust it with a claim.",
    "category": "insurance-basics"
},

    {
    "title": "Umbrella Insurance Decoded: Safeguarding Wealth Beyond Standard Limits",
    "slug": "umbrella-insurance-guide",
    "description": "Discover why basic home and auto liability limits leave your savings, home equity, and future income vulnerable, and how a personal umbrella policy provides catastrophic protection.",
    "category": "insurance-basics"
},

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
      "name": "Out-of-Pocket Cost Calculator",
      "slug": "health-insurance-calculator",
      "shortDescription": "Estimate how medical bills and covered losses are divided across deductibles, copays, coinsurance, and out-of-pocket limits.",
      "category": "health-insurance"
    },
    {
      "name": "Car Insurance Coverage Calculator",
      "slug": "car-insurance-calculator",
      "shortDescription": "Audit your automotive coverage checklist across liability, collision, comprehensive, UM/UIM, and medical defense layers.",
      "category": "car-insurance"
    },
    {
      "name": "Car Insurance Deductible Calculator",
      "slug": "car-insurance-deductible-calculator",
      "shortDescription": "Compare vehicle collision and comprehensive deductible options ($250 to $2,500) side by side with breakeven horizons and claim costs.",
      "category": "car-insurance"
    },
    {
      "name": "Home Insurance Coverage Calculator",
      "slug": "home-insurance-calculator",
      "shortDescription": "Allocate policy limits across dwelling replacement, other structures, personal property, loss of use, and liability.",
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
      "name": "Deductible vs Premium Calculator",
      "slug": "deductible-calculator",
      "shortDescription": "Explore how deductibles impact monthly premiums, out-of-pocket claim costs, and your financial breakeven horizon across interactive scenarios.",
      "category": "car-insurance"
    },
    {
      "name": "Insurance Inflation Calculator",
      "slug": "inflation-calculator",
      "shortDescription": "Model the erosive impact of inflation on fixed death benefits and healthcare costs over 10, 20, and 30 years.",
      "category": "disability-insurance"
    },
    {
      "name": "Home Replacement-Cost Estimator",
      "slug": "home-replacement-cost-estimator",
      "shortDescription": "Estimate what it could realistically cost to rebuild your home from the foundation up using regional construction benchmarks.",
      "category": "home-insurance"
    },
    {
      "name": "Renters Insurance Coverage Calculator",
      "slug": "renters-insurance-calculator",
      "shortDescription": "Estimate the total replacement value of your personal property room by room and identify policy sub-limit risks.",
      "category": "home-insurance"
    },
    {
      "name": "Travel Insurance Coverage Checklist",
      "slug": "travel-insurance-checklist",
      "shortDescription": "Generate a personalized travel insurance review checklist covering medical evacuation, trip cancellation, delays, and credit card perks.",
      "category": "travel-insurance"
    },
    {
      "name": "Disability Income Protection Calculator",
      "slug": "disability-insurance-calculator",
      "shortDescription": "Calculate your monthly essential expense gap if an illness or accident prevents you from working.",
      "category": "disability-insurance"
    },
    {
      "name": "Business Insurance Needs Checklist",
      "slug": "business-insurance-checklist",
      "shortDescription": "Identify commercial insurance lines relevant to your business structure, premises, payroll, and operational tech.",
      "category": "business-insurance"
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
      "slug": "deductible"
    },
    {
      "term": "Premium",
      "slug": "premium"
    },
    {
      "term": "Coinsurance",
      "slug": "coinsurance"
    },
    {
      "term": "Out-of-Pocket Maximum",
      "slug": "out-of-pocket-maximum"
    },
    {
      "term": "Exclusion",
      "slug": "exclusion"
    },
    {
      "term": "Beneficiary",
      "slug": "beneficiary"
    },
    {
      "term": "Actual Cash Value (ACV)",
      "slug": "actual-cash-value"
    },
    {
      "term": "Replacement Cost Value (RCV)",
      "slug": "replacement-cost"
    }
  ],
  "qa": [
      {
      "question": "How Much Does an Insurance Lawyer Cost?",
      "slug": "how-much-does-an-insurance-lawyer-cost",
      "shortAnswer": "Most insurance and bad-faith lawyers work on contingency, meaning you pay nothing upfront and nothing at all unless they recover additional money for you \u2014 typically 25%-40% of the extra amount they win, depending on the state, the type of claim, and whether the case settles or goes to trial. Hourly billing is far less common in this practice area and usually only applies to advisory work rather than an active dispute. See our broader guide on [when to hire an insurance lawyer](/learn/when-to-hire-an-insurance-lawyer) for when this cost is actually worth paying.",
      "category": "Legal"
},

      {
      "question": "Auto Insurance Lawyer vs. Auto Insurance Attorney: Which Do You Actually Need?",
      "slug": "auto-insurance-lawyer-vs-attorney",
      "shortAnswer": "\"Auto insurance lawyer\" and \"auto insurance attorney\" are the same profession \u2014 there's no legal distinction between the two words in the US. The real question is what dispute you have: a first-party fight with your own insurer over your own vehicle's damage, or a third-party liability claim against another driver's insurer after they caused an accident. See our companion guide on [when to hire an insurance lawyer](/learn/when-to-hire-an-insurance-lawyer) for the broader decision framework this fits into.",
      "category": "Auto"
},

      {
      "question": "How does life insurance create an immediate estate",
      "slug": "how-does-life-insurance-create-an-immediate-estate",
      "shortAnswer": "Life insurance creates an 'immediate estate' because the full death benefit becomes payable as soon as the policy is in force, even if only one premium payment has been made \u2014 turning a relatively small, single payment into a much larger sum available to beneficiaries right away, rather than requiring years of saving to accumulate the same amount. This is one of the most commonly cited reasons life insurance is used in estate planning: it manufactures instant liquidity.",
      "category": "Life"
},

      {
      "question": "Can you buy life insurance for someone else",
      "slug": "can-you-buy-life-insurance-for-someone-else",
      "shortAnswer": "Yes \u2014 you can buy a life insurance policy on someone else, such as a spouse, child, parent, or business partner, as long as you have insurable interest in them and they consent to and sign the application. This is different from asking whether you can insure a random stranger (you can't); buying 'for' someone else, meaning naming them as the insured on a policy you own and pay for, is a routine and common arrangement.",
      "category": "Life"
},

      {
      "question": "Do California Attorneys Need Malpractice Insurance?",
      "slug": "attorney-malpractice-insurance-california",
      "shortAnswer": "California doesn't require most private-practice attorneys to carry malpractice (professional liability) insurance to hold a law license, but it does require disclosure: since 2011, California lawyers who lack malpractice coverage must notify clients in writing, and the State Bar requires every licensed attorney to certify their insurance status when they pay annual dues. In practice, most firms carry it anyway, since a single uninsured malpractice claim can be financially catastrophic for a solo or small-firm practitioner.",
      "category": "General"
},

      {
      "question": "Do You Need a First-Party Insurance Claim Attorney?",
      "slug": "first-party-insurance-claim-attorney",
      "shortAnswer": "You generally need a first-party insurance claim attorney when your own insurer has denied a legitimate claim, offered a settlement significantly below what your policy and the actual damage justify, or is delaying the claim without a clear, reasonable explanation \u2014 not for a straightforward claim that's being processed normally. Most attorneys in this space work on contingency (a percentage of any increased recovery), so there's typically no upfront cost to at least get an opinion on whether your case is worth pursuing.",
      "category": "General"
},

      {
      "question": "What Is KYC in Insurance?",
      "slug": "kyc-insurance",
      "shortAnswer": "KYC (Know Your Customer) in insurance is the identity-verification and risk-assessment process insurers run on new and existing policyholders to prevent fraud, money laundering, and identity theft, and to comply with anti-money-laundering (AML) regulations. It isn't a product you buy \u2014 \"KYC insurance\" typically refers to this compliance process itself, not a specific insurance policy, though it's an increasingly common step at both purchase and claim time.",
      "category": "General"
},

      {
      "question": "What Is Aviation Products Liability Insurance?",
      "slug": "aviation-products-liability-insurance",
      "shortAnswer": "Aviation products liability insurance protects manufacturers, distributors, repair stations, and sellers of aircraft, aircraft parts, or aviation equipment against claims that a defective product caused injury, death, or property damage. Because a single component failure can contribute to a catastrophic accident, this is one of the highest-stakes and most specialized liability lines in commercial insurance, almost always placed through an aviation insurance specialist rather than a general product liability insurer.",
      "category": "General"
},

      {
      "question": "How Do You Make a Successful Water Leak Insurance Claim in the UK?",
      "slug": "water-leak-insurance-claim-uk",
      "shortAnswer": "A successful UK water leak claim depends on acting fast to stop further damage, documenting everything (photos, the source of the leak, and any professional trace-and-access report) before repairs begin, and understanding that most UK buildings policies cover sudden, accidental leaks but exclude damage from gradual wear, poor maintenance, or a leak you knew about and didn't fix. This is a first-party claim, filed against your own buildings or contents policy, not a liability claim against someone else.",
      "category": "Home"
},

      {
      "question": "How Do You Get Bond Insurance Quotes?",
      "slug": "bond-insurance-quotes",
      "shortAnswer": "A surety bond quote is generated by a surety company (often through a specialist bond agent) based primarily on your personal credit score, business financials, and the specific bond type and amount required \u2014 not a generic online form. Most bond premiums range from about 1% to 15% of the total bond amount depending on credit and bond type, and you can typically get a preliminary quote within a day, though larger contract bonds require a fuller underwriting review.",
      "category": "General"
},

      {
      "question": "What Is Airport Liability Insurance?",
      "slug": "airport-liability-insurance",
      "shortAnswer": "Airport liability insurance is a specialized commercial policy covering an airport owner, operator, or ground handler against third-party claims for bodily injury or property damage occurring on airport premises or arising from airport operations \u2014 think a passenger injury in the terminal, a ground vehicle collision on the tarmac, or damage to an aircraft during ground handling. It's a distinct product from standard general liability insurance because aviation-specific risks (aircraft, fueling, ground equipment) usually fall outside a standard commercial general liability policy.",
      "category": "General"
},

      {
      "question": "What Does \"Planned Care\" Mean in an Insurance Policy?",
      "slug": "planned-care",
      "shortAnswer": "\"Planned care\" refers to medical treatment that's scheduled in advance rather than needed urgently \u2014 the opposite of emergency or urgent care. In health and travel insurance policies, this distinction matters because planned care (like a pre-scheduled surgery or a known ongoing treatment) is often subject to pre-authorization requirements, waiting periods, or exclusions that emergency care isn't. It isn't the name of a single insurance company; it's a coverage-timing category that appears across many different insurers' policy wording.",
      "category": "Health"
},

      {
      "question": "What Is an Insured Closing Letter?",
      "slug": "insured-closing-letter",
      "shortAnswer": "An Insured Closing Letter (ICL), also called a closing protection letter (CPL), is a document a title insurance underwriter issues to a mortgage lender promising to reimburse the lender for certain losses caused by the closing agent's fraud, theft, or failure to follow the lender's written closing instructions. It's a real estate and title insurance term, not a general commercial insurance product \u2014 it protects the lender specifically, not the buyer or seller.",
      "category": "General"
},

      {
      "question": "What Is Cast Insurance in Film and TV Production?",
      "slug": "cast-insurance",
      "shortAnswer": "Cast insurance is a specialized production insurance coverage that reimburses a film, TV, commercial, or live production for extra costs \u2014 reshoots, delays, recasting, or cancellation \u2014 if a covered cast member becomes unable to perform due to illness, injury, or death. It's typically one piece of a broader production insurance package that also covers negative film, sets, and equipment. See our broader [niche commercial insurance guide](/learn/niche-commercial-insurance-hotels-marinas-malpractice) for how this fits alongside other specialty lines.",
      "category": "General"
},

      {
      "question": "Colonial Penn life insurance rate chart by age",
      "slug": "colonial-penn-life-insurance-rate-chart-by-age",
      "shortAnswer": "Colonial Penn doesn't publish one universal rate chart \u2014 its guaranteed acceptance whole life insurance is priced per \"unit\" of coverage, with the price per unit varying by your age, gender (except in Montana), and state of residence, starting at locked-in rates as low as $9.95 a month for the smallest unit. Because exact per-age pricing varies by state and gender, getting a personalized quote directly from Colonial Penn is the only way to see your actual rate.",
      "category": "Life"
},

      {
      "question": "How long does life insurance last",
      "slug": "how-long-does-life-insurance-last",
      "shortAnswer": "It depends on the policy type: term life insurance lasts a fixed period, commonly 10 to 30 years, and simply ends unless renewed or converted; whole life insurance is designed to last your entire lifetime as long as premiums are paid; and universal life insurance is flexible but can lapse before death if its cash value isn't sufficient to cover its internal cost of insurance.",
      "category": "Life"
},

      {
      "question": "How to use life insurance while alive",
      "slug": "how-to-use-life-insurance-while-alive",
      "shortAnswer": "You can access value from a life insurance policy while alive in two main ways: borrowing against or withdrawing from a permanent policy's accumulated cash value, or using an accelerated death benefit rider (increasingly common on both term and permanent policies) that pays out a portion of the death benefit early if you're diagnosed with a qualifying terminal or chronic illness. Term life insurance without such a rider generally offers no way to access money while you're alive.",
      "category": "Life"
},

      {
      "question": "How long does life insurance payout take",
      "slug": "how-long-does-life-insurance-payout-take",
      "shortAnswer": "Most life insurance claims are paid within 30 to 60 days once the insurer receives complete documentation (typically a certified death certificate and a completed claim form), and many states set a statutory outer limit around 60 days before an insurer can face bad-faith liability for delay. A death occurring within the policy's first two years can take longer, since it may trigger a contestability review of the original application.",
      "category": "Life"
},

      {
      "question": "How much life insurance do I need",
      "slug": "how-much-life-insurance-do-i-need",
      "shortAnswer": "A common starting point is 10 to 15 times your annual income, refined using the DIME method: add up your outstanding Debt, the Income you want to replace for a set number of years, your remaining Mortgage balance, and future Education costs for any children, then subtract existing savings and coverage. The right number depends on your specific dependents, debts, and goals more than any single rule of thumb.",
      "category": "Life"
},

      {
      "question": "Is life insurance an asset",
      "slug": "is-life-insurance-an-asset",
      "shortAnswer": "It depends on the policy type: a permanent life insurance policy (whole or universal life) builds cash value that you can borrow against, withdraw, or surrender for cash, making it a genuine asset you can list on a personal financial statement. Term life insurance has no cash value while you're alive, so it isn't an asset in the traditional sense \u2014 it only creates value for beneficiaries if a death benefit is actually paid.",
      "category": "Life"
},

      {
      "question": "Can you get life insurance on anyone",
      "slug": "can-you-get-life-insurance-on-anyone",
      "shortAnswer": "No \u2014 every U.S. state requires the person buying a life insurance policy to have insurable interest in the person being insured, meaning a genuine financial or family relationship such that the insured person's death would cause real financial hardship. You generally also need the insured person's knowledge and signed consent before a policy can be issued on their life.",
      "category": "Life"
},

      {
      "question": "Is life insurance a scam",
      "slug": "is-life-insurance-a-scam",
      "shortAnswer": "No, life insurance is not a scam \u2014 it's a legitimate, heavily regulated financial product, with every carrier licensed at the state level and every state maintaining a guaranty association that backs claims if an insurer fails. The \"scam\" perception usually comes from specific, avoidable problems: a mismatch between the policy type sold and the buyer's actual need, unclear disclosure about cash-value growth, or a policy that lapsed after years of premiums \u2014 not fraud in the product category itself.",
      "category": "Life"
},

      {
      "question": "John Hancock life insurance customer service",
      "slug": "john-hancock-life-insurance-customer-service",
      "shortAnswer": "John Hancock routes customer service by product line rather than a single general number: traditional in-force life insurance customer service is 800-505-9427, term life sales support is 866-595-7361, and long-term care customer service is 800-377-7311, all Monday-Friday during Eastern Time business hours. Because these lines are product-specific, using the exact number tied to your policy type \u2014 found on your policy documents \u2014 gets you connected faster than a generic search result.",
      "category": "Life"
},

      {
      "question": "John Hancock life insurance",
      "slug": "john-hancock-life-insurance",
      "shortAnswer": "John Hancock is a real, well-established U.S. life insurance brand founded in 1862 and owned by Manulife since 2004, carrying an A+ (Superior) AM Best rating. It offers term, whole, and universal (including indexed and variable) life insurance, and is best known for its Vitality program, which rewards healthy habits with premium discounts of up to 25%, though its J.D. Power customer satisfaction scores run below the industry average.",
      "category": "Life"
},

      {
      "question": "Essentia insurance",
      "slug": "essentia-insurance",
      "shortAnswer": "Essentia Insurance Company is a real specialty insurer, owned by Markel Corporation since 2013, that exclusively underwrites classic car, vintage boat, motorcycle, and other collector-vehicle insurance policies sold through Hagerty Insurance Agency and Hagerty Classic Marine Insurance Agency. If you have a Hagerty-branded classic car or boat policy, Essentia is the company actually underwriting and paying your claims behind the scenes.",
      "category": "Auto"
},

      {
      "question": "NYAIP",
      "slug": "nyaip",
      "shortAnswer": "NYAIP stands for the New York Automobile Insurance Plan, the state's assigned-risk auto insurance mechanism for drivers who cannot obtain coverage in the voluntary market. Established under Article 53 of the New York Insurance Law and administered through AIPSO's NYPASS system, NYAIP assigns high-risk drivers to a participating insurance company based on that insurer's market share, at rates typically 60-90% higher than standard voluntary-market policies.",
      "category": "Auto"
},

      {
      "question": "New York Marine and General Insurance Company",
      "slug": "new-york-marine-and-general-insurance-company",
      "shortAnswer": "New York Marine and General Insurance Company is a real, New York-domiciled specialty insurer (originally incorporated in 1972 as New York Marine Insurance Company, renamed in 1979) that writes ocean marine, aviation, and general casualty insurance, and has operated as part of ProSight Specialty Insurance Group since 2010. It is a distinct company from NYCM (New York Central Mutual), a separate personal-lines auto and home insurer, despite the similar names and frequent search confusion between the two.",
      "category": "General"
},

      {
      "question": "Plymouth Rock insurance quote",
      "slug": "plymouth-rock-insurance-quote",
      "shortAnswer": "You can get a Plymouth Rock Assurance auto or home insurance quote online at their official website, by phone, or through an independent agent, since Plymouth Rock offers multiple purchase channels unlike some regional competitors. Plymouth Rock Assurance Group carries an A- (Excellent) AM Best rating and writes over $1 billion in combined annual auto and homeowners premium, primarily in the Northeast U.S.",
      "category": "Auto"
},

      {
      "question": "Is Able Auto Insurance Legit?",
      "slug": "able-auto-insurance",
      "shortAnswer": "Yes. Able Insurance Agency (also marketed as Able Auto Insurance) is a legitimate, long-established independent insurance agency that has written auto insurance in North and South Carolina since 1989. It's a member of the Professional Insurance Agents of North Carolina and the Auto Insurance Agents of North Carolina, operates multiple physical branch locations, and is BBB accredited, but like any independent agency, it shops your policy across multiple carriers rather than underwriting coverage itself.",
      "category": "Auto"
},

      {
      "question": "How Do You Get a Quote From Erie Insurance?",
      "slug": "quote-erie-insurance",
      "shortAnswer": "You can start an Erie Insurance quote online at erieinsurance.com, but the company will connect you with a local independent agent to finalize pricing and bind coverage \u2014 Erie doesn't sell policies entirely online. Erie is a legitimate, well-rated regional insurer, holding an A+ (Superior) rating from AM Best and ranking as the 12th-largest US auto and home insurer by market share, but it's only available in 12 states plus Washington, D.C.",
      "category": "Auto"
},

      {
      "question": "What Is the Haven Insurance Contact Number?",
      "slug": "haven-insurance-contact-number",
      "shortAnswer": "For UK motor insurance claims, Haven's claims handling team can be reached at 0345 092 0700 (windscreen claims: 0345 092 0703), while household claims go through 0330 331 0747, according to its underwriting administrator's published claims page. Haven Insurance Company Limited is an active, independent, privately owned UK specialist motor and home insurer covering more than 230,000 policyholders, distributed through Acorn Insurance and a network of around 200 sub-brokers \u2014 it is not the same company as the unrelated, US-based Haven Insurance Group agency in Atlanta.",
      "category": "Auto"
},

      {
      "question": "Is Accusure Insurance Legit?",
      "slug": "accusure-insurance",
      "shortAnswer": "There isn't one single national company behind the name \"Accusure Insurance\" \u2014 it's used by at least two unrelated businesses, including Accu-Sure Insurance Agency in Geneva, New York, and a separate Accusure Insurance partnership licensed across Florida, Georgia, Tennessee, and Michigan. Neither should be confused with Acrisure, a much larger, well-known insurance broker and financial technology company headquartered in Michigan. Each specific business needs to be verified individually before you buy.",
      "category": "General"
},

      {
      "question": "Is The Responsive Auto Insurance Company Legit?",
      "slug": "the-responsive-auto-insurance",
      "shortAnswer": "Yes. The Responsive Auto Insurance Company is a legitimate, licensed non-standard auto insurer founded in 2007 and headquartered in Plantation, Florida, specializing in personal auto insurance sold through a network of independent agents across South Florida. It underwrites policies directly rather than just brokering them, and operates several distinct coverage programs to serve different risk profiles.",
      "category": "Auto"
},

      {
      "question": "Is Smart Auto Insurance Legit?",
      "slug": "smart-auto-insurance",
      "shortAnswer": "There isn't one single national company called \"Smart Auto Insurance\" \u2014 the phrase is used generically by several unrelated agencies and products, including a UK motor and gadget insurance brand (Smart Insurance, since transferred to AutoProtect (MBI) Ltd) and various small US agencies marketing themselves with the word 'smart.' Legitimacy has to be checked for the specific business behind whatever quote or policy you actually received, the same way it does for [\"Amigo Insurance\"](/qa/is-amigo-insurance-legit).",
      "category": "Auto"
},

      {
      "question": "What Is My Adrian Flux (MyAccount)?",
      "slug": "my-adrian-flux",
      "shortAnswer": "\"My Adrian Flux\" refers to the online customer account portal run by Adrian Flux Insurance Services, the UK's largest specialist motor insurance broker, where policyholders log in to view documents, make payments, and manage renewals. Adrian Flux itself is a long-established, legitimate brokerage founded in 1973, based in King's Lynn, Norfolk, and employing roughly 1,800 staff, specializing in hard-to-insure vehicles like classic cars, modified cars, and kit cars.",
      "category": "Auto"
},

      {
      "question": "Is Amtex Auto Insurance Legit?",
      "slug": "amtex-auto-insurance",
      "shortAnswer": "Yes. Amtex Insurance is a legitimate, family-founded independent insurance agency headquartered in Texas, operating since 1999 with more than 85 locations statewide and an A+ Better Business Bureau rating. It's an independent agency, not an underwriting carrier, meaning it shops your auto, home, renters, commercial, and Mexico travel insurance needs across multiple carriers rather than insuring you directly.",
      "category": "Auto"
},

      {
      "question": "How to start an insurance business",
      "slug": "how-to-start-an-insurance-agency-business",
      "shortAnswer": "To start an insurance business, you need to get licensed as a producer in your state (pre-licensing education where required, a passed state exam, and a background check), decide between a captive model (one carrier) or an independent model (multiple carriers, often through a cluster or aggregator), secure errors & omissions (E&O) insurance, get carrier appointments, and write a business plan covering your target market, revenue projections, and client-acquisition strategy before you write your first policy.",
      "category": "General"
},

      {
      "question": "How to sell commercial insurance",
      "slug": "how-to-sell-commercial-insurance",
      "shortAnswer": "Selling commercial insurance well means running a real risk assessment (often including a site visit), tailoring coverage across general liability, commercial auto, workers' compensation, and property rather than offering a templated package, and building trust through industry-specific expertise since commercial buyers evaluate an agent on understanding of their business, not just price. Commercial lines pay higher commissions than personal lines (often 10-20% versus 8-15%) but require a longer, more consultative sales cycle.",
      "category": "General"
},

      {
      "question": "How to get clients for insurance business",
      "slug": "how-to-get-clients-for-insurance-business",
      "shortAnswer": "The most reliable ways to get clients for an insurance business are local referral partnerships (real estate agents, mortgage brokers, auto dealers), a strong Google Business Profile since most shoppers search \"insurance agency near me,\" cross-selling and account rounding your existing book, niche commercial specialization, and an interactive quote tool on your own website that captures leads instead of losing them.",
      "category": "General"
},

      {
      "question": "Insurance agency business plan",
      "slug": "insurance-agency-business-plan",
      "shortAnswer": "A solid insurance agency business plan covers six core pieces: an executive summary of your captive-vs-independent model and target lines, a market analysis of local competition and niches, a carrier strategy, realistic revenue projections built on industry commission ranges (not best-case numbers), a startup and operating budget, and a specific client-acquisition plan. Lenders and carrier appointment committees both use this document to judge whether your numbers are grounded in reality.",
      "category": "General"
},

      {
      "question": "How much do insurance agencies make",
      "slug": "how-much-do-insurance-agencies-make",
      "shortAnswer": "How much insurance agencies make depends heavily on whether you mean an individual agent's paycheck or an agency's total business revenue. The U.S. Bureau of Labor Statistics reports a median annual wage of $60,370 for insurance sales agents as of May 2024, but a full agency's income is commission across its entire book of clients \u2014 typically 8-15% on personal auto/home lines and 10-20% on commercial lines, plus contingency bonuses from carriers, and its resale value is usually priced at a multiple of revenue or EBITDA.",
      "category": "General"
},

      {
      "question": "Insurance agencies near me",
      "slug": "insurance-agencies-near-me-independent-vs-captive",
      "shortAnswer": "When several insurance agencies near me show up in a search, the fastest way to narrow them down is to sort by captive versus independent: captive agencies near you sell one carrier's products, while independent agencies near you shop your risk across multiple carriers and can usually show you a side-by-side comparison. Confirm licensing for whichever ones you shortlist, then compare at least two independent and one captive quote if you can.",
      "category": "General"
},

      {
      "question": "Insurance agency near me",
      "slug": "insurance-agency-near-me",
      "shortAnswer": "When you search for an insurance agency near me, the right choice isn't necessarily the first or highest-rated result \u2014 it's whichever local agency is properly licensed in your state, transparent about which carriers it represents, and has a service record you can independently verify. Use your state Department of Insurance's producer lookup and a review platform filtered to the specific branch before choosing.",
      "category": "General"
},

      {
      "question": "Smart auto insurance",
      "slug": "what-is-smart-auto-insurance",
      "shortAnswer": "\"Smart auto insurance\" returns at least three different things depending on what you actually mean: the UK brand \"Smart Insurance,\" whose policies have been administered by AutoProtect (MBI) Ltd since a 2018 acquisition and carries mixed reviews; U.S. comparison platforms like SmartFinancial that shop your quote across multiple partner carriers rather than underwriting policies themselves; and insurance specifically for a Mercedes-Benz Smart Fortwo. None of these are the same product, so the right next step depends on which one prompted your search.",
      "category": "Auto"
},

      {
      "question": "Puffin travel insurance",
      "slug": "is-puffin-travel-insurance-good",
      "shortAnswer": "Puffin Travel Insurance is a UK-regulated direct travel and pet insurance brand (a trading name of Puffin Group UK Ltd, authorised and regulated by the Financial Conduct Authority) whose policies are actually underwritten by AXA-group company Inter Partner Assistance S.A., with gadget claims underwritten separately by Great Lakes Insurance UK. It's generally well reviewed for competitive pricing and generous medical and gadget limits, but its cancellation benefit is capped and only pays for a closed list of named reasons, so it's worth reading that section closely before an expensive trip.",
      "category": "General"
},

      {
      "question": "Amtex auto insurance",
      "slug": "is-amtex-auto-insurance-legit",
      "shortAnswer": "Amtex Insurance is a real, long-running Texas independent insurance agency \u2014 not a single underwriting carrier \u2014 founded in 1999, headquartered in Houston, and now operating 85+ locations statewide. It shops auto, home, renters, commercial, and Mexico-travel coverage across roughly 30 partner carriers rather than underwriting policies itself, so the legitimacy of any specific policy also depends on which of those partner carriers ends up on your declarations page.",
      "category": "Auto"
},

      {
      "question": "Amigo insurance",
      "slug": "what-is-amigo-insurance",
      "shortAnswer": "\"Amigo insurance\" isn't one company \u2014 it's a name shared by at least three unrelated businesses: AmigoMex, which sells short-term auto liability insurance for U.S. and Canadian drivers heading into Mexico and is licensed in Arizona, California, and Texas; Amigo Insurance Agency, a Midwest independent agency network; and various locally branded shops such as Amigos Auto Insurance in the Houston area. None of these are affiliated with each other, so the right first step is confirming the exact legal business name on whatever quote or card you're looking at.",
      "category": "Auto"
},

      {
      "question": "Allstate home insurance quote",
      "slug": "allstate-home-insurance-quote",
      "shortAnswer": "You can get an Allstate homeowners insurance quote online at allstate.com, through a local Allstate agent, or by phone, and it typically only takes your address, home details, and a few minutes to generate an initial estimate. The price you're quoted depends on your dwelling's replacement cost (not market value), location-based catastrophe exposure, roof age and material, prior claims history, and any bundling or protective-device discounts, so the number can move once an agent verifies those details.",
      "category": "Home"
},

      {
      "question": "Dairyland insurance phone number",
      "slug": "dairyland-insurance-phone-number",
      "shortAnswer": "Dairyland Insurance's officially published numbers are 800-334-0090 for customer service and claims, 888-344-4357 for auto quotes, and 866-324-7952 for motorcycle quotes (quote lines run Mon\u2013Fri 6am\u20139pm and Sat 7am\u20136pm CT). The safest source is always dairylandinsurance.com or your own ID card, since many third-party \"contact\" pages list outdated or incorrect numbers.",
      "category": "Auto"
},

      {
      "question": "What Is QuoteLab?",
      "slug": "what-is-quotelab",
      "shortAnswer": "QuoteLab is an online insurance marketplace and lead-generation platform, not an insurance company. Based in Los Angeles and founded around 2010\u20132012, QuoteLab connects consumers with insurance agents and carriers who then contact them with quotes, primarily for auto insurance. It operates as part of MediaAlpha, a publicly traded (Nasdaq: MAX) customer-acquisition technology company for the insurance industry, which acquired QuoteLab.",
      "category": "General"
},

      {
      "question": "Is Insure 90 a Legitimate Insurance Company?",
      "slug": "is-insure-90-legit",
      "shortAnswer": "\"Insure 90\" is not one identifiable, licensed insurance company \u2014 the term is a mix of at least three unrelated things that happen to share similar wording: a legacy insurance-agency software system (I/90, sometimes called Insure90), the insurance concept of a 90% coinsurance requirement, and various small, unrelated quote or agency sites using '90' in their name or marketing. There is no single national carrier operating under this exact brand, so it can't be verified as legitimate or illegitimate as a company \u2014 you need to identify the specific business behind whatever quote or policy you actually received.",
      "category": "General"
},

      {
      "question": "Is Amigo Insurance Legit?",
      "slug": "is-amigo-insurance-legit",
      "shortAnswer": "There isn't one single national company called \"Amigo Insurance\" \u2014 the name is used by several unrelated independent insurance agencies across different states, most commonly serving non-standard auto insurance to Spanish-speaking communities. Legitimacy has to be checked agency by agency: some are properly licensed independent agencies placing policies with major carriers, while the name itself offers no guarantee on its own.",
      "category": "Auto"
},

      {
      "question": "Is Puffin Travel Insurance Legit and Worth Buying?",
      "slug": "is-puffin-travel-insurance-legit",
      "shortAnswer": "Yes, Puffin Travel Insurance is a legitimate, UK-regulated travel insurer. It's a trading name of Puffin Group UK Ltd, authorised and regulated by the Financial Conduct Authority, with policies underwritten by Inter Partner Assistance S.A., part of the AXA Group. Independent reviews generally rate it good value, with strong medical and gadget cover limits, though its cancellation cover cap and closed list of covered cancellation reasons are worth checking before you buy.",
      "category": "General"
},

      {
      "question": "Is Essentia Insurance a Legitimate Company?",
      "slug": "is-essentia-insurance-legit",
      "shortAnswer": "Yes. Essentia Insurance Company is a legitimate, established insurer based in Glen Allen, Virginia, and a wholly owned subsidiary of Markel Corporation (NYSE: MKL), a large, publicly traded specialty insurance group. Essentia is best known as the exclusive underwriter behind Hagerty's classic car, motorcycle, and classic boat insurance policies, and it carries a strong financial strength rating.",
      "category": "Auto"
},

      {
      "question": "Is NYCM a Good Insurance Company?",
      "slug": "is-nycm-a-good-insurance-company",
      "shortAnswer": "Yes, for the market it serves. New York Central Mutual (NYCM) consistently earns strong marks for affordability, a favorable NAIC complaint index, and solid AM Best financial strength ratings on both its auto and home insurance lines. Its main limitations are geographic: it only writes policies in New York State, doesn't offer instant online quotes, and has fewer add-on coverage options than larger national carriers.",
      "category": "General"
},

      {
      "question": "Is Bamboo Insurance Admitted in California?",
      "slug": "is-bamboo-insurance-admitted-in-california",
      "shortAnswer": "It depends on the specific policy. Bamboo Insurance is a managing general agent (MGA), not an insurance company itself, and it places California homeowners coverage through several different underwriting carriers \u2014 some admitted, some surplus lines (non-admitted). Since 2025 it has expanded admitted capacity through partners like Sutton National and MS Transverse, alongside an E&S 'Signature' surplus-lines product. Always check the underwriting carrier's name on your own declarations page rather than assuming Bamboo's status covers your specific policy.",
      "category": "Home"
},

      {
      "question": "Is Slide Insurance Going Out of Business?",
      "slug": "is-slide-insurance-going-out-of-business",
      "shortAnswer": "No. Slide Insurance is not going out of business. It is a publicly traded company (NASDAQ: SLDE) that reported strong quarterly earnings through 2026 and has actively expanded beyond its original Florida homeowners base into California, New York, New Jersey, and Rhode Island. The rumors largely stem from confusion with unrelated Florida market turmoil, including Citizens Property Insurance policyholder shuffles and other insurers' financial troubles.",
      "category": "Home"
},

      {
      "question": "Does car insurance cover vandalism, and will filing a claim raise your rates?",
      "slug": "does-car-insurance-cover-vandalism",
      "shortAnswer": "Yes, car insurance covers vandalism (including keyed paint, slashed tires, broken windows, and graffiti), provided you carry Comprehensive Coverage on your auto policy. Comprehensive coverage pays to repair malicious damage minus your selected deductible. Because vandalism is classified as a non-fault event outside your operational control, filing a single vandalism claim rarely causes substantial rate increases, though multiple claims in a short window or state-specific underwriting rules can affect your renewal tier.",
      "category": "Auto"
},

      {
          "question": "Can an insurance company drop you or cancel your policy after you file a claim?",
          "slug": "can-insurance-drop-you-after-a-claim",
          "shortAnswer": "In most jurisdictions, an insurer cannot immediately cancel your policy mid-term solely because you filed a single legitimate claim, unless there was proven fraud, material misrepresentation, or non-payment. However, they are legally permitted to non-renew your policy when the term expires (typically every 6 or 12 months) by providing advance written notice.",
          "category": "Auto"
      },
      {
          "question": "Does health insurance cover pre-existing conditions, and can an insurer deny you?",
          "slug": "does-health-insurance-cover-pre-existing-conditions",
          "shortAnswer": "Under the Affordable Care Act (ACA), major medical individual and employer health plans cannot deny coverage, charge higher premiums, or exclude treatment for pre-existing conditions. However, non-ACA plans such as short-term health insurance, health sharing ministries, and travel medical policies can and routinely do deny or restrict pre-existing condition coverage.",
          "category": "Health"
      },
      {
          "question": "Is a life insurance payout taxable to the beneficiary?",
          "slug": "is-life-insurance-payout-taxable",
          "shortAnswer": "In general, life insurance death benefit payouts received as a lump sum by a named beneficiary are 100% free of federal and state income tax. However, interest accrued on delayed payouts, installment payout plans, estate-owned policies exceeding federal estate tax thresholds, or policies transferred for valuable consideration may incur income or estate taxes.",
          "category": "Life"
      },
      {
          "question": "What happens legally and financially if you get into a car crash without insurance?",
          "slug": "what-happens-if-you-crash-without-insurance",
          "shortAnswer": "Driving without insurance and causing an accident results in catastrophic personal financial liability and severe legal penalties. You are personally liable for 100% of all medical bills, property damages, and legal judgments out of pocket. Legally, authorities can suspend your driver's license, impound your vehicle, impose thousands in fines, and mandate SR-22 high-risk insurance for years.",
          "category": "Auto"
      },
      {
          "question": "Does homeowners insurance cover water damage from burst pipes, leaks, or flooding?",
          "slug": "does-homeowners-insurance-cover-water-damage",
          "shortAnswer": "Homeowners insurance covers water damage only if it is sudden, accidental, and internal—such as a burst pipe, water heater rupture, or sudden dishwasher hose failure. It strictly excludes flood damage from rising outdoor water, storm surges, sewer or drain backups (unless you purchased a specific endorsement), and gradual damage from unresolved leaks or poor maintenance.",
          "category": "Home"
      },
      {
          "question": "Can you cancel an insurance policy at any time and get a prorated refund?",
          "slug": "can-you-cancel-insurance-anytime-get-refund",
          "shortAnswer": "Yes, you have the legal right to cancel an insurance policy at any point during its term. You are entitled to a refund of any unused, prepaid premiums. Most personal auto, home, and life policies calculate refunds on a 100% pro-rata basis, though some carriers apply a modest 'short-rate' cancellation penalty (usually around 10% of unearned premium) if you cancel early.",
          "category": "General"
      },
      {
          "question": "Why did my car insurance premium increase even though I had no accidents or tickets?",
          "slug": "why-did-car-insurance-go-up-without-accidents",
          "shortAnswer": "Car insurance rates can increase substantially without any tickets or accidents due to macroeconomic rate revisions, rising vehicle repair costs, increased frequency of catastrophic weather losses in your zip code, insurance credit score changes, and widespread insurance industry underwriting adjustments across your state.",
          "category": "Auto"
      },
      {
          "question": "Is whole life insurance actually a good investment compared to term life?",
          "slug": "term-vs-whole-life-which-is-better-investment",
          "shortAnswer": "For over 95% of consumers, whole life insurance is an inefficient, expensive investment vehicle. Whole life policies cost 5 to 15 times more than equivalent term life insurance for the same death benefit, with heavy administrative fees eating into returns for the first 5 to 10 years. The classic strategy of 'buying term and investing the difference' in low-cost index funds consistently yields far greater net wealth.",
          "category": "Life"
      },
      {
          "question": "Does health insurance cover emergency room visits if the hospital is out-of-network?",
          "slug": "does-health-insurance-cover-er-visits-out-of-network",
          "shortAnswer": "Yes. Under federal law (the No Surprises Act and the Affordable Care Act), all health plans must cover emergency room medical care at in-network cost-sharing levels, even if the hospital, physicians, or emergency providers are completely out-of-network. Emergency providers are strictly prohibited from balance billing you for anything above your normal in-network copays and coinsurance.",
          "category": "Health"
      },
      {
          "question": "How much does insurance pay out on a claim: Actual Cash Value or Replacement Cost?",
          "slug": "what-is-actual-cash-value-vs-replacement-cost-claim",
          "shortAnswer": "How much your insurance pays depends on your policy's valuation clause. Replacement Cost Value (RCV) pays the full current retail cost to replace damaged property with new materials of like kind and quality, with zero deduction for depreciation. Actual Cash Value (ACV) pays only the depreciated fair market value (Replacement Cost minus age, wear, and tear), resulting in dramatically smaller claim payouts.",
          "category": "Home"
      },
      {
          "question": "How much life insurance coverage do you really need? (The 10x Rule vs DIME Method)",
          "slug": "how-much-life-insurance-do-i-need-rule-of-thumb",
          "shortAnswer": "While the traditional rule of thumb recommends purchasing 10 to 12 times your annual income, the most accurate actuarial framework is the D.I.M.E. method (Debt, Income replacement, Mortgage payoff, and Education funding). For most working parents with mortgages and young children, adequate coverage typically lands between 12 and 18 times annual earnings.",
          "category": "Life"
      },
      {
          "question": "Does your personal auto insurance cover rental cars, or do you need rental counter coverage?",
          "slug": "does-car-insurance-cover-rental-cars",
          "shortAnswer": "In the United States and Canada, your personal auto insurance coverage (comprehensive, collision, and liability) typically transfers directly to a rental car driven for personal pleasure, up to your existing policy limits and deductibles. However, personal policies almost never cover 'loss of use' administrative fees charged by rental companies, and do not provide coverage internationally.",
          "category": "Auto"
      },
      {
          "question": "What should you do if your health insurance claim is denied? (Step-by-step appeal process)",
          "slug": "what-happens-if-health-insurance-claim-denied",
          "shortAnswer": "If your health insurance claim is denied, you have a legally protected right under federal law to appeal the decision through both internal appeals and external independent review. Over 50% of health insurance appeals that reach external review are overturned in favor of the patient. Never ignore a denial or immediately pay the hospital bill.",
          "category": "Health"
      },
      {
          "question": "Does renters insurance cover items stolen from your car, hotel, or while traveling?",
          "slug": "does-renters-insurance-cover-theft-outside-home",
          "shortAnswer": "Yes! A standard renters insurance policy (HO-4) includes 'off-premises' personal property coverage, protecting your belongings anywhere in the world. If your laptop, luggage, or camera is stolen from your car's trunk, a hotel room, or a coffee shop, your renters insurance reimburses the loss (minus your deductible), subject to off-premises policy limits.",
          "category": "Renters"
      },
      {
          "question": "Do you need both short-term and long-term disability insurance, or is one enough?",
          "slug": "short-term-vs-long-term-disability-do-you-need-both",
          "shortAnswer": "Long-term disability (LTD) is an absolute non-negotiable necessity for every working adult, while short-term disability (STD) is optional if you maintain a robust 3- to 6-month emergency cash fund. A short-term illness causes temporary inconvenience, but a multi-year or permanent disability causes total catastrophic financial ruin without long-term coverage.",
          "category": "Disability"
      },
      {
          "question": "Can I insure a car not in my name?",
          "slug": "can-i-insure-a-car-not-in-my-name",
          "shortAnswer": "Yes, you can insure a car not in your name, but it is challenging because insurance companies require an 'insurable interest'—a demonstrable financial stake in the vehicle. While most standard insurers prefer the registered owner and policyholder to match, you can legally obtain coverage by being added as a primary driver to the owner's policy, proving joint residency, purchasing a non-owner car insurance policy, or having the owner list you as an additional interest.",
          "category": "Auto"
      },
      {
          "question": "Can you insure a car not in your name?",
          "slug": "can-you-insure-a-car-not-in-your-name",
          "shortAnswer": "Yes, you can insure a car not in your name under specific legal arrangements, though underwriters generally require the policyholder to hold an insurable interest in the automobile. Common pathways include adding your name to the existing owner's policy, naming the legal titleholder as an additional insured or loss payee on your policy, or purchasing non-owner liability coverage.",
          "category": "Auto"
      },
      {
          "question": "How much is a CT scan with insurance?",
          "slug": "how-much-is-a-ct-scan-with-insurance",
          "shortAnswer": "With insurance, a CT scan typically costs between $150 and $1,200 out of pocket, depending on whether you have met your annual deductible, your plan's coinsurance rate (usually 10% to 30%), and whether the scan is performed at an independent imaging clinic versus an outpatient hospital facility. If your deductible has not been met, you will pay the insurer's contracted negotiated rate in full, which averages $500 to $1,500.",
          "category": "Health"
      },
      {
          "question": "How long does an accident stay on your insurance?",
          "slug": "how-long-does-an-accident-stay-on-your-insurance",
          "shortAnswer": "An at-fault accident typically stays on your auto insurance record and affects your premium rates for 3 to 5 years. Most insurance carriers apply rate surcharges for exactly 36 months (3 years) following the date of loss. However, for severe accidents involving major moving violations, DUIs, or total vehicle write-offs, carriers can maintain surcharges or keep you in a non-standard high-risk tier for up to 5 or even 7 years.",
          "category": "Auto"
      },
      {
          "question": "Does renters insurance cover firearms?",
          "slug": "does-renters-insurance-cover-firearms",
          "shortAnswer": "Yes, standard renters insurance policies cover firearms, but only up to a specific personal property sub-limit—typically $1,500 to $2,500 total for theft. While perils like fire, smoke, and tornado cover your guns up to your policy's overall Coverage C personal property limit, firearms stolen from your apartment or vehicle are subject to this strict dollar cap unless you purchase a scheduled personal property endorsement.",
          "category": "Renters"
      },
      {
          "question": "Is it against the law to drive without insurance?",
          "slug": "is-it-against-the-law-to-drive-without-insurance",
          "shortAnswer": "Yes, it is strictly against the law to drive without insurance in almost every US state and developed nation. In 49 out of 50 US states (with New Hampshire maintaining strict alternative financial responsibility proof), state law mandates that all registered motor vehicles carry minimum bodily injury and property damage liability coverage. Operating an uninsured vehicle results in immediate misdemeanor citations, license suspension, vehicle impoundment, heavy fines, and mandatory SR-22 filings.",
          "category": "Auto"
      },
      {
          "question": "Does liability insurance cover theft?",
          "slug": "does-liability-insurance-cover-theft",
          "shortAnswer": "No, liability insurance never covers theft of your own property or vehicle. Liability insurance is strictly third-party coverage designed to pay for bodily injuries and property damage you cause to other people. To protect your vehicle against theft, car break-ins, or stolen parts (like catalytic converters), you must carry Comprehensive Coverage on your auto policy. For stolen personal belongings, coverage comes from homeowners or renters insurance.",
          "category": "Auto"
      },
      {
          "question": "Is vasectomy covered by insurance?",
          "slug": "is-vasectomy-covered-by-insurance",
          "shortAnswer": "Yes, vasectomies are covered by most major health insurance plans, but coverage is not universally 100% free. Unlike female sterilization (tubal ligation), which the Affordable Care Act (ACA) mandates must be covered with $0 copay as preventive care, male sterilization rules vary. In most employer and private plans, vasectomies are covered subject to your standard deductible and specialist copay (typically $150 to $600 out-of-pocket), though several states now legally mandate zero-cost vasectomy coverage.",
          "category": "Health"
      },
      {
          "question": "Can you have two health insurances?",
          "slug": "can-you-have-two-health-insurances",
          "shortAnswer": "Yes, you can legally have two health insurance plans at the same time. This is known as dual coverage or secondary coverage. When you are covered by two policies—such as your own employer plan and a spouse's employer plan—the insurers do not pay double. Instead, they use a strict legal framework called Coordination of Benefits (COB) to assign one plan as Primary (paying first) and the other as Secondary (paying remaining copays and deductibles).",
          "category": "Health"
      },
      {
          "question": "Can I refuse a recorded statement to insurance company?",
          "slug": "can-i-refuse-a-recorded-statement-to-insurance-company",
          "shortAnswer": "Yes, you have an absolute legal right to refuse a recorded statement to the OTHER driver's insurance company (third-party insurer). You are under no legal obligation to speak with them or be recorded. However, you generally CANNOT refuse a statement to your OWN insurance company (first-party insurer), because your policy contract contains a mandatory 'Duty to Cooperate' clause. Refusing to cooperate with your own insurer can lead to claim denial or policy cancellation.",
          "category": "Legal"
      },
      {
          "question": "Can you sue someone after settling with their insurance?",
          "slug": "can-you-sue-someone-after-settling-with-their-insurance",
          "shortAnswer": "No, in virtually all circumstances, you cannot sue someone after settling with their insurance company. When you accept an insurance settlement check, the insurance company requires you to sign a legally binding document called a 'Release of All Claims'. This contract permanently extinguishes your right to pursue the at-fault party or their insurer for any additional damages, medical bills, or pain and suffering arising from that accident, even if new injuries appear later.",
          "category": "Legal"
      },
      {
          "question": "Can you sue your insurance company?",
          "slug": "can-you-sue-your-insurance-company",
          "shortAnswer": "Yes, you can legally sue your insurance company if they breach the insurance contract, unreasonably deny a valid claim, undervalue property damage, or act in 'bad faith'. Lawsuits against insurers generally fall under two legal doctrines: Breach of Contract (for failing to pay benefits owed under the written policy terms) and Insurance Bad Faith (for egregious, deceptive, or unfair claim settlement practices, which can entitle you to punitive damages and attorney fees).",
          "category": "Legal"
      },
      {
          "question": "Can an insurance company sue you for an accident?",
          "slug": "can-an-insurance-company-sue-you-for-an-accident",
          "shortAnswer": "Yes, an insurance company can sue you for an accident through a legal process called subrogation. If you cause a car crash and you are uninsured, or if the total damages exceed your policy liability limits, the other driver's insurance company will pay their insured's repair and medical bills first, and then sue you directly in civil court to recoup every dollar they disbursed.",
          "category": "Auto"
      },
      {
          "question": "Can I sue my insurance company for taking too long?",
          "slug": "can-i-sue-my-insurance-company-for-taking-too-long",
          "shortAnswer": "Yes, you can sue your insurance company for taking too long to resolve or pay your claim. Most states have enacted 'Prompt Payment of Claims' statutes that require insurance carriers to acknowledge, investigate, and approve or deny claims within strict deadlines (typically 15 to 30 days). When an insurer uses unreasonable delays to wear you down or force a cheap settlement, their conduct constitutes insurance bad faith, entitling you to file a lawsuit for statutory interest, damages, and attorney fees.",
          "category": "Legal"
      },
      {
          "question": "Can you sue your own insurance company?",
          "slug": "can-you-sue-your-own-insurance-company",
          "shortAnswer": "Yes, you can sue your own insurance company for breach of contract and insurance bad faith. When you purchase a policy, your insurer owes you an implied legal duty of 'Good Faith and Fair Dealing'. If your carrier refuses to pay legitimate benefits, fails to conduct a thorough investigation, refuses to defend you against an outside lawsuit, or unreasonably rejects a settlement within your policy limits, you can take them to civil court and recover both contract damages and substantial punitive awards.",
          "category": "Legal"
      },
      {
          "question": "Do you need bodily injury insurance in Florida?",
          "slug": "do-you-need-bodily-injury-insurance-in-florida",
          "shortAnswer": "Under basic Florida statutory minimums, you do not legally need Bodily Injury (BI) liability insurance to register a vehicle. Florida is one of only two states that does not require all drivers to carry BI coverage, requiring only $10,000 in Personal Injury Protection (PIP) and $10,000 in Property Damage Liability (PDL). However, under the Florida Financial Responsibility Law, you ARE legally required to purchase bodily injury liability if you have been convicted of a DUI or were involved in a prior at-fault accident.",
          "category": "Auto"
      },
      {
          "question": "Can a insurance company sue you?",
          "slug": "can-a-insurance-company-sue-you",
          "shortAnswer": "Yes, an insurance company can sue you under several well-established legal circumstances. The most common reasons include insurance fraud or material misrepresentation (falsifying claim information to illegally collect money), premium fraud (lying about vehicle garaging or drivers to lower rates), subrogation (suing you if you caused an accident that damaged their insured), or clawback lawsuits to recoup funds paid by mistake or under fraudulent pretenses.",
          "category": "Legal"
      },
      {
          "question": "Can an insurance company sue you?",
          "slug": "can-an-insurance-company-sue-you",
          "shortAnswer": "Yes, an insurance company can sue you directly in civil court. While policyholders typically view insurers as entities that pay out money, insurers routinely file lawsuits against third parties and individuals to recover claim payments through subrogation, to recoup funds paid on fraudulent or misattributed claims, or to seek declaratory judgments holding that they have no legal duty to defend or indemnify you under your policy.",
          "category": "Legal"
      },
      {
          "question": "How long do accidents stay on your record for insurance?",
          "slug": "how-long-do-accidents-stay-on-your-record-for-insurance",
          "shortAnswer": "Accidents stay on your record for insurance purposes for 3 to 5 years with auto carriers, and up to 7 years in national loss history databases like LexisNexis and C.L.U.E. While state Department of Motor Vehicles (DMV) driving records usually display accident points for 36 months (3 years), insurance underwriters access centralized actuarial databases that track all claims filed within the past 5 to 7 years when pricing new policy quotes.",
          "category": "Auto"
      },
      {
          "question": "How long does reckless driving affect insurance?",
          "slug": "how-long-does-reckless-driving-affect-insurance",
          "shortAnswer": "A reckless driving conviction typically affects your car insurance rates for 3 to 5 years, and up to 7 to 10 years in states with strict criminal lookback windows like California, Florida, and Virginia. Because reckless driving is classified as a major moving violation or criminal misdemeanor (rather than a simple traffic ticket), auto insurance premiums increase by an average of 65% to 125% per year, often requiring a mandatory SR-22 certificate of financial responsibility.",
          "category": "Auto"
      },
      {
          "question": "Are men's health clinics covered by insurance?",
          "slug": "are-mens-health-clinics-covered-by-insurance",
          "shortAnswer": "Men's health clinics are rarely covered in full by commercial insurance, with most operating on a direct-to-consumer, cash-pay subscription model ($150 to $300/month). However, the underlying medical treatments they provide—such as Testosterone Replacement Therapy (TRT) and diagnostic hormone blood panels—ARE covered by insurance when prescribed by a traditional in-network endocrinologist or urologist who documents clinical medical necessity (such as two consecutive morning blood tests showing hypogonadism).",
          "category": "Health"
      },
      {
          "question": "Can firefighters get life insurance?",
          "slug": "can-firefighters-get-life-insurance",
          "shortAnswer": "Yes, firefighters can easily get life insurance, and the vast majority qualify for standard or preferred rates with mainstream insurance carriers. While firefighting is classified as a hazardous occupation, modern life insurance underwriters do not automatically charge high surcharges for standard municipal firefighters. Unless you participate in high-hazard specialty roles (such as smokejumping, aerial firefighting, or hazardous materials dive rescue), term life insurance is widely available at affordable rates.",
          "category": "Life"
      },
      {
          "question": "Are spider veins covered by insurance?",
          "slug": "are-spider-veins-covered-by-insurance",
          "shortAnswer": "No, spider vein treatments (such as cosmetic sclerotherapy or surface laser therapy) are virtually never covered by health insurance because insurers classify them as elective cosmetic procedures. However, if your spider veins are caused by underlying Chronic Venous Insufficiency (CVI) or accompanied by symptomatic varicose veins with severe pain, swelling, or skin ulcers, the diagnostic ultrasound and medical vein ablation treatments ARE covered by insurance.",
          "category": "Health"
      },
      {
          "question": "Can an insurance company close a claim without my consent?",
          "slug": "can-an-insurance-company-close-a-claim-without-my-consent",
          "shortAnswer": "Yes, an insurance company can close a claim without your consent under administrative and contractual rules. In third-party liability claims, your policy contract grants the insurer the exclusive 'Right to Settle or Settle at Will', allowing them to resolve or close claims against you without your permission. In first-party claims, insurers can administratively close a claim due to prolonged policyholder inactivity, failure to provide requested documentation, or statutory expiration. However, an administrative closure is not permanent, and you can generally reopen a first-party claim within the state statute of limitations.",
          "category": "Legal"
      },
      {
          "question": "Can an insurance company sue an uninsured driver?",
          "slug": "can-an-insurance-company-sue-an-uninsured-driver",
          "shortAnswer": "Yes, an insurance company can and routinely does sue an uninsured driver through the legal right of subrogation. If an uninsured driver causes an accident, the victim's insurance company will pay for their policyholder's vehicle repairs and medical treatments, and then unleash their subrogation recovery attorneys to sue the uninsured driver personally in civil court for 100% of the costs, leading to wage garnishment and driver's license suspension.",
          "category": "Auto"
      },
      {
          "question": "Can a car insurance company sue you?",
          "slug": "can-a-car-insurance-company-sue-you",
          "shortAnswer": "Yes, a car insurance company can sue you directly in civil court. The most common scenario occurs when you are found at-fault for a car crash that damages an insured vehicle or injures an insured driver; the victim's car insurer will pay the claim and then sue you personally under subrogation rights. An auto insurer can also sue you for rate fraud (concealing household drivers or lying about garaging locations) or to recoup payouts made on fraudulent claims.",
          "category": "Auto"
      },
      {
          "question": "Can an uninsured driver sue an insured driver?",
          "slug": "can-an-uninsured-driver-sue-an-insured-driver",
          "shortAnswer": "Yes, an uninsured driver can legally sue an insured driver if the insured driver was at fault for the accident. However, in at least 10 states with strict 'No Pay, No Play' laws (such as California, Louisiana, Michigan, and New Jersey), uninsured drivers are legally barred from recovering non-economic damages (pain, suffering, and emotional distress), and can only sue for actual out-of-pocket economic losses like medical bills and vehicle repairs.",
          "category": "Auto"
      },
      {
          "question": "Are windshields covered by insurance in Florida?",
          "slug": "are-windshields-covered-by-insurance-in-florida",
          "shortAnswer": "Yes, windshields are 100% covered with $0 deductible by insurance in Florida, provided you carry Comprehensive Coverage on your auto policy. Under Florida Statute § 627.7288 (the Florida Zero-Deductible Windshield Law), insurance carriers are legally prohibited from applying any deductible to windshield repair or replacement. However, if you carry only basic state-minimum liability insurance (PIP and PDL), windshield damage is NOT covered at all.",
          "category": "Auto"
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
        if (!liveData.qa && FALLBACK_INDEX.qa) {
          liveData.qa = FALLBACK_INDEX.qa;
        }
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



// ==========================================================================
// UNIFIED TOOLENGINE RUNTIME (Markets, Gamification, Character, Analytics)
// ==========================================================================

const MARKETS_CONFIG = {
  us: {
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    currency: '$',
    currencyCode: 'USD',
    deductibleTerm: 'Deductible',
    healthSystem: 'ACA Marketplace & Private Employer',
    autoLaw: 'Tort / At-Fault & State Minimums'
  },
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: '£',
    currencyCode: 'GBP',
    deductibleTerm: 'Excess',
    healthSystem: 'NHS & Private Medical Insurance (PMI)',
    autoLaw: 'Statutory Third Party & MOT Rules'
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'C$',
    currencyCode: 'CAD',
    deductibleTerm: 'Deductible',
    healthSystem: 'Provincial Medicare + Extended Health',
    autoLaw: 'Mandatory No-Fault / Direct Compensation'
  },
  au: {
    code: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'A$',
    currencyCode: 'AUD',
    deductibleTerm: 'Excess',
    healthSystem: 'Medicare & Private Hospital Cover',
    autoLaw: 'Compulsory Third Party (CTP Green Slip)'
  },
  in: {
    code: 'in',
    name: 'India',
    flag: '🇮🇳',
    currency: '₹',
    currencyCode: 'INR',
    deductibleTerm: 'Deductible',
    healthSystem: 'Ayushman Bharat & Family Floater Policies',
    autoLaw: 'Motor Vehicles Act Third-Party Mandate'
  }
};

const MarketEngine = {
  getCurrentMarket() {
    try {
      return localStorage.getItem('insurance_bhaiya_market') || 'us';
    } catch (e) {
      return 'us';
    }
  },

  getMarketConfig() {
    const m = this.getCurrentMarket();
    return MARKETS_CONFIG[m] || MARKETS_CONFIG.us;
  },

  setMarket(code) {
    if (!MARKETS_CONFIG[code]) return;
    try {
      localStorage.setItem('insurance_bhaiya_market', code);
    } catch (e) {}
    
    // Sync dropdown elements
    ['globalMarketSelect', 'mobileMarketSelect'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.value !== code) el.value = code;
    });

    window.dispatchEvent(new CustomEvent('market_changed', { detail: { market: code } }));
    AnalyticsEngine.track('market_changed', { market: code });
    this.updateDomForMarket();
  },

  formatCurrency(amount) {
    const cfg = this.getMarketConfig();
    const symbol = cfg.currency;
    if (isNaN(amount) || amount === null) return symbol + '0';
    return symbol + Math.round(amount).toLocaleString('en-US');
  },

  getDeductibleTerm() {
    return this.getMarketConfig().deductibleTerm;
  },

  updateDomForMarket() {
    const cfg = this.getMarketConfig();
    document.querySelectorAll('.market-term-deductible').forEach(el => {
      el.textContent = cfg.deductibleTerm;
    });
    document.querySelectorAll('.market-symbol-curr').forEach(el => {
      el.textContent = cfg.currency;
    });
  },

  init() {
    const current = this.getCurrentMarket();
    ['globalMarketSelect', 'mobileMarketSelect'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.value = current;
        el.addEventListener('change', (e) => this.setMarket(e.target.value));
      }
    });
    this.updateDomForMarket();
  }
};

const GamificationEngine = {
  STORAGE_KEY: 'insurance_bhaiya_user_profile',

  getProfile() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      xp: 0,
      level: 1,
      levelTitle: 'Insurance Explorer',
      completedTools: []
    };
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {}
  },

  getLevelInfo(xp) {
    if (xp >= 150) return { level: 4, title: 'Coverage Master', nextXp: 300, badge: '🏆' };
    if (xp >= 75) return { level: 3, title: 'Risk Navigator', nextXp: 150, badge: '🧭' };
    if (xp >= 30) return { level: 2, title: 'Policy Detective', nextXp: 75, badge: '🔍' };
    return { level: 1, title: 'Insurance Explorer', nextXp: 30, badge: '🌱' };
  },

  awardXp(amount, reason = 'Learning Activity', toolSlug = null) {
    const profile = this.getProfile();
    const oldLevel = this.getLevelInfo(profile.xp).level;

    profile.xp += amount;
    if (toolSlug && !profile.completedTools.includes(toolSlug)) {
      profile.completedTools.push(toolSlug);
    }

    const newLevelInfo = this.getLevelInfo(profile.xp);
    profile.level = newLevelInfo.level;
    profile.levelTitle = newLevelInfo.title;

    this.saveProfile(profile);
    this.updateHeaderDisplay();
    this.showXpToast(amount, reason, newLevelInfo.level > oldLevel ? newLevelInfo : null);

    window.dispatchEvent(new CustomEvent('xp_awarded', {
      detail: { xp: amount, totalXp: profile.xp, reason }
    }));
    AnalyticsEngine.track('xp_awarded', { amount, totalXp: profile.xp, reason });
  },

  showXpToast(amount, reason, leveledUpInfo = null) {
    let toast = document.getElementById('xpCelebrationToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'xpCelebrationToast';
      toast.className = 'xp-toast-notification';
      document.body.appendChild(toast);
    }

    let innerHtml = `
      <div class="xp-toast-content">
        <span class="xp-toast-icon">⚡</span>
        <div>
          <div class="xp-toast-title">+${amount} Learning XP!</div>
          <div class="xp-toast-desc">${reason}</div>
        </div>
      </div>
    `;

    if (leveledUpInfo) {
      innerHtml += `
        <div class="xp-toast-levelup">
          <span>🎉 Level Up!</span>
          <strong>${leveledUpInfo.badge} Level ${leveledUpInfo.level}: ${leveledUpInfo.title}</strong>
        </div>
      `;
    }

    toast.innerHTML = innerHtml;
    toast.classList.add('is-visible');

    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 4200);
  },

  updateHeaderDisplay() {
    const profile = this.getProfile();
    const info = this.getLevelInfo(profile.xp);

    ['globalXpValue', 'mobileXpValue'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = `${profile.xp} XP`;
    });

    ['headerXpPill', 'mobileXpPill'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.title = `${info.badge} Level ${info.level} (${info.title}) - ${profile.xp} XP total`;
    });
  },

  init() {
    this.updateHeaderDisplay();
  }
};

const CharacterGuide = {
  renderBubble(text, context = 'hint') {
    return `
      <div class="bhaiya-mentor-card context-${context}">
        <div class="bhaiya-avatar-wrap">
          <img src="/logo.png" alt="Insurance Bhaiya Guide" class="bhaiya-avatar-img" onerror="this.style.display='none'" />
          <span class="bhaiya-status-dot"></span>
        </div>
        <div class="bhaiya-speech-bubble">
          <div class="bhaiya-speaker-name">Insurance Bhaiya</div>
          <p class="bhaiya-speech-text">${text}</p>
        </div>
      </div>
    `;
  },

  updateCard(containerId, text) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const textEl = el.querySelector('.bhaiya-speech-text');
    if (textEl) {
      textEl.textContent = text;
    }
  }
};

const AnalyticsEngine = {
  STORAGE_KEY: 'insurance_bhaiya_session_events',

  track(eventName, payload = {}) {
    const eventRecord = {
      event: eventName,
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
      data: payload
    };

    window.dispatchEvent(new CustomEvent('ib_analytics', { detail: eventRecord }));

    try {
      const raw = sessionStorage.getItem(this.STORAGE_KEY);
      const events = raw ? JSON.parse(raw) : [];
      events.push(eventRecord);
      if (events.length > 50) events.shift();
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    } catch (e) {}

    if (window.location.hostname === 'localhost') {
      console.log(`[Analytics] 📊 ${eventName}`, payload);
    }
  }
};


// ==========================================================================
// BATCH 3 DECLARATIVE DATASETS (Quizzes & Checklist Items)
// ==========================================================================

const READINESS_QUIZ_QUESTIONS = [
  {
    title: 'The Deductible Trade-Off',
    scenario: 'Alex increases his auto collision deductible from $250 to $1,000, saving $160 per year on his premium.',
    question: "What is the primary financial risk of Alex's decision?",
    options: [
      'His insurance company will deny all future claims automatically.',
      'He must be able to pay $1,000 out-of-pocket if an accident occurs before insurance pays anything.',
      'His monthly premium will increase after 6 months.',
      'His car’s market value will decrease by $750.'
    ],
    correctIndex: 1,
    concept: 'Deductible Breakeven',
    explanation: 'A higher deductible reduces your recurring premium, but transfers financial responsibility back to you for the first $1,000 of damage in every claim.'
  },
  {
    title: 'Market Value vs. Replacement Cost',
    scenario: 'A homeowner buys a property for $650,000 in an expensive urban neighborhood where vacant lots sell for $350,000.',
    question: "Should the home's Dwelling insurance (Coverage A) limit be set to the $650,000 purchase price?",
    options: [
      'Yes, because you should always insure the full purchase price of the home.',
      'No, because land does not burn down or blow away; insurance should cover the estimated physical rebuild cost.',
      'Yes, because the mortgage lender always requires market value coverage.',
      'No, the insurance should be set to half the property tax assessment.'
    ],
    correctIndex: 1,
    concept: 'Replacement Cost Principle',
    explanation: 'Insurance covers the physical cost to reconstruct the dwelling structure, not the land value or market speculation.'
  },
  {
    title: 'Out-of-Pocket Maximum Protection',
    scenario: 'Maria has a health plan with a $2,000 deductible, 20% coinsurance, and an $8,000 out-of-pocket maximum. She receives a $90,000 hospital bill for covered emergency surgery.',
    question: "What is the maximum amount Maria will pay for this covered in-network hospitalization?",
    options: [
      '$2,000 (just her deductible)',
      '$18,000 (her 20% coinsurance share)',
      '$8,000 (her plan\'s annual out-of-pocket maximum)',
      '$90,000 in full because surgery is excluded'
    ],
    correctIndex: 2,
    concept: 'Out-of-Pocket Maximum',
    explanation: 'Once your deductible, copays, and coinsurance reach your annual out-of-pocket maximum, the health insurer covers 100% of remaining eligible in-network costs.'
  },
  {
    title: "Renter's Belongings Myth",
    scenario: "A pipe bursts in an apartment complex, destroying a tenant's $3,000 laptop and $2,000 couch.",
    question: "Will the landlord's building insurance reimburse the tenant for their damaged personal belongings?",
    options: [
      "Yes, the landlord's policy covers all contents inside the building.",
      "No, landlord insurance covers only the physical structure; tenants must maintain their own renters insurance.",
      "Yes, but only if the tenant has lived there for more than one year.",
      "No, unless the tenant pays an extra security deposit."
    ],
    correctIndex: 1,
    concept: 'Renters Personal Property',
    explanation: 'Landlord policies strictly cover the building structure. Renters must maintain an individual HO-4 policy to protect their personal belongings.'
  },
  {
    title: 'Travel Medical Across Borders',
    scenario: 'A US citizen traveling on vacation in Europe suffers a severe injury requiring emergency surgery and hospital stay.',
    question: 'Does standard domestic health insurance or Medicare usually cover medical bills abroad?',
    options: [
      'Yes, domestic insurance provides 100% worldwide coverage automatically.',
      'No, domestic health plans and Medicare generally provide zero or strictly emergency out-of-network coverage outside national borders.',
      'Yes, because European healthcare is completely free for all global tourists.',
      'No, unless you travel on an American airline.'
    ],
    correctIndex: 1,
    concept: 'International Medical Protection',
    explanation: 'Domestic healthcare networks end at national borders. Standalone travel medical policies cover emergency treatment and expensive medical evacuations abroad.'
  },
  {
    title: 'Disability Own-Occupation Clause',
    scenario: 'An orthopedic surgeon injures her hand in a cycling accident. She can no longer operate, but could teach medicine at a university.',
    question: 'Which disability definition pays full benefits because she cannot perform surgical procedures?',
    options: [
      'Any-Occupation definition',
      'True Own-Occupation definition',
      "Workers' Compensation statutory coverage",
      'State Disability Insurance (SDI)'
    ],
    correctIndex: 1,
    concept: 'Own-Occupation Disability',
    explanation: 'True Own-Occupation pays benefits if you cannot perform the specific duties of your specialty, even if you are employed in another occupation.'
  },
  {
    title: 'Term Life vs. Whole Life Economics',
    scenario: 'A 30-year-old parent wants $1,000,000 of life insurance protection for the next 20 years while raising children.',
    question: 'Which life insurance structure provides this pure death benefit protection at the lowest cash premium?',
    options: [
      'Universal Life Insurance with cash accumulation',
      'Whole Life Insurance with dividend reinvestment',
      'Level Term Life Insurance (20-Year Term)',
      'Variable Annuity with death rider'
    ],
    correctIndex: 2,
    concept: 'Pure Risk Life Insurance',
    explanation: 'Level Term life insurance strips away investment fees and cash-value complexity, providing pure death benefit protection at a fraction of whole life premiums.'
  },
  {
    title: 'Understanding Policy Exclusions',
    scenario: 'A standard homeowners policy (HO-3) protects against fire, wind, and lightning.',
    question: 'Which of the following common perils is almost universally EXCLUDED from standard homeowners policies?',
    options: [
      'Kitchen fire damage',
      'Overland flooding and storm surge',
      'Tree falling on the roof during a windstorm',
      'Hail damage to siding'
    ],
    correctIndex: 1,
    concept: 'Exclusions & Specialized Riders',
    explanation: 'Overland flooding and rising waters are universally excluded from standard home insurance, requiring a separate NFIP or private flood insurance policy.'
  },
  {
    title: 'State Minimum Auto Liability Hazards',
    scenario: 'A driver carries state minimum liability coverage (e.g. $25,000 property damage limit) and accidentally causes a multi-car collision totaling $85,000 in damage.',
    question: 'Who is legally responsible for the remaining $60,000 in property damage?',
    options: [
      'The state insurance commissioner pays the unpaid balance.',
      'The other drivers must forgive the debt under no-fault laws.',
      'The at-fault driver is personally liable and can face wage garnishment or asset seizure.',
      'The car manufacturer covers the difference.'
    ],
    correctIndex: 2,
    concept: 'Liability Limits & Umbrella Protection',
    explanation: 'Insurance pays only up to the stated policy limit. The policyholder remains personally liable in court for any excess damages above the limit.'
  },
  {
    title: 'Grace Periods and Policy Lapses',
    scenario: 'A policyholder misses their monthly premium payment due date by 10 days.',
    question: 'What typically happens during the statutory grace period (usually 30–31 days)?',
    options: [
      'The policy immediately cancels and all claims are permanently void.',
      'Coverage remains active, but if a claim occurs, the overdue premium is deducted from the payout.',
      'The policyholder is arrested for insurance fraud.',
      'The insurance premium doubles automatically.'
    ],
    correctIndex: 1,
    concept: 'Grace Period Mechanics',
    explanation: 'Statutory grace periods (typically 30–31 days) preserve active coverage while allowing policyholders to cure overdue premium balances.'
  }
];

const TERMINOLOGY_QUIZ_TERMS = [
  {
    term: 'Premium',
    question: 'What is an insurance "Premium"?',
    options: [
      'A bonus payment you receive if you go one year without filing a claim.',
      'The recurring price you pay (monthly or annually) to keep an insurance policy active.',
      'The maximum amount an insurer will pay for a single covered disaster.',
      'A fee charged by insurance brokers for reviewing your paperwork.'
    ],
    correctIndex: 1,
    definition: 'The scheduled dollar payment required to keep your risk transfer contract valid and active.',
    example: 'Paying $120 each month to your auto insurance carrier.',
    whyItMatters: 'If you fail to pay your premium beyond the grace period, your policy lapses and you forfeit all coverage.'
  },
  {
    term: 'Deductible / Excess',
    question: 'What is a "Deductible" (known as "Excess" in the UK & Australia)?',
    options: [
      'The discount applied when you bundle home and auto policies.',
      'The predetermined amount you must pay out-of-pocket before insurance cost-sharing activates.',
      'The government tax applied to commercial insurance premiums.',
      'The penalty fee paid when switching insurance providers.'
    ],
    correctIndex: 1,
    definition: 'The initial fixed dollar amount of covered loss that you agree to pay before the carrier begins reimbursing.',
    example: 'If you have a $500 auto collision deductible and a $2,000 repair bill, you pay $500 and the insurer covers $1,500.',
    whyItMatters: 'Choosing a higher deductible reduces your recurring premium, but requires having emergency savings on hand when an accident happens.'
  },
  {
    term: 'Exclusion',
    question: 'What is an "Exclusion" in an insurance contract?',
    options: [
      'A discount given to safe drivers who exclude teen family members.',
      'A specific hazard, condition, or cause of loss explicitly NOT covered by the policy.',
      'A waiting period before life insurance becomes valid.',
      'The cancellation of a policy due to unpaid premiums.'
    ],
    correctIndex: 1,
    definition: 'Contractual clauses that specify perils, situations, or property categories for which the insurer will NOT provide reimbursement.',
    example: 'Standard homeowners policies explicitly exclude damage caused by earthquakes, floods, and normal wear-and-tear.',
    whyItMatters: 'Claims are denied most frequently due to policy exclusions that the policyholder never realized were omitted from their policy.'
  },
  {
    term: 'Claim',
    question: 'What is an insurance "Claim"?',
    options: [
      'An advertisement by an insurer stating they have the lowest rates.',
      'A formal notification and request to your insurer for reimbursement following a covered loss.',
      'A legal lawsuit filed against an insurance broker for fraud.',
      'The policy document mailed to you after purchase.'
    ],
    correctIndex: 1,
    definition: 'A formal notification to the insurer requesting reimbursement under the terms of your contract.',
    example: 'Reporting a hail-damaged roof to your insurer so an adjuster can inspect and issue payment.',
    whyItMatters: 'Filing frequent small claims can increase future premiums or cause your carrier not to renew your policy.'
  },
  {
    term: 'Policy Limit',
    question: 'What is a "Coverage Limit" or "Policy Limit"?',
    options: [
      'The maximum number of times you can file a claim in one calendar year.',
      'The maximum dollar amount an insurer is obligated to pay for a covered loss under the contract.',
      'The minimum credit score required to purchase an insurance policy.',
      'The number of days allowed to pay a past-due premium.'
    ],
    correctIndex: 1,
    definition: 'The maximum financial ceiling an insurance carrier will pay out for a specific covered incident or over an entire policy term.',
    example: 'A $300,000 bodily injury liability limit means the insurer pays up to $300,000; any excess civil court judgment comes out of your personal assets.',
    whyItMatters: 'Setting limits too low leaves your personal savings, home equity, and future wages vulnerable to court judgments.'
  },
  {
    term: 'Beneficiary',
    question: 'Who is a "Beneficiary" in a life or annuity policy?',
    options: [
      'The licensed insurance agent who earns a commission on the sale.',
      "The designated individual or entity legally entitled to receive the policy proceeds upon the insured's death.",
      'The doctor who conducts the medical underwriting exam.',
      'The corporate employer providing the group insurance plan.'
    ],
    correctIndex: 1,
    definition: 'The designated party legally titled to receive death benefits or proceeds from an insurance contract.',
    example: 'Naming your spouse as the primary beneficiary and your children as contingent beneficiaries.',
    whyItMatters: 'Beneficiary designations supersede instructions in your will. Failing to update beneficiaries after divorce or marriage can lead to legal complications.'
  },
  {
    term: 'Coinsurance',
    question: 'What is "Coinsurance" in health and property insurance?',
    options: [
      'Buying two insurance policies from two different companies for the same house.',
      'The percentage split of covered medical or repair costs shared between you and the insurer after meeting your deductible.',
      'An additional premium charged for insuring high-risk drivers.',
      'The discount earned by installing security alarms.'
    ],
    correctIndex: 1,
    definition: 'A cost-sharing mechanism where the insured pays a specified percentage (e.g. 20%) and the carrier pays the remainder (80%) of covered expenses.',
    example: 'On an 80/20 health plan with a met deductible, an $800 doctor bill costs you $160, and your insurer pays $640.',
    whyItMatters: 'Coinsurance differs from flat copays; high coinsurance percentages can result in large out-of-pocket bills for expensive hospital procedures.'
  },
  {
    term: 'Underwriting',
    question: 'What is "Underwriting" in insurance?',
    options: [
      'The process of physically signing your name at the bottom of the policy contract.',
      'The actuarial evaluation process where an insurer assesses your risk profile to decide whether to accept you and what rate to charge.',
      'The legal department that defends you in civil lawsuits.',
      'The marketing team that creates television commercials for insurance.'
    ],
    correctIndex: 1,
    definition: 'The systematic evaluation by an insurer of risk factors (driving record, health history, credit, home age) to price coverage accurately.',
    example: 'An insurer reviewing your DMV records and past claims history before setting your auto premium rate.',
    whyItMatters: 'Understanding underwriting factors allows you to improve your risk profile to qualify for preferred rates.'
  }
];

const POLICY_REVIEW_CLAUSES = [
  {
    id: 'c1',
    title: 'Coverage Scope & Insuring Agreement',
    desc: 'Does the policy specify named perils or open perils (all-risk subject to exclusions)?',
    defaultPrompt: 'Can you provide the specific list of excluded perils under Section I and confirm whether my policy is named-peril or open-peril?'
  },
  {
    id: 'c2',
    title: 'Policy Limits & Sub-limits',
    desc: 'Are liability and property limits calibrated against modern litigation averages and rebuild costs?',
    defaultPrompt: 'Are there special internal sub-limits on jewelry, electronics, or liability that cap payouts below my primary coverage limit?'
  },
  {
    id: 'c3',
    title: 'Deductible / Excess Requirements',
    desc: 'Do you hold the required cash reserve to satisfy your deductible comfortably in an emergency?',
    defaultPrompt: 'What is my separate percentage deductible for wind, hail, or named hurricanes versus all other covered perils?'
  },
  {
    id: 'c4',
    title: 'Specific Exclusions & Limitations',
    desc: 'Check for exclusions regarding flood, surface water, earth movement, or slow leaks.',
    defaultPrompt: 'Does my policy exclude sewer or drain backup, groundwater seepage, or foundation movement, and what endorsements are available?'
  },
  {
    id: 'c5',
    title: 'Renewal Terms & Escalation',
    desc: 'Does the contract feature an automatic inflation guard to prevent underinsurance drift?',
    defaultPrompt: 'Does my policy feature an automatic inflation guard endorsement to keep rebuild limits aligned with local construction costs?'
  },
  {
    id: 'c6',
    title: 'Cancellation & Grace Periods',
    desc: 'What is the required notice period and statutory payment grace window before policy termination?',
    defaultPrompt: 'What is the statutory grace period for premium payments before coverage lapses, and what cancellation notice is required?'
  },
  {
    id: 'c7',
    title: 'Claims Reporting Procedures',
    desc: 'What is the mandatory timeframe and proof-of-loss documentation required to report a claim?',
    defaultPrompt: 'What is the mandatory deadline for reporting a covered loss, and are independent adjuster estimates accepted?'
  },
  {
    id: 'c8',
    title: 'Beneficiary & Named Insured Titling',
    desc: 'Are primary and contingent beneficiaries or additional insured interests properly recorded?',
    defaultPrompt: 'Are all family drivers and property co-owners accurately titled as Named Insureds, and are beneficiaries up to date?'
  },
  {
    id: 'c9',
    title: 'Optional Endorsements & Riders',
    desc: 'Are key endorsements attached (e.g. water backup, extended replacement cost, umbrella bridge)?',
    defaultPrompt: 'What optional endorsements (such as water backup or extended replacement cost) are available to attach to this policy?'
  },
  {
    id: 'c10',
    title: 'Valuation Basis (RCV vs ACV)',
    desc: 'Does claim settlement pay full Replacement Cost Value or subtract depreciation (Actual Cash Value)?',
    defaultPrompt: 'Does my contents and roof coverage reimburse on a 100% Replacement Cost basis without subtracting age depreciation?'
  }
];


/**
 * Interactive Client Controllers for Tools 11–15
 */

// ==========================================================================
// Tool 11: Insurance Needs Calculator (insurance-needs-calculator)
// ==========================================================================
function initNeedsCalculatorTool() {
  const lab = document.getElementById('needsInteractiveLab');
  if (!lab) return;

  let step = 1;
  let age = '26-35';
  let deps = '2-3';
  let incomeType = 'employed';
  let housing = 'own-mortgage';
  let vehicle = '1';
  let business = 'none';
  let travel = 'occasional';
  let pet = 'none';
  let netWorth = 250000;
  let savings = 30000;
  let xpAwarded = false;

  function setStep(s) {
    step = Math.max(1, Math.min(3, s));
    for (let i = 1; i <= 3; i++) {
      const tab = document.getElementById('needsStepTab' + i);
      const panel = document.getElementById('needsStepPanel' + i);
      if (tab) tab.classList.toggle('is-active', i === step);
      if (panel) panel.classList.toggle('is-active', i === step);
    }
    if (step === 3) {
      updateNeedsCalculation();
      if (!xpAwarded) {
        xpAwarded = true;
        GamificationEngine.awardXp(20, 'Completed Insurance Needs Risk Radar', 'insurance-needs-calculator');
      }
    }
  }

  [1, 2, 3].forEach(i => {
    const tab = document.getElementById('needsStepTab' + i);
    if (tab) tab.addEventListener('click', () => setStep(i));
  });

  const next1 = document.getElementById('needsBtnNext1');
  const next2 = document.getElementById('needsBtnNext2');
  const back2 = document.getElementById('needsBtnBack2');
  const back3 = document.getElementById('needsBtnBack3');
  const resetBtn = document.getElementById('needsBtnReset');

  if (next1) next1.addEventListener('click', () => setStep(2));
  if (next2) next2.addEventListener('click', () => setStep(3));
  if (back2) back2.addEventListener('click', () => setStep(1));
  if (back3) back3.addEventListener('click', () => setStep(2));

  let assetTier = 'under-250k';
  const activeExistingPolicies = new Set(['has-health', 'has-auto']);

  function bindPills(groupId, onSelect) {
    const container = document.getElementById(groupId);
    if (!container) return;
    const pills = container.querySelectorAll('.tier-toggle-pill, .pill-btn');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('is-selected', 'is-active'));
        pill.classList.add('is-selected', 'is-active');
        const val = pill.getAttribute('data-val');
        if (val) {
          onSelect(val);
          updateNeedsCalculation();
        }
      });
    });
  }

  bindPills('needsAgeGroup', v => { age = v; });
  bindPills('needsDepsGroup', v => { deps = v; });
  bindPills('needsIncomeGroup', v => { incomeType = v; });
  bindPills('needsHousingGroup', v => { housing = v; });
  bindPills('needsVehicleGroup', v => { vehicle = v; });
  bindPills('needsBusinessGroup', v => { business = v; });
  bindPills('needsTravelGroup', v => { travel = v; });
  bindPills('needsPetGroup', v => { pet = v; });
  bindPills('needsAssetsGroup', v => { assetTier = v; });

  const existingGroupEl = document.getElementById('needsExistingGroup');
  if (existingGroupEl) {
    existingGroupEl.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const val = pill.getAttribute('data-val');
        if (!val) return;
        if (activeExistingPolicies.has(val)) {
          activeExistingPolicies.delete(val);
          pill.classList.remove('is-selected', 'is-active');
        } else {
          activeExistingPolicies.add(val);
          pill.classList.add('is-selected', 'is-active');
        }
        updateNeedsCalculation();
      });
    });
  }

  const nwSlider = document.getElementById('needsNetWorth');
  const nwVal = document.getElementById('needsNetWorthVal');
  if (nwSlider) {
    nwSlider.addEventListener('input', () => {
      netWorth = parseFloat(nwSlider.value) || 250000;
      if (nwVal) nwVal.textContent = MarketEngine.formatCurrency(netWorth);
      updateSliderTrackFill(nwSlider);
      updateNeedsCalculation();
    });
  }

  const savSlider = document.getElementById('needsSavings');
  const savVal = document.getElementById('needsSavingsVal');
  if (savSlider) {
    savSlider.addEventListener('input', () => {
      savings = parseFloat(savSlider.value) || 30000;
      if (savVal) savVal.textContent = MarketEngine.formatCurrency(savings);
      updateSliderTrackFill(savSlider);
      updateNeedsCalculation();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      age = '26-35';
      deps = '2-3';
      incomeType = 'employed';
      housing = 'own-mortgage';
      vehicle = '1';
      business = 'none';
      travel = 'occasional';
      pet = 'none';
      assetTier = 'under-250k';
      activeExistingPolicies.clear();
      activeExistingPolicies.add('has-health');
      activeExistingPolicies.add('has-auto');
      netWorth = 250000;
      savings = 30000;
      if (nwSlider) { nwSlider.value = 250000; updateSliderTrackFill(nwSlider); if (nwVal) nwVal.textContent = MarketEngine.formatCurrency(250000); }
      if (savSlider) { savSlider.value = 30000; updateSliderTrackFill(savSlider); if (savVal) savVal.textContent = MarketEngine.formatCurrency(30000); }
      ['needsAgeGroup', 'needsDepsGroup', 'needsIncomeGroup', 'needsHousingGroup', 'needsVehicleGroup', 'needsBusinessGroup', 'needsTravelGroup', 'needsPetGroup', 'needsAssetsGroup'].forEach(gid => {
        const c = document.getElementById(gid);
        if (c) {
          const pills = c.querySelectorAll('.tier-toggle-pill, .pill-btn');
          pills.forEach((p, idx) => {
            const isDef = idx === 0;
            p.classList.toggle('is-selected', isDef);
            p.classList.toggle('is-active', isDef);
          });
        }
      });
      if (existingGroupEl) {
        existingGroupEl.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => {
          const val = p.getAttribute('data-val');
          const isAct = activeExistingPolicies.has(val);
          p.classList.toggle('is-selected', isAct);
          p.classList.toggle('is-active', isAct);
        });
      }
      setStep(1);
    });
  }

  function updateNeedsCalculation() {
    const sectors = [
      {
        id: 'health',
        name: 'Health Insurance',
        icon: 'Activity',
        priority: 'Essential',
        priorityClass: 'pill-accent',
        why: 'Inpatient hospital stays and surgeries can generate catastrophic bills exceeding $50,000 without an out-of-pocket maximum.',
        learn: 'Evaluate your annual out-of-pocket maximum and network tier rules.',
        url: '/health-insurance-calculator/'
      },
      {
        id: 'life',
        name: 'Life Insurance',
        icon: 'Heart',
        priority: deps !== '0' || housing === 'own-mortgage' ? 'High Priority' : 'Low / Optional',
        priorityClass: deps !== '0' || housing === 'own-mortgage' ? 'pill-accent' : '',
        why: deps !== '0' ?
          `With ${deps} dependents relying on household cashflow, level term coverage replaces future earnings and settles mortgages.` :
          'With no dependents, life insurance is only needed if someone co-signed your private debts.',
        learn: 'Compare term rates and calculate 10x–12x annual income needs.',
        url: '/life-insurance-calculator/'
      },
      {
        id: 'auto',
        name: 'Car / Auto Insurance',
        icon: 'Car',
        priority: vehicle !== '0' ? 'Essential' : 'Not Applicable',
        priorityClass: vehicle !== '0' ? 'pill-accent' : '',
        why: vehicle !== '0' ?
          'Operating a motor vehicle carries unlimited third-party civil bodily injury exposure in court.' :
          'No vehicle owned; statutory auto coverage is not required.',
        learn: 'Explore why state minimum liability limits leave assets exposed.',
        url: '/car-insurance-calculator/'
      },
      {
        id: 'home',
        name: 'Homeowners Insurance',
        icon: 'Home',
        priority: housing.startsWith('own') ? 'Essential' : 'Not Applicable',
        priorityClass: housing.startsWith('own') ? 'pill-accent' : '',
        why: housing.startsWith('own') ?
          'Protects 100% replacement cost of your dwelling, personal belongings, and premises liability.' :
          'Renting an apartment: you do not own the physical dwelling structure.',
        learn: 'Understand replacement cost vs actual cash value depreciation.',
        url: '/home-insurance-calculator/'
      },
      {
        id: 'renters',
        name: 'Renters Insurance',
        icon: 'Home',
        priority: housing === 'rent' ? 'High Priority' : 'Not Applicable',
        priorityClass: housing === 'rent' ? 'pill-accent' : '',
        why: housing === 'rent' ?
          "The landlord's insurance covers only the building envelope. Your furniture, electronics, and wardrobe require an HO-4 policy." :
          'As a homeowner, your personal contents are covered under your comprehensive homeowners policy.',
        learn: 'Perform a room-by-room personal inventory replacement audit.',
        url: '/renters-insurance-calculator/'
      },
      {
        id: 'disability',
        name: 'Disability Income Protection',
        icon: 'ShieldAlert',
        priority: incomeType !== 'retired' ? 'High Priority' : 'Not Applicable',
        priorityClass: incomeType !== 'retired' ? 'pill-accent' : '',
        why: incomeType !== 'retired' ?
          'A long-term illness or accident that stops your paycheck is statistically more probable during working years than premature death.' :
          'Retired with passive or pension income: paycheck loss protection is no longer applicable.',
        learn: 'Calculate your monthly essential expense gap and own-occupation clauses.',
        url: '/disability-insurance-calculator/'
      },
      {
        id: 'travel',
        name: 'Travel Insurance',
        icon: 'Plane',
        priority: travel === 'international' ? 'High Priority' : travel === 'frequent' ? 'Moderate' : 'Low / As Needed',
        priorityClass: travel === 'international' ? 'pill-accent' : '',
        why: travel === 'international' ?
          'Domestic health insurance does not cover medical treatment or $100,000+ emergency airlift evacuations outside national borders.' :
          'Covers non-refundable trip cancellations, baggage delays, and emergency travel assistance.',
        learn: 'Review pre-departure cancellation and medical evacuation requirements.',
        url: '/travel-insurance-checklist/'
      },
      {
        id: 'business',
        name: 'Business / Commercial Insurance',
        icon: 'Briefcase',
        priority: business !== 'none' ? 'High Priority' : 'Not Applicable',
        priorityClass: business !== 'none' ? 'pill-accent' : '',
        why: business !== 'none' ?
          'Personal auto and homeowners policies exclude all claims occurring during commercial business activities.' :
          'No commercial operations; personal policies provide sufficient scope.',
        learn: 'Audit commercial general liability and business owner policies (BOP).',
        url: '/business-insurance-checklist/'
      },
      {
        id: 'pet',
        name: 'Pet Insurance',
        icon: 'Dog',
        priority: pet !== 'none' ? 'Moderate / Relevant' : 'Not Applicable',
        priorityClass: pet !== 'none' ? 'pill-accent' : '',
        why: pet !== 'none' ?
          'Unexpected emergency surgery or cancer treatment for dogs and cats routinely exceeds $3,000 to $8,000.' :
          'No pets in household.',
        learn: 'Evaluate deductible breakeven and accident-only vs comprehensive vet plans.',
        url: '/deductible-calculator/'
      },
      {
        id: 'umbrella',
        name: 'Umbrella Liability Insurance',
        icon: 'Shield',
        priority: netWorth >= 400000 || vehicle === '2+' ? 'High Priority' : 'Moderate',
        priorityClass: netWorth >= 400000 || vehicle === '2+' ? 'pill-accent' : '',
        why: netWorth >= 400000 ?
          `With ${MarketEngine.formatCurrency(netWorth)} in net assets and property equity, standard $300k auto/home liability limits leave your wealth exposed.` :
          'Provides an affordable $1M+ extra layer of defense above home and auto limits against civil litigation.',
        learn: 'Explore how umbrella policies bridge liability gaps across all properties.',
        url: '/coverage-gap-checker/'
      }
    ];

    const activeSectors = sectors.filter(s => s.priority !== 'Not Applicable');
    const highPrioritySectors = sectors.filter(s => s.priority.includes('Essential') || s.priority.includes('High'));

    const countEl = document.getElementById('needsRadarCount');
    const priorityEl = document.getElementById('needsPrioritySector');
    if (countEl) countEl.textContent = `${activeSectors.length} of 10 Relevant Sectors`;
    if (priorityEl) priorityEl.textContent = `${highPrioritySectors.length} High-Priority Defense Lines`;

    const grid = document.getElementById('needsRiskRadarGrid');
    if (grid) {
      grid.innerHTML = sectors.map(s => `
        <div class="apple-card" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid ${s.priority.includes('Essential') || s.priority.includes('High') ? 'var(--color-accent)' : 'var(--color-border)'};">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <h4 style="font-size: 1.0625rem; font-weight: 600; color: var(--color-text); margin: 0;">${escapeHtml(s.name)}</h4>
              <span class="pill ${s.priorityClass}" style="font-size: 0.75rem;">${escapeHtml(s.priority)}</span>
            </div>
            <p style="font-size: 0.875rem; line-height: 1.55; color: var(--color-secondary); margin-bottom: 12px;">
              ${escapeHtml(s.why)}
            </p>
            <div style="font-size: 0.8125rem; color: var(--color-text); background: var(--color-surface); padding: 8px 12px; border-radius: var(--radius-xs); margin-bottom: 16px;">
              <strong>What to examine:</strong> ${escapeHtml(s.learn)}
            </div>
          </div>
          <div>
            <a href="${s.url}" class="btn btn-secondary" style="width: 100%; text-align: center; font-size: 0.8125rem; padding: 8px 12px; display: block;">
              Explore ${escapeHtml(s.name)} &rarr;
            </a>
          </div>
        </div>
      `).join('');
    }

    const bhaiyaCard = document.getElementById('needsBhaiyaCard');
    if (bhaiyaCard && step === 3) {
      CharacterGuide.updateCard('needsBhaiyaCard', `Based on your household stage, I've identified ${highPrioritySectors.length} essential defense pillars. Remember: insurance isn't about buying every policy, it's about protecting your wealth against catastrophic ruin.`);
    }
  }

  updateNeedsCalculation();
}

// ==========================================================================
// Tool 12: Coverage Gap Checker (coverage-gap-checker)
// ==========================================================================
function initCoverageGapCheckerTool() {
  const lab = document.getElementById('gapInteractiveLab');
  if (!lab) return;

  let step = 1;
  let policyType = 'auto';
  let limit = 100000;
  let deductible = 500;
  let renewal = 'under-30';
  let xpAwarded = false;

  function setStep(s) {
    step = Math.max(1, Math.min(3, s));
    for (let i = 1; i <= 3; i++) {
      const tab = document.getElementById('gapStepTab' + i);
      const panel = document.getElementById('gapStepPanel' + i);
      if (tab) tab.classList.toggle('is-active', i === step);
      if (panel) panel.classList.toggle('is-active', i === step);
    }
    if (step === 3) {
      updateGapReport();
      if (!xpAwarded) {
        xpAwarded = true;
        GamificationEngine.awardXp(20, 'Completed Policy Coverage Gap Audit', 'coverage-gap-checker');
      }
    }
  }

  [1, 2, 3].forEach(i => {
    const tab = document.getElementById('gapStepTab' + i);
    if (tab) tab.addEventListener('click', () => setStep(i));
  });

  const next1 = document.getElementById('gapBtnNext1');
  const next2 = document.getElementById('gapBtnNext2');
  const back2 = document.getElementById('gapBtnBack2');
  const back3 = document.getElementById('gapBtnBack3');
  const resetBtn = document.getElementById('gapBtnReset');

  if (next1) next1.addEventListener('click', () => setStep(2));
  if (next2) next2.addEventListener('click', () => setStep(3));
  if (back2) back2.addEventListener('click', () => setStep(1));
  if (back3) back3.addEventListener('click', () => setStep(2));

  function bindPills(groupId, onSelect) {
    const container = document.getElementById(groupId);
    if (!container) return;
    const pills = container.querySelectorAll('.tier-toggle-pill, .pill-btn');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('is-selected', 'is-active'));
        pill.classList.add('is-selected', 'is-active');
        const val = pill.getAttribute('data-val');
        if (val) {
          onSelect(val);
          updateGapReport();
        }
      });
    });
  }

  bindPills('gapPolicyTypeGroup', v => {
    policyType = v;
    adaptInputsForPolicy(v);
  });
  bindPills('gapRenewalGroup', v => { renewal = v; });

  function adaptInputsForPolicy(type) {
    const limitLabel = document.getElementById('gapLimitLabel');
    const limitHelp = document.getElementById('gapLimitHelp');
    const dedLabel = document.getElementById('gapDeductibleLabel');
    const limitInput = document.getElementById('gapLimit');
    const limitVal = document.getElementById('gapLimitVal');

    if (type === 'auto') {
      if (limitLabel) limitLabel.textContent = 'Bodily Injury Liability Limit (Per Occurrence)';
      if (limitHelp) limitHelp.textContent = 'Ceiling for third-party injury claims. Modern recommended baseline is $250k–$500k.';
      if (dedLabel) dedLabel.textContent = 'Collision & Comprehensive ' + MarketEngine.getDeductibleTerm();
    } else if (type === 'home' || type === 'renters') {
      if (limitLabel) limitLabel.textContent = type === 'home' ? 'Dwelling Replacement Limit (Coverage A)' : 'Personal Property Limit (Coverage C)';
      if (limitHelp) limitHelp.textContent = 'Estimated cost to rebuild structure or replace belongings at today’s prices.';
      if (dedLabel) dedLabel.textContent = 'Property ' + MarketEngine.getDeductibleTerm();
    } else if (type === 'health') {
      if (limitLabel) limitLabel.textContent = 'Annual Out-of-Pocket Maximum';
      if (limitHelp) limitHelp.textContent = 'The legal ceiling you can be asked to pay in a single year for covered in-network care.';
      if (dedLabel) dedLabel.textContent = 'Annual Medical ' + MarketEngine.getDeductibleTerm();
    } else if (type === 'life') {
      if (limitLabel) limitLabel.textContent = 'Total Death Benefit Face Amount';
      if (limitHelp) limitHelp.textContent = 'Target baseline is typically 10x to 12x gross annual household income.';
      if (dedLabel) dedLabel.textContent = 'Policy Cash Surrender Value / Reserve';
    }
  }

  const limitSlider = document.getElementById('gapLimit');
  const limitVal = document.getElementById('gapLimitVal');
  if (limitSlider) {
    limitSlider.addEventListener('input', () => {
      limit = parseFloat(limitSlider.value) || 100000;
      if (limitVal) limitVal.textContent = MarketEngine.formatCurrency(limit);
      updateSliderTrackFill(limitSlider);
      updateGapReport();
    });
  }

  const dedSlider = document.getElementById('gapDeductible');
  const dedVal = document.getElementById('gapDeductibleVal');
  if (dedSlider) {
    dedSlider.addEventListener('input', () => {
      deductible = parseFloat(dedSlider.value) || 500;
      if (dedVal) dedVal.textContent = MarketEngine.formatCurrency(deductible);
      updateSliderTrackFill(dedSlider);
      updateGapReport();
    });
  }

  // Multi-select toggle for riders & risks
  function bindMultiSelect(groupId) {
    const c = document.getElementById(groupId);
    if (!c) return;
    c.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const isSelected = pill.classList.toggle('is-selected');
        pill.classList.toggle('is-active', isSelected);
        updateGapReport();
      });
    });
  }
  bindMultiSelect('gapRidersGroup');
  bindMultiSelect('gapRisksGroup');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      policyType = 'auto';
      renewal = 'under-30';
      limit = 100000;
      deductible = 500;
      if (limitSlider) { limitSlider.value = 100000; updateSliderTrackFill(limitSlider); if (limitVal) limitVal.textContent = MarketEngine.formatCurrency(100000); }
      if (dedSlider) { dedSlider.value = 500; updateSliderTrackFill(dedSlider); if (dedVal) dedVal.textContent = MarketEngine.formatCurrency(500); }
      ['gapPolicyTypeGroup', 'gapRenewalGroup'].forEach(gid => {
        const c = document.getElementById(gid);
        if (c) {
          c.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach((p, idx) => {
            const isDef = idx === 0;
            p.classList.toggle('is-selected', isDef);
            p.classList.toggle('is-active', isDef);
          });
        }
      });
      ['gapRidersGroup', 'gapRisksGroup'].forEach(gid => {
        const c = document.getElementById(gid);
        if (c) {
          c.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach((p, idx) => {
            const isDef = idx === 0;
            p.classList.toggle('is-selected', isDef);
            p.classList.toggle('is-active', isDef);
          });
        }
      });
      adaptInputsForPolicy('auto');
      setStep(1);
      updateGapReport();
    });
  }

  function updateGapReport() {
    const items = [];

    if (policyType === 'auto') {
      items.push({
        name: 'Bodily Injury Liability Ceiling',
        declared: MarketEngine.formatCurrency(limit),
        benchmark: '$250,000 / $500,000+',
        status: limit >= 250000 ? 'Reviewed (Adequate)' : 'Worth Reviewing',
        statusClass: limit >= 250000 ? 'status-safe' : 'status-review',
        why: limit < 250000 ?
          'Modern catastrophic multi-car collisions routinely exceed $100,000. Any court award above your limit can lead to wage garnishment.' :
          'Your declared liability ceiling provides a substantial barrier against civil liability judgments.'
      });
      items.push({
        name: MarketEngine.getDeductibleTerm() + ' Affordability',
        declared: MarketEngine.formatCurrency(deductible),
        benchmark: '$500 – $1,000 with Emergency Fund',
        status: deductible <= 1500 ? 'Reviewed (Adequate)' : 'Worth Reviewing',
        statusClass: deductible <= 1500 ? 'status-safe' : 'status-review',
        why: deductible > 1500 ?
          'A high deductible saves money on premiums, but requires maintaining immediate cash on hand when filing a claim.' :
          'Balanced risk-sharing level keeps monthly premiums affordable without extreme out-of-pocket shock.'
      });
      items.push({
        name: 'Uninsured / Underinsured Motorist (UM/UIM)',
        declared: 'Check Dec Page',
        benchmark: 'Match Bodily Injury Limits',
        status: 'Worth Reviewing',
        statusClass: 'status-review',
        why: 'In many states, 1 in 8 drivers has zero insurance. Matching UM/UIM limits protects you if hit by an uninsured driver.'
      });
    } else if (policyType === 'home') {
      items.push({
        name: 'Dwelling Replacement Cost (Coverage A)',
        declared: MarketEngine.formatCurrency(limit),
        benchmark: '100% Local Reconstruction Value',
        status: limit >= 300000 ? 'Reviewed (Adequate)' : 'Worth Reviewing',
        statusClass: limit >= 300000 ? 'status-safe' : 'status-review',
        why: limit < 300000 ?
          'Labor and building materials have escalated significantly. Ensure your limit covers modern architectural rebuild costs.' :
          'Dwelling limit is aligned with estimated replacement cost baselines.'
      });
      items.push({
        name: 'Water Backup & Sump Overflow Rider',
        declared: 'Check Policy Endorsement',
        benchmark: 'Mandatory Endorsement ($10k+ limit)',
        status: 'Worth Reviewing',
        statusClass: 'status-review',
        why: 'Standard home policies strictly exclude sewer and drain backup damage unless you have an explicit water backup rider.'
      });
      items.push({
        name: 'Extended Replacement Cost Endorsement',
        declared: 'Check Dec Page',
        benchmark: '+25% to +50% Buffer',
        status: 'Worth Reviewing',
        statusClass: 'status-review',
        why: 'Post-disaster demand surges drive local contractor costs up 30%. An extended replacement cost buffer protects against this.'
      });
    } else {
      items.push({
        name: 'Policy Coverage Limit',
        declared: MarketEngine.formatCurrency(limit),
        benchmark: 'Adequate Risk Transfer',
        status: 'Reviewed (Adequate)',
        statusClass: 'status-safe',
        why: 'Your stated policy ceiling provides baseline financial risk transfer.'
      });
      items.push({
        name: 'Out-of-Pocket ' + MarketEngine.getDeductibleTerm(),
        declared: MarketEngine.formatCurrency(deductible),
        benchmark: 'Supported by Cash Reserves',
        status: 'Reviewed (Adequate)',
        statusClass: 'status-safe',
        why: 'Ensure this deductible amount is held liquid in a high-yield savings account.'
      });
    }

    const reviewItems = items.filter(i => i.status.includes('Worth Reviewing'));
    const countDisplay = document.getElementById('gapCountDisplay');
    const heading = document.getElementById('gapReportHeading');
    if (countDisplay) countDisplay.textContent = `${reviewItems.length} Items`;
    if (heading) heading.textContent = `${reviewItems.length} Areas Worth Reviewing`;

    const grid = document.getElementById('gapReportGrid');
    if (grid) {
      grid.innerHTML = items.map(item => `
        <div class="apple-card" style="padding: 20px; border-left: 4px solid ${item.statusClass === 'status-safe' ? '#059669' : '#d97706'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <h4 style="font-size: 1rem; font-weight: 600; color: var(--color-text); margin: 0;">${escapeHtml(item.name)}</h4>
            <span class="pill ${item.statusClass === 'status-safe' ? 'pill-accent' : ''}" style="font-size: 0.75rem; background: ${item.statusClass === 'status-safe' ? '#ecfdf5' : '#fffbeb'}; color: ${item.statusClass === 'status-safe' ? '#059669' : '#d97706'};">
              ${escapeHtml(item.status)}
            </span>
          </div>
          <div style="display: flex; gap: 16px; font-size: 0.8125rem; color: var(--color-secondary); margin-bottom: 8px;">
            <span><strong>Your Input:</strong> ${escapeHtml(item.declared)}</span>
            <span><strong>Benchmark:</strong> ${escapeHtml(item.benchmark)}</span>
          </div>
          <p style="font-size: 0.875rem; line-height: 1.5; color: var(--color-secondary); margin: 0;">
            ${escapeHtml(item.why)}
          </p>
        </div>
      `).join('');
    }
  }

  adaptInputsForPolicy('auto');
  updateGapReport();
}

// ==========================================================================
// Tool 13: Policy Review Checklist (policy-review-checklist)
// ==========================================================================
function initPolicyReviewChecklistTool() {
  const lab = document.getElementById('auditChecklistInteractiveLab');
  if (!lab) return;

  let step = 1;
  const clauseStates = {};
  POLICY_REVIEW_CLAUSES.forEach(c => { clauseStates[c.id] = 'understand'; });
  let xpAwarded = false;

  function setStep(s) {
    step = Math.max(1, Math.min(3, s));
    for (let i = 1; i <= 3; i++) {
      const tab = document.getElementById('chkStepTab' + i);
      const panel = document.getElementById('chkStepPanel' + i);
      if (tab) tab.classList.toggle('is-active', i === step);
      if (panel) panel.classList.toggle('is-active', i === step);
    }
    if (step === 3) {
      renderPromptQuestions();
      if (!xpAwarded) {
        xpAwarded = true;
        GamificationEngine.awardXp(25, 'Completed 10-Point Policy Review Checklist', 'policy-review-checklist');
      }
    }
  }

  [1, 2, 3].forEach(i => {
    const tab = document.getElementById('chkStepTab' + i);
    if (tab) tab.addEventListener('click', () => setStep(i));
  });

  const next1 = document.getElementById('chkBtnNext1');
  const next2 = document.getElementById('chkBtnNext2');
  const back2 = document.getElementById('chkBtnBack2');
  const back3 = document.getElementById('chkBtnBack3');
  const resetBtn = document.getElementById('chkBtnReset');

  if (next1) next1.addEventListener('click', () => setStep(2));
  if (next2) next2.addEventListener('click', () => setStep(3));
  if (back2) back2.addEventListener('click', () => setStep(1));
  if (back3) back3.addEventListener('click', () => setStep(2));

  // Render 10 interactive clause audit rows
  const listEl = document.getElementById('chkItemsList');
  if (listEl) {
    listEl.innerHTML = POLICY_REVIEW_CLAUSES.map((c, idx) => `
      <div class="apple-card" style="padding: 16px 20px; margin-bottom: 12px;" data-clause-row="${c.id}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
          <div>
            <h4 style="font-size: 0.9375rem; font-weight: 600; color: var(--color-text); margin: 0 0 4px 0;">
              ${idx + 1}. ${escapeHtml(c.title)}
            </h4>
            <p style="font-size: 0.8125rem; color: var(--color-secondary); margin: 0; line-height: 1.5;">
              ${escapeHtml(c.desc)}
            </p>
          </div>
        </div>
        <div class="chk-toggle-group" style="display: flex; gap: 8px; margin-top: 10px;">
          <button type="button" class="tier-toggle-pill is-selected" data-clause="${c.id}" data-val="understand">Understand</button>
          <button type="button" class="tier-toggle-pill" data-clause="${c.id}" data-val="check">Need to check</button>
          <button type="button" class="tier-toggle-pill" data-clause="${c.id}" data-val="na">Not applicable</button>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('button[data-clause]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-clause');
        const val = btn.getAttribute('data-val');
        clauseStates[cId] = val;
        const row = btn.closest('[data-clause-row]');
        if (row) {
          row.querySelectorAll('button[data-clause]').forEach(b => b.classList.remove('is-selected', 'is-active'));
          btn.classList.add('is-selected', 'is-active');
        }
        updateChecklistSummary();
      });
    });
  }

  function updateChecklistSummary() {
    let understood = 0;
    let needCheck = 0;
    let na = 0;
    Object.values(clauseStates).forEach(v => {
      if (v === 'understand') understood++;
      else if (v === 'check') needCheck++;
      else if (v === 'na') na++;
    });

    const total = POLICY_REVIEW_CLAUSES.length;
    const reviewed = understood + needCheck + na;
    const pct = Math.round((reviewed / total) * 100);

    const badge = document.getElementById('chkScoreBadge');
    const compPct = document.getElementById('chkCompletionPct');
    const title = document.getElementById('chkSummaryTitle');
    const desc = document.getElementById('chkSummaryDesc');

    if (badge) badge.textContent = `${reviewed} / ${total} Audited`;
    if (compPct) compPct.textContent = `${pct}%`;
    if (title) title.textContent = needCheck > 0 ? `${needCheck} Items to Check with Insurer` : 'All 10 Clauses Understood';
    if (desc) desc.textContent = needCheck > 0 ?
      `You have marked ${needCheck} contractual provisions for verification. Review your generated carrier questions in Step 3.` :
      'Excellent! You have reviewed all 10 core clauses. Proceed to generate your carrier verification summary.';
  }

  function renderPromptQuestions() {
    const container = document.getElementById('chkActionPromptList');
    if (!container) return;

    const checkItems = POLICY_REVIEW_CLAUSES.filter(c => clauseStates[c.id] === 'check');
    if (checkItems.length === 0) {
      container.innerHTML = `
        <div class="apple-card" style="padding: 24px; text-align: center;">
          <p style="color: #059669; font-weight: 600; margin-bottom: 8px;">🎉 All 10 Clauses Understood!</p>
          <p style="color: var(--color-secondary); font-size: 0.875rem; margin: 0;">
            You have marked zero items as needing verification. If you have questions later, you can return and flag specific clauses.
          </p>
        </div>
      `;
      return;
    }

    const questionsText = checkItems.map((c, idx) => `${idx + 1}. [${c.title}]: ${c.defaultPrompt}`).join('\n\n');

    container.innerHTML = `
      <div class="apple-card" style="padding: 20px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <strong style="font-size: 0.9375rem; color: var(--color-text);">Carrier Prompt Questions (${checkItems.length})</strong>
          <button type="button" class="btn btn-secondary" id="chkBtnCopyQuestions" style="font-size: 0.8125rem; padding: 6px 14px;">
            Copy All Questions
          </button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${checkItems.map(c => `
            <div style="background: var(--color-surface); padding: 14px 16px; border-radius: var(--radius-xs); border-left: 3px solid var(--color-accent);">
              <div style="font-weight: 600; font-size: 0.875rem; color: var(--color-text); margin-bottom: 4px;">${escapeHtml(c.title)}</div>
              <div style="font-size: 0.875rem; color: var(--color-secondary); line-height: 1.5;">"${escapeHtml(c.defaultPrompt)}"</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const copyBtn = document.getElementById('chkBtnCopyQuestions');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(questionsText).then(() => {
            copyBtn.textContent = '✅ Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy All Questions'; }, 2200);
          });
        }
      });
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      POLICY_REVIEW_CLAUSES.forEach(c => { clauseStates[c.id] = 'understand'; });
      if (listEl) {
        listEl.querySelectorAll('[data-clause-row]').forEach(row => {
          const pills = row.querySelectorAll('button[data-clause]');
          pills.forEach((p, idx) => p.classList.toggle('is-selected', idx === 0));
        });
      }
      updateChecklistSummary();
      setStep(1);
    });
  }

  updateChecklistSummary();
}

// ==========================================================================
// Tool 14: Insurance Readiness Quiz (insurance-readiness-quiz)
// ==========================================================================
function initReadinessQuizTool() {
  const lab = document.getElementById('readinessQuizInteractiveLab');
  if (!lab) return;

  let currentIdx = 0;
  let score = 0;
  const missedQuestions = [];
  const total = READINESS_QUIZ_QUESTIONS.length;
  let xpAwarded = false;

  function renderQuestion() {
    const q = READINESS_QUIZ_QUESTIONS[currentIdx];
    const counter = document.getElementById('quizQuestionCounter');
    const scoreCounter = document.getElementById('quizScoreCounter');
    const fill = document.getElementById('quizProgressBarFill');
    const wrap = document.getElementById('quizActiveCardWrap');

    if (counter) counter.textContent = `Question ${currentIdx + 1} of ${total}`;
    if (scoreCounter) scoreCounter.textContent = `Score: ${score} / ${currentIdx}`;
    if (fill) fill.style.width = `${Math.round(((currentIdx + 1) / total) * 100)}%`;

    if (!wrap) return;

    wrap.innerHTML = `
      <div class="apple-card" style="padding: 28px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <span class="pill pill-accent">${escapeHtml(q.concept)}</span>
          <span style="font-size: 0.8125rem; color: var(--color-tertiary);">Scenario #${currentIdx + 1}</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-text); margin: 0 0 10px 0;">${escapeHtml(q.title)}</h3>
        <p style="font-size: 1rem; line-height: 1.6; color: var(--color-secondary); background: var(--color-surface); padding: 14px 18px; border-radius: var(--radius-xs); margin-bottom: 16px;">
          ${escapeHtml(q.scenario)}
        </p>
        <div style="font-weight: 600; font-size: 1rem; color: var(--color-text); margin-bottom: 16px;">
          ${escapeHtml(q.question)}
        </div>

        <div class="quiz-options-list" style="display: flex; flex-direction: column; gap: 10px;" id="quizOptionsList">
          ${q.options.map((opt, oIdx) => `
            <button type="button" class="quiz-option-btn" data-opt-idx="${oIdx}" style="text-align: left; padding: 14px 18px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: #ffffff; cursor: pointer; font-size: 0.9375rem; color: var(--color-text); transition: all 0.2s ease;">
              <span style="font-weight: 600; margin-right: 8px; color: var(--color-secondary);">${String.fromCharCode(65 + oIdx)}.</span>
              ${escapeHtml(opt)}
            </button>
          `).join('')}
        </div>

        <div id="quizFeedbackBox" style="display: none; margin-top: 20px; padding: 16px 20px; border-radius: var(--radius-sm);">
          <div id="quizFeedbackTitle" style="font-weight: 600; margin-bottom: 6px;"></div>
          <div id="quizFeedbackText" style="font-size: 0.875rem; line-height: 1.6; color: var(--color-secondary);"></div>
          <button type="button" class="btn btn-primary" id="quizBtnNext" style="margin-top: 14px;">
            ${currentIdx + 1 === total ? 'View Scorecard &rarr;' : 'Next Scenario &rarr;'}
          </button>
        </div>
      </div>
    `;

    const buttons = wrap.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        buttons.forEach(b => b.disabled = true);

        const fbBox = document.getElementById('quizFeedbackBox');
        const fbTitle = document.getElementById('quizFeedbackTitle');
        const fbText = document.getElementById('quizFeedbackText');

        if (selectedIdx === q.correctIndex) {
          score++;
          btn.style.borderColor = '#059669';
          btn.style.background = '#ecfdf5';
          if (fbBox) {
            fbBox.style.background = '#ecfdf5';
            fbBox.style.border = '1px solid #a7f3d0';
            fbBox.style.display = 'block';
          }
          if (fbTitle) {
            fbTitle.innerHTML = '✅ Correct!';
            fbTitle.style.color = '#059669';
          }
        } else {
          missedQuestions.push(q);
          btn.style.borderColor = '#dc2626';
          btn.style.background = '#fef2f2';
          const correctBtn = wrap.querySelector('button[data-opt-idx="' + q.correctIndex + '"]');
          if (correctBtn) {
            correctBtn.style.borderColor = '#059669';
            correctBtn.style.background = '#ecfdf5';
          }
          if (fbBox) {
            fbBox.style.background = '#fffbeb';
            fbBox.style.border = '1px solid #fde68a';
            fbBox.style.display = 'block';
          }
          if (fbTitle) {
            fbTitle.innerHTML = '⚠️ Key Learning Opportunity';
            fbTitle.style.color = '#d97706';
          }
        }

        if (fbText) fbText.textContent = q.explanation;

        const nextBtn = document.getElementById('quizBtnNext');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            currentIdx++;
            if (currentIdx < total) {
              renderQuestion();
            } else {
              showResults();
            }
          });
        }
      });
    });
  }

  function showResults() {
    const wrap = document.getElementById('quizActiveCardWrap');
    const resSec = document.getElementById('quizResultsSection');
    if (wrap) wrap.style.display = 'none';
    if (resSec) resSec.style.display = 'block';

    const pct = Math.round((score / total) * 100);
    const scoreBig = document.getElementById('quizFinalScoreBig');
    const scoreText = document.getElementById('quizFinalScoreText');
    const praiseTitle = document.getElementById('quizPraiseTitle');
    const praiseDesc = document.getElementById('quizPraiseDesc');

    if (scoreBig) scoreBig.textContent = `${score} / ${total}`;
    if (scoreText) scoreText.textContent = `Score: ${pct}%`;

    if (praiseTitle) {
      praiseTitle.textContent = pct >= 80 ? 'Master-Level Insurance Readiness!' : pct >= 60 ? 'Solid Insurance Foundation!' : 'Great Learning Opportunity!';
    }
    if (praiseDesc) {
      praiseDesc.innerHTML = `You completed all 10 scenario dilemmas and earned <strong>+15 XP</strong>. Review the concept tags below to plug any knowledge gaps.`;
    }

    const revisitList = document.getElementById('quizRevisitList');
    if (revisitList) {
      if (missedQuestions.length === 0) {
        revisitList.innerHTML = `
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-xs); padding: 16px; color: #059669;">
            🎉 <strong>Flawless Score!</strong> You answered all 10 scenario challenges correctly. You understand deductibles, replacement costs, exclusions, and liability mechanics.
          </div>
        `;
      } else {
        revisitList.innerHTML = `
          <p style="font-size: 0.875rem; color: var(--color-secondary); margin-bottom: 12px;">
            Here are the specific concepts you encountered where reviewing can prevent real-world policy surprises:
          </p>
          <div class="revisit-list-grid">
            ${missedQuestions.map(mq => `
              <div class="revisit-item-card">
                <div class="revisit-item-header">
                  <span class="revisit-item-title">${escapeHtml(mq.title)}</span>
                  <span class="pill pill-accent">${escapeHtml(mq.concept)}</span>
                </div>
                <p class="revisit-item-explanation">${escapeHtml(mq.explanation)}</p>
              </div>
            `).join('')}
          </div>
        `;
      }
    }

    if (!xpAwarded) {
      xpAwarded = true;
      GamificationEngine.awardXp(15, 'Completed Insurance Readiness Quiz', 'insurance-readiness-quiz');
    }
  }

  renderQuestion();
}

// ==========================================================================
// Tool 15: Insurance Terminology Quiz (insurance-terminology-quiz)
// ==========================================================================
function initTerminologyQuizTool() {
  const lab = document.getElementById('termsQuizInteractiveLab');
  if (!lab) return;

  let currentIdx = 0;
  let score = 0;
  const missedTerms = [];
  const total = TERMINOLOGY_QUIZ_TERMS.length;
  let xpAwarded = false;

  function renderTerm() {
    const t = TERMINOLOGY_QUIZ_TERMS[currentIdx];
    const counter = document.getElementById('termsQuestionCounter');
    const scoreCounter = document.getElementById('termsScoreCounter');
    const fill = document.getElementById('termsProgressBarFill');
    const wrap = document.getElementById('termsActiveCardWrap');

    if (counter) counter.textContent = `Term ${currentIdx + 1} of ${total}`;
    if (scoreCounter) scoreCounter.textContent = `Score: ${score} / ${currentIdx}`;
    if (fill) fill.style.width = `${Math.round(((currentIdx + 1) / total) * 100)}%`;

    if (!wrap) return;

    wrap.innerHTML = `
      <div class="apple-card" style="padding: 28px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <span class="pill pill-accent">Vocabulary Challenge</span>
          <span style="font-size: 0.8125rem; color: var(--color-tertiary);">Term #${currentIdx + 1} of ${total}</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-text); margin: 0 0 16px 0;">${escapeHtml(t.question)}</h3>

        <div class="quiz-options-list" style="display: flex; flex-direction: column; gap: 10px;" id="termsOptionsList">
          ${t.options.map((opt, oIdx) => `
            <button type="button" class="quiz-option-btn" data-terms-idx="${oIdx}" style="text-align: left; padding: 14px 18px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: #ffffff; cursor: pointer; font-size: 0.9375rem; color: var(--color-text); transition: all 0.2s ease;">
              <span style="font-weight: 600; margin-right: 8px; color: var(--color-secondary);">${String.fromCharCode(65 + oIdx)}.</span>
              ${escapeHtml(opt)}
            </button>
          `).join('')}
        </div>

        <div id="termsFeedbackBox" style="display: none; margin-top: 20px; padding: 16px 20px; border-radius: var(--radius-sm);">
          <div id="termsFeedbackTitle" style="font-weight: 600; margin-bottom: 6px;"></div>
          <div style="font-size: 0.875rem; line-height: 1.6; color: var(--color-secondary); margin-bottom: 8px;">
            <strong>Formal Definition:</strong> ${escapeHtml(t.definition)}
          </div>
          <div style="font-size: 0.875rem; line-height: 1.6; color: var(--color-secondary); margin-bottom: 8px;">
            <strong>Real-World Example:</strong> ${escapeHtml(t.example)}
          </div>
          <div style="font-size: 0.875rem; line-height: 1.6; color: var(--color-text);">
            <strong>Why it matters to you:</strong> ${escapeHtml(t.whyItMatters)}
          </div>
          <button type="button" class="btn btn-primary" id="termsBtnNext" style="margin-top: 14px;">
            ${currentIdx + 1 === total ? 'View Vocabulary Score &rarr;' : 'Next Term &rarr;'}
          </button>
        </div>
      </div>
    `;

    const buttons = wrap.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-terms-idx'), 10);
        buttons.forEach(b => b.disabled = true);

        const fbBox = document.getElementById('termsFeedbackBox');
        const fbTitle = document.getElementById('termsFeedbackTitle');

        if (selectedIdx === t.correctIndex) {
          score++;
          btn.style.borderColor = '#059669';
          btn.style.background = '#ecfdf5';
          if (fbBox) {
            fbBox.style.background = '#ecfdf5';
            fbBox.style.border = '1px solid #a7f3d0';
            fbBox.style.display = 'block';
          }
          if (fbTitle) {
            fbTitle.innerHTML = '✅ Mastered!';
            fbTitle.style.color = '#059669';
          }
        } else {
          missedTerms.push(t);
          btn.style.borderColor = '#dc2626';
          btn.style.background = '#fef2f2';
          const correctBtn = wrap.querySelector('button[data-terms-idx="' + t.correctIndex + '"]');
          if (correctBtn) {
            correctBtn.style.borderColor = '#059669';
            correctBtn.style.background = '#ecfdf5';
          }
          if (fbBox) {
            fbBox.style.background = '#fffbeb';
            fbBox.style.border = '1px solid #fde68a';
            fbBox.style.display = 'block';
          }
          if (fbTitle) {
            fbTitle.innerHTML = '📖 Concept Review';
            fbTitle.style.color = '#d97706';
          }
        }

        const nextBtn = document.getElementById('termsBtnNext');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            currentIdx++;
            if (currentIdx < total) {
              renderTerm();
            } else {
              showResults();
            }
          });
        }
      });
    });
  }

  function showResults() {
    const wrap = document.getElementById('termsActiveCardWrap');
    const resSec = document.getElementById('termsResultsSection');
    if (wrap) wrap.style.display = 'none';
    if (resSec) resSec.style.display = 'block';

    const pct = Math.round((score / total) * 100);
    const scoreBig = document.getElementById('termsScoreBig');
    const scoreText = document.getElementById('termsFinalScoreText');

    if (scoreBig) scoreBig.textContent = `${pct}%`;
    if (scoreText) scoreText.textContent = `${score} / ${total} Terms Mastered`;

    if (!xpAwarded) {
      xpAwarded = true;
      GamificationEngine.awardXp(15, 'Completed Insurance Terminology Quiz', 'insurance-terminology-quiz');
    }
  }

  const restartBtn = document.getElementById('termsBtnRestart');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      missedTerms.length = 0;
      const wrap = document.getElementById('termsActiveCardWrap');
      const resSec = document.getElementById('termsResultsSection');
      if (wrap) wrap.style.display = 'block';
      if (resSec) resSec.style.display = 'none';
      renderTerm();
    });
  }

  renderTerm();
}


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

  // --- 3. Out-of-Pocket Cost Calculator Interactive Engine (health-insurance-calculator) ---
  const oopLab = document.getElementById('oopInteractiveLab');
  if (oopLab) {
    let oopStep = 1;
    let oopType = 'health'; // 'health', 'auto-med', 'property'

    // Inputs
    const oopDeductible = document.getElementById('oopDeductible');
    const oopDeductibleVal = document.getElementById('oopDeductibleVal');
    const oopPriorPaid = document.getElementById('oopPriorPaid');
    const oopPriorPaidVal = document.getElementById('oopPriorPaidVal');
    const oopDeductibleRemainingBadge = document.getElementById('oopDeductibleRemainingBadge');

    const oopCopay = document.getElementById('oopCopay');
    const oopCopayVal = document.getElementById('oopCopayVal');
    const oopCopayGroup = document.getElementById('oopCopayGroup');

    const oopCoinsurance = document.getElementById('oopCoinsurance');
    const oopCoinsuranceVal = document.getElementById('oopCoinsuranceVal');
    const oopCoinsuranceGroup = document.getElementById('oopCoinsuranceGroup');

    const oopMaxLimit = document.getElementById('oopMaxLimit');
    const oopMaxLimitVal = document.getElementById('oopMaxLimitVal');
    const oopMaxLimitLabel = document.getElementById('oopMaxLimitLabel');
    const oopMaxLimitHelp = document.getElementById('oopMaxLimitHelp');

    const oopTotalBill = document.getElementById('oopTotalBill');
    const oopTotalBillVal = document.getElementById('oopTotalBillVal');

    // Outputs
    const oopResultUserTotal = document.getElementById('oopResultUserTotal');
    const oopResultUserDeductible = document.getElementById('oopResultUserDeductible');
    const oopResultUserCopay = document.getElementById('oopResultUserCopay');
    const oopResultUserCopayRow = document.getElementById('oopResultUserCopayRow');
    const oopResultUserCoinsurance = document.getElementById('oopResultUserCoinsurance');
    const oopResultUserCoinsuranceRow = document.getElementById('oopResultUserCoinsuranceRow');
    const oopResultUserUncovered = document.getElementById('oopResultUserUncovered');
    const oopResultUserUncoveredRow = document.getElementById('oopResultUserUncoveredRow');

    const oopResultInsurerTotal = document.getElementById('oopResultInsurerTotal');
    const oopResultTotalBillEcho = document.getElementById('oopResultTotalBillEcho');
    const oopResultInsurerCoinsurance = document.getElementById('oopResultInsurerCoinsurance');
    const oopResultInsurerPct = document.getElementById('oopResultInsurerPct');
    const oopVisualTotalEcho = document.getElementById('oopVisualTotalEcho');

    const segDeductible = document.getElementById('segDeductible');
    const segCopay = document.getElementById('segCopay');
    const segCoinsurance = document.getElementById('segCoinsurance');
    const segInsurer = document.getElementById('segInsurer');
    const segUncovered = document.getElementById('segUncovered');

    const legDeductible = document.getElementById('legDeductible');
    const legCopay = document.getElementById('legCopay');
    const legCoinsurance = document.getElementById('legCoinsurance');
    const legInsurer = document.getElementById('legInsurer');
    const legUncovered = document.getElementById('legUncovered');
    const legCopayWrap = document.getElementById('legCopayWrap');
    const legCoinsuranceWrap = document.getElementById('legCoinsuranceWrap');
    const legUncoveredWrap = document.getElementById('legUncoveredWrap');

    const oopResultStatus = document.getElementById('oopResultStatus');
    const oopMeansDed = document.getElementById('oopMeansDed');
    const oopMathStep1 = document.getElementById('oopMathStep1');
    const oopMathStep2 = document.getElementById('oopMathStep2');
    const oopMathStep3 = document.getElementById('oopMathStep3');
    const oopMathStep4 = document.getElementById('oopMathStep4');
    const oopMathStep5 = document.getElementById('oopMathStep5');

    // Stepper Navigation
    function setOopStep(stepNum) {
      oopStep = Math.max(1, Math.min(3, stepNum));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('oopStepTab' + i);
        const panel = document.getElementById('oopStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === oopStep);
        if (panel) panel.classList.toggle('is-active', i === oopStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('oopStepTab' + i);
      if (tab) tab.addEventListener('click', () => setOopStep(i));
    });

    const oopBtnNext1 = document.getElementById('oopBtnNext1');
    const oopBtnNext2 = document.getElementById('oopBtnNext2');
    const oopBtnBack2 = document.getElementById('oopBtnBack2');
    const oopBtnBack3 = document.getElementById('oopBtnBack3');
    const oopBtnReset = document.getElementById('oopBtnReset');

    if (oopBtnNext1) oopBtnNext1.addEventListener('click', () => setOopStep(2));
    if (oopBtnNext2) oopBtnNext2.addEventListener('click', () => setOopStep(3));
    if (oopBtnBack2) oopBtnBack2.addEventListener('click', () => setOopStep(1));
    if (oopBtnBack3) oopBtnBack3.addEventListener('click', () => setOopStep(2));

    // Type Selection & Adaptation
    const oopTypeCards = document.querySelectorAll('#oopTypeGrid .type-select-card');
    oopTypeCards.forEach(card => {
      card.addEventListener('click', () => {
        oopTypeCards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        oopType = card.getAttribute('data-type') || 'health';
        adaptOopInputs();
        calculateOop();
      });
    });

    function adaptOopInputs() {
      if (oopType === 'health') {
        if (oopCopayGroup) oopCopayGroup.style.display = 'block';
        if (oopCoinsuranceGroup) oopCoinsuranceGroup.style.display = 'block';
        if (oopMaxLimitLabel) oopMaxLimitLabel.textContent = 'Annual Out-of-Pocket Maximum (OOP Max)';
        if (oopMaxLimitHelp) oopMaxLimitHelp.textContent = 'Once your qualified cost-sharing reaches this annual threshold, the insurer pays 100% of remaining covered expenses.';
        if (oopMaxLimit) { oopMaxLimit.max = '20000'; oopMaxLimit.value = '8000'; }
        if (oopCoinsurance) oopCoinsurance.value = '20';
        if (oopCopay) oopCopay.value = '40';
      } else if (oopType === 'auto-med') {
        if (oopCopayGroup) oopCopayGroup.style.display = 'none';
        if (oopCoinsuranceGroup) oopCoinsuranceGroup.style.display = 'block';
        if (oopMaxLimitLabel) oopMaxLimitLabel.textContent = 'PIP / MedPay Statutory Policy Limit';
        if (oopMaxLimitHelp) oopMaxLimitHelp.textContent = 'The total maximum dollar amount the carrier will pay per accident for covered medical care.';
        if (oopMaxLimit) { oopMaxLimit.max = '50000'; oopMaxLimit.value = '10000'; }
        if (oopCoinsurance) oopCoinsurance.value = '0';
        if (oopCopay) oopCopay.value = '0';
      } else if (oopType === 'property') {
        if (oopCopayGroup) oopCopayGroup.style.display = 'none';
        if (oopCoinsuranceGroup) oopCoinsuranceGroup.style.display = 'none';
        if (oopMaxLimitLabel) oopMaxLimitLabel.textContent = 'Dwelling / Personal Property Coverage Limit';
        if (oopMaxLimitHelp) oopMaxLimitHelp.textContent = 'Maximum policy limit for dwelling or personal property repair. Damage above this limit is 100% uninsured.';
        if (oopMaxLimit) { oopMaxLimit.max = '100000'; oopMaxLimit.value = '50000'; }
        if (oopCoinsurance) oopCoinsurance.value = '0';
        if (oopCopay) oopCopay.value = '0';
      }
      updateTrackFills();
    }

    // Quick Scenarios
    const oopScenarioBtns = document.querySelectorAll('#oopScenarioStrip .scenario-btn');
    oopScenarioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        oopScenarioBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const bAmt = parseFloat(btn.getAttribute('data-bill')) || 4500;
        if (oopTotalBill) {
          oopTotalBill.value = bAmt;
          calculateOop();
        }
      });
    });

    if (oopBtnReset) {
      oopBtnReset.addEventListener('click', () => {
        if (oopDeductible) oopDeductible.value = '2000';
        if (oopPriorPaid) oopPriorPaid.value = '500';
        if (oopCopay) oopCopay.value = '40';
        if (oopCoinsurance) oopCoinsurance.value = '20';
        if (oopMaxLimit) oopMaxLimit.value = '8000';
        if (oopTotalBill) oopTotalBill.value = '4500';
        oopType = 'health';
        oopTypeCards.forEach(c => c.classList.toggle('is-selected', c.getAttribute('data-type') === 'health'));
        adaptOopInputs();
        setOopStep(1);
        calculateOop();
      });
    }

    function updateTrackFills() {
      [oopDeductible, oopPriorPaid, oopCopay, oopCoinsurance, oopMaxLimit, oopTotalBill].forEach(el => {
        if (el) updateSliderTrackFill(el);
      });
    }

    // Calculation Engine
    function calculateOop() {
      const ded = parseFloat(oopDeductible ? oopDeductible.value : 2000) || 0;
      let prior = parseFloat(oopPriorPaid ? oopPriorPaid.value : 500) || 0;
      if (prior > ded) {
        prior = ded;
        if (oopPriorPaid) oopPriorPaid.value = ded;
      }
      const hasCopay = (oopType === 'health');
      const copay = hasCopay ? (parseFloat(oopCopay ? oopCopay.value : 40) || 0) : 0;
      const hasCoins = (oopType !== 'property');
      const coinsPct = hasCoins ? (parseFloat(oopCoinsurance ? oopCoinsurance.value : 20) || 0) : 0;
      const maxLimit = parseFloat(oopMaxLimit ? oopMaxLimit.value : 8000) || 10000;
      const bill = parseFloat(oopTotalBill ? oopTotalBill.value : 4500) || 0;

      // Update input labels
      if (oopDeductibleVal) oopDeductibleVal.textContent = formatCurrency(ded);
      if (oopPriorPaidVal) oopPriorPaidVal.textContent = formatCurrency(prior);
      const remDed = Math.max(0, ded - prior);
      if (oopDeductibleRemainingBadge) {
        oopDeductibleRemainingBadge.innerHTML = 'Remaining deductible to meet: <strong class="num">' + formatCurrency(remDed) + '</strong>';
      }
      if (oopCopayVal) oopCopayVal.textContent = formatCurrency(copay);
      if (oopCoinsuranceVal) oopCoinsuranceVal.textContent = coinsPct + '% User / ' + (100 - coinsPct) + '% Insurer';
      if (oopMaxLimitVal) oopMaxLimitVal.textContent = formatCurrency(maxLimit);
      if (oopTotalBillVal) oopTotalBillVal.textContent = formatCurrency(bill);

      updateTrackFills();

      // --- Mathematical Allocation Logic ---
      // 1. Deductible Phase
      const userDedShare = Math.min(bill, remDed);
      const billAfterDed = Math.max(0, bill - userDedShare);

      // 2. Copay Phase
      const userCopayShare = hasCopay ? Math.min(billAfterDed, copay) : 0;
      const billAfterCopay = Math.max(0, billAfterDed - userCopayShare);

      // 3. Coinsurance Phase
      let userCoinsShare = 0;
      let insurerCoinsShare = 0;
      if (coinsPct > 0) {
        userCoinsShare = Math.round(billAfterCopay * (coinsPct / 100));
        insurerCoinsShare = billAfterCopay - userCoinsShare;
      } else {
        insurerCoinsShare = billAfterCopay;
      }

      // 4. Caps & Coverage Limits
      let totalUserBeforeCap = userDedShare + userCopayShare + userCoinsShare;
      let userOutOfPocketTotal = totalUserBeforeCap;
      let insurerTotal = insurerCoinsShare;
      let uncoveredAboveLimit = 0;
      let statusText = 'Edge-Case Verified';

      if (oopType === 'health') {
        // In Health, maxLimit is the Out-of-Pocket Maximum.
        // Prior deductible paid also counts toward the annual OOP Max.
        const remainingOopMax = Math.max(0, maxLimit - prior);
        if (totalUserBeforeCap > remainingOopMax) {
          const excessUser = totalUserBeforeCap - remainingOopMax;
          userOutOfPocketTotal = remainingOopMax;
          insurerTotal += excessUser;
          statusText = 'OOP Maximum Reached (100% Covered)';
        } else if (bill <= remDed) {
          statusText = 'Bill Below Deductible';
        } else if (remDed === 0) {
          statusText = 'Deductible Already 100% Met';
        }
      } else {
        // In Auto MedPay or Property, maxLimit is the insurer's policy payment limit.
        if (insurerTotal > maxLimit) {
          const excessAboveLimit = insurerTotal - maxLimit;
          insurerTotal = maxLimit;
          uncoveredAboveLimit = excessAboveLimit;
          userOutOfPocketTotal += uncoveredAboveLimit;
          statusText = 'Policy Limit Exceeded';
        } else if (bill <= remDed) {
          statusText = 'Bill Below Deductible';
        }
      }

      // Edge Cases: 0% Coinsurance, 100% Coinsurance
      if (coinsPct === 0 && oopType !== 'property') {
        statusText += ' • 0% Coinsurance (100% Insurer)';
      } else if (coinsPct === 100) {
        statusText += ' • 100% Coinsurance (User Pays)';
      }

      if (oopResultStatus) oopResultStatus.textContent = statusText;

      // Update Results DOM
      if (oopResultUserTotal) animateCalculatedNumber(oopResultUserTotal, userOutOfPocketTotal, { prefix: '$' });
      if (oopResultUserDeductible) oopResultUserDeductible.textContent = formatCurrency(userDedShare);
      if (oopResultUserCopay) oopResultUserCopay.textContent = formatCurrency(userCopayShare);
      if (oopResultUserCoinsurance) oopResultUserCoinsurance.textContent = formatCurrency(userCoinsShare);
      if (oopResultUserCopayRow) oopResultUserCopayRow.style.display = hasCopay ? 'flex' : 'none';
      if (oopResultUserCoinsuranceRow) oopResultUserCoinsuranceRow.style.display = hasCoins ? 'flex' : 'none';

      if (oopResultUserUncoveredRow) {
        oopResultUserUncoveredRow.style.display = uncoveredAboveLimit > 0 ? 'flex' : 'none';
        if (oopResultUserUncovered) oopResultUserUncovered.textContent = formatCurrency(uncoveredAboveLimit);
      }

      if (oopResultInsurerTotal) animateCalculatedNumber(oopResultInsurerTotal, insurerTotal, { prefix: '$' });
      if (oopResultTotalBillEcho) oopResultTotalBillEcho.textContent = formatCurrency(bill);
      if (oopResultInsurerCoinsurance) oopResultInsurerCoinsurance.textContent = formatCurrency(insurerTotal);
      const insurerPct = bill > 0 ? ((insurerTotal / bill) * 100).toFixed(1) : '0.0';
      if (oopResultInsurerPct) oopResultInsurerPct.textContent = insurerPct + '%';
      if (oopVisualTotalEcho) oopVisualTotalEcho.textContent = formatCurrency(bill);

      // Visual Bill Bar
      if (bill > 0) {
        const pDed = ((userDedShare / bill) * 100).toFixed(1);
        const pCopay = ((userCopayShare / bill) * 100).toFixed(1);
        const pCoins = ((userCoinsShare / bill) * 100).toFixed(1);
        const pInsurer = ((insurerTotal / bill) * 100).toFixed(1);
        const pUncov = ((uncoveredAboveLimit / bill) * 100).toFixed(1);

        if (segDeductible) { segDeductible.style.width = pDed + '%'; segDeductible.title = 'Deductible: ' + formatCurrency(userDedShare); }
        if (segCopay) { segCopay.style.width = pCopay + '%'; segCopay.title = 'Copay: ' + formatCurrency(userCopayShare); }
        if (segCoinsurance) { segCoinsurance.style.width = pCoins + '%'; segCoinsurance.title = 'Coinsurance: ' + formatCurrency(userCoinsShare); }
        if (segInsurer) { segInsurer.style.width = pInsurer + '%'; segInsurer.title = 'Insurer Paid: ' + formatCurrency(insurerTotal); }
        if (segUncovered) { segUncovered.style.width = pUncov + '%'; segUncovered.title = 'Uncovered Above Limit: ' + formatCurrency(uncoveredAboveLimit); }

        if (legDeductible) legDeductible.textContent = formatCurrency(userDedShare) + ' (' + pDed + '%)';
        if (legCopay) legCopay.textContent = formatCurrency(userCopayShare) + ' (' + pCopay + '%)';
        if (legCoinsurance) legCoinsurance.textContent = formatCurrency(userCoinsShare) + ' (' + pCoins + '%)';
        if (legInsurer) legInsurer.textContent = formatCurrency(insurerTotal) + ' (' + pInsurer + '%)';
        if (legUncovered) legUncovered.textContent = formatCurrency(uncoveredAboveLimit) + ' (' + pUncov + '%)';

        if (legCopayWrap) legCopayWrap.style.display = hasCopay && userCopayShare > 0 ? 'inline-flex' : 'none';
        if (legCoinsuranceWrap) legCoinsuranceWrap.style.display = hasCoins && userCoinsShare > 0 ? 'inline-flex' : 'none';
        if (legUncoveredWrap) legUncoveredWrap.style.display = uncoveredAboveLimit > 0 ? 'inline-flex' : 'none';
      }

      // Educational Narrative & Math Steps
      if (oopMeansDed) oopMeansDed.textContent = formatCurrency(userDedShare);
      if (oopMathStep1) oopMathStep1.textContent = 'Remaining deductible = Math.max(0, ' + formatCurrency(ded) + ' − ' + formatCurrency(prior) + ' prior) = ' + formatCurrency(remDed) + '. User pays Math.min(' + formatCurrency(bill) + ', ' + formatCurrency(remDed) + ') = ' + formatCurrency(userDedShare) + '.';
      if (oopMathStep2) oopMathStep2.textContent = formatCurrency(bill) + ' − ' + formatCurrency(userDedShare) + ' = ' + formatCurrency(billAfterDed) + ' subject to cost-sharing.';
      if (oopMathStep3) {
        if (hasCopay && copay > 0) {
          oopMathStep3.textContent = 'Copay of ' + formatCurrency(userCopayShare) + ' applied. Remaining ' + formatCurrency(billAfterCopay) + ' split: user ' + coinsPct + '% (' + formatCurrency(userCoinsShare) + ') / insurer ' + (100 - coinsPct) + '% (' + formatCurrency(insurerCoinsShare) + ').';
        } else {
          oopMathStep3.textContent = 'Remaining ' + formatCurrency(billAfterDed) + ' split: user ' + coinsPct + '% (' + formatCurrency(userCoinsShare) + ') / insurer ' + (100 - coinsPct) + '% (' + formatCurrency(insurerCoinsShare) + ').';
        }
      }
      if (oopMathStep4) {
        if (oopType === 'health') {
          oopMathStep4.textContent = 'Total user cost (' + formatCurrency(totalUserBeforeCap) + ') tested against remaining OOP Max (' + formatCurrency(Math.max(0, maxLimit - prior)) + '). Final user out-of-pocket: ' + formatCurrency(userOutOfPocketTotal) + '.';
        } else {
          oopMathStep4.textContent = 'Insurer payment (' + formatCurrency(insurerTotal) + ') tested against policy limit (' + formatCurrency(maxLimit) + '). Uncovered excess: ' + formatCurrency(uncoveredAboveLimit) + '.';
        }
      }
      if (oopMathStep5) {
        oopMathStep5.textContent = 'Estimated User Share: ' + formatCurrency(userOutOfPocketTotal) + ' | Estimated Insurer Payment: ' + formatCurrency(insurerTotal) + '.';
      }
    }

    [oopDeductible, oopPriorPaid, oopCopay, oopCoinsurance, oopMaxLimit, oopTotalBill].forEach(el => {
      if (el) {
        el.addEventListener('input', calculateOop);
        el.addEventListener('change', calculateOop);
      }
    });

    calculateOop();
  }

  // --- 4. Car Insurance Coverage Calculator Interactive Engine (car-insurance-calculator) ---
  const carCovLab = document.getElementById('carCoverageInteractiveLab');
  if (carCovLab) {
    let carCovStep = 1;
    let carCovAge = 'new';
    let carCovOwnership = 'financed';
    let carCovMileage = 'average';
    let carCovDriver = 'solo';
    let carCovAssets = 'mid';
    let carCovMarket = 'us-tort';

    const carCovValue = document.getElementById('carCovValue');
    const carCovValueVal = document.getElementById('carCovValueVal');

    function setCarCovStep(stepNum) {
      carCovStep = Math.max(1, Math.min(3, stepNum));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('carCovStepTab' + i);
        const panel = document.getElementById('carCovStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === carCovStep);
        if (panel) panel.classList.toggle('is-active', i === carCovStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('carCovStepTab' + i);
      if (tab) tab.addEventListener('click', () => setCarCovStep(i));
    });

    const carCovBtnNext1 = document.getElementById('carCovBtnNext1');
    const carCovBtnNext2 = document.getElementById('carCovBtnNext2');
    const carCovBtnBack2 = document.getElementById('carCovBtnBack2');
    const carCovBtnBack3 = document.getElementById('carCovBtnBack3');
    const carCovBtnReset = document.getElementById('carCovBtnReset');

    if (carCovBtnNext1) carCovBtnNext1.addEventListener('click', () => setCarCovStep(2));
    if (carCovBtnNext2) carCovBtnNext2.addEventListener('click', () => setCarCovStep(3));
    if (carCovBtnBack2) carCovBtnBack2.addEventListener('click', () => setCarCovStep(1));
    if (carCovBtnBack3) carCovBtnBack3.addEventListener('click', () => setCarCovStep(2));

    function setupPillGroup(groupId, attrName, callback) {
      const btns = document.querySelectorAll('#' + groupId + ' .pill-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('is-active', 'is-selected'));
          btn.classList.add('is-active', 'is-selected');
          callback(btn.getAttribute(attrName) || btn.getAttribute('data-val'));
          evaluateCoverageChecklist();
        });
      });
    }

    setupPillGroup('carCovAgeGroup', 'data-age', val => { carCovAge = val; });
    setupPillGroup('carCovOwnershipGroup', 'data-ownership', val => { carCovOwnership = val; });
    setupPillGroup('carCovMileageGroup', 'data-mileage', val => { carCovMileage = val; });
    setupPillGroup('carCovDriverGroup', 'data-driver', val => { carCovDriver = val; });
    setupPillGroup('carCovAssetsGroup', 'data-assets', val => { carCovAssets = val; });
    setupPillGroup('carCovMarketGroup', 'data-market', val => {
      carCovMarket = val;
      const help = document.getElementById('carCovMarketHelp');
      if (help) {
        if (val === 'us-nofault') help.textContent = 'In US no-fault states (e.g. FL, NY, MI, NJ), Personal Injury Protection (PIP) is mandatory by statute.';
        else if (val === 'canada') help.textContent = 'Canada uses standard statutory policy forms with strong mandatory accident benefits.';
        else if (val === 'uk') help.textContent = 'The UK requires unlimited third-party injury liability by law; comprehensive is standard.';
        else help.textContent = 'In standard at-fault jurisdictions, the negligent driver pays all third-party bodily injury and property damages.';
      }
    });

    if (carCovValue) {
      carCovValue.addEventListener('input', () => {
        if (carCovValueVal) carCovValueVal.textContent = formatCurrency(parseFloat(carCovValue.value) || 24000);
        updateSliderTrackFill(carCovValue);
        evaluateCoverageChecklist();
      });
    }

    if (carCovBtnReset) {
      carCovBtnReset.addEventListener('click', () => {
        if (carCovValue) carCovValue.value = '24000';
        carCovAge = 'new';
        carCovOwnership = 'financed';
        carCovMileage = 'average';
        carCovDriver = 'solo';
        carCovAssets = 'mid';
        carCovMarket = 'us-tort';

        ['carCovAgeGroup', 'carCovOwnershipGroup', 'carCovMileageGroup', 'carCovDriverGroup', 'carCovAssetsGroup', 'carCovMarketGroup'].forEach(gid => {
          const btns = document.querySelectorAll('#' + gid + ' .pill-btn');
          btns.forEach((b, idx) => {
            const isMatch = idx === 1 || (idx === 0 && gid !== 'carCovMileageGroup');
            b.classList.toggle('is-active', isMatch);
            b.classList.toggle('is-selected', isMatch);
          });
        });

        setCarCovStep(1);
        evaluateCoverageChecklist();
      });
    }

    function evaluateCoverageChecklist() {
      const val = parseFloat(carCovValue ? carCovValue.value : 24000) || 24000;
      if (carCovValueVal) carCovValueVal.textContent = formatCurrency(val);
      if (carCovValue) updateSliderTrackFill(carCovValue);

      // 1. Liability
      const badgeLiability = document.getElementById('badgeLiability');
      const noteLiability = document.getElementById('noteLiability');
      if (carCovAssets === 'wealthy') {
        if (badgeLiability) { badgeLiability.className = 'checklist-badge badge-essential'; badgeLiability.textContent = 'Severe Asset Risk • Umbrella Advised'; }
        if (noteLiability) noteLiability.innerHTML = 'With assets over $1,000,000, statutory minimums create extreme personal vulnerability. You may want to consider maximum auto limits (250/500/100 or 500k CSL) backed by an independent <strong>$1M–$3M Personal Umbrella policy</strong>.';
      } else if (carCovAssets === 'high') {
        if (badgeLiability) { badgeLiability.className = 'checklist-badge badge-essential'; badgeLiability.textContent = 'High Balance-Sheet Risk'; }
        if (noteLiability) noteLiability.innerHTML = 'With assets of $250k–$1M, home equity and investments are targets in serious collisions. You may want to consider split limits of at least <strong>100/300/100</strong> or <strong>250/500/100</strong>.';
      } else {
        if (badgeLiability) { badgeLiability.className = 'checklist-badge badge-essential'; badgeLiability.textContent = 'Essential Legal Defense'; }
        if (noteLiability) noteLiability.innerHTML = 'Even with modest current savings, at-fault bodily injury judgments can result in 10-year court wage garnishments. You may want to consider avoiding state minimums in favor of 50/100/50 or 100/300/100.';
      }

      // Teen / Rideshare driver flags
      if (carCovDriver === 'teen' && noteLiability) {
        noteLiability.innerHTML += '<br><em>Notice for Teen Drivers:</em> Young drivers exhibit significantly higher accident frequencies. Carrying generous liability limits is crucial.';
      } else if (carCovDriver === 'rideshare' && noteLiability) {
        noteLiability.innerHTML += '<br><em>Notice for Rideshare Drivers:</em> Personal auto liability completely lapses while waiting for rideshare ride requests unless you add a specific Rideshare / TNC endorsement.';
      }

      // 2. Collision
      const badgeCollision = document.getElementById('badgeCollision');
      const noteCollision = document.getElementById('noteCollision');
      if (carCovOwnership === 'financed' || carCovOwnership === 'leased') {
        if (badgeCollision) { badgeCollision.className = 'checklist-badge badge-mandated'; badgeCollision.textContent = 'Contractually Mandated by Lender'; }
        if (noteCollision) noteCollision.innerHTML = 'Because your vehicle is ' + carCovOwnership + ', your financing institution contractually requires collision coverage. Dropping it violates your loan or lease covenants.';
      } else if (val < 4000 && (carCovAge === 'older' || carCovAge === 'old')) {
        if (badgeCollision) { badgeCollision.className = 'checklist-badge badge-discretionary'; badgeCollision.textContent = 'Discretionary • 10% ACV Rule'; }
        if (noteCollision) noteCollision.innerHTML = 'Your vehicle is worth approximately ' + formatCurrency(val) + '. Paying $400–$700/year for collision plus a $500 deductible means your maximum payout on a total loss is only ~' + formatCurrency(Math.max(0, val - 500)) + '. This estimate suggests evaluating whether to self-insure collision.';
      } else {
        if (badgeCollision) { badgeCollision.className = 'checklist-badge badge-advisory'; badgeCollision.textContent = 'Actuarially Advised'; }
        if (noteCollision) noteCollision.innerHTML = 'With a vehicle value of ' + formatCurrency(val) + ', collision coverage safeguards substantial vehicle equity against costly body shop repairs.';
      }

      // 3. Comprehensive
      const badgeComp = document.getElementById('badgeComp');
      const noteComp = document.getElementById('noteComp');
      if (carCovOwnership === 'financed' || carCovOwnership === 'leased') {
        if (badgeComp) { badgeComp.className = 'checklist-badge badge-mandated'; badgeComp.textContent = 'Contractually Mandated by Lender'; }
        if (noteComp) noteComp.textContent = 'Lenders require comprehensive coverage alongside collision to protect against weather, hail, theft, and animal strikes.';
      } else if (val < 3000) {
        if (badgeComp) { badgeComp.className = 'checklist-badge badge-discretionary'; badgeComp.textContent = 'Optional / Low ACV'; }
        if (noteComp) noteComp.textContent = 'Comprehensive premiums are usually modest ($80–$140/year). Even on older cars, keeping comprehensive with a low deductible protects against broken windshield glass and animal collisions.';
      } else {
        if (badgeComp) { badgeComp.className = 'checklist-badge badge-advisory'; badgeComp.textContent = 'Strongly Recommended'; }
        if (noteComp) noteComp.textContent = 'Comprehensive provides vital non-collision protection against deer collisions, storm damage, tree falls, and vehicle theft at a fraction of the cost of collision.';
      }

      // 4. UM/UIM
      const badgeUmuim = document.getElementById('badgeUmuim');
      const noteUmuim = document.getElementById('noteUmuim');
      if (carCovMileage === 'high' || carCovMileage === 'severe') {
        if (badgeUmuim) { badgeUmuim.className = 'checklist-badge badge-essential'; badgeUmuim.textContent = 'Critical Risk Buffer (High Mileage)'; }
        if (noteUmuim) noteUmuim.innerHTML = 'Driving ' + (carCovMileage === 'severe' ? '18,000+' : '12,000–18,000') + ' miles annually dramatically increases your road exposure to uninsured motorists. Carrying matching 100k/300k UM/UIM limits is strongly advised.';
      } else {
        if (badgeUmuim) { badgeUmuim.className = 'checklist-badge badge-advisory'; badgeUmuim.textContent = 'Strongly Advised'; }
        if (noteUmuim) noteUmuim.textContent = 'Roughly 14% of drivers carry zero insurance. UM/UIM protects your family if struck by an uninsured driver or hit-and-run perpetrator.';
      }

      // 5. MedPay / PIP
      const badgeMedpay = document.getElementById('badgeMedpay');
      const noteMedpay = document.getElementById('noteMedpay');
      if (carCovMarket === 'us-nofault') {
        if (badgeMedpay) { badgeMedpay.className = 'checklist-badge badge-mandated'; badgeMedpay.textContent = 'Statutory Mandate (No-Fault Law)'; }
        if (noteMedpay) noteMedpay.textContent = 'Your state law mandates Personal Injury Protection (PIP) to cover medical bills, rehabilitation, and lost wages regardless of fault.';
      } else {
        if (badgeMedpay) { badgeMedpay.className = 'checklist-badge badge-discretionary'; badgeMedpay.textContent = 'Discretionary Cash Flow Buffer'; }
        if (noteMedpay) noteMedpay.textContent = 'In at-fault states, $2,000–$5,000 in MedPay provides rapid reimbursement to satisfy your health insurance deductibles and copays without waiting for fault determination.';
      }

      // 6. Optional: GAP, Rental, Roadside
      const noteOptional = document.getElementById('noteOptional');
      if ((carCovOwnership === 'financed' || carCovOwnership === 'leased') && (carCovAge === 'new' || carCovAge === 'mid')) {
        if (noteOptional) noteOptional.innerHTML = '<strong>GAP Insurance is Crucial:</strong> Rapid vehicle depreciation during the first 3 years often creates negative equity where you owe more on your auto loan than the car is worth. If totaled, GAP pays that difference.';
      } else if (carCovDriver === 'solo' && carCovMileage !== 'low') {
        if (noteOptional) noteOptional.innerHTML = '<strong>Rental Car Reimbursement Advised:</strong> As a solo commuter without alternate vehicles, rental reimbursement ($30–$50/day) prevents major daily disruption while your car undergoes collision repairs.';
      } else {
        if (noteOptional) noteOptional.innerHTML = 'Review Roadside Assistance and Rental Reimbursement based on convenience. If you already have AAA, credit card towing, or a second household car, these endorsements may be redundant.';
      }
    }

    evaluateCoverageChecklist();
  }

  // --- 4B. Car Insurance Deductible Calculator Interactive Engine (car-insurance-deductible-calculator) ---
  const carDedLab = document.getElementById('carDeductibleInteractiveLab');
  if (carDedLab) {
    let carDedStep = 1;
    let carDedBaseline = 500;
    let activeTiers = [250, 500, 1000, 1500];

    const carDedVehicleVal = document.getElementById('carDedVehicleVal');
    const carDedVehicleValText = document.getElementById('carDedVehicleValText');
    const carDedCurrentPrem = document.getElementById('carDedCurrentPrem');
    const carDedCurrentPremVal = document.getElementById('carDedCurrentPremVal');
    const carDedClaim = document.getElementById('carDedClaim');
    const carDedClaimVal = document.getElementById('carDedClaimVal');
    const carDeductibleCardsGrid = document.getElementById('carDeductibleCardsGrid');

    function setCarDedStep(stepNum) {
      carDedStep = Math.max(1, Math.min(3, stepNum));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('carDedStepTab' + i);
        const panel = document.getElementById('carDedStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === carDedStep);
        if (panel) panel.classList.toggle('is-active', i === carDedStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('carDedStepTab' + i);
      if (tab) tab.addEventListener('click', () => setCarDedStep(i));
    });

    const carDedBtnNext1 = document.getElementById('carDedBtnNext1');
    const carDedBtnNext2 = document.getElementById('carDedBtnNext2');
    const carDedBtnBack2 = document.getElementById('carDedBtnBack2');
    const carDedBtnBack3 = document.getElementById('carDedBtnBack3');
    const carDedBtnReset = document.getElementById('carDedBtnReset');

    if (carDedBtnNext1) carDedBtnNext1.addEventListener('click', () => setCarDedStep(2));
    if (carDedBtnNext2) carDedBtnNext2.addEventListener('click', () => setCarDedStep(3));
    if (carDedBtnBack2) carDedBtnBack2.addEventListener('click', () => setCarDedStep(1));
    if (carDedBtnBack3) carDedBtnBack3.addEventListener('click', () => setCarDedStep(2));

    // Baseline Deductible Selector
    const baselineBtns = document.querySelectorAll('#carDedBaselineGroup .pill-btn');
    baselineBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        baselineBtns.forEach(b => b.classList.remove('is-active', 'is-selected'));
        btn.classList.add('is-active', 'is-selected');
        carDedBaseline = parseFloat(btn.getAttribute('data-baseline') || btn.getAttribute('data-val')) || 500;
        if (!activeTiers.includes(carDedBaseline)) {
          activeTiers.push(carDedBaseline);
          activeTiers.sort((a, b) => a - b);
          updateTierSelectorUI();
        }
        calculateCarDeductibles();
      });
    });

    // Multi-Selector Tiers
    const tierPills = document.querySelectorAll('#carDedTierSelector .tier-toggle-pill');
    tierPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const tier = parseFloat(pill.getAttribute('data-tier') || pill.getAttribute('data-val'));
        if (activeTiers.includes(tier)) {
          if (activeTiers.length > 1) {
            activeTiers = activeTiers.filter(t => t !== tier);
          }
        } else {
          activeTiers.push(tier);
          activeTiers.sort((a, b) => a - b);
        }
        updateTierSelectorUI();
        calculateCarDeductibles();
      });
    });

    function updateTierSelectorUI() {
      tierPills.forEach(pill => {
        const tier = parseFloat(pill.getAttribute('data-tier') || pill.getAttribute('data-val'));
        const isMatch = activeTiers.includes(tier);
        pill.classList.toggle('is-selected', isMatch);
        pill.classList.toggle('is-active', isMatch);
      });
    }

    // Quick Claim Scenarios
    const claimBtns = document.querySelectorAll('#carDedClaimScenarios .scenario-btn');
    claimBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        claimBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const cAmt = parseFloat(btn.getAttribute('data-claim') || btn.getAttribute('data-val')) || 0;
        if (carDedClaim) {
          carDedClaim.value = cAmt;
          calculateCarDeductibles();
        }
      });
    });

    if (carDedBtnReset) {
      carDedBtnReset.addEventListener('click', () => {
        if (carDedVehicleVal) carDedVehicleVal.value = '22000';
        if (carDedCurrentPrem) carDedCurrentPrem.value = '1440';
        if (carDedClaim) carDedClaim.value = '3200';
        carDedBaseline = 500;
        activeTiers = [250, 500, 1000, 1500];
        baselineBtns.forEach((b, idx) => {
          const isDef = idx === 1; // 500
          b.classList.toggle('is-active', isDef);
          b.classList.toggle('is-selected', isDef);
        });
        updateTierSelectorUI();
        setCarDedStep(1);
        calculateCarDeductibles();
      });
    }

    // Rate adjustment factors relative to $500 baseline for collision & comp (~50% of premium)
    const TIER_FACTORS = {
      250: { factor: 1.14, label: 'Low Deductible' },
      500: { factor: 1.00, label: 'Standard Baseline' },
      1000: { factor: 0.86, label: 'Common High' },
      1500: { factor: 0.78, label: 'Higher Risk' },
      2000: { factor: 0.73, label: 'High Risk Gap' },
      2500: { factor: 0.69, label: 'Maximum Deductible' }
    };

    function calculateCarDeductibles() {
      const vVal = parseFloat(carDedVehicleVal ? carDedVehicleVal.value : 22000) || 22000;
      const basePrem = parseFloat(carDedCurrentPrem ? carDedCurrentPrem.value : 1440) || 1440;
      const claim = parseFloat(carDedClaim ? carDedClaim.value : 3200) || 0;

      if (carDedVehicleValText) carDedVehicleValText.textContent = formatCurrency(vVal);
      if (carDedCurrentPremVal) carDedCurrentPremVal.textContent = formatCurrency(basePrem) + '/yr (' + formatCurrency(Math.round(basePrem / 12)) + '/mo)';
      if (carDedClaimVal) carDedClaimVal.textContent = formatCurrency(claim);

      [carDedVehicleVal, carDedCurrentPrem, carDedClaim].forEach(el => {
        if (el) updateSliderTrackFill(el);
      });

      // Compute Baseline figures
      // Physical damage portion is ~50% of total policy premium
      const physPortion = basePrem * 0.50;
      const fixedPortion = basePrem * 0.50;

      // Normalize baseline factor
      const baseInfo = TIER_FACTORS[carDedBaseline] || TIER_FACTORS[500];
      const baseNormFactor = baseInfo.factor;

      if (!carDeductibleCardsGrid) return;
      carDeductibleCardsGrid.innerHTML = '';

      activeTiers.forEach(tier => {
        const info = TIER_FACTORS[tier] || { factor: 1.0, label: 'Tier' };
        const adjustedPhys = physPortion * (info.factor / baseNormFactor);
        const annualPrem = Math.round(fixedPortion + adjustedPhys);
        const monthlyPrem = Math.round(annualPrem / 12);
        const claimOop = Math.min(claim, tier);
        const totalOutlay = annualPrem + claimOop;

        const isBaseline = (tier === carDedBaseline);
        const premDiff = annualPrem - basePrem;
        const dedRiskDiff = tier - carDedBaseline;

        let breakevenText = 'Baseline Policy';
        if (!isBaseline) {
          if (premDiff < 0 && dedRiskDiff > 0) {
            const savings = Math.abs(premDiff);
            const years = (dedRiskDiff / savings).toFixed(1);
            breakevenText = years + ' Claim-Free Years to Break Even';
          } else if (premDiff > 0 && dedRiskDiff < 0) {
            breakevenText = 'Adds ' + formatCurrency(premDiff) + '/yr guaranteed cost';
          } else {
            breakevenText = 'N/A';
          }
        }

        let badgeBg = '#f1f5f9';
        let badgeColor = '#475569';
        if (isBaseline) {
          badgeBg = 'var(--pastel-blue-bg)';
          badgeColor = 'var(--color-accent)';
        } else if (tier > carDedBaseline) {
          badgeBg = '#ecfdf5';
          badgeColor = '#059669';
        } else {
          badgeBg = '#fef3c7';
          badgeColor = '#92400e';
        }

        // Warning if deductible is high relative to vehicle value
        let equityWarning = '';
        if (tier >= vVal * 0.4) {
          equityWarning = '<div style="margin-top: 8px; padding: 6px 10px; background: #fee2e2; border-radius: var(--radius-sm); font-size: 0.75rem; color: #b91c1c;"><strong>High Deductible vs. ACV:</strong> This deductible is over 40% of your vehicle cash value (' + formatCurrency(vVal) + ').</div>';
        }

        const cardHtml = `
          <div class="car-deductible-card ${isBaseline ? 'is-baseline' : ''}">
            <div class="car-deductible-card-badge" style="background: ${badgeBg}; color: ${badgeColor};">
              ${isBaseline ? 'Current Baseline Tier' : info.label}
            </div>

            <h4 class="car-deductible-title num">${formatCurrency(tier)} Deductible</h4>

            <div class="car-deductible-prem-wrap">
              <div class="car-deductible-prem-num num">${formatCurrency(annualPrem)} <span style="font-size: 1rem; font-weight: 500; color: var(--color-secondary);">/ year</span></div>
              <div class="car-deductible-prem-cycle num">~${formatCurrency(monthlyPrem)} / month</div>
            </div>

            <div class="car-deductible-stat-row">
              <span class="car-deductible-stat-label">Claim Out-of-Pocket:</span>
              <span class="car-deductible-stat-val num">${formatCurrency(claimOop)}</span>
            </div>

            <div class="car-deductible-stat-row">
              <span class="car-deductible-stat-label">Total 1-Yr Outlay (1 Claim):</span>
              <span class="car-deductible-stat-val num" style="font-weight: 700; color: var(--color-accent);">${formatCurrency(totalOutlay)}</span>
            </div>

            <div class="car-deductible-stat-row">
              <span class="car-deductible-stat-label">Total Outlay (0 Claims):</span>
              <span class="car-deductible-stat-val num">${formatCurrency(annualPrem)}</span>
            </div>

            <div class="car-deductible-delta-box">
              <div class="car-deductible-delta-row">
                <span>Annual Premium Delta:</span>
                <strong class="num" style="color: ${premDiff < 0 ? '#059669' : premDiff > 0 ? '#ef4444' : 'var(--color-text)'}">
                  ${premDiff === 0 ? 'Baseline ($0)' : premDiff < 0 ? 'Saves ' + formatCurrency(Math.abs(premDiff)) + '/yr' : 'Costs +' + formatCurrency(premDiff) + '/yr'}
                </strong>
              </div>
              <div class="car-deductible-delta-row">
                <span>Extra Out-of-Pocket Risk:</span>
                <strong class="num">${dedRiskDiff === 0 ? '$0' : (dedRiskDiff > 0 ? '+' : '') + formatCurrency(dedRiskDiff)}</strong>
              </div>
              <div style="margin-top: 6px; font-weight: 600; color: var(--color-text);">
                ${breakevenText}
              </div>
              ${equityWarning}
            </div>
          </div>
        `;

        carDeductibleCardsGrid.insertAdjacentHTML('beforeend', cardHtml);
      });
    }

    [carDedVehicleVal, carDedCurrentPrem, carDedClaim].forEach(el => {
      if (el) {
        el.addEventListener('input', calculateCarDeductibles);
        el.addEventListener('change', calculateCarDeductibles);
      }
    });

    calculateCarDeductibles();
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

  // --- 9. Deductible vs. Premium Interactive Learning Experience (deductible-calculator) ---
  const deductibleLab = document.getElementById('deductibleInteractiveLab');
  if (deductibleLab) {
    // State
    let currentStep = 1;
    let selectedInsuranceType = 'auto';
    let baseAnnualPremium = 1400;
    let deductibleA = 500;
    let deductibleB = 1000;
    let savingsMode = 'estimate'; // 'estimate' or 'custom'
    let customAnnualSavings = 190;
    let claimAmount = 4000;

    // Type benchmarks
    const typeBenchmarks = {
      auto: {
        defaultPrem: 1400,
        presets: [800, 1400, 2400, 3600],
        deductiblesA: [250, 500, 1000],
        deductiblesB: [1000, 1500, 2000, 2500],
        defaultA: 500,
        defaultB: 1000,
        discountFactor: 0.14,
        claimPresets: [
          { amt: 0, label: 'Claim-Free Year' },
          { amt: 1200, label: 'Minor Glass/Dent' },
          { amt: 4000, label: 'Moderate Collision' },
          { amt: 12000, label: 'Major Accident' }
        ]
      },
      home: {
        defaultPrem: 1800,
        presets: [1000, 1800, 2800, 4500],
        deductiblesA: [500, 1000, 1500],
        deductiblesB: [1500, 2500, 5000],
        defaultA: 1000,
        defaultB: 2500,
        discountFactor: 0.12,
        claimPresets: [
          { amt: 0, label: 'Claim-Free Year' },
          { amt: 2500, label: 'Minor Plumbing Leak' },
          { amt: 7500, label: 'Roof Wind Damage' },
          { amt: 25000, label: 'Structural Fire Loss' }
        ]
      },
      health: {
        defaultPrem: 5400,
        presets: [3600, 5400, 7200, 9600],
        deductiblesA: [500, 1000, 1500],
        deductiblesB: [3000, 4000, 6000],
        defaultA: 1500,
        defaultB: 3500,
        discountFactor: 0.18,
        claimPresets: [
          { amt: 0, label: 'Claim-Free Year' },
          { amt: 1500, label: 'Specialist Visits' },
          { amt: 5000, label: 'Outpatient Procedure' },
          { amt: 18000, label: 'Major Hospital Stay' }
        ]
      },
      property: {
        defaultPrem: 1200,
        presets: [800, 1200, 2000, 3500],
        deductiblesA: [500, 1000, 1500],
        deductiblesB: [1500, 2500, 5000],
        defaultA: 1000,
        defaultB: 2500,
        discountFactor: 0.11,
        claimPresets: [
          { amt: 0, label: 'Claim-Free Year' },
          { amt: 2000, label: 'Equipment Damage' },
          { amt: 6000, label: 'Storefront Loss' },
          { amt: 20000, label: 'Inventory Spoilage' }
        ]
      }
    };

    // DOM Elements
    const stepTabs = [
      document.getElementById('stepTab1'),
      document.getElementById('stepTab2'),
      document.getElementById('stepTab3')
    ];
    const stepPanels = [
      document.getElementById('stepPanel1'),
      document.getElementById('stepPanel2'),
      document.getElementById('stepPanel3')
    ];

    const toStep2Btn = document.getElementById('toStep2Btn');
    const backToStep1Btn = document.getElementById('backToStep1Btn');
    const toStep3Btn = document.getElementById('toStep3Btn');
    const backToStep2Btn = document.getElementById('backToStep2Btn');
    const recalcBtn = document.getElementById('recalcBtn');
    const resetToolBtn = document.getElementById('resetToolBtn');

    const typeCards = document.querySelectorAll('.type-select-card');
    const basePremiumSlider = document.getElementById('basePremiumSlider');
    const basePremiumBadge = document.getElementById('basePremiumBadge');
    const baseMonthlyBadge = document.getElementById('baseMonthlyBadge');
    const presetPills = document.querySelectorAll('.preset-pill-btn');

    const deductibleSelectA = document.getElementById('deductibleSelectA');
    const deductibleSelectB = document.getElementById('deductibleSelectB');
    const liveSavingsSummary = document.getElementById('liveSavingsSummary');
    const liveRiskGap = document.getElementById('liveRiskGap');

    const modeEstimate = document.getElementById('modeEstimate');
    const modeCustom = document.getElementById('modeCustom');
    const customSavingsWrap = document.getElementById('customSavingsWrap');
    const customSavingsSlider = document.getElementById('customSavingsSlider');
    const customSavingsVal = document.getElementById('customSavingsVal');

    const claimSlider = document.getElementById('claimSlider');
    const claimAmountBadge = document.getElementById('claimAmountBadge');
    const claimPresetsGrid = document.getElementById('claimPresetsGrid');

    // Results DOM elements
    const resultCardA = document.getElementById('resultCardA');
    const resultCardB = document.getElementById('resultCardB');
    const resultDedA = document.getElementById('resultDedA');
    const resultDedB = document.getElementById('resultDedB');
    const resultPremA = document.getElementById('resultPremA');
    const resultPremB = document.getElementById('resultPremB');
    const resultMonthlyA = document.getElementById('resultMonthlyA');
    const resultMonthlyB = document.getElementById('resultMonthlyB');
    const resultOopA = document.getElementById('resultOopA');
    const resultOopB = document.getElementById('resultOopB');
    const resultInsurerA = document.getElementById('resultInsurerA');
    const resultInsurerB = document.getElementById('resultInsurerB');
    const resultTotalA = document.getElementById('resultTotalA');
    const resultTotalB = document.getElementById('resultTotalB');
    const breakevenYearsNumber = document.getElementById('breakevenYearsNumber');
    const breakevenNarrative = document.getElementById('breakevenNarrative');
    const whatThisMeansText = document.getElementById('whatThisMeansText');

    const mathStep1 = document.getElementById('mathStep1');
    const mathStep2 = document.getElementById('mathStep2');
    const mathStep3 = document.getElementById('mathStep3');
    const mathStep4 = document.getElementById('mathStep4');
    const mathStep5 = document.getElementById('mathStep5');

    // Step switching function
    function goToStep(step) {
      currentStep = step;
      stepTabs.forEach((tab, idx) => {
        if (!tab) return;
        const stepNum = idx + 1;
        if (stepNum === currentStep) {
          tab.classList.add('is-active');
          tab.classList.remove('is-completed');
        } else if (stepNum < currentStep) {
          tab.classList.remove('is-active');
          tab.classList.add('is-completed');
        } else {
          tab.classList.remove('is-active', 'is-completed');
        }
      });

      stepPanels.forEach((panel, idx) => {
        if (!panel) return;
        if (idx + 1 === currentStep) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });

      calculateLab();
    }

    stepTabs.forEach((tab, idx) => {
      if (tab) {
        tab.addEventListener('click', () => goToStep(idx + 1));
      }
    });

    if (toStep2Btn) toStep2Btn.addEventListener('click', () => goToStep(2));
    if (backToStep1Btn) backToStep1Btn.addEventListener('click', () => goToStep(1));
    if (toStep3Btn) toStep3Btn.addEventListener('click', () => goToStep(3));
    if (backToStep2Btn) backToStep2Btn.addEventListener('click', () => goToStep(2));

    // Reset Tool
    if (resetToolBtn) {
      resetToolBtn.addEventListener('click', () => {
        selectedInsuranceType = 'auto';
        baseAnnualPremium = 1400;
        deductibleA = 500;
        deductibleB = 1000;
        savingsMode = 'estimate';
        customAnnualSavings = 190;
        claimAmount = 4000;

        if (modeEstimate) modeEstimate.checked = true;
        if (customSavingsWrap) customSavingsWrap.style.display = 'none';

        typeCards.forEach(c => {
          c.classList.toggle('is-selected', c.getAttribute('data-type') === 'auto');
        });

        applyInsuranceType('auto');
        goToStep(1);
      });
    }

    if (recalcBtn) {
      recalcBtn.addEventListener('click', () => {
        calculateLab();
        const resultsEl = document.getElementById('toolResultsDashboard');
        if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // Apply Insurance Type
    function applyInsuranceType(type) {
      selectedInsuranceType = type;
      const b = typeBenchmarks[type] || typeBenchmarks.auto;
      baseAnnualPremium = b.defaultPrem;

      if (basePremiumSlider) {
        basePremiumSlider.value = baseAnnualPremium;
        updateSliderTrackFill(basePremiumSlider);
      }
      if (basePremiumBadge) basePremiumBadge.textContent = formatCurrency(baseAnnualPremium) + ' / yr';
      if (baseMonthlyBadge) baseMonthlyBadge.textContent = '(~' + formatCurrency(Math.round(baseAnnualPremium / 12)) + '/mo)';

      // Update preset buttons
      presetPills.forEach((pill, idx) => {
        if (b.presets[idx]) {
          pill.setAttribute('data-preset', b.presets[idx]);
          pill.textContent = formatCurrency(b.presets[idx]) + '/yr';
          pill.classList.toggle('is-active', b.presets[idx] === baseAnnualPremium);
        }
      });

      // Update deductible selects
      if (deductibleSelectA && deductibleSelectB) {
        deductibleSelectA.innerHTML = b.deductiblesA.map(d =>
          `<option value="${d}" ${d === b.defaultA ? 'selected' : ''}>${formatCurrency(d)} Deductible</option>`
        ).join('');

        deductibleSelectB.innerHTML = b.deductiblesB.map(d =>
          `<option value="${d}" ${d === b.defaultB ? 'selected' : ''}>${formatCurrency(d)} Deductible</option>`
        ).join('');

        deductibleA = b.defaultA;
        deductibleB = b.defaultB;
      }

      // Update claim presets
      if (claimPresetsGrid) {
        claimPresetsGrid.innerHTML = b.claimPresets.map(cp => `
          <button type="button" class="claim-preset-btn ${cp.amt === claimAmount ? 'is-active' : ''}" data-claim="${cp.amt}">
            <div class="claim-preset-amount">${formatCurrency(cp.amt)}</div>
            <div class="claim-preset-label">${cp.label}</div>
          </button>
        `).join('');

        attachClaimPresetListeners();
      }

      calculateLab();
    }

    // Type Card Clicks
    typeCards.forEach(card => {
      card.addEventListener('click', () => {
        typeCards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        const type = card.getAttribute('data-type') || 'auto';
        applyInsuranceType(type);
      });
    });

    // Baseline Premium Slider & Presets
    if (basePremiumSlider) {
      basePremiumSlider.addEventListener('input', () => {
        baseAnnualPremium = parseFloat(basePremiumSlider.value) || 1400;
        if (basePremiumBadge) basePremiumBadge.textContent = formatCurrency(baseAnnualPremium) + ' / yr';
        if (baseMonthlyBadge) baseMonthlyBadge.textContent = '(~' + formatCurrency(Math.round(baseAnnualPremium / 12)) + '/mo)';
        presetPills.forEach(p => p.classList.toggle('is-active', parseFloat(p.getAttribute('data-preset')) === baseAnnualPremium));
        updateSliderTrackFill(basePremiumSlider);
        calculateLab();
      });
    }

    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        presetPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        baseAnnualPremium = parseFloat(pill.getAttribute('data-preset')) || 1400;
        if (basePremiumSlider) {
          basePremiumSlider.value = baseAnnualPremium;
          updateSliderTrackFill(basePremiumSlider);
        }
        if (basePremiumBadge) basePremiumBadge.textContent = formatCurrency(baseAnnualPremium) + ' / yr';
        if (baseMonthlyBadge) baseMonthlyBadge.textContent = '(~' + formatCurrency(Math.round(baseAnnualPremium / 12)) + '/mo)';
        calculateLab();
      });
    });

    // Deductible Selects
    if (deductibleSelectA) {
      deductibleSelectA.addEventListener('change', () => {
        deductibleA = parseFloat(deductibleSelectA.value) || 500;
        calculateLab();
      });
    }
    if (deductibleSelectB) {
      deductibleSelectB.addEventListener('change', () => {
        deductibleB = parseFloat(deductibleSelectB.value) || 1000;
        calculateLab();
      });
    }

    // Savings Mode Radios
    if (modeEstimate) {
      modeEstimate.addEventListener('change', () => {
        if (modeEstimate.checked) {
          savingsMode = 'estimate';
          if (customSavingsWrap) customSavingsWrap.style.display = 'none';
          calculateLab();
        }
      });
    }
    if (modeCustom) {
      modeCustom.addEventListener('change', () => {
        if (modeCustom.checked) {
          savingsMode = 'custom';
          if (customSavingsWrap) customSavingsWrap.style.display = 'block';
          calculateLab();
        }
      });
    }

    if (customSavingsSlider) {
      customSavingsSlider.addEventListener('input', () => {
        customAnnualSavings = parseFloat(customSavingsSlider.value) || 190;
        if (customSavingsVal) customSavingsVal.textContent = formatCurrency(customAnnualSavings) + ' / yr';
        updateSliderTrackFill(customSavingsSlider);
        calculateLab();
      });
    }

    // Claim Slider & Presets
    if (claimSlider) {
      claimSlider.addEventListener('input', () => {
        claimAmount = parseFloat(claimSlider.value) || 0;
        if (claimAmountBadge) claimAmountBadge.textContent = formatCurrency(claimAmount);
        updateClaimPresetButtons();
        updateSliderTrackFill(claimSlider);
        calculateLab();
      });
    }

    function attachClaimPresetListeners() {
      const presetBtns = document.querySelectorAll('.claim-preset-btn');
      presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          claimAmount = parseFloat(btn.getAttribute('data-claim')) || 0;
          if (claimSlider) {
            claimSlider.value = claimAmount;
            updateSliderTrackFill(claimSlider);
          }
          if (claimAmountBadge) claimAmountBadge.textContent = formatCurrency(claimAmount);
          updateClaimPresetButtons();
          calculateLab();
        });
      });
    }
    attachClaimPresetListeners();

    function updateClaimPresetButtons() {
      const presetBtns = document.querySelectorAll('.claim-preset-btn');
      presetBtns.forEach(btn => {
        const amt = parseFloat(btn.getAttribute('data-claim'));
        btn.classList.toggle('is-active', amt === claimAmount);
      });
    }

    // Main Calculation Lab
    function calculateLab() {
      const b = typeBenchmarks[selectedInsuranceType] || typeBenchmarks.auto;

      // 1. Calculate Annual Premium Savings for Scenario B
      let annualSavings = 0;
      if (savingsMode === 'custom') {
        annualSavings = customAnnualSavings;
      } else {
        const dedRatio = Math.max(1, deductibleB / Math.max(1, deductibleA));
        const factor = b.discountFactor || 0.14;
        const discountPct = Math.min(0.35, Math.max(0.04, Math.log2(dedRatio) * factor));
        annualSavings = Math.round(baseAnnualPremium * discountPct);
      }

      const riskGap = Math.max(0, deductibleB - deductibleA);
      const breakevenYears = annualSavings > 0 ? (riskGap / annualSavings).toFixed(1) : '0.0';

      // Live summary in Step 2
      if (liveSavingsSummary) liveSavingsSummary.textContent = '~' + formatCurrency(annualSavings) + ' / year';
      if (liveRiskGap) liveRiskGap.textContent = formatCurrency(riskGap);

      // Scenario A numbers
      const premA = baseAnnualPremium;
      const monthlyA = Math.round(premA / 12);
      const oopA = Math.min(claimAmount, deductibleA);
      const insurerA = Math.max(0, claimAmount - deductibleA);
      const totalA = premA + oopA;

      // Scenario B numbers
      const premB = Math.max(100, baseAnnualPremium - annualSavings);
      const monthlyB = Math.round(premB / 12);
      const oopB = Math.min(claimAmount, deductibleB);
      const insurerB = Math.max(0, claimAmount - deductibleB);
      const totalB = premB + oopB;

      // DOM Updates for Result Card A
      if (resultDedA) resultDedA.textContent = formatCurrency(deductibleA) + ' Deductible';
      if (resultPremA) resultPremA.textContent = formatCurrency(premA) + ' / yr';
      if (resultMonthlyA) resultMonthlyA.textContent = '~' + formatCurrency(monthlyA) + ' / mo';
      if (resultOopA) resultOopA.textContent = formatCurrency(oopA);
      if (resultInsurerA) resultInsurerA.textContent = formatCurrency(insurerA);
      if (resultTotalA) animateCalculatedNumber(resultTotalA, totalA, { prefix: '$' });

      // DOM Updates for Result Card B
      if (resultDedB) resultDedB.textContent = formatCurrency(deductibleB) + ' Deductible';
      if (resultPremB) resultPremB.textContent = formatCurrency(premB) + ' / yr';
      if (resultMonthlyB) resultMonthlyB.textContent = '~' + formatCurrency(monthlyB) + ' / mo';
      if (resultOopB) resultOopB.textContent = formatCurrency(oopB);
      if (resultInsurerB) resultInsurerB.textContent = formatCurrency(insurerB);
      if (resultTotalB) animateCalculatedNumber(resultTotalB, totalB, { prefix: '$' });

      // Highlight Winner Card
      if (resultCardA && resultCardB) {
        resultCardA.classList.remove('is-winner');
        resultCardB.classList.remove('is-winner');
        if (totalA < totalB) {
          resultCardA.classList.add('is-winner');
        } else if (totalB < totalA) {
          resultCardB.classList.add('is-winner');
        }
      }

      // Breakeven Banner
      if (breakevenYearsNumber) breakevenYearsNumber.textContent = breakevenYears;
      if (breakevenNarrative) {
        breakevenNarrative.innerHTML =
          'This estimate suggests that by accepting a <strong>' + formatCurrency(riskGap) +
          '</strong> higher deductible risk gap to save <strong>' + formatCurrency(annualSavings) +
          '/year</strong> in guaranteed premium, you break even after <strong>' + breakevenYears +
          ' claim-free years</strong>.';
      }

      // What This Means
      if (whatThisMeansText) {
        if (claimAmount === 0) {
          whatThisMeansText.innerHTML =
            'In a <strong>claim-free year</strong>, choosing the <strong>' + formatCurrency(deductibleB) +
            ' deductible (Scenario B)</strong> yields lower total annual outlay by <strong>' +
            formatCurrency(annualSavings) + '</strong> because no claim deductible was paid.';
        } else if (totalA < totalB) {
          whatThisMeansText.innerHTML =
            'Under a <strong>' + formatCurrency(claimAmount) + ' covered claim</strong>, choosing the <strong>' +
            formatCurrency(deductibleA) + ' deductible (Scenario A)</strong> yields a lower net cash outlay by <strong>' +
            formatCurrency(totalB - totalA) + '</strong> because the lower deductible capped your out-of-pocket repair costs.';
        } else if (totalB < totalA) {
          whatThisMeansText.innerHTML =
            'Even with a <strong>' + formatCurrency(claimAmount) + ' covered claim</strong>, choosing the <strong>' +
            formatCurrency(deductibleB) + ' deductible (Scenario B)</strong> resulted in <strong>' +
            formatCurrency(totalA - totalB) + '</strong> lower total net outlay because the annual premium savings outweighed the small deductible difference.';
        } else {
          whatThisMeansText.innerHTML =
            'Under this specific <strong>' + formatCurrency(claimAmount) +
            ' claim scenario</strong>, both deductible choices result in identical total annual financial outlay (' + formatCurrency(totalA) + ').';
        }
      }

      // Math Steps Breakdown
      if (mathStep1) mathStep1.textContent = formatCurrency(premA) + ' (Scenario A) − ' + formatCurrency(premB) + ' (Scenario B) = ' + formatCurrency(annualSavings) + '/yr savings';
      if (mathStep2) mathStep2.textContent = formatCurrency(deductibleB) + ' (Scenario B) − ' + formatCurrency(deductibleA) + ' (Scenario A) = ' + formatCurrency(riskGap) + ' risk gap';
      if (mathStep3) mathStep3.textContent = formatCurrency(riskGap) + ' risk gap ÷ ' + formatCurrency(annualSavings) + '/yr savings = ' + breakevenYears + ' claim-free years';
      if (mathStep4) mathStep4.textContent = 'Minimum of (' + formatCurrency(claimAmount) + ' claim, deductible) = ' + formatCurrency(oopA) + ' (A) vs ' + formatCurrency(oopB) + ' (B)';
      if (mathStep5) mathStep5.textContent = 'Premium + Claim Out-of-Pocket = ' + formatCurrency(totalA) + ' (Scenario A) vs ' + formatCurrency(totalB) + ' (Scenario B)';
    }

    // Initial calculation on load
    applyInsuranceType('auto');
  }

  // Fallback for legacy controls if present
  const dedCurrent = document.getElementById('dedCurrent');
  if (dedCurrent && !deductibleLab) {
    const dedProposed = document.getElementById('dedProposed');
    const dedAnnualSavings = document.getElementById('dedAnnualSavings');
    const dedAnnualSavingsVal = document.getElementById('dedAnnualSavingsVal');
    const dedResultBreakeven = document.getElementById('dedResultBreakeven');
    const dedResultRiskYears = document.getElementById('dedResultRiskYears');
    const dedRecommendation = document.getElementById('dedRecommendation');

    function updateLegacyDeductibleCalc() {
      const cur = parseFloat(dedCurrent.value) || 500;
      const prop = parseFloat(dedProposed ? dedProposed.value : 1500) || 1500;
      const savings = parseFloat(dedAnnualSavings ? dedAnnualSavings.value : 320) || 320;
      if (dedAnnualSavingsVal) dedAnnualSavingsVal.textContent = formatCurrency(savings) + '/yr';
      updateSliderTrackFill(dedAnnualSavings);
      const extraRisk = Math.max(0, prop - cur);
      const years = savings > 0 ? (extraRisk / savings).toFixed(1) : '0';
      if (dedResultBreakeven) animateCalculatedNumber(dedResultBreakeven, parseFloat(years) || 0, { suffix: ' Years', decimals: 1 });
      if (dedResultRiskYears) animateCalculatedNumber(dedResultRiskYears, extraRisk, { prefix: '$', suffix: ' Risk Gap' });
      if (dedRecommendation) {
        dedRecommendation.innerHTML = parseFloat(years) <= 3
          ? '<strong>Favorable Breakeven:</strong> If you remain claim-free for ' + years + ' years, the higher deductible is mathematically optimal.'
          : '<strong>High Risk Horizon:</strong> A ' + years + ' year breakeven window is risky.';
      }
    }

    [dedCurrent, dedProposed, dedAnnualSavings].forEach(el => {
      if (el) {
        el.addEventListener('input', updateLegacyDeductibleCalc);
        el.addEventListener('change', updateLegacyDeductibleCalc);
      }
    });
    updateLegacyDeductibleCalc();
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


  // ==========================================================================
  // --- 5. Home Insurance Coverage Calculator (home-insurance-calculator) ---
  // ==========================================================================
  const homeCovLab = document.getElementById('homeCoverageInteractiveLab');
  if (homeCovLab) {
    let homeCovStep = 1;
    let homeCovType = 'single';
    let homeCovQuality = 'standard';
    let homeCovTerritory = 'suburban';
    const activeDetached = new Set();
    const activeValuables = new Set();
    let homeCovLiability = '300000';

    function setHomeCovStep(step) {
      homeCovStep = Math.max(1, Math.min(3, step));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('homeCovStepTab' + i);
        const panel = document.getElementById('homeCovStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === homeCovStep);
        if (panel) panel.classList.toggle('is-active', i === homeCovStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('homeCovStepTab' + i);
      if (tab) tab.addEventListener('click', () => setHomeCovStep(i));
    });

    const next1 = document.getElementById('homeCovBtnNext1');
    const next2 = document.getElementById('homeCovBtnNext2');
    const back2 = document.getElementById('homeCovBtnBack2');
    const back3 = document.getElementById('homeCovBtnBack3');
    const resetBtn = document.getElementById('homeCovBtnReset');

    if (next1) next1.addEventListener('click', () => setHomeCovStep(2));
    if (next2) next2.addEventListener('click', () => setHomeCovStep(3));
    if (back2) back2.addEventListener('click', () => setHomeCovStep(1));
    if (back3) back3.addEventListener('click', () => setHomeCovStep(2));

    const sqftInput = document.getElementById('homeCovSqft');
    const sqftVal = document.getElementById('homeCovSqftVal');
    const belongingsInput = document.getElementById('homeCovBelongings');
    const belongingsVal = document.getElementById('homeCovBelongingsVal');

    function bindToggleGroup(groupId, onSelect) {
      const container = document.getElementById(groupId);
      if (!container) return;
      const pills = container.querySelectorAll('.tier-toggle-pill, .pill-btn');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('is-selected', 'is-active'));
          pill.classList.add('is-selected', 'is-active');
          const val = pill.getAttribute('data-val') ||
                      pill.getAttribute('data-type') ||
                      pill.getAttribute('data-quality') ||
                      pill.getAttribute('data-territory') ||
                      pill.getAttribute('data-liability');
          if (val) {
            onSelect(val);
            updateHomeCovCalc();
          }
        });
      });
    }

    bindToggleGroup('homeCovTypeGroup', v => { homeCovType = v; });
    bindToggleGroup('homeCovQualityGroup', v => { homeCovQuality = v; });
    bindToggleGroup('homeCovTerritoryGroup', v => { homeCovTerritory = v; });
    bindToggleGroup('homeCovLiabilityGroup', v => { homeCovLiability = v; });

    // Multi-select for detached structures
    const detachedContainer = document.getElementById('homeCovDetachedGroup');
    if (detachedContainer) {
      detachedContainer.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(pill => {
        pill.addEventListener('click', () => {
          const val = pill.getAttribute('data-val') || pill.getAttribute('data-feature');
          if (!val) return;
          if (activeDetached.has(val)) {
            activeDetached.delete(val);
            pill.classList.remove('is-selected', 'is-active');
          } else {
            activeDetached.add(val);
            pill.classList.add('is-selected', 'is-active');
          }
          updateHomeCovCalc();
        });
      });
    }

    // Multi-select for valuable collections
    const valuablesContainer = document.getElementById('homeCovValuablesGroup');
    if (valuablesContainer) {
      valuablesContainer.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(pill => {
        pill.addEventListener('click', () => {
          const val = pill.getAttribute('data-val') || pill.getAttribute('data-valuable');
          if (!val) return;
          if (activeValuables.has(val)) {
            activeValuables.delete(val);
            pill.classList.remove('is-selected', 'is-active');
          } else {
            activeValuables.add(val);
            pill.classList.add('is-selected', 'is-active');
          }
          updateHomeCovCalc();
        });
      });
    }

    const bedsInput = document.getElementById('homeCovBeds');
    const bathsInput = document.getElementById('homeCovBaths');
    if (bedsInput) bedsInput.addEventListener('change', updateHomeCovCalc);
    if (bathsInput) bathsInput.addEventListener('change', updateHomeCovCalc);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (sqftInput) sqftInput.value = 2200;
        if (belongingsInput) belongingsInput.value = 110000;
        homeCovType = 'single';
        homeCovQuality = 'standard';
        homeCovTerritory = 'suburban';
        activeDetached.clear();
        activeValuables.clear();
        homeCovLiability = '300000';

        const resetSingleGroup = (gid, defaultVal, attr) => {
          const c = document.getElementById(gid);
          if (!c) return;
          c.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => {
            const v = p.getAttribute('data-val') || p.getAttribute(attr);
            const isMatch = v === defaultVal;
            p.classList.toggle('is-selected', isMatch);
            p.classList.toggle('is-active', isMatch);
          });
        };

        resetSingleGroup('homeCovTypeGroup', 'single', 'data-type');
        resetSingleGroup('homeCovQualityGroup', 'standard', 'data-quality');
        resetSingleGroup('homeCovTerritoryGroup', 'suburban', 'data-territory');
        resetSingleGroup('homeCovLiabilityGroup', '300000', 'data-liability');

        if (detachedContainer) {
          detachedContainer.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => p.classList.remove('is-selected', 'is-active'));
        }
        if (valuablesContainer) {
          valuablesContainer.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => p.classList.remove('is-selected', 'is-active'));
        }

        setHomeCovStep(1);
        updateHomeCovCalc();
      });
    }

    function updateHomeCovCalc() {
      const sqft = parseInt(sqftInput?.value || 2200, 10);
      if (sqftVal) sqftVal.textContent = sqft.toLocaleString() + ' sq ft';
      if (sqftInput) updateSliderTrackFill(sqftInput);

      const qualityRates = { 'standard': 160, 'upgraded': 210, 'custom': 290, 'luxury': 380 };
      const baseRate = qualityRates[homeCovQuality] || 160;

      const territoryMultipliers = {
        'low-cost': 0.85,
        'moderate': 1.0,
        'suburban': 1.0,
        'urban': 1.20,
        'high-cost-metro': 1.35,
        'coastal': 1.45,
        'coastal-hazard': 1.45,
        'wildfire': 1.40
      };
      const territoryMult = territoryMultipliers[homeCovTerritory] || 1.0;

      const typeMultipliers = {
        'single': 1.0,
        'single-family': 1.0,
        'townhouse': 0.92,
        'condo': 0.50,
        'multi': 1.15,
        'multi-family': 1.15
      };
      const typeMult = typeMultipliers[homeCovType] || 1.0;

      const unitCost = Math.round(baseRate * territoryMult * typeMult);

      // Coverage A: Dwelling Replacement Cost
      const covA = Math.round(sqft * unitCost);

      // Coverage B: Other Structures
      let detachedAddon = 0;
      const detachedVals = { 'garage': 35000, 'pool': 40000, 'shed': 12000, 'guest': 80000 };
      activeDetached.forEach(f => { detachedAddon += (detachedVals[f] || 0); });
      const baselineCovB = Math.round(covA * 0.10);
      const covB = baselineCovB + detachedAddon;

      // Coverage C: Personal Belongings
      const defaultBelongings = Math.round(covA * 0.50);
      const userBelongings = parseInt(belongingsInput?.value || defaultBelongings, 10);
      if (belongingsVal) belongingsVal.textContent = formatCurrency(userBelongings);
      if (belongingsInput) updateSliderTrackFill(belongingsInput);

      let valuableRider = 0;
      const valuableVals = { 'jewelry': 10000, 'art': 15000, 'firearms': 5000, 'instruments': 8000 };
      activeValuables.forEach(v => { valuableRider += (valuableVals[v] || 0); });
      const covC = Math.max(userBelongings, defaultBelongings) + valuableRider;

      // Coverage D: Loss of Use / ALE
      const covD = Math.round(covA * 0.20);

      // Coverage E & F
      const liabilityLimits = {
        '100k': 100000, '100000': 100000,
        '300k': 300000, '300000': 300000,
        '500k': 500000, '500000': 500000,
        '1m': 1000000, '1000000': 1000000
      };
      const covE = liabilityLimits[homeCovLiability] || 300000;

      // Render DOM outputs
      const resCovA = document.getElementById('resCovA');
      const resEchoSqft = document.getElementById('resEchoSqft');
      const resEchoCostSqft = document.getElementById('resEchoCostSqft');
      const resCovB = document.getElementById('resCovB');
      const resEchoDetachedAdditions = document.getElementById('resEchoDetachedAdditions');
      const resTotalCovB = document.getElementById('resTotalCovB');
      const resCovC = document.getElementById('resCovC');
      const resEchoSublimits = document.getElementById('resEchoSublimits');
      const resCovD = document.getElementById('resCovD');
      const resEchoRentBuffer = document.getElementById('resEchoRentBuffer');
      const resLiabilityNote = document.getElementById('resLiabilityNote');

      if (resCovA) animateCalculatedNumber(resCovA, covA, { prefix: '$' });
      if (resEchoSqft) resEchoSqft.textContent = sqft.toLocaleString() + ' sq ft';
      if (resEchoCostSqft) resEchoCostSqft.textContent = '~$' + unitCost + '/sq ft';

      if (resCovB) animateCalculatedNumber(resCovB, covB, { prefix: '$' });
      if (resEchoDetachedAdditions) {
        if (activeDetached.size > 0) {
          resEchoDetachedAdditions.textContent = `Includes 10% base + ${formatCurrency(detachedAddon)} active outbuilding additions`;
        } else {
          resEchoDetachedAdditions.textContent = 'Standard 10% baseline (fences, driveway, basic shed)';
        }
      }
      if (resTotalCovB) resTotalCovB.textContent = formatCurrency(covB);

      if (resCovC) animateCalculatedNumber(resCovC, covC, { prefix: '$' });
      if (resEchoSublimits) {
        resEchoSublimits.textContent = valuableRider > 0 ? `Includes +${formatCurrency(valuableRider)} scheduled rider endorsements` : 'Standard sub-limits apply ($1,500 jewelry / $2,500 electronics)';
      }

      if (resCovD) animateCalculatedNumber(resCovD, covD, { prefix: '$' });
      if (resEchoRentBuffer) resEchoRentBuffer.textContent = `~$${Math.round(covD / 24).toLocaleString()}/mo living allowance`;

      if (resLiabilityNote) {
        resLiabilityNote.textContent = `${formatCurrency(covE)} Personal Liability (Cov E) + $5,000 Guest Medical (Cov F)`;
      }

      // Math Step Breakdown
      const s1 = document.getElementById('homeMathStep1');
      const s2 = document.getElementById('homeMathStep2');
      const s3 = document.getElementById('homeMathStep3');
      const s4 = document.getElementById('homeMathStep4');

      if (s1) s1.textContent = `${sqft.toLocaleString()} sq ft × $${unitCost}/sq ft (${homeCovQuality} build, ${homeCovTerritory} market) = ${formatCurrency(covA)}.`;
      if (s2) s2.textContent = `Coverage B = 10% baseline (${formatCurrency(baselineCovB)}) + ${formatCurrency(detachedAddon)} outbuildings = ${formatCurrency(covB)}.`;
      if (s3) s3.textContent = `50% baseline (${formatCurrency(covA * 0.5)}) + ${formatCurrency(valuableRider)} riders = ${formatCurrency(covC)}.`;
      if (s4) s4.textContent = `20% of Coverage A = ${formatCurrency(covD)} for temporary housing, displacement rent, and meals during rebuild.`;
    }

    if (sqftInput) sqftInput.addEventListener('input', updateHomeCovCalc);
    if (belongingsInput) belongingsInput.addEventListener('input', updateHomeCovCalc);
    updateHomeCovCalc();
  }

  // ==========================================================================
  // --- 6. Home Replacement-Cost Estimator (home-replacement-cost-estimator) ---
  // ==========================================================================
  const rebuildLab = document.getElementById('homeRebuildInteractiveLab');
  if (rebuildLab) {
    let rebuildStep = 1;
    let rebuildRegion = 'northeast';
    let rebuildStories = '2';
    let rebuildFoundation = 'basement-unfin';
    let rebuildGrade = 'custom';
    const activeAddons = new Set();

    function setRebuildStep(step) {
      rebuildStep = Math.max(1, Math.min(3, step));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('rebuildStepTab' + i);
        const panel = document.getElementById('rebuildStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === rebuildStep);
        if (panel) panel.classList.toggle('is-active', i === rebuildStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('rebuildStepTab' + i);
      if (tab) tab.addEventListener('click', () => setRebuildStep(i));
    });

    const next1 = document.getElementById('rebuildBtnNext1');
    const next2 = document.getElementById('rebuildBtnNext2');
    const back2 = document.getElementById('rebuildBtnBack2');
    const back3 = document.getElementById('rebuildBtnBack3');
    const resetBtn = document.getElementById('rebuildBtnReset');

    if (next1) next1.addEventListener('click', () => setRebuildStep(2));
    if (next2) next2.addEventListener('click', () => setRebuildStep(3));
    if (back2) back2.addEventListener('click', () => setRebuildStep(1));
    if (back3) back3.addEventListener('click', () => setRebuildStep(2));

    const sqftInput = document.getElementById('rebuildSqft');
    const sqftVal = document.getElementById('rebuildSqftVal');
    const regionHelp = document.getElementById('rebuildRegionHelp');

    function bindRebuildPills(groupId, onSelect) {
      const container = document.getElementById(groupId);
      if (!container) return;
      const pills = container.querySelectorAll('.tier-toggle-pill, .pill-btn');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('is-selected', 'is-active'));
          pill.classList.add('is-selected', 'is-active');
          const val = pill.getAttribute('data-val') ||
                      pill.getAttribute('data-region') ||
                      pill.getAttribute('data-stories') ||
                      pill.getAttribute('data-foundation') ||
                      pill.getAttribute('data-grade');
          if (val) {
            onSelect(val);
            updateRebuildCalc();
          }
        });
      });
    }

    bindRebuildPills('rebuildRegionGroup', v => {
      rebuildRegion = v;
      if (regionHelp) {
        regionHelp.textContent = v === 'south' ? 'Baseline: $140 – $165/sq ft (Moderate labor and material indices)' :
          v === 'midwest' ? 'Baseline: $150 – $175/sq ft (Standard union/non-union mix)' :
          v === 'northeast' ? 'Baseline: $185 – $235/sq ft (Cold-weather codes, higher permit/labor costs)' :
          v === 'west' ? 'Baseline: $220 – $290/sq ft (Seismic standards, high metro labor tariffs)' :
          'Baseline: $175 – $230/sq ft (International national average rebuild indices)';
      }
    });
    bindRebuildPills('rebuildStoriesGroup', v => { rebuildStories = v; });
    bindRebuildPills('rebuildFoundationGroup', v => { rebuildFoundation = v; });
    bindRebuildPills('rebuildGradeGroup', v => { rebuildGrade = v; });

    const addonsContainer = document.getElementById('rebuildAddonsGroup');
    if (addonsContainer) {
      const addonPills = addonsContainer.querySelectorAll('.tier-toggle-pill, .pill-btn');
      addonPills.forEach(pill => {
        pill.addEventListener('click', () => {
          const val = pill.getAttribute('data-val') || pill.getAttribute('data-addon');
          if (!val) return;
          if (activeAddons.has(val)) {
            activeAddons.delete(val);
            pill.classList.remove('is-selected', 'is-active');
          } else {
            activeAddons.add(val);
            pill.classList.add('is-selected', 'is-active');
          }
          updateRebuildCalc();
        });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (sqftInput) sqftInput.value = 2400;
        rebuildRegion = 'northeast';
        rebuildStories = '2';
        rebuildFoundation = 'basement-unfin';
        rebuildGrade = 'custom';
        activeAddons.clear();

        const resetSingleGroup = (gid, defaultVal, attr) => {
          const c = document.getElementById(gid);
          if (!c) return;
          c.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => {
            const v = p.getAttribute('data-val') || p.getAttribute(attr);
            const isMatch = v === defaultVal;
            p.classList.toggle('is-selected', isMatch);
            p.classList.toggle('is-active', isMatch);
          });
        };

        resetSingleGroup('rebuildRegionGroup', 'northeast', 'data-region');
        resetSingleGroup('rebuildStoriesGroup', '2', 'data-stories');
        resetSingleGroup('rebuildFoundationGroup', 'basement-unfin', 'data-foundation');
        resetSingleGroup('rebuildGradeGroup', 'custom', 'data-grade');

        if (addonsContainer) {
          addonsContainer.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => p.classList.remove('is-selected', 'is-active'));
        }
        setRebuildStep(1);
        updateRebuildCalc();
      });
    }

    function updateRebuildCalc() {
      const sqft = parseInt(sqftInput?.value || 2400, 10);
      if (sqftVal) sqftVal.textContent = sqft.toLocaleString() + ' sq ft';
      if (sqftInput) updateSliderTrackFill(sqftInput);

      const regionRates = { 'south': 155, 'midwest': 160, 'northeast': 200, 'west': 240, 'west-metro': 240, 'global': 185 };
      const baseRate = regionRates[rebuildRegion] || 160;

      const storiesMults = {
        '1': 1.05, '1-story': 1.05,
        '2': 1.0, '2-story': 1.0,
        'split': 1.08,
        'custom': 1.15,
        'multi': 1.10
      };
      const foundationMults = {
        'slab': 1.0,
        'crawl': 1.06, 'crawlspace': 1.06,
        'basement-unfin': 1.12,
        'basement-fin': 1.22,
        'basement': 1.18
      };
      const gradeMults = {
        'economy': 1.0,
        'standard': 1.0,
        'semi-custom': 1.25,
        'custom': 1.30,
        'luxury': 1.75
      };

      const rate = baseRate * (storiesMults[rebuildStories] || 1.0) * (foundationMults[rebuildFoundation] || 1.0) * (gradeMults[rebuildGrade] || 1.0);

      let addonsTotal = 0;
      const addonValues = {
        'gourmet': 35000,
        'masonry': 25000,
        'roof': 20000,
        'deck': 15000,
        'garage': 25000,
        'patio': 12000,
        'tile-roof': 18000,
        'solar-hvac': 22000
      };
      activeAddons.forEach(a => { addonsTotal += (addonValues[a] || 0); });

      const structuralMid = Math.round(sqft * rate + addonsTotal);
      const lowRange = Math.round((structuralMid * 0.90) / 1000) * 1000;
      const highRange = Math.round((structuralMid * 1.12) / 1000) * 1000;

      const rangeDisplay = document.getElementById('rebuildRangeDisplay');
      const rebuildNarrative = document.getElementById('rebuildNarrative');
      if (rangeDisplay) {
        rangeDisplay.textContent = `${formatCurrency(lowRange)} – ${formatCurrency(highRange)}`;
      }
      if (rebuildNarrative) {
        rebuildNarrative.innerHTML = `Based on regional construction indices for your <strong>${sqft.toLocaleString()} sq ft</strong> home in the <strong>${rebuildRegion.toUpperCase()}</strong> zone, estimated structural rebuild costs span <strong>${formatCurrency(lowRange)}</strong> to <strong>${formatCurrency(highRange)}</strong>.`;
      }

      const envEl = document.getElementById('rebuildStepEnvelope');
      const mepEl = document.getElementById('rebuildStepMep');
      const finEl = document.getElementById('rebuildStepFinishes');
      const demoEl = document.getElementById('rebuildStepDemo');

      if (envEl) envEl.textContent = `~${formatCurrency(Math.round(structuralMid * 0.38))} (Structural framing, trusses, exterior walls, and roof structure).`;
      if (mepEl) mepEl.textContent = `~${formatCurrency(Math.round(structuralMid * 0.22))} (Plumbing rough-in, electrical wiring, panels, and HVAC ductwork).`;
      if (finEl) finEl.textContent = `~${formatCurrency(Math.round(structuralMid * 0.28))} (Drywall, cabinetry, flooring, tile, and interior fixtures).`;
      if (demoEl) demoEl.textContent = `~${formatCurrency(Math.round(structuralMid * 0.12))} (Debris haul-away, foundation clearance, and municipal permitting).`;
    }

    if (sqftInput) sqftInput.addEventListener('input', updateRebuildCalc);
    updateRebuildCalc();
  }

  // ==========================================================================
  // --- 7. Renters Insurance Coverage Calculator (renters-insurance-calculator) ---
  // ==========================================================================
  const rentersLab = document.getElementById('rentersInventoryInteractiveLab');
  if (rentersLab) {
    let rentersStep = 1;

    function setRentersStep(step) {
      rentersStep = Math.max(1, Math.min(3, step));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('rentersStepTab' + i);
        const panel = document.getElementById('rentersStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === rentersStep);
        if (panel) panel.classList.toggle('is-active', i === rentersStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('rentersStepTab' + i);
      if (tab) tab.addEventListener('click', () => setRentersStep(i));
    });

    const next1 = document.getElementById('rentersBtnNext1');
    const next2 = document.getElementById('rentersBtnNext2');
    const back2 = document.getElementById('rentersBtnBack2');
    const back3 = document.getElementById('rentersBtnBack3');
    const resetBtn = document.getElementById('rentersBtnReset');

    if (next1) next1.addEventListener('click', () => setRentersStep(2));
    if (next2) next2.addEventListener('click', () => setRentersStep(3));
    if (back2) back2.addEventListener('click', () => setRentersStep(1));
    if (back3) back3.addEventListener('click', () => setRentersStep(2));

    const items = [
      { id: 'rentersFurn', valId: 'rentersFurnVal', echoId: 'echoFurn', pctId: 'pctFurn', default: 9000 },
      { id: 'rentersCloth', valId: 'rentersClothVal', echoId: 'echoCloth', pctId: 'pctCloth', default: 6000 },
      { id: 'rentersElec', valId: 'rentersElecVal', echoId: 'echoElec', pctId: 'pctElec', default: 3500 },
      { id: 'rentersComp', valId: 'rentersCompVal', echoId: 'echoComp', pctId: 'pctComp', default: 4000 },
      { id: 'rentersKitchen', valId: 'rentersKitchenVal', default: 2500 },
      { id: 'rentersAppliance', valId: 'rentersApplianceVal', default: 1500 },
      { id: 'rentersJewel', valId: 'rentersJewelVal', default: 2500 },
      { id: 'rentersSports', valId: 'rentersSportsVal', default: 2000 },
      { id: 'rentersOther', valId: 'rentersOtherVal', default: 1500 }
    ];

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        items.forEach(item => {
          const el = document.getElementById(item.id);
          if (el) el.value = item.default;
        });
        setRentersStep(1);
        updateRentersCalc();
      });
    }

    function updateRentersCalc() {
      let total = 0;
      const values = {};

      items.forEach(item => {
        const el = document.getElementById(item.id);
        const valEl = document.getElementById(item.valId);
        const val = parseInt(el?.value || item.default, 10);
        values[item.id] = val;
        total += val;
        if (valEl) valEl.textContent = formatCurrency(val);
        if (el) updateSliderTrackFill(el);
      });

      items.forEach(item => {
        if (item.echoId) {
          const echoEl = document.getElementById(item.echoId);
          if (echoEl) echoEl.textContent = formatCurrency(values[item.id]);
        }
        if (item.pctId) {
          const pctEl = document.getElementById(item.pctId);
          if (pctEl) {
            const pct = total > 0 ? ((values[item.id] / total) * 100).toFixed(1) + '%' : '0%';
            pctEl.textContent = pct;
          }
        }
      });

      const totalDisplay = document.getElementById('rentersTotalDisplay');
      const narrative = document.getElementById('rentersSummaryNarrative');
      if (totalDisplay) animateCalculatedNumber(totalDisplay, total, { prefix: '$' });

      const suggestedTier = Math.max(15000, Math.ceil(total / 5000) * 5000);
      const estPremium = Math.round(12 + (suggestedTier / 10000) * 2.5);

      if (narrative) {
        narrative.innerHTML = `Your itemized inventory totals <strong>${formatCurrency(total)}</strong>. Renters policies are typically written in round limits; you may want to research a <strong>${formatCurrency(suggestedTier)}</strong> policy limit (approx <strong>$${estPremium} – $${estPremium + 6}/month</strong>).`;
      }

      const sublimitWarning = document.getElementById('rentersSublimitWarning');
      if (sublimitWarning) {
        const jewel = values['rentersJewel'] || 0;
        const comp = values['rentersComp'] || 0;
        const elec = values['rentersElec'] || 0;
        let warnings = [];
        if (jewel > 1500) {
          warnings.push(`Jewelry (${formatCurrency(jewel)}) exceeds standard statutory theft sub-limits (~$1,500). Consider scheduled personal property riders.`);
        }
        if ((comp + elec) > 5000) {
          warnings.push(`Electronics & Computers (${formatCurrency(comp + elec)}) exceed standard computer theft caps. Review policy language for electronic equipment endorsements.`);
        }
        if (warnings.length > 0) {
          sublimitWarning.style.display = 'block';
          sublimitWarning.innerHTML = `<strong>Special Sub-Limit Alert:</strong> ${warnings.join(' ')}`;
        } else {
          sublimitWarning.style.display = 'none';
        }
      }
    }

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) el.addEventListener('input', updateRentersCalc);
    });
    updateRentersCalc();
  }

  // ==========================================================================
  // --- 8. Travel Insurance Coverage Checklist (travel-insurance-checklist) ---
  // ==========================================================================
  const travelLab = document.getElementById('travelChecklistInteractiveLab');
  if (travelLab) {
    let travelStep = 1;
    let travelDest = 'intl-developed';
    let travelGroup = 'couple';
    const activeActivities = new Set(['sightseeing']);
    let travelCard = 'premium';

    function setTravelStep(step) {
      travelStep = Math.max(1, Math.min(3, step));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('travelStepTab' + i);
        const panel = document.getElementById('travelStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === travelStep);
        if (panel) panel.classList.toggle('is-active', i === travelStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('travelStepTab' + i);
      if (tab) tab.addEventListener('click', () => setTravelStep(i));
    });

    const next1 = document.getElementById('travelBtnNext1');
    const next2 = document.getElementById('travelBtnNext2');
    const back2 = document.getElementById('travelBtnBack2');
    const back3 = document.getElementById('travelBtnBack3');
    const resetBtn = document.getElementById('travelBtnReset');

    if (next1) next1.addEventListener('click', () => setTravelStep(2));
    if (next2) next2.addEventListener('click', () => setTravelStep(3));
    if (back2) back2.addEventListener('click', () => setTravelStep(1));
    if (back3) back3.addEventListener('click', () => setTravelStep(2));

    const tripCostInput = document.getElementById('travelCost');
    const tripCostVal = document.getElementById('travelCostVal');
    const tripDaysInput = document.getElementById('travelDays');
    const tripDaysVal = document.getElementById('travelDaysVal');

    function bindTravelPills(groupId, onSelect) {
      const container = document.getElementById(groupId);
      if (!container) return;
      const pills = container.querySelectorAll('.tier-toggle-pill, .pill-btn');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('is-selected', 'is-active'));
          pill.classList.add('is-selected', 'is-active');
          const val = pill.getAttribute('data-val') ||
                      pill.getAttribute('data-dest') ||
                      pill.getAttribute('data-group') ||
                      pill.getAttribute('data-card');
          if (val) {
            onSelect(val);
            updateTravelChecklist();
          }
        });
      });
    }

    bindTravelPills('travelDestGroup', v => { travelDest = v; });
    bindTravelPills('travelGroupProfile', v => { travelGroup = v; });
    bindTravelPills('travelCardGroup', v => { travelCard = v; });

    // Multi-select for activities
    const actContainer = document.getElementById('travelActivitiesGroup');
    if (actContainer) {
      const actPills = actContainer.querySelectorAll('.tier-toggle-pill, .pill-btn');
      actPills.forEach(pill => {
        pill.addEventListener('click', () => {
          const val = pill.getAttribute('data-val') || pill.getAttribute('data-act');
          if (!val) return;
          if (activeActivities.has(val)) {
            activeActivities.delete(val);
            pill.classList.remove('is-selected', 'is-active');
          } else {
            activeActivities.add(val);
            pill.classList.add('is-selected', 'is-active');
          }
          updateTravelChecklist();
        });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (tripCostInput) tripCostInput.value = 4800;
        if (tripDaysInput) tripDaysInput.value = 12;
        travelDest = 'intl-developed';
        travelGroup = 'couple';
        activeActivities.clear();
        activeActivities.add('sightseeing');
        travelCard = 'premium';

        const resetSingleGroup = (gid, defaultVal, attr) => {
          const c = document.getElementById(gid);
          if (!c) return;
          c.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => {
            const v = p.getAttribute('data-val') || p.getAttribute(attr);
            const isMatch = v === defaultVal;
            p.classList.toggle('is-selected', isMatch);
            p.classList.toggle('is-active', isMatch);
          });
        };

        resetSingleGroup('travelDestGroup', 'intl-developed', 'data-dest');
        resetSingleGroup('travelGroupProfile', 'couple', 'data-group');
        resetSingleGroup('travelCardGroup', 'premium', 'data-card');

        if (actContainer) {
          actContainer.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => {
            const v = p.getAttribute('data-val') || p.getAttribute('data-act');
            const isAct = activeActivities.has(v);
            p.classList.toggle('is-selected', isAct);
            p.classList.toggle('is-active', isAct);
          });
        }

        setTravelStep(1);
        updateTravelChecklist();
      });
    }

    function updateTravelChecklist() {
      const cost = parseInt(tripCostInput?.value || 4800, 10);
      const days = parseInt(tripDaysInput?.value || 12, 10);
      if (tripCostVal) tripCostVal.textContent = formatCurrency(cost);
      if (tripDaysVal) tripDaysVal.textContent = days + ' days';
      if (tripCostInput) updateSliderTrackFill(tripCostInput);
      if (tripDaysInput) updateSliderTrackFill(tripDaysInput);

      const isIntl = travelDest.includes('intl') || travelDest === 'adventure';
      const isRemote = travelDest === 'intl-remote' || travelDest === 'adventure';
      const isCruise = travelDest === 'cruise' || activeActivities.has('cruise');
      const isExtreme = travelDest === 'adventure' || activeActivities.has('skiing') || activeActivities.has('scuba') || activeActivities.has('hiking');
      const isSenior = travelGroup === 'senior';
      const hasPremiumCard = travelCard === 'premium';
      const hasCard = travelCard === 'basic' || travelCard === 'standard' || hasPremiumCard;
      const hasRental = activeActivities.has('rental');

      const cards = [];

      if (isIntl) {
        cards.push({
          title: 'Emergency Medical Expenses Abroad',
          priority: 'High Priority',
          badgeClass: 'checklist-badge-high',
          why: 'Domestic health plans (including Medicare and most private employer health plans) generally offer zero reimbursement outside national borders.',
          question: 'Ask whether coverage is primary or secondary, and confirm at least $50,000 – $100,000 emergency medical limits.'
        });
      } else {
        cards.push({
          title: 'Domestic Out-of-Network Emergency Check',
          priority: 'Review Needed',
          badgeClass: 'checklist-badge-medium',
          why: 'Your domestic health insurance covers you across state lines, but out-of-network emergency coinsurance may still apply.',
          question: 'Verify your plan emergency room cost-sharing rules before purchasing duplicate domestic medical travel policies.'
        });
      }

      if (isRemote || isCruise) {
        cards.push({
          title: 'Medical Evacuation & Air Repatriation ($250,000+)',
          priority: 'Critical Priority',
          badgeClass: 'checklist-badge-high',
          why: 'Airlifting from cruise vessels or remote locations to an accredited regional trauma hospital frequently exceeds $150,000 – $250,000.',
          question: 'Does the policy evacuate you to your hospital of choice back home, or only to the nearest local clinic?'
        });
      } else if (isIntl) {
        cards.push({
          title: 'Emergency Medical Evacuation ($100,000)',
          priority: 'High Priority',
          badgeClass: 'checklist-badge-high',
          why: 'Commercial airlines refuse to fly non-ambulatory ICU patients without dedicated medical escorts.',
          question: 'Confirm $100,000 minimum medical transport limit and 24/7 international assistance dispatch.'
        });
      }

      if (cost >= 2000) {
        cards.push({
          title: `Trip Cancellation & Prepaid Forfeiture (${formatCurrency(cost)})`,
          priority: hasPremiumCard ? 'Potential Card Overlap' : 'High Priority',
          badgeClass: hasPremiumCard ? 'checklist-badge-overlap' : 'checklist-badge-high',
          why: hasPremiumCard ?
            'Premium credit cards frequently offer $10,000/trip cancellation for covered medical reasons or severe weather.' :
            `You have ${formatCurrency(cost)} in non-refundable airline and lodging expenses vulnerable to cancellation.`,
          question: hasPremiumCard ?
            'Did you charge 100% of non-refundable expenses to this card? Check the card Guide to Benefits for excluded perils.' :
            'Do you need a Pre-Existing Condition Waiver to protect family members with chronic medical histories?'
        });
      }

      if (isSenior || isIntl) {
        cards.push({
          title: 'Pre-Existing Medical Condition Waiver',
          priority: 'Time Sensitive',
          badgeClass: 'checklist-badge-medium',
          why: 'Carriers review 60–180 days of medical history; recent medication adjustments can trigger claim denials without a waiver.',
          question: 'Most insurers require purchasing travel insurance within 14 to 21 days of initial trip deposit to secure this waiver.'
        });
      }

      if (isExtreme) {
        cards.push({
          title: 'Hazardous Sports & Adventure Endorsement',
          priority: 'Mandatory Rider',
          badgeClass: 'checklist-badge-high',
          why: 'Standard travel insurance explicitly excludes mountaineering, scuba below 30m, backcountry skiing, and motorized racing.',
          question: 'Confirm whether an optional Adventure Sports rider is required for your scheduled activities.'
        });
      }

      if (hasRental) {
        cards.push({
          title: 'Rental Car Collision Damage Waiver (CDW)',
          priority: hasPremiumCard ? 'Primary Card Overlap' : 'High Priority',
          badgeClass: hasPremiumCard ? 'checklist-badge-overlap' : 'checklist-badge-high',
          why: hasPremiumCard ?
            'Premium credit cards frequently provide primary auto rental collision coverage, letting you decline expensive rental agency CDW fees ($25–$40/day).' :
            'Rental counter loss-damage waivers protect against loss-of-use and diminished value fees often excluded by personal auto policies abroad.',
          question: hasPremiumCard ?
            'Confirm if your card provides primary or secondary collision coverage in the country of travel.' :
            'Check whether your personal domestic auto insurance extends liability coverage to your destination country.'
        });
      }

      if (hasCard) {
        cards.push({
          title: 'Credit Card Overlap Audit',
          priority: 'Overlap Detected',
          badgeClass: 'checklist-badge-overlap',
          why: 'Rental car damage waiver (CDW) and delayed baggage compensation ($500) are commonly bundled into travel credit cards.',
          question: 'Review credit card perks before paying for redundant standalone baggage or rental collision add-ons.'
        });
      }

      const grid = document.getElementById('travelChecklistGrid');
      if (grid) {
        grid.innerHTML = cards.map(c => `
          <div class="checklist-card">
            <div class="checklist-card-header">
              <h4 class="checklist-card-title">${c.title}</h4>
              <span class="checklist-priority-badge ${c.badgeClass}">${c.priority}</span>
            </div>
            <div class="checklist-card-section">
              <span class="checklist-card-label">Why it matters:</span>
              <p style="color: var(--color-secondary); margin: 0;">${c.why}</p>
            </div>
            <div class="checklist-card-section">
              <span class="checklist-card-label">Questions to ask before buying:</span>
              <p style="color: var(--color-text); margin: 0; font-weight: 500;">${c.question}</p>
            </div>
          </div>
        `).join('');
      }
    }

    if (tripCostInput) tripCostInput.addEventListener('input', updateTravelChecklist);
    if (tripDaysInput) tripDaysInput.addEventListener('input', updateTravelChecklist);
    updateTravelChecklist();
  }

  // ==========================================================================
  // --- 9. Disability Income Protection Calculator (disability-insurance-calculator) ---
  // ==========================================================================
  const disLab = document.getElementById('disabilityIncomeInteractiveLab');
  if (disLab) {
    let disStep = 1;
    let disEmployerLTD = 'standard';

    function setDisStep(step) {
      disStep = Math.max(1, Math.min(3, step));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('disStepTab' + i);
        const panel = document.getElementById('disStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === disStep);
        if (panel) panel.classList.toggle('is-active', i === disStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('disStepTab' + i);
      if (tab) tab.addEventListener('click', () => setDisStep(i));
    });

    const next1 = document.getElementById('disBtnNext1');
    const next2 = document.getElementById('disBtnNext2');
    const back2 = document.getElementById('disBtnBack2');
    const back3 = document.getElementById('disBtnBack3');
    const resetBtn = document.getElementById('disBtnReset');

    if (next1) next1.addEventListener('click', () => setDisStep(2));
    if (next2) next2.addEventListener('click', () => setDisStep(3));
    if (back2) back2.addEventListener('click', () => setDisStep(1));
    if (back3) back3.addEventListener('click', () => setDisStep(2));

    const grossInput = document.getElementById('disGross');
    const grossVal = document.getElementById('disGrossVal');
    const expensesInput = document.getElementById('disExpenses');
    const expensesVal = document.getElementById('disExpensesVal');
    const otherInput = document.getElementById('disOtherIncome');
    const otherVal = document.getElementById('disOtherIncomeVal');
    const indInput = document.getElementById('disExistingInd');
    const indVal = document.getElementById('disExistingIndVal');
    const savingsInput = document.getElementById('disSavings');
    const savingsVal = document.getElementById('disSavingsVal');
    const ltdHelp = document.getElementById('disLtdHelp');

    function bindDisPills(groupId, onSelect) {
      const container = document.getElementById(groupId);
      if (!container) return;
      const pills = container.querySelectorAll('.tier-toggle-pill, .pill-btn');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('is-selected', 'is-active'));
          pill.classList.add('is-selected', 'is-active');
          const val = pill.getAttribute('data-val') || pill.getAttribute('data-ltd');
          if (val) {
            onSelect(val);
            updateDisCalc();
          }
        });
      });
    }

    bindDisPills('disEmployerGroup', v => {
      disEmployerLTD = v;
      if (ltdHelp) {
        ltdHelp.textContent = (v === 'standard' || v === 'group-taxable') ?
          'Standard group policies pay 60% of base salary (capped at $5,000/mo), but payouts are taxable as ordinary income (~25% tax drag).' :
          v === 'high' ?
          'Generous group policies pay 66% of base salary (capped at $10,000/mo), with payouts subject to ordinary income tax.' :
          v === 'group-taxfree' ?
          'You pay premiums with post-tax dollars: 100% of disability payouts are received completely tax-free.' :
          'Zero employer group protection. If disabled, earned paycheck stops completely (100% gap).';
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (grossInput) grossInput.value = 8500;
        if (expensesInput) expensesInput.value = 5200;
        if (otherInput) otherInput.value = 0;
        if (indInput) indInput.value = 0;
        if (savingsInput) savingsInput.value = 25000;
        disEmployerLTD = 'standard';
        const c = document.getElementById('disEmployerGroup');
        if (c) {
          c.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => {
            const val = p.getAttribute('data-val') || p.getAttribute('data-ltd');
            const isMatch = val === 'standard';
            p.classList.toggle('is-selected', isMatch);
            p.classList.toggle('is-active', isMatch);
          });
        }
        if (ltdHelp) {
          ltdHelp.textContent = 'Standard group policies pay 60% of base salary (capped at $5,000/mo), but payouts are taxable as ordinary income (~25% tax drag).';
        }
        setDisStep(1);
        updateDisCalc();
      });
    }

    function updateDisCalc() {
      const gross = parseInt(grossInput?.value || 8500, 10);
      const expenses = parseInt(expensesInput?.value || 5200, 10);
      const other = parseInt(otherInput?.value || 0, 10);
      const ind = parseInt(indInput?.value || 0, 10);
      const savings = parseInt(savingsInput?.value || 25000, 10);

      if (grossVal) grossVal.textContent = formatCurrency(gross);
      if (expensesVal) expensesVal.textContent = formatCurrency(expenses);
      if (otherVal) otherVal.textContent = formatCurrency(other);
      if (indVal) indVal.textContent = formatCurrency(ind);
      if (savingsVal) savingsVal.textContent = formatCurrency(savings);

      [grossInput, expensesInput, otherInput, indInput, savingsInput].forEach(el => {
        if (el) updateSliderTrackFill(el);
      });

      let grossLtd = 0;
      let netLtd = 0;
      const isTaxable = disEmployerLTD === 'standard' || disEmployerLTD === 'high' || disEmployerLTD === 'group-taxable' || disEmployerLTD === 'group-50';

      if (disEmployerLTD === 'standard' || disEmployerLTD === 'group-taxable') {
        grossLtd = Math.min(5000, Math.round(gross * 0.60));
        netLtd = Math.round(grossLtd * 0.75);
      } else if (disEmployerLTD === 'high') {
        grossLtd = Math.min(10000, Math.round(gross * 0.66));
        netLtd = Math.round(grossLtd * 0.75);
      } else if (disEmployerLTD === 'group-50') {
        grossLtd = Math.round(gross * 0.50);
        netLtd = Math.round(grossLtd * 0.75);
      } else if (disEmployerLTD === 'group-taxfree') {
        grossLtd = Math.round(gross * 0.60);
        netLtd = grossLtd;
      } else {
        grossLtd = 0;
        netLtd = 0;
      }

      const totalProtected = netLtd + other + ind;
      const gap = expenses - totalProtected;
      const hasGap = gap > 0;
      const runwayMonths = hasGap ? (savings / gap) : 999;

      const statusEl = document.getElementById('disResultStatus');
      const resGross = document.getElementById('disResGross');
      const resAnnual = document.getElementById('disResAnnual');
      const resExpenses = document.getElementById('disResExpenses');
      const resExpRatio = document.getElementById('disResExpRatio');
      const resProtection = document.getElementById('disResProtection');
      const resLtdEcho = document.getElementById('disResLtdEcho');
      const resOtherEcho = document.getElementById('disResOtherEcho');
      const resGap = document.getElementById('disResGap');
      const resRunway = document.getElementById('disResRunway');
      const meansText = document.getElementById('disWhatThisMeansText');

      if (resGross) animateCalculatedNumber(resGross, gross, { prefix: '$' });
      if (resAnnual) resAnnual.textContent = formatCurrency(gross * 12) + '/yr';
      if (resExpenses) animateCalculatedNumber(resExpenses, expenses, { prefix: '$' });
      if (resExpRatio) resExpRatio.textContent = Math.round((expenses / gross) * 100) + '% of Gross';

      if (resProtection) animateCalculatedNumber(resProtection, totalProtected, { prefix: '$' });
      if (resLtdEcho) resLtdEcho.textContent = `${formatCurrency(netLtd)}${isTaxable ? ' (after estimated taxes)' : ''}`;
      if (resOtherEcho) resOtherEcho.textContent = formatCurrency(other + ind);

      if (resGap) {
        if (hasGap) {
          resGap.textContent = `-${formatCurrency(gap)}/mo`;
          resGap.style.color = '#dc2626';
        } else {
          resGap.textContent = `+$${Math.abs(Math.round(gap)).toLocaleString()}/mo Surplus`;
          resGap.style.color = '#059669';
        }
      }

      if (resRunway) {
        if (hasGap) {
          resRunway.textContent = runwayMonths > 99 ? '99+ mos' : runwayMonths.toFixed(1) + ' mos';
          resRunway.style.color = runwayMonths < 6 ? '#dc2626' : 'var(--color-text)';
        } else {
          resRunway.textContent = 'Indefinite';
          resRunway.style.color = '#059669';
        }
      }

      if (statusEl) {
        if (hasGap) {
          statusEl.textContent = `Deficit: ${formatCurrency(gap)}/mo`;
          statusEl.className = 'results-status-badge dis-status-urgent';
        } else {
          statusEl.textContent = 'Income Fully Protected';
          statusEl.className = 'results-status-badge dis-status-safe';
        }
      }

      if (meansText) {
        meansText.innerHTML = hasGap ?
          `Your essential monthly expenses exceed your estimated net disability protection by <strong>${formatCurrency(gap)} every month</strong>. At this burn rate, your <strong>${formatCurrency(savings)}</strong> cash reserve would be exhausted in approximately <strong>${runwayMonths.toFixed(1)} months</strong>.` :
          `Your current disability protection and passive income cover 100% of your essential monthly expenses. You have an estimated <strong>${formatCurrency(Math.abs(gap))}/month cushion</strong>, preserving your emergency savings indefinitely.`;
      }

      const m1 = document.getElementById('disMathStep1');
      const m2 = document.getElementById('disMathStep2');
      const m3 = document.getElementById('disMathStep3');
      const m4 = document.getElementById('disMathStep4');

      if (m1) m1.textContent = `${disEmployerLTD === 'none' ? '$0 (no employer LTD)' : `${disEmployerLTD.includes('50') ? '50%' : '60%'} of ${formatCurrency(gross)} gross = ${formatCurrency(grossLtd)} gross benefit.`}`;
      if (m2) m2.textContent = isTaxable ? `${formatCurrency(grossLtd)} × 0.75 tax factor = ${formatCurrency(netLtd)} take-home net benefit.` : `${formatCurrency(grossLtd)} received 100% tax-free.`;
      if (m3) m3.textContent = `${formatCurrency(netLtd)} LTD + ${formatCurrency(other + ind)} other = ${formatCurrency(totalProtected)} net monthly benefit vs ${formatCurrency(expenses)} essential expenses.`;
      if (m4) m4.textContent = hasGap ? `${formatCurrency(savings)} savings ÷ ${formatCurrency(gap)} monthly deficit = ${runwayMonths.toFixed(1)} months until liquid depletion.` : 'No monthly deficit; emergency fund remains intact.';
    }

    [grossInput, expensesInput, otherInput, indInput, savingsInput].forEach(el => {
      if (el) el.addEventListener('input', updateDisCalc);
    });
    updateDisCalc();
  }

  // ==========================================================================
  // --- 10. Business Insurance Needs Checklist (business-insurance-checklist) ---
  // ==========================================================================
  const bizLab = document.getElementById('businessNeedsInteractiveLab');
  if (bizLab) {
    let bizStep = 1;
    let bizIndustry = 'consulting';
    let bizEntity = 'llc';
    let bizEmployees = 'small';
    let bizPremises = 'home';
    const activeRisks = new Set(['advice', 'data']);

    function setBizStep(step) {
      bizStep = Math.max(1, Math.min(3, step));
      for (let i = 1; i <= 3; i++) {
        const tab = document.getElementById('bizStepTab' + i);
        const panel = document.getElementById('bizStepPanel' + i);
        if (tab) tab.classList.toggle('is-active', i === bizStep);
        if (panel) panel.classList.toggle('is-active', i === bizStep);
      }
    }

    [1, 2, 3].forEach(i => {
      const tab = document.getElementById('bizStepTab' + i);
      if (tab) tab.addEventListener('click', () => setBizStep(i));
    });

    const next1 = document.getElementById('bizBtnNext1');
    const next2 = document.getElementById('bizBtnNext2');
    const back2 = document.getElementById('bizBtnBack2');
    const back3 = document.getElementById('bizBtnBack3');
    const resetBtn = document.getElementById('bizBtnReset');

    if (next1) next1.addEventListener('click', () => setBizStep(2));
    if (next2) next2.addEventListener('click', () => setBizStep(3));
    if (back2) back2.addEventListener('click', () => setBizStep(1));
    if (back3) back3.addEventListener('click', () => setBizStep(2));

    function bindBizPills(groupId, onSelect) {
      const container = document.getElementById(groupId);
      if (!container) return;
      const pills = container.querySelectorAll('.tier-toggle-pill, .pill-btn');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('is-selected', 'is-active'));
          pill.classList.add('is-selected', 'is-active');
          const val = pill.getAttribute('data-val') ||
                      pill.getAttribute('data-ind') ||
                      pill.getAttribute('data-entity') ||
                      pill.getAttribute('data-emp') ||
                      pill.getAttribute('data-prem') ||
                      pill.getAttribute('data-premises');
          if (val) {
            onSelect(val);
            updateBizChecklist();
          }
        });
      });
    }

    bindBizPills('bizIndustryGroup', v => { bizIndustry = v; });
    bindBizPills('bizEntityGroup', v => { bizEntity = v; });
    bindBizPills('bizEmployeeGroup', v => {
      bizEmployees = v;
      const help = document.getElementById('bizEmpHelp');
      if (help) {
        help.textContent = (v === 'zero' || v === '0') ?
          'Sole owner: In most states, workers compensation is optional for sole proprietors without W-2 staff.' :
          'Having W-2 employees triggers mandatory statutory workers compensation requirements in almost all jurisdictions.';
      }
    });
    bindBizPills('bizPremisesGroup', v => { bizPremises = v; });

    const risksContainer = document.getElementById('bizRiskDrivers');
    if (risksContainer) {
      const riskPills = risksContainer.querySelectorAll('.tier-toggle-pill, .pill-btn');
      riskPills.forEach(pill => {
        pill.addEventListener('click', () => {
          const val = pill.getAttribute('data-val') || pill.getAttribute('data-driver');
          if (!val) return;
          if (activeRisks.has(val)) {
            activeRisks.delete(val);
            pill.classList.remove('is-selected', 'is-active');
          } else {
            activeRisks.add(val);
            pill.classList.add('is-selected', 'is-active');
          }
          updateBizChecklist();
        });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        bizIndustry = 'consulting';
        bizEntity = 'llc';
        bizEmployees = 'small';
        bizPremises = 'home';
        activeRisks.clear();
        activeRisks.add('advice');
        activeRisks.add('data');

        const resetSingleGroup = (gid, defaultVal, attr) => {
          const c = document.getElementById(gid);
          if (!c) return;
          c.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => {
            const v = p.getAttribute('data-val') || p.getAttribute(attr);
            const isMatch = v === defaultVal;
            p.classList.toggle('is-selected', isMatch);
            p.classList.toggle('is-active', isMatch);
          });
        };

        resetSingleGroup('bizIndustryGroup', 'consulting', 'data-ind');
        resetSingleGroup('bizEntityGroup', 'llc', 'data-entity');
        resetSingleGroup('bizEmployeeGroup', 'small', 'data-emp');
        resetSingleGroup('bizPremisesGroup', 'home', 'data-prem');

        if (risksContainer) {
          risksContainer.querySelectorAll('.tier-toggle-pill, .pill-btn').forEach(p => {
            const v = p.getAttribute('data-val') || p.getAttribute('data-driver');
            const isAct = activeRisks.has(v);
            p.classList.toggle('is-selected', isAct);
            p.classList.toggle('is-active', isAct);
          });
        }

        const help = document.getElementById('bizEmpHelp');
        if (help) {
          help.textContent = 'Having W-2 employees triggers mandatory statutory workers compensation requirements in almost all jurisdictions.';
        }

        setBizStep(1);
        updateBizChecklist();
      });
    }

    function updateBizChecklist() {
      const hasEmployees = bizEmployees !== 'zero' && bizEmployees !== '0';
      const isService = bizIndustry === 'consulting' || bizIndustry === 'tech' || bizIndustry === 'healthcare';
      const isTrades = bizIndustry === 'construction' || bizIndustry === 'trades';
      const isRetail = bizIndustry === 'retail' || bizIndustry === 'hospitality' || bizIndustry === 'restaurant';
      const hasPhysicalSpace = bizPremises === 'leased' || bizPremises === 'owned';
      const handlesData = activeRisks.has('handles-data') || activeRisks.has('data') || bizIndustry === 'tech';
      const hasVehicles = activeRisks.has('vehicles') || isTrades;
      const hasAdvice = activeRisks.has('advice') || activeRisks.has('contracts') || isService;
      const hasProducts = activeRisks.has('products') || isRetail;

      const cards = [];

      cards.push({
        title: 'Commercial General Liability (CGL)',
        priority: 'Foundational Defense',
        badgeClass: 'checklist-badge-high',
        why: 'Protects against third-party bodily injury and property damage claims. Commercial leases and client agreements almost universally require a $1M/$2M Certificate of Insurance (COI).',
        investigate: 'Verify whether clients or landlords must be designated as Additional Insureds.'
      });

      if (hasPhysicalSpace || isRetail) {
        cards.push({
          title: "Business Owner's Policy (BOP)",
          priority: 'Cost-Effective Package',
          badgeClass: 'checklist-badge-standard',
          why: 'Bundles Commercial General Liability, Business Personal Property, and Business Interruption (operating loss replacement during repair) at an average 15–25% savings over separate policies.',
          investigate: 'Confirm carrier underwriting eligibility based on sales volume and square footage.'
        });
      }

      if (hasEmployees) {
        cards.push({
          title: "Workers' Compensation & Employer Liability",
          priority: 'Statutory Mandate',
          badgeClass: 'checklist-badge-high',
          why: 'Statutory mandate in almost all jurisdictions when employing W-2 staff. Covers medical bills, disability wages, and rehabilitation for work injuries.',
          investigate: 'Classify staff under exact NCCI class codes to prevent costly end-of-year payroll audits.'
        });
      } else {
        cards.push({
          title: "Workers' Compensation (Sole Owner Exemption)",
          priority: 'Optional Exemption',
          badgeClass: 'checklist-badge-medium',
          why: 'Sole proprietors and single-member LLCs are typically exempt, though commercial clients may demand an official Certificate of Exemption.',
          investigate: 'Check state statutes regarding voluntary elective coverage for business owners.'
        });
      }

      if (hasAdvice) {
        cards.push({
          title: 'Professional Liability / Errors & Omissions (E&O)',
          priority: 'Advice & Contract Shield',
          badgeClass: 'checklist-badge-high',
          why: 'CGL explicitly excludes financial losses stemming from work quality, advice, design errors, or delayed deliverables. E&O funds defense and settlements.',
          investigate: 'Confirm retroactive dates so previously executed projects remain continuously protected.'
        });
      }

      if (handlesData) {
        cards.push({
          title: 'Cyber Liability & Data Breach Protection',
          priority: 'Data Privacy Defense',
          badgeClass: 'checklist-badge-high',
          why: 'Shields against customer notification costs, credit monitoring, forensic investigation, and regulatory penalties following cyber intrusions.',
          investigate: 'Confirm both First-Party system restoration and Third-Party liability coverage are included.'
        });
      }

      if (hasProducts) {
        cards.push({
          title: 'Product Liability / Completed Operations',
          priority: 'Defective Product Shield',
          badgeClass: 'checklist-badge-high',
          why: 'Covers legal liability and damages if physical goods manufactured, imported, or sold cause bodily injury or property damage to users.',
          investigate: 'Check vendor hold-harmless agreements and wholesale supplier insurance requirements.'
        });
      }

      if (hasVehicles) {
        cards.push({
          title: 'Commercial Auto & Hired/Non-Owned Auto (HNOA)',
          priority: 'Fleet & Vehicle Exposure',
          badgeClass: 'checklist-badge-medium',
          why: 'Personal auto insurance excludes accidents occurring during business errands or delivery operations.',
          investigate: 'Add Hired and Non-Owned Auto (HNOA) if team members use personal vehicles for business.'
        });
      }

      const grid = document.getElementById('bizChecklistGrid');
      if (grid) {
        grid.innerHTML = cards.map(c => `
          <div class="checklist-card">
            <div class="checklist-card-header">
              <h4 class="checklist-card-title">${c.title}</h4>
              <span class="checklist-priority-badge ${c.badgeClass}">${c.priority}</span>
            </div>
            <div class="checklist-card-section">
              <span class="checklist-card-label">Why it matters:</span>
              <p style="color: var(--color-secondary); margin: 0;">${c.why}</p>
            </div>
            <div class="checklist-card-section">
              <span class="checklist-card-label">What to investigate:</span>
              <p style="color: var(--color-text); margin: 0; font-weight: 500;">${c.investigate}</p>
            </div>
          </div>
        `).join('');
      }
    }

    updateBizChecklist();
  }

  // ==========================================================================
  // --- Batch 3 Interactive Calculators & Quizzes (Tools 11–15) ---
  // ==========================================================================
  initNeedsCalculatorTool();
  initCoverageGapCheckerTool();
  initPolicyReviewChecklistTool();
  initReadinessQuizTool();
  initTerminologyQuizTool();


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
  qa: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
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
    url: '/life-insurance-calculator/',
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
    url: '/health-insurance-calculator/',
    desc: 'Compare annual costs between HDHP and PPO plans.',
    intent: 'Calculator',
    intentClass: 'pill-intent-calc',
    iconType: 'calc'
  },
  {
    title: 'Can Insurance Drop You After a Claim?',
    url: '/qa/can-insurance-drop-you-after-a-claim',
    desc: 'Cancellation vs non-renewal: statutory protections and frequency thresholds.',
    intent: 'Q&A',
    intentClass: 'pill-intent-qa',
    iconType: 'qa'
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

  const matchedQA = (siteData?.qa || []).filter(q =>
    regex.test(q.question) || regex.test(q.shortAnswer || '') || regex.test(q.category || '') || regex.test(q.slug)
  ).slice(0, 4);

  const matchedComparisons = (siteData?.comparisons || []).filter(c =>
    regex.test(c.title) || regex.test(c.subtitle || '') || regex.test(c.description || '') || regex.test(c.slug)
  ).slice(0, 3);

  const matchedGlossary = (siteData?.glossary || []).filter(g =>
    regex.test(g.term) || regex.test(g.simpleDefinition || g.plainEnglish || '') || regex.test(g.slug)
  ).slice(0, 3);

  const matchedScenarios = (siteData?.scenarios || []).filter(s =>
    regex.test(s.name) || regex.test(s.situation || '') || regex.test(s.coreQuestion || '') || regex.test(s.slug)
  ).slice(0, 3);

  const totalMatches = matchedTools.length + matchedArticles.length + matchedQA.length + matchedComparisons.length + matchedGlossary.length + matchedScenarios.length;

  if (totalMatches === 0) {
    return `<div style="padding: 32px 16px; text-align: center; color: var(--color-secondary); font-size: 0.9375rem;">No matching guides, tools, or terms found for "<strong>${escapeHtml(cleanQuery)}</strong>".</div>`;
  }

  let html = '';

  if (matchedTools.length > 0) {
    html += '<div class="search-section-header">Calculators</div>';
    html += matchedTools.map(t => renderSearchItemRow({
      url: `/${t.slug}/`,
      title: t.name,
      desc: t.shortDescription,
      intent: 'Calculator',
      intentClass: 'pill-intent-calc',
      iconType: 'calc'
    })).join('');
  }

  if (matchedQA.length > 0) {
    html += '<div class="search-section-header">Expert Q&amp;A</div>';
    html += matchedQA.map(q => renderSearchItemRow({
      url: `/qa/${q.slug}`,
      title: q.question,
      desc: q.shortAnswer,
      intent: 'Q&A',
      intentClass: 'pill-intent-qa',
      iconType: 'qa'
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

// ==========================================================================
// 4. Progressive Article Pagination & Smooth Category Filtering (Learn Hub)
// ==========================================================================

function initArticleFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = Array.from(document.querySelectorAll('.article-card, .apple-article-card'));
  const loadMoreBtn = document.getElementById('loadMoreArticlesBtn');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const emptyNotice = document.getElementById('articlesEmptyNotice');
  const liveSearchInput = document.getElementById('blogLiveSearch');
  const featuredHero = document.getElementById('featuredBlogHero');

  if (!cards.length && !featuredHero) return;

  // 1. Dynamic Random Hero Main Card Selection on Every Load / Refresh
  let currentHeroSlug = '';
  if (featuredHero) {
    const dataScript = document.getElementById('learnArticlesData');
    let articlesData = [];
    if (dataScript) {
      try {
        articlesData = JSON.parse(dataScript.textContent);
      } catch (e) {}
    }

    if (articlesData && articlesData.length > 0) {
      const randomArticle = articlesData[Math.floor(Math.random() * articlesData.length)];
      currentHeroSlug = randomArticle.slug;

      // Update hero image
      const heroImg = featuredHero.querySelector('.card-featured-img');
      if (heroImg) {
        heroImg.src = randomArticle.coverImage || '/images/hero-guide.jpg';
        heroImg.alt = randomArticle.title;
      }

      // Update category pill tag
      const heroCategoryPill = featuredHero.querySelector('.featured-body-meta .pill');
      if (heroCategoryPill) {
        heroCategoryPill.textContent = (randomArticle.category || 'insurance-basics').replace(/-/g, ' ');
      }

      // Update reading time
      const heroTimeSpan = featuredHero.querySelector('.featured-body-meta span:last-child');
      if (heroTimeSpan) {
        heroTimeSpan.textContent = (randomArticle.readingTime ? randomArticle.readingTime + ' min read' : '7 min read');
      }

      // Update title link
      const heroTitleLink = featuredHero.querySelector('.featured-body-title a');
      if (heroTitleLink) {
        heroTitleLink.href = `/learn/${randomArticle.slug}`;
        heroTitleLink.textContent = randomArticle.title;
      }

      // Update description
      const heroDesc = featuredHero.querySelector('.featured-body-desc');
      if (heroDesc) {
        heroDesc.textContent = randomArticle.description;
      }

      // Update author
      const heroAuthor = featuredHero.querySelector('.author-name');
      if (heroAuthor) {
        heroAuthor.textContent = randomArticle.author || 'Insurance Bhaiya Editorial Team';
      }

      // Update CTA button
      const heroCta = featuredHero.querySelector('.featured-cta-btn');
      if (heroCta) {
        heroCta.href = `/learn/${randomArticle.slug}`;
      }

      featuredHero.setAttribute('data-slug', randomArticle.slug);
      featuredHero.setAttribute('data-category', randomArticle.category || 'insurance-basics');
    } else {
      currentHeroSlug = featuredHero.getAttribute('data-slug') || '';
    }
  }

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
          filterPills.forEach(pill => {
            pill.classList.remove('active');
            pill.classList.remove('pill-accent');
          });
          p.classList.add('active');
          p.classList.add('pill-accent');
          activeCategory = initialCat;
        }
      });
    }
  } catch (e) {}

  function applyPaginationAndFilters() {
    // Deduplication: Hide the hero card in the small cards grid so it NEVER repeats
    cards.forEach(card => {
      const cardSlug = card.getAttribute('data-slug');
      if (cardSlug && cardSlug === currentHeroSlug) {
        card.setAttribute('data-is-hero-duplicate', 'true');
        card.style.display = 'none';
      } else {
        card.removeAttribute('data-is-hero-duplicate');
      }
    });

    const matchingCards = cards.filter(card => {
      if (card.getAttribute('data-is-hero-duplicate') === 'true') {
        card.style.display = 'none';
        return false;
      }
      const cardCat = card.getAttribute('data-category') || '';
      const cardText = (card.textContent || '').toLowerCase();
      const matchesCategory = activeCategory === 'all' || cardCat === activeCategory || cardCat.includes(activeCategory);
      const matchesSearch = !searchQuery || cardText.includes(searchQuery.toLowerCase());

      if (!matchesCategory || !matchesSearch) {
        card.style.display = 'none';
        return false;
      }
      return true;
    });

    // Show matching up to currentVisibleCount (initial 12)
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
        const btnSpan = loadMoreBtn.querySelector('span');
        if (btnSpan) {
          btnSpan.textContent = `Load More Publications (${remaining} remaining)`;
        } else {
          loadMoreBtn.textContent = `Load More Publications (${remaining} remaining)`;
        }
      } else {
        loadMoreWrap.style.display = 'none';
      }
    }

    // Manage Featured Hero Card category visibility
    if (featuredHero) {
      const heroCategory = featuredHero.getAttribute('data-category') || 'insurance-basics';
      const heroText = (featuredHero.textContent || '').toLowerCase();
      const heroMatchesCategory = activeCategory === 'all' || heroCategory === activeCategory || heroCategory.includes(activeCategory);
      const heroMatchesSearch = !searchQuery || heroText.includes(searchQuery.toLowerCase());

      if (heroMatchesCategory && heroMatchesSearch) {
        featuredHero.style.display = 'grid';
      } else {
        featuredHero.style.display = 'none';
      }
    }

    // Empty state handling
    if (emptyNotice) {
      emptyNotice.style.display = matchingCards.length === 0 ? 'block' : 'none';
    }
  }

  // Hook up filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.classList.remove('pill-accent');
      });
      pill.classList.add('active');
      pill.classList.add('pill-accent');
      activeCategory = pill.getAttribute('data-category') || 'all';
      currentVisibleCount = PAGE_SIZE; // Reset visible count to 12

      try {
        const url = new URL(window.location);
        if (activeCategory === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', activeCategory);
        }
        window.history.pushState({ category: activeCategory }, '', url);
      } catch (err) {}

      applyPaginationAndFilters();
    });
  });

  // Listen to popstate for browser back/forward
  window.addEventListener('popstate', () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || 'all';
      filterPills.forEach(p => {
        if ((p.getAttribute('data-category') || 'all') === catParam) {
          filterPills.forEach(pill => {
            pill.classList.remove('active');
            pill.classList.remove('pill-accent');
          });
          p.classList.add('active');
          p.classList.add('pill-accent');
          activeCategory = catParam;
        }
      });
      currentVisibleCount = PAGE_SIZE;
      applyPaginationAndFilters();
    } catch (e) {}
  });

  // Hook up live search input
  if (liveSearchInput) {
    liveSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      currentVisibleCount = PAGE_SIZE;
      applyPaginationAndFilters();
    });
  }

  // Hook up load more button (loads 12 more on click)
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentVisibleCount += PAGE_SIZE;
      applyPaginationAndFilters();
    });
  }

  // Initial display run
  applyPaginationAndFilters();
}

// ==========================================================================
// 4b. Dynamic Random Hero Spotlight & Deduplication (Tools Hub)
// ==========================================================================

function initToolsHeroSpotlight() {
  const spotlightHero = document.getElementById('toolsSpotlightHero');
  if (!spotlightHero) return;

  let toolsData = [];
  const dataScript = document.getElementById('toolsData');
  if (dataScript) {
    try {
      toolsData = JSON.parse(dataScript.textContent);
    } catch (e) {}
  }

  const toolCards = Array.from(document.querySelectorAll('.apple-calc-card'));
  if (!toolCards.length) return;

  let heroSlug = '';
  if (toolsData && toolsData.length > 0) {
    // Pick a random calculator
    const randomTool = toolsData[Math.floor(Math.random() * toolsData.length)];
    heroSlug = randomTool.slug;

    spotlightHero.setAttribute('data-slug', randomTool.slug);

    const badgeEl = document.getElementById('spotlightBadgeText');
    if (badgeEl) badgeEl.textContent = randomTool.badge || 'Actuarial Framework';

    const titleEl = document.getElementById('spotlightTitle');
    if (titleEl) titleEl.textContent = randomTool.name;

    const descEl = document.getElementById('spotlightDesc');
    if (descEl) descEl.textContent = randomTool.shortDescription || randomTool.formulaDescription || 'Calculate your mathematically ideal coverage using verified actuarial formulas.';

    const formulaEl = document.getElementById('spotlightFormula');
    if (formulaEl) {
      formulaEl.textContent = randomTool.formulaDescription || randomTool.shortDescription || 'Dynamic actuarial risk model calculating optimal coverage thresholds.';
    }

    const catBadge = document.getElementById('spotlightCategoryBadge');
    if (catBadge) {
      catBadge.textContent = (randomTool.category || 'actuarial').replace(/-/g, ' ');
    }

    const primBtn = document.getElementById('spotlightPrimaryBtn');
    if (primBtn) {
      primBtn.href = `/${randomTool.slug}/`;
      const span = primBtn.querySelector('span');
      if (span) span.textContent = randomTool.ctaText || 'Open Calculator';
    }

    const secBtn = document.getElementById('spotlightSecondaryBtn');
    if (secBtn) secBtn.href = `/${randomTool.slug}/`;
  } else {
    heroSlug = spotlightHero.getAttribute('data-slug') || '';
  }

  // Keep all tool cards visible in the grid below for user accessibility
  toolCards.forEach(card => {
    card.style.display = 'flex';
  });
}

// ==========================================================================
// 4c. Live Search & Category Filtering (Tools Hub)
// ==========================================================================

function initToolsSearchAndFilters() {
  const searchInput = document.getElementById('toolsSearchInput');
  const filterPills = document.querySelectorAll('#toolsFilterGroup .qa-filter-pill');
  const countBadge = document.getElementById('toolsCountBadge');
  const noResults = document.getElementById('toolsNoResults');
  const resetBtn = document.getElementById('toolsResetFiltersBtn');
  const cards = Array.from(document.querySelectorAll('.apple-calc-card'));

  if (!cards.length && !searchInput && !filterPills.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function matchesCategory(toolCat, targetCat) {
    if (targetCat === 'all') return true;
    if (!toolCat) return false;
    const tc = toolCat.toLowerCase();
    const tgt = targetCat.toLowerCase();
    if (tc === tgt) return true;
    if (tgt === 'car-insurance' && (tc.includes('car') || tc.includes('auto') || tc.includes('vehicle'))) return true;
    if (tgt === 'health-insurance' && (tc.includes('health') || tc.includes('medical') || tc.includes('pocket'))) return true;
    if (tgt === 'life-insurance' && (tc.includes('life') || tc.includes('term'))) return true;
    if (tgt === 'home-insurance' && (tc.includes('home') || tc.includes('property') || tc.includes('rebuild') || tc.includes('renter'))) return true;
    if (tgt === 'business-insurance' && (tc.includes('business') || tc.includes('disability') || tc.includes('commercial') || tc.includes('income'))) return true;
    if (tgt === 'insurance-basics' && (tc.includes('basic') || tc.includes('travel') || tc.includes('general') || tc.includes('actuarial') || tc.includes('deductible') || tc.includes('premium') || tc.includes('inflation') || tc.includes('quiz') || tc.includes('checklist') || tc.includes('gap'))) return true;
    return tc.includes(tgt);
  }

  function updateCategoryFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        const target = catParam.toLowerCase();
        let found = false;
        filterPills.forEach(p => {
          const pCat = (p.getAttribute('data-category') || '').toLowerCase();
          if (pCat === target) {
            filterPills.forEach(pill => pill.classList.remove('active'));
            p.classList.add('active');
            activeCategory = target;
            found = true;
          }
        });
        if (!found) activeCategory = 'all';
      } else {
        activeCategory = 'all';
        filterPills.forEach((p, idx) => {
          if (idx === 0) p.classList.add('active');
          else p.classList.remove('active');
        });
      }
    } catch (e) {}
  }

  updateCategoryFromUrl();

  window.addEventListener('popstate', () => {
    updateCategoryFromUrl();
    filterTools();
  });

  function filterTools() {
    let visibleCount = 0;
    const qLower = searchQuery.toLowerCase().trim();

    cards.forEach(card => {
      const cardCat = (card.getAttribute('data-category') || card.getAttribute('data-slug') || '').toLowerCase();
      const cardText = (card.textContent || '').toLowerCase();

      const matchesCat = matchesCategory(cardCat, activeCategory);
      const matchesQuery = !qLower || cardText.includes(qLower);

      if (matchesCat && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `${visibleCount} ${visibleCount === 1 ? 'Calculator' : 'Calculators'}`;
    }

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category') || 'all';

      try {
        const url = new URL(window.location);
        if (activeCategory === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', activeCategory);
        }
        window.history.pushState({}, '', url);
      } catch (err) {}

      filterTools();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterTools();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeCategory = 'all';
      filterPills.forEach((p, idx) => {
        if (idx === 0) p.classList.add('active');
        else p.classList.remove('active');
      });
      try {
        const url = new URL(window.location);
        url.searchParams.delete('category');
        window.history.pushState({}, '', url);
      } catch (err) {}
      filterTools();
    });
  }

  // Initial filter run
  filterTools();
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

// ==========================================================================
// 7. Insurance Q&A Hub Live Search & Smooth Category Filtering
// ==========================================================================

function initQASearchAndFilters() {
  const searchInput = document.getElementById('qaSearchInput');
  const filterPills = document.querySelectorAll('.qa-filter-pill');
  const cardsGrid = document.getElementById('qaCardsGrid');
  const cards = Array.from(document.querySelectorAll('.qa-card'));
  const spotlightBanner = document.getElementById('qaSpotlightCard');
  const noResults = document.getElementById('qaNoResults');
  const resetBtn = document.getElementById('qaResetFiltersBtn');

  if (!cards.length && !spotlightBanner) return;

  // 1. Shuffling: Shuffle QA cards on page load (Fisher-Yates)
  if (cardsGrid && cards.length > 1) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.forEach(card => cardsGrid.appendChild(card));
  }

  // 2. Dynamic Random Spotlight Question on every reload
  const qaItems = siteData?.qa || FALLBACK_INDEX?.qa || [];
  if (spotlightBanner && qaItems.length > 0) {
    const randomSpotlight = qaItems[Math.floor(Math.random() * qaItems.length)];
    if (randomSpotlight) {
      const spotTitleLink = spotlightBanner.querySelector('.qa-spotlight-title a');
      const spotAnswer = spotlightBanner.querySelector('.qa-spotlight-answer');
      const spotCatPill = spotlightBanner.querySelector('.pill-accent');
      const spotCta = spotlightBanner.querySelector('.btn-primary');
      const spotMeta = spotlightBanner.querySelector('span:last-child');

      if (spotTitleLink) {
        spotTitleLink.href = `/qa/${randomSpotlight.slug}`;
        spotTitleLink.textContent = randomSpotlight.question;
      }
      if (spotAnswer) {
        spotAnswer.textContent = randomSpotlight.shortAnswer;
      }
      if (spotCatPill) {
        spotCatPill.textContent = `${randomSpotlight.category} Insurance`;
      }
      if (spotCta) {
        spotCta.href = `/qa/${randomSpotlight.slug}`;
      }
      if (spotMeta && randomSpotlight.readingTime) {
        spotMeta.textContent = `${randomSpotlight.readingTime} • ${randomSpotlight.difficulty || 'Intermediate'}`;
      }
      spotlightBanner.setAttribute('data-category', (randomSpotlight.category || '').toLowerCase());
      spotlightBanner.setAttribute('data-slug', randomSpotlight.slug);
    }
  }

  let activeCategory = 'all';
  let searchQuery = '';

  function updateCategoryFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        const target = catParam.toLowerCase();
        let found = false;
        filterPills.forEach(p => {
          const pCat = (p.getAttribute('data-category') || '').toLowerCase();
          if (pCat === target) {
            filterPills.forEach(pill => pill.classList.remove('active'));
            p.classList.add('active');
            activeCategory = target;
            found = true;
          }
        });
        if (!found) activeCategory = 'all';
      } else {
        activeCategory = 'all';
        filterPills.forEach((p, idx) => {
          if (idx === 0) p.classList.add('active');
          else p.classList.remove('active');
        });
      }
    } catch (e) {}
  }

  // Initial category check from URL
  updateCategoryFromUrl();

  // Listen to popstate (browser back/forward)
  window.addEventListener('popstate', () => {
    updateCategoryFromUrl();
    filterCards();
  });

  function filterCards() {
    let visibleCount = 0;
    const qLower = searchQuery.toLowerCase().trim();

    cards.forEach(card => {
      const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
      const cardText = (card.textContent || '').toLowerCase();

      const matchesCat = activeCategory === 'all' || cardCat === activeCategory || cardCat.includes(activeCategory);
      const matchesQuery = !qLower || cardText.includes(qLower);

      if (matchesCat && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle spotlight banner visibility
    if (spotlightBanner) {
      const spotCat = (spotlightBanner.getAttribute('data-category') || spotlightBanner.querySelector('.pill-accent')?.textContent || '').toLowerCase();
      const spotText = (spotlightBanner.textContent || '').toLowerCase();
      const spotMatchesCat = activeCategory === 'all' || spotCat.includes(activeCategory);
      const spotMatchesQuery = !qLower || spotText.includes(qLower);

      if (spotMatchesCat && spotMatchesQuery) {
        spotlightBanner.style.display = 'block';
      } else {
        spotlightBanner.style.display = 'none';
      }
    }

    if (noResults) {
      noResults.style.display = (visibleCount === 0 && (!spotlightBanner || spotlightBanner.style.display === 'none')) ? 'block' : 'none';
    }
  }

  // Hook pill clicks with URL history pushState
  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = (pill.getAttribute('data-category') || 'all').toLowerCase();

      try {
        const url = new URL(window.location);
        if (activeCategory === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', activeCategory);
        }
        window.history.pushState({ category: activeCategory }, '', url);
      } catch (err) {}

      filterCards();
    });
  });

  // Hook search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterCards();
    });
  }

  // Hook reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeCategory = 'all';
      filterPills.forEach((p, idx) => {
        if (idx === 0) p.classList.add('active');
        else p.classList.remove('active');
      });
      try {
        const url = new URL(window.location);
        url.searchParams.delete('category');
        window.history.pushState({}, '', url);
      } catch (err) {}
      filterCards();
    });
  }

  // Initial filter run
  filterCards();
}

// ==========================================================================
// 7b. Side-by-Side Comparisons Hub Live Filtering, URL Sync & Shuffling
// ==========================================================================

function initCompareFilters() {
  const cardsGrid = document.getElementById('compareCardsGrid');
  const filterPills = document.querySelectorAll('#compareFilterGroup .qa-filter-pill');
  const cards = Array.from(document.querySelectorAll('#compareCardsGrid .apple-card'));
  const noResults = document.getElementById('compareNoResults');

  if (!cards.length) return;

  // 1. Shuffling: Shuffle compare cards on load
  if (cardsGrid && cards.length > 1) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.forEach(card => cardsGrid.appendChild(card));
  }

  let activeCategory = 'all';

  function updateCategoryFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        const target = catParam.toLowerCase();
        let found = false;
        filterPills.forEach(p => {
          const pCat = (p.getAttribute('data-category') || '').toLowerCase();
          if (pCat === target) {
            filterPills.forEach(pill => pill.classList.remove('active'));
            p.classList.add('active');
            activeCategory = target;
            found = true;
          }
        });
        if (!found) activeCategory = 'all';
      } else {
        activeCategory = 'all';
        filterPills.forEach((p, idx) => {
          if (idx === 0) p.classList.add('active');
          else p.classList.remove('active');
        });
      }
    } catch (e) {}
  }

  function filterCards() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
      const matchesCat = activeCategory === 'all' || cardCat === activeCategory || cardCat.includes(activeCategory);
      if (matchesCat) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  updateCategoryFromUrl();

  window.addEventListener('popstate', () => {
    updateCategoryFromUrl();
    filterCards();
  });

  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = (pill.getAttribute('data-category') || 'all').toLowerCase();

      try {
        const url = new URL(window.location);
        if (activeCategory === 'all') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', activeCategory);
        }
        window.history.pushState({ category: activeCategory }, '', url);
      } catch (err) {}

      filterCards();
    });
  });

  filterCards();
}

// ==========================================================================
// 7c. Scenarios Hub Market/Category Filtering, URL Sync & Shuffling
// ==========================================================================

function initScenariosFilters() {
  const cardsGrid = document.getElementById('scenariosCardsGrid');
  const filterPills = document.querySelectorAll('#scenariosFilterGroup .qa-filter-pill');
  const cards = Array.from(document.querySelectorAll('#scenariosCardsGrid .scenario-profile-card'));
  const noResults = document.getElementById('scenariosNoResults');

  if (!cards.length) return;

  // 1. Shuffling: Shuffle scenario cards on load
  if (cardsGrid && cards.length > 1) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.forEach(card => cardsGrid.appendChild(card));
  }

  let activeCategory = 'all';

  function updateCategoryFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('market');
      if (catParam) {
        const target = catParam.toLowerCase();
        let found = false;
        filterPills.forEach(p => {
          const pCat = (p.getAttribute('data-category') || '').toLowerCase();
          if (pCat === target) {
            filterPills.forEach(pill => pill.classList.remove('active'));
            p.classList.add('active');
            activeCategory = target;
            found = true;
          }
        });
        if (!found) activeCategory = 'all';
      } else {
        activeCategory = 'all';
        filterPills.forEach((p, idx) => {
          if (idx === 0) p.classList.add('active');
          else p.classList.remove('active');
        });
      }
    } catch (e) {}
  }

  function filterCards() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
      const matchesCat = activeCategory === 'all' || cardCat === activeCategory;
      if (matchesCat) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  updateCategoryFromUrl();

  window.addEventListener('popstate', () => {
    updateCategoryFromUrl();
    filterCards();
  });

  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = (pill.getAttribute('data-category') || 'all').toLowerCase();

      try {
        const url = new URL(window.location);
        if (activeCategory === 'all') {
          url.searchParams.delete('category');
          url.searchParams.delete('market');
        } else {
          url.searchParams.set('category', activeCategory);
        }
        window.history.pushState({ category: activeCategory }, '', url);
      } catch (err) {}

      filterCards();
    });
  });

  filterCards();
}

// ==========================================================================
// 8. Footer Rotating Insurance Q&A Widget (Changes on Every Refresh & Next Button)
// ==========================================================================

function initFooterRotatingQA() {
  const container = document.getElementById('footerQASpotlight');
  if (!container) return;

  const titleLink = document.getElementById('footerQATitleLink');
  const snippet = document.getElementById('footerQASnippet');
  const catBadge = document.getElementById('footerQACategory');
  const ctaLink = document.getElementById('footerQACtaLink');
  const readTime = document.getElementById('footerQAReadTime');
  const nextBtn = document.getElementById('footerQANextBtn');

  const qaItems = siteData?.qa || FALLBACK_INDEX?.qa || [];
  if (!qaItems || qaItems.length === 0) return;

  function updateQuestion() {
    const randomIndex = Math.floor(Math.random() * qaItems.length);
    const q = qaItems[randomIndex];
    if (!q) return;

    if (titleLink && q.question) {
      titleLink.href = `/qa/${q.slug}`;
      titleLink.textContent = q.question;
    }
    if (snippet && q.shortAnswer) {
      snippet.textContent = q.shortAnswer;
    }
    if (catBadge && q.category) {
      catBadge.textContent = `${q.category} Insurance`;
      const catSlug = q.category.toLowerCase();
      catBadge.className = `footer-qa-badge pill pill-cat-${catSlug}`;
    }
    if (ctaLink && q.slug) {
      ctaLink.href = `/qa/${q.slug}`;
    }
    if (readTime) {
      readTime.textContent = `${q.readingTime || '5 min read'} • Actuarially Verified`;
    }
  }

  // Initial random question selection
  updateQuestion();

  // Next / Shuffle button click listener
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextBtn.classList.add('rotating');
      updateQuestion();
      setTimeout(() => nextBtn.classList.remove('rotating'), 600);
    });
  }
}

// Bootstrapping
document.addEventListener('DOMContentLoaded', async () => {
  await initSiteData();
  MarketEngine.init();
  GamificationEngine.init();
  initCalculators();
  initSliderFills();
  initSearchModal();
  initHomeSearch();
  initArticleFilters();
  initToolsHeroSpotlight();
  initToolsSearchAndFilters();
  initPolicyAudit();
  initQASearchAndFilters();
  initCompareFilters();
  initScenariosFilters();
  initFooterRotatingQA();
  initMobileNav();
});