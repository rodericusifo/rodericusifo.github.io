importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/.*/],
});

const base_url = "https://api.football-data.org/v2/competitions/2001/";
const base_url1 = "https://api.football-data.org/v2/teams/";

workbox.routing.registerRoute(
  new RegExp(base_url),
  new workbox.strategies.NetworkFirst({
    cacheName: "competition-api",
  })
);

workbox.routing.registerRoute(
  new RegExp(base_url1),
  new workbox.strategies.NetworkFirst({
    cacheName: "teams-api",
  })
);

workbox.routing.registerRoute(
  new RegExp("/"),
  new workbox.strategies.CacheFirst()
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "/img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
