# Technische Vorgaben – Website Radwerk Mitte

Verbindliche technische Basis für den Website-Relaunch, abgeleitet aus [PRD_Radwerk.pdf](PRD_Radwerk.pdf) (Budget ~150.000 €, Livegang vor Saisonstart Frühjahr 2027, Lighthouse ≥ 90, WCAG 2.1 AA, DSGVO, Team pflegt Inhalte ohne Entwickler) und [DESIGN.md](DESIGN.md). Was hier als „offen“ markiert ist, nicht eigenmächtig entscheiden.

## Aktueller Stand im Projektordner

Im Ordner liegt bereits ein **statischer HTML/CSS/JS-Klickdummy** (`index.html`, `leasing-b2b.html`, `privatkunden.html`, `werkstatt.html`, `faq.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`, `assets/css/styles.css`, `assets/js/main.js`). Er dient zur Validierung von Struktur, Navigation, Leasing-Rechner-Logik und Formular-Verhalten gegen DESIGN.md – **er ist kein Produktivsystem**:

- Der Leasing-Rechner in `assets/js/main.js` rechnet clientseitig mit einem Platzhalter-Faktor je Laufzeit (`LAUFZEIT_FAKTOR`). Reale Konditionen fehlen noch (offene Frage laut PRD).
- Das Kontaktformular in `kontakt.html` öffnet nur einen `mailto:`-Link. Das ist **nicht produktionstauglich**: kein Server-Log, keine verlässliche Zustellung, keine automatische Eingangsbestätigung, keine Spam-Abwehr – das Akzeptanzkriterium „Eingangsbestätigung“ ist damit noch nicht erfüllt.
- Es gibt kein CMS, kein Build-Tool, kein Git-Repo, keine Tests.

Die Patterns aus dem Klickdummy (semantisches HTML, Skip-Link, `aria-expanded`-Navigation, `aria-live`-Rechnerergebnis, `:focus-visible`-Ring, CSS-Variablen für Farben) sind eine gute Grundlage für die Barrierefreiheits- und Design-Umsetzung und sollten in die Zielarchitektur übernommen werden statt neu erfunden zu werden.

## Tech-Stack (Empfehlung)

**Empfehlung: WordPress (selbst gehostet) mit schlankem eigenem Block-Theme**, aufgebaut auf dem bestehenden HTML/CSS des Klickdummys.

Begründung:
- Die bestehende Seite läuft bereits auf WordPress – geringere Umstellung für Svenja Kowalczyk, die Inhalte pflegt.
- Team pflegt Inhalte ohne Entwickler (Muss-Anforderung) – WordPress bietet dafür einen ausgereiften Block-Editor ohne Zusatzkosten.
- Budget ~150.000 € für Konzept, Design, Umsetzung und Inhalte – ein Custom-Build (Headless-CMS + eigenes Frontend) treibt den Entwicklungsanteil spürbar nach oben.
- Großes Plugin-/Theme-Ökosystem für Formulare, Barrierefreiheit, Caching, SEO.

Tradeoff, offen zu halten: Ein Headless-CMS (z. B. Storyblok/Sanity) mit statischem Frontend (Astro/Next.js) erreicht Lighthouse-Werte oft leichter „out of the box“ und wäre die bessere Wahl, falls der Technik-Fragebogen (siehe PRD, offene Frage) ergibt, dass Performance/Erweiterbarkeit wichtiger ist als Pflegeaufwand. **Diese Empfehlung ersetzt nicht den in den PRD-Unterlagen vorgesehenen Technik-Fragebogen – endgültige Festlegung erst nach dieser Analyse.**

Weitere Festlegungen, die aus der Stack-Wahl folgen:
- **Keine Page-Builder-Plugins** (Elementor, Divi etc.) – sie bremsen Lighthouse-Werte und erschweren barrierefreies Markup. Stattdessen natives Block-Theme (Full Site Editing) mit eigenen Block-Patterns.
- **Formularverarbeitung serverseitig** (z. B. per PHP-Handler oder schlankes Plugin) statt `mailto:` – Pflicht für Eingangsbestätigung und DSGVO-konforme Protokollierung.
- Versionskontrolle: Theme- und Konfigurationscode in Git, WordPress-Inhalte bleiben in der Datenbank (nicht versioniert).

## Aufbau / Ordnerstruktur (Zielarchitektur)

