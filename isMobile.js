/**
 * isMobile.js v0.3.9
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like Blackberry, Mini-Opera and Windows Phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function isMobileModule(root, factory) {
    // UMD (Universal Module Definition)
    // URL: https://github.com/umdjs/umd

    // Initiate the factory for the purposes of creating a class module
    var moduleClass = factory(root);
    var moduleName = 'isMobile';

    var instantiate = function instantiate() {
        var instance = new moduleClass();
        instance.Class = moduleClass;
        return instance;
    };

    if (typeof module !== 'undefined' && module.exports && typeof window === 'undefined') {
        // Node
        module.exports = moduleClass;
    } else if (typeof module !== 'undefined' && module.exports && typeof window !== 'undefined') {
        // Browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(moduleName, [], root[moduleName] = instantiate());
    } else {
        // root e.g. window
        root[moduleName] = instantiate();
    }
})(global || window, function isMobileInterface(global) {
    // Define the module interface

     var reApplePhone        = /iPhone/i,
        reAppleIpod          = /iPod/i,
        reAppleTablet        = /iPad/i,
        reAndroidPhone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        reAndroidTablet      = /Android/i,
        reAmazonPhone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        reAmazonTablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        reWindowsPhone       = /IEMobile/i,
        reWindowsTablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        reOtherBlackberry    = /BlackBerry/i,
        reOtherBlackberry_10 = /BB10/i,
        reOtherOpera         = /Opera Mini/i,
        reOtherChrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        reOtherFirefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        reSevenInch = new global.RegExp(
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

            'i');           // Case-insensitive matching

    // Match a regular expression with a user agent string.
    function match(regex, userAgent) {
        return regex.test(userAgent);
    }

    return function IsMobileClass(userAgent) {
        var ua = userAgent || navigator.userAgent;

        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var uaSplit = ua.split('[FBAN');
        if (uaSplit[1] !== undefined) {
            ua = uaSplit[0];
        }

        this.apple = {
            phone:  match(reApplePhone, ua),
            ipod:   match(reAppleIpod, ua),
            tablet: !match(reApplePhone, ua) && match(reAppleTablet, ua),
            device: match(reApplePhone, ua) || match(reAppleIpod, ua) || match(reAppleTablet, ua)
        };

        this.amazon = {
            phone:  match(reAmazonPhone, ua),
            tablet: !match(reAmazonPhone, ua) && match(reAmazonTablet, ua),
            device: match(reAmazonPhone, ua) || match(reAmazonTablet, ua)
        };

        this.android = {
            phone:  match(reAmazonPhone, ua) || match(reAndroidPhone, ua),
            tablet: !match(reAmazonPhone, ua) && !match(reAndroidPhone, ua) && (match(reAmazonTablet, ua) || match(reAndroidTablet, ua)),
            device: match(reAmazonPhone, ua) || match(reAmazonTablet, ua) || match(reAndroidPhone, ua) || match(reAndroidTablet, ua)
        };

        this.windows = {
            phone:  match(reWindowsPhone, ua),
            tablet: match(reWindowsTablet, ua),
            device: match(reWindowsPhone, ua) || match(reWindowsTablet, ua)
        };

        this.other = {
            blackberry:   match(reOtherBlackberry, ua),
            blackberry10: match(reOtherBlackberry_10, ua),
            opera:        match(reOtherOpera, ua),
            firefox:      match(reOtherFirefox, ua),
            chrome:       match(reOtherChrome, ua),
            device:       match(reOtherBlackberry, ua) || match(reOtherBlackberry_10, ua) || match(reOtherOpera, ua) || match(reOtherFirefox, ua) || match(reOtherChrome, ua)
        };

        this.seven_inch = match(reSevenInch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

        // Excludes 'other' devices and IPods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

        // Excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (global === undefined) {
            return this;
        }
    };
});
