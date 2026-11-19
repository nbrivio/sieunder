import { defineConfig } from 'astro/config';
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { weiterleitungen } from './src/inhalt/weiterleitungen.js';

// Adresse und Unterpfad kommen aus der Umgebung, damit dieselbe Quelle auf der Testadresse
// und später auf www.sieunder-dessous.ch läuft. Die bisherige Seite ist unter www indexiert,
// deshalb bleibt www die Hauptadresse (Canonical, Sitemap, strukturierte Daten).
const site = process.env.SITE_ADRESSE ?? 'https://www.sieunder-dessous.ch';
const base = process.env.SITE_PFAD ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: Object.fromEntries(
    Object.entries(weiterleitungen).map(([von, nach]) => [von, `${base.replace(/\/$/, '')}${nach}`]),
  ),
  markdown: { syntaxHighlight: false },
  integrations: [
    sitemap({
      // Interne Arbeitsseiten gehören nicht in die Sitemap.
      filter: (seite) => !seite.includes('/grundlagen/'),
    }),
    {
      // Die bisherige Seite lieferte ihre Sitemap unter /sitemap.xml. Wer sie so eingereicht hat, findet sie weiter dort.
      name: 'sitemap-alter-pfad',
      hooks: {
        'astro:build:done': ({ dir }) => {
          const ordner = fileURLToPath(dir);
          copyFileSync(`${ordner}sitemap-index.xml`, `${ordner}sitemap.xml`);
        },
      },
    },
  ],
  security: {
    // GitHub Pages erlaubt keine eigenen Server-Kopfzeilen, deshalb als Meta-Angabe.
    // Stile und Skripte werden beim Bau mit Prüfsummen eingetragen. Die Seite spricht mit keinem Server.
    csp: {
      directives: [
        "default-src 'none'",
        "img-src 'self' data:",
        "font-src 'self'",
        "media-src 'self'",
        "manifest-src 'self'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
