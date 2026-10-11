#!/usr/bin/env node
/**
 * Places manual AdSense units on the site's main pages (home, section hubs, tools, policy pages)
 * at section boundaries only — never inside a card. Article pages are left to Auto ads.
 *
 *   node src/scripts/ads/place-ads.js        (also runs at the end of src/scripts/seo-optimize.js)
 *
 * Idempotent: every block it writes sits between <!-- ib-ad:start --> / <!-- ib-ad:end --> and is
 * replaced on each run, so changing a slot ID below and re-running updates every page.
 *
 * SLOT: create one responsive "Display ads" unit in AdSense (Ads > By ad unit) and paste its data-ad-slot ID.
 * While it is empty its blocks are written `hidden`. Live blocks take no space until AdSense fills them,
 * and collapse completely if it can't (see "Manual ad placements" in styles.css). No label, no placeholder.
 */
const fs = require('fs');
const path = require('path');

const CLIENT = 'ca-pub-5387266499802314';
const SLOT = '';

const ROOT = path.resolve(__dirname, '..', '..', '..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');

// responsive, but kept inside the layout column (no full-bleed takeover on mobile)
const unit = () => (SLOT
  ? `<ins class="adsbygoogle ib-ad-unit" style="display:block" data-ad-client="${CLIENT}" data-ad-slot="${SLOT}" data-ad-format="auto" data-full-width-responsive="false"></ins>`
  : '');

// variant: band (between full-width home sections) | inline (inside a container) | grid (full-width row in a card grid)
//          | reading (narrow text column)
function block(id, variant, indent) {
  const ins = unit();
  const inner = `<aside class="ib-ad ib-ad-${variant}" data-ad-placement="${id}" aria-label="Advertisement"${ins ? '' : ' hidden'}>
${indent}  <div class="ib-ad-frame">${ins}</div>
${indent}</aside>`;
  const body = variant === 'band' ? `<div class="container">\n${indent}  ${inner.replace(/\n/g, '\n  ')}\n${indent}</div>` : inner;
  return `${indent}<!-- ib-ad:start ${id} -->\n${indent}${body}\n${indent}<!-- ib-ad:end -->\n`;
}

const strip = h => h.replace(/[ \t]*<!-- ib-ad:start [\w-]+ -->[\s\S]*?<!-- ib-ad:end -->\r?\n/g, '');

// Insert before the first line matching `re` (re must match from the line's indentation onward).
function before(h, re, id, variant) {
  const m = h.match(new RegExp(`\\n([ \\t]*)(?:${re.source})`));
  if (!m) throw new Error(`anchor not found for ${id}: ${re}`);
  const at = m.index + 1;
  return h.slice(0, at) + block(id, variant, m[1]) + h.slice(at);
}
const beforeMainEnd = (h, id, variant = 'inline') => before(h, /<\/main>/, id, variant);

// card grids: a full-width row before the (n+1)th card, i.e. after the first n cards. app.js re-anchors it after
// the grid's shuffle and only then asks AdSense to fill it (a filled ad must never be moved).
function inGrid(h, gridRe, cardRe, n, id) {
  const g = h.search(gridRe);
  if (g < 0) throw new Error(`grid not found for ${id}: ${gridRe}`);
  const re = new RegExp(`\n([ \t]*)(?:${cardRe.source})`, 'g');
  re.lastIndex = g;
  let m;
  for (let i = 0; i <= n; i++) if (!(m = re.exec(h))) return h; // fewer than n+1 cards: no mid-grid ad
  const at = m.index + 1;
  return h.slice(0, at) + block(id, 'grid', m[1]) + h.slice(at);
}

