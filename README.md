[![Build Status](https://travis-ci.org/kaimallea/isMobile.png)](https://travis-ci.org/kaimallea/isMobile)
[![Node dependencies status](https://david-dm.org/kaimallea/isMobile.png)](https://david-dm.org/kaimallea/isMobile)

# isMobile

A simple JS library that detects mobile devices.

## Why use isMobile?

You probably shouldn't use this library unless you absolutely have to. In most cases, good [responsive design](https://en.wikipedia.org/wiki/Responsive_web_design) solves the problem of controlling how to
render things across different screen sizes. But there are always edge cases. If you have an edge case,
then this library might be for you.

I had very specific requirements for a project when I created this:

**`- Redirect all iPhones, iPods, Android phones, and seven inch devices to the mobile site.`**

Yep, at the time, a completely separate site had already been created for mobile devices. So I couldn't depend on media queries, feature detection, graceful degradation, progressive enhancement, or any of the cool techniques for selectively displaying things. I had to find a way to redirect visitors on certain devices to the mobile site.

I couldn't do detection on the back-end, because the entire site was generated as HTML, and then cached and served by a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), so I had to do the detection client-side.

So I resorted to User-Agent (UA) sniffing.

I tried to keep the script small (**currently ~1.5k bytes, minified**) and simple, because it would need to execute in the `<head>`, which is generally a bad idea, since JS blocks the downloading and rendering of all assets while it parses and executes. In the case of mobile redirection, I don't mind so much, because I want to start the redirect as soon as possible, before the device has a chance to start downloading and rendering other stuff. For non-mobile platforms, the script should execute fast, so the browser can quickly get back to downloading and rendering.

## How it works in the browser

isMobile runs quickly during initial page load to detect mobile devices; it then creates a JavaScript object with the results.

## How it works in Node.js

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

## Example Usage

I include the minified version of the script, inline, and at the top of the `<head>`. Cellular connections tend to suck, so it would be wasteful overhead to open another connection, just to download ~1.5kb of JS:

<!-- prettier-ignore -->
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script>
      // Minified version of isMobile included in the HTML since it's small
      !function(e){var n=/iPhone/i,t=/iPod/i,r=/iPad/i,a=/\bAndroid(?:.+)Mobile\b/i,p=/Android/i,l=/\bAndroid(?:.+)SD4930UR\b/i,b=/\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,f=/Windows Phone/i,u=/\bWindows(?:.+)ARM\b/i,c=/BlackBerry/i,s=/BB10/i,v=/Opera Mini/i,h=/\b(CriOS|Chrome)(?:.+)Mobile/i,w=/\Mobile(?:.+)Firefox\b/i;function m(e,i){return e.test(i)}function i(e){var i=e||("undefined"!=typeof navigator?navigator.userAgent:""),o=i.split("[FBAN");void 0!==o[1]&&(i=o[0]),void 0!==(o=i.split("Twitter"))[1]&&(i=o[0]);var d={apple:{phone:m(n,i),ipod:m(t,i),tablet:!m(n,i)&&m(r,i),device:m(n,i)||m(t,i)||m(r,i)},amazon:{phone:m(l,i),tablet:!m(l,i)&&m(b,i),device:m(l,i)||m(b,i)},android:{phone:m(l,i)||m(a,i),tablet:!m(l,i)&&!m(a,i)&&(m(b,i)||m(p,i)),device:m(l,i)||m(b,i)||m(a,i)||m(p,i)},windows:{phone:m(f,i),tablet:m(u,i),device:m(f,i)||m(u,i)},other:{blackberry:m(c,i),blackberry10:m(s,i),opera:m(v,i),firefox:m(w,i),chrome:m(h,i),device:m(c,i)||m(s,i)||m(v,i)||m(w,i)||m(h,i)}};return d.any=d.apple.device||d.android.device||d.windows.device||d.other.device,d.phone=d.apple.phone||d.android.phone||d.windows.phone,d.tablet=d.apple.tablet||d.android.tablet||d.windows.tablet,d}"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=i:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=i():"function"==typeof define&&define.amd?define([],e.isMobile=i()):e.isMobile=i()}(this);

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

## Building manually

After checking out the repo, install dependencies:

```shell
npm install
```

Then build a minified, distributable JS file:

```shell
npm run build
```

It will be output to `./dist/isMobile.min.js`.

You can then use it with a `<script>` tag, bundle it with something else or follow the suggestion in the example above and include it inline to save opening another connection.

## Node.js Usage

### Installation

```shell
npm install ismobilejs
```

### Usage

```js
const isMobile = require('ismobilejs');
const userAgent = req.headers['user-agent'];
console.log(isMobile(userAgent).any);
```
