#!/usr/bin/env node
/**
 * One-time (idempotent) consolidation for the October 2026 quality cleanup. Run it, then seo-optimize.js:
 *
 *   node src/scripts/quality/consolidate.js && node src/scripts/seo-optimize.js
 *
 * - merged pages (retired.js, '/old/': '/new/') become the site's usual noindex redirect stub
 * - removed pages ('/old/': null) are deleted
 * seo-optimize.js then drops both from data.json, src/data/articles, hubs, card lists and the sitemap.
 */
const fs = require('fs');
const path = require('path');
const { RETIRED } = require('./retired');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const SITE = 'https://insurancebhaiya.com';

const stub = to => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Moved</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${SITE}${to}">
  <meta http-equiv="refresh" content="0; url=${to}">
  <script>location.replace("${to}" + location.search + location.hash);</script>
</head>
<body><p>This page has moved to <a href="${to}">${SITE}${to}</a>.</p></body>
</html>
`;

let stubs = 0, removed = 0;
for (const [from, to] of Object.entries(RETIRED)) {
  const dir = path.join(ROOT, ...from.split('/').filter(Boolean));
  if (to) {
    const f = path.join(dir, 'index.html');
    if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== stub(to)) { fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(f, stub(to)); stubs++; }
  } else if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    removed++;
  }
}

console.log(`consolidate: ${stubs} redirect stubs written, ${removed} pages removed`);
