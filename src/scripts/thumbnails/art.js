// Flat-vector illustration kit for Insurance Bhaiya learn thumbnails.
// Every hero motif is drawn in a 400x300 frame, ground line ~y=258, centred on x=200.
// Accent icons are drawn in a 48x48 frame.

const INK = '#1f2a44';
const W = '#ffffff';
const GLASS = '#d6ecff';
const GLASS2 = '#b9dcfb';
const TIRE = '#273248';
const HUB = '#cbd5e1';
const METAL = '#e2e8f0';
const METALD = '#94a3b8';
const WATER = '#7cc4f2';
const WATERD = '#4aa3df';

// ---------------------------------------------------------------- palettes
const PALETTES = {
  aviation: { bg1: '#e8f3ff', bg2: '#f5f9ff', blob: '#cfe5ff', p: '#2f6fec', pd: '#1d4fc0', pl: '#8fb6ff', a: '#ff8a3d', ad: '#e46a1c', al: '#ffd2b0' },
  marine: { bg1: '#e3f6fb', bg2: '#f4fbfd', blob: '#c4ecf6', p: '#0e8fb3', pd: '#0a6a86', pl: '#7fd1e6', a: '#ff6b5e', ad: '#d94a3e', al: '#ffd0cb' },
  auto: { bg1: '#eef0ff', bg2: '#f7f8ff', blob: '#dadfff', p: '#4f5bd5', pd: '#3640a8', pl: '#a6adf2', a: '#ffb020', ad: '#d98c00', al: '#ffe3a6' },
  home: { bg1: '#eaf7ef', bg2: '#f6fbf8', blob: '#cdeedb', p: '#1f9d6b', pd: '#167553', pl: '#86d5b2', a: '#ff9f43', ad: '#e07b1a', al: '#ffdcb8' },
  health: { bg1: '#e9f8f6', bg2: '#f5fcfb', blob: '#c9efe9', p: '#14a39a', pd: '#0e7a73', pl: '#7ed9d1', a: '#f25f7a', ad: '#cf3f5a', al: '#ffd1da' },
  dental: { bg1: '#eef7ff', bg2: '#f8fbff', blob: '#d5ebff', p: '#3b8fe0', pd: '#2766ab', pl: '#9ccaf5', a: '#2ec4a6', ad: '#1d9b83', al: '#bff2e6' },
  life: { bg1: '#fdeef3', bg2: '#fff7fa', blob: '#fad3df', p: '#e0457b', pd: '#b52c5d', pl: '#f5a3c0', a: '#7c5cff', ad: '#5b3fe0', al: '#ddd3ff' },
  business: { bg1: '#f1effe', bg2: '#f9f8ff', blob: '#e0dbfc', p: '#6c4ee0', pd: '#4f34b8', pl: '#b6a5f5', a: '#22b8cf', ad: '#1590a3', al: '#c3f0f7' },
  legal: { bg1: '#f6f1e8', bg2: '#fcfaf5', blob: '#ece0c9', p: '#a8742a', pd: '#7f5517', pl: '#e2c48f', a: '#3d5afe', ad: '#2a3fc4', al: '#d3dbff' },
  basics: { bg1: '#eaf2ff', bg2: '#f7faff', blob: '#d3e4ff', p: '#2563eb', pd: '#1d4ed8', pl: '#93b8fb', a: '#10b981', ad: '#059669', al: '#bdf2dd' },
  travel: { bg1: '#fff4e6', bg2: '#fffaf3', blob: '#ffe0b8', p: '#f08a24', pd: '#c96a0d', pl: '#ffc58a', a: '#2e86de', ad: '#1d64ad', al: '#cfe4fb' },
  pet: { bg1: '#fff2ec', bg2: '#fffaf7', blob: '#ffd9c9', p: '#e8743b', pd: '#bd5523', pl: '#f7b896', a: '#4a9d5b', ad: '#357a43', al: '#cdebd3' },
  disability: { bg1: '#eef5ec', bg2: '#f8fbf7', blob: '#d6e9d1', p: '#4c9a2a', pd: '#38751e', pl: '#a6d68f', a: '#5b7cfa', ad: '#3f5ed6', al: '#d6defe' },
  construction: { bg1: '#fff6e0', bg2: '#fffbf0', blob: '#ffe8a8', p: '#f2a900', pd: '#c48700', pl: '#ffd666', a: '#334155', ad: '#1e293b', al: '#cbd5e1' },
};

// ---------------------------------------------------------------- helpers
const shadow = (cx = 200, cy = 262, rx = 150, ry = 12) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${INK}" opacity="0.10"/>`;
const wheel = (cx, cy, r, hub = HUB) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${TIRE}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="${hub}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.2}" fill="${METALD}"/>`;
const spokeWheel = (cx, cy, r) => {
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${TIRE}" stroke-width="${r * 0.22}"/>`;
  for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3; s += `<line x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(a) * r * 0.85).toFixed(1)}" y2="${(cy + Math.sin(a) * r * 0.85).toFixed(1)}" stroke="${METALD}" stroke-width="2"/>`; }
  return s + `<circle cx="${cx}" cy="${cy}" r="${r * 0.14}" fill="${METALD}"/>`;
};
const waves = (y = 250, c = WATER, d = WATERD) => `
  <path d="M10 ${y} Q 45 ${y - 10} 80 ${y} T 150 ${y} T 220 ${y} T 290 ${y} T 360 ${y} T 400 ${y} L400 ${y + 40} L10 ${y + 40}Z" fill="${c}" opacity="0.55"/>
  <path d="M30 ${y + 14} Q 60 ${y + 6} 90 ${y + 14} T 150 ${y + 14} T 210 ${y + 14} T 270 ${y + 14} T 330 ${y + 14} T 380 ${y + 14}" fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>`;

// ---------------------------------------------------------------- hero motifs
const M = {};

M.plane = (c, o = {}) => `
  ${o.floats ? '' : shadow(205, 262, 130, 9)}
  <path d="M188 142 L236 142 L300 92 L276 92Z" fill="${c.pd}"/>
  <path d="M74 168 Q72 146 104 141 L302 135 Q328 133 346 116 L364 116 L360 154 Q332 172 290 174 L108 180 Q76 184 74 168Z" fill="${W}"/>
  <path d="M80 176 Q90 182 108 180 L290 174 Q330 172 356 160 L358 152 Q326 164 288 165 L104 170Z" fill="${METAL}"/>
  <path d="M322 132 L346 74 L372 74 L362 134Z" fill="${c.p}"/>
  <ellipse cx="350" cy="140" rx="34" ry="6" fill="${c.pd}"/>
  <path d="M96 156 L340 148" stroke="${c.p}" stroke-width="7" stroke-linecap="round"/>
  <path d="M100 145 Q112 133 136 133 L150 133 L150 145Z" fill="${GLASS2}"/>
  ${[170, 196, 222, 248, 274].map(x => `<rect x="${x}" y="137" width="14" height="10" rx="4" fill="${GLASS}"/>`).join('')}
  <path d="M172 158 L232 158 L296 222 L262 222Z" fill="${c.p}"/>
  <path d="M232 158 L296 222 L262 222 L214 170Z" fill="${c.pd}" opacity="0.35"/>
  <circle cx="72" cy="166" r="9" fill="${c.a}"/>
  <ellipse cx="66" cy="166" rx="4" ry="34" fill="${INK}" opacity="0.55"/>
  ${o.floats ? `
  <path d="M112 182 L118 214 M262 176 L268 214" stroke="${METALD}" stroke-width="5"/>
  <path d="M80 214 L300 214 Q320 214 318 226 L104 228 Q80 228 80 214Z" fill="${c.a}"/>
  ${waves(236)}` : `
  <path d="M128 180 L122 236 M240 176 L246 236" stroke="${METALD}" stroke-width="5"/>
  ${wheel(122, 240, 14)}${wheel(246, 240, 14)}`}`;

M.helicopter = c => `
  ${shadow(200, 262, 120, 9)}
  <rect x="70" y="58" width="260" height="8" rx="4" fill="${INK}" opacity="0.75"/>
  <rect x="192" y="62" width="16" height="30" rx="4" fill="${METALD}"/>
  <path d="M240 140 L360 128 L362 144 L244 164Z" fill="${c.p}"/>
  <path d="M342 100 L362 100 L366 146 L350 146Z" fill="${c.pd}"/>
  <circle cx="356" cy="128" r="20" fill="none" stroke="${INK}" stroke-width="3" opacity="0.5"/>
  <path d="M110 140 Q110 90 175 88 L230 88 Q262 90 262 140 Q262 190 200 192 L160 192 Q110 190 110 140Z" fill="${c.p}"/>
  <path d="M116 132 Q120 98 168 96 L178 96 L178 148 L118 148Z" fill="${GLASS2}"/>
  <path d="M188 104 L232 104 Q246 106 246 130 L188 130Z" fill="${GLASS}"/>
  <path d="M110 150 Q114 186 160 190 L230 190 Q256 188 262 160Z" fill="${c.pd}" opacity="0.35"/>
  <path d="M150 192 L140 226 M226 192 L236 226" stroke="${METALD}" stroke-width="6" stroke-linecap="round"/>
  <path d="M96 230 L272 230" stroke="${INK}" stroke-width="7" stroke-linecap="round" opacity="0.8"/>`;

