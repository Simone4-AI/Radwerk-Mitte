# Tag 1 – Zusammenfassung

## Verwendete Werkzeuge (Versionen)

- **Claude Code:** 2.1.303
- **Git:** 2.55.0.windows.5
- **VS Code:** 1.141.2

## Ordnerinhalt

Der Projektordner enthält die Konzeptunterlagen (PRD-Varianten als PDF, Firmensteckbrief, Kundengesprächs-Protokoll), die Projektanweisungen `CLAUDE.md`, `DESIGN.md` und `TECH.md`, das neu erstellte `PRD.md` sowie einen statischen HTML/CSS/JS-Klickdummy (u. a. `index.html`, `leasing-b2b.html`, `privatkunden.html`, `werkstatt.html`, `faq.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`, `assets/`).

## Git-Verlauf

```
f141552 Revert "Website zerstört (Übung)"
1ff394b Website zerstört (Übung)
1823d9f Initial commit: PRD-Unterlagen und HTML-Klickdummy fuer Radwerk Mitte Relaunch
```

## Welche Git-Befehle wurden heute benutzt – und wofür?

- **`git init`** – hat den Ordner zu einem Git-Repository gemacht, damit Änderungen überhaupt verfolgt werden können.
- **`git add`** – hat Dateien zur nächsten Commit-Version vorgemerkt (Staging-Bereich).
- **`git commit`** – hat die vorgemerkten Änderungen dauerhaft als neuen Stand in der Historie gespeichert, jeweils mit einer kurzen Nachricht, was passiert ist.
- **`git log`** – hat die bisherige Historie aller Commits sichtbar gemacht (wer/was/wann), z. B. mit `git log --oneline` als kompakte Liste.
- **`git revert`** – hat einen früheren Commit rückgängig gemacht, **ohne** die Historie zu löschen: Es wird ein neuer Commit erzeugt, der die Änderungen des alten Commits umkehrt.

## Geübt: zerstörte Website wiederherstellen

Zur Übung wurde die Website absichtlich „zerstört“ (Commit `1ff394b – Website zerstört (Übung)`). Mit `git revert` wurde anschließend ein neuer Commit erzeugt (`f141552 – Revert "Website zerstört (Übung)"`), der diese Zerstörung rückgängig macht und den ursprünglichen Stand wiederherstellt – die komplette Historie (inklusive des „Zerstören“-Schritts) bleibt dabei nachvollziehbar erhalten. Das zeigt den Kernvorteil von Git: Fehler oder absichtliche Experimente lassen sich sicher zurückdrehen, ohne dass etwas endgültig verloren geht.
