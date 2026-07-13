const CACHE_NAME = "lasertag-warszawa-v109";
const APP_SHELL = "ios-app.html";
const APP_ASSETS = [
  APP_SHELL,
  "ios-app.css",
  "ios-app.js",
  "vendor/livekit-client.umd.js?v=109",
  "manifest.webmanifest",
  "data/news-feed.json",
  "data/ranking-feed.json",
  "data/offline-games.json",
  "assets/archivo-black-latin-ext.woff2",
  "assets/archivo-black-latin.woff2",
  "assets/dm-sans-latin-ext.woff2",
  "assets/dm-sans-latin.woff2",
  "assets/baza-hero.jpg",
  "assets/profile-hero.jpg",
  "assets/lasertag-warsaw-mark.png",
  "assets/app-icon-32.png",
  "assets/app-icon-180.png",
  "assets/app-icon-192.png",
  "assets/app-icon-512.png",
  "assets/material-symbols-rounded.ttf",
  "assets/card-news-trophy.jpg",
  "assets/update-noka-review.webp",
  "assets/update-agent-review.webp",
  "assets/player-tort.webp",
  "assets/update-jak-review.webp",
  "assets/photo_2026-07-06_22-53-50.webp",
  "assets/update-telegram.webp",
  "assets/update-sunday.webp",
  "assets/update-wednesday.webp",
  "assets/update-open-turniej-2026-07-05.webp",
  "assets/update-club-networking-2026-07-13.jpg",
  "assets/player-agateeni.webp",
  "assets/player-agent.webp",
  "assets/player-ben.webp",
  "assets/player-bg.webp",
  "assets/player-jak.webp",
  "assets/player-jakub.webp",
  "assets/player-jinn.webp",
  "assets/player-katya.webp",
  "assets/player-kira.webp",
  "assets/player-kometa.webp",
  "assets/player-max.webp",
  "assets/player-mikhal.webp",
  "assets/player-noka.webp",
  "assets/player-pasha.webp",
  "assets/player-platau.webp",
  "assets/player-spica.webp",
  "assets/player-sved.webp",
  "assets/player-noka.jpeg",
  "assets/player-ynwa.jpg",
  "assets/player-platau.jpg",
  "assets/player-sved.jpg",
  "assets/player-katya.jpg",
  "assets/player-tsisa.webp",
  "assets/player-w1laser.webp",
  "assets/player-ynwa.webp",
  "assets/player-zhenya.webp",
  "assets/card-next-game.jpg",
  "assets/card-voice-room.jpg",
  "assets/laser-arena-hero.png",
  "assets/tournament-icon.jpeg",
];

async function cacheResponse(request, response) {
  if (!response || (!response.ok && response.type !== "opaque")) return response;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, fallbackPath = "") {
  try {
    return await cacheResponse(request, await fetch(request));
  } catch {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (fallbackPath) return caches.match(fallbackPath, { ignoreSearch: true });
    throw new Error("Offline and no cached response is available");
  }
}

async function staleWhileRevalidate(request, event) {
  const cached = await caches.match(request, { ignoreSearch: true });
  const refresh = fetch(request)
    .then((response) => cacheResponse(request, response))
    .catch(() => null);
  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }
  return (await refresh) || Response.error();
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(APP_ASSETS.map(async (asset) => {
        try {
          const response = await fetch(asset, { cache: "reload" });
          if (response.ok) await cache.put(asset, response);
        } catch {
          // One optional asset must not prevent the offline shell from installing.
        }
      })))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || request.headers.has("range")) return;

  const requestUrl = new URL(request.url);
  const sameOrigin = requestUrl.origin === self.location.origin;
  const isAppNavigation = request.mode === "navigate" && requestUrl.pathname.endsWith("/ios-app.html");
  const isAppShell = sameOrigin && [
    "/ios-app.html",
    "/ios-app.css",
    "/ios-app.js",
    "/vendor/livekit-client.umd.js",
    "/manifest.webmanifest",
  ].some((path) => requestUrl.pathname.endsWith(path));
  const isPublicFeed = sameOrigin && [
    "/api/news-feed",
    "/api/ranking-feed",
    "/api/games-feed",
  ].includes(requestUrl.pathname) && requestUrl.searchParams.get("mode") !== "proposals";
  const isStaticAsset = sameOrigin && (
    requestUrl.pathname.includes("/assets/") ||
    requestUrl.pathname.includes("/vendor/") ||
    requestUrl.pathname.includes("/data/") ||
    ["font", "image", "script", "style"].includes(request.destination)
  );

  if (isAppNavigation) {
    event.respondWith(networkFirst(request, APP_SHELL));
    return;
  }
  if (isAppShell || isPublicFeed) {
    event.respondWith(networkFirst(request));
    return;
  }
  if (isStaticAsset) {
    event.respondWith(staleWhileRevalidate(request, event));
  }
});