M.drone = c => `
  ${shadow(200, 262, 110, 8)}
  ${[[110, 120], [290, 120], [130, 176], [270, 176]].map(([x, y]) => `
    <line x1="200" y1="150" x2="${x}" y2="${y}" stroke="${INK}" stroke-width="10" stroke-linecap="round" opacity="0.85"/>
    <rect x="${x - 6}" y="${y - 18}" width="12" height="18" rx="3" fill="${INK}" opacity="0.85"/>
    <ellipse cx="${x}" cy="${y - 20}" rx="50" ry="8" fill="${c.pl}" opacity="0.8"/>
    <ellipse cx="${x}" cy="${y - 20}" rx="50" ry="8" fill="none" stroke="${c.p}" stroke-width="2"/>`).join('')}
  <rect x="160" y="128" width="80" height="48" rx="18" fill="${c.p}"/>
  <rect x="172" y="136" width="56" height="12" rx="6" fill="${c.pl}"/>
  <circle cx="200" cy="196" r="18" fill="${INK}"/>
  <circle cx="200" cy="196" r="9" fill="${GLASS2}"/>
  <circle cx="204" cy="192" r="3" fill="${W}"/>`;

M.hangar = c => `
  ${shadow(200, 262, 170, 10)}
  <path d="M40 256 L40 150 Q200 40 360 150 L360 256Z" fill="${c.p}"/>
  <path d="M40 150 Q200 40 360 150 L360 168 Q200 60 40 168Z" fill="${c.pd}"/>
  <path d="M90 256 L90 170 Q200 100 310 170 L310 256Z" fill="${c.pl}"/>
  ${[0, 1, 2, 3, 4].map(i => `<line x1="${112 + i * 44}" y1="${i === 0 || i === 4 ? 160 : 132}" x2="${112 + i * 44}" y2="256" stroke="${c.pd}" stroke-width="2" opacity="0.35"/>`).join('')}
  <path d="M150 230 L250 222 L258 210 L150 216Z" fill="${W}"/>
  <path d="M236 216 L250 196 L258 196 L254 218Z" fill="${c.a}"/>
  <path d="M180 220 L210 220 L232 240 L218 240Z" fill="${c.a}"/>
  <rect x="180" y="74" width="40" height="14" rx="4" fill="${c.a}"/>`;

M.boat = (c, o = {}) => `
  ${waves(244)}
  <path d="M60 196 L340 196 Q330 236 300 242 L104 242 Q74 236 60 196Z" fill="${o.hull || W}"/>
  <path d="M64 206 L338 206 L334 216 L68 216Z" fill="${c.p}"/>
  <path d="M104 242 Q74 236 60 196 L80 196 Q90 230 120 236 L300 236 Q318 232 326 216 L334 216 Q326 236 300 242Z" fill="${METAL}"/>
  <path d="M120 196 L150 150 L262 150 L290 196Z" fill="${W}"/>
  <path d="M158 156 L200 156 L200 186 L140 186Z" fill="${GLASS2}"/>
  <path d="M208 156 L256 156 L276 186 L208 186Z" fill="${GLASS}"/>
  <path d="M150 150 L170 120 L232 120 L262 150Z" fill="${c.pd}"/>
  <rect x="296" y="172" width="34" height="24" rx="4" fill="${METALD}"/>
  <path d="M332 176 L352 180 L350 192 L332 194Z" fill="${INK}" opacity="0.6"/>`;

M.sailboat = c => `
  ${waves(246)}
  <rect x="196" y="40" width="7" height="170" rx="3" fill="${INK}" opacity="0.8"/>
  <path d="M206 48 Q290 120 304 196 L206 196Z" fill="${W}"/>
  <path d="M206 48 Q290 120 304 196 L282 196 Q268 130 206 70Z" fill="${METAL}"/>
  <path d="M192 62 Q130 130 104 196 L192 196Z" fill="${c.p}"/>
  <path d="M192 62 L192 196 L170 196 Q168 130 192 62Z" fill="${c.pd}" opacity="0.45"/>
  <path d="M84 202 L320 202 Q306 238 278 242 L118 242 Q92 236 84 202Z" fill="${c.a}"/>
  <path d="M90 214 L316 214" stroke="${W}" stroke-width="4" opacity="0.8"/>`;

M.yacht = c => `
  ${waves(246)}
  <path d="M30 200 L370 192 Q356 236 320 242 L80 244 Q46 236 30 200Z" fill="${W}"/>
  <path d="M34 210 L366 202 L362 214 L40 222Z" fill="${c.pd}"/>
  <path d="M90 200 L118 160 L330 156 L350 194Z" fill="${W}"/>
  <path d="M124 166 L322 162 L336 186 L112 190Z" fill="${INK}" opacity="0.82"/>
  ${[150, 196, 242, 288].map(x => `<rect x="${x}" y="170" width="30" height="12" rx="4" fill="${GLASS2}"/>`).join('')}
  <path d="M150 158 L174 126 L300 124 L316 156Z" fill="${W}"/>
  <path d="M182 132 L296 130 L304 150 L170 152Z" fill="${INK}" opacity="0.75"/>
  <rect x="226" y="96" width="6" height="30" fill="${METALD}"/>
  <path d="M232 98 L262 104 L232 112Z" fill="${c.a}"/>`;

M.pontoon = c => `
  ${waves(250)}
  <rect x="70" y="214" width="270" height="22" rx="11" fill="${METAL}"/>
  <rect x="70" y="214" width="270" height="8" rx="4" fill="${W}" opacity="0.7"/>
  <rect x="62" y="194" width="290" height="20" rx="4" fill="${c.p}"/>
  <rect x="62" y="166" width="290" height="28" rx="4" fill="${W}" opacity="0.92"/>
  ${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${80 + i * 42}" y1="166" x2="${80 + i * 42}" y2="194" stroke="${c.pl}" stroke-width="3"/>`).join('')}
  <path d="M110 166 L118 110 M290 166 L282 110" stroke="${METALD}" stroke-width="5"/>
  <path d="M96 112 Q200 84 304 112 L296 124 Q200 100 104 124Z" fill="${c.a}"/>
  <rect x="144" y="150" width="44" height="16" rx="6" fill="${c.pd}"/>
  <rect x="210" y="150" width="44" height="16" rx="6" fill="${c.pd}"/>`;

M.houseboat = c => `
  ${waves(248)}
  <path d="M48 206 L352 206 Q342 238 310 242 L92 242 Q60 238 48 206Z" fill="${c.pd}"/>
  <rect x="80" y="134" width="240" height="72" rx="6" fill="${W}"/>
  <path d="M68 140 L200 86 L332 140Z" fill="${c.a}"/>
  <path d="M68 140 L200 86 L200 100 L84 146Z" fill="${c.ad}" opacity="0.4"/>
  ${[104, 156, 252].map(x => `<rect x="${x}" y="152" width="40" height="30" rx="5" fill="${GLASS2}"/>`).join('')}
  <rect x="206" y="152" width="32" height="54" rx="4" fill="${c.p}"/>
  <circle cx="230" cy="180" r="3" fill="${W}"/>
  <rect x="270" y="92" width="16" height="30" fill="${METALD}"/>
  <path d="M88 206 L312 206" stroke="${METALD}" stroke-width="3"/>`;

M.jetski = c => `
  ${waves(244)}
  <path d="M70 206 Q80 170 150 164 L270 162 Q330 162 344 190 L350 206 Q340 232 300 236 L110 236 Q74 232 70 206Z" fill="${c.p}"/>
  <path d="M74 214 L348 214 Q340 232 300 236 L110 236 Q78 232 74 214Z" fill="${W}"/>
  <path d="M150 166 Q190 140 240 146 L262 164Z" fill="${INK}" opacity="0.8"/>
  <path d="M260 160 L290 118" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <path d="M276 116 L306 120" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <path d="M288 170 Q320 160 340 186 L300 186Z" fill="${GLASS2}"/>
  <path d="M90 196 L130 192" stroke="${c.a}" stroke-width="8" stroke-linecap="round"/>`;

M.dock = c => `
  ${waves(250)}
  <path d="M40 186 L360 186 L360 202 L40 202Z" fill="#c08a52"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<line x1="${60 + i * 40}" y1="186" x2="${60 + i * 40}" y2="202" stroke="#8a5a2b" stroke-width="2"/>`).join('')}
  ${[60, 160, 260, 350].map(x => `<rect x="${x - 7}" y="160" width="14" height="96" rx="4" fill="#8a5a2b"/><ellipse cx="${x}" cy="160" rx="7" ry="3" fill="#a8743f"/>`).join('')}
  <path d="M80 222 L220 222 Q214 244 196 246 L100 246 Q84 244 80 222Z" fill="${W}"/>
  <path d="M110 222 L130 206 L176 206 L190 222Z" fill="${c.p}"/>
  <path d="M240 222 L340 222 Q334 244 318 246 L256 246 Q244 244 240 222Z" fill="${c.a}"/>
  <path d="M60 150 L60 100 L120 100 L120 150" fill="none" stroke="${c.pd}" stroke-width="4"/>
  <rect x="50" y="86" width="80" height="20" rx="6" fill="${c.pd}"/>`;

