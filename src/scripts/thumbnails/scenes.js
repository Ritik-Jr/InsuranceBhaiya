// Character-scene thumbnails (flat people + props, purple/coral, no text) for learn articles
// that want an illustrated scene instead of the motif kit in art.js. Rendered by generate.js.
// Every scene is a full 1200x675 SVG; keep the top-left ~420x150 zone quiet (cards overlay a badge there).

const P = '#6a52d9', PD = '#4f3bb8', PM = '#5b45c9', PL = '#9d8cf2';
const C = '#ef6f58', CD = '#d3503b', CL = '#f9b4a6';
const INK = '#22222b', SKIN = '#f8c8a6', SKIND = '#eaa985', PAPER = '#f7f2f1', W = '#ffffff';
const BLOB = '#f2eeed', DOT = '#e7e1e0', METAL = '#b9b3c9';

// ---------------------------------------------------------------- background
const blob = (cx, cy, rx, ry) => `<path d="M${cx - rx} ${cy + ry * 0.1}
  C${cx - rx} ${cy - ry * 0.7} ${cx - rx * 0.45} ${cy - ry * 1.05} ${cx + rx * 0.05} ${cy - ry * 0.95}
  C${cx + rx * 0.6} ${cy - ry * 0.85} ${cx + rx * 1.02} ${cy - ry * 0.55} ${cx + rx} ${cy + ry * 0.05}
  C${cx + rx * 0.98} ${cy + ry * 0.7} ${cx + rx * 0.5} ${cy + ry} ${cx - rx * 0.05} ${cy + ry * 0.95}
  C${cx - rx * 0.6} ${cy + ry * 0.92} ${cx - rx} ${cy + ry * 0.75} ${cx - rx} ${cy + ry * 0.1}Z" fill="${BLOB}"/>`;
