const fs = require('fs');
const path = require('path');

const qaDirs = fs.readdirSync('qa')
  .filter(f => fs.statSync(path.join('qa', f)).isDirectory());

console.log('Total QA directories:', qaDirs.length);

let noQAPage = [];
let noBreadcrumbs = [];
let schemaList = [];

qaDirs.forEach(dir => {
  const f = path.join('qa', dir, 'index.html');
  if (!fs.existsSync(f)) {
    console.log('Missing index.html in qa/' + dir);
    return;
  }
  const c = fs.readFileSync(f, 'utf8');
  const hasQAPage = c.includes('"@type": "QAPage"') || c.includes('"@type":"QAPage"');
  const hasBreadcrumbs = c.includes('"@type": "BreadcrumbList"') || c.includes('"@type":"BreadcrumbList"');
  
  if (!hasQAPage) noQAPage.push(f);
  if (!hasBreadcrumbs) noBreadcrumbs.push(f);

  // Extract JSON-LD scripts
  const scripts = [...c.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  scripts.forEach(s => {
    try {
      const data = JSON.parse(s[1]);
      const type = data['@type'];
      if (!schemaList.includes(type)) schemaList.push(type);
    } catch (e) {
      console.log('JSON parse error in', f, e.message);
    }
  });
});

console.log('Schema types found in QA pages:', schemaList);
console.log('Pages without QAPage:', noQAPage.length);
if (noQAPage.length) console.log(noQAPage);
console.log('Pages without BreadcrumbList:', noBreadcrumbs.length);
if (noBreadcrumbs.length) console.log(noBreadcrumbs);