```
wp-content/
  themes/
    radwerk-mitte/
      theme.json            # Design-Tokens aus DESIGN.md (Farben, Typografie, Spacing)
      style.css              # Theme-Metadaten + globale Styles (Basis: assets/css/styles.css)
      functions.php           # Theme-Setup, Asset-Einbindung, Formular-Handler-Hook
      templates/              # Seiten-Templates (Startseite, B2B/Leasing, Privatkunden, Werkstatt, FAQ, Kontakt)
      parts/                  # Header, Footer, Navigation (wiederverwendbar über alle Seiten)
      patterns/               # Block-Patterns: Hero, Zielgruppen-Karten, Standort-Karten, Referenzen, Leasing-Rechner
      assets/
        css/                  # ggf. Zusatz-Styles, die nicht über theme.json abbildbar sind
        js/                   # Leasing-Rechner-Logik, Formular-Logik (Weiterentwicklung aus assets/js/main.js)
      inc/
        leasing-rechner.php   # Serverseitige Validierung/Konstanten für den Rechner
        formular-handler.php  # Serverseitige Formularverarbeitung, Mail-Weiterleitung, Eingangsbestätigung
  plugins/                    # nur wenige, geprüfte Plugins (Formular-Sicherheit, Caching, Barrierefreiheits-Tools)
```

Die bestehenden statischen Seiten im Projektordner dienen als Vorlage für die Templates/Patterns oben (Markup und CSS-Variablen weitgehend übernehmbar).

## Hosting

- **EU-Hosting mit Serverstandort Deutschland/EU** (DSGVO, Datenresidenz) – Anbieter mit Auftragsverarbeitungsvertrag (AVV).
- Managed-WordPress-Hosting bevorzugt (automatische Updates, Server-Caching, Staging-Umgebung inklusive).
- HTTPS verpflichtend (Let’s Encrypt oder gleichwertig), HSTS aktiv.
- Staging-Umgebung für Vorschau/Freigabe durch Merle Vogelsang vor jedem Go-Live.
- Regelmäßige automatische Backups (täglich, mit Restore-Test).
- **Offen:** konkreter Hosting-Anbieter – Auswahl nach Budget- und Vertragsprüfung, nicht Teil dieser technischen Empfehlung.

## Performance (Lighthouse ≥ 90)

- Serverseitiges Page-Caching + Objekt-Cache (z. B. Redis), wo vom Hoster unterstützt.
- Bilder: modernes Format (WebP/AVIF) mit Fallback, `srcset`/responsive Größen, Lazy-Loading unterhalb des sichtbaren Bereichs – Pflicht, da Radwerk reales Bildmaterial (Standorte, Team, Werkstatt) liefert.
- Schriften: möglichst Systemschriften oder selbst gehostete Webfonts mit `font-display: swap`, keine externen Font-CDNs (auch DSGVO-relevant).
- JavaScript schlank halten: Vanilla JS wie im Klickdummy statt großer Frontend-Frameworks; kein unnötiges drittes Script.
- CSS über `theme.json`/wenige Stylesheets, kein ungenutztes Plugin-CSS.
- CDN mit EU-Points-of-Presence für statische Assets.
- Performance-Budget und Lighthouse-Check **fester Bestandteil jeder Veröffentlichung** (manuell oder automatisiert, siehe „Offen“ unten).

## Barrierefreiheit (WCAG 2.1 AA)

Im Klickdummy bereits vorhandene, zu übernehmende Patterns:
- „Zum Inhalt springen“-Skip-Link
- Semantische Struktur (`header`, `nav`, `main`, `footer`, überschriftenbasierte Gliederung)
- Navigation mit `aria-expanded`/`aria-controls` für das mobile Menü
- Sichtbarer Fokusring über `:focus-visible`
- Rechnerergebnis mit `aria-live="polite"` für Screenreader-Nutzer
- Formularfelder mit `label`, Pflichtfeld-Kennzeichnung nie nur über Farbe (Sternchen + Text)

