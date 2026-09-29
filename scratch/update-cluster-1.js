const fs = require('fs');

const p = 'qa/how-to-file-a-no-fault-insurance-claim-in-new-york/index.html';
let c = fs.readFileSync(p, 'utf8');

// Section 1
c = c.replace(
  '<strong>Step 1: Get medical care and report the crash (day 0).</strong> Go to the ER or <a href="/qa/how-much-is-urgent-care-with-insurance/" class="article-link" data-il="auto">urgent care</a> and tell every provider it was a car accident. Call police to the scene.<br><br><strong>Step 2: Identify the right insurer.</strong>',
  '<strong>Step 1: Get medical care and report the crash (day 0).</strong> Go to the ER or <a href="/qa/how-much-is-urgent-care-with-insurance/" class="article-link" data-il="auto">urgent care</a> and tell every provider it was a car accident. Unlike traditional tort states where you pursue the other driver\'s policy (see <a href="/qa/is-texas-a-no-fault-state/">is Texas a no-fault state</a>), New York requires filing through your own vehicle\'s PIP first. Call police to the scene.<br><br><strong>Step 2: Identify the right insurer.</strong>'
);

// Section 2
c = c.replace(
  'Car repairs aren\'t part of a no-fault claim. They\'re handled by fault, through the at-fault driver\'s insurer or your own <a href="/compare/comprehensive-vs-collision/">collision coverage</a>. For how PIP works everywhere, see <a href="/glossary/personal-injury-protection/">personal injury protection</a>.',
  'Car repairs aren\'t part of a no-fault claim. They are resolved under traditional fault principles — identical to claim handling in <a href="/qa/is-georgia-a-no-fault-state/">Georgia</a> and <a href="/qa/is-colorado-a-no-fault-state/">Colorado</a> — through the at-fault driver\'s insurer or your own <a href="/compare/comprehensive-vs-collision/">collision coverage</a>. For how PIP works nationwide, see <a href="/glossary/personal-injury-protection/">personal injury protection</a>.'
);

// Section 3 callout
c = c.replace(
  'The no-fault claim and the injury lawsuit run side by side.',
  'The no-fault claim and the injury lawsuit run side by side, operating much like the fault-based claims evaluated in our <a href="/learn/no-fault-vs-at-fault-car-insurance-states/">no-fault vs at-fault car insurance states guide</a>.'
);

// Section 4: remove the clumped sentence at bottom of Section 4
c = c.replace(
  '<br><br>For the full picture of how New York compares with at-fault states like <a href="/qa/is-texas-a-no-fault-state/">Texas</a>, <a href="/qa/is-georgia-a-no-fault-state/">Georgia</a> and <a href="/qa/is-colorado-a-no-fault-state/">Colorado</a>, see our <a href="/learn/no-fault-vs-at-fault-car-insurance-states/">no-fault vs at-fault states hub</a>.',
  ''
);

fs.writeFileSync(p, c, 'utf8');
console.log('Updated Cluster 1:', p);
