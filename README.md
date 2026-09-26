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
- `isMobile.apple.universal`
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

Or pass in a `window.navigator`-shaped object that includes at least a `userAgent` property. To properly detect iPad on iOS 13, the object should also include the `platform` and `maxTouchPoints` properties.

```js
// this is just an example. window.navigator is readonly in the browser
window.navigator = {
  ...
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko)',
  platform: 'MacIntel',
  maxTouchPoints: 2,
  ..
}
```

```ts
import isMobile from 'ismobilejs';
console.log(isMobile(window.navigator).apple.tablet);
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
      (function () {var a={};var f=/iPhone/i,h=/iPod/i,i=/iPad/i,r=/\biOS-universal(?:.+)Mac\b/i,g=/\bAndroid(?:.+)Mobile\b/i,j=/Android/i,c=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,d=/Silk/i,b=/Windows Phone/i,k=/\bWindows(?:.+)ARM\b/i,m=/BlackBerry/i,n=/BB10/i,o=/Opera Mini/i,p=/\b(CriOS|Chrome)(?:.+)Mobile/i,q=/Mobile(?:.+)Firefox\b/i;function s(l){return function($){return $.test(l)}}function e(l){var $=(l=l||("undefined"!=typeof navigator?navigator.userAgent:"")).split("[FBAN");void 0!==$[1]&&(l=$[0]),void 0!==($=l.split("Twitter"))[1]&&(l=$[0]);var a=s(l),e={apple:{phone:a(f)&&!a(b),ipod:a(h),tablet:!a(f)&&a(i)&&!a(b),universal:a(r),device:(a(f)||a(h)||a(i))&&!a(b)},amazon:{phone:a(c),tablet:!a(c)&&a(d),device:a(c)||a(d)},android:{phone:!a(b)&&a(c)||!a(b)&&a(g),tablet:!a(b)&&!a(c)&&!a(g)&&(a(d)||a(j)),device:!a(b)&&(a(c)||a(d)||a(g)||a(j))||a(/\bokhttp\b/i)},windows:{phone:a(b),tablet:a(k),device:a(b)||a(k)},other:{blackberry:a(m),blackberry10:a(n),opera:a(o),firefox:a(q),chrome:a(p),device:a(m)||a(n)||a(o)||a(q)||a(p)},any:!1,phone:!1,tablet:!1};return e.any=e.apple.universal||e.apple.device||e.android.device||e.windows.device||e.other.device,e.phone=e.apple.phone||e.android.phone||e.windows.phone,e.tablet=e.apple.tablet||e.android.tablet||e.windows.tablet,e}a=e();if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=a}else if(typeof define==="function"&&define.amd){define(function(){return a})}else{this["isMobile"]=a}})();

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

Use Node.js 24 LTS (`nvm use`) and npm. CI also checks Node.js 22. These are
requirements for contributing, not new runtime requirements for the library.

```bash
npm ci
npm run check
```

`npm ci` installs the locked development dependencies and Puppeteer's matching
Chrome browser. To install tooling without downloading a browser, set
`PUPPETEER_SKIP_DOWNLOAD=true`; browser tests still require a matching browser
before they can run (`npx puppeteer browsers install chrome`).

| Command                | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm run build`        | Generate CommonJS, ESM, browser bundle, and declarations |
| `npm run typecheck`    | Type-check source and tests                              |
| `npm run lint`         | Check source and tooling with ESLint                     |
| `npm run format:check` | Check formatting                                         |
| `npm run format`       | Apply formatting                                         |
| `npm run test:unit`    | Run device classification tests                          |
| `npm run test:browser` | Test the built bundle in headless Chrome                 |
| `npm run test:package` | Pack and test the built npm artifact                     |
| `npm run check`        | Run all local checks in order                            |

Run `npm run build` before the browser or package tests when using them
individually. `npm pack` also builds automatically via `prepack`.

The build generates these existing public entry points:

1. `cjs/index.js` — CommonJS, with the function at `require('ismobilejs').default`.
2. `esm/index.js` — ES module with a default function export.
3. `dist/isMobile.min.js` — standalone UMD bundle that evaluates immediately and
   exposes an `isMobile` result object (also supports AMD and CommonJS loading).
4. `types/index.d.ts` — TypeScript declarations.

TypeScript and Rollup emit ES5-compatible library/browser code. Generated output
is ignored by git. An explicit package allowlist keeps development configuration,
tests, and tooling out of npm; the library has no runtime dependencies.

## Contributing

Run `npm run check` before submitting changes. Commit `package-lock.json` whenever
dependencies change, and use `npm ci` for repeatable installs. TypeScript stays on
5.9 while the lint/parser tooling's supported version range and ES5 output are
verified; upgrade it deliberately with the package tests.

Use conventional commit messages, for example `fix: correct a device match`,
`feat: add a detection option`, or `chore: update tooling`. Normal `git commit`
works; no global commit helper or git hooks are required.

Browser tests explicitly set the platform and touch-point inputs and navigate
after registering document initialization scripts. Device emulation does not
set every navigator property, and initialization scripts need a new document.
Keep those inputs explicit so tests behave consistently on macOS and Linux.
These tests verify the bundle and supplied signals; they do not replace
real-device validation of detection heuristics.

Detection tests require literal boolean results and cover the iPad heuristic's
platform and touch-point boundaries, the legacy universal signature, and calls
without a browser navigator. Package tests compile consumers using every supported
argument form and parse the shipped CommonJS/browser JavaScript as ES5. The syntax
check does not establish availability of runtime APIs or execution on old browsers.
High line coverage alone missed regressions in these contracts during the test
audit; the regression cases now exercise them explicitly.

### Releases

Pushes to `main` run the same Node.js 22/24 checks as pull requests, including
browser/package tests and an npm dependency audit. Only after both jobs pass does
semantic-release calculate a version, publish to npm, tag the commit, and create
a GitHub release. `fix:` releases a patch, `feat:` a minor, and breaking changes
a major; `chore:` and `docs:` alone do not release. Keep the development version
in package.json; semantic-release sets the published version from git history.

Before the first release, configure an npm **trusted publisher** for `ismobilejs`:
GitHub owner `kaimallea`, repository `isMobile`, workflow `release.yml`, and no
environment name. This uses GitHub OIDC rather than a long-lived npm token.
The workflow uses the built-in `GITHUB_TOKEN` for tags and GitHub releases; it
does not require the old `GH_TOKEN` or `NPM_TOKEN` secrets. See the
[npm trusted publishing guide](https://docs.npmjs.com/trusted-publishers/) and
[semantic-release GitHub Actions guidance](https://semantic-release.gitbook.io/semantic-release/recipes/ci-configurations/github-actions).

Require both Node checks in the repository's branch protection/ruleset. These
repository and npm account settings are separate from the checked-in workflows.
The release workflow can also be run manually on `main` after correcting a
publishing configuration failure. A published npm version is immutable: fix a
bad release with a new version rather than attempting to overwrite it.

CI uses the Ubuntu runner's installed Google Chrome so its AppArmor policy
permits the Chrome sandbox. Local tests use Puppeteer's downloaded browser by
default; `PUPPETEER_EXECUTABLE_PATH` can select an installed Chrome explicitly.
