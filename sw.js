/* 編集: キャッシュの名前 (サイトごとにユニークな名前にする) */
const CACHE_NAME = 'nakashita-hiroaki-profile-cache-v1';

/* 編集: オフライン時に表示させたいファイルのリスト */
/* 【重要】ここにあるファイル名を、実際に使う画像等のパスに必ず書き換えてください */
const urlsToCache = [
'/',
'/index.html',
'/styles.css',
'/manifest.json',
'/images/Nakashima_Icon.jpg',
'/images/Nakashima_Background.jpeg',
'/images/Instagram copy.png',
'/images/LINE.png',
'/images/Japan.JPG',
'/icons/icon-192x192.png',
'/icons/icon-512x512.png'
];

/* --- 以下、編集不要です --- */

// インストール処理
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})
);
});

// リクエストがあった場合にキャッシュから返す
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})
);
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cacheName => {
if (cacheName !== CACHE_NAME) {
return caches.delete(cacheName);
}
})
);
})
);
});
