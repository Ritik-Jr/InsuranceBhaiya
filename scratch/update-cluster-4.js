const fs = require('fs');

// 1. learn/what-is-coordination-of-benefits/index.html
{
  const p = 'learn/what-is-coordination-of-benefits/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Non-health payers section
  c = c.replace(
    '<li><strong>Non-health payers:</strong> for injuries covered by something like auto accident insurance or workers\' compensation, that non-health payer is usually primary over your regular health plan.</li>',
    '<li><strong>Non-health payers:</strong> for injuries covered by something like auto accident insurance or <a href="/compare/workers-compensation-vs-individual-disability-insurance/">workers\' compensation</a>, that non-health payer is usually primary over your regular health plan. Similarly, travel protection policies often coordinate secondary to primary health coverage; see our breakdown of <a href="/compare/bank-included-vs-standalone-travel-insurance/">bank-included vs standalone travel insurance</a> and multi-coverage rules in <a href="/qa/can-you-have-multiple-disability-insurance-policies/">multiple disability insurance policies</a>.</li>'
  );

  // What COB is not
  c = c.replace(
    'COB is not a way to get paid twice, and it\'s not the same as <a href="/qa/can-i-have-multiple-life-insurance-policies/">multiple life insurance policies</a> paying independently',
    'COB is not a way to get paid twice, and it operates under different legal rules than non-indemnity coverage (see our full guide on <a href="/learn/can-you-have-multiple-insurance-policies-at-once/">having multiple insurance policies at once</a>). Unlike medical plans, <a href="/qa/can-i-have-multiple-life-insurance-policies/">multiple life insurance policies</a> pay independently'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 1:', p);
}

// 2. qa/can-you-have-two-health-insurances/index.html
{
  const p = 'qa/can-you-have-two-health-insurances/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'The primary plan processes your claim first, paying as if it were your only insurance. The secondary plan then picks up some or all of the remaining eligible amount, but never enough to push your total reimbursement above the actual bill. For example, if a visit costs $80 and your primary plan pays $50, your secondary plan might cover part or all of the remaining $30, provided it\'s a covered expense under that plan too.',
    'The primary plan processes your claim first, paying as if it were your only coverage under the rules explained in our <a href="/learn/what-is-coordination-of-benefits/">coordination of benefits guide</a>. The secondary plan then picks up some or all of the remaining eligible balance, ensuring total payment never exceeds the provider\'s approved charge. For a full comparison of how multiple policies function across auto, life, and disability, see our master guide to <a href="/learn/can-you-have-multiple-insurance-policies-at-once/">having multiple insurance policies at once</a>.'
  );

  // Section 2
  c = c.replace(
    'If parents are divorced or separated, a court order or custody arrangement often overrides the birthday rule.',
    'If parents are divorced or separated, a court order or custody decree often overrides the birthday rule. Both insurers must also be informed of existing coverage to ensure seamless coordination when filing claims involving <a href="/qa/does-health-insurance-cover-pre-existing-conditions/">pre-existing condition protections</a>.'
  );

  // Section 3
  c = c.replace(
    'If neither plan clearly wins on the standard rules, the plan that has covered you longer is typically treated as primary.',
    'If neither plan clearly wins on standard rules, the policy covering you the longest is typically primary. Additionally, if medical care arises from an out-of-state trip or auto crash, specialized coverage may take precedence; review how supplementary coverage coordinates in our <a href="/compare/bank-included-vs-standalone-travel-insurance/">bank-included vs standalone travel insurance comparison</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 2:', p);
}

// 3. qa/can-i-have-multiple-life-insurance-policies/index.html
{
  const p = 'qa/can-i-have-multiple-life-insurance-policies/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'A life insurance death benefit is a fixed sum promised in the contract, not reimbursement for a variable loss, so there\'s nothing to coordinate the way health plans coordinate medical bills. If your policies are in force and the claims are valid, each insurer pays its full stated amount, and total coverage across policies can add up.',
    'A life insurance death benefit is a fixed sum promised in the contract, not reimbursement for an indemnity loss. Unlike health plans governed by <a href="/learn/what-is-coordination-of-benefits/">coordination of benefits rules</a>, life insurance policies do not offset one another. As detailed in our overview of <a href="/learn/can-you-have-multiple-insurance-policies-at-once/">holding multiple insurance policies at once</a>, every in-force policy pays its full stated death benefit upon proof of claim.'
  );

  // Section 2
  c = c.replace(
    'Because a death benefit that\'s disproportionate to your income can create a financial incentive problem, insurers apply financial underwriting: they ask about existing coverage, check the MIB database, and cap the total amount they\'ll approve based on your income, age, and the stated purpose of the coverage (income replacement, a mortgage, business needs, and similar). If your total requested coverage exceeds their multiplier, they can reduce the offered amount, ask for financial justification, or decline the application.',
    'Because a death benefit disproportionate to income creates moral hazard, insurers apply strict financial limits. They verify existing coverage via the MIB database and evaluate your total requested insurance against age and earnings multipliers. Before applying for additional coverage, calculate your family\'s actual income replacement requirements using our <a href="/life-insurance-calculator/">Life Insurance Needs Calculator</a> and review carrier criteria in <a href="/learn/what-is-insurance-underwriting/">what is insurance underwriting</a>.'
  );

  // Section 3
  c = c.replace(
    'People often hold multiple policies deliberately: a <a href="/learn/term-insurance-guide/" class="article-link" data-il="auto">term policy</a> to replace income and a separate one to cover a mortgage, \'laddering\' term policies of different lengths to match a shrinking need over time, adding a policy after a major life event without replacing an older one, or keeping personal coverage separate from a business-related policy like <a href="/learn/business-life-insurance/">key person insurance</a>.',
    'People often layer policies deliberately: buying separate policies to match mortgage obligations and child-rearing horizons, laddering policies of varying term lengths (compare costs in our <a href="/compare/term-vs-whole-life/">term vs whole life guide</a>), or separating personal family protection from corporate coverage like <a href="/learn/business-life-insurance/">key person insurance</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 3:', p);
}

