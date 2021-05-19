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
    "revision": "16af779804af35c5ed59d0071f03699b"
  },
  {
    "url": "assets/css/0.styles.f1865d8d.css",
    "revision": "f1bbaa971ac45da16420ffda1a4c81e5"
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
    "url": "assets/js/10.51920972.js",
    "revision": "95469a8551b90f16a26c0c6f619cf962"
  },
  {
    "url": "assets/js/11.f7bacc51.js",
    "revision": "85a8498024fe9582ce196068f389719c"
  },
  {
    "url": "assets/js/12.5556e188.js",
    "revision": "7d098b6a09ebece4e2d8c5069e38f6af"
  },
  {
    "url": "assets/js/2.858c97a7.js",
    "revision": "d54f029343e7a582bc1c09a91b544a1a"
  },
  {
    "url": "assets/js/3.573dd8f0.js",
    "revision": "c91e9b663e5da75e0e6702f908bc7be0"
  },
  {
    "url": "assets/js/4.51b6e4fd.js",
    "revision": "5333d3224fa5a323fce5df47c7ce7a89"
  },
  {
    "url": "assets/js/5.0c8092c4.js",
    "revision": "251eb95135a3fa6da2eccf0a271d3887"
  },
  {
    "url": "assets/js/6.c35756de.js",
    "revision": "aee0db9b82a8a6bdcf117bd75b590205"
  },
  {
    "url": "assets/js/7.8ae565d3.js",
    "revision": "2d998a0c8af914dec72a21c37da2aa52"
  },
  {
    "url": "assets/js/8.eb2b113d.js",
    "revision": "f41c294cad0979ad7a6f2569d422b5c4"
  },
  {
    "url": "assets/js/9.afc8cb1e.js",
    "revision": "5f543b1348be8a9a6b47f34a8353879e"
  },
  {
    "url": "assets/js/app.de01c2ea.js",
    "revision": "c2dac305c74c5aedc76deb36be115872"
  },
  {
    "url": "guide/index.html",
    "revision": "81fba76c19b3d96cf9c3aec2a0d1951f"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "c1bfca759f05e8a78e90cd924ef250ce"
  },
  {
    "url": "guide/mlsCommonTable.html",
    "revision": "7052b6a9e5fe5280baaef6dd4a7414e0"
  },
  {
    "url": "index.html",
    "revision": "4a4c09eef53f7721b8aa8f27386bf894"
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
