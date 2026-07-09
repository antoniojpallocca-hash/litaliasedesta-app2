# L'Italia s'è Desta — Progressive Web App

Guida completa per pubblicare gratuitamente l'app, senza saper programmare,
usando GitHub.

## Come funziona l'app

- Si apre su una **home iniziale** con logo, titolo e un pulsante
  **"Leggi il giornale"**.
- Toccando il pulsante, l'app naviga verso **https://www.litaliasedesta.it**
  restando nella stessa finestra dell'app installata (non apre un browser
  separato). Non viene usato nessun iframe, quindi funziona anche con siti
  come Google Sites che bloccano l'incorporamento.
- È installabile su smartphone (Android e iPhone) e su computer.
- È predisposta per ricevere notifiche push (per attivarle davvero serve un
  servizio gratuito esterno: vedi la sezione dedicata più sotto).

## Struttura del progetto

```
pwa2/
├── index.html              (home dell'app: logo + pulsante)
├── manifest.json           (istruzioni di installazione per il telefono)
├── service-worker.js       (funzionamento offline + notifiche push)
├── README.md
├── css/
│   └── style.css           (grafica della home)
├── js/
│   └── app.js               (installazione app + attivazione notifiche)
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-192.png
    ├── icon-maskable-512.png
    ├── apple-touch-icon.png
    └── favicon.ico
```

---

## PASSO 1 — Crea un account GitHub (se non ce l'hai già)

1. Vai su **https://github.com**
2. Clicca su "Sign up" e segui la procedura (email, password, nome utente).
3. Conferma l'email che ricevi.

## PASSO 2 — Crea un nuovo repository

1. In alto a destra clicca sul simbolo **+** → **"New repository"**.
2. In "Repository name" scrivi ad esempio: `italia-sedesta-app`
3. Lascia la spunta su **"Public"**.
4. NON spuntare "Add a README file".
5. Clicca **"Create repository"**.

> Se avevi già creato un repository con la versione precedente (quella con
> l'iframe), puoi tranquillamente riutilizzarlo: basta caricare questi nuovi
> file al posto dei vecchi (vedi Passo 3, i file con lo stesso nome verranno
> sostituiti automaticamente).

## PASSO 3 — Carica i file mantenendo le cartelle

1. Nella pagina del repository, clicca **"Add file" → "Upload files"**.
2. Trascina i file della **cartella principale**: `index.html`,
   `manifest.json`, `service-worker.js`, `README.md`. Scrivi un messaggio
   tipo "Caricamento app" e clicca **"Commit changes"**.
3. Ripeti "Add file → Upload files" e trascina l'intera cartella **`css`**
   (con dentro `style.css`): GitHub la ricrea identica. Fai "Commit changes".
4. Ripeti lo stesso per la cartella **`js`** e per la cartella **`icons`**.

Alla fine il repository deve avere la stessa struttura elencata sopra.

> Se il tuo browser non trascina le cartelle intere, apri "Upload files",
> scrivi `css/` nel percorso prima di trascinare `style.css`, oppure crea
> prima il file con "Create new file" scrivendo `css/style.css` come nome:
> GitHub crea la cartella da solo.

## PASSO 4 — Attiva GitHub Pages

1. Nel repository vai su **"Settings" → "Pages"**.
2. In "Source" scegli **"Deploy from a branch"**.
3. Branch **"main"**, cartella **"/ (root)"**, poi **"Save"**.
4. Dopo 1-2 minuti ricarica la pagina: apparirà il link pubblico, tipo:

   ```
   https://tuo-nome-utente.github.io/italia-sedesta-app/
   ```

## PASSO 5 — Prova l'app e installala

1. Apri il link dal browser del telefono (Chrome su Android, Safari su
   iPhone).
2. **Su Android (Chrome):** apparirà un banner "Installa l'app" (oppure
   menu ⋮ → "Aggiungi a schermata Home").
3. **Su iPhone (Safari):** tocca l'icona di condivisione → **"Aggiungi a
   Home"**.
4. L'icona con il logo apparirà sulla schermata home. Aprendola, vedrai la
   home con il pulsante "Leggi il giornale": toccandolo si apre il sito,
   sempre dentro la stessa app.

---

## Notifiche push: come attivarle davvero (gratis)

Il Service Worker è già pronto per **ricevere** notifiche push, e la home
ha già un pulsante "Attiva le notifiche" che chiede il permesso all'utente.
Per **inviarle davvero** ad ogni nuovo articolo serve però un servizio
gratuito che gestisca l'invio (un sito statico come GitHub Pages non può
farlo da solo). Il più semplice è **OneSignal**:

1. Crea un account gratuito su **https://onesignal.com**
2. Crea una nuova app, piattaforma **"Web Push"**.
3. OneSignal fornisce un breve codice da incollare in `index.html` (con il
   tuo "App ID" personale) e un file `OneSignalSDKWorker.js` da caricare
   nella cartella principale, accanto a `service-worker.js`.
4. Da quel momento, ogni volta che pubblichi un nuovo articolo, potrai
   inviare una notifica push a tutti gli utenti che hanno installato l'app
   (anche in automatico, collegando il feed RSS del sito).

Se vuoi, quando arrivi a questo punto posso guidarti passo passo anche
nell'integrazione di OneSignal: basta chiedermelo.

## Aggiornamenti futuri

Per modificare un file (testo, colori, ecc.) apri il file su GitHub,
clicca sulla matita (✏️) in alto a destra, modifica e clicca "Commit
changes". Il sito si aggiorna da solo in 1-2 minuti.
