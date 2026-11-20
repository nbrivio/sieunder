// Status nach Schweizer Zeit, Scrollfortschritt je Kapitel und Sätze, deren Worte scharf werden.
// Fällt das Skript aus oder ist reduzierte Bewegung gewünscht, steht die Seite ruhig untereinander.
const TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const KURZ = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const uhr = (m) => `${Math.floor(m / 60)}.${String(m % 60).padStart(2, '0')}`;
const klemme = (x) => Math.min(1, Math.max(0, x));

/** Liefert, ob jetzt offen ist, und den Satz dazu. Die Zeiten kommen aus inhalt/betrieb.json. */
export function lage(zeiten, jetzt = new Date()) {
  const teil = {};
  for (const p of new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(jetzt)) teil[p.type] = p.value;
  const tag = KURZ.indexOf(teil.weekday);
  const min = (Number(teil.hour) % 24) * 60 + Number(teil.minute);
  const heute = zeiten[tag] ?? [];
  for (const [von, bis] of heute) if (min >= von && min < bis) return { offen: true, text: `Jetzt geöffnet bis ${uhr(bis)} Uhr` };
  for (const [i, [von]] of heute.entries()) if (min < von) return { offen: false, text: `${i > 0 ? 'Mittagspause, wieder da um' : 'Wir öffnen heute um'} ${uhr(von)} Uhr` };
  for (let d = 1; d <= 7; d += 1) {
    const n = (tag + d) % 7;
    if (zeiten[n]) return { offen: false, text: `Wir öffnen ${d === 1 ? 'morgen' : `am ${TAGE[n]}`} um ${uhr(zeiten[n][0][0])} Uhr` };
  }
  return null;
}

for (const status of document.querySelectorAll('[data-zeiten]')) {
  const zeiten = JSON.parse(status.dataset.zeiten);
  const setzen = () => {
    const l = lage(zeiten);
    if (!l) return;
    status.classList.toggle('offen', l.offen);
    status.querySelector('span').textContent = l.text;
  };
  setzen();
  setInterval(setzen, 60000);
}

// Kopf und Menü. Mit Skript ersetzt das Wort «Menü» die Zeile der Seiten.
const wurzel = document.documentElement;
wurzel.classList.add('js');
const menue = document.querySelector('[data-menue]');
const auf = document.querySelector('[data-menue-auf]');
if (menue && auf && typeof menue.showModal === 'function') {
  auf.hidden = false;
  auf.addEventListener('click', () => menue.showModal());
  menue.querySelector('[data-menue-zu]').addEventListener('click', () => menue.close());
  // Ein Ziel auf derselben Seite lädt nicht neu, darum schliesst jeder Verweis das Menü selbst.
  for (const ziel of menue.querySelectorAll('[data-menue-ziel]')) ziel.addEventListener('click', () => menue.close());
} else {
  wurzel.classList.remove('js');
}

