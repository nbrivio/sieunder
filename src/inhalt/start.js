import { z } from 'astro/zod';
import roh from '../../inhalt/start.json';

// Alle Texte der Startseite. Ein Teil zwischen Sternen wird kursiv gesetzt.
// Titel enden ohne Punkt, Sätze haben eine Obergrenze, damit sie auf dem Handy nicht ausufern.
const titel = z.string().min(1).max(60).refine((t) => !/\.\*?$/.test(t), 'Titel enden ohne Punkt.');
const satz = z.string().min(20).max(110);
const absatz = z.string().min(20).max(260);

const schema = z.object({
  seitentitel: z.string().min(10),
  beschreibung: z.string().min(50).max(160),
  // Solange hier false steht, ist die Seite ein Entwurf: auf der Testadresse geduldet, auf der richtigen Adresse bricht der Bau ab.
  freigegeben: z.boolean(),
  titel,
  lead: z.string().min(10).max(90),
  satz,
  markenTitel: titel,
  collage: satz,
  laden: z.object({ titel, text: absatz }),
  menschen: z.object({ etikett: titel, namen: titel, text: absatz, bildHinweis: z.string().min(1).optional() }),
  beratung: z.object({ etikett: titel, satz }),
  brust: z.object({
    etikett: titel,
    satz,
    text: absatz,
    punkte: z.array(z.object({ begriff: z.string().min(1).max(40), text: z.string().min(1).max(120) })).min(1).max(4),
  }),
  // Der handgeschriebene Gruss im Fuss. Nach einer Änderung: npm run handschrift.
  gruss: z.object({ zeile: z.string().min(3).max(40), namen: z.string().min(3).max(30) }),
  besuch: titel,
});

export const start = schema.parse(roh);

/** Zerlegt «vor *betont* nach» in Teile, damit die Vorlage ohne rohes HTML auskommt. */
export function teile(text) {
  return text.split(/(\*[^*]+\*)/).filter(Boolean).map((t) => (t.startsWith('*') ? { t: t.slice(1, -1), betont: true } : { t, betont: false }));
}