M.car = (c, o = {}) => `
  ${shadow(200, 256, 160, 10)}
  <path d="M40 210 Q40 176 72 170 L118 164 Q150 120 200 118 L262 118 Q300 120 326 164 L350 170 Q366 176 366 200 L366 216 Q366 226 354 226 L52 226 Q40 226 40 214Z" fill="${o.color || c.p}"/>
  <path d="M40 206 L366 200 L366 216 Q366 226 354 226 L52 226 Q40 226 40 214Z" fill="${c.pd}"/>
  <path d="M134 164 Q160 132 200 130 L226 130 L226 164Z" fill="${GLASS2}"/>
  <path d="M236 130 L262 130 Q290 132 308 164 L236 164Z" fill="${GLASS}"/>
  <rect x="226" y="128" width="10" height="38" fill="${o.color || c.p}"/>
  <rect x="338" y="178" width="22" height="10" rx="5" fill="#ffe08a"/>
  <rect x="42" y="180" width="16" height="10" rx="5" fill="#ff8a80"/>
  <path d="M190 182 L210 182" stroke="${W}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  ${wheel(108, 226, 28)}${wheel(298, 226, 28)}`;

M.motorcycle = (c, o = {}) => {
  const dirt = o.dirt;
  return `
  ${shadow(200, 262, 140, 9)}
  ${dirt ? spokeWheel(104, 222, 40) + spokeWheel(300, 222, 40) : wheel(104, 226, 36) + wheel(300, 226, 36)}
  <path d="M104 226 L170 170 L250 176 L300 226" fill="none" stroke="${METALD}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M276 128 L300 226" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
  <path d="M262 124 L296 116" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <path d="M160 168 Q190 132 238 140 L256 170 Q206 182 160 168Z" fill="${c.p}"/>
  <path d="M110 160 Q130 146 168 152 L170 168 Q140 172 112 168Z" fill="${INK}" opacity="0.85"/>
  ${dirt ? `<path d="M270 160 Q300 150 330 176" fill="none" stroke="${c.a}" stroke-width="10" stroke-linecap="round"/><path d="M70 176 Q92 168 120 176" fill="none" stroke="${c.a}" stroke-width="10" stroke-linecap="round"/>` : `<path d="M262 150 Q300 132 316 168 L280 176Z" fill="${c.pd}"/><circle cx="312" cy="160" r="8" fill="#ffe08a"/>`}
  <rect x="176" y="182" width="56" height="30" rx="8" fill="${METALD}"/>
  <path d="M120 206 L178 200" stroke="${METALD}" stroke-width="7" stroke-linecap="round"/>`;
};

M.atv = c => `
  ${shadow(200, 262, 150, 10)}
  <path d="M80 186 L120 150 L290 150 L324 186 L330 206 L74 206Z" fill="${c.p}"/>
  <path d="M74 196 L330 196 L330 206 L74 206Z" fill="${c.pd}"/>
  <path d="M150 150 Q170 124 230 126 L244 150Z" fill="${INK}" opacity="0.85"/>
  <path d="M250 136 L276 104 M262 102 L292 108" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <path d="M70 150 L130 150 M276 150 L336 150" stroke="${METALD}" stroke-width="5" stroke-linecap="round"/>
  ${wheel(112, 222, 40)}${wheel(294, 222, 40)}
  <circle cx="112" cy="222" r="40" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="6 7" opacity="0.6"/>
  <circle cx="294" cy="222" r="40" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="6 7" opacity="0.6"/>`;

M.rv = c => `
  ${shadow(200, 258, 175, 10)}
  <path d="M30 220 L30 104 Q30 90 46 90 L300 90 Q316 90 318 106 L320 130 L358 160 Q372 170 372 190 L372 220Z" fill="${W}"/>
  <path d="M30 188 L372 188 L372 220 L30 220Z" fill="${c.p}"/>
  <path d="M30 176 L372 176 L372 184 L30 184Z" fill="${c.a}"/>
  <path d="M322 134 L352 160 L322 160Z" fill="${GLASS2}"/>
  ${[52, 112, 200].map(x => `<rect x="${x}" y="112" width="${x === 200 ? 80 : 46}" height="38" rx="6" fill="${GLASS}"/>`).join('')}
  <rect x="166" y="112" width="26" height="76" rx="4" fill="${c.pl}"/>
  <rect x="80" y="76" width="70" height="16" rx="5" fill="${METAL}"/>
  ${wheel(92, 222, 26)}${wheel(306, 222, 26)}`;

M.bicycle = c => `
  ${shadow(200, 262, 135, 8)}
  ${spokeWheel(110, 214, 50)}${spokeWheel(292, 214, 50)}
  <path d="M110 214 L170 134 L262 134 L292 214 M170 134 L200 214 L262 134 M110 214 L200 214" fill="none" stroke="${c.p}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M170 134 L160 110 M140 106 L178 106" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
  <path d="M262 134 L270 102 L296 96" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <circle cx="200" cy="214" r="12" fill="${c.a}"/>`;

M.house = c => `
  ${shadow(200, 262, 160, 10)}
  <rect x="270" y="60" width="26" height="60" fill="${c.pd}"/>
  <rect x="84" y="140" width="232" height="118" fill="${W}"/>
  <path d="M60 148 L200 50 L340 148 L322 160 L200 76 L78 160Z" fill="${c.a}"/>
  <path d="M84 140 L200 66 L316 140 L316 150 L200 80 L84 150Z" fill="${c.ad}" opacity="0.25"/>
  <rect x="176" y="186" width="48" height="72" rx="4" fill="${c.p}"/>
  <circle cx="214" cy="224" r="3.5" fill="${W}"/>
  ${[[108, 170], [250, 170]].map(([x, y]) => `<rect x="${x}" y="${y}" width="44" height="40" rx="4" fill="${GLASS2}"/><path d="M${x + 22} ${y} V${y + 40} M${x} ${y + 20} H${x + 44}" stroke="${W}" stroke-width="3"/>`).join('')}
  <rect x="84" y="250" width="232" height="8" fill="${c.pl}"/>
  <circle cx="60" cy="236" r="22" fill="${c.pl}"/><circle cx="344" cy="240" r="18" fill="${c.pl}"/>`;

M.building = (c, o = {}) => `
  ${shadow(200, 262, 150, 10)}
  <rect x="110" y="56" width="150" height="202" rx="4" fill="${c.p}"/>
  <rect x="236" y="56" width="24" height="202" fill="${c.pd}" opacity="0.5"/>
  ${[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(k => `<rect x="${128 + k * 38}" y="${78 + r * 30}" width="24" height="18" rx="3" fill="${GLASS}"/>`).join('')).join('')}
  <rect x="166" y="222" width="38" height="36" rx="3" fill="${INK}" opacity="0.75"/>
  <rect x="262" y="128" width="96" height="130" rx="4" fill="${W}"/>
  ${[0, 1, 2].map(r => `<rect x="278" y="${146 + r * 32}" width="64" height="16" rx="4" fill="${GLASS2}"/>`).join('')}
  <rect x="44" y="160" width="70" height="98" rx="4" fill="${c.pl}"/>
  ${[0, 1].map(r => `<rect x="58" y="${178 + r * 34}" width="42" height="18" rx="3" fill="${W}" opacity="0.8"/>`).join('')}
  ${o.sign ? `<rect x="140" y="30" width="90" height="26" rx="6" fill="${c.a}"/><rect x="158" y="40" width="54" height="6" rx="3" fill="${W}"/>` : ''}`;

M.store = c => `
  ${shadow(200, 262, 160, 10)}
  <rect x="64" y="110" width="272" height="148" rx="4" fill="${W}"/>
  <rect x="56" y="86" width="288" height="26" rx="6" fill="${c.pd}"/>
  <path d="M56 112 ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `Q ${74 + i * 36} 142 ${92 + i * 36} 112`).join(' ')} Z" fill="${c.a}"/>
  ${[0, 2, 4, 6].map(i => `<path d="M${56 + i * 36} 112 L${92 + i * 36} 112 Q${74 + i * 36} 142 ${56 + i * 36} 112Z" fill="${W}" opacity="0.85"/>`).join('')}
  <rect x="86" y="150" width="130" height="80" rx="4" fill="${GLASS2}"/>
  <rect x="240" y="150" width="70" height="108" rx="4" fill="${c.p}"/>
  <circle cx="296" cy="206" r="4" fill="${W}"/>
  <circle cx="150" cy="196" r="22" fill="none" stroke="${c.pd}" stroke-width="5"/>
  <circle cx="122" cy="210" r="12" fill="none" stroke="${c.pd}" stroke-width="4"/><circle cx="178" cy="210" r="12" fill="none" stroke="${c.pd}" stroke-width="4"/>`;

