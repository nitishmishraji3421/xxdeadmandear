const CACHE_NAME = "studicon-cache-v1";
const OFFLINE_URL = "offline.html";

// Files to cache during install
const PRECACHE_ASSETS = [
  "index.html",
  "dashboard.html",
  "style.css",
  "icon-192.png",
  "icon-512.png",
  "manifest.json",
  "offline.html",
  "downloads/setup.exe",
  "downloads/manual.pdf"
];

// INSTALL - Pre-cache core files
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Pre-caching core files...");
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// ACTIVATE - Clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH - Cache with Network Fallback
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Use cached version
        console.log("[SW] Serving from cache:", event.request.url);
        return cachedResponse;
      }

      // Try fetch from network
      return fetch(event.request)
        .then(networkResponse => {
          // Save to cache for next time
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            console.log("[SW] Fetched & cached:", event.request.url);
            return networkResponse;
          });
        })
        .catch(() => {
          // Return fallback offline page for navigations
          if (event.request.mode === "navigate") {
            console.warn("[SW] Network failed, showing offline page.");
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});
