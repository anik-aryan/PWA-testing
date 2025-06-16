let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('👍 beforeinstallprompt fired');
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'block';
});

document.getElementById('installBtn')
  .addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(outcome === 'accepted' ? '✅ App installed' : '❌ Install dismissed');
    deferredPrompt = null;
  });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('✔ SW registered'))
    .catch(err => console.error('❌ SW registration failed:', err));
}

