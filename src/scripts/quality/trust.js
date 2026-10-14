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

// No actuary works on the site: the calculators are simple published formulas, so "actuarial" may describe
// the insurance industry ("actuarial tables", "how actuaries price risk"), never our own tools or advice
const CLAIMS = [
  [/All calculators and guides are built on open actuarial principles\./g, 'Each calculator explains the formula it uses directly beneath the tool.'],
  [/([Ii])nteractive actuarial estimation tools/g, '$1nteractive estimation tools'],
  [/educational risk analyses and actuarial calculators/g, 'educational guides and simplified calculators'],
  [/Free Actuarial Calculator/g, 'Free Calculator'],
  [/Use our open-source actuarial calculators/g, 'Use our free calculators'],
  [/The Bottom-Line Actuarial Recommendation/g, 'The Bottom-Line Recommendation'],
  [/Interactive Actuarial (?:Tool|Utility)/g, 'Interactive Tool'],
  [/>Actuarial Utility</g, '>Free Tool<'],
  [/Actuarial Framework/g, 'Free Tool'],
  [/>Actuarial Model<\/div>/g, '>How It Works</div>'],
  [/>Actuarial Key Takeaway</g, '>Key Takeaway<'],
  [/Actuarial (&amp;|&) Contractual Mechanics/g, 'Pricing $1 Contract Mechanics'],
  [/Unbiased actuarial baseline without/g, 'An independent estimate without'],
  [/(<h4 class="footer-heading">)Actuarial Tools(<\/h4>)/g, '$1Calculators &amp; Tools$2'],
  [/(drawer-nav-label">)Actuarial Calculators</g, '$1Calculators<'],
  [/Insurance Calculators (&amp;|&) Actuarial Tools/g, 'Insurance Calculators $1 Tools'],
  [/Actuarial Intelligence Suite/g, 'Calculator Suite'],
  [/Actuarial Methodology/g, 'Methodology'],
  [/Actuarially Advised/g, 'Usually Worth Keeping'],
  [/transparent actuarial decision calculators/g, 'transparent calculators'],
  [/actuarial decision calculators/g, 'calculators'],
  [/against standard actuarial guidelines/g, 'against common coverage benchmarks'],
  [/Clear actuarial explanations covering/g, 'Clear explanations covering'],
  [/An exhaustive, actuarial guide to/g, 'A practical guide to'],
  [/Actuarial Triggers That Prompt/g, 'Common Triggers That Prompt'],
  [/Actuarial Formula (&amp;|&) Assumptions/g, 'How This Tool Works'],
  [/Launch Actuarial Tools/g, 'Launch Calculators'],
  [/Actuarial Tools (&amp;|&) Calculation Outputs/g, 'Calculators $1 Calculation Outputs'],
  [/Transparent guides, actuarial calculators, and/g, 'Transparent guides, simple calculators, and'],
  [/insurance intelligence, actuarial calculators, and/g, 'insurance intelligence, simple calculators, and'],
  [/educational guides, actuarial tools, and analytical models/g, 'educational guides, calculators and tools'],
  [/use statistical heuristics and standard actuarial formulas/g, 'use simple formulas and stated assumptions'],
  // unsourced appeals to authority
  [/Actuaries recommend structuring/g, 'A common approach is structuring'],
  [/Actuaries typically recommend 10 to 15 times/g, 'A common rule of thumb is 10 to 15 times'],
  [/Actuaries recommend holding/g, 'A common guideline is holding'],
  [/Actuaries recommend at least/g, 'Many insurance guides suggest at least'],
  [/Actuaries strongly recommend matching/g, 'Consider matching'],
];
const fixClaims = h => CLAIMS.reduce((s, [re, to]) => s.replace(re, to), h);

// "Similar questions" cards: title + link only (the excerpts duplicated other pages' answers site-wide)
const stripCardExcerpts = h => h.replace(/[ \t]*<p class="qa-paa-desc">[\s\S]*?<\/p>\r?\n?/g, '');

function normalizeTrust(h, page = {}) {
  return fixClaims(stripCardExcerpts(fixBylines(fixStructuredData(h, page))));
}

// JSON sources the publisher builds pages from
function normalizeRecord(rec) {
  if (!rec || typeof rec !== 'object') return rec;
  if ('author' in rec) rec.author = TEAM;
  if ('authorRole' in rec) rec.authorRole = '';
  for (const k of ['reviewer', 'reviewedBy']) delete rec[k];
  return rec;
}

module.exports = { normalizeTrust, normalizeRecord, fixClaims, removeElement, removeAll, elementHtml, TEAM, TEAM_URL };
