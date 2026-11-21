import { z } from 'astro/zod';
import roh from '../../inhalt/seiten.json';
import { istLive } from './stufe.js';

// Texte der Unterseiten. Jede hat einen eigenen Titel und eine eigene Beschreibung für Suchmaschinen.
const titel = z.string().min(1).max(60).refine((t) => !/\.\*?$/.test(t), 'Titel enden ohne Punkt.');
const kopf = { seitentitel: z.string().min(10).max(60), beschreibung: z.string().min(50).max(160), titel };
const teile = z.array(z.object({ titel, text: z.array(z.string().min(1)).min(1) })).min(1);

const schema = z.object({
  // Solange hier false steht, sind die Unterseiten Entwürfe: auf der Testadresse geduldet, auf der richtigen Adresse bricht der Bau ab.
  freigegeben: z.boolean(),
  marken: z.object({ ...kopf, lead: z.string().min(10).max(200) }),
  ueber: z.object({ ...kopf, ladenTitel: titel }),
  brust: z.object({ ...kopf, mehrTitel: titel, mehr: z.array(z.string().min(40).max(400)).min(1).max(3), ablaufTitel: titel, ablauf: z.array(z.object({ titel, text: z.string().min(10).max(160) })).length(3) }),
  impressum: z.object({ ...kopf, teile }),
  datenschutz: z.object({ ...kopf, stand: z.string().regex(/^\d{1,2}\. [A-Z][a-zä]{2}\. \d{2}$/, 'Datum als TT. Mon. JJ'), teile }),
});

export const seiten = schema.parse(roh);

if (istLive && !seiten.freigegeben) {
  throw new Error('Die Texte der Unterseiten sind noch nicht freigegeben (inhalt/seiten.json).');
}
