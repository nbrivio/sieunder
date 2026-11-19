import { z } from 'astro/zod';
import roh from '../../inhalt/betrieb.json';

const uhr = z.string().regex(/^\d{2}:\d{2}$/, 'Uhrzeit als HH:MM');
const wochentag = z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

// Eine Quelle für Name, Ort, Kontakt und Öffnungszeiten: Seite, Fuss und strukturierte Daten lesen hier.
const schema = z.object({
  name: z.string().min(1),
  firma: z.string().min(1),
  strasse: z.string().min(1),
  plz: z.string().regex(/^\d{4}$/),
  ort: z.string().min(1),
  land: z.string().length(2),
  email: z.email(),
  telefon: z.string().regex(/^\+41 \d{2} \d{3} \d{2} \d{2}$/),
  instagram: z.url(),
  facebook: z.url(),
  zeiten: z
    .array(
      z.object({
        tage: z.string().min(1),
        wochentage: z.array(wochentag).min(1),
        // Leer heisst geschlossen. Jedes Paar ist «von, bis» und muss aufsteigend sein.
        offen: z.array(z.tuple([uhr, uhr]).refine(([von, bis]) => von < bis, '«von» liegt nach «bis».')),
      }),
    )
    .min(1),
});

export const betrieb = schema.parse(roh);

/** Telefonnummer für die Anzeige: geschützte Leerzeichen, damit sie nie umbricht. */
export const telefonAnzeige = betrieb.telefon.replaceAll(' ', '\u00a0');

/** Telefonnummer für tel:-Verweise, ohne Leerzeichen. */
export const telefonZiel = `tel:${betrieb.telefon.replaceAll(' ', '')}`;

/** «09:00» wird «9.00», so steht es im Laden an der Tür. */
const lesbar = (zeit) => zeit.replace(/^0/, '').replace(':', '.');

/** Öffnungszeiten als Zeilen für die Anzeige. */
export const zeitenZeilen = betrieb.zeiten.map(({ tage, offen }) => ({
  tage,
  text: offen.length === 0 ? 'geschlossen' : `${offen.map(([von, bis]) => `${lesbar(von)} bis ${lesbar(bis)}`).join(' und ')} Uhr`,
}));

/** Öffnungszeiten für die strukturierten Daten. */
export const zeitenDaten = betrieb.zeiten.flatMap(({ wochentage, offen }) =>
  offen.map(([opens, closes]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: wochentage, opens, closes })),
);
