// Mimic Mob: installable app, loads fast. Pages always try the network first so updates show up.
const CACHE='mimic-mob-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url);
  if(u.origin===location.origin){ e.respondWith(fetch(r).then(x=>{const c=x.clone(); caches.open(CACHE).then(k=>k.put(r,c)); return x;}).catch(()=>caches.match(r,{ignoreSearch:true}))); }});