M.compound = c => `
  ${shadow(200, 262, 175, 10)}
  <rect x="34" y="150" width="110" height="108" rx="4" fill="${c.pl}"/>
  <path d="M28 154 L89 116 L150 154Z" fill="${c.pd}"/>
  <rect x="150" y="96" width="110" height="162" rx="4" fill="${c.p}"/>
  ${[0, 1, 2, 3].map(r => `<rect x="168" y="${114 + r * 34}" width="74" height="18" rx="3" fill="${GLASS}"/>`).join('')}
  <rect x="266" y="168" width="104" height="90" rx="4" fill="${W}"/>
  <path d="M266 168 L370 168 L370 182 L266 182Z" fill="${c.a}"/>
  <rect x="294" y="206" width="48" height="52" rx="3" fill="${METALD}"/>
  ${[0, 1, 2].map(i => `<line x1="${300 + i * 16}" y1="206" x2="${300 + i * 16}" y2="258" stroke="${W}" stroke-width="2"/>`).join('')}
  <rect x="62" y="188" width="54" height="40" rx="3" fill="${W}" opacity="0.85"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<rect x="${24 + i * 34}" y="240" width="4" height="22" fill="${METALD}"/>`).join('')}
  <rect x="20" y="246" width="356" height="4" fill="${METALD}"/>`;

M.hospital = c => `
  ${shadow(200, 262, 165, 10)}
  <rect x="90" y="96" width="220" height="162" rx="6" fill="${W}"/>
  <rect x="40" y="150" width="60" height="108" rx="4" fill="${c.pl}"/>
  <rect x="300" y="150" width="60" height="108" rx="4" fill="${c.pl}"/>
  <rect x="170" y="44" width="60" height="60" rx="14" fill="${c.a}"/>
  <path d="M200 56 V92 M182 74 H218" stroke="${W}" stroke-width="12" stroke-linecap="round"/>
  ${[0, 1].map(r => [0, 1, 2, 3].map(k => `<rect x="${110 + k * 48}" y="${120 + r * 40}" width="32" height="24" rx="4" fill="${GLASS2}"/>`).join('')).join('')}
  <rect x="176" y="208" width="48" height="50" rx="4" fill="${c.p}"/>
  <line x1="200" y1="208" x2="200" y2="258" stroke="${W}" stroke-width="3"/>
  ${[0, 1].map(r => `<rect x="56" y="${170 + r * 36}" width="28" height="18" rx="3" fill="${W}"/><rect x="316" y="${170 + r * 36}" width="28" height="18" rx="3" fill="${W}"/>`).join('')}`;

M.mri = c => `
  ${shadow(200, 262, 165, 10)}
  <circle cx="190" cy="150" r="98" fill="${W}"/>
  <circle cx="190" cy="150" r="98" fill="none" stroke="${c.pl}" stroke-width="10"/>
  <circle cx="190" cy="150" r="52" fill="${c.p}"/>
  <circle cx="190" cy="150" r="40" fill="${INK}" opacity="0.85"/>
  <rect x="150" y="160" width="230" height="22" rx="8" fill="${METAL}"/>
  <rect x="150" y="160" width="230" height="8" rx="4" fill="${W}"/>
  <path d="M250 182 L250 252 M350 182 L350 252" stroke="${METALD}" stroke-width="10"/>
  <rect x="226" y="248" width="150" height="10" rx="5" fill="${METALD}"/>
  <rect x="118" y="78" width="30" height="8" rx="4" fill="${c.a}"/>`;

M.tooth = c => `
  ${shadow(200, 266, 110, 9)}
  <circle cx="200" cy="158" r="122" fill="${c.pl}" opacity="0.55"/>
  <path d="M200 96 C176 70 118 62 102 106 C90 140 104 172 118 198 C130 222 134 254 156 256 C178 258 178 214 200 210 C222 214 222 258 244 256 C266 254 270 222 282 198 C296 172 310 140 298 106 C282 62 224 70 200 96Z" fill="${W}" stroke="${c.pd}" stroke-opacity="0.35" stroke-width="5"/>
  <path d="M298 106 C310 140 296 172 282 198 C270 222 266 254 244 256 C258 240 262 212 270 190 C286 160 294 132 286 104 C280 84 266 74 250 72 C276 70 292 86 298 106Z" fill="${METAL}"/>
  <path d="M124 116 Q132 90 160 88" fill="none" stroke="${c.pl}" stroke-width="12" stroke-linecap="round"/>
  <path d="M330 70 l8 20 l20 8 l-20 8 l-8 20 l-8 -20 l-20 -8 l20 -8Z" fill="${c.a}"/>
  <path d="M70 196 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5Z" fill="${c.p}"/>
  <path d="M332 200 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4Z" fill="${c.pl}"/>`;

M.family = c => {
  const person = (x, s, body, head = '#f2c7a5', hair = '#3b2a20') => `
    <path d="M${x - 34 * s} ${258} Q${x - 34 * s} ${258 - 80 * s} ${x} ${258 - 84 * s} Q${x + 34 * s} ${258 - 80 * s} ${x + 34 * s} ${258}Z" fill="${body}"/>
    <circle cx="${x}" cy="${258 - 112 * s}" r="${24 * s}" fill="${head}"/>
    <path d="M${x - 24 * s} ${258 - 114 * s} Q${x - 22 * s} ${258 - 142 * s} ${x} ${258 - 138 * s} Q${x + 24 * s} ${258 - 142 * s} ${x + 24 * s} ${258 - 114 * s} Q${x + 10 * s} ${258 - 128 * s} ${x - 24 * s} ${258 - 114 * s}Z" fill="${hair}"/>`;
  return `
  ${shadow(200, 262, 150, 9)}
  <path d="M200 92 C200 62 156 50 140 80 C124 108 160 134 200 160 C240 134 276 108 260 80 C244 50 200 62 200 92Z" fill="${c.p}" opacity="0.18" transform="translate(0,-30)"/>
  ${person(126, 1.15, c.p, '#e9b48f', '#2d1e16')}
  ${person(272, 1.1, c.a, '#f3cfb3', '#6b3f22')}
  ${person(200, 0.78, c.pl, '#f0c09b', '#3b2a20')}
  <path d="M200 70 C200 52 176 46 168 62 C160 78 180 92 200 104 C220 92 240 78 232 62 C224 46 200 52 200 70Z" fill="${c.p}"/>`;
};

M.heartbeat = c => `
  ${shadow(200, 264, 120, 9)}
  <path d="M200 252 C120 196 68 154 68 106 C68 66 98 44 132 44 C164 44 188 62 200 84 C212 62 236 44 268 44 C302 44 332 66 332 106 C332 154 280 196 200 252Z" fill="${c.p}"/>
  <path d="M200 252 C120 196 68 154 68 106 C68 66 98 44 132 44 C110 60 96 84 100 116 C108 168 160 210 200 240Z" fill="${c.pd}" opacity="0.35"/>
  <path d="M84 140 L150 140 L170 104 L196 182 L220 120 L236 140 L316 140" fill="none" stroke="${W}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>`;

M.umbrella = c => `
  ${shadow(200, 264, 130, 9)}
  <path d="M60 150 Q70 54 200 46 Q330 54 340 150 Q316 132 290 150 Q262 130 236 150 Q212 130 200 150 Q188 130 164 150 Q138 130 110 150 Q84 132 60 150Z" fill="${c.p}"/>
  <path d="M200 46 Q160 80 164 150 Q188 130 200 150 Q212 130 236 150 Q240 80 200 46Z" fill="${c.pl}"/>
  <path d="M60 150 Q70 54 200 46 Q110 70 110 150 Q84 132 60 150Z" fill="${c.pd}" opacity="0.45"/>
  <rect x="196" y="30" width="8" height="20" rx="4" fill="${INK}"/>
  <path d="M200 150 L200 232 Q200 256 178 256 Q160 256 158 238" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
  ${[[120, 190], [282, 200], [240, 236], [96, 230]].map(([x, y]) => `<path d="M${x} ${y} q-6 10 0 14 q6 -4 0 -14Z" fill="${WATERD}" opacity="0.7"/>`).join('')}`;

M.shield = c => `
  ${shadow(200, 266, 110, 9)}
  <path d="M200 36 L316 78 L316 150 Q316 220 200 262 Q84 220 84 150 L84 78Z" fill="${c.p}"/>
  <path d="M200 36 L316 78 L316 150 Q316 220 200 262Z" fill="${c.pd}" opacity="0.35"/>
  <path d="M200 64 L290 96 L290 150 Q290 202 200 236 Q110 202 110 150 L110 96Z" fill="${W}" opacity="0.18"/>
  <path d="M150 150 L186 186 L256 112" fill="none" stroke="${W}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`;

