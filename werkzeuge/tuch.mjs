// Rechnet das Lichtbild des Tuchs: Glanz und Schatten der Falten als graues Bild, das über Stoff und Karte gelegt wird.
// Mittleres Grau lässt die Farbe darunter unverändert, helleres hellt auf, dunkleres schattet ab.
// Aufruf: npm run tuch. Nötig nach jeder Änderung an src/inhalt/tuch.js.
import sharp from 'sharp';
import { FLAECHE, neigung, umriss } from '../src/inhalt/tuch.js';

const GROSS = 2000;
const KLEIN = 1000;
const rand = umriss();

// Liegt der Punkt auf dem Tuch?
function innen(x, y) {
  let drin = false;
  for (let i = 0, j = rand.length - 1; i < rand.length; j = i++) {
    const [xi, yi] = rand[i];
    const [xj, yj] = rand[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) drin = !drin;
  }
  return drin;
}

const norm = (v) => {
  const l = Math.hypot(...v);
  return v.map((k) => k / l);
};
const licht = norm([-0.55, -0.62, 0.56]);
const halb = norm([licht[0], licht[1], licht[2] + 1]);
const GLANZ = 14;
const flach = licht[2];
const flachGlanz = halb[2] ** GLANZ;

const bild = Buffer.alloc(GROSS * GROSS * 2);
for (let py = 0; py < GROSS; py++) {
  for (let px = 0; px < GROSS; px++) {
    const u = (px + 0.5) / GROSS;
    const v = (py + 0.5) / GROSS;
    const i = (py * GROSS + px) * 2;
    if (!innen(FLAECHE.x + u * FLAECHE.seite, FLAECHE.y + v * FLAECHE.seite)) continue;
    const [hx, hy] = neigung(u, v);
    const n = norm([-hx, -hy, 1]);
    const matt = n[0] * licht[0] + n[1] * licht[1] + n[2] * licht[2];
    const glanz = Math.max(0, n[0] * halb[0] + n[1] * halb[1] + n[2] * halb[2]) ** GLANZ;
    // Feines Gewebe: zwei Fadenrichtungen, kaum sichtbar.
    const gewebe = 0.012 * Math.sin(px * 1.9) * Math.sin(py * 1.9);
    const roh = (matt - flach) * 0.5 + (glanz - flachGlanz) * 0.42;
    // Schatten bleiben weich und farbig statt schwarz, Glanz darf heller werden.
    const wert = 0.5 + (roh < 0 ? Math.max(roh, -0.6) * 0.38 : Math.min(roh, 0.6) * 0.62) + gewebe;
    bild[i] = Math.max(0, Math.min(255, Math.round(wert * 255)));
    bild[i + 1] = 255;
  }
}

await sharp(bild, { raw: { width: GROSS, height: GROSS, channels: 2 } })
  .resize(KLEIN, KLEIN)
  .png({ compressionLevel: 9 })
  .toFile(new URL('../src/assets/bilder/tuch-licht.png', import.meta.url).pathname);
console.log('Lichtbild des Tuchs geschrieben.');
