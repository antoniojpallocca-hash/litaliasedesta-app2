// =======================================================
// L'Italia s'è Desta - logica dell'app
// =======================================================

// ---- 1. Registrazione del Service Worker ----
// Rende l'app installabile e pronta a ricevere notifiche push.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((reg) => console.log('Service Worker registrato:', reg.scope))
      .catch((err) => console.error('Errore registrazione Service Worker:', err));
  });
}

// ---- 2. Banner personalizzato "Installa l'app" (Android/Desktop) ----
let promptInstallazione = null;
const installBanner = document.getElementById('install-banner');
const installBtn = document.getElementById('install-btn');
const installChiudi = document.getElementById('install-chiudi');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  promptInstallazione = event;
  installBanner.classList.add('visibile');
});

installBtn?.addEventListener('click', async () => {
  installBanner.classList.remove('visibile');
  if (promptInstallazione) {
    promptInstallazione.prompt();
    await promptInstallazione.userChoice;
    promptInstallazione = null;
  }
});

installChiudi?.addEventListener('click', () => {
  installBanner.classList.remove('visibile');
});

// ---- 3. Attivazione notifiche push su richiesta dell'utente ----
const btnNotifiche = document.getElementById('btn-notifiche');
const statoNotifiche = document.getElementById('stato-notifiche');

function aggiornaStatoNotifiche() {
  if (!('Notification' in window)) {
    statoNotifiche.textContent = 'Le notifiche non sono supportate su questo dispositivo';
    btnNotifiche.style.display = 'none';
    return;
  }

  if (Notification.permission === 'granted') {
    btnNotifiche.textContent = 'Notifiche attive';
    btnNotifiche.classList.add('attivo');
    statoNotifiche.textContent = '';
  } else if (Notification.permission === 'denied') {
    statoNotifiche.textContent = 'Notifiche bloccate: abilitale dalle impostazioni del telefono';
  }
}

btnNotifiche?.addEventListener('click', () => {
  if (!('Notification' in window)) return;

  Notification.requestPermission().then((permesso) => {
    aggiornaStatoNotifiche();
    if (permesso === 'granted') {
      // Qui, quando integrerai OneSignal (vedi README.md),
      // andrà collegata la registrazione dell'utente al servizio push.
      new Notification('L\'Italia s\'è Desta', {
        body: 'Notifiche attivate correttamente!',
        icon: 'icon-192.png'
      });
    }
  });
});

aggiornaStatoNotifiche();
