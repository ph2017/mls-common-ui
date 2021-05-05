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
    "revision": "ba49da513733214ede57f329e3c20e39"
  },
  {
    "url": "assets/css/0.styles.1ef59a68.css",
    "revision": "c00dd643dfc06e0086f77b43c61a6f38"
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
    "url": "assets/js/10.72f23314.js",
    "revision": "e31bfc3083e27a5f3f6707bf5660564d"
  },
  {
    "url": "assets/js/11.69a04cbf.js",
    "revision": "d9175269cdc67505cf40371db89ea9bf"
  },
  {
    "url": "assets/js/2.079171b3.js",
    "revision": "1c528e0a4a0fd90ceac41b3a7a06a09f"
  },
  {
    "url": "assets/js/3.85233710.js",
    "revision": "9ae6984e7af2d06b53183709aea65ace"
  },
  {
    "url": "assets/js/4.b1bfc361.js",
    "revision": "cab60ade1ee339e7d84d9cab10c1939a"
  },
  {
    "url": "assets/js/5.5e5561e6.js",
    "revision": "7a292a40fbaccb481cdabb72603f3fb3"
  },
  {
    "url": "assets/js/6.47b417a7.js",
    "revision": "d6a77c7b33af0be531604a6ffa6bffa5"
  },
  {
    "url": "assets/js/7.b3379ed0.js",
    "revision": "2b848d6207ec1f4247d309bc889d9ef8"
  },
  {
    "url": "assets/js/8.d07b4100.js",
    "revision": "9f6995a2c1c95342c9f1a7fa18602fbc"
  },
  {
    "url": "assets/js/9.dea790e0.js",
    "revision": "db8b66fe3f2aea59ba1f7f12e7672a19"
  },
  {
    "url": "assets/js/app.bd921a56.js",
    "revision": "6df9a617721c5c1a358d0de7a28189d4"
  },
  {
    "url": "guide/index.html",
    "revision": "e17b4d355314b354b581f2dc3576ffd8"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "b571f8154844243a631f82be33c56467"
  },
  {
    "url": "index.html",
    "revision": "290b896e45102da83a294cea76e92c5e"
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
