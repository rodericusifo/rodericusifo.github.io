importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([{"revision":"1332d09d6a64b1b3a90f9639c808858e","url":"css/materialize.css"},{"revision":"ec1df3ba49973dcb9ff212f052d39483","url":"css/materialize.min.css"},{"revision":"59f12cef71e3be2a33a62d7eb07a6c4e","url":"css/style.css"},{"revision":"cb77326deac6f8164ae9ac6db4fc2025","url":"icon-192x192.png"},{"revision":"1489ed1da94402ba25afd48d6d98ee32","url":"icon-512x512.png"},{"revision":"1489ed1da94402ba25afd48d6d98ee32","url":"img/notification.png"},{"revision":"0114791d3f9adaea1870a953efd413b9","url":"img/UEFA-Champions-League-Logo-Background.jpg"},{"revision":"48db86081131a53e5096ac63e339833d","url":"img/UEFA-Champions-League-Standings-Background.jpg"},{"revision":"5076293ed43dfe1c72b856fa5dc50f93","url":"img/UEFA-Champions-League-Teams-Background.jpg"},{"revision":"339bd6317a2ebe632fdcce61bfa9da5b","url":"index.html"},{"revision":"1332b9faec62f835d06aeee857dddb81","url":"index.js"},{"revision":"3ee574bb25315235e633c46eacac0776","url":"js/api.js"},{"revision":"435241fb6794a8241c12b6cc29f10797","url":"js/callApi.js"},{"revision":"e13211ffd6d44f3cbe6daa18ebdd5de6","url":"js/db.js"},{"revision":"a66942528a8af114e8a0ae4b517ab0be","url":"js/idb.js"},{"revision":"9832259e6e013b2e55f342c053c26104","url":"js/materialize.js"},{"revision":"5dcfc8944ed380b2215dc28b3f13835f","url":"js/materialize.min.js"},{"revision":"c14bb31dd2dbb31b1b8c88c04239f5bd","url":"js/nav.js"},{"revision":"f78f37e08667cd67a32de9ebdaa80edb","url":"js/popUp.js"},{"revision":"0368c5533eeb5bb0f5ce44f69d34350f","url":"js/swregister.js"},{"revision":"8ad9e6f97e5f4d9d4139d7a616aaab1e","url":"manifest.json"},{"revision":"6eff84c79d9b990d4cb007558f8e1a03","url":"manifestFCM.json"},{"revision":"acc4743c030038b6a0df60aaac8f2f81","url":"nav.html"},{"revision":"af0976369d87c98dfb21ec825c38f86c","url":"package-lock.json"},{"revision":"0e634b794253e26980fa19cb85674b73","url":"package.json"},{"revision":"6c5ad5370805dcb7fe32664547e095ac","url":"pages/home.html"},{"revision":"3e317e3e2062e016d485aecba7bfd25a","url":"pages/myTeams.html"},{"revision":"bb9be82c85a67f08787350bcedf63e26","url":"pages/standings.html"},{"revision":"961ba735a2dbd293e79be3774a1f8cb3","url":"pages/teams.html"},{"revision":"b33f40c57a216d98ec3df59b396c9243","url":"push.js"},{"revision":"e7100e17397458468cb13f71e3cbb2b4","url":"teamById.html"},{"revision":"e40d1805fcbbb76f1ce21c82f00231e3","url":"teamById.js"},{"revision":"1a71b36e1c57bc60e322bbfd2081df5c","url":"workbox-config.js"}], {
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
