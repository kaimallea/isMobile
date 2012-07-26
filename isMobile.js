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
        apple_tablet = /iPad/i,
        android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
        android_tablet = /Android/i,
        seven_inch = /(?:Nexus 7|BNTV250A|Kindle Fire|Silk|GT-P1000)/i,
        ua = navigator.userAgent;

    IM.apple = {};
    IM.apple.phone = apple_phone.test(ua);
    IM.apple.tablet = apple_tablet.test(ua);
    IM.apple.device = IM.apple.phone || IM.apple.tablet;

    IM.android = {};
    IM.android.phone = android_phone.test(ua),
    IM.android.tablet = ( !IM.android.phone && android_tablet.test(ua) );
    IM.android.device = IM.android.phone || IM.android.tablet;

    IM.seven_inch = seven_inch.test(ua);

})(window.isMobile);
