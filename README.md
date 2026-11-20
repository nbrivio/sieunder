# Sie&Er Dessous

Die Website von Sie&Er Dessous in Amriswil: statisch gebaut mit Astro, ausgeliefert über GitHub Pages. Reiner Markenauftritt, kein Shop, kein Formular.

## Arbeiten

Voraussetzung ist Node in der Version aus `.nvmrc`.

```sh
npm ci            # Abhängigkeiten nach Sperrdatei
npm run dev       # Vorschau unter http://localhost:4321
npm run pruefen   # bauen und alle Prüfungen laufen lassen
```

`npm run pruefen` braucht ein installiertes Google Chrome.

## Inhalte ändern

Alles, was sich ändert, liegt unter `inhalt/`, getrennt vom Code. Eine Änderung ist eine geänderte Datei und ein Push auf `main`.

| Datei | Inhalt |
| --- | --- |
| `inhalt/betrieb.json` | Name, Adresse, Kontakt und Öffnungszeiten. Kopf, Fuss, Startseite und strukturierte Daten lesen hier |
| `inhalt/marken.json` | Die geführten Marken. Mit `bild` (Datei unter `src/assets/bilder/marken/`) erscheint beim Überfahren des Namens ein Produktbild |
| `inhalt/hinweis.json` | Band für Ferien und Anlässe: `text`, `von`, `bis` (Datum als JJJJ-MM-TT). Ausserhalb des Zeitraums verschwindet es von selbst. Höchstens 88 Zeichen. Das Band steht fest am oberen Rand jeder Seite |
| `inhalt/start.json` | Alle Texte der Startseite. Ein Teil zwischen Sternen wird kursiv gesetzt |
| `inhalt/seiten.json` | Texte der Unterseiten samt Impressum und Datenschutz |

Der Bau prüft die Angaben. Er bricht ab, wenn ein Pflichtfeld fehlt, ein Bild keinen Alt-Text hat oder ein Datum nicht stimmt.

Die Texte der Startseite und der Unterseiten tragen `freigegeben`. Solange dort `false` steht, ist der Eintrag ein Entwurf. Auf der Testadresse wird er geduldet. Mit `SITE_STUFE=live` bricht der Bau ab, bis alles freigegeben ist.

## Aufbau

```
inhalt/        Inhalte (siehe oben)
src/assets/    Bilder, Schriften, Logo
src/stile/     Token, Grundstile, Startseite
src/skripte/   Scrollbewegung und Live-Status
src/layouts/   Seitengerüst mit Kopfangaben und strukturierten Daten
src/components/ Leiste, Fuss, Hinweisband
src/pages/     Seiten
src/inhalt/    Einlesen und Prüfen der Inhalte
pruefungen/    Prüfungen vor jeder Veröffentlichung
docs/          Stand, Audit der alten Seite, Entscheide, offene Punkte
```

## Prüfungen

| Befehl | Prüft |
| --- | --- |
| `pruefen:html` | Gültiges HTML |
| `pruefen:gate` | Kopfangaben, eine `h1`, Überschriftenfolge, Alt-Texte, Bildmasse, tote Verweise, Schreibweise, strukturierte Daten, Sitemap |
| `pruefen:umstellung` | Jede Adresse der alten Seite kommt an. Auf der richtigen Adresse zeigt alles auf `www.sieunder-dessous.ch` |
| `pruefen:kontrast` | Farbpaare aus `pruefungen/kontrast.json` gegen ihre Schwelle |
| `pruefen:vermerke` | Dateien, gebaute Seite und Commit-Texte auf Werkzeug-Vermerke |
| `pruefen:abhaengigkeiten` | Bekannte Sicherheitslücken, mit begründeten und befristeten Ausnahmen |
| `pruefen:browser` | Fünf Bildschirmbreiten in Chrome: kein Überlauf, keine Fehler, keine Abrufe nach aussen, WCAG 2.2 AA, Tastatur und Fokus. Dazu jede Seite ohne JavaScript |
| `pruefen:ladezeit` | Startseite wie auf einem mittleren Handy: grösstes Element unter 2,5 s, Layoutsprung unter 0,1, Gewicht unter 1 MB |

Hausregeln im Gate: kein ß, keine Gedankenstriche, Guillemets statt gerader Anführungszeichen, keine Platzhalter, Titel ohne Punkt am Schluss, Marke immer als «Sie&Er».

## Veröffentlichung

Jeder Push auf `main` baut, prüft und veröffentlicht (`.github/workflows/seite.yml`). Schlägt eine Prüfung fehl, bleibt die bisherige Fassung online. Ein täglicher Neubau hält das Hinweisband aktuell.

Einmalig in den Einstellungen des Repositorys:

1. **Pages**: unter «Build and deployment» als Quelle «GitHub Actions» wählen.
2. **Branches**: `main` schützen, Änderungen nur über Pull Request mit bestandener Prüfung «Bauen und prüfen».
3. **Security**: Dependabot-Meldungen und Sicherheitsupdates einschalten.

Drei Variablen (Settings, Variables, Actions) steuern die Adresse. Ohne sie läuft die Testadresse.

| Variable | Testadresse (Voreinstellung) | Nach dem Umzug |
| --- | --- | --- |
| `SITE_ADRESSE` | `https://<konto>.github.io` | `https://www.sieunder-dessous.ch` |
| `SITE_PFAD` | `/sieunder` | `/` |
| `SITE_STUFE` | `test` | `live` |

In der Stufe `test` sperren `robots.txt` und die Seiten selbst alle Suchmaschinen.

## Sicherheit

- Keine Tracker, keine fremden Skripte, keine fremden Schriften, keine Cookies, kein Formular. Die Seite überträgt nichts.
- Content Security Policy als Meta-Angabe mit Prüfsummen, Grundregel `default-src 'none'`. GitHub Pages erlaubt keine eigenen Server-Kopfzeilen.
- Das Repository ist öffentlich. Rohbilder und Arbeitsunterlagen bleiben lokal, siehe `.gitignore`.
- Bewegung läuft nur mit Skript und nur, wenn keine reduzierte Bewegung gewünscht ist. Ohne beides steht die Seite ruhig untereinander.
- Abhängigkeiten mit festen Versionen und Sperrdatei, Einrichtung ohne Installationsskripte, wöchentliche Aktualisierungsvorschläge.
- Workflow-Schritte sind auf Commit-Kennungen festgelegt, Rechte je Job auf das Nötige beschränkt.
