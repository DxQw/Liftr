// Liftr service worker — caches the app shell so it opens offline once installed.
var CACHE = "liftr-shell-v1";
var SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function(evt){
  evt.waitUntil(caches.open(CACHE).then(function(cache){ return cache.addAll(SHELL); }));
  self.skipWaiting();
});

self.addEventListener("activate", function(evt){
  evt.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(evt){
  if(evt.request.method !== "GET") return;
  var url = new URL(evt.request.url);
  if(url.origin !== self.location.origin) return; // let cross-origin (fonts, etc.) hit the network normally

  evt.respondWith(
    caches.match(evt.request).then(function(cached){
      var network = fetch(evt.request).then(function(res){
        if(res && res.ok){ caches.open(CACHE).then(function(cache){ cache.put(evt.request, res.clone()); }); }
        return res;
      }).catch(function(){ return cached; });
      return cached || network;
    })
  );
});
