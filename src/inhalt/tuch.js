// Das Tuch, auf dem die Karte liegt: ein Seidentuch von oben, leicht zerknittert.
// Aus derselben Faltenlandschaft entstehen das Lichtbild (werkzeuge/tuch.mjs) und der Verzug der Karte,
// damit Strassen und Schrift den Falten folgen wie ein Muster auf echtem Stoff.

// Fester Zufall: Das Tuch fällt bei jedem Bau gleich.
function zufall(saat) {
  let a = saat;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const wuerfel = zufall(86);
const zwischen = (von, bis) => von + (bis - von) * wuerfel();

// Falten laufen von einer Stelle nahe der Mitte nach aussen, dazu ein paar freie Knicke.
const falten = [];
for (let i = 0; i < 8; i++) {
  const winkel = (i / 8) * Math.PI * 2 + zwischen(-0.3, 0.3);
  falten.push({ x: 0.5 + zwischen(-0.07, 0.07), y: 0.53 + zwischen(-0.07, 0.07), winkel, mitte: zwischen(0.2, 0.34), laenge: zwischen(0.2, 0.34), breite: zwischen(0.03, 0.07), bogen: zwischen(-1.2, 1.2), hoch: zwischen(0.5, 1) * (i % 3 === 0 ? -1 : 1) });
}
for (let i = 0; i < 5; i++) {
  falten.push({ x: zwischen(0.12, 0.88), y: zwischen(0.12, 0.88), winkel: zwischen(0, Math.PI), mitte: 0, laenge: zwischen(0.1, 0.2), breite: zwischen(0.02, 0.04), bogen: zwischen(-2, 2), hoch: zwischen(-0.5, 0.5) });
}

// Höhe des Stoffs an einer Stelle, beide Achsen von 0 bis 1.
export function hoehe(u, v) {
  let h = 0.5 * Math.sin(u * 5.1 + v * 2.3 + 1.2) * Math.sin(v * 4.3 - u * 1.7 + 0.4) + 0.22 * Math.sin(u * 11 - v * 7 + 2);
  for (const f of falten) {
    const dx = u - f.x;
    const dy = v - f.y;
    const entlang = dx * Math.cos(f.winkel) + dy * Math.sin(f.winkel) - f.mitte;
    const quer = -dx * Math.sin(f.winkel) + dy * Math.cos(f.winkel) + f.bogen * entlang * entlang;
    h += f.hoch * Math.exp(-((quer / f.breite) ** 2)) * Math.exp(-((entlang / f.laenge) ** 2));
  }
  return h * 0.027;
}

const SCHRITT = 0.002;
export function neigung(u, v) {
  return [(hoehe(u + SCHRITT, v) - hoehe(u - SCHRITT, v)) / (2 * SCHRITT), (hoehe(u, v + SCHRITT) - hoehe(u, v - SCHRITT)) / (2 * SCHRITT)];
}

// Zeichenfläche der Karte (viewBox) und das Tuch darin.
export const FLAECHE = { x: -320, y: -532, seite: 720 };
export const RAND = 34;
const VERZUG = 42;

// Verschiebt einen Punkt der Karte so, wie ihn die Falten von oben gesehen verschieben würden.
export function verzogen(x, y, staerke = 1) {
  const u = (x - FLAECHE.x) / FLAECHE.seite;
  const v = (y - FLAECHE.y) / FLAECHE.seite;
  const [hx, hy] = neigung(u, v);
  return [x - hx * VERZUG * staerke, y - hy * VERZUG * staerke];
}

// Eine Linie in kurzen Stücken verziehen, damit sie in den Falten mitgeht.
export function linie(punkte, staerke = 1) {
  const aus = [];
  for (let i = 0; i < punkte.length - 1; i++) {
    const [ax, ay] = punkte[i];
    const [bx, by] = punkte[i + 1];
    const teile = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 9));
    for (let t = i ? 1 : 0; t <= teile; t++) aus.push(verzogen(ax + ((bx - ax) * t) / teile, ay + ((by - ay) * t) / teile, staerke));
  }
  return aus;
}

// Umriss des Tuchs: ein Quadrat mit weichen Ecken; die Kante gibt den Falten stärker nach als die Mitte.
export function umriss(einzug = 0) {
  const a = FLAECHE.x + RAND + einzug;
  const b = FLAECHE.y + RAND + einzug;
  const s = FLAECHE.seite - 2 * (RAND + einzug);
  const r = 14;
  const ecken = [];
  const bogen = (mx, my, start) => {
    for (let i = 0; i <= 6; i++) {
      const w = start + (i / 6) * (Math.PI / 2);
      ecken.push([mx + r * Math.cos(w), my + r * Math.sin(w)]);
    }
  };
  bogen(a + s - r, b + r, -Math.PI / 2);
  bogen(a + s - r, b + s - r, 0);
  bogen(a + r, b + s - r, Math.PI / 2);
  bogen(a + r, b + r, Math.PI);
  ecken.push(ecken[0]);
  return linie(ecken, 1.5);
}

export const alsPunkte = (punkte) => punkte.map(([x, y]) => `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`).join(' ');
