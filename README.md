[![Build Status](https://travis-ci.org/kaimallea/isMobile.png)](https://travis-ci.org/kaimallea/isMobile)
[![Node dependencies status](https://david-dm.org/kaimallea/isMobile.png)](https://david-dm.org/kaimallea/isMobile)
[![](https://data.jsdelivr.com/v1/package/npm/ismobilejs/badge)](https://www.jsdelivr.com/package/npm/ismobilejs)

# isMobile

A simple JS library that detects mobile devices in both the browser and NodeJS.

## Why use isMobile?

### In the Browser

You might not need this library. In most cases, [responsive design](https://en.wikipedia.org/wiki/Responsive_web_design) solves the problem of controlling how to render things across different screen sizes. I recommend a [mobile first](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00) approach. But there are always edge cases. If you have an edge case, then this library might be for you.

My edge case at the time was redirecting users to a completely separate mobile site. I tried to keep this script small (**currently ~1.3k bytes, minified**) and simple, because it would need to execute in the `<head>`, which is generally a bad idea, since JS blocks the downloading and rendering of all assets while it parses and executes. In the case of mobile redirection, I don't mind so much, because I want to start the redirect as soon as possible, before the device has a chance to start downloading and rendering other stuff. For non-mobile platforms, the script should execute fast, so the browser can quickly get back to downloading and rendering.

#### How it works in the browser

isMobile runs quickly during initial page load to detect mobile devices; it then creates a JavaScript object with the results.

### In NodeJS

You might want to use this library to do server-side device detection to minimize the amount of bytes you send back to visitors. Or you have your own arbitrary use case.

#### How is works in NodeJS

You import and call the `isMobile` function, passing it a user agent string; it then returns a JavaScript object with the results.

## Devices detected by isMobile

In a browser, the following properties of the global `isMobile` object will either be `true` or `false`. In Node, `isMobile` will be whatever you named the variable.

### Apple devices

- `isMobile.apple.phone`
- `isMobile.apple.ipod`
- `isMobile.apple.tablet`
- `isMobile.apple.device` (any mobile Apple device)

### Android devices

- `isMobile.android.phone`
- `isMobile.android.tablet`
- `isMobile.android.device` (any mobile Android device; OkHttp user agents will match this)

### Amazon Silk devices (also passes Android checks)

- `isMobile.amazon.phone`
- `isMobile.amazon.tablet`
- `isMobile.amazon.device` (any mobile Amazon Silk device)

### Windows devices

- `isMobile.windows.phone`
- `isMobile.windows.tablet`
- `isMobile.windows.device` (any mobile Windows device)

### "Other" devices

- `isMobile.other.blackberry_10`
- `isMobile.other.blackberry`
- `isMobile.other.opera` (Opera Mini)
- `isMobile.other.firefox`
- `isMobile.other.chrome`
- `isMobile.other.device` (any "Other" device)

### Aggregate Groupings

- `isMobile.any` - any device matched
- `isMobile.phone` - any device in the 'phone' groups above
- `isMobile.tablet` - any device in the 'tablet' groups above

## Usage

### Node.js

#### Install

```bash
yarn install ismobilejs
```

#### Use

```ts
import isMobile from 'ismobilejs';
const userAgent = req.headers['user-agent'];
console.log(isMobile(userAgent).any);
```

### Browser

A real-word example: I include the minified version of the script, inline, and at the top of the `<head>`. Cellular connections tend to suck, so it would be wasteful overhead to open another connection, just to download ~1.3kb of JS:

<!-- prettier-ignore -->
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script>
      // Minified version of isMobile included in the HTML since it's small
      (function () {var f=/iPhone/i,j=/iPod/i,p=/iPad/i,g=/\bAndroid(?:.+)Mobile\b/i,i=/Android/i,d=/\bAndroid(?:.+)SD4930UR\b/i,e=/\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,c=/Windows Phone/i,h=/\bWindows(?:.+)ARM\b/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/\b(CriOS|Chrome)(?:.+)Mobile/i,o=/Mobile(?:.+)Firefox\b/i;function b($,a){return $.test(a)}function a($){var a=($=$||("undefined"!=typeof navigator?navigator.userAgent:"")).split("[FBAN");void 0!==a[1]&&($=a[0]),void 0!==(a=$.split("Twitter"))[1]&&($=a[0]);var r={apple:{phone:b(f,$)&&!b(c,$),ipod:b(j,$),tablet:!b(f,$)&&b(p,$)&&!b(c,$),device:(b(f,$)||b(j,$)||b(p,$))&&!b(c,$)},amazon:{phone:b(d,$),tablet:!b(d,$)&&b(e,$),device:b(d,$)||b(e,$)},android:{phone:!b(c,$)&&b(d,$)||!b(c,$)&&b(g,$),tablet:!b(c,$)&&!b(d,$)&&!b(g,$)&&(b(e,$)||b(i,$)),device:!b(c,$)&&(b(d,$)||b(e,$)||b(g,$)||b(i,$))||b(/\bokhttp\b/i,$)},windows:{phone:b(c,$),tablet:b(h,$),device:b(c,$)||b(h,$)},other:{blackberry:b(k,$),blackberry10:b(l,$),opera:b(m,$),firefox:b(o,$),chrome:b(n,$),device:b(k,$)||b(l,$)||b(m,$)||b(o,$)||b(n,$)},any:!1,phone:!1,tablet:!1};return r.any=r.apple.device||r.android.device||r.windows.device||r.other.device,r.phone=r.apple.phone||r.android.phone||r.windows.phone,r.tablet=r.apple.tablet||r.android.tablet||r.windows.tablet,r}window.isMobile=a();})();

      // My own arbitrary use of isMobile, as an example
      (function() {
        var MOBILE_SITE = '/mobile/index.html', // site to redirect to
          NO_REDIRECT = 'noredirect'; // cookie to prevent redirect

        // I only want to redirect iPhones, Android phones
        if (isMobile.apple.phone || isMobile.android.phone) {
          // Only redirect if the user didn't previously choose
          // to explicitly view the full site. This is validated
          // by checking if a "noredirect" cookie exists
          if (document.cookie.indexOf(NO_REDIRECT) === -1) {
            document.location = MOBILE_SITE;
          }
        }
      })();
    </script>
  </head>
  <body>
    <!-- imagine lots of html and content -->
  </body>
</html>
```

### jsDelivr CDN [![](https://data.jsdelivr.com/v1/package/npm/ismobilejs/badge)](https://www.jsdelivr.com/package/npm/ismobilejs)

Alternatively, you can include this library via [jsDelivr CDN](https://www.jsdelivr.com/package/npm/ismobilejs) in a `script` tag:

`<script src="https://cdn.jsdelivr.net/npm/ismobilejs@1/dist/isMobile.min.js"></script>`

**Visit the isMobile [jsDelivr page](https://www.jsdelivr.com/package/npm/ismobilejs) to get the most up-to-date URL pointing to the lastest version.**

## Building manually

After checking out the repo, install dependencies:

```bash
yarn install
```

Then build the library:

```bash
yarn build
```

Three versions of the library will be generated:

1. `./cjs/index.js` - the CommonJS version of the library
2. `./esm/index.js` - the ESModule version of the library
3. `./dist/isMobile.min.js` - the browser version of the library

Additionally, types will be output to `types`.

## Contributing

This library uses Spotify's [web-scripts](https://github.com/spotify/web-scripts) project to build, lint, test, format and release the this library.

You must use `yarn commit` rather than `git commit` to commit files. This enforced commit messages to following a specific format and enables automation of release notes and version bump.
