const CACHE_NAME = "supernft-cache-v1";

const urlsToCache = [
  "dashboard.html",
  "wallet.html",
  "withdraw.html",
  "deposit.html",
  "live-earnings.html",
  "css/style.css"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
