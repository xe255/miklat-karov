const CACHE_NAME = 'miklat-v9';
const ASSETS = [
  '/',
  '/index.html',
  '/i18n.js',
  '/logo.png',
  '/shelters.json',
  '/manifest.json',
  '/brand/google-maps.svg',
  '/brand/waze.svg',
  '/brand/apple-maps.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function isCacheableGetRequest(request) {
  if (request.method !== 'GET') return false;
  const u = new URL(request.url);
  return u.protocol === 'http:' || u.protocol === 'https:';
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.pathname.endsWith('/presence-config.json')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Do not intercept cross-origin (GoatCounter, CDNs, etc.). Let the browser fetch directly so
  // blocked or failed third-party scripts do not resolve FetchEvent with Response.error() in the SW.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Same-origin only below.

  if (!isCacheableGetRequest(e.request)) {
    e.respondWith(
      fetch(e.request).catch(() => Response.error())
    );
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        if (resp.status === 200) {
          const clone = resp.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(e.request, clone).catch(() => {}));
        }
        return resp;
      })
      .catch(() =>
        caches.match(e.request).then((cached) => cached || Response.error())
      )
  );
});
