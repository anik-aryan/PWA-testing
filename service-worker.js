self.addEventListener('install', e => {
  e.waitUntil(caches.open('static-v1')
    .then(cache => cache.addAll([
      './',
      './index.html',
      './styles.css',
      './script.js',
      './manifest.json',
      './icons/icon-192.png',
      './icons/icon-512.png'
    ]))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
