const CACHE = "mollymaid-pwa-v1";
const SHELL = ["/","/index.html","/services.html","/about.html","/quote.html","/css/app.css","/js/app.js","/manifest.webmanifest","/icons/icon-192.png","/icons/icon-512.png","/offline.html"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((hit) => {
    if (hit) return hit;
    return fetch(event.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(event.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match("/offline.html"));
  }));
});
