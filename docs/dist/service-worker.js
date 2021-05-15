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
    "revision": "e469eddf34b865037df06c45718c511d"
  },
  {
    "url": "assets/css/0.styles.25b03673.css",
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
    "url": "assets/js/10.ef1e4969.js",
    "revision": "ab9f4d8362e2ee9a73682c14443a9e50"
  },
  {
    "url": "assets/js/11.e56c0c27.js",
    "revision": "7fbc9beb9dccc3e54d5d7547e99f1cd0"
  },
  {
    "url": "assets/js/12.5556e188.js",
    "revision": "7d098b6a09ebece4e2d8c5069e38f6af"
  },
  {
    "url": "assets/js/2.199c5c4d.js",
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
    "url": "assets/js/5.f69b5ea9.js",
    "revision": "82ec1627eed5af060d463df614bea5ce"
  },
  {
    "url": "assets/js/6.c35756de.js",
    "revision": "aee0db9b82a8a6bdcf117bd75b590205"
  },
  {
    "url": "assets/js/7.b76d176e.js",
    "revision": "cd266bfd0aef780e97ed3aece3576378"
  },
  {
    "url": "assets/js/8.eb2b113d.js",
    "revision": "f41c294cad0979ad7a6f2569d422b5c4"
  },
  {
    "url": "assets/js/9.2e72e3cb.js",
    "revision": "e4daf4fede3f38fe21ecd90949f91e87"
  },
  {
    "url": "assets/js/app.b47067be.js",
    "revision": "0029e387b5ec941130fdeaf583381699"
  },
  {
    "url": "guide/index.html",
    "revision": "9a1eed118cc4632e26dcffd9e060ae7a"
  },
  {
    "url": "guide/mlsCommonForm.html",
    "revision": "fafe37306bbf13b80577ae4ae8abd38a"
  },
  {
    "url": "guide/mlsCommonTable.html",
    "revision": "c4bced3ff18e2d4d4ecd616fd8f8b6d1"
  },
  {
    "url": "index.html",
    "revision": "0b4d60934387044ae30f7c1c20d51d44"
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
