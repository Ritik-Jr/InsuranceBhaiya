const fs = require('fs');

// 1. learn/renters-insurance-whats-covered-and-whats-not/index.html
{
  const p = 'learn/renters-insurance-whats-covered-and-whats-not/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Under what does a standard policy include
  c = c.replace(
    'personal liability coverage, which pays if you, a family member, or a pet injures someone or damages their property, plus your legal defense costs if you\'re sued;',
    'personal liability coverage, which pays if you, a family member, or a pet injures someone or damages their property — including legal defense and medical costs if <a href="/qa/does-renters-insurance-cover-dog-bites/">your dog bites a guest</a> (provided the breed is eligible);'
  );

  // Under how much coverage do you actually need
  c = c.replace(
    'See <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">How Much Renters Insurance Coverage Do You Actually Need?</a> for a practical way to estimate this rather than picking a number arbitrarily.',
    'See <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">How Much Renters Insurance Coverage Do You Actually Need?</a> for an inventory formula. Also consider shared living situations: your individual policy does not extend to <a href="/qa/does-renters-insurance-cover-roommates-belongings/">your roommate\'s belongings</a> unless they are formally endorsed onto your policy declaration.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 1:', p);
}

// 2. compare/renters-insurance-vs-landlord-insurance/index.html
{
  const p = 'compare/renters-insurance-vs-landlord-insurance/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Option summaries
  c = c.replace(
    '<p class="compare-opt-summary">Core policy terms and coverage scope of Renters Insurance.</p>',
    '<p class="compare-opt-summary">Tenant-owned coverage protecting personal belongings, personal liability, and temporary living expenses when a covered loss damages your home.</p>'
  );

  c = c.replace(
    '<p class="compare-opt-summary">Core policy terms and coverage scope of Landlord (Property) Insurance.</p>',
    '<p class="compare-opt-summary">Property owner\'s policy covering the physical structure, permanent fixtures, loss of rental income, and premises liability for common building areas.</p>'
  );

  // Recommendation box
  c = c.replace(
    'A landlord\'s property insurance protects the building structure and the landlord\'s own financial interest in it — not your belongings and not your personal liability. Renters insurance is the only policy that protects your personal property, covers your liability if you injure someone or damage their property, and pays additional living expenses if your unit becomes unlivable, as covered throughout <a href="/learn/renters-insurance-whats-covered-and-whats-not/">Renters Insurance: What\'s Covered & What\'s Not</a>. This is one of the most common and costly misunderstandings among renters, since assuming the landlord\'s policy \'has you covered\' leaves a real, entirely uninsured gap. Estimate your own coverage needs with our <a href="/home-insurance-calculator/">Home Insurance Coverage Calculator</a>.',
    'A landlord\'s property insurance protects the building structure and the landlord\'s own financial interest in it — not your belongings and not your personal liability. Renters insurance is the only policy that protects your personal property from perils like <a href="/qa/does-renters-insurance-cover-water-damage-from-a-leak/">accidental pipe leaks</a> or theft, covers your liability if <a href="/qa/does-renters-insurance-cover-dog-bites/">your dog injures a visitor</a>, and pays temporary housing costs if the unit becomes unlivable, as detailed throughout <a href="/learn/renters-insurance-whats-covered-and-whats-not/">Renters Insurance: What\'s Covered & What\'s Not</a>. To ensure you aren\'t underinsured, see <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">how much renters insurance you need</a> and model property replacement with our <a href="/home-insurance-calculator/">Home Insurance Coverage Calculator</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 2:', p);
}

