#!/usr/bin/env node
/**
 * Generates a unique flat-vector illustration thumbnail for every /learn/ article.
 *
 *   npm i --no-save sharp           # one-time, rasterizer for the social/JSON-LD JPG
 *   node src/scripts/thumbnails/generate.js            # all articles in PAGES
 *   node src/scripts/thumbnails/generate.js some-slug  # one article
 *
 * Output per article:  images/learn/<slug>.svg  (on-page, crisp at any size)
 *                      images/learn/<slug>.jpg  (1200x675 for og:image, Twitter, Article schema)
 * New article? Add a line to PAGES below: [slug, theme, hero, secondary|null, [accent, accent], heroOpts?]
 * or, for a character-scene illustration (people + props), add a scene to scenes.js.
 */
const fs = require('fs');
const path = require('path');
const { PALETTES, M, I, INK, W } = require('./art');
const { SCENES } = require('./scenes');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const OUT = path.join(ROOT, 'images', 'learn');

// slug, theme(palette), hero motif, secondary card motif, accent icons, hero options
const PAGES = [
  // aviation
  ['aircraft-insurance-claims-what-to-expect', 'aviation', 'plane', 'clipboard', ['alert', 'doc']],
  ['aircraft-hangar-insurance', 'aviation', 'hangar', 'storm', ['shield', 'lock']],
  ['light-sport-aircraft-insurance', 'aviation', 'plane', null, ['coin', 'check']],
  ['helicopter-insurance', 'aviation', 'helicopter', null, ['shield', 'coin']],
  ['drone-insurance', 'aviation', 'drone', 'map', ['pin', 'shield']],
  ['seaplane-insurance', 'marine', 'plane', null, ['wave', 'shield'], { floats: true }],
  ['experimental-aircraft-insurance', 'aviation', 'plane', 'lightbulb', ['wrench', 'alert']],
  ['airplane-insurance-cost', 'aviation', 'plane', 'coins', ['calc', 'chart']],
  ['aircraft-aviation-insurance-explained', 'aviation', 'plane', 'document', ['shield', 'search']],
  // marine
  ['yacht-insurance', 'marine', 'yacht', null, ['shield', 'star']],
  ['pontoon-boat-insurance', 'marine', 'pontoon', null, ['coin', 'check']],
  ['boat-insurance-proof-of-coverage', 'marine', 'boat', 'idcard', ['check', 'doc']],
  ['boat-insurance-claims-what-to-expect', 'marine', 'boat', 'clipboard', ['alert', 'clock']],
  ['boat-insurance-and-hurricane-season', 'marine', 'boat', 'storm', ['cloud', 'calendar']],
  ['personal-watercraft-jet-ski-insurance', 'marine', 'jetski', null, ['shield', 'wave']],
  ['boat-dealers-insurance', 'marine', 'boat', 'store', ['key', 'shield']],
  ['houseboat-insurance', 'marine', 'houseboat', null, ['home', 'wave']],
  ['classic-boat-insurance', 'legal', 'sailboat', null, ['star', 'shield']],
  ['commercial-boat-insurance', 'marine', 'boat', 'briefcase', ['handshake', 'doc']],
  ['average-cost-of-boat-insurance', 'marine', 'boat', 'coins', ['calc', 'chart']],
  ['boat-insurance-by-state-requirements-costs', 'marine', 'boat', 'map', ['pin', 'doc']],
  ['marina-insurance', 'marine', 'dock', null, ['shield', 'wave']],
  ['boat-rental-insurance', 'marine', 'sailboat', 'key', ['calendar', 'shield']],
  // auto & powersports
  ['full-time-rv-insurance', 'auto', 'rv', 'house', ['pin', 'shield']],
  ['california-low-cost-auto-insurance-program', 'auto', 'car', 'piggy', ['percent', 'coin']],
  ['florida-mature-driver-insurance-discount', 'travel', 'car', null, ['percent', 'check']],
  ['florida-pip-insurance-explained', 'health', 'car', 'hospital', ['plus', 'doc']],
  ['california-rv-insurance', 'travel', 'rv', 'map', ['pin', 'coin']],
  ['california-evidence-of-liability-insurance', 'auto', 'car', 'idcard', ['check', 'doc']],
  ['florida-compliant-drivers-program', 'home', 'car', 'clipboard', ['check', 'pin']],
  ['state-auto-insurance-compliance-guide', 'auto', 'car', 'map', ['doc', 'check']],
  ['new-york-no-fault-insurance', 'basics', 'car', 'document', ['plus', 'pin']],
  ['no-fault-vs-at-fault-car-insurance-states', 'legal', 'car', 'scales', ['pin', 'alert']],
  ['gap-insurance-worth-it-and-cost', 'auto', 'car', 'wallet', ['down', 'coin']],
  ['average-cost-of-motorcycle-insurance', 'auto', 'motorcycle', 'coins', ['calc', 'chart']],
  ['quad-bike-atv-insurance', 'construction', 'atv', null, ['shield', 'pin']],
  ['dirt-bike-insurance-coverage', 'travel', 'motorcycle', null, ['shield', 'wrench'], { dirt: true }],
  ['motorcycle-dirt-bike-powersport-insurance', 'auto', 'motorcycle', 'atv', ['shield', 'check']],
  ['car-insurance-basics-registration-cost-claims', 'basics', 'car', 'idcard', ['coin', 'doc']],
  ['insuring-a-car-thats-not-in-your-name', 'business', 'car', 'key', ['handshake', 'doc']],
  ['car-insurance-guide', 'auto', 'car', 'shield', ['coin', 'check']],
  // home & property
  ['california-private-mortgage-insurance', 'home', 'house', 'calculator', ['percent', 'coin']],
  ['homeowners-and-property-insurance-essentials', 'home', 'house', 'shield', ['cloud', 'check']],
  ['home-insurance-fundamentals', 'home', 'house', 'umbrella', ['coin', 'shield']],
  ['bicycle-insurance', 'home', 'bicycle', null, ['lock', 'shield']],
  ['commercial-property-insurance-guide', 'business', 'building', 'storm', ['shield', 'flame']],
  ['inland-marine-insurance-explained', 'marine', 'truck', null, ['wrench', 'shield']],
  ['renters-insurance-whats-covered-and-whats-not', 'home', 'building', 'clipboard', ['check', 'alert']],
  // disability & workers comp
  ['workers-compensation-insurance-exemptions', 'construction', 'construction', 'paycheck', ['hardhat', 'doc']],
  ['long-term-vs-short-term-disability', 'disability', 'paycheck', 'calendar', ['clock', 'shield']],
  ['own-occupation-disability-insurance', 'disability', 'briefcase', 'paycheck', ['shield', 'check']],
  // business
  ['bike-shop-insurance', 'business', 'store', 'bicycle', ['wrench', 'shield']],
  ['commercial-general-liability-guide', 'business', 'building', 'scales', ['shield', 'alert']],
  ['bop-business-owners-policy-explained', 'business', 'store', 'policies', ['shield', 'check']],
  ['one-day-event-insurance-guide', 'business', 'tent', 'calendar', ['check', 'shield']],
  ['event-liability-insurance', 'legal', 'tent', null, ['alert', 'shield']],
  ['product-liability-insurance', 'business', 'box', 'scales', ['alert', 'shield']],
  ['professional-indemnity-insurance', 'legal', 'briefcase', 'scales', ['shield', 'alert']],
  ['medical-malpractice-insurance', 'legal', 'hospital', 'scales', ['plus', 'alert']],
  ['quotes-for-commercial-insurance', 'business', 'building', 'calculator', ['doc', 'coin']],
  ['hotel-insurance', 'travel', 'building', 'key', ['star', 'shield'], { sign: true }],
  ['gas-engineer-public-liability-insurance', 'construction', 'boiler', null, ['flame', 'shield']],
  ['compound-insurance', 'business', 'compound', null, ['shield', 'pin']],
  ['niche-commercial-insurance-hotels-marinas-malpractice', 'marine', 'building', 'dock', ['plus', 'star'], { sign: true }],
  ['contractors-all-risk-contract-works-insurance-uk', 'construction', 'construction', 'document', ['hardhat', 'shield']],
  ['starting-and-running-an-insurance-agency', 'basics', 'building', 'briefcase', ['chart', 'handshake'], { sign: true }],
  // health & dental
  ['site-of-service-medical-billing-explained', 'health', 'hospital', 'document', ['coin', 'pin']],
  ['medical-procedure-costs-with-and-without-insurance', 'health', 'mri', 'coins', ['calc', 'plus']],
  ['dental-insurance-waiting-periods-explained', 'dental', 'tooth', 'calendar', ['clock', 'check']],
  ['dental-procedure-costs-with-and-without-insurance', 'dental', 'tooth', 'coins', ['calc', 'check']],
  ['what-does-health-insurance-actually-cover', 'health', 'heartbeat', 'clipboard', ['check', 'plus']],
  ['us-health-insurance-guide', 'health', 'hospital', 'wallet', ['plus', 'coin']],
  ['health-insurance-basics', 'health', 'heartbeat', 'document', ['plus', 'search']],
  ['health-insurance-guide-hindi', 'travel', 'heartbeat', 'family', ['rupee', 'plus']],
  ['what-is-coordination-of-benefits', 'health', 'policies', 'scales', ['plus', 'check']],
  // life & term
  ['quote-about-life-insurance', 'life', 'quote', null, ['pulse', 'star']],
  ['security-plan-life-insurance', 'life', 'building', 'family', ['pin', 'shield'], { sign: true }],
  ['open-care-life-insurance', 'life', 'family', 'magnifier', ['search', 'alert']],
  ['business-life-insurance', 'life', 'briefcase', 'people', ['handshake', 'pulse']],
  ['loyal-american-life-insurance', 'life', 'stars', 'family', ['search', 'check']],
  ['life-insurance-broker', 'life', 'people', 'policies', ['handshake', 'search']],
  ['life-insurance-fundamentals-worth-it-payouts-ownership', 'life', 'family', 'coins', ['pulse', 'check']],
  ['what-is-an-insurance-rider', 'life', 'document', 'policies', ['plus', 'pulse']],
  ['what-is-life-insurance', 'life', 'heartbeat', 'family', ['shield', 'search']],
  ['term-insurance-india-guide', 'travel', 'family', 'hourglass', ['rupee', 'shield']],
  ['term-insurance-guide', 'life', 'hourglass', 'family', ['calendar', 'shield']],
  // travel & pet
  ['travel-insurance-guide', 'travel', 'suitcase', null, ['plane', 'globe']],
  ['pet-insurance-explained', 'pet', 'pet', null, ['paw', 'coin']],
  // legal & company checks
  ['when-to-hire-an-insurance-lawyer', 'legal', 'scales', 'people', ['doc', 'check']],
  ['insurance-company-reviews-is-brand-insurance-legit', 'basics', 'stars', 'magnifier', ['search', 'check']],
  ['insurance-company-reviews-is-brand-legit', 'legal', 'magnifier', 'stars', ['alert', 'star']],
  ['accusure-insurance', 'auto', 'stars', 'car', ['search', 'check']],
  ['first-party-insurance-claims', 'basics', 'clipboard', 'house', ['check', 'doc']],
  // insurance fundamentals
  ['can-you-have-multiple-insurance-policies-at-once', 'basics', 'policies', null, ['check', 'shield']],
  ['umbrella-insurance-guide', 'basics', 'umbrella', 'house', ['shield', 'car']],
  ['how-to-know-if-you-are-underinsured', 'home', 'umbrella', 'storm', ['alert', 'search']],
  ['what-happens-when-insurance-expires', 'basics', 'calendar', 'document', ['alert', 'clock']],
  ['agent-vs-broker-vs-insurer', 'basics', 'people', 'building', ['handshake', 'search']],
  ['coverage-vs-limits', 'business', 'shield', 'calculator', ['chart', 'check']],
  ['deductible-vs-premium', 'basics', 'piggy', 'scales', ['coin', 'percent']],
  ['how-often-should-you-review-insurance', 'home', 'calendar', 'clipboard', ['check', 'search']],
  ['how-to-compare-insurance-policies', 'auto', 'policies', 'scales', ['search', 'chart']],
  ['how-to-read-an-insurance-policy', 'basics', 'document', 'magnifier', ['search', 'check']],
  ['named-insured-vs-additional-insured', 'business', 'people', 'document', ['plus', 'check']],
  ['quote-vs-premium-vs-deductible', 'basics', 'calculator', 'document', ['coin', 'percent']],
  ['what-happens-if-you-stop-paying-insurance', 'legal', 'hourglass', 'wallet', ['alert', 'calendar']],
  ['what-is-an-exclusion-in-insurance', 'legal', 'document', 'storm', ['alert', 'search']],
  ['what-is-an-insurance-claim', 'auto', 'clipboard', 'car', ['check', 'coin']],
  ['what-is-an-insurance-endorsement', 'business', 'document', 'policies', ['plus', 'check']],
  ['what-is-an-insurance-quote', 'auto', 'calculator', 'document', ['coin', 'search']],
  ['what-is-insurance-underwriting', 'business', 'magnifier', 'clipboard', ['chart', 'check']],
  ['what-is-a-coverage-limit', 'home', 'shield', 'coins', ['chart', 'alert']],
  ['what-is-a-deductible', 'basics', 'wallet', 'car', ['coin', 'down']],
  ['what-is-an-excess', 'travel', 'wallet', 'house', ['coin', 'percent']],
  ['what-is-an-insurance-premium', 'basics', 'coins', 'calendar', ['percent', 'chart']],
  ['what-is-a-policyholder', 'basics', 'idcard', 'family', ['key', 'check']],
  ['what-is-an-insurance-policy', 'auto', 'document', 'shield', ['check', 'doc']],
  ['what-is-an-insured-person', 'home', 'people', 'idcard', ['check', 'car']],
  ['what-is-an-insurer', 'basics', 'building', 'stars', ['chart', 'shield'], { sign: true }],
  ['how-does-insurance-work', 'travel', 'people', 'coins', ['chart', 'shield']],
  ['insurance-for-beginners', 'basics', 'lightbulb', 'shield', ['search', 'star']],
  ['types-of-insurance', 'travel', 'policies', 'umbrella', ['car', 'home']],
  ['why-do-people-need-insurance', 'life', 'umbrella', 'family', ['shield', 'pulse']],
  ['what-is-insurance', 'basics', 'shield', 'umbrella', ['check', 'search']],
  // business & high-risk driving (added 2026-10)
  ['business-insurance-coverage-requirements', 'construction', 'store', 'clipboard', ['shield', 'check']],
  ['how-much-business-insurance-do-i-need', 'business', 'briefcase', 'calculator', ['chart', 'shield']],
  ['what-insurance-does-a-sole-trader-need', 'pet', 'idcard', 'briefcase', ['shield', 'wrench']],
  ['marine-business-insurance', 'marine', 'dock', 'briefcase', ['handshake', 'shield']],
  ['car-insurance-for-high-risk-and-convicted-drivers', 'auto', 'car', 'scales', ['alert', 'doc']],
  ['sr-22-insurance', 'legal', 'document', 'car', ['alert', 'calendar']],
  ['car-insurance-after-a-driving-ban', 'home', 'car', 'idcard', ['calendar', 'trend']],
  ['commercial-crime-insurance', 'legal', 'building', 'magnifier', ['lock', 'alert']],
];

