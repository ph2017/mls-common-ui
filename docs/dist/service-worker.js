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
    "revision": "91c454218feae2a26c386d7ebc5c4b5c"
  },
  {
    "url": "assets/css/0.styles.b52afdd6.css",
    "revision": "3463baffa66f1eb09bd5855a32219675"
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
    "url": "assets/js/10.fef38ba2.js",
    "revision": "f5451949f30b41e0764603deeb1d406c"
  },
  {
    "url": "assets/js/11.69a04cbf.js",
    "revision": "d9175269cdc67505cf40371db89ea9bf"
  },
  {
    "url": "assets/js/2.142e42f8.js",
    "revision": "1b99e7edc8f12dabd53de123a06c6b15"
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
    "url": "assets/js/6.8d5d41b9.js",
    "revision": "f36cf53511b2c436e961dc4e651ffa28"
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
    "url": "assets/js/9.da80caf0.js",
    "revision": "513a024fd10ad331d92704685d2f7e91"
  },
  {
    "url": "assets/js/app.daf19ee8.js",
    "revision": "14a1594e5fe856565f1e075c1113ec88"
  },
  {
    "url": "guide/index.html",
    "revision": "7e21035991f05e42905a77d5435b2aa2"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "d5210efbcf336e7ddfa02c21183edb93"
  },
  {
    "url": "index.html",
    "revision": "d0c7abc24f50b91e3876494560829283"
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
