# isMobile


A simple JS library that detects Apple phones/tablets, Android phones/tablets, and then any kind of seven inch device.


## Why?

I had a specific requirement for a project when I created this:

`- Redirect all iPhones, Android phones, and seven inch devices to the mobile site.`

I couldn't do detection on the back-end, because the entire site is cached and served by Akamai; so I had to do the detection client-side.

I tried to keep the script small (457 bytes, minified) and simple, because it would need to execute in the `<head>`, which is generally a bad idea, since JS blocks downloading and rendering of anything else while it parses and executes. In the case of mobile redirection, I don't mind so much, because I want to start the redirect as soon as possible, before the device has a chance to start downloading and rendering stuff. For everything else, this script should just execute fast, so the browser can quickly get back to downloading and rendering.


## Example Usage

I include the script inline, and at the top of the `<head>`, because mobile connections suck, and I don't want to waste precious time opening another connection:


```javascript

// Assume the minified version of script is defined above this, inline

var MOBILE_SITE = '/mobile/index.html';

if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
    
    // .. Cookie logic (maybe the user explicitly chose to view full site before)

    document.location = MOBILE_SITE;
}

```