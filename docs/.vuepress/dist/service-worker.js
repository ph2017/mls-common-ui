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
    "revision": "e246acd07e12315c12954dc4433c7e16"
  },
  {
    "url": "assets/css/0.styles.8e49d219.css",
    "revision": "5d439cc553ad559d78dd87b15d36fbfc"
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
    "url": "assets/js/4.02b78942.js",
    "revision": "7c803613d603ab1fcd1d0bf5bf051e5e"
  },
  {
    "url": "assets/js/5.6b66ea91.js",
    "revision": "4dcfac81709eac61e9eb0ee3727c8ce5"
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
    "url": "assets/js/app.2e6ea30c.js",
    "revision": "d2c09669ae30d953af4154a1312a7b59"
  },
  {
    "url": "guide/index.html",
    "revision": "d0fe39e9e9defcff3aafc3f869679304"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "321b7ea38c58a41c46d355c22da390a3"
  },
  {
    "url": "index.html",
    "revision": "bfed66e2c306192409257d72b0c470c2"
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
