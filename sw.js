const swCache = [
  '/',
  '/assets/img/starwars-logo.jpg',
  '/assets/img/landing-page/landing-background.jpg',
  '/assets/img/landing-page/landing-obi.jpg',
  '/assets/img/landing-page/landing-vs.jpg',
  '/assets/fonts/starjedi.ttf',
  '/assets/sounds/hello-there.ogg',
  '/assets/sounds/lightsaber.wav',
  '/assets/styles.css',
  '/assets/main.js'
]

// Then method
// self.addEventListener('install', event => {
//   console.log('Sw Installed');
//   event.waitUntil(
//     caches.open('swCache').then(cache => {
//       return cache.addAll(swCache);
//     })
//   );
// });

// const expectedCaches = ['static-v2'];
//
// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(keys => Promise.all(
//       keys.map(key => {
//         if (!expectedCaches.includes(key)) {
//           return caches.delete(key);
//         }
//       })
//     ))
//   );
// });
//
// self.addEventListener('fetch', event => {
//   console.log('fetching ->', event.request);
//   event.respondWith(cacheFirst(event.request));
// })
//
// const cacheFirst = (request) => {
//   caches.match(request)
//     .then(cacheResponse => {
//       return cacheResponse || fetch(request);
//     })
// }

// Async await method
self.addEventListener('install', async event => {
  console.log('Sw Installed with await');
  const cache = await caches.open('swCache');
  cache.addAll(swCache);
})

self.addEventListener('fetch', async event => {
  // console.log('await fetching ->', event.request);
  const request = event.request;
  event.respondWith(cacheFirst(request));
})

const cacheFirst = async (request) => {
  const cacheResponse = await caches.match(request);
  return cacheResponse || fetch(request);
}

// Push notifications
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = '¡Star Wars!';
  const options = {
    body: event.data.text(),
    icon: 'icons/icon-72x72.png',
    badge: 'icons/icon-72x72.png'
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});

// Workbox method
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
//
// // Set Caches names
// workbox.core.setCacheNameDetails({
//   prefix: 'sw-app',
//   suffix: 'v1',
//   precache: 'custom-precache-name',
//   runtime: 'custom-runtime-name'
// });
//
// // const matchFunction = ({url, event}) => { //registerRoute Callback
// // // Return true if the route should match
// // return false;
// // };
//
// workbox.routing.registerRoute(
//   /\.(?:png|gif|jpg|jpeg|svg)$/,
//   workbox.strategies.cacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// );
//
// workbox.routing.registerRoute(
//   /\.(?:js|css|html)$/,
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'static-resources',
//   })
// );


// workbox.routing.registerRoute(
//   '/assets/images/anaur.jpg' //Sting
//   matchFunction, //Callback function
//   new RegExp('.*\.js'), //Regular Expression
//
//   workbox.strategies.networkFirst();
//   workbox.strategies.cacheFirst();
//   workbox.strategies.networkOnly();
//   workbox.strategies.cacheOnly({cacheName: 'my-cache-name', plugins: [...]});
//   workbox.strategies.staleWhileRevalidate() //Cache to respond as fast as you can, and then use network to update the cache.
// );
