[![CI](https://github.com/kaimallea/isMobile/actions/workflows/pull_request.yml/badge.svg)](https://github.com/kaimallea/isMobile/actions/workflows/pull_request.yml)
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
yarn add ismobilejs
```

or

```bash
npm install ismobilejs
```

#### Use

```ts
import isMobile from 'ismobilejs';
const userAgent = req.headers['user-agent'];
console.log(isMobile(userAgent).any);
```

A desktop-style iPad user-agent string cannot be distinguished from a Mac using
this string alone. Server-side detection from the `User-Agent` header therefore
cannot reliably identify these iPads. See [iPadOS detection](#ipados-13-and-later)
for the additional browser information used by isMobile.

### Browser

When importing through a bundler, call the exported function. With no argument,
it reads the browser's navigator; you can also pass `window.navigator` explicitly:

```js
import isMobile from 'ismobilejs';

console.log(isMobile().apple.tablet);
console.log(isMobile(window.navigator).apple.tablet);
```

#### iPadOS 13 and later

An iPad in desktop browsing mode can report a Macintosh user agent. For these
inputs, isMobile uses a heuristic based on `navigator.platform === 'MacIntel'`
and `navigator.maxTouchPoints > 1` to identify an iPad.

Use `isMobile()` or `isMobile(window.navigator)` in the browser. Passing only
`window.navigator.userAgent` discards the platform and touch information needed
for this heuristic. A navigator-shaped object can also be supplied, with a
`userAgent`, `platform`, and, for this heuristic, `maxTouchPoints`.

Device emulation may change the user agent without supplying the same platform
and touch values as a real iPad. Check all three values when investigating a
mismatch; an emulated result is not verification on a physical device. Device
detection is a heuristic, so prefer responsive design or feature detection when
those address your use case.

### jsDelivr CDN [![](https://data.jsdelivr.com/v1/package/npm/ismobilejs/badge)](https://www.jsdelivr.com/package/npm/ismobilejs)

For a plain browser page, load the published browser bundle before reading its
results. It reads the browser's navigator automatically and creates a global
`isMobile` result object:

```html
<script src="https://cdn.jsdelivr.net/npm/ismobilejs@1.1.1/dist/isMobile.min.js"></script>
<script>
  console.log(isMobile.apple.tablet);
</script>
```

This example pins version 1.1.1, which includes the iPadOS detection heuristic.
Visit the [jsDelivr package page](https://www.jsdelivr.com/package/npm/ismobilejs)
to select a different published version.

If you need to inline the library, embed the `dist/isMobile.min.js` file from
your chosen release or build. A separately maintained copy of the minified
implementation can omit later detection fixes.

## Migration: removal of `apple.universal`

The next major release removes `apple.universal` from detection results and
TypeScript declarations. The `iOS-universal … Mac` signature no longer makes
`apple.device` or `any` true by itself: no real-world device example was verified
for this signature (see [#303](https://github.com/kaimallea/isMobile/issues/303)).

Remove reads of `apple.universal`. If your intent is to detect any supported
mobile Apple device, use `apple.device`; use `apple.phone`, `apple.tablet`, or
`apple.ipod` for a specific category. These properties do not replace detection
of the removed signature.

## Building manually

Use Node.js 24 (`nvm use`), then install dependencies and build:

```bash
npm ci
npm run build
```

Three versions of the library will be generated:

1. `./cjs/index.js` - the CommonJS version of the library
2. `./esm/index.js` - the ESModule version of the library
3. `./dist/isMobile.min.js` - the browser version of the library

Additionally, types will be output to `types`.

## Contributing

Run `npm run check` before submitting changes. It builds the library and runs
lint, formatting, type, unit, Chrome, and package checks. Commit `package-lock.json`
when changing dependencies. Use `npm run format` to apply formatting.

Use conventional commit messages (`fix:`, `feat:`, or `chore:`) with `git commit`.
Releases from `main` are automated with semantic-release; leave version updates
to the release workflow.

Before the first release, configure [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
for `kaimallea/isMobile`, workflow `release.yml`, with no environment name.
Require both Node.js CI checks in the repository's branch protection settings.
