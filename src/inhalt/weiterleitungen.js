// Adressen der bisherigen Seite (Squarespace), die nach der Umstellung weiter funktionieren müssen.
// /marken und /datenschutz gibt es neu unter derselben Adresse. Hier stehen nur die, die umziehen.
// Alle Ziele enden mit Schrägstrich, weil die Seite so ausgeliefert wird.
export const weiterleitungen = {
  '/home': '/',
  '/cart': '/',
  '/geschaeft': '/ueber-uns/',
  '/brustprothesen1': '/beratung/brustprothesen/',
};

// Übergangsziele. Die Umstellungsprüfung lässt sie auf der richtigen Adresse nicht durch.
export const vorlaeufig = [];

// Alle Adressen, die die bisherige Seite in ihrer Sitemap hatte, plus Warenkorb.
// Die Prüfung stellt sicher, dass jede davon auf eine bestehende Seite führt.
export const bisherigeAdressen = ['/', '/home', '/geschaeft', '/marken', '/brustprothesen1', '/datenschutz', '/cart'];