// ---------------------------------------------------------------- composition
function hash(str) { let h = 2166136261; for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let s = seed || 1; return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)) >>> 0) / 4294967296; }

const motif = (name, c, o = {}) => (M[name] ? M[name](c, o) : '');
const sparkle = (x, y, r, fill) => `<path d="M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28}Z" fill="${fill}"/>`;
const card = (x, y, w, h, r, inner) => `
  <rect x="${x + 4}" y="${y + 14}" width="${w}" height="${h}" rx="${r}" fill="${INK}" opacity="0.10" filter="url(#blur)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${W}"/>${inner}`;

// When the same hero motif repeats (e.g. 8 boat articles), rotate its colourway so siblings differ.
const ALT_INK = [null, 'swap', 'basics', 'life', 'home', 'business'];
function colourway(theme, variant) {
  const c = { ...PALETTES[theme] };
  const v = ALT_INK[variant % ALT_INK.length];
  if (v === 'swap') [c.p, c.a, c.pd, c.ad, c.pl, c.al] = [c.a, c.p, c.ad, c.pd, c.al, c.pl];
  else if (v) { const o = PALETTES[v === theme ? 'travel' : v]; Object.assign(c, { p: o.p, pd: o.pd, pl: o.pl }); }
  return c;
}

function compose([slug, theme, hero, secondary, accents, heroOpts = {}], variant = 0) {
  const c = colourway(theme, variant);
  const rand = rng(hash(slug));
  const flip = hash(slug + ':flip') % 2 === 1;
  const X = x => (flip ? 1200 - x : x); // mirror layout per article

  // background: gradient, soft blobs, dot grid, orbit ring
  const b1 = [X(140 + rand() * 120), 110 + rand() * 90, 170 + rand() * 60];
  const b2 = [X(1000 + rand() * 120), 520 + rand() * 80, 190 + rand() * 70];
  const dotsX = flip ? 70 : 930, dotsY = 50;
  let dots = '';
  for (let r = 0; r < 5; r++) for (let k = 0; k < 7; k++) dots += `<circle cx="${dotsX + k * 28}" cy="${dotsY + r * 28}" r="4" fill="${c.p}" opacity="0.16"/>`;

  // hero: big, centred slightly off-centre (motif content sits roughly in y 40..265 of its frame)
  const heroScale = secondary ? 1.72 : 1.95;
  const hx = X(secondary ? 450 : 600) - (200 * heroScale), hy = 372 - 158 * heroScale;
  const heroG = `<g transform="translate(${hx.toFixed(1)},${hy.toFixed(1)}) scale(${heroScale})">${motif(hero, c, heroOpts)}</g>`;

  // secondary motif in a floating card
  let sec = '';
  if (secondary) {
    const cw = 290, chh = 236, cx = X(902) - cw / 2, cy = 120;
    sec = card(cx, cy, cw, chh, 30, `<g transform="translate(${cx + 25},${cy + 16}) scale(0.6)">${motif(secondary, c)}</g>`);
  }

  // accent badges
  // keep the top-left ~420x150 zone clear: cards overlay a category badge there
  const spots = secondary ? [[X(112), 330], [X(904), 470]] : [[X(156), 318], [X(1000), 452]];
  const acc = accents.map((name, i) => {
    const [ax, ay] = spots[i];
    const s = 118, k = i === 0 ? c.p : c.a;
    return card(ax - s / 2, ay - s / 2, s, s, 30, `<g transform="translate(${ax - 36},${ay - 36}) scale(1.5)">${I[name] ? I[name](c, k) : ''}</g>`);
  }).join('');

  const sp = [
    sparkle(X(1110), 120 + rand() * 40, 16, c.a),
    sparkle(X(90), 560 - rand() * 60, 12, c.p),
    sparkle(X(secondary ? 700 : 820), 70 + rand() * 30, 10, c.pl),
  ].join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.bg1}"/><stop offset="1" stop-color="${c.bg2}"/></linearGradient>
  <filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>
