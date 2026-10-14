// Index pruning (October 2026 recovery plan): sections kept out of Google's index while the site recovers.
// Pruned pages stay live and crawlable — "noindex, follow" with their canonical kept — and seo-optimize
// leaves them out of sitemap.xml and llms.txt. Delete a pattern here to put that section back in the index.
//   /qa/ — 269 templated Q&A pages published in three weeks (the hub goes too: it only lists them)
const PRUNED = [/^\/qa\//];

const ROBOTS = '<meta name="robots" content="noindex, follow">';
const isPruned = url => PRUNED.some(re => re.test(url));

function applyNoindex(h) {
  if (/<meta name="robots"[^>]*>/.test(h)) return h.replace(/<meta name="robots"[^>]*>/, ROBOTS);
  return h.replace(/(<meta charset="[^"]*">)/i, `$1\n  ${ROBOTS}`);
}

module.exports = { isPruned, applyNoindex };
