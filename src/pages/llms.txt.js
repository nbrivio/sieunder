// Kurze, sachliche Beschreibung für Assistenten. Alles stammt aus denselben Inhaltsdateien wie die Seiten.
import { betrieb, zeitenZeilen } from '../inhalt/betrieb.js';
import { marken } from '../inhalt/marken.js';
import { pfad } from '../inhalt/pfad.js';

export function GET({ site }) {
  const voll = (ziel) => new URL(pfad(ziel), site).href;
  const zeilen = [
    `# ${betrieb.name}`,
    '',
    `> Fachgeschäft für Dessous, Wäsche, Nachtwäsche und Bademode für Frauen und Männer in ${betrieb.plz} ${betrieb.ort} (Kanton Thurgau, Schweiz), mit persönlicher Beratung im Laden. Kein Onlineverkauf.`,
    '',
    '## Marken',
    '',
    marken.map((m) => m.name).join(', '),
    '',
    '## Öffnungszeiten',
    '',
    ...zeitenZeilen.map((z) => `- ${z.tage}: ${z.text}`),
    '',
    '## Kontakt',
    '',
    `- Adresse: ${betrieb.firma}, ${betrieb.strasse}, ${betrieb.plz} ${betrieb.ort}, Schweiz`,
    `- Telefon: ${betrieb.telefon}`,
    `- E-Mail: ${betrieb.email}`,
    '',
    '## Seiten',
    '',
    `- [Startseite](${voll('/')})`,
    '',
  ];
  return new Response(zeilen.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