// 3. qa/does-renters-insurance-cover-bike-theft/index.html
{
  const p = 'qa/does-renters-insurance-cover-bike-theft/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Fix bad link to life insurance
  c = c.replace(
    'regardless of your total personal property <a href="/qa/how-much-life-insurance-do-i-need/" class="article-link" data-il="auto">coverage amount</a>,',
    'regardless of your total personal property <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">coverage limit</a>,'
  );

  // Section 1
  c = c.replace(
    'The same named perils apply regardless of where the loss occurs, so a theft at a bike rack away from home is treated essentially the same as one at home, just subject to the separate off-premises limit.',
    'The same named perils apply regardless of location under the personal property rules outlined in <a href="/learn/renters-insurance-whats-covered-and-whats-not/">renters insurance: what\'s covered and what\'s not</a>. Remember that a landlord\'s building coverage never replaces stolen tenant gear, as contrasted in <a href="/compare/renters-insurance-vs-landlord-insurance/">renters vs landlord insurance</a>.'
  );

  // Section 2
  c = c.replace(
    'For example, a $1,000 approved claim with a $500 deductible pays out $500.',
    'For example, a $1,000 approved claim with a $500 deductible pays out $500. Check whether filing a small claim is financially wise with our <a href="/deductible-calculator/">Deductible Breakeven Calculator</a>.'
  );

  // Section 3
  c = c.replace(
    'Without this endorsement, you\'d be responsible for the difference between your bike\'s actual value and whatever the policy\'s sub-limit and depreciation calculation actually pays out.',
    'Without this endorsement, you must absorb the difference between the depreciated <a href="/glossary/actual-cash-value/">actual cash value</a> and full <a href="/glossary/replacement-cost/">replacement cost</a> out of pocket.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 3:', p);
}

// 4. qa/does-renters-insurance-cover-water-damage-from-a-leak/index.html
{
  const p = 'qa/does-renters-insurance-cover-water-damage-from-a-leak/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'which is exactly the distinction covered more broadly in <a href="/compare/renters-insurance-vs-landlord-insurance/">Renters Insurance vs. Landlord Insurance: Who Covers What?</a>',
    'which is exactly the distinction covered in <a href="/compare/renters-insurance-vs-landlord-insurance/">Renters Insurance vs. Landlord Insurance</a> and our core guide to <a href="/learn/renters-insurance-whats-covered-and-whats-not/">renters insurance coverage</a>.'
  );

  // Section 2
  c = c.replace(
    'and gradual damage is excluded from nearly every standard policy, whether it\'s a renters policy or a homeowners policy.',
    'and gradual damage is excluded from standard policies. Unaddressed moisture also frequently triggers biological growth, leading directly to the coverage hurdles examined in <a href="/qa/does-renters-insurance-cover-mold/">does renters insurance cover mold</a>.'
  );

  // Section 3
  c = c.replace(
    'You may also have a separate path to recover costs from the responsible neighbor or the building\'s own insurance, but you don\'t need to wait for that process to resolve before filing your own claim.',
    'You may also recover costs from the neighbor\'s insurer, but keep in mind that roommate belongings require separate protection; see <a href="/qa/does-renters-insurance-cover-roommates-belongings/">roommates\' belongings coverage</a>. Also note that rising exterior floodwaters require separate government-backed policies, as detailed in <a href="/qa/does-renters-insurance-cover-flood-or-earthquake-damage/">flood and earthquake renters insurance</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 4:', p);
}

// 5. qa/does-renters-insurance-cover-dog-bites/index.html
{
  const p = 'qa/does-renters-insurance-cover-dog-bites/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'which is commonly at least $100,000 on a standard renters policy.',
    'which is commonly at least $100,000 on a standard renters policy. This liability coverage belongs to the tenant, entirely separate from the landlord\'s structural coverage; explore the distinction in <a href="/compare/renters-insurance-vs-landlord-insurance/">renters vs landlord insurance</a> and review core protections in <a href="/learn/renters-insurance-whats-covered-and-whats-not/">what renters insurance covers</a>.'
  );

  // Section 2
  c = c.replace(
    'Some insurers instead evaluate an individual dog\'s bite history rather than applying a blanket breed exclusion, which is worth asking about directly if your dog\'s breed commonly appears on exclusion lists.',
    'Some insurers evaluate an individual dog\'s bite history rather than applying blanket exclusions. To ensure your liability limits match household assets and pet exposure, see <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">how much renters insurance coverage do you need</a>.'
  );

  // Section 3
  c = c.replace(
    'This is a meaningful detail to confirm directly in your policy wording, since a bite that happens just outside your specific coverage\'s location scope can leave you without the protection you assumed you had.',
    'Confirming geographic scope is vital. Furthermore, if an incident involves a roommate\'s pet, your policy provides no legal defense for them unless they are formally co-insured; see <a href="/qa/does-renters-insurance-cover-roommates-belongings/">does renters insurance cover roommates</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 5:', p);
}

