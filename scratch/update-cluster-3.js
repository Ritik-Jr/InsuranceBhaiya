const fs = require('fs');

// 1. compare/workers-compensation-vs-individual-disability-insurance/index.html
{
  const p = 'compare/workers-compensation-vs-individual-disability-insurance/index.html';
  let c = fs.readFileSync(p, 'utf8');

  c = c.replace(
    '<p class="compare-opt-summary">Core policy terms and coverage scope of Workers\' Compensation.</p>',
    '<p class="compare-opt-summary">Employer-funded statutory coverage protecting you exclusively against occupational injuries and illnesses, replacing roughly two-thirds of wages without proving employer fault.</p>'
  );

  c = c.replace(
    '<p class="compare-opt-summary">Core policy terms and coverage scope of Individual Disability Insurance.</p>',
    '<p class="compare-opt-summary">Privately purchased income protection covering illness, off-the-clock accidents, and non-occupational conditions anywhere, whether your employer provides benefits or not.</p>'
  );

  c = c.replace(
    'Anyone who is <a href="/qa/hurt-at-work-employer-exempt-from-workers-compensation/">exempt from workers\' compensation</a>, whether as a sole proprietor, an exempt corporate officer, or a commission-only agent, has a particularly clear reason to treat individual disability insurance as a genuine necessity rather than an optional extra.',
    'Anyone who is <a href="/qa/hurt-at-work-employer-exempt-from-workers-compensation/">exempt from workers\' compensation</a> — whether as a <a href="/qa/are-sole-proprietors-required-to-have-workers-compensation-insurance/">sole proprietor</a>, a company under the statutory <a href="/qa/how-many-employees-before-you-need-workers-compensation-insurance/">employee headcount threshold</a>, or a <a href="/qa/are-life-insurance-agents-exempt-from-workers-compensation/">commission-based life insurance agent</a> — has a particularly clear reason to treat individual disability insurance as a genuine necessity rather than an optional extra.'
  );

  c = c.replace(
    'check your specific policy\'s offset language before assuming both pay in full simultaneously.',
    'check your specific policy\'s offset language before assuming both pay in full simultaneously. For details on how multiple policies coordinate benefits without duplicating payouts, see our guide to <a href="/learn/what-is-coordination-of-benefits/">coordination of benefits rules</a> and whether you can hold <a href="/qa/can-you-have-multiple-disability-insurance-policies/">multiple disability insurance policies</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 1:', p);
}

// 2. scenarios/carlos-texas-non-subscriber-workers-comp/index.html
{
  const p = 'scenarios/carlos-texas-non-subscriber-workers-comp/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Exposure 01
  c = c.replace(
    'Losing the exclusive remedy protection means a single serious workplace injury can turn into a negligence lawsuit with no statutory cap on damages, unlike a workers\' comp claim with defined benefit schedules.',
    'Losing the exclusive remedy protection means a single serious workplace injury can turn into a negligence lawsuit with no statutory cap on damages (see what happens when an employee is <a href="/qa/hurt-at-work-employer-exempt-from-workers-compensation/">hurt at work with an exempt employer</a>), unlike a workers\' comp claim with defined benefit schedules.'
  );

  // Exposure 03
  c = c.replace(
    'Non-subscriber status must be disclosed to employees and, in many cases, to the state, and getting the notice and paperwork wrong can create its own compliance problems independent of the underlying insurance decision.',
    'With 14 employees, Marcus is well above the <a href="/qa/how-many-employees-before-you-need-workers-compensation-insurance/">employee headcount threshold requiring workers\' comp</a> in 49 other states. Non-subscriber status must be disclosed in writing to employees and filed with the state, creating substantial compliance exposure if notice procedures fail.'
  );

  // Strategy Step 02
  c = c.replace(
    'If seriously considering non-subscriber status, pair it with a robust occupational accident <a href="/learn/what-is-an-insurance-policy/" class="article-link" data-il="auto">insurance policy</a> and an employer\'s liability (stop-gap) policy to rebuild some of the protection that dropping workers\' comp removes.',
    'If seriously considering non-subscriber status, pair it with a robust occupational accident <a href="/learn/what-is-an-insurance-policy/" class="article-link" data-il="auto">insurance policy</a> and an employer\'s liability (stop-gap) policy to rebuild protection — reviewing core trade-offs in our <a href="/compare/workers-compensation-vs-individual-disability-insurance/">workers\' comp vs. individual disability comparison</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 2:', p);
}

