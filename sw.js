// TT's List: network first so deals are always fresh; cached copy only when offline.
const C="ttslist-v1";
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request.url.split("?")[0],cp));return r}).catch(()=>caches.match(e.request.url.split("?")[0])));
});
