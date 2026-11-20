import { z } from 'astro/zod';
import roh from '../../inhalt/karte.json';

// Strassen rund um den Laden für die gestickte Karte. Die Verläufe stammen aus OpenStreetMap und sind nicht erfunden.
const punkt = z.tuple([z.number(), z.number()]);
const schema = z.object({
  quelle: z.string().min(1),
  laden: punkt,
  bahnhof: punkt,
  marktplatz: punkt,
  wege: z
    .array(z.object({ name: z.string().min(1), art: z.enum(['weg-zu-uns', 'haupt', 'neben']), punkte: z.string().regex(/^(-?\d+,-?\d+ )+-?\d+,-?\d+$/, 'Punkte als «x,y x,y»') }))
    .min(3),
});

export const karte = schema.parse(roh);