// 4. qa/can-you-have-two-auto-insurance-policies/index.html
{
  const p = 'qa/can-you-have-two-auto-insurance-policies/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'If you file the same claim with two insurers after an accident, each insurer will typically investigate other applicable coverage, and combined payments are limited to your actual, documented loss, not doubled. Knowingly attempting to collect twice for the same claim can be treated as insurance fraud, separate from the question of whether owning two policies is legal in the first place.',
    'If you file the same claim with two insurers after an accident, claims adjusters will cross-check vehicle identification numbers and limit payment to your actual documented repair costs under the <a href="/glossary/principle-of-indemnity/">principle of indemnity</a>. Attempting to collect double reimbursement for a single collision is prosecuted as insurance fraud. Learn how indemnity applies across all policy types in our guide on <a href="/learn/can-you-have-multiple-insurance-policies-at-once/">having multiple insurance policies at once</a>.'
  );

  // Section 2
  c = c.replace(
    'Most auto insurers ask about existing coverage on a vehicle during <a href="/learn/what-is-insurance-underwriting/" class="article-link" data-il="auto">underwriting</a> and will generally decline to add a policy if they learn the car is already insured elsewhere, partly to avoid exactly this kind of duplicate-claim risk.',
    'Most auto insurers ask about existing coverage during <a href="/learn/what-is-insurance-underwriting/" class="article-link" data-il="auto">underwriting</a> and decline to issue duplicate policies on a vehicle already insured elsewhere. If your goal is maximizing protection at the lowest net cost, use our <a href="/car-insurance-calculator/">Car Insurance Estimator</a> and explore multi-line discounts in <a href="/compare/home-auto-bundling-discount-savings/">home and auto bundling savings</a>.'
  );

  // Section 3
  c = c.replace(
    'Two auto policies make sense when they cover different vehicles, such as a personal car under a personal policy and a work vehicle under a separate business auto policy, or when two people sharing a household each maintain their own policy on their own car rather than combining coverage.',
    'Two auto policies make sense when insuring separate vehicles (such as a personal commuter car and a commercial service vehicle), or when comparing personal liability against credit card collision waivers — see our breakdown of <a href="/compare/primary-vs-secondary-car-rental-insurance/">primary vs secondary car rental insurance</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 4:', p);
}

// 5. qa/can-you-have-multiple-disability-insurance-policies/index.html
{
  const p = 'qa/can-you-have-multiple-disability-insurance-policies/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    '<a href="/compare/aca-marketplace-vs-employer-sponsored-health-insurance/" class="article-link" data-il="auto">Employer-sponsored</a> group long-term disability plans are inexpensive or free but usually cap benefits at a percentage of income with a hard dollar ceiling, commonly in the $5,000 to $15,000 per month range. For a high earner, that ceiling can replace a much smaller share of actual income than the plan\'s stated percentage suggests, which is the specific gap an individually underwritten policy is bought to close.',
    '<a href="/compare/aca-marketplace-vs-employer-sponsored-health-insurance/" class="article-link" data-il="auto">Employer-sponsored</a> group long-term disability plans are inexpensive or employer-paid, but usually cap monthly benefits between $5,000 and $15,000. For high earners, this ceiling leaves a substantial monthly shortfall. Calculate your household income gap with our <a href="/disability-insurance-calculator/">Disability Insurance Needs Calculator</a> and review stacking guidelines in <a href="/learn/can-you-have-multiple-insurance-policies-at-once/">can you have multiple insurance policies at once</a>.'
  );

  // Section 2
  c = c.replace(
    'Rather than allowing unlimited stacking, insurers coordinate so that your total disability income across all policies, group and individual combined, stays within an overall ceiling — commonly cited as roughly 60% to 70% of pre-disability income. Each insurer asks about your other coverage during underwriting specifically to manage this.',
    'Rather than allowing unlimited stacking, insurers coordinate so that total monthly disability payouts across all policies remain capped around 60% to 70% of pre-disability earnings, following coordination concepts similar to <a href="/learn/what-is-coordination-of-benefits/">what is coordination of benefits</a>. When workplace injuries occur, individual disability benefits may also offset against statutory compensation; see <a href="/compare/workers-compensation-vs-individual-disability-insurance/">workers\' compensation vs individual disability insurance</a>.'
  );

  // Section 3
  c = c.replace(
    'Stacking is more commonly discussed for long-term disability, but short-term disability policies can also be held from multiple sources depending on each policy\'s specific terms — the maximum combined benefit limit still generally applies, so check the terms of each specific contract rather than assuming unlimited short-term benefits are available.',
    'Stacking applies differently to short-term versus long-term coverage. Review elimination periods and duration terms in our detailed guide on <a href="/learn/long-term-vs-short-term-disability/">short-term vs long-term disability insurance</a> before layering supplementary coverage.'
  );

  // Fix wrong link in case study
  c = c.replace(
    '<a href="/qa/how-much-life-insurance-do-i-need/" class="card-keyword-link" style="font-size: 0.875rem; font-weight: 600;">\n                <span>How much life insurance do I need</span>',
    '<a href="/compare/workers-compensation-vs-individual-disability-insurance/" class="card-keyword-link" style="font-size: 0.875rem; font-weight: 600;">\n                <span>Workers\' comp vs individual disability insurance</span>'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 5:', p);
}