const frame = (inner, b = [600, 370, 450, 260], dots = [[250, 250, 34], [1010, 170, 26], [1060, 560, 18]]) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img">
<rect width="1200" height="675" fill="${W}"/>
${blob(...b)}
${dots.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${DOT}"/>`).join('')}
${inner}
</svg>`;
const line = (d, col = INK, w = 2.5) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const drop = (x, y, s = 1, col = P) => `<path transform="translate(${x},${y}) scale(${s})" d="M0 -14 Q9 0 0 8 Q-9 0 0 -14Z" fill="none" stroke="${col}" stroke-width="2.4"/>`;
const scribble = (x, y, w) => line(`M${x} ${y} q${w / 8} -9 ${w / 4} 0 t${w / 4} 0 t${w / 4} 0 t${w / 4} 0`, INK, 2.2);
const checkbox = (x, y, ticked) => `<rect x="${x}" y="${y}" width="26" height="26" rx="3" fill="none" stroke="${INK}" stroke-width="2.4"/>` +
  (ticked ? line(`M${x + 4} ${y + 12} L${x + 11} ${y + 21} L${x + 30} ${y - 6}`, C, 3) : '');

// ---------------------------------------------------------------- people
// Local frame: feet on y=0, ~380 tall at s=1, facing the viewer. "L" = viewer's left.
const limb = (pts, w, col, outline) => {
  const d = 'M' + pts.map(p => p.join(' ')).join(' L');
  return (outline ? `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 3.5}" stroke-linecap="round" stroke-linejoin="round"/>` : '') +
    `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const hand = (x, y, thumb) => `<circle cx="${x}" cy="${y}" r="11" fill="${SKIN}"/>` +
  (thumb ? `<rect x="${x - 4}" y="${y - 26}" width="9" height="20" rx="4.5" fill="${SKIN}"/>` + line(`M${x - 8} ${y - 2} h12 M${x - 8} ${y + 4} h12`, SKIND, 1.8) : '');
const shoe = ([fx, fy], col) => `<ellipse cx="${fx + (fx < 0 ? -9 : 9)}" cy="${fy + 6}" rx="22" ry="11" fill="${col}"/>`;

const HAIR = {
  curly: col => [[-24, -332, 14], [-6, -344, 16], [13, -342, 15], [27, -328, 12], [-30, -318, 9], [31, -314, 8]]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`).join('') +
    `<path d="M-31 -310 Q-32 -346 0 -346 Q32 -346 31 -310 Q20 -326 0 -324 Q-18 -326 -31 -310Z" fill="${col}"/>`,
  bob: col => `<path d="M-36 -292 Q-44 -352 0 -350 Q44 -352 36 -292 Q34 -284 26 -290 Q26 -312 22 -322 Q0 -330 -22 -322 Q-26 -312 -26 -290 Q-34 -284 -36 -292Z" fill="${col}"/>`,
};
const PONY = col => [[28, -348, 17], [42, -368, 19], [30, -390, 15], [54, -392, 16], [62, -372, 14], [46, -410, 12]]
  .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`).join('') +
  `<rect x="20" y="-350" width="16" height="9" rx="4" transform="rotate(-35 28 -346)" fill="${C}"/>`;

function person(o) {
  const { x, y, s = 1, shirt = P, pants = INK, shoes = C, hair = 'curly', hairC = INK } = o;
  const armL = o.armL || [[-56, -205], [-50, -150]];
  const armR = o.armR || [[56, -205], [50, -150]];
  const legL = o.legL || [[-22, -78], [-26, -14]];
  const legR = o.legR || [[22, -78], [26, -14]];
  const shirtArm = o.sleeve || shirt;
  return `<g transform="translate(${x},${y}) scale(${s})">
  ${o.behind || ''}
  ${limb([[-20, -150], ...legL], 32, pants)}${o.castR ? '' : limb([[20, -150], ...legR], 32, pants)}
  ${o.castR ? limb([[20, -150], legR[0]], 32, pants) + limb([legR[0], legR[1]], 32, W, true) +
      line(`M${legR[0][0] - 12} ${legR[0][1] + 16} l24 6 M${legR[0][0] - 10} ${legR[0][1] + 30} l24 6 M${legR[0][0] - 8} ${legR[0][1] + 44} l24 6`, METAL, 2.4) : ''}
  ${shoe(legL[1], shoes)}${o.castR ? '' : shoe(legR[1], shoes)}
  <path d="M-48 -162 L48 -162 L44 -124 L-44 -124Z" fill="${pants}"/>
  <path d="M-40 -268 C-58 -266 -62 -250 -60 -232 L-50 -150 Q-50 -138 -38 -138 L38 -138 Q50 -138 50 -150 L60 -232 C62 -250 58 -266 40 -268Z" fill="${shirt}"/>
  ${line('M-14 -266 Q0 -252 14 -266', INK, 2.4)}
  <rect x="-9" y="-292" width="18" height="28" rx="6" fill="${SKIND}"/>
  ${hair === 'pony' ? PONY(hairC) : ''}
  <circle cx="-30" cy="-308" r="7" fill="${SKIN}"/><circle cx="30" cy="-308" r="7" fill="${SKIN}"/>
  <circle cx="0" cy="-312" r="30" fill="${SKIN}"/>
  ${(HAIR[hair] || HAIR.curly)(hairC)}
  <circle cx="-10" cy="-310" r="3.2" fill="${INK}"/><circle cx="10" cy="-310" r="3.2" fill="${INK}"/>
  ${line('M-14 -320 q4 -3 8 0 M6 -320 q4 -3 8 0', INK, 2)}
  ${line('M1 -306 q4 5 -2 7', SKIND, 2.2)}
  ${line('M-8 -296 Q0 -289 8 -296', INK, 2.4)}
  <circle cx="-19" cy="-300" r="5" fill="${CL}" opacity="0.7"/><circle cx="19" cy="-300" r="5" fill="${CL}" opacity="0.7"/>
  ${o.mid || ''}
  ${limb([[-40, -258], ...armL], 22, shirtArm, true)}${limb([[40, -258], ...armR], 22, shirtArm, true)}
  ${o.noHandL ? '' : hand(...armL[1], o.thumbL)}${o.noHandR ? '' : hand(...armR[1], o.thumbR)}
  ${o.front || ''}