// 6. qa/does-renters-insurance-cover-mold/index.html
{
  const p = 'qa/does-renters-insurance-cover-mold/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'the same underlying \'sudden versus gradual\' distinction covered in <a href="/qa/does-renters-insurance-cover-water-damage-from-a-leak/">Does Renters Insurance Cover Water Damage From a Leak?</a>',
    'the same distinction analyzed in <a href="/qa/does-renters-insurance-cover-water-damage-from-a-leak/">Does Renters Insurance Cover Water Damage From a Leak?</a> and outlined in <a href="/learn/renters-insurance-whats-covered-and-whats-not/">renters insurance coverage basics</a>.'
  );

  // Section 2
  c = c.replace(
    'It\'s worth checking your specific policy\'s mold sub-limit rather than assuming your full personal property limit automatically applies.',
    'Checking your mold sub-limit against broader personal property limits is essential; evaluate proper limits in <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">how much renters insurance coverage do you need</a>.'
  );

  // Section 3
  c = c.replace(
    'Remediating mold from the building\'s own structure — walls, flooring, HVAC systems — is your landlord\'s responsibility under their own property insurance and applicable building and health codes, not something your renters policy addresses.',
    'Remediating structural mold is your landlord\'s legal responsibility under building codes and commercial property policies, illustrating the jurisdictional divide detailed in <a href="/compare/renters-insurance-vs-landlord-insurance/">renters vs landlord insurance</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 6:', p);
}

// 7. qa/does-renters-insurance-cover-flood-or-earthquake-damage/index.html
{
  const p = 'qa/does-renters-insurance-cover-flood-or-earthquake-damage/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Section 1
  c = c.replace(
    'This is why both perils were carved out as their own dedicated insurance markets (flood largely through the federally backed National Flood Insurance Program, earthquake through specific endorsements or standalone policies) rather than folded into a standard policy.',
    'Catastrophic hazards like earthquakes and storm surges are carved into specialized programs or state-sponsored residual markets, similar to the high-risk protections explored in <a href="/compare/fair-plan-vs-admitted-homeowners-california/">California FAIR Plan vs admitted carriers</a>. For structural vs personal property divisions, review <a href="/compare/renters-insurance-vs-landlord-insurance/">renters vs landlord insurance</a>.'
  );

  // Section 2
  c = c.replace(
    'No — this is a distinct and separate exclusion from the \'sudden versus gradual\' distinction covered in <a href="/qa/does-renters-insurance-cover-water-damage-from-a-leak/">Does Renters Insurance Cover Water Damage From a Leak?</a>',
    'No — this is completely distinct from the sudden plumbing failures covered in <a href="/qa/does-renters-insurance-cover-water-damage-from-a-leak/">Does Renters Insurance Cover Water Damage From a Leak?</a> and related aftermath in <a href="/qa/does-renters-insurance-cover-mold/">does renters insurance cover mold</a>.'
  );

  // Section 3
  c = c.replace(
    'Flood insurance for renters, covering personal belongings, is generally quite affordable relative to the coverage it provides, making it worth pricing out even if you\'re unsure whether you\'re in a formally designated flood zone.',
    'Tenant flood riders for personal property are generally affordable. To calculate your total replacement value before adding endorsements, see <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">how much renters insurance do you need</a> and run our <a href="/home-insurance-calculator/">Home Insurance Coverage Calculator</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 7:', p);
}

