# Stand und nächste Schritte

Stand: 20. Nov. 26

## Wo wir stehen

- **Repo:** `nbrivio/sieunder`, öffentlich. Jeder Push auf `main` baut, prüft und veröffentlicht.
- **Testseite:** https://nbrivio.github.io/sieunder/ (für Suchmaschinen gesperrt).
- **Unterbau:** wie aperozauber, ohne Formular und ohne Datenbank. Alle Prüfungen laufen grün.
- **Startseite:** in der Richtung «Gefühl vor Produkt» gebaut. Auftakt, Gefühlssatz, Marken, Collage, Laden, Wer dahinter steht, Beratung, Brustprothesen, Besuch.
- **Unterseiten:** Marken, Über uns, Beratung für Brustprothesen, Impressum, Datenschutz. Alle als Entwurf.
- **Alte Seite:** vollständig aufgenommen, siehe `audit-altseite.md`. Alle sieben alten Adressen haben ihr endgültiges Ziel.

## Was als Nächstes ansteht

1. **Startseite verfeinern.** Collage und Sätze am echten Gerät prüfen, Texte in eurer Stimme, Porträt einsetzen.
2. **Bildmaterial.** Neue Ladenbilder, ein ruhiges Video, Herrenbilder (bisher gibt es nur Damenmotive einer Marke).
3. **Unterseiten füllen.** Je Marke ein eigener Abschnitt, Texte in eurer Stimme, UID ins Impressum, Rechtstexte gegenlesen, dann freigeben.
4. **Vor dem Umzug.** Zugriffszahlen aus Squarespace sichern, Search Console über DNS bestätigen, Rechte der Herstellerbilder klären, Entscheid zum vorgeschalteten Dienst bestätigen.

## Wo was liegt

| Was | Wo |
| --- | --- |
| Texte der Startseite | `inhalt/start.json` |
| Texte der Unterseiten | `inhalt/seiten.json` |
| Adresse, Kontakt, Öffnungszeiten | `inhalt/betrieb.json` |
| Marken | `inhalt/marken.json` |
| Gestaltung der Startseite | `src/stile/seite.css`, `src/pages/index.astro` |
| Scrollbewegung und Live-Status | `src/skripte/bewegung.js` |
| Entscheide und offene Punkte | `docs/entscheide.md`, `docs/offene-entscheide.md` |
| Rohbilder und Briefing (nicht im Repo) | lokal im Projektordner, `Bilder/` |
