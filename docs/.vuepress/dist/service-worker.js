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
    "revision": "5e939f1dbebcd7d489171d9fd3395f50"
  },
  {
    "url": "assets/css/0.styles.dc369603.css",
    "revision": "a03e615af98e6cec433456704534da5c"
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
    "url": "assets/js/10.ff276bd4.js",
    "revision": "7412c4432631f355e233bb3547e3d46a"
  },
  {
    "url": "assets/js/11.2991e908.js",
    "revision": "089dda54a818eb2b490857e2aea16285"
  },
  {
    "url": "assets/js/12.870863e9.js",
    "revision": "e7334379a76a12f0e1e513e09c8bda82"
  },
  {
    "url": "assets/js/2.37b36ef6.js",
    "revision": "cbc789950d7ed3fbde0715010a162825"
  },
  {
    "url": "assets/js/3.e079e881.js",
    "revision": "73d637d24cd111b5900120efbca17fda"
  },
  {
    "url": "assets/js/4.790f0523.js",
    "revision": "c2afa926136246afa60ee1018f6691f4"
  },
  {
    "url": "assets/js/5.d8a43f68.js",
    "revision": "07240fb2b9fc99af858d2808f0723140"
  },
  {
    "url": "assets/js/6.cee20e82.js",
    "revision": "b76c5fd1193dca6f1aa26241f73d6b78"
  },
  {
    "url": "assets/js/7.196027bf.js",
    "revision": "2ae0b4c117dacbd483dfbc6d85003043"
  },
  {
    "url": "assets/js/8.a2d70917.js",
    "revision": "77e9ee8e814a29e5d3b21dc12fd6d1c9"
  },
  {
    "url": "assets/js/9.a6759a26.js",
    "revision": "621e8cc74b6ac5421922a638175b3f19"
  },
  {
    "url": "assets/js/app.bbf1ca88.js",
    "revision": "39c87ed9c6d75a8d56ec8bd6b1da3356"
  },
  {
    "url": "guide/index.html",
    "revision": "9a4a78c3a0475db506740ef3d54cfbeb"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "66502e728b7ab36f37324db8b5c69291"
  },
  {
    "url": "guide/mlsCommonTable.html",
    "revision": "24d846a16a0689ee6fc6c937083ba2b0"
  },
  {
    "url": "index.html",
    "revision": "e8b719a38dfe8052a7f7c779a7fd0fac"
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