</g>`;
}

// ---------------------------------------------------------------- props
function clipboard(x, y, w, h, inner = '') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${P}"/>
  <rect x="${x + 22}" y="${y + 30}" width="${w - 44}" height="${h - 52}" rx="4" fill="${PAPER}"/>
  ${line(`M${x + w / 2 - 22} ${y - 6} Q${x + w / 2} ${y - 52} ${x + w / 2 + 22} ${y - 6}`, C, 2.6)}
  <rect x="${x + w / 2 - 52}" y="${y - 12}" width="104" height="32" rx="8" fill="${INK}"/>
  ${inner}`;
}
const shieldPath = (cx, cy, w, h) => `M${cx} ${cy - h / 2} L${cx + w / 2} ${cy - h / 2 + h * 0.16} L${cx + w / 2} ${cy}
  Q${cx + w / 2} ${cy + h * 0.36} ${cx} ${cy + h / 2} Q${cx - w / 2} ${cy + h * 0.36} ${cx - w / 2} ${cy} L${cx - w / 2} ${cy - h / 2 + h * 0.16}Z`;
const sparkle = (x, y, r, col = C) => line(`M${x} ${y - r} V${y + r} M${x - r} ${y} H${x + r}`, col, 2.6);

// ---------------------------------------------------------------- scenes
const SCENES = {};

// Tradesperson + "what's covered" checklist + a wet-floor slip hazard.
SCENES['liability-insurance-what-it-covers'] = () => frame(`
  ${clipboard(560, 140, 270, 420, `
    <path d="${shieldPath(695, 238, 74, 86)}" fill="${C}"/>
    ${line('M676 238 L690 252 L716 222', W, 6)}
    ${checkbox(606, 320, true)}${scribble(650, 334, 140)}
    ${checkbox(606, 382, true)}${scribble(650, 396, 120)}
    ${checkbox(606, 444, false)}${scribble(650, 458, 140)}
    ${line('M650 508 h70 M736 508 h24', INK, 2.2)}`)}
  ${person({
    x: 430, y: 612, s: 1.24, shirt: P,
    armL: [[-92, -230], [-112, -300]], thumbL: true,
    armR: [[80, -200], [50, -160]],
    legL: [[-26, -80], [-32, -14]], legR: [[26, -80], [36, -14]],
  })}
  <ellipse cx="925" cy="600" rx="120" ry="15" fill="${PL}" opacity="0.45"/>
  <g transform="rotate(-72 1010 582)"><path d="M984 556 L1036 556 L1030 610 L990 610Z" fill="${PM}"/><rect x="980" y="550" width="60" height="10" rx="5" fill="${PD}"/></g>
  ${drop(880, 560, 1)}${drop(950, 548, 0.8)}
  <path d="M872 600 L904 470 L936 600Z" fill="${C}"/>
  <path d="M893 515 L915 515 L921 540 L887 540Z M882 560 L926 560 L931 580 L877 580Z" fill="${W}"/>
  <rect x="858" y="596" width="92" height="12" rx="4" fill="${CD}"/>
  ${sparkle(1060, 300, 12)}${sparkle(300, 520, 9, P)}
  ${line('M985 230 q18 -24 40 -6', INK, 2.2)}`);

// Injured worker on a crutch (leg cast, arm sling) in front of a big medical shield.
SCENES['personal-accident-insurance-explained'] = () => frame(`
  <path d="${shieldPath(820, 330, 300, 360)}" fill="${P}"/>
  <path d="${shieldPath(820, 336, 240, 296)}" fill="none" stroke="${PL}" stroke-width="4"/>
  <rect x="790" y="250" width="60" height="170" rx="12" fill="${W}"/><rect x="735" y="305" width="170" height="60" rx="12" fill="${W}"/>
  ${line('M640 590 H700 L716 560 L736 618 L756 540 L774 590 H1080', C, 3)}
  ${person({
    x: 470, y: 612, s: 1.24, shirt: C, hair: 'curly',
    behind: `<path d="M-60 -250 L-80 -6" stroke="${METAL}" stroke-width="9" stroke-linecap="round"/>
      <rect x="-82" y="-262" width="44" height="14" rx="7" fill="${INK}" transform="rotate(-6 -60 -255)"/>`,
    armL: [[-64, -212], [-66, -176]],
    armR: [[50, -202], [-6, -210]],
    mid: `<path d="M60 -222 Q20 -190 -22 -222 L-22 -206 Q20 -170 62 -206Z" fill="${PL}"/>
      ${line('M56 -218 L20 -270', PL, 6)}`,
    legL: [[-22, -78], [-26, -14]], legR: [[28, -80], [44, -34]], castR: true,
    front: `<rect x="-24" y="-344" width="22" height="11" rx="4" transform="rotate(-22 -13 -338)" fill="${CL}"/>`,
  })}
  <g transform="rotate(32 1045 175)"><rect x="1000" y="160" width="90" height="30" rx="15" fill="${CL}"/><rect x="1030" y="160" width="30" height="30" fill="${C}" opacity="0.55"/></g>
  <g transform="rotate(-28 640 170)"><rect x="610" y="158" width="60" height="24" rx="12" fill="${W}" stroke="${INK}" stroke-width="2.2"/><path d="M640 158 h18 a12 12 0 0 1 0 24 h-18Z" fill="${C}"/></g>
  ${sparkle(300, 330, 10, P)}${sparkle(1100, 420, 11)}
  ${line('M262 470 q-20 -16 -6 -36', INK, 2.2)}`, [600, 380, 460, 255]);

