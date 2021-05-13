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
    "revision": "a9ec11c371632dbb47c5a10aef37158b"
  },
  {
    "url": "assets/css/0.styles.bf89a9f1.css",
    "revision": "c8326f1e755a6aa6866b0374290cf4c7"
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
    "url": "assets/js/10.dbc118fe.js",
    "revision": "915a7dcabeb7dae1710e22607fb55682"
  },
  {
    "url": "assets/js/11.3219dca1.js",
    "revision": "94bf3893f803fe7050c69ed26eb38072"
  },
  {
    "url": "assets/js/12.45204edd.js",
    "revision": "575640c3d65b9faa678511d40edf048e"
  },
  {
    "url": "assets/js/2.bdb87512.js",
    "revision": "11222f006d0545173ac9909b358b5a13"
  },
  {
    "url": "assets/js/3.c1b4aad6.js",
    "revision": "facac9536cf6a507a830275ac0221cd0"
  },
  {
    "url": "assets/js/4.05f2f432.js",
    "revision": "e2a22c9f43d79f48701061a60a62e0b4"
  },
  {
    "url": "assets/js/5.1122e560.js",
    "revision": "22d3945ce5006e28e894bcdac9d42781"
  },
  {
    "url": "assets/js/6.33e4186e.js",
    "revision": "c548a7ba16485391e140c2de9f3a4381"
  },
  {
    "url": "assets/js/7.dfc0a067.js",
    "revision": "352bf4580d075e123f20917631ba81c9"
  },
  {
    "url": "assets/js/8.e69c9e9e.js",
    "revision": "d9f04e926809c83a8b0c969a472e716a"
  },
  {
    "url": "assets/js/9.79d35dd3.js",
    "revision": "4e76bc85281f69c76532c02a4b9e50df"
  },
  {
    "url": "assets/js/app.71df4590.js",
    "revision": "34d9f466518dae405da77605f093e7ef"
  },
  {
    "url": "guide/index.html",
    "revision": "a25be2e089bb3fe348c1e54454171b87"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "2a8e50899df5529d0a4edab9ab823be5"
  },
  {
    "url": "guide/mlsCommonTable.html",
    "revision": "b1894a0c8d62fdbfb7bff7d6756d4bc8"
  },
  {
    "url": "index.html",
    "revision": "3f39617eb7fb60d814d284960ca3298f"
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
