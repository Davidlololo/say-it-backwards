// Pushup AI: installable, loads fast. Pages use the network first so updates show up; the leaderboard API is never cached.
const CACHE='pushup-ai-v5';
const OWN=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(OWN)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url);
  if(u.origin===location.origin){ e.respondWith(fetch(r).then(x=>{const c=x.clone(); caches.open(CACHE).then(k=>k.put(r,c)); return x;}).catch(()=>caches.match(r,{ignoreSearch:true}))); return; }
  if(/jsdelivr|googleapis|gstatic/.test(u.host)) e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{ if(x.ok||x.type==='opaque'){const c=x.clone(); caches.open(CACHE).then(k=>k.put(r,c));} return x;})));
});
