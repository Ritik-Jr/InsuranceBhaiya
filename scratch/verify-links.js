const fs = require('fs');
const path = require('path');

const files = [
  'compare/workers-compensation-vs-individual-disability-insurance/index.html',
  'learn/workers-compensation-insurance-exemptions/index.html',
  'scenarios/carlos-texas-non-subscriber-workers-comp/index.html',
  'qa/are-independent-contractors-exempt-from-workers-compensation/index.html',
  'qa/are-sole-proprietors-required-to-have-workers-compensation-insurance/index.html',
  'qa/how-many-employees-before-you-need-workers-compensation-insurance/index.html',
  'qa/are-life-insurance-agents-exempt-from-workers-compensation/index.html',
  'qa/hurt-at-work-employer-exempt-from-workers-compensation/index.html',
  'learn/can-you-have-multiple-insurance-policies-at-once/index.html',
  'learn/what-is-coordination-of-benefits/index.html',
  'qa/can-you-have-two-health-insurances/index.html',
  'qa/can-i-have-multiple-life-insurance-policies/index.html',
  'qa/can-you-have-two-auto-insurance-policies/index.html',
  'qa/can-you-have-multiple-disability-insurance-policies/index.html',
  'learn/renters-insurance-whats-covered-and-whats-not/index.html',
  'compare/renters-insurance-vs-landlord-insurance/index.html',
  'qa/does-renters-insurance-cover-bike-theft/index.html',
  'qa/does-renters-insurance-cover-water-damage-from-a-leak/index.html',
  'qa/does-renters-insurance-cover-dog-bites/index.html',
  'qa/does-renters-insurance-cover-mold/index.html',
  'qa/does-renters-insurance-cover-flood-or-earthquake-damage/index.html',
  'qa/does-renters-insurance-cover-roommates-belongings/index.html',
  'qa/how-much-renters-insurance-coverage-do-you-need/index.html',
  'qa/how-to-file-a-no-fault-insurance-claim-in-new-york/index.html'
];

let broken = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const aRegex = /href=["'](\/[^"'#?]+)["']/g;
  let match;
  while ((match = aRegex.exec(content)) !== null) {
    let url = match[1];
    if (url === '/') continue;
    let localPath = path.join('.', url);
    let exists = false;
    if (fs.existsSync(localPath)) {
      if (fs.statSync(localPath).isDirectory()) {
        exists = fs.existsSync(path.join(localPath, 'index.html'));
      } else {
        exists = true;
      }
    } else if (fs.existsSync(localPath + '.html')) {
      exists = true;
    } else if (fs.existsSync(localPath + '/index.html')) {
      exists = true;
    }
    if (!exists) {
      broken.push({ file: f, url });
    }
  }
});

console.log('Broken internal links count:', broken.length);
if (broken.length > 0) {
  console.log(broken);
}