// Der Kopf weicht beim Hinunterscrollen und kommt beim Hochscrollen zurück. Ganz oben liegt er ohne Grund über dem Bild.
let zuletzt = scrollY;
const kopfStellen = () => {
  const y = scrollY;
  wurzel.classList.toggle('fest', y > 24);
  if (Math.abs(y - zuletzt) > 6) wurzel.classList.toggle('weg', y > zuletzt && y > 140);
  zuletzt = y;
};
addEventListener('scroll', kopfStellen, { passive: true });
kopfStellen();

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('bewegt');

  // Sätze in Worte teilen. Ohne Skript steht der Satz einfach da.
  const saetze = [...document.querySelectorAll('[data-worte]')].map((el) => {
    const worte = [];
    const teile = (knoten) => {
      for (const kind of [...knoten.childNodes]) {
        if (kind.nodeType === Node.ELEMENT_NODE) teile(kind);
        if (kind.nodeType !== Node.TEXT_NODE) continue;
        const stueck = document.createDocumentFragment();
        for (const t of kind.textContent.split(/(\s+)/)) {
          if (!t.trim()) {
            stueck.append(t);
            continue;
          }
          const wort = document.createElement('span');
          wort.className = 'wort';
          wort.textContent = t;
          stueck.append(wort);
          worte.push(wort);
        }
        kind.replaceWith(stueck);
      }
    };
    teile(el);
    return { el, worte };
  });

  // Markenbilder: erscheinen beim Überfahren eines Namens und folgen dem Zeiger mit leichtem Nachziehen.
  const schau = document.querySelector('[data-schau]');
  if (schau) {
    const bilder = new Map([...schau.querySelectorAll('[data-marke]')].map((bild) => [bild.dataset.marke, bild]));
    const ohneZeiger = matchMedia('(hover: none)');
    let zielX = 0;
    let zielY = 0;
    let x = 0;
    let y = 0;
    let aktiv = null;
    let folgt = false;
    const folgen = () => {
      x += (zielX - x) * 0.16;
      y += (zielY - y) * 0.16;
      schau.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      if (aktiv) requestAnimationFrame(folgen);
      else folgt = false;
    };
    const zeigen = (name, vonX, vonY) => {
      aktiv = (name && bilder.get(name)) || null;
      for (const bild of bilder.values()) bild.classList.toggle('an', bild === aktiv);
      schau.classList.toggle('offen', Boolean(aktiv));
      if (!aktiv) return;
      zielX = x = vonX;
      zielY = y = vonY;
      if (!folgt) {
        folgt = true;
        requestAnimationFrame(folgen);
      }
    };
    for (const eintrag of document.querySelectorAll('[data-hat-bild]')) {
      eintrag.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && zeigen(eintrag.dataset.hatBild, e.clientX, e.clientY));
      eintrag.addEventListener('pointermove', (e) => {
        zielX = e.clientX;
        zielY = e.clientY;
      });
      eintrag.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && zeigen(null));
      eintrag.addEventListener('click', () => ohneZeiger.matches && zeigen(aktiv ? null : eintrag.dataset.hatBild, innerWidth / 2, innerHeight / 2));
    }
    addEventListener('scroll', () => ohneZeiger.matches && aktiv && zeigen(null), { passive: true });
  }

  // Der Gruss im Fuss schreibt sich einmal, sobald er ins Bild kommt.
  // Dasselbe gilt für den Lageplan: Seine Strassen zeichnen sich der Reihe nach.
  for (const hand of document.querySelectorAll('[data-hand], [data-karte]')) {
    hand.querySelectorAll('path, .spur').forEach((pfad, i) => pfad.style.setProperty('--i', i));
    new IntersectionObserver(
      (eintraege, waechter) => {
        if (!eintraege[0].isIntersecting) return;
        hand.classList.add('schreibt');
        waechter.disconnect();
      },
      { threshold: 0.35 },
    ).observe(hand);
  }

  const rollen = [...document.querySelectorAll('[data-roll]')];
  const sichten = [...document.querySelectorAll('[data-sicht]')];
  let wartet = false;

  const messen = () => {
    wartet = false;
    const h = innerHeight;
    for (const el of rollen) {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--p', klemme(-r.top / Math.max(1, r.height - h)).toFixed(4));
    }
    for (const el of sichten) {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--v', klemme((h - r.top) / (h + r.height)).toFixed(4));
    }
    for (const { el, worte } of saetze) {
      const r = el.getBoundingClientRect();
      // Unscharf sind Worte nur, solange ihr Satz gleich ins Bild kommt. Weit weg bleibt der Text lesbar.
      const nah = r.top < h * 1.6;
      const f = klemme((h * 0.92 - r.top) / (h * 0.5 + r.height * 0.5));
      worte.forEach((wort, i) => wort.classList.toggle('aus', nah && i / worte.length > f * 1.08 - 0.04));
    }
  };
  const anstossen = () => {
    if (wartet) return;
    wartet = true;
    requestAnimationFrame(messen);
  };
  addEventListener('scroll', anstossen, { passive: true });
  addEventListener('resize', anstossen);
  messen();
}
