// Adressen der bisherigen Seite (Squarespace), die nach der Umstellung weiter funktionieren müssen.
// Alle Ziele enden mit Schrägstrich, weil die Seite so ausgeliefert wird.
// Geplante Ziele stehen in docs/audit-altseite.md. Solange die Zielseite noch nicht gebaut ist,
// führt die alte Adresse auf die Startseite und steht unten in «vorlaeufig».
export const weiterleitungen = {
  '/home': '/',
  '/cart': '/',
  '/geschaeft': '/', // geplant: /ueber-uns/
  '/marken': '/', // geplant: /marken/ (dann keine Weiterleitung mehr)
  '/brustprothesen1': '/', // geplant: /beratung/brustprothesen/
  '/datenschutz': '/', // geplant: /datenschutz/ (dann keine Weiterleitung mehr)
};

// Diese Ziele sind Übergang. Die Umstellungsprüfung lässt sie auf der richtigen Adresse nicht durch.
export const vorlaeufig = ['/geschaeft', '/marken', '/brustprothesen1', '/datenschutz'];

// Alle Adressen, die die bisherige Seite in ihrer Sitemap hatte, plus Warenkorb.
// Die Prüfung stellt sicher, dass jede davon auf eine bestehende Seite führt.
export const bisherigeAdressen = ['/', '/home', '/geschaeft', '/marken', '/brustprothesen1', '/datenschutz', '/cart'];
