import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const altText = z.string().min(12, 'Der Alt-Text beschreibt die Szene in einem Satz.');

// Seiten mit ihren Texten. Der Fliesstext steht unter den Angaben.
// Solange «freigegeben» auf false steht, ist der Eintrag ein Entwurf: Er wird auf der
// Testadresse geduldet, eine Veröffentlichung auf der richtigen Adresse schlägt fehl.
const seiten = defineCollection({
  loader: glob({ pattern: '*.md', base: './inhalt/seiten' }),
  schema: ({ image }) =>
    z
      .object({
        titel: z.string().min(1).refine((t) => !t.endsWith('.'), 'Titel enden ohne Punkt.'),
        // Titel und Beschreibung für Suchmaschinen und geteilte Links.
        seitentitel: z.string().min(10),
        beschreibung: z.string().min(50).max(160),
        lead: z.string().optional(),
        bild: image().optional(),
        bildAlt: altText.optional(),
        freigegeben: z.boolean(),
      })
      .refine((o) => !o.bild || o.bildAlt, { path: ['bildAlt'], message: 'Jedes Bild braucht einen Alt-Text.' }),
});

export const collections = { seiten };
