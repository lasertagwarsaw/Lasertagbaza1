const CACHE_NAME = "baza-ios-app-v71";
const APP_ASSETS = [
  "ios-app.html",
  "ios-app.css",
  "ios-app.js",
  "vendor/livekit-client.umd.js?v=71",
  "manifest.webmanifest",
  "assets/baza-hero.jpg",
  "assets/laser-arena-hero.png",
  "assets/tournament-icon.jpeg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  const isAppShell =
    requestUrl.pathname.endsWith("/ios-app.html") ||
    requestUrl.pathname.endsWith("/ios-app.css") ||
    requestUrl.pathname.endsWith("/ios-app.js") ||
    requestUrl.pathname.endsWith("/vendor/livekit-client.umd.js") ||
    requestUrl.pathname.endsWith("/manifest.webmanifest");

  if (isAppShell) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
