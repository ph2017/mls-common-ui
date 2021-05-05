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
    "revision": "f7c63df0f49ac202e6544d8008e2fc0c"
  },
  {
    "url": "assets/css/0.styles.f3a5952d.css",
    "revision": "235a53b9e9deff5ac374d96b7c737693"
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
    "url": "assets/js/app.04e1706c.js",
    "revision": "6cc8c7a2f5aa6afc97e7e4d3f0ee9e7c"
  },
  {
    "url": "guide/index.html",
    "revision": "082da4ac78d245c85cf35788b7b1766f"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "15ae814fd139d345a062d543bc7c739c"
  },
  {
    "url": "index.html",
    "revision": "b7f65394254c2033ed1d7bdb74df2176"
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
