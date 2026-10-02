#!/usr/bin/env node
/**
 * Points every learn article (and every card that links to one) at its generated thumbnail.
 * Run after generate.js. Idempotent.
 *
 *   on-page <img> (cover + cards)        -> /images/learn/<slug>.svg   (vector, crisp, ~10 KB)
 *   og:image / twitter:image / schema    -> https://insurancebhaiya.com/images/learn/<slug>.jpg (1200x675)
 *   data.json + src/data/articles coverImage -> /images/learn/<slug>.jpg (what the publisher reuses)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const SITE = 'https://insurancebhaiya.com';
const IMG_DIR = path.join(ROOT, 'images', 'learn');
const SLUGS = new Set(fs.readdirSync(IMG_DIR).filter(f => f.endsWith('.svg')).map(f => f.slice(0, -4))
  .filter(s => fs.existsSync(path.join(IMG_DIR, `${s}.jpg`))));
const svg = s => `/images/learn/${s}.svg`;
const jpg = s => `${SITE}/images/learn/${s}.jpg`;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || ['backups', 'src', 'images', 'node_modules', 'scratch'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

let pages = 0, cards = 0;
for (const f of walk(ROOT)) {
  const orig = fs.readFileSync(f, 'utf8');
  let h = orig;
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const own = (rel.match(/^learn\/([^/]+)\/index\.html$/) || [])[1];

  if (own && SLUGS.has(own)) {
    const J = jpg(own);
    h = h.replace(/(<meta property="og:image(?::secure_url)?" content=")[^"]*(")/g, (m, a, b) => a + J + b)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, (m, a, b) => a + J + b)
      .replace(/(<meta property="og:image:width" content=")[^"]*(")/, (m, a, b) => a + '1200' + b)
      .replace(/(<meta property="og:image:height" content=")[^"]*(")/, (m, a, b) => a + '675' + b)
      .replace(/("@type": "Article",[\s\S]*?"image": \[\s*)"[^"]*"/, (m, a) => `${a}"${J}"`)
      .replace(/<img src="[^"]*"([^>]*class="article-cover-img"[^>]*)>/, (m, rest) =>
        `<img src="${svg(own)}"${rest.replace(/\s(width|height)="\d+"/g, '')} width="1200" height="675">`.replace(/ \/ width/, ' width').replace(/\s*\/>$/, ' />'))
      // hand-built pages (e.g. the Hindi guide) use an unclassed hero image
      .replace(/<img src="https:\/\/images\.unsplash\.com[^"]*"/, () => `<img src="${svg(own)}"`);
    if (h !== orig) pages++;
  }

  // client-side article grid data embedded in /learn/ (one JSON object per article)
  h = h.replace(/(<script id="learnArticlesData" type="application\/json">)([\s\S]*?)(<\/script>)/, (m, a, json, b) =>
    a + json.replace(/\{[^{}]*\}/g, obj => {
      const slug = (obj.match(/"slug": "([a-z0-9-]+)"/) || [])[1];
      return slug && SLUGS.has(slug) ? obj.replace(/("coverImage": )"[^"]*"/, (x, k) => `${k}"${svg(slug)}"`) : obj;
    }) + b);

  // cards: any <article> block that links to a learn article and shows an image
  h = h.replace(/<article\b[^>]*>[\s\S]*?<\/article>/g, block => {
    const slug = (block.match(/href="\/learn\/([a-z0-9-]+)\/"/) || [])[1];
    if (!slug || !SLUGS.has(slug) || !/<img\b/.test(block)) return block;
    const next = block.replace(/(<img\b[^>]*\bsrc=")[^"]*("[^>]*class="(?:apple-article-img|related-big-img)")/g, (m, a, b) => a + svg(slug) + b);
    if (next !== block) cards++;
    return next;
  });

  if (h !== orig) fs.writeFileSync(f, h);
}

// JSON sources the publisher regenerates pages from
function setCover(file, slug, rec) { rec.coverImage = `/images/learn/${slug}.jpg`; }
{
  const f = path.join(ROOT, 'data.json');
  const raw = fs.readFileSync(f, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const d = JSON.parse(raw);
  for (const a of d.articles) if (SLUGS.has(a.slug)) setCover(f, a.slug, a);
  const next = JSON.stringify(d, null, 2).replace(/\n/g, eol) + (raw.endsWith('\n') ? eol : '');
  if (next !== raw) fs.writeFileSync(f, next);
}
for (const s of SLUGS) {
  const f = path.join(ROOT, 'src', 'data', 'articles', `${s}.json`);
  if (!fs.existsSync(f)) continue;
  const raw = fs.readFileSync(f, 'utf8');
  const rec = JSON.parse(raw);
  setCover(f, s, rec);
  const next = JSON.stringify(rec, null, 2) + (raw.endsWith('\n') ? '\n' : '');
  if (next !== raw) fs.writeFileSync(f, next);
}
console.log(`thumbnails applied: ${pages} article pages, ${cards} cards (${SLUGS.size} slugs)`);