M.document = c => `
  ${shadow(200, 268, 120, 9)}
  <g transform="rotate(-6 200 150)">
    <rect x="110" y="40" width="190" height="230" rx="12" fill="${c.pl}"/>
  </g>
  <path d="M104 34 L262 34 L300 72 L300 262 Q300 270 292 270 L112 270 Q104 270 104 262Z" fill="${W}"/>
  <path d="M262 34 L262 64 Q262 72 270 72 L300 72Z" fill="${METAL}"/>
  <rect x="128" y="62" width="100" height="12" rx="6" fill="${c.p}"/>
  ${[96, 118, 140, 162, 184].map((y, i) => `<rect x="128" y="${y}" width="${[150, 130, 150, 110, 140][i]}" height="8" rx="4" fill="${METAL}"/>`).join('')}
  <circle cx="246" cy="230" r="26" fill="${c.a}"/>
  <path d="M234 230 L244 240 L260 222" fill="none" stroke="${W}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M130 238 Q144 222 156 238 T184 236" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;

M.magnifier = c => `
  ${shadow(200, 266, 110, 9)}
  <path d="M248 196 L316 264" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
  <path d="M248 196 L270 218" stroke="${c.a}" stroke-width="30" stroke-linecap="round"/>
  <circle cx="186" cy="132" r="96" fill="${c.p}"/>
  <circle cx="186" cy="132" r="76" fill="${GLASS}"/>
  <path d="M136 98 Q150 72 180 66" fill="none" stroke="${W}" stroke-width="12" stroke-linecap="round"/>
  ${[0, 1, 2].map(i => `<rect x="${138}" y="${118 + i * 20}" width="${[96, 74, 86][i]}" height="9" rx="4.5" fill="${c.pl}"/>`).join('')}`;

M.calculator = c => `
  ${shadow(200, 268, 110, 9)}
  <rect x="112" y="36" width="176" height="230" rx="22" fill="${INK}"/>
  <rect x="132" y="58" width="136" height="50" rx="10" fill="${GLASS}"/>
  <rect x="190" y="74" width="62" height="16" rx="5" fill="${c.p}" opacity="0.7"/>
  ${[0, 1, 2, 3].map(r => [0, 1, 2].map(k => `<rect x="${132 + k * 48}" y="${124 + r * 34}" width="38" height="26" rx="7" fill="${r === 3 && k === 2 ? c.a : k === 2 ? c.p : '#3a4766'}"/>`).join('')).join('')}`;

M.coins = c => `
  ${shadow(200, 266, 140, 10)}
  <g transform="rotate(-8 140 160)"><rect x="56" y="110" width="180" height="96" rx="12" fill="${c.a}"/><rect x="66" y="120" width="160" height="76" rx="8" fill="none" stroke="${W}" stroke-width="3" opacity="0.7"/><circle cx="146" cy="158" r="24" fill="${W}" opacity="0.85"/></g>
  ${[0, 1, 2, 3, 4].map(i => `<ellipse cx="262" cy="${244 - i * 22}" rx="58" ry="16" fill="#e8a317"/><rect x="204" y="${228 - i * 22}" width="116" height="16" fill="#e8a317"/><ellipse cx="262" cy="${228 - i * 22}" rx="58" ry="16" fill="#ffc83d"/>`).join('')}
  <ellipse cx="262" cy="140" rx="34" ry="8" fill="#e8a317" opacity="0.6"/>
  ${[0, 1, 2].map(i => `<ellipse cx="150" cy="${250 - i * 18}" rx="44" ry="12" fill="#e8a317"/><rect x="106" y="${238 - i * 18}" width="88" height="12" fill="#e8a317"/><ellipse cx="150" cy="${238 - i * 18}" rx="44" ry="12" fill="#ffc83d"/>`).join('')}`;

M.piggy = c => `
  ${shadow(200, 266, 120, 9)}
  <ellipse cx="200" cy="168" rx="122" ry="88" fill="${c.pl}"/>
  <path d="M110 120 L96 76 L140 100Z" fill="${c.p}"/>
  <ellipse cx="96" cy="176" rx="28" ry="24" fill="${c.p}"/>
  <circle cx="88" cy="172" r="4" fill="${INK}"/><circle cx="104" cy="172" r="4" fill="${INK}"/>
  <circle cx="136" cy="144" r="7" fill="${INK}"/>
  <rect x="176" y="80" width="64" height="12" rx="6" fill="${c.pd}"/>
  ${[130, 180, 240, 280].map(x => `<rect x="${x - 12}" y="226" width="24" height="36" rx="10" fill="${c.p}"/>`).join('')}
  <path d="M320 160 q26 -10 18 -34" fill="none" stroke="${c.p}" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="208" cy="44" rx="26" ry="26" fill="#ffc83d"/><ellipse cx="208" cy="44" rx="16" ry="16" fill="#e8a317"/>`;

M.briefcase = c => `
  ${shadow(200, 266, 140, 10)}
  <path d="M160 92 L160 72 Q160 60 172 60 L228 60 Q240 60 240 72 L240 92" fill="none" stroke="${INK}" stroke-width="12"/>
  <rect x="70" y="90" width="260" height="170" rx="18" fill="${c.p}"/>
  <path d="M70 140 Q200 176 330 140 L330 150 Q200 186 70 150Z" fill="${c.pd}"/>
  <rect x="180" y="140" width="40" height="34" rx="6" fill="${c.a}"/>
  <rect x="70" y="90" width="260" height="30" rx="18" fill="${W}" opacity="0.15"/>`;

M.scales = c => `
  ${shadow(200, 266, 120, 9)}
  <rect x="194" y="56" width="12" height="190" rx="5" fill="${c.pd}"/>
  <path d="M140 258 L260 258 L244 236 L156 236Z" fill="${c.pd}"/>
  <circle cx="200" cy="52" r="14" fill="${c.p}"/>
  <path d="M86 86 L314 70" stroke="${c.p}" stroke-width="10" stroke-linecap="round"/>
  <path d="M86 86 L54 166 M86 86 L118 166 M314 70 L282 150 M314 70 L346 150" stroke="${METALD}" stroke-width="3"/>
  <path d="M46 166 L126 166 Q120 196 86 196 Q52 196 46 166Z" fill="${c.p}"/>
  <path d="M274 150 L354 150 Q348 180 314 180 Q280 180 274 150Z" fill="${c.p}"/>
  <rect x="300" y="128" width="28" height="22" rx="4" fill="${c.a}"/>`;

M.calendar = c => `
  ${shadow(200, 266, 120, 9)}
  <rect x="86" y="62" width="228" height="198" rx="20" fill="${W}"/>
  <path d="M86 82 Q86 62 106 62 L294 62 Q314 62 314 82 L314 110 L86 110Z" fill="${c.p}"/>
  <rect x="130" y="44" width="14" height="38" rx="7" fill="${INK}"/><rect x="256" y="44" width="14" height="38" rx="7" fill="${INK}"/>
  ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(k => `<rect x="${108 + k * 40}" y="${126 + r * 32}" width="26" height="20" rx="5" fill="${r === 2 && k === 3 ? c.a : METAL}"/>`).join('')).join('')}
  <circle cx="300" cy="230" r="44" fill="${c.pd}"/><circle cx="300" cy="230" r="34" fill="${W}"/>
  <path d="M300 208 L300 232 L316 242" fill="none" stroke="${c.pd}" stroke-width="7" stroke-linecap="round"/>`;

M.hourglass = c => `
  ${shadow(200, 266, 100, 8)}
  <rect x="120" y="36" width="160" height="20" rx="8" fill="${c.pd}"/><rect x="120" y="244" width="160" height="20" rx="8" fill="${c.pd}"/>
  <path d="M138 56 L262 56 Q262 120 214 150 Q262 180 262 244 L138 244 Q138 180 186 150 Q138 120 138 56Z" fill="${GLASS}"/>
  <path d="M158 84 L242 84 Q236 118 200 140 Q164 118 158 84Z" fill="${c.a}"/>
  <path d="M200 150 L200 210" stroke="${c.a}" stroke-width="4"/>
  <path d="M152 244 Q160 206 200 200 Q240 206 248 244Z" fill="${c.a}"/>`;

M.people = c => `
  ${shadow(200, 264, 150, 9)}
  <path d="M60 258 Q60 176 128 172 Q196 176 196 258Z" fill="${c.p}"/>
  <circle cx="128" cy="132" r="34" fill="#e9b48f"/>
  <path d="M94 128 Q96 92 128 92 Q160 92 162 128 Q146 110 94 128Z" fill="#2d1e16"/>
  <path d="M204 258 Q204 176 272 172 Q340 176 340 258Z" fill="${c.a}"/>
  <circle cx="272" cy="132" r="34" fill="#f3cfb3"/>
  <path d="M238 134 Q232 88 272 90 Q312 88 306 134 Q300 104 272 108 Q246 104 238 134Z" fill="#7a4a2a"/>
  <path d="M128 64 L128 60 Q128 40 150 40 L196 40 Q216 40 216 60 L216 72 Q216 92 196 92 L170 92 L154 104 L156 92 Q128 90 128 72Z" fill="${W}"/>
  ${[52, 64].map(y => `<rect x="146" y="${y}" width="${y === 52 ? 54 : 40}" height="7" rx="3.5" fill="${c.pl}"/>`).join('')}
  <path d="M184 216 L216 216" stroke="${W}" stroke-width="10" stroke-linecap="round" opacity="0.9"/>`;

M.tent = c => `
  ${shadow(200, 264, 170, 10)}
  <path d="M40 258 L80 140 L200 80 L320 140 L360 258Z" fill="${W}"/>
  <path d="M80 140 L200 80 L320 140 L300 150 L200 100 L100 150Z" fill="${c.p}"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${80 + i * 40} 140 Q${100 + i * 40} 162 ${120 + i * 40} 140" fill="${i % 2 ? c.p : c.a}"/>`).join('')}
  <path d="M170 258 L170 196 Q200 166 230 196 L230 258Z" fill="${c.pd}" opacity="0.85"/>
  <path d="M20 70 Q110 110 200 66 Q290 110 380 70" fill="none" stroke="${INK}" stroke-width="2" opacity="0.5"/>
  ${[50, 90, 130, 170, 230, 270, 310, 350].map((x, i) => `<path d="M${x - 9} ${78 + Math.round(Math.sin(i) * 6) + (i < 4 ? i * 3 : (7 - i) * 3)} l9 18 l9 -18Z" fill="${[c.a, c.p, '#ffc83d', c.pl][i % 4]}"/>`).join('')}
  <rect x="196" y="58" width="8" height="26" fill="${INK}"/><path d="M204 58 L232 66 L204 74Z" fill="${c.a}"/>`;

M.construction = c => `
  ${shadow(200, 264, 170, 10)}
  <rect x="270" y="40" width="12" height="218" fill="${c.p}"/>
  <path d="M120 52 L340 52" stroke="${c.p}" stroke-width="10"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${140 + i * 34} 52 l17 -10 l17 10" fill="none" stroke="${c.pd}" stroke-width="3"/>`).join('')}
  <path d="M160 52 L160 120" stroke="${INK}" stroke-width="3"/>
  <rect x="140" y="120" width="40" height="20" rx="3" fill="${c.pd}"/>
  <rect x="44" y="150" width="190" height="108" fill="none" stroke="${METALD}" stroke-width="8"/>
  <path d="M44 204 L234 204 M107 150 L107 258 M170 150 L170 258" stroke="${METALD}" stroke-width="6"/>
  <path d="M290 230 Q290 190 330 190 Q370 190 370 230Z" fill="${c.p}"/>
  <rect x="282" y="226" width="96" height="12" rx="6" fill="${c.pd}"/>
  <rect x="324" y="182" width="12" height="20" rx="4" fill="${c.pd}"/>`;

M.boiler = c => `
  ${shadow(200, 266, 140, 10)}
  <rect x="100" y="50" width="150" height="208" rx="16" fill="${W}"/>
  <rect x="120" y="74" width="110" height="40" rx="8" fill="${INK}" opacity="0.85"/>
  <rect x="134" y="86" width="40" height="16" rx="4" fill="${c.a}"/>
  <circle cx="148" cy="150" r="14" fill="${METAL}"/><circle cx="200" cy="150" r="14" fill="${METAL}"/>
  <path d="M175 236 Q150 210 168 186 Q172 204 184 204 Q178 182 196 166 Q194 192 212 206 Q222 222 204 236Z" fill="${c.a}"/>
  <path d="M188 236 Q178 222 188 212 Q194 222 200 222 Q206 230 198 236Z" fill="#ffc83d"/>
  <path d="M140 258 L140 278 M210 258 L210 278" stroke="${METALD}" stroke-width="8"/>
  <g transform="rotate(35 300 150)"><rect x="288" y="80" width="24" height="150" rx="10" fill="${c.p}"/><path d="M280 72 Q300 40 320 72 L312 92 L288 92Z" fill="${c.p}"/><circle cx="300" cy="80" r="9" fill="${c.bg2 || W}"/></g>`;

M.truck = c => `
  ${shadow(200, 260, 175, 10)}
  <rect x="30" y="96" width="220" height="124" rx="8" fill="${W}"/>
  <rect x="30" y="96" width="220" height="16" rx="8" fill="${c.p}"/>
  <path d="M250 130 L320 130 L362 176 L362 220 L250 220Z" fill="${c.p}"/>
  <path d="M262 142 L314 142 L344 176 L262 176Z" fill="${GLASS2}"/>
  <rect x="30" y="206" width="332" height="14" fill="${c.pd}"/>
  <rect x="80" y="134" width="56" height="48" rx="4" fill="${c.a}"/><path d="M80 152 H136 M108 134 V182" stroke="${c.ad}" stroke-width="3"/>
  <rect x="150" y="146" width="44" height="36" rx="4" fill="#d9a066"/><path d="M150 160 H194" stroke="#b07a40" stroke-width="3"/>
  ${wheel(92, 224, 26)}${wheel(300, 224, 26)}`;

M.box = c => `
  ${shadow(200, 266, 140, 10)}
  <path d="M90 110 L200 70 L310 110 L200 150Z" fill="#e6b47a"/>
  <path d="M90 110 L200 150 L200 262 L90 222Z" fill="#d9a066"/>
  <path d="M310 110 L200 150 L200 262 L310 222Z" fill="#c48a4f"/>
  <path d="M145 90 L255 130 L255 170 L238 162 L238 136 L128 96Z" fill="#f2cf9f"/>
  <path d="M226 196 L284 175 L284 205 L226 226Z" fill="${W}" opacity="0.9"/>
  <circle cx="300" cy="78" r="34" fill="${c.a}"/><path d="M286 78 L297 89 L316 68" fill="none" stroke="${W}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M90 150 L58 150 M90 180 L48 180 M90 210 L62 210" stroke="${c.p}" stroke-width="6" stroke-linecap="round" opacity="0.6"/>`;

M.suitcase = c => `
  ${shadow(200, 266, 140, 10)}
  <circle cx="290" cy="120" r="78" fill="${c.al}"/>
  <path d="M232 92 Q262 80 276 104 Q300 96 312 120 Q296 146 270 140 Q250 156 236 132Z" fill="${c.a}" opacity="0.7"/>
  <path d="M300 60 Q320 76 340 70 Q356 100 340 116 Q322 106 306 112Z" fill="${c.a}" opacity="0.6"/>
  <path d="M146 92 L146 70 Q146 58 158 58 L202 58 Q214 58 214 70 L214 92" fill="none" stroke="${INK}" stroke-width="10"/>
  <rect x="96" y="90" width="168" height="168" rx="18" fill="${c.p}"/>
  ${[136, 180, 224].map(x => `<rect x="${x - 4}" y="90" width="8" height="168" fill="${c.pd}" opacity="0.5"/>`).join('')}
  <circle cx="140" cy="146" r="18" fill="${W}"/><rect x="186" y="196" width="52" height="30" rx="6" fill="${c.al}"/>
  <path d="M60 60 L84 54 L112 70 L84 72Z" fill="${W}"/>`;

M.pet = c => `
  ${shadow(200, 266, 130, 9)}
  <path d="M118 108 Q84 92 78 140 Q74 196 104 204 Q122 206 128 170Z" fill="${c.pd}"/>
  <path d="M282 108 Q316 92 322 140 Q326 196 296 204 Q278 206 272 170Z" fill="${c.pd}"/>
  <ellipse cx="200" cy="164" rx="92" ry="90" fill="${c.pl}"/>
  <path d="M126 96 Q86 86 80 140 Q76 192 104 200 Q120 202 126 168 Q130 128 146 108Z" fill="${c.pd}"/>
  <path d="M274 96 Q314 86 320 140 Q324 192 296 200 Q280 202 274 168 Q270 128 254 108Z" fill="${c.pd}"/>
  <ellipse cx="200" cy="206" rx="60" ry="46" fill="${W}"/>
  <circle cx="164" cy="146" r="11" fill="${INK}"/><circle cx="236" cy="146" r="11" fill="${INK}"/>
  <circle cx="168" cy="142" r="3.5" fill="${W}"/><circle cx="240" cy="142" r="3.5" fill="${W}"/>
  <ellipse cx="200" cy="184" rx="18" ry="13" fill="${INK}"/>
  <path d="M200 196 L200 212 M184 216 Q200 228 216 216" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <path d="M200 240 Q200 262 220 262 Q234 262 230 246" fill="#ff8fa3"/>
  <circle cx="320" cy="214" r="34" fill="${c.a}"/>
  <path d="M308 214 h24 M320 202 v24" stroke="${W}" stroke-width="8" stroke-linecap="round"/>`;

M.storm = c => `
  <path d="M90 140 Q80 90 130 84 Q146 40 200 46 Q246 48 258 88 Q312 82 316 130 Q318 162 282 166 L118 166 Q86 164 90 140Z" fill="${METALD}"/>
  <path d="M120 150 Q112 116 150 112 Q164 80 206 84 Q240 86 248 116 Q290 112 292 146 Q292 166 270 166 L130 166Z" fill="#a9b6c8"/>
  <path d="M206 160 L180 214 L206 214 L190 262 L240 196 L214 196 L232 160Z" fill="#ffc83d"/>
  ${[[120, 190], [150, 220], [270, 192], [300, 224], [250, 240]].map(([x, y]) => `<path d="M${x} ${y} l-8 18" stroke="${WATERD}" stroke-width="5" stroke-linecap="round"/>`).join('')}`;

M.map = c => `
  ${shadow(200, 266, 150, 10)}
  <path d="M56 80 L140 56 L260 84 L344 60 L344 236 L260 260 L140 232 L56 256Z" fill="${W}"/>
  <path d="M140 56 L140 232 L56 256 L56 80Z" fill="${c.pl}" opacity="0.55"/>
  <path d="M260 84 L344 60 L344 236 L260 260Z" fill="${c.pl}" opacity="0.35"/>
  <path d="M80 200 Q120 150 170 170 T 260 140 T 330 110" fill="none" stroke="${c.p}" stroke-width="5" stroke-dasharray="10 9" stroke-linecap="round"/>
  <path d="M230 160 Q230 96 270 92 Q310 96 310 160 Q310 190 270 228 Q230 190 230 160Z" fill="${c.a}" transform="translate(-40,-60)"/>
  <circle cx="230" cy="92" r="16" fill="${W}"/>`;

M.idcard = c => `
  ${shadow(200, 266, 140, 10)}
  <g transform="rotate(5 220 160)"><rect x="96" y="86" width="248" height="156" rx="18" fill="${c.pl}"/></g>
  <rect x="70" y="80" width="260" height="164" rx="18" fill="${W}"/>
  <path d="M70 98 Q70 80 88 80 L312 80 Q330 80 330 98 L330 118 L70 118Z" fill="${c.p}"/>
  <rect x="92" y="136" width="70" height="84" rx="10" fill="${c.pl}"/>
  <circle cx="127" cy="166" r="16" fill="${W}"/><path d="M103 214 Q127 180 151 214Z" fill="${W}"/>
  ${[140, 162, 184].map((y, i) => `<rect x="180" y="${y}" width="${[120, 90, 104][i]}" height="10" rx="5" fill="${METAL}"/>`).join('')}
  <rect x="180" y="204" width="56" height="16" rx="5" fill="${c.a}"/>
  <path d="M290 94 L304 99 L304 108 Q304 116 290 120 Q276 116 276 108 L276 99Z" fill="${W}" opacity="0.9"/>`;

M.quote = c => `
  ${shadow(200, 266, 130, 9)}
  <path d="M70 70 Q70 46 94 46 L306 46 Q330 46 330 70 L330 196 Q330 220 306 220 L170 220 L118 262 L126 220 L94 220 Q70 220 70 196Z" fill="${W}"/>
  <circle cx="136" cy="128" r="16" fill="${c.p}"/><path d="M122 132 Q120 98 150 88 L152 98 Q136 106 138 124Z" fill="${c.p}"/>
  <circle cx="184" cy="128" r="16" fill="${c.p}"/><path d="M170 132 Q168 98 198 88 L200 98 Q184 106 186 124Z" fill="${c.p}"/>
  ${[0, 1, 2].map(i => `<rect x="${i === 0 ? 218 : 122}" y="${[118, 166, 190][i]}" width="${[86, 180, 130][i]}" height="10" rx="5" fill="${METAL}"/>`).join('')}
  <path d="M300 200 C300 186 284 182 280 192 C276 182 260 186 260 200 C260 212 280 222 280 222 C280 222 300 212 300 200Z" fill="${c.a}"/>`;

M.clipboard = c => `
  ${shadow(200, 268, 115, 9)}
  <rect x="104" y="48" width="192" height="220" rx="16" fill="${c.p}"/>
  <rect x="118" y="66" width="164" height="190" rx="10" fill="${W}"/>
  <rect x="160" y="36" width="80" height="30" rx="10" fill="${INK}"/>
  ${[0, 1, 2, 3].map(i => `<rect x="136" y="${92 + i * 40}" width="22" height="22" rx="6" fill="${i < 3 ? c.a : METAL}"/>${i < 3 ? `<path d="M141 ${103 + i * 40} L146 ${108 + i * 40} L154 ${98 + i * 40}" fill="none" stroke="${W}" stroke-width="3.5" stroke-linecap="round"/>` : ''}<rect x="170" y="${99 + i * 40}" width="${[94, 80, 100, 70][i]}" height="9" rx="4.5" fill="${METAL}"/>`).join('')}`;

M.stars = c => `
  ${shadow(200, 266, 140, 10)}
  <rect x="64" y="70" width="272" height="170" rx="22" fill="${W}"/>
  <circle cx="112" cy="116" r="24" fill="${c.pl}"/>
  <rect x="148" y="104" width="110" height="10" rx="5" fill="${METAL}"/><rect x="148" y="122" width="70" height="8" rx="4" fill="${METAL}"/>
  ${[0, 1, 2, 3, 4].map(i => { const x = 108 + i * 46, y = 178; return `<path d="M${x} ${y - 20} L${x + 6} ${y - 6} L${x + 21} ${y - 5} L${x + 9} ${y + 5} L${x + 13} ${y + 20} L${x} ${y + 11} L${x - 13} ${y + 20} L${x - 9} ${y + 5} L${x - 21} ${y - 5} L${x - 6} ${y - 6}Z" fill="${i < 4 ? '#ffc83d' : METAL}"/>`; }).join('')}
  <rect x="88" y="212" width="150" height="8" rx="4" fill="${METAL}"/>
  <circle cx="320" cy="236" r="34" fill="${c.a}"/><path d="M306 236 L316 246 L334 226" fill="none" stroke="${W}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;

