import { z } from 'astro/zod';
import roh from '../../inhalt/marken.json';

// Die geführten Marken, eine Quelle für Startseite, Markenseiten und Kurzfassung.
// «fuer» ordnet die Marke den Welten zu und ist im Laden zu bestätigen.
const schema = z
  .array(z.object({ name: z.string().min(1), fuer: z.array(z.enum(['sie', 'er'])).min(1) }))
  .min(1)
  .refine((liste) => new Set(liste.map((m) => m.name)).size === liste.length, 'Eine Marke steht doppelt in der Liste.');

export const marken = schema.parse(roh);