// Owner holding an umbrella over her dog in the rain, policy clipboard under one arm.
function dog(x, y) {
  const T = '#e9a15d', TD = '#c97f3c', TL = '#f7d6b3', EAR = '#7a4a2a';
  return `<g transform="translate(${x},${y})">
  ${line('M-78 -40 Q-130 -60 -112 -120', TD, 16)}
  <ellipse cx="-30" cy="-62" rx="78" ry="62" fill="${T}"/>
  <ellipse cx="34" cy="-104" rx="46" ry="80" fill="${T}" transform="rotate(14 34 -104)"/>
  <ellipse cx="-58" cy="-6" rx="38" ry="12" fill="${TD}"/>
  <rect x="8" y="-90" width="24" height="92" rx="12" fill="${TD}"/><rect x="40" y="-90" width="24" height="92" rx="12" fill="${T}"/>
  <ellipse cx="22" cy="-2" rx="17" ry="9" fill="${TL}"/><ellipse cx="54" cy="-2" rx="17" ry="9" fill="${TL}"/>
  <ellipse cx="38" cy="-112" rx="26" ry="44" fill="${TL}" transform="rotate(14 38 -112)"/>
  <path d="M10 -164 Q40 -150 74 -172 L76 -158 Q40 -134 8 -150Z" fill="${P}"/>
  <circle cx="44" cy="-146" r="9" fill="#f4c542"/>
  <circle cx="50" cy="-210" r="52" fill="${T}"/>
  <ellipse cx="94" cy="-194" rx="32" ry="24" fill="${TL}"/>
  <ellipse cx="120" cy="-204" rx="10" ry="8" fill="${INK}"/>
  ${line('M118 -186 Q108 -172 92 -178', INK, 2.4)}
  <path d="M100 -178 Q104 -160 94 -158 Q86 -160 90 -176Z" fill="${C}"/>
  <circle cx="66" cy="-224" r="5.5" fill="${INK}"/>
  <path d="M20 -248 Q-6 -236 -4 -196 Q0 -170 18 -176 Q30 -200 38 -238Z" fill="${EAR}"/>
</g>`;
}
function umbrella(cx, cy, rot, pole) {
  const sc = [-210, -140, -70, 0, 70, 140, 210];
  const edge = sc.slice().reverse().slice(1).map((x, i, arr) => `Q${((i === 0 ? 210 : arr[i - 1]) + x) / 2} -26 ${x} 0`).join(' ');
  return `<g transform="translate(${cx},${cy}) rotate(${rot})">
  ${line(`M0 -150 L0 ${pole} q0 26 -22 22`, INK, 6)}
  <path d="M-210 0 Q-206 -146 0 -160 Q206 -146 210 0 ${edge}Z" fill="${C}"/>
  ${sc.slice(1, -1).map(x => line(`M0 -158 Q${x * 0.55} -110 ${x} 0`, CD, 2)).join('')}
  ${line('M0 -160 L0 -182', INK, 6)}
</g>`;
}
SCENES['pet-insurance-guide'] = () => frame(`
  ${person({
    x: 676, y: 612, s: 1.2, shirt: C, hair: 'pony',
    armL: [[-82, -212], [-92, -182]],
    armR: [[64, -200], [34, -206]],
    front: `<g transform="rotate(10 50 -200)"><rect x="12" y="-252" width="78" height="104" rx="8" fill="${P}"/>
      <rect x="22" y="-238" width="58" height="82" rx="2" fill="${PAPER}"/>
      ${checkbox(28, -228, true).replace(/width="26" height="26"/g, 'width="14" height="14"')}${line('M48 -222 h24 M48 -200 h24 M48 -178 h18', INK, 2)}
      </g>${hand(34, -206)}`,
  })}
  ${umbrella(500, 196, -18, 238)}
  ${hand(562, 384)}
  ${dog(392, 606)}
  <ellipse cx="420" cy="610" rx="170" ry="12" fill="${PL}" opacity="0.35"/>
  <path d="M620 316 c-14 -18 -40 -6 -28 14 l28 26 l28 -26 c12 -20 -14 -32 -28 -14Z" fill="${C}" transform="rotate(8 620 330)"/>
  ${[[230, 230], [280, 330], [215, 420], [330, 180], [880, 210], [960, 300], [1040, 250], [900, 400], [1010, 430]].map(([x, y], i) => drop(x, y, i % 2 ? 0.9 : 1.15)).join('')}
  <g transform="translate(1000,540)"><circle r="44" fill="${PL}" opacity="0.55"/>
    <ellipse cx="0" cy="8" rx="15" ry="12" fill="${W}"/>${[[-17, -9], [-6, -19], [6, -19], [17, -9]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="6" ry="7.5" fill="${W}"/>`).join('')}</g>`);

// New homeowner holding a sealed property deed beside her house, with the keys.
SCENES['title-insurance-do-you-need-it'] = () => frame(`
  <circle cx="262" cy="568" r="44" fill="${PL}"/><circle cx="300" cy="580" r="32" fill="${PL}"/>
  <path d="M290 600 L290 420 L400 420 L400 600Z" fill="${PM}"/>
  ${[312, 334, 356, 378].map(x => line(`M${x} 440 V600`, PD, 2)).join('')}
  <path d="M400 420 L480 330 L370 330 L290 420Z" fill="${PD}"/>
  ${[0, 1, 2, 3].map(i => line(`M${312 + i * 24} 420 L${392 + i * 24} 330`, INK, 1.6)).join('')}
  <path d="M400 600 L400 420 L480 330 L560 420 L560 600Z" fill="${P}"/>
  <rect x="452" y="440" width="12" height="44" rx="2" fill="${W}"/><rect x="496" y="440" width="12" height="44" rx="2" fill="${W}"/>
  <rect x="462" y="520" width="38" height="80" rx="2" fill="${W}"/>${line('M492 556 v10', INK, 2.4)}
  ${line('M250 604 H600', INK, 2)}
  <g transform="rotate(-38 640 240)">
    <circle cx="590" cy="240" r="30" fill="none" stroke="${C}" stroke-width="16"/>
    <rect x="616" y="232" width="124" height="16" rx="6" fill="${C}"/>
    <rect x="700" y="246" width="12" height="22" rx="3" fill="${C}"/><rect x="722" y="246" width="12" height="16" rx="3" fill="${C}"/>
  </g>
  ${person({
    x: 790, y: 612, s: 1.2, shirt: C, hair: 'bob',
    armL: [[-76, -206], [-66, -214]], armR: [[76, -206], [66, -214]], noHandL: true, noHandR: true,
    front: `<g transform="rotate(-5 0 -200)">
      <rect x="-82" y="-284" width="164" height="150" rx="6" fill="${PAPER}" stroke="${INK}" stroke-width="2.4"/>
      ${line('M-60 -258 h120', INK, 3)}${scribble(-60, -232, 110)}${scribble(-60, -208, 90)}${line('M-60 -184 h50', INK, 2.2)}
      <path d="M36 -170 l-10 36 l14 -8 l8 14 l6 -38Z M50 -170 l10 36 l-14 -8 l-8 14 l-6 -38Z" fill="${CD}"/>
      <circle cx="43" cy="-176" r="20" fill="${C}"/><circle cx="43" cy="-176" r="12" fill="none" stroke="${W}" stroke-width="2.4"/>
      </g>${hand(-74, -214)}${hand(70, -218)}`,
  })}
  ${sparkle(640, 470, 10, P)}${sparkle(1060, 240, 12)}
  ${line('M1000 470 q20 -18 42 0', INK, 2.2)}${line('M620 140 q-14 18 4 34', INK, 2.2)}`, [620, 370, 470, 255], [[230, 300, 30], [1030, 160, 26], [1080, 560, 18]]);

module.exports = { SCENES };