</defs>
<rect width="1200" height="675" fill="url(#bg)"/>
<circle cx="${b1[0].toFixed(0)}" cy="${b1[1].toFixed(0)}" r="${b1[2].toFixed(0)}" fill="${c.blob}" opacity="0.7"/>
<circle cx="${b2[0].toFixed(0)}" cy="${b2[1].toFixed(0)}" r="${b2[2].toFixed(0)}" fill="${c.blob}" opacity="0.6"/>
<circle cx="${X(secondary ? 450 : 600)}" cy="350" r="290" fill="none" stroke="${c.pl}" stroke-width="2" stroke-dasharray="4 12" opacity="0.6"/>
<ellipse cx="${X(secondary ? 450 : 600)}" cy="360" rx="330" ry="250" fill="${W}" opacity="0.45"/>
${dots}
${heroG}
${sec}
${acc}
${sp}
</svg>`;
}

// ---------------------------------------------------------------- tools (icon-style thumbnails)
// slug (root path), theme, main glyph (icon from art.js I), [badge, badge], colourway variant
const TOOLS = [
  ['tools', 'basics', 'calc', ['chart', 'check']],
  ['life-insurance-calculator', 'life', 'pulse', ['coin', 'calc']],
  ['term-insurance-calculator', 'business', 'clock', ['calendar', 'shield']],
  ['health-insurance-calculator', 'health', 'plus', ['coin', 'chart']],
  ['car-insurance-calculator', 'auto', 'car', ['shield', 'check']],
  ['car-insurance-deductible-calculator', 'travel', 'car', ['percent', 'coin'], 1],
  ['home-insurance-calculator', 'home', 'home', ['shield', 'calc']],
  ['home-replacement-cost-estimator', 'construction', 'home', ['hardhat', 'calc'], 1],
  ['renters-insurance-calculator', 'home', 'key', ['home', 'shield'], 1],
  ['premium-calculator', 'basics', 'card', ['calendar', 'percent'], 1],
  ['coverage-calculator', 'business', 'chart', ['shield', 'scale']],
  ['insurance-needs-calculator', 'basics', 'sliders', ['pulse', 'home']],
  ['deductible-calculator', 'legal', 'percent', ['coin', 'chart']],
  ['inflation-calculator', 'disability', 'trend', ['coin', 'clock']],
  ['disability-insurance-calculator', 'disability', 'wallet', ['plus', 'coin'], 1],
  ['travel-insurance-checklist', 'travel', 'plane', ['check', 'globe']],
  ['business-insurance-checklist', 'business', 'checklist', ['shield', 'chart'], 1],
  ['coverage-gap-checker', 'legal', 'search', ['alert', 'shield'], 1],
  ['policy-review-checklist', 'basics', 'checklist', ['calendar', 'search']],
  ['insurance-readiness-quiz', 'pet', 'question', ['star', 'check']],
  ['insurance-terminology-quiz', 'dental', 'book', ['star', 'search']],
  ['policy-check', 'health', 'shield', ['check', 'alert'], 1],
];

function composeTool([slug, theme, glyph, badges, variant = 0]) {
  const c = colourway(theme, variant);
  const rand = rng(hash(`tool:${slug}`));
  let dots = '';
  for (let r = 0; r < 5; r++) for (let k = 0; k < 7; k++) dots += `<circle cx="${70 + k * 28}" cy="${470 + r * 28}" r="4" fill="${c.p}" opacity="0.16"/>`;
  const T = 360, tx = 600 - T / 2, ty = 338 - T / 2; // central app tile
  const badge = ([bx, by], name, k) => card(bx - 64, by - 64, 128, 128, 34,
    `<g transform="translate(${bx - 40},${by - 40}) scale(1.67)">${I[name](c, k)}</g>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.bg1}"/><stop offset="1" stop-color="${c.bg2}"/></linearGradient>
  <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${W}"/><stop offset="1" stop-color="${c.bg2}"/></linearGradient>
  <filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="16"/></filter>
