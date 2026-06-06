// 云衣橱 Service Worker - 离线缓存 v4
const V = "v4";
const CACHE = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", e => {
  // 立即激活，不等待旧 SW 释放
  self.skipWaiting();
  e.waitUntil(
    caches.open(V).then(c => c.addAll(CACHE)).catch(() => {})
  );
});

self.addEventListener("activate", e => {
  // 清除所有旧版本缓存
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k)))
    )
  );
  // 立即接管所有页面
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => r))
  );
});
