/**
 * isMobile.js
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, and any kind of seven inch
 * device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (IM) {
    if (!IM) {
        IM = window.isMobile = {};
    }

    var apple_phone = /iPhone/i,
        apple_ipod = /iPod/i,
        apple_tablet = /iPad/i,
        android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet = /Android/i,
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7
            
            '|' +           // OR
            
            'BNTV250' +     // B&N Nook Tablet 7 inch
            
            '|' +           // OR
            
            'Kindle Fire' + // Kindle Fire
            
            '|' +           // OR
            
            'Silk' +        // Kindle Fire, Silk Accelerated
            
            '|' +           // OR
            
            'GT-P1000' +    // Galaxy Tab 7 inch
            
            ')',            // End non-capturing group
            
            'i'),           // Case-insensitive matching

        ua = navigator.userAgent;

    IM.apple = {};
    IM.apple.phone = apple_phone.test(ua);
    IM.apple.ipod = apple_ipod.test(ua);
    IM.apple.tablet = apple_tablet.test(ua);
    IM.apple.device = IM.apple.phone || IM.apple.ipod || IM.apple.tablet;

    IM.android = {};
    IM.android.phone = android_phone.test(ua),
    IM.android.tablet = ( !IM.android.phone && android_tablet.test(ua) );
    IM.android.device = IM.android.phone || IM.android.tablet;

    IM.seven_inch = seven_inch.test(ua);

})(window.isMobile);