// 3. qa/are-sole-proprietors-required-to-have-workers-compensation-insurance/index.html
{
  const p = 'qa/are-sole-proprietors-required-to-have-workers-compensation-insurance/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'Because a sole proprietor and their business are legally the same person, there\'s no employer-employee relationship to insure in the first place, which is why the owner is typically exempt by default rather than needing to apply for an exception.',
    'Because a sole proprietor and their business are legally the same person, there\'s no employer-employee relationship to insure in the first place, which is why the owner is typically exempt by default under standard <a href="/learn/workers-compensation-insurance-exemptions/">workers\' compensation exemption rules</a> rather than needing to apply for an exception.'
  );

  // Section 2
  c = c.replace(
    'In most states, bringing on even one employee - even part-time, even a family member in many cases - creates a requirement to carry workers\' compensation for that employee, on the same threshold and timeline any other small employer would face. The owner can typically remain personally exempt while still being required to insure their staff, which is a distinction that catches some new employers off guard.',
    'In most states, bringing on even one employee - even part-time or a family member - creates a mandatory requirement to carry coverage. Check our state-by-state breakdown of <a href="/qa/how-many-employees-before-you-need-workers-compensation-insurance/">how many employees trigger workers\' comp</a>. Attempting to classify staff as 1099 contractors can also trigger steep penalties; see <a href="/qa/are-independent-contractors-exempt-from-workers-compensation/">are independent contractors exempt from workers\' comp</a>.'
  );

  // Section 4
  c = c.replace(
    'First, personal financial protection: without workers\' comp, a sole proprietor injured on the job has no guaranteed medical or wage-replacement benefit, so some choose to buy a small policy covering themselves, often called a ghost policy. Second, and just as commonly, a general contractor, property manager or larger client requires a certificate of workers\' compensation insurance before signing a contract, regardless of whether the sole proprietor is legally required to carry it - a practical business requirement that has nothing to do with the underlying statute.',
    'First, personal financial protection: without statutory comp, an injured sole proprietor has no guaranteed medical or wage-replacement benefit, leaving their income vulnerable unless protected by <a href="/compare/workers-compensation-vs-individual-disability-insurance/">individual disability insurance</a> or a voluntary policy. Second, general contractors and commercial clients routinely require certificates of insurance before signing contracts — a commercial requirement detailed in our guide to <a href="/learn/quotes-for-commercial-insurance/">quotes for commercial insurance</a>.'
  );

  // Action plan step 4
  c = c.replace(
    'If you remain exempt, price individual <a href="/insurance/disability-insurance/" class="article-link" data-il="auto">disability insurance</a> to cover the income-replacement gap workers\' comp would otherwise fill.',
    'If you remain exempt, calculate your monthly income shortfall with our <a href="/disability-insurance-calculator/">Disability Insurance Needs Calculator</a> and price individual <a href="/insurance/disability-insurance/" class="article-link" data-il="auto">disability insurance</a> to protect your livelihood.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 3:', p);
}

// 4. qa/how-many-employees-before-you-need-workers-compensation-insurance/index.html
{
  const p = 'qa/how-many-employees-before-you-need-workers-compensation-insurance/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'There is no federal minimum that overrides state law here, which is why checking your specific state\'s rule is the only reliable approach.',
    'There is no federal minimum that overrides state law here. Texas remains the single state where employers can opt out regardless of size, as examined in <a href="/scenarios/carlos-texas-non-subscriber-workers-comp/">Carlos\'s Texas non-subscriber case study</a>. For an overview of statutory cutoffs, see our <a href="/learn/workers-compensation-insurance-exemptions/">workers\' compensation exemptions guide</a>.'
  );

  // Section 2
  c = c.replace(
    'requiring coverage for every licensed contractor or construction business regardless of how many people they employ - sometimes applying the requirement even to a one-person operation.',
    'requiring coverage for every licensed contractor or construction business regardless of headcount — applying the mandate even to a one-person operation or a <a href="/qa/are-sole-proprietors-required-to-have-workers-compensation-insurance/">sole proprietor</a> working as a subcontractor.'
  );

  // Section 3
  c = c.replace(
    'A business that appears to be just under the limit by counting only full-time staff can sometimes find itself over the line once part-time or seasonal workers are correctly included under its state\'s specific counting rule.',
    'A business that appears to be just under the limit by counting only full-time staff can easily cross the line once part-time or seasonal workers are included. Similarly, helpers treated as 1099 contractors can be reclassified under state audits; verify the rules in <a href="/qa/are-independent-contractors-exempt-from-workers-compensation/">are independent contractors exempt from workers\' comp</a>.'
  );

  // Section 4
  c = c.replace(
    'exposing itself to penalties and, if an injury occurs during that window, potentially the full cost of an uninsured claim.',
    'exposing itself to severe penalties and personal liability for an uncovered claim. Explore the legal and medical risks in <a href="/qa/hurt-at-work-employer-exempt-from-workers-compensation/">hurt at work when an employer is exempt</a> and compare protection structures in <a href="/compare/workers-compensation-vs-individual-disability-insurance/">workers\' comp vs disability insurance</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 4:', p);
}