// 8. qa/does-renters-insurance-cover-roommates-belongings/index.html
{
  const p = 'qa/does-renters-insurance-cover-roommates-belongings/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Fix bad link to life insurance in key takeaways
  c = c.replace(
    'which also keeps each person\'s <a href="/qa/how-much-life-insurance-do-i-need/" class="article-link" data-il="auto">coverage amount</a>, deductible, and claims history independent.',
    'which also keeps each person\'s <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">coverage amount</a>, deductible, and claims history independent.'
  );

  // Fix bad link to life insurance in section 1
  c = c.replace(
    'An unrelated roommate is treated as a separate individual with their own, separate <a href="/qa/can-you-get-life-insurance-on-anyone/" class="article-link" data-il="auto">insurable interest</a> in their own belongings, which is why their property isn\'t automatically covered just because they share the lease and the physical space with a policyholder.',
    'An unrelated roommate is treated as an independent third party with a distinct insurable interest in their property, as covered in our guide to <a href="/learn/renters-insurance-whats-covered-and-whats-not/">what renters insurance covers and excludes</a>. Their possessions are never automatically insured simply because they share an address or lease.'
  );

  // Section 2
  c = c.replace(
    'In most cases, each roommate carrying their own individual renters policy is the simplest and most reliable solution — it\'s usually inexpensive, keeps everyone\'s coverage amount matched to what they actually own, and avoids any complication about whose claim history is affected if only one roommate files a claim.',
    'Each roommate securing an individual policy is the most effective approach. It keeps personal belongings accurately valued according to <a href="/qa/how-much-renters-insurance-coverage-do-you-need/">how much coverage each renter needs</a> and ensures clean separation from landlord policies as explained in <a href="/compare/renters-insurance-vs-landlord-insurance/">renters vs landlord insurance</a>.'
  );

  // Section 3
  c = c.replace(
    'If a guest is injured in the apartment, or an unnamed roommate\'s pet causes an injury or property damage, the named policyholder\'s own liability coverage may not extend to protect that roommate personally, since they aren\'t a <a href="/learn/named-insured-vs-additional-insured/" class="article-link" data-il="auto">named insured</a> on the policy.',
    'If an unnamed roommate\'s pet bites a visitor, your policy will not defend or indemnify that roommate. Learn about animal liability exposures in <a href="/qa/does-renters-insurance-cover-dog-bites/">does renters insurance cover dog bites</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 8:', p);
}

// 9. qa/how-much-renters-insurance-coverage-do-you-need/index.html
{
  const p = 'qa/how-much-renters-insurance-coverage-do-you-need/index.html';
  let c = fs.readFileSync(p, 'utf8');

  // Fix bad link to life insurance in key takeaways
  c = c.replace(
    'The right personal property <a href="/qa/how-much-life-insurance-do-i-need/" class="article-link" data-il="auto">coverage amount</a> is based on the actual replacement cost of everything you own,',
    'The right personal property coverage amount is based on the actual replacement cost of everything you own,'
  );

  // Section 1
  c = c.replace(
    'The most reliable method is a simple home inventory: walk through each room, photograph or video your belongings, and list higher-value items individually with their approximate <a href="/glossary/replacement-cost/" class="article-link" data-il="auto">replacement cost</a> — furniture, electronics, clothing, kitchenware, and anything else you\'d need to replace after a total loss.',
    'The most reliable method is a room-by-room home inventory, documenting replacement costs under the principles covered in <a href="/learn/renters-insurance-whats-covered-and-whats-not/">renters insurance: what\'s covered</a>. You can also estimate total property exposure with our <a href="/home-insurance-calculator/">Home Insurance Coverage Calculator</a>.'
  );

  // Section 2
  c = c.replace(
    'Whether you need more depends on your specific situation: meaningful personal assets you\'d want to protect from a large liability judgment, a higher-risk dog breed (see <a href="/qa/does-renters-insurance-cover-dog-bites/">Does Renters Insurance Cover Dog Bites?</a>), or frequently hosting guests are all reasons to consider a higher limit than the bare minimum.',
    'Whether you need higher limits depends on personal assets, frequent entertaining, and pets (see <a href="/qa/does-renters-insurance-cover-dog-bites/">Does Renters Insurance Cover Dog Bites?</a>). Remember that your personal liability protects you from tenant-caused damage that building insurance will pursue against you; see <a href="/compare/renters-insurance-vs-landlord-insurance/">renters vs landlord insurance</a>.'
  );

  // Section 3
  c = c.replace(
    'Because several common categories — bicycles, jewelry, certain electronics, collectibles — often carry their own specific sub-limits well below your overall personal property coverage amount, as covered in <a href="/qa/does-renters-insurance-cover-bike-theft/">Does Renters Insurance Cover Bike Theft?</a>',
    'Because categories like bicycles, jewelry, and high-end electronics have strict category caps, as detailed in <a href="/qa/does-renters-insurance-cover-bike-theft/">Does Renters Insurance Cover Bike Theft?</a> Furthermore, room-sharing arrangements require individual limits for each resident; see <a href="/qa/does-renters-insurance-cover-roommates-belongings/">roommates\' belongings coverage</a>.'
  );

  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated 9:', p);
}
