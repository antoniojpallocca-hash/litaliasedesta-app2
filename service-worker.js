// =======================================================
// L'Italia s'è Desta - Service Worker
// =======================================================
// Rende installabile l'app, salva la home per l'uso offline
// e resta in ascolto delle notifiche push.

const CACHE_NOME = 'italia-sedesta-v1';

const FILE_DA_SALVARE = [
  './index.html',
  './manifest.json',
  './style.css',
  './app.js',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// ---- Installazione: salva i file base in cache ----
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NOME).then((cache) => cache.addAll(FILE_DA_SALVARE))
  );
  self.skipWaiting();
});

// ---- Attivazione: elimina le cache vecchie ----
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nomi) =>
      Promise.all(
        nomi
          .filter((nome) => nome !== CACHE_NOME)
          .map((nome) => caches.delete(nome))
      )
    )
  );
  self.clients.claim();
});

// ---- Risposta alle richieste: la home funziona anche offline ----
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Interessano solo i file dell'app stessa, non il sito del giornale
  // (che si apre navigando fuori dall'app, come un sito normale).
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((rispostaCache) => {
      return rispostaCache || fetch(event.request);
    })
  );
});

// ---- Ricezione di una notifica push ----
// Entra in funzione automaticamente quando un servizio esterno
// (es. OneSignal) invia una notifica push.
self.addEventListener('push', (event) => {
  let dati = {};
  try {
    dati = event.data ? event.data.json() : {};
  } catch (e) {
    dati = { title: 'L\'Italia s\'è Desta', body: 'Nuovo articolo pubblicato' };
  }

  const titolo = dati.title || 'L\'Italia s\'è Desta';
  const opzioni = {
    body: dati.body || 'È stato pubblicato un nuovo articolo.',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: dati.url || 'https://www.litaliasedesta.it' }
  };

  event.waitUntil(self.registration.showNotification(titolo, opzioni));
});

// ---- Click sulla notifica: apre l'articolo ----
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlDaAprire = event.notification.data?.url || 'https://www.litaliasedesta.it';
  event.waitUntil(clients.openWindow(urlDaAprire));
});