// 5. qa/are-independent-contractors-exempt-from-workers-compensation/index.html
{
  const p = 'qa/are-independent-contractors-exempt-from-workers-compensation/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'This is different from, say, a tax classification dispute, because a workers\' comp claim usually surfaces the question only after an injury has already happened, at which point the financial stakes for both sides are immediate.',
    'This is different from a routine tax dispute, because a workers\' comp inquiry typically surfaces after an injury occurs, when liability is immediate. For how statutory exclusions operate across industries, read our <a href="/learn/workers-compensation-insurance-exemptions/">workers\' compensation exemptions guide</a>.'
  );

  // Section 2
  c = c.replace(
    'No single factor is usually decisive on its own; state boards weigh the whole pattern of the relationship.',
    'No single factor is decisive on its own; state boards evaluate total behavioral control. If reclassified, these workers immediately count toward the thresholds detailed in <a href="/qa/how-many-employees-before-you-need-workers-compensation-insurance/">how many employees trigger mandatory workers\' comp</a>.'
  );

  // Section 3
  c = c.replace(
    'This is precisely the scenario a written contract is meant to prevent, and precisely the scenario where a poorly structured contractor relationship fails to hold up.',
    'This is precisely where an informal contract fails. For workers left without statutory coverage during disputes, see <a href="/qa/hurt-at-work-employer-exempt-from-workers-compensation/">what happens if you are hurt at work without coverage</a>, alongside the liability dynamics explored in <a href="/scenarios/carlos-texas-non-subscriber-workers-comp/">Carlos\'s non-subscriber scenario</a>.'
  );

  // Section 4
  c = c.replace(
    'These statutory exemptions are a meaningfully stronger legal position than a general independent contractor claim, precisely because they don\'t hinge on the same fact-specific control analysis that trips up so many ordinary contractor arrangements.',
    'These statutory exemptions provide a stronger legal footing than a general 1099 label. Several states explicitly extend this carve-out to commission-based agents; see <a href="/qa/are-life-insurance-agents-exempt-from-workers-compensation/">are life insurance agents exempt from workers\' comp</a>. For those without statutory benefits, explore private safety nets in <a href="/compare/workers-compensation-vs-individual-disability-insurance/">workers\' comp vs disability insurance</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 5:', p);
}

// 6. qa/hurt-at-work-employer-exempt-from-workers-compensation/index.html
{
  const p = 'qa/hurt-at-work-employer-exempt-from-workers-compensation/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'Checking your specific plan\'s language before assuming health insurance is a reliable backstop is worth doing well before an injury happens.',
    'Reviewing your health plan is essential before an accident occurs. To see what standard medical plans include and exclude, see <a href="/learn/what-does-health-insurance-actually-cover/">what health insurance actually covers</a> and how dual policies split claims under <a href="/learn/what-is-coordination-of-benefits/">coordination of benefits</a>.'
  );

  // Section 2
  c = c.replace(
    'An exempt worker who can\'t work has no statutory wage-replacement benefit waiting for them - their income is protected only to the extent they\'ve personally arranged it, typically through an individual disability insurance policy or, in some employment arrangements, an occupational accident policy the business voluntarily carries even though it isn\'t required to.',
    'An exempt worker has no statutory wage-replacement benefit waiting for them. We analyze how private income policies replace this statutory safety net in <a href="/compare/workers-compensation-vs-individual-disability-insurance/">workers\' compensation vs individual disability insurance</a>, and outline which roles qualify as exempt in our <a href="/learn/workers-compensation-insurance-exemptions/">workers\' comp exemptions guide</a>.'
  );

  // Section 3
  c = c.replace(
    'shifts the entire process from a predictable benefit schedule to a fault-based legal claim, with all the time, cost and uncertainty that involves for both sides.',
    'shifts the entire process to a fault-based negligence lawsuit without statutory shields — the exact legal exposure modeled in <a href="/scenarios/carlos-texas-non-subscriber-workers-comp/">Carlos\'s Texas non-subscriber case study</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 6:', p);
}

// 7. qa/are-life-insurance-agents-exempt-from-workers-compensation/index.html
{
  const p = 'qa/are-life-insurance-agents-exempt-from-workers-compensation/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'The result is that a life insurance agent\'s status depends on state law, not on the federal statutory nonemployee rule most people have heard of in the real estate context.',
    'The result is that an agent selling <a href="/learn/what-is-life-insurance/">life insurance</a> depends on state statutes rather than federal IRS rules. Review where this fits among small business categories in our <a href="/learn/workers-compensation-insurance-exemptions/">workers\' compensation exemptions guide</a>.'
  );

  // Section 2
  c = c.replace(
    'An agency that pays a mix of salary and commission, or that never formalized a written independent-agent contract, is on much weaker ground claiming the exemption applies, regardless of what the agent\'s day-to-day work looks like.',
    'An agency that pays a salary blend or lacks written contracts risks losing exempt status. Furthermore, hiring salaried office staff immediately triggers the rules outlined in <a href="/qa/how-many-employees-before-you-need-workers-compensation-insurance/">how many employees trigger workers\' comp</a>.'
  );

  // Section 4
  c = c.replace(
    'That income-replacement gap is precisely what an individual disability insurance policy is designed to cover, independent of how the agent is classified for workers\' comp purposes.',
    'That income-replacement gap is precisely what an individual policy protects. Compare coverage scope in <a href="/compare/workers-compensation-vs-individual-disability-insurance/">workers\' comp vs individual disability insurance</a> and simulate your replacement need with our <a href="/disability-insurance-calculator/">Disability Insurance Needs Calculator</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 7:', p);
}