M.wallet = c => `
  ${shadow(200, 266, 140, 10)}
  <rect x="96" y="62" width="200" height="110" rx="12" fill="#2fbf71" transform="rotate(-10 196 117)"/>
  <rect x="120" y="76" width="200" height="110" rx="12" fill="#5fd896" transform="rotate(-3 220 131)"/>
  <rect x="70" y="112" width="260" height="150" rx="22" fill="${c.p}"/>
  <path d="M250 160 L346 160 Q356 160 356 170 L356 206 Q356 216 346 216 L250 216 Q236 216 236 202 L236 174 Q236 160 250 160Z" fill="${c.pd}"/>
  <circle cx="268" cy="188" r="10" fill="#ffc83d"/>
  <path d="M70 140 L330 140" stroke="${c.pd}" stroke-width="4" opacity="0.5"/>`;

M.key = c => `
  ${shadow(200, 266, 120, 9)}
  <circle cx="130" cy="140" r="70" fill="${c.a}"/>
  <circle cx="130" cy="140" r="28" fill="${c.bg2 || W}"/>
  <rect x="184" y="126" width="170" height="28" rx="10" fill="${c.a}"/>
  <rect x="300" y="150" width="20" height="40" rx="5" fill="${c.a}"/><rect x="330" y="150" width="20" height="28" rx="5" fill="${c.a}"/>
  <path d="M150 210 L260 210 Q280 210 280 230 L280 240 Q280 252 268 252 L150 252Z" fill="${c.p}"/>
  <rect x="164" y="222" width="80" height="10" rx="5" fill="${W}" opacity="0.8"/>`;

