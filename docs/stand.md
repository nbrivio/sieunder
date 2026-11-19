# Stand und nächste Schritte

Stand: 20. Nov. 26

## Wo wir stehen

- **Repo:** `nbrivio/sieunder`, öffentlich. Jeder Push auf `main` baut, prüft und veröffentlicht.
- **Testseite:** https://nbrivio.github.io/sieunder/ (für Suchmaschinen gesperrt).
- **Unterbau:** wie aperozauber, ohne Formular und ohne Datenbank. Alle Prüfungen laufen grün.
- **Startseite:** in der Richtung «Gefühl vor Produkt» gebaut. Auftakt, Gefühlssatz, Marken, Collage, Laden, Wer dahinter steht, Beratung, Brustprothesen, Besuch.
- **Alte Seite:** vollständig aufgenommen, siehe `audit-altseite.md`. Sieben alte Adressen kommen an, vier davon vorläufig auf der Startseite.

## Was als Nächstes ansteht

1. **Startseite verfeinern.** Collage und Sätze am echten Gerät prüfen, Texte in eurer Stimme, Porträt einsetzen.
2. **Bildmaterial.** Neue Ladenbilder, ein ruhiges Video, Herrenbilder (bisher gibt es nur Damenmotive einer Marke).
3. **Unterseiten.** Marken (je Marke eigener Inhalt), Beratung mit Brustprothesen, Über uns, Impressum, Datenschutz. Danach die vier vorläufigen Weiterleitungen auf ihre Zielseiten umstellen.
4. **Vor dem Umzug.** Zugriffszahlen aus Squarespace sichern, Search Console über DNS bestätigen, Rechte der Herstellerbilder klären, Entscheid zum vorgeschalteten Dienst bestätigen.

## Wo was liegt

| Was | Wo |
| --- | --- |
| Texte der Startseite | `inhalt/start.json` |
| Adresse, Kontakt, Öffnungszeiten | `inhalt/betrieb.json` |
| Marken | `inhalt/marken.json` |
| Gestaltung der Startseite | `src/stile/seite.css`, `src/pages/index.astro` |
| Scrollbewegung und Live-Status | `src/skripte/bewegung.js` |
| Entscheide und offene Punkte | `docs/entscheide.md`, `docs/offene-entscheide.md` |
| Rohbilder und Briefing (nicht im Repo) | lokal im Projektordner, `Bilder/` |
