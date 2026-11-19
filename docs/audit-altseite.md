# Audit der bestehenden Seite

Stand: 19. Nov. 26. Quelle: öffentlich erreichbare Seiten und `sitemap.xml` von www.sieunder-dessous.ch.
Nicht geprüft, weil ohne Zugang nicht möglich: Zugriffszahlen (Squarespace Analytics) und der tatsächliche Google-Index (Search Console).

## 1. Befund in Kürze

- System: Squarespace. Hauptadresse mit `www`.
- Umfang: fünf Inhaltsadressen plus Warenkorb. Navigation zeigt nur «Start» und «Über uns».
- Zwei Seiten sind nicht verlinkt aus der Navigation: `/marken` (gar nicht) und `/brustprothesen1` (nur über einen Knopf auf der Startseite).
- Kein Impressum, keine AGB. Datenschutzerklärung ohne Datum, erwähnt Cookies ohne Zweck.
- Kein Formular, kein Newsletter, keine Terminbuchung. Kontakt über Telefon und `mailto` mit vorbelegtem Betreff.
- Warenkorb-Symbol im Kopf ohne Funktion dahinter (Überbleibsel der Vorlage).

## 2. URL-Inventar

| Adresse | Titel | In Navigation | Letzte Änderung | Bilder |
|---|---|---|---|---|
| `/` bzw. `/home` | Sie&Er Dessous | ja | 02. Aug. 26 | 1 |
| `/geschaeft` | Unser Geschäft — Sie&Er Dessous | ja («Über uns») | 26. Apr. 26 | 1 |
| `/marken` | Unsere Marken — Sie&Er Dessous | nein | 28. Sep. 25 | 14 |
| `/brustprothesen1` | Brustprothesen \| Fühl dich schön – Jetzt informieren — Sie&Er Dessous | nein (Knopf auf Start) | 30. Sep. 25 | 1 |
| `/datenschutz` | Datenschutzerklärung | Fusszeile | 28. Sep. 25 | 0 |
| `/cart` | Warenkorb | Symbol im Kopf | – | 0 |

## 3. Inhalte je Seite

**Start.** Titelzeile «Moderne und hochwertige Dessousmode in Amriswil», Leitsatz «Wohlfühlen beginnt innen.», Hinweis auf den Mode-Apéro vom 13. Nov. 26 zum 20-jährigen Bestehen (inzwischen vorbei, steht noch), Markenliste, Teaser Brustprothesen, Adresse, Öffnungszeiten. Verweise auf Instagram (`sie_und_er_dessous`) und Facebook (`sieunderdessous`).

**Über uns.** Kurzer Begrüssungstext, unterzeichnet von Sandra Brivio und Denise Stoffner. Sortiment: Dessous, Damen- und Herrenwäsche für Tag und Nacht, Bademode, Homewear. Ein Ladenbild. Keine Geschichte, keine Jahreszahlen, keine Rollen.

**Marken.** 14 Einträge mit je einem Bild, keine Texte, keine Verweise.

**Brustprothesen.** Beratung durch die Inhaberin mit Spezialausbildung, Marke Anita, Einzeltermine montags nach Voranmeldung per Telefon oder Mail. Keine Angaben zu Ablauf, Dauer oder Kostenübernahme.

## 4. Schwächen, die die neue Seite beheben muss

1. **Keine H1** auf den geprüften Seiten, auf der Brustprothesen-Seite ist Fliesstext als H3 gesetzt.
2. **Markenlisten widersprechen sich.** Nur auf der Startseite: Hanro, Short Stories, Zeybra, Lidea, LingaDore. Nur auf `/marken`: L'aventure, Felina, Prima Donna, Naturana, Moya Kala, Anita Care. Auf beiden: Marie Jo, Mey, Anita, Dacapo, Simone Pérèle, Hom, Keine Schwester, Olaf Benz.
3. **Alt-Texte fehlen oder sind falsch** (Hauptbild Brustprothesen ohne, «Keine Schwester» beschreibt eine blaue Handtasche).
4. **Montag:** Öffnungszeiten sagen «geschlossen», die Brustprothesen-Seite bietet genau dann Termine. Inhaltlich eine Stärke (ungestört, diskret), heute liest es sich als Widerspruch.
5. **Veralteter Anlass** auf der Startseite. Zeitgesteuerte Hinweise lösen das.
6. **Rechtliches:** Impressum fehlt, Datenschutz undatiert.
7. **Vorschaubild für soziale Medien** ist auf allen Seiten dasselbe Ladenbild von 2013.
8. **Suchfläche:** keine Seite je Sortiment, je Marke oder für Herren. Der Titel der Startseite enthält weder Ort noch Angebot.

## 5. Was erhalten bleibt

- Leitsatz «Wohlfühlen beginnt innen.» als Kandidat für die Hauptaussage.
- Anrede «du» (so auf der bestehenden Seite).
- Brustprothesen-Beratung als eigener Kompetenzbereich, mit eigener Adresse.
- 20 Jahre Geschäft als Erzählanlass für «Über uns».
- Adresse, Telefon, Mail, Öffnungszeiten (vor Livegang bestätigen).

## 6. Redirect-Mapping (Entwurf, Zielstruktur noch nicht freigegeben)

| Alt | Neu | Bemerkung |
|---|---|---|
| `/` | `/` | |
| `/home` | `/` | steht so in der Sitemap |
| `/geschaeft` | `/ueber-uns/` | |
| `/marken` | `/marken/` | |
| `/brustprothesen1` | `/beratung/brustprothesen/` | |
| `/datenschutz` | `/datenschutz/` | |
| `/cart` | `/` | |

Hinweis: Ohne vorgeschalteten Dienst liefert GitHub Pages keine echten 301. Weiterleitungen sind dann HTML-Seiten mit sofortiger Weiterleitung und Canonical. Bei sieben Adressen vertretbar.

## 7. Noch zu sichern, bevor die alte Seite gelöscht wird

- [ ] Zugriffszahlen aus Squarespace: Besuche, Besucher, Aufrufe, Quellen, Geräte, Browser, Seiten, Jahresverlauf
- [ ] Indexierte Adressen und Suchbegriffe aus der Search Console (Domain-Property über DNS bestätigen)
- [ ] Bilder in Originalauflösung aus Squarespace
- [ ] DNS-Zone als Sicherung
- [ ] Wo liegen Domain und Postfach `info@`?
