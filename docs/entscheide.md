# Entscheide

Regel mit Begründung. Neue Einträge unten anfügen, mit Datum.

## 19. Nov. 26

1. **Schreibweise der Marke ist «Sie&Er Dessous».** So steht sie im Logo, im Seitentitel und im Firmennamen. Die Schreibweise «SIE & ER» aus dem Briefing gilt nicht.
2. **Kein Formular. Kontakt nur über Telefon und Mail.** Entspricht dem Betrieb, und es fallen Datenbank, Mail-Automatisierung und der zugehörige Teil der Datenschutzerklärung weg. Folge: Telefon und Mail müssen auf jeder Seite mit einem Griff erreichbar sein, auf dem Handy als antippbare Verweise.
3. **Kein Warenkorb, kein Shop.** Die Seite ist Markenauftritt und führt in den Laden.
4. **Kein vorgeschalteter Dienst, Stand heute.** Folge: keine eigenen Sicherheitskopfzeilen, keine Messung ausser der Suchkonsole, Weiterleitungen als HTML-Seiten. Wird vor dem Umhängen der Domain nochmals bestätigt, weil es danach nur mit Aufwand zu ändern ist.
5. **Zwei Bildquellen mit getrennten Aufgaben.** Stillleben der Hersteller (Produkt auf Stoff, ohne Modell) tragen Material, Sortiment und Marken. Eigene Aufnahmen tragen Laden, Team und Beratung, denn nur sie unterscheiden die Seite von anderen Händlern derselben Marken. Herstellerbilder nur mit geklärtem Recht, Saison und Ablaufdatum im Inventar; Varianten ohne eingesetztes Markenlogo bevorzugen; Druckdaten (CMYK) vor der Verwendung nach sRGB wandeln.
6. **Unterbau gemäss Playbook:** Astro statisch, GitHub Pages, Inhalte als geprüfte Daten, Qualitätstore bei jedem Push. Ohne Supabase.
7. **Hauptadresse bleibt mit `www`,** weil die alte Seite so indexiert ist.
8. **Geführte Marken (im Laden bestätigt):** Marie Jo, Mey, Anita, Hanro, Dacapo, Simone Pérèle, Short Stories, Hom, Zeybra, Lidea, LingaDore, Keine Schwester, Olaf Benz. Quelle für die Seite ist `inhalt/marken.json`. Die alte Seite `/marken` ist damit überholt (Prima Donna, Felina, L'aventure, Naturana, Moya Kala und Anita Care entfallen).
9. **Repository `nbrivio/sieunder`, öffentlich.** GitHub Pages ist im kostenlosen Konto nur für öffentliche Repositorys verfügbar. Folge: Rohbilder, Herstellerbilder ohne geklärtes Recht und Arbeitsunterlagen bleiben lokal (`.gitignore`). Ins Repository kommen nur Bilder, die auch auf der Seite erscheinen dürfen.
10. **Domain und Postfach liegen bei Hostpoint** und bleiben dort.

## 20. Nov. 26

11. **Gestaltungsrichtung: Gefühl vor Produkt.** Die Seite verkauft einen Zustand, kein Sortiment. Tragende Mittel: grosse ruhige Sätze, Bilder die am Satz vorbeiziehen, Worte die beim Scrollen scharf werden, ein Kopfbild das sich zur Karte zusammenzieht, eine schwebende Leiste. Vorbild für die Haltung ist sereinwealth.com.
12. **Typografie: Newsreader für Titel und Sätze, Schibsted Grotesk für Text.** Beide von der eigenen Adresse ausgeliefert. Farben aus den Bildern: Salbeipapier, Tinte, Koralle, Espresso, Rose.
13. **Keine 3D-Objekte, keine Lupe, kein Vorhang.** Geprüft und verworfen: Ein nachgebauter BH oder Verschluss transportiert kein Gefühl, die Lupe ist Spielerei, der Vorhang überzeugte nur halb.
14. **Marken stehen früh**, direkt nach dem ersten Satz.
15. **Pflichtkapitel der Startseite:** Laden mit eigenen Bildern, «Wer dahinter steht» (Sandra Brivio und Denise Stoffner, Porträt folgt), Beratung, Brustprothesen als eigenes ruhiges Kapitel.
16. **Bewegung nur mit Skript und nur ohne «reduzierte Bewegung».** Die Grundfassung steht ruhig untereinander; die Klasse `bewegt` schaltet die Scrollbewegungen ein. So bleibt die Seite ohne JavaScript vollständig.
17. **Marie-Jo-Bilder dürfen ins öffentliche Repo und auf die Testseite** (Entscheid Nicolas). Nutzungsrecht und Alter der Motive werden vor dem Livegang geklärt.
18. **Texte der Startseite liegen in `inhalt/start.json` und sind als Entwurf markiert.** Ein Bau für die richtige Adresse bricht ab, bis `freigegeben` auf `true` steht.
19. **Unterseiten:** `/marken/`, `/ueber-uns/`, `/beratung/brustprothesen/`, `/impressum/`, `/datenschutz/`. Ihre Texte liegen in `inhalt/seiten.json` und sind als Entwurf markiert. Damit hat jede alte Adresse ihr endgültiges Ziel: `/geschaeft` führt auf Über uns, `/brustprothesen1` auf die Beratungsseite, `/marken` und `/datenschutz` bleiben unter ihrer Adresse.
20. **Datenschutz ohne Cookies, Messung und Formular.** Die Erklärung nennt nur, was tatsächlich geschieht: die Auslieferung über GitHub Pages in den USA und den Kontakt per Telefon und Mail.
21. **Dunkle Flächen in Espresso, dem Braun des Logos, nicht in Grün.** Fuss, Hinweisband und Favicon sollen sich klar von aperozauber unterscheiden.
22. **Markennamen zeigen beim Überfahren ein Produktbild.** Gebaut, vorerst nur mit Bild für Marie Jo. Die Bilder der übrigen Marken liefert Nicolas nach; bis dahin reagiert nur ein Name.
23. **Handschrift als Schlusspunkt, in erfundener Schrift.** Im Fuss jeder Seite schreibt sich «Wir freuen uns auf dich, Sandra & Denise» Zeichen für Zeichen. Es ist bewusst keine echte Unterschrift: Eine echte liesse sich abzeichnen und fälschen. Die Linien entstehen aus der Schrift WindSong mit `npm run handschrift`.
24. **Navigation: ruhiger Kopf und Menü über den ganzen Schirm.** Oben stehen nur Logo und das Wort «Menü»; der Kopf weicht beim Hinunterscrollen und kommt beim Hochscrollen zurück. Das Menü öffnet in Espresso mit den Seiten in der grossen Titelschrift, dazu Live-Status, Adresse, Kontakt und der Gruss. Am Handy und am Desktop gleich. Die schwebende Leiste war von der Vorlage geliehen und liess auf dem Handy die Unterseiten weg.
25. **Gezeichneter Lageplan statt eingebetteter Karte.** Am Schluss der Unterseiten zeigt eine schlichte Strichzeichnung direkt auf dem Grund die Umgebung des Ladens; die Bahnhofstrasse ist die korallenrote Linie. Bewusst ruhig: Versuche mit Stickrahmen und Seidentuch wurden verworfen. Die Strassenverläufe stammen aus OpenStreetMap (`inhalt/karte.json`), der Hinweis darauf steht unter dem Plan. Es wird nichts von einem Kartendienst geladen; ein Klick öffnet die Routenplanung.