M.policies = c => `
  ${shadow(200, 268, 150, 10)}
  ${[[-12, 120, c.pl], [-4, 168, c.a], [6, 214, c.p]].map(([r, x, col]) => `<g transform="rotate(${r} ${x} 160)"><rect x="${x - 62}" y="62" width="124" height="170" rx="14" fill="${W}"/><rect x="${x - 62}" y="62" width="124" height="40" rx="14" fill="${col}"/><rect x="${x - 62}" y="88" width="124" height="14" fill="${col}"/>${[118, 138, 158].map(y => `<rect x="${x - 44}" y="${y}" width="${88 - (y - 118) / 2}" height="8" rx="4" fill="${METAL}"/>`).join('')}</g>`).join('')}
  <path d="M270 180 L340 206 L340 236 Q340 262 300 276 Q260 262 260 236 L260 206Z" fill="${c.pd}" transform="translate(0,-26)"/>
  <path d="M284 210 L296 222 L318 198" fill="none" stroke="${W}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;

M.lightbulb = c => `
  ${shadow(200, 268, 100, 8)}
  ${[0, 1, 2, 3, 4, 5, 6].map(i => { const a = Math.PI + (i * Math.PI) / 6; return `<line x1="${(200 + Math.cos(a) * 112).toFixed(1)}" y1="${(124 + Math.sin(a) * 112).toFixed(1)}" x2="${(200 + Math.cos(a) * 136).toFixed(1)}" y2="${(124 + Math.sin(a) * 136).toFixed(1)}" stroke="${c.a}" stroke-width="8" stroke-linecap="round"/>`; }).join('')}
  <path d="M200 40 Q284 40 284 124 Q284 166 246 196 L246 214 L154 214 L154 196 Q116 166 116 124 Q116 40 200 40Z" fill="#ffd54a"/>
  <path d="M200 40 Q284 40 284 124 Q284 166 246 196 L246 214 L226 214 L226 190 Q262 162 262 124 Q262 62 200 40Z" fill="#f5b800" opacity="0.6"/>
  <path d="M176 196 L176 150 L224 150 L224 196" fill="none" stroke="#e69a00" stroke-width="5"/>
  <rect x="152" y="214" width="96" height="18" rx="6" fill="${METALD}"/><rect x="160" y="232" width="80" height="16" rx="6" fill="${METALD}"/><rect x="176" y="248" width="48" height="12" rx="6" fill="${INK}"/>
  <path d="M152 92 Q160 70 184 64" fill="none" stroke="${W}" stroke-width="10" stroke-linecap="round"/>`;

M.paycheck = c => `
  ${shadow(200, 266, 150, 10)}
  <rect x="58" y="76" width="284" height="150" rx="16" fill="${W}"/>
  <rect x="58" y="76" width="284" height="34" rx="16" fill="${c.p}"/><rect x="58" y="96" width="284" height="14" fill="${c.p}"/>
  <rect x="82" y="132" width="120" height="10" rx="5" fill="${METAL}"/><rect x="82" y="154" width="90" height="10" rx="5" fill="${METAL}"/>
  <rect x="226" y="128" width="92" height="36" rx="8" fill="${c.al}"/><rect x="240" y="141" width="64" height="10" rx="5" fill="${c.a}"/>
  <path d="M82 196 Q100 180 116 196 T150 192" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  <path d="M250 196 L346 196 Q356 196 356 206 L356 232 Q356 242 346 242 L250 242Z" fill="${c.a}" transform="rotate(-18 300 220)"/>
  <rect x="288" y="200" width="22" height="42" rx="4" fill="${W}" opacity="0.85" transform="rotate(-18 300 220)"/>`;

M.car_keys = c => M.key(c);

// ---------------------------------------------------------------- accent icons (48x48)
const I = {};
I.shield = (c, k) => `<path d="M24 4 L41 10 L41 23 Q41 36 24 44 Q7 36 7 23 L7 10Z" fill="${k}"/><path d="M16 24 L22 30 L33 18" fill="none" stroke="${W}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
I.coin = (c, k) => `<circle cx="24" cy="24" r="19" fill="#ffc83d"/><circle cx="24" cy="24" r="13" fill="#f5b000"/><path d="M28 18 Q24 15 20 17.5 Q17 21 22 23 L26 25 Q31 27 28 31 Q24 33.5 19 30 M24 13 V35" fill="none" stroke="${W}" stroke-width="3" stroke-linecap="round"/>`;
I.calc = (c, k) => `<rect x="9" y="4" width="30" height="40" rx="6" fill="${INK}"/><rect x="14" y="9" width="20" height="9" rx="2" fill="${GLASS}"/>${[0, 1, 2].map(r => [0, 1].map(q => `<rect x="${14 + q * 12}" y="${22 + r * 7}" width="8" height="5" rx="1.5" fill="${q && r === 2 ? k : '#5b6888'}"/>`).join('')).join('')}`;
I.clock = (c, k) => `<circle cx="24" cy="24" r="19" fill="${k}"/><circle cx="24" cy="24" r="14" fill="${W}"/><path d="M24 14 V24 L31 28" fill="none" stroke="${k}" stroke-width="4" stroke-linecap="round"/>`;
I.doc = (c, k) => `<path d="M10 4 L30 4 L39 13 L39 44 L10 44Z" fill="${W}" stroke="${k}" stroke-width="3" stroke-linejoin="round"/><path d="M16 20 H32 M16 27 H32 M16 34 H26" stroke="${k}" stroke-width="3.5" stroke-linecap="round"/>`;
I.check = (c, k) => `<circle cx="24" cy="24" r="19" fill="${k}"/><path d="M15 24 L21 30 L33 17" fill="none" stroke="${W}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
I.percent = (c, k) => `<path d="M6 24 L24 6 L42 6 L42 24 L24 42Z" fill="${k}"/><circle cx="33" cy="15" r="3.5" fill="${W}"/><path d="M17 31 L29 19" stroke="${W}" stroke-width="3.5" stroke-linecap="round"/><circle cx="18" cy="21" r="2.6" fill="${W}"/><circle cx="28" cy="30" r="2.6" fill="${W}"/>`;
I.search = (c, k) => `<circle cx="21" cy="21" r="13" fill="none" stroke="${k}" stroke-width="5"/><path d="M31 31 L41 41" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
I.star = (c, k) => `<path d="M24 5 L29.5 17 L42 18.5 L32.5 27 L35.5 40 L24 33 L12.5 40 L15.5 27 L6 18.5 L18.5 17Z" fill="#ffc83d"/>`;
I.pin = (c, k) => `<path d="M24 44 Q8 28 8 19 Q8 4 24 4 Q40 4 40 19 Q40 28 24 44Z" fill="${k}"/><circle cx="24" cy="19" r="6.5" fill="${W}"/>`;
I.chart = (c, k) => `<rect x="7" y="26" width="8" height="16" rx="2" fill="${c.pl}"/><rect x="20" y="16" width="8" height="26" rx="2" fill="${k}"/><rect x="33" y="8" width="8" height="34" rx="2" fill="${c.p}"/>`;
I.alert = (c, k) => `<path d="M24 5 L44 41 L4 41Z" fill="#ffb020" stroke="#ffb020" stroke-width="3" stroke-linejoin="round"/><path d="M24 18 V29" stroke="${W}" stroke-width="4.5" stroke-linecap="round"/><circle cx="24" cy="35" r="2.6" fill="${W}"/>`;
I.pulse = (c, k) => `<path d="M24 42 C10 32 4 25 4 17 C4 10 9 6 15 6 C19 6 22 8 24 12 C26 8 29 6 33 6 C39 6 44 10 44 17 C44 25 38 32 24 42Z" fill="${k}"/><path d="M9 22 H17 L20 15 L25 29 L29 20 L39 20" fill="none" stroke="${W}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
I.wrench = (c, k) => `<path d="M30 6 Q40 4 43 14 L36 13 L33 16 L34 22 L41 22 Q38 32 28 29 L12 44 Q6 44 4 38 L19 22 Q16 12 30 6Z" fill="${k}"/>`;
I.key = (c, k) => `<circle cx="15" cy="24" r="10" fill="none" stroke="${k}" stroke-width="5"/><path d="M25 24 H44 M37 24 V32 M43 24 V30" stroke="${k}" stroke-width="5" stroke-linecap="round"/>`;
I.plus = (c, k) => `<rect x="4" y="4" width="40" height="40" rx="11" fill="${k}"/><path d="M24 13 V35 M13 24 H35" stroke="${W}" stroke-width="6" stroke-linecap="round"/>`;
I.cloud = (c, k) => `<path d="M12 30 Q4 30 5 22 Q6 15 14 15 Q17 6 27 7 Q36 8 37 17 Q45 17 44 25 Q43 31 36 31Z" fill="${METALD}"/><path d="M24 26 L19 37 L25 37 L22 46 L31 33 L25 33 L28 26Z" fill="#ffc83d"/>`;
I.scale = (c, k) => `<path d="M24 6 V40 M14 42 H34 M8 12 L40 10" stroke="${k}" stroke-width="3.5" stroke-linecap="round"/><path d="M3 24 L13 24 Q12 31 8 31 Q4 31 3 24Z M35 22 L45 22 Q44 29 40 29 Q36 29 35 22Z" fill="${k}"/><path d="M8 12 L3 24 M8 12 L13 24 M40 10 L35 22 M40 10 L45 22" stroke="${k}" stroke-width="1.5"/>`;
I.calendar = (c, k) => `<rect x="5" y="9" width="38" height="34" rx="6" fill="${W}" stroke="${k}" stroke-width="3"/><rect x="5" y="9" width="38" height="10" rx="5" fill="${k}"/><rect x="13" y="4" width="4" height="10" rx="2" fill="${INK}"/><rect x="31" y="4" width="4" height="10" rx="2" fill="${INK}"/><rect x="27" y="28" width="9" height="8" rx="2" fill="${c.a}"/>`;
I.phone = (c, k) => `<rect x="13" y="3" width="22" height="42" rx="6" fill="${INK}"/><rect x="16" y="8" width="16" height="28" rx="2" fill="${GLASS}"/><circle cx="24" cy="40" r="2.2" fill="${W}"/>`;
I.lock = (c, k) => `<path d="M15 21 V15 Q15 6 24 6 Q33 6 33 15 V21" fill="none" stroke="${INK}" stroke-width="4.5"/><rect x="9" y="20" width="30" height="24" rx="6" fill="${k}"/><circle cx="24" cy="31" r="3.5" fill="${W}"/>`;
I.down = (c, k) => `<circle cx="24" cy="24" r="19" fill="${k}"/><path d="M24 13 V34 M15 26 L24 35 L33 26" fill="none" stroke="${W}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
I.globe = (c, k) => `<circle cx="24" cy="24" r="19" fill="${k}"/><path d="M5 24 H43 M24 5 Q12 24 24 43 Q36 24 24 5" fill="none" stroke="${W}" stroke-width="2.5"/>`;
I.tooth = (c, k) => `<path d="M24 11 Q29 6 35 8 Q42 11 41 20 Q40 27 37 33 Q35 42 32 42 Q29 42 28 36 Q27 30 24 30 Q21 30 20 36 Q19 42 16 42 Q13 42 11 33 Q8 27 7 20 Q6 11 13 8 Q19 6 24 11Z" fill="${W}" stroke="${k}" stroke-width="3"/>`;
I.wave = (c, k) => `<path d="M4 20 Q10 14 16 20 T28 20 T40 20 T46 20 M4 31 Q10 25 16 31 T28 31 T40 31 T46 31" fill="none" stroke="${k}" stroke-width="4" stroke-linecap="round"/>`;
I.plane = (c, k) => `<path d="M44 24 L28 20 L20 5 L15 5 L19 20 L8 21 L4 15 L1 15 L3 24 L1 33 L4 33 L8 27 L19 28 L15 43 L20 43 L28 28Z" fill="${k}"/>`;
I.handshake = (c, k) => `<path d="M4 20 L14 12 L22 16 L30 12 L44 20 L36 32 L26 38 L20 34 L12 30Z" fill="${k}"/><path d="M18 24 L26 30 M22 20 L30 26" stroke="${W}" stroke-width="2.5" stroke-linecap="round"/>`;
I.flame = (c, k) => `<path d="M24 44 Q10 40 12 27 Q14 18 20 12 Q20 22 26 22 Q22 12 30 4 Q30 16 36 22 Q40 30 36 38 Q32 44 24 44Z" fill="${c.a}"/><path d="M24 44 Q18 40 20 33 Q24 36 26 31 Q30 36 28 42Z" fill="#ffc83d"/>`;
I.paw = (c, k) => `<ellipse cx="24" cy="32" rx="11" ry="9" fill="${k}"/>${[[11, 20], [19, 12], [29, 12], [37, 20]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="5.5" fill="${k}"/>`).join('')}`;
I.hardhat = (c, k) => `<path d="M8 32 Q8 14 24 14 Q40 14 40 32Z" fill="#ffc83d"/><rect x="4" y="31" width="40" height="7" rx="3.5" fill="#e0a800"/><rect x="21" y="10" width="6" height="12" rx="2" fill="#e0a800"/>`;
I.home = (c, k) => `<path d="M6 24 L24 8 L42 24" fill="none" stroke="${k}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22 L12 42 L36 42 L36 22" fill="${k}"/><rect x="20" y="30" width="8" height="12" fill="${W}"/>`;
I.car = (c, k) => `<path d="M5 30 Q5 24 10 23 L14 15 Q15 13 18 13 L30 13 Q33 13 34 15 L38 23 Q43 24 43 30 L43 35 L5 35Z" fill="${k}"/><rect x="16" y="16" width="16" height="7" rx="2" fill="${GLASS}"/><circle cx="14" cy="36" r="5" fill="${INK}"/><circle cx="34" cy="36" r="5" fill="${INK}"/>`;
I.rupee = (c, k) => `<circle cx="24" cy="24" r="19" fill="#ffc83d"/><path d="M16 14 H32 M16 20 H32 M18 14 Q30 14 30 20 Q30 27 19 27 L30 37" fill="none" stroke="#b77d00" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`;

module.exports = { PALETTES, M, I, INK, W, METAL, METALD };