// ---------------------------------------------------------------- placement plan
const PLAN = {
  // hero > categories > [ad] > calculators > comparisons > [ad] > Q&A > scenarios > [ad] > trust
  'index.html': h => [
    [/<!-- Featured Calculators & Tools -->/, 'home-after-categories'],
    [/<!-- Real-World Insurance Q&A Spotlight -->/, 'home-after-comparisons'],
    [/<!-- Trust Philosophy & Advocacy Charter -->/, 'home-after-scenarios'],
  ].reduce((acc, [re, id]) => before(acc, re, id, 'band'), h),
  // after the featured story, before the filters + paginated grid; and after the grid
  'learn/index.html': h => beforeMainEnd(before(h, /<!-- Category Filter Bar/, 'learn-top', 'inline'), 'learn-end'),
  // after the spotlight question, before the full question grid; and after it
  'qa/index.html': h => beforeMainEnd(before(h, /<!-- All Questions Grid -->/, 'qa-top', 'inline'), 'qa-end'),
  // long, fully visible grids: a row after the first 6 cards (never above the content); and after the grid
  'compare/index.html': h => beforeMainEnd(inGrid(h, /id="compareCardsGrid"/, /<div class="apple-card"/, 6, 'compare-grid'), 'compare-end'),
  'glossary/index.html': h => beforeMainEnd(inGrid(h, /<div class="grid-3">/, /<div class="apple-card/, 6, 'glossary-grid'), 'glossary-end'),
  // only 6 cards show before "Load More": one ad, after the grid
  'scenarios/index.html': h => beforeMainEnd(h, 'scenarios-end'),
  // title > category bento > [ad] > tools banner
  'insurance/index.html': h => before(h, /<!-- Quick Tools Cross-Link Banner -->/, 'insurance-after-categories', 'inline'),
  // hero + spec card > [ad] > search & calculator grid; and after the grid
  'tools/index.html': h => beforeMainEnd(before(h, /<!-- Live Search & Category Filtering Bar -->/, 'tools-top', 'inline'), 'tools-end'),
};
// insurance category hubs: after the 50/50 hero, before the guides grid
for (const d of fs.readdirSync(path.join(ROOT, 'insurance'), { withFileTypes: true })) {
  if (d.isDirectory() && fs.existsSync(path.join(ROOT, 'insurance', d.name, 'index.html'))) {
    PLAN[`insurance/${d.name}/index.html`] = h => beforeMainEnd(before(h, /<!-- Recommended Guides -->/, 'category-top', 'inline'), 'category-end');
  }
}
// calculators, checklists, quizzes: under the interactive tool, and after the FAQs
const DATA = JSON.parse(read('data.json'));
for (const slug of [...DATA.calculators.map(c => c.slug), 'policy-check']) {
  PLAN[`${slug}/index.html`] = h => {
    const mid = /<!-- Mathematical Assumptions/.test(h) ? /<!-- Mathematical Assumptions/ : /<!-- Policy Check FAQs -->/;
    return beforeMainEnd(before(h, mid, 'tool-after-calculator', 'inline'), 'tool-end');
  };
}
// trust, policy and contact pages: short (300-600 words), so one ad after the content
for (const slug of ['about', 'contact', 'sources', 'editorial-policy', 'how-we-make-money', 'disclaimer', 'cookie-policy', 'privacy-policy', 'terms-of-service']) {
  PLAN[`${slug}/index.html`] = h => beforeMainEnd(h, 'reading-end', 'reading');
}

// pages that no longer carry ads (too little content for AdSense): strip any old blocks
for (const rel of ['author/index.html']) PLAN[rel] = h => h;

// ---------------------------------------------------------------- run
let n = 0;
for (const [rel, place] of Object.entries(PLAN)) {
  const f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) { console.warn(`ads: skipped missing ${rel}`); continue; }
  const orig = fs.readFileSync(f, 'utf8');
  const eol = orig.includes('\r\n') ? '\r\n' : '\n';
  const next = place(strip(orig.replace(/\r\n/g, '\n'))).replace(/\n/g, eol);
  if (next !== orig) { fs.writeFileSync(f, next); n++; }
}
const live = SLOT ? 'live' : 'hidden until SLOT is set';
console.log(`ads: ${Object.keys(PLAN).length} pages planned, ${n} updated (${live})`);
