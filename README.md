[![Build Status](https://travis-ci.org/kaimallea/isMobile.png)](https://travis-ci.org/kaimallea/isMobile)

# isMobile

A simple JS library that detects if the device visiting the page is an Apple phones/tablet, Android phone/tablet, or a seven inch device (Nexus 7, Kindle Fire, Nook Tablet, Galaxy Tab).


## Why?

I had a specific requirement for a project when I created this:

**`- Redirect all iPhones, iPods, Android phones, and seven inch devices to the mobile site.`**

I couldn't do detection on the back-end, because the entire site is cached and served by Akamai; so I had to do the detection client-side.

I tried to keep the script small (**499 bytes, minified**) and simple, because it would need to execute in the `<head>`, which is generally a bad idea, since JS blocks downloading and rendering of anything else while it parses and executes. In the case of mobile redirection, I don't mind so much, because I want to start the redirect as soon as possible, before the device has a chance to start downloading and rendering stuff. For everything else, this script should just execute fast, so the browser can quickly get back to downloading and rendering.


## Example Usage

I include the minified version of the script, inline, and at the top of the `<head>`. Cellular connections tend to suck, so it would be wasteful overhead to open another connection, just to download <1kb of JS:


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <script>
        // Minified version of isMobile included in the HTML since it's only ~480 bytes
        (function(a){a||(a=window.isMobile={});var c=/Android/i,b=navigator.userAgent;a.apple={};a.apple.phone=/iPhone/i.test(b);a.apple.ipod=/iPod/i.test(b);a.apple.tablet=/iPad/i.test(b);a.apple.device=a.apple.phone||a.apple.ipod||a.apple.tablet;a.android={};a.android.phone=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i.test(b);a.android.tablet=!a.android.phone&&c.test(b);a.android.device=a.android.phone||a.android.tablet;a.seven_inch=/(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)/i.test(b)})(window.isMobile);


        // My own arbitrary use of isMobile, as an example
        (function () {
            var MOBILE_SITE = '/mobile/index.html', // site to redirect to
                NO_REDIRECT = 'noredirect'; // cookie to prevent redirect

            // I only want to redirect iPhones, Android phones and a handful of 7" devices
            if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
                
                // Only redirect if the user didn't previously choose
                // to explicitly view the full site. This is validated
                // by checking if a "noredirect" cookie exists
                if ( document.cookie.indexOf(NO_REDIRECT) === -1 ) {
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

### The script creates a global `isMobile` object with properties that are either `true` or `false`, depending on the device.

## Properties

### `isMobile.apple.phone`
`true` if the device is an iPhone

### `isMobile.apple.ipod`
`true` if the device is an iPod

### `isMobile.apple.tablet`
`true` if the device is an iPad

### `isMobile.apple.device`
`true` if the device is an iPhone _or_ iPad

### `isMobile.android.phone`
`true` if the device is an Android phone

### `isMobile.android.tablet`
`true` if the device is an Android tablet

### `isMobile.android.device`
`true` if the device is an Android phone _or_ tablet

### `isMobile.seven_inch`
`true` if the device is one of the following 7" devices:

- Nexus 7
- Kindle Fire
- Nook Tablet 7 inch
- Galaxy Tab 7 inch
