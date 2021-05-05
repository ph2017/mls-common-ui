/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "babf58402c40af0be91046b3b25c4234"
  },
  {
    "url": "assets/css/0.styles.419daac1.css",
    "revision": "1bb6ef64ad77830945c9f8ce890e14bd"
  },
  {
    "url": "assets/fonts/element-icons.535877f5.woff",
    "revision": "535877f50039c0cb49a6196a5b7517cd"
  },
  {
    "url": "assets/fonts/element-icons.732389de.ttf",
    "revision": "732389ded34cb9c52dd88271f1345af9"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.2c47d329.js",
    "revision": "6262c587c2be8643180b8619b0c51cf8"
  },
  {
    "url": "assets/js/11.066c968a.js",
    "revision": "f08f989db4c92fba5a548ca94eeafcaf"
  },
  {
    "url": "assets/js/2.bae1dd0c.js",
    "revision": "b764b937b0795aab292e6685648de65b"
  },
  {
    "url": "assets/js/3.7e6be7bd.js",
    "revision": "8a36e6cd54df56b9acbd6a6167fbdddf"
  },
  {
    "url": "assets/js/4.035f9db1.js",
    "revision": "1a310683bfa1a0b88a7f21037c1ca102"
  },
  {
    "url": "assets/js/5.c25fa4fe.js",
    "revision": "fb9b520de2c3d91788673e2639be6007"
  },
  {
    "url": "assets/js/6.ec8a80d4.js",
    "revision": "dd7715c85af5e8d9816042d6d1449e03"
  },
  {
    "url": "assets/js/7.13822e46.js",
    "revision": "f609a4eb174581b971419a5006ed7330"
  },
  {
    "url": "assets/js/8.682d79b1.js",
    "revision": "25362b8d8d4d25a6dce38c220d9e1c94"
  },
  {
    "url": "assets/js/9.a84fff39.js",
    "revision": "6bad7258ea30f73ba02c262b88a47ecf"
  },
  {
    "url": "assets/js/app.d545304a.js",
    "revision": "4c7def17f652040ff05bd9c3b34e113f"
  },
  {
    "url": "guide/index.html",
    "revision": "4afad18b34b4616cfb7496a174155ca7"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "4d682b4eebc21fc0268b1a0edd4cd343"
  },
  {
    "url": "index.html",
    "revision": "d18db9c1145d9381a14d444978694f1c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
