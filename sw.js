var C="saink-mess-v1";
var F=["./","./index.html","./fresh.html","./manifest.json"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;
e.respondWith(caches.match(e.request).then(function(r){
var net=fetch(e.request).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return res}).catch(function(){return r});
return r||net}).catch(function(){return caches.match("./index.html")}))});
