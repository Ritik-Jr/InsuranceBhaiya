// Honest authorship & structured data, enforced on every seo-optimize run (so republished pages can't
// reintroduce what the October 2026 cleanup removed):
//   - one real byline: "Insurance Bhaiya Editorial Team" (no invented people, desks or job titles)
//   - no unverifiable credentials ("Licensed Claims Adjuster", "Actuarially Audited", "Verified Answer"…)
//   - Q&A pages are editorial answers, so they use Article schema, not QAPage (QAPage is for user forums)
//   - "Similar questions" cards are links, not copies of other pages' answers
const TEAM = 'Insurance Bhaiya Editorial Team';
const TEAM_URL = 'https://insurancebhaiya.com/author/editorial-team/';
const TEAM_LD = { '@type': 'Organization', name: TEAM, url: TEAM_URL };
const PUBLISHER_LD = {
  '@type': 'Organization', name: 'Insurance Bhaiya', url: 'https://insurancebhaiya.com',
  logo: { '@type': 'ImageObject', url: 'https://insurancebhaiya.com/logo-md.png' },
};

// end offset of the element whose opening tag starts at `start`, honouring nesting (-1 if unbalanced)
function elementEnd(h, start) {
  const tag = h.slice(start).match(/^<([a-z0-9]+)/i)[1];
  const re = new RegExp(`<${tag}\\b|</${tag}>`, 'gi');
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(h))) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0) return re.lastIndex;
  }
  return -1;
}
const elementHtml = (h, start) => { const end = elementEnd(h, start); return end < 0 ? '' : h.slice(start, end); };

// remove one element (and its whole line when it sits on lines of its own)
function removeElement(h, start) {
  const end = elementEnd(h, start);
  if (end < 0) return h;
  let s = start;
  while (s > 0 && (h[s - 1] === ' ' || h[s - 1] === '\t')) s--;
  let e = end;
  if (h[e] === '\r') e++;
  if (h[e] === '\n') e++;
  if (s > 0 && h[s - 1] === '\n' && e > end) return h.slice(0, s) + h.slice(e);
  return h.slice(0, start) + h.slice(end);
}
function removeAll(h, openRe, keep = () => false) {
  let from = 0, m;
  const re = new RegExp(openRe.source, 'g');
  while ((re.lastIndex = from, m = re.exec(h))) {
    if (keep(h, m.index)) { from = m.index + 1; continue; }
    h = removeElement(h, m.index);
    from = m.index;
  }
  return h;
}

// ---------------------------------------------------------------- JSON-LD
function fixLd(node, page) {
  if (Array.isArray(node)) return node.map(n => fixLd(n, page));
  if (!node || typeof node !== 'object') return node;
  if (node['@type'] === 'QAPage' && node.mainEntity) {
    const q = node.mainEntity, a = q.acceptedAnswer || {};
    const url = (a.url || page.canonical || '').split('#')[0];
    const desc = String(a.text || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    return {
      '@context': node['@context'] || 'https://schema.org',
      '@type': 'Article',
      headline: String(q.name || '').slice(0, 110),
      description: desc.length > 300 ? desc.slice(0, desc.lastIndexOf(' ', 297)) + '…' : desc,
      datePublished: q.datePublished || q.dateCreated,
      dateModified: q.dateModified || a.dateModified || q.datePublished || q.dateCreated,
      author: TEAM_LD,
      publisher: PUBLISHER_LD,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    };
  }
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (k === 'upvoteCount' || k === 'reviewedBy') continue;
    out[k] = (k === 'author' || k === 'editor' || k === 'creator') ? TEAM_LD : fixLd(v, page);
  }
  return out;
}

function fixStructuredData(h, page) {
  return h.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (all, a, body, b) => {
    let j;
    try { j = JSON.parse(body); } catch (e) { return all; }
    const next = fixLd(j, page);
    if (JSON.stringify(next) === JSON.stringify(j)) return all;
    return `${a}\n${JSON.stringify(next, null, 2).replace(/</g, '\\u003c')}\n${b}`;
  });
}

// ---------------------------------------------------------------- visible bylines & claims
const KEEP_META = /Updated|Published|min read|\b(19|20)\d{2}\b/;
function fixBylines(h) {
  h = h.replace(/(<span class="author-name">)[^<]*(<\/span>)/g, `$1${TEAM}$2`)
    .replace(/(<meta property="article:author" content=")[^"]*(")/g, `$1${TEAM}$2`);
  h = removeAll(h, /<span class="author-badge-verified">/);
  h = removeAll(h, /<div class="author-trust-pill">/);
  // meta row: keep only dates and reading time; drop roles / "Reviewed by" credentials
  h = h.replace(/(<div class="author-meta-row">)([\s\S]*?)(\n?[ \t]*<\/div>)/g, (all, open, inner, close) => {
    const indent = (inner.match(/\n([ \t]*)</) || [, '              '])[1];
    const spans = [...inner.matchAll(/<span\b([^>]*)>([\s\S]*?)<\/span>/g)]
      .filter(([, attrs]) => !/author-dot/.test(attrs))
      .filter(([, , text]) => KEEP_META.test(text.replace(/<[^>]+>/g, '')) && !/Reviewed by/i.test(text));
    if (!spans.length) return all;
    const dot = `\n${indent}<span class="author-dot">&bull;</span>`;
    return open + spans.map(([s]) => `\n${indent}${s}`).join(dot) + close;
  });
  // Q&A: sidebar "reviewer credentials" card and the header "Verified Answer" pill
  h = h.replace(/[ \t]*<!-- 3\. Reviewer Credentials & Trust Card -->\r?\n/g, '');
  h = removeAll(h, /<div class="qa-sidebar-reviewer-card">/);
  h = removeAll(h, /<span class="pill"[^>]*>/, (s, i) => !/^<span class="pill"[^>]*>\s*<svg[\s\S]*?<\/svg>\s*Verified Answer\s*<\/span>$/.test(elementHtml(s, i)));
  return h
    // card bylines ("By Elena Rostova") -> the real team
    .replace(/(<span(?: style="[^"]*")?>)By (?!Insurance Bhaiya Editorial Team<)[A-Z][^<]{2,60}(<\/span>)/g, `$1By ${TEAM}$2`)
    .replace(/(<\/span>) Verified Answers</g, '$1 Questions Answered<')
    .replace(/Read Verified Answer/g, 'Read Answer')
    .replace(/We continually refine our actuarial guides\./g, 'We continually refine our guides.')
    .replace(/(<span class="pill pill-accent"[^>]*>)Actuarial Model(<\/span>)/g, '$1Free Tool$2')
    .replace(/[ \t]*<span style="[^"]*">Actuarially Audited<\/span>\r?\n?/g, '');
}

// "Similar questions" cards: title + link only (the excerpts duplicated other pages' answers site-wide)
const stripCardExcerpts = h => h.replace(/[ \t]*<p class="qa-paa-desc">[\s\S]*?<\/p>\r?\n?/g, '');

function normalizeTrust(h, page = {}) {
  return stripCardExcerpts(fixBylines(fixStructuredData(h, page)));
}

// JSON sources the publisher builds pages from
function normalizeRecord(rec) {
  if (!rec || typeof rec !== 'object') return rec;
  if ('author' in rec) rec.author = TEAM;
  if ('authorRole' in rec) rec.authorRole = '';
  for (const k of ['reviewer', 'reviewedBy']) delete rec[k];
  return rec;
}

module.exports = { normalizeTrust, normalizeRecord, removeElement, removeAll, elementHtml, TEAM, TEAM_URL };
