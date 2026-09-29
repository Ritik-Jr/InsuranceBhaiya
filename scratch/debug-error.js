const fs = require('fs');
const c = fs.readFileSync('qa/does-renters-insurance-cover-bike-theft/index.html', 'utf8');
const scripts = [...c.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
scripts.forEach((s, idx) => {
  try {
    JSON.parse(s[1]);
    console.log('Script', idx, 'OK');
  } catch (e) {
    console.log('Script', idx, 'FAILED:', e.message);
    const m = e.message.match(/position (\d+)/);
    if (m) {
      const pos = parseInt(m[1]);
      console.log('Around error:\n' + s[1].slice(Math.max(0, pos - 100), Math.min(s[1].length, pos + 100)));
    }
  }
});