Zusätzlich für die Umsetzung:
- Alle Bilder mit aussagekräftigem Alternativtext (Pflichtfeld im CMS, keine leeren `alt`-Attribute außer bei dekorativen Bildern).
- Formular-Fehlermeldungen textlich UND farblich kennzeichnen, mit `aria-describedby` an das jeweilige Feld gebunden.
- Tastaturbedienung aller interaktiven Elemente (Menü, Rechner, Formular, FAQ-Akkordeon) manuell testen, nicht nur automatisiert.
- Automatisierte Prüfung (axe-core oder Lighthouse-Accessibility) plus mindestens eine manuelle Tastatur-/Screenreader-Stichprobe vor Go-Live.
- Farbkontraste gegen die finalen Markenfarben erneut prüfen, sobald die exakten HEX-Werte von Radwerk vorliegen (siehe DESIGN.md, offene Punkte) – die Platzhalterfarben im Klickdummy sind bereits AA-geprüft, aber nur vorläufig.

## DSGVO

- **Kein `mailto:`-Formular in Produktion** – Formulardaten serverseitig verarbeiten, protokollieren und sicher weiterleiten; Löschfristen für Anfragedaten festlegen.
- Keine externen Ressourcen (Fonts, Tracking, Embeds, CDNs außerhalb der EU) ohne Rechtsgrundlage/Einwilligung – deckt sich mit DESIGN.md.
- Analytics zur Messung von Absprungrate/Anfragen (Akzeptanzkriterium) **datenschutzfreundlich** umsetzen: selbst gehostetes, cookie-loses Tool (z. B. Matomo mit IP-Anonymisierung oder vergleichbar) statt Google Analytics – dann i. d. R. ohne Cookie-Banner-Pflicht für diesen Zweck.
- Formular: Checkbox-Zustimmung zur Datenschutzerklärung (im Klickdummy bereits vorgesehen) bleibt Pflichtfeld; Datenschutzerklärung muss die tatsächliche technische Verarbeitung (Hosting-Standort, Auftragsverarbeiter, Speicherdauer) korrekt abbilden, sobald Stack und Hoster feststehen.
- Auftragsverarbeitungsverträge (AVV) mit Hosting-Anbieter und ggf. Analytics-/Formular-Dienstleister vor Go-Live abschließen.
- **Offen:** endgültiges Analytics-Tool, Lösch- und Aufbewahrungsfristen für Anfragedaten – mit Radwerk klären.

## Leasing-Rechner

Technische Umsetzung der im PRD festgelegten Eingaben (Radpreis, Anzahl, Laufzeit → Monatsrate):

- **Clientseitige Sofortberechnung** wie im Klickdummy (`assets/js/main.js`), damit Nutzer ohne Seitenneuladen ein Ergebnis sehen – UX-Vorteil, keine sensiblen Daten involviert.
- Die Berechnungsparameter (Laufzeit-Faktoren, ggf. weitere Variablen) **nicht im JavaScript hart kodieren**, sobald reale Konditionen vorliegen, sondern zentral pflegbar ablegen (z. B. WordPress-Optionsseite/Custom Fields), damit Svenja Kowalczyk oder Dilan Aydın sie ohne Entwickler aktualisieren können.
- Ergebnis immer mit Hinweis „unverbindlich“ kennzeichnen (bereits im Klickdummy umgesetzt) und bei Übergabe an das Anfrageformular die Rechenwerte als Kontext mitgeben (bereits im Klickdummy umgesetzt über URL-Parameter – für Produktion serverseitig/per Session statt sichtbarer URL-Parameter prüfen, falls das aus Datenschutzsicht sauberer ist).
- **Offen (laut PRD nicht selbst entscheiden):** die tatsächliche Formel/Konditionen und beteiligten Leasinggesellschaften liefert Radwerk – die aktuelle Modellrechnung ist ausdrücklich ein Platzhalter.

## Offene Punkte (nicht eigenmächtig entscheiden)

- Endgültige Technik-Entscheidung (WordPress vs. Alternative) erst nach dem in den PRD-Unterlagen vorgesehenen Technik-Fragebogen.
- Konkreter Hosting-Anbieter.
- Reale Leasing-Konditionen/Formel und beteiligte Leasinggesellschaften.
- Endgültiges Analytics-Tool sowie Lösch-/Aufbewahrungsfristen für Formular- und Rechner-Daten.
- Ob und wie eine CI-Pipeline (automatisierter Lighthouse-/Accessibility-Check bei jeder Veröffentlichung) aufgesetzt wird – aktuell gibt es kein Build-/Test-Setup.
- Schnittstellen-Vorbereitung für das spätere Partnerportal (Phase 2) – nur vorbereiten, nicht bauen (siehe CLAUDE.md, Nicht-Ziele).