</defs>
<rect width="1200" height="675" fill="url(#bg)"/>
<circle cx="${(180 + rand() * 80).toFixed(0)}" cy="${(140 + rand() * 60).toFixed(0)}" r="200" fill="${c.blob}" opacity="0.65"/>
<circle cx="${(1020 + rand() * 80).toFixed(0)}" cy="${(540 + rand() * 60).toFixed(0)}" r="230" fill="${c.blob}" opacity="0.55"/>
${dots}
<circle cx="600" cy="338" r="270" fill="none" stroke="${c.pl}" stroke-width="2" stroke-dasharray="4 12" opacity="0.7"/>
<circle cx="600" cy="338" r="215" fill="${W}" opacity="0.5"/>
<rect x="${tx + 8}" y="${ty + 26}" width="${T}" height="${T}" rx="88" fill="${INK}" opacity="0.13" filter="url(#blur)"/>
<rect x="${tx}" y="${ty}" width="${T}" height="${T}" rx="88" fill="url(#tile)"/>
<rect x="${tx}" y="${ty}" width="${T}" height="${T}" rx="88" fill="none" stroke="${c.pl}" stroke-width="3" opacity="0.6"/>
<circle cx="600" cy="338" r="118" fill="${c.al}" opacity="0.75"/>
<g transform="translate(${600 - 24 * 4.6},${338 - 24 * 4.6}) scale(4.6)">${I[glyph](c, c.p)}</g>
${badge([862, 196], badges[0], c.a)}
${badge([338, 480], badges[1], c.p)}
${sparkle(1090, 110, 18, c.a)}${sparkle(150, 420, 12, c.p)}${sparkle(880, 560, 11, c.pl)}${sparkle(320, 150, 9, c.a)}
</svg>`;
}

// ---------------------------------------------------------------- render
async function main() {
  let sharp = null;
  try { sharp = require('sharp'); } catch { console.warn('sharp not installed: writing SVG only (run `npm i --no-save sharp` for JPGs)'); }
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv[2];
  const seen = new Map();
  for (const spec of PAGES) {
    const key = JSON.stringify(spec.slice(1));
    if (seen.has(key)) throw new Error(`duplicate design: ${spec[0]} == ${seen.get(key)}`);
    seen.set(key, spec[0]);
    for (const n of [spec[2], spec[3]].filter(Boolean)) if (!M[n]) throw new Error(`unknown motif ${n} (${spec[0]})`);
    for (const n of spec[4]) if (!I[n]) throw new Error(`unknown icon ${n} (${spec[0]})`);
  }
  const seenHero = {};
  for (const spec of PAGES) {
    const variant = (seenHero[spec[2]] = (seenHero[spec[2]] ?? -1) + 1); // nth use of this hero motif
    if (only && spec[0] !== only) continue;
    const svg = compose(spec, variant);
    fs.writeFileSync(path.join(OUT, `${spec[0]}.svg`), svg);
    if (sharp) await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `${spec[0]}.jpg`));
  }
  let scenes = 0;
  for (const [slug, draw] of Object.entries(SCENES)) {
    if (PAGES.some(p => p[0] === slug)) throw new Error(`${slug} is in both PAGES and SCENES`);
    if (only && slug !== only) continue;
    const svg = draw();
    fs.writeFileSync(path.join(OUT, `${slug}.svg`), svg);
    if (sharp) await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `${slug}.jpg`));
    scenes++;
  }
  console.log(`thumbnails: ${only ? 'selected' : PAGES.length + scenes} written to images/learn/`);

  const TOUT = path.join(ROOT, 'images', 'tools');
  fs.mkdirSync(TOUT, { recursive: true });
  const tkeys = new Set();
  for (const t of TOOLS) {
    const key = JSON.stringify(t.slice(1));
    if (tkeys.has(key)) throw new Error(`duplicate tool design: ${t[0]}`);
    tkeys.add(key);
    for (const n of [t[2], ...t[3]]) if (!I[n]) throw new Error(`unknown icon ${n} (${t[0]})`);
    if (!fs.existsSync(path.join(ROOT, t[0], 'index.html'))) throw new Error(`no page for tool ${t[0]}`);
  }
  let n = 0;
  for (const t of TOOLS) {
    if (only && t[0] !== only) continue;
    const svg = composeTool(t);
    fs.writeFileSync(path.join(TOUT, `${t[0]}.svg`), svg);
    if (sharp) await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(TOUT, `${t[0]}.jpg`));
    n++;
  }
  console.log(`tool thumbnails: ${n} written to images/tools/`);
}

if (require.main === module) main().catch(e => { console.error(e.message); process.exit(1); });
module.exports = { PAGES, compose, TOOLS, composeTool };
