// Wandelt den Gruss aus inhalt/start.json in Linien um, die sich auf der Seite selbst schreiben.
// Es ist eine erfundene Schreibschrift und bewusst keine echte Unterschrift: Eine echte liesse sich abzeichnen.
// Aufruf: npm run handschrift. Nötig nach jeder Änderung am Gruss.
import { readFileSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';

const daten = readFileSync(new URL('./schriften/windsong-latin-400-normal.woff', import.meta.url));
const schrift = opentype.parse(daten.buffer.slice(daten.byteOffset, daten.byteOffset + daten.byteLength));
const { gruss } = JSON.parse(readFileSync(new URL('../inhalt/start.json', import.meta.url), 'utf8'));
const GROESSE = 100;
const rund = (zahl) => Math.round(zahl * 10) / 10;

const zeilen = [gruss.zeile, gruss.namen].map((text) => {
  const pfade = [];
  let x = 0;
  let oben = Infinity;
  let unten = -Infinity;
  let rechts = 0;
  const zeichen = schrift.stringToGlyphs(text);
  zeichen.forEach((glyphe, i) => {
    const pfad = glyphe.getPath(x, 0, GROESSE);
    const d = pfad.toPathData(1);
    if (d) {
      const rahmen = pfad.getBoundingBox();
      oben = Math.min(oben, rahmen.y1);
      unten = Math.max(unten, rahmen.y2);
      rechts = Math.max(rechts, rahmen.x2);
      pfade.push(d);
    }
    const naechste = zeichen[i + 1];
    x += (glyphe.advanceWidth + (naechste ? schrift.getKerningValue(glyphe, naechste) : 0)) * (GROESSE / schrift.unitsPerEm);
  });
  const rand = 6;
  return { text, rahmen: [-rand, rund(oben - rand), rund(rechts + 2 * rand), rund(unten - oben + 2 * rand)].join(' '), pfade };
});

writeFileSync(new URL('../src/inhalt/handschrift.json', import.meta.url), `${JSON.stringify({ zeilen }, null, 1)}\n`);
console.log(`✓ Handschrift: ${zeilen.map((z) => `«${z.text}» ${z.pfade.length} Zeichen`).join(', ')}`);
