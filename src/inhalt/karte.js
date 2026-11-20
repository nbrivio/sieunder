import { z } from 'astro/zod';
import roh from '../../inhalt/karte.json';

// Strassen rund um den Laden für den gezeichneten Lageplan. Verläufe und Grundrisse stammen aus OpenStreetMap und sind nicht erfunden.
const punkt = z.tuple([z.number(), z.number()]);
// Eine Linie oder ein Umriss als «x,y x,y», Meter ab dem Laden.
const linie = z.string().regex(/^(-?[\d.]+,-?[\d.]+ )+-?[\d.]+,-?[\d.]+$/, 'Punkte als «x,y x,y»');
const schema = z.object({
  quelle: z.string().min(1),
  laden: punkt,
  bahnhof: punkt,
  marktplatz: punkt,
  wege: z
    .array(z.object({ name: z.string().min(1), art: z.enum(['weg-zu-uns', 'haupt', 'neben']), punkte: z.string().regex(/^(-?\d+,-?\d+ )+-?\d+,-?\d+$/, 'Punkte als «x,y x,y»') }))
    .min(3),
  // Grundrisse entlang der Bahnhofstrasse, um Bahnhof und Marktplatz; Gleise, Grünflächen und die Umrisse der drei Orte.
  bauten: z.array(linie).min(1),
  gleise: z.array(linie).min(1),
  gruen: z.array(linie),
  marktplatzForm: linie,
  ladenForm: linie,
  bahnhofForm: linie,
});

export const karte = schema.parse(roh);
