# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projektstatus

Noch kein Code, kein Git-Repo, kein Build-/Test-Setup. Der Ordner enthält nur Konzeptunterlagen (PDF) für einen Website-Relaunch. Sobald ein Tech-Stack festgelegt ist, hier Build-, Lint- und Test-Befehle ergänzen.

Kontext: Übungsprojekt im Kurs „Vibe Engineering / Agentic Engineering“ (KI-Vertiefungskurs). Radwerk Mitte GmbH ist eine **fiktive Übungsfirma** – alle Personen, Zahlen und Kunden sind erfunden.

## Quelldokumente

**Maßgeblich ist [PRD_Radwerk.pdf](PRD_Radwerk.pdf)** („PRD · Website Radwerk“, Entwurf v1, 19.10.2026). Die Anforderungen unten geben es wieder. Bei Widersprüchen zu anderen Dokumenten gilt dieses PRD.

| Datei | Inhalt |
|---|---|
| `PRD_Radwerk.pdf` | **Verbindliches PRD** |
| `Firmensteckbrief-Radwerk-Mitte-BTA.pdf` | Firmenprofil, Personen, Haltung |
| `Übung_Kundengespräch_Protokoll*.pdf` | Protokoll des Kundengesprächs mit Merle Vogelsang (beide Dateien identisch) |
| `PRD – Neue Website Radwerk Mitte_2.pdf`, `Radwerk_PRD_Kurzfassung_1.pdf` | Alternative PRD-Fassungen, nur Hintergrund. Die Kurzfassung (Terminbuchung, Auftragsstatus, Filialbestand, Chat) ist **nicht** im Umfang. |

## Das Unternehmen

- Fahrradhändler mit Werkstatt, gegründet 1989, Standorte **Kassel und Göttingen**, ca. 120 Beschäftigte, ca. 28 Mio. € Umsatz.
- Wachstumsziel ca. 15 % im nächsten Jahr, vor allem über **B2B-Dienstrad-/E-Bike-Leasing** (z. B. Klinikum mit 80 Beschäftigten, Stadtverwaltung, Pflegedienst).
- Ansprechpersonen: Merle Vogelsang (Geschäftsführung, gibt frei), Dilan Aydın (B2B-Vertrieb), Amara Osei (Kundenservice – nur eine Person), Svenja Kowalczyk (E-Commerce/Marketing, pflegt Inhalte), Heiner Vogelsang (Werkstatt).
- Haltung: „Erst anschauen, dann sagen.“ Zusagen werden gehalten; bei Verzögerung meldet sich das Team *vor* dem Termin.

## Anforderungen (laut PRD_Radwerk.pdf)

**Ziel:** Radwerk wird online als moderner, verlässlicher Partner für E-Bike-Leasing sichtbar und trägt zu ~15 % Wachstum bei – mehr qualifizierte B2B-Anfragen, Kosten selbst einschätzen, Support entlasten, Netzwerk/Erreichbarkeit/Service vor Ort zeigen.

**Zielgruppen:** primär Unternehmen der Region (HR, Einkauf, Geschäftsführung – wollen Kosten, Ablauf, festen Ansprechpartner); Mitarbeitende mit Leasing-Rad (Auswahl, schneller Service); Privatkunden (Werkstatt, Beratung, Shop); Custom-Rad-Interessenten (niedrige Priorität).

**Akzeptanzkriterien:**
- B2B-Angebot ohne Scrollen sichtbar, Anfrage in max. 2 Klicks.
- Leasing-Rechner: Radpreis, Anzahl, Laufzeit → Monatsrate, direkt als Anfrage sendbar. Parameter liefert Radwerk.
- FAQ beantwortet die häufigsten Support-Fragen.
- Formular fragt die Anfrageart ab und leitet richtig weiter.
- Absprung in den externen Shop funktioniert.
- Referenzen und direkte Telefonnummern beider Standorte sichtbar.
- Mobil nutzbar, Lighthouse ≥ 90, WCAG 2.1 AA.
- Absprungrate und Anfragen DSGVO-konform gemessen.
- Design in Blau/Orange, von Merle freigegeben.

**Annahmen:** Budget ~150.000 € (Konzept, Design, Umsetzung, Inhalte); Texte, Fotos, Referenzen kommen von Radwerk; Radwerk pflegt Inhalte und FAQ ohne Entwickler (CMS nötig); beide Standorte gleichwertig; keine Absprung-Daten – Messung ab Launch; deutschsprachig, DSGVO-konform.

**Nicht-Ziele:** eigener Onlineshop (externen verlinken), Partnerportal mit Login (Phase 2), neues Branding, Custom-Rad-Konfigurator, Ersatz für Telefon-Support, Preiswettbewerb mit großen Online-Händlern wie Upway.

**Offene Fragen** (nicht selbst entscheiden, als Platzhalter/Annahme kennzeichnen): Budget nur Website oder auch Portal/Schnittstellen? Welche Leasinggesellschaften und Konditionen im Rechner? Custom-Räder schon in Version 1? SLA-Inhalte öffentlich? Klinikum als Referenz nennbar?

## Gestaltung & Ton

Alle Design-Vorgaben (Farben, Typografie, Navigation, Ton, Barrierefreiheit, offene Punkte) stehen in [DESIGN.md](DESIGN.md) und gelten verbindlich:

@DESIGN.md

## Technik

- Budget ca. 150.000 €; Livegang vor Saisonstart Frühjahr 2027.

Alle technischen Vorgaben (Stack, Ordnerstruktur, Hosting, Performance, Barrierefreiheit, DSGVO, Leasing-Rechner, offene Punkte) stehen in [TECH.md](TECH.md) und gelten verbindlich:

@TECH.md
