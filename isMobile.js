/**
 * isMobile.js v0.4.1
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
const apple_phone         = /iPhone/i,
    apple_ipod          = /iPod/i,
    apple_tablet        = /iPad/i,
    android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
    android_tablet      = /Android/i,
    amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
    amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
    windows_phone       = /Windows Phone/i,
    windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
    other_blackberry    = /BlackBerry/i,
    other_blackberry_10 = /BB10/i,
    other_opera         = /Opera Mini/i,
    other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
    other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
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

        'i');           // Case-insensitive matching


class IsMobile {
  constructor(userAgent = null) {
    let ua = userAgent || (window && window.navigator.userAgent) || '';

    // Facebook mobile app's integrated browser adds a bunch of strings that
    // match everything. Strip it out if it exists.
    let tmp = ua.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
        ua = tmp[0];
    }

    // Twitter mobile app's integrated browser on iPad adds a "Twitter for
    // iPhone" string. Same probable happens on other tablet platforms.
    // This will confuse detection so strip it out if it exists.
    tmp = ua.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
        ua = tmp[0];
    }

    this.apple = {
        phone:  this.match(apple_phone, ua),
        ipod:   this.match(apple_ipod, ua),
        tablet: !this.match(apple_phone, ua) && this.match(apple_tablet, ua),
        device: this.match(apple_phone, ua) || this.match(apple_ipod, ua) || this.match(apple_tablet, ua)
    };
    this.amazon = {
        phone:  this.match(amazon_phone, ua),
        tablet: !this.match(amazon_phone, ua) && this.match(amazon_tablet, ua),
        device: this.match(amazon_phone, ua) || this.match(amazon_tablet, ua)
    };
    this.android = {
        phone:  this.match(amazon_phone, ua) || this.match(android_phone, ua),
        tablet: !this.match(amazon_phone, ua) && !this.match(android_phone, ua) && (this.match(amazon_tablet, ua) || this.match(android_tablet, ua)),
        device: this.match(amazon_phone, ua) || this.match(amazon_tablet, ua) || this.match(android_phone, ua) || this.match(android_tablet, ua)
    };
    this.windows = {
        phone:  this.match(windows_phone, ua),
        tablet: this.match(windows_tablet, ua),
        device: this.match(windows_phone, ua) || this.match(windows_tablet, ua)
    };
    this.other = {
        blackberry:   this.match(other_blackberry, ua),
        blackberry10: this.match(other_blackberry_10, ua),
        opera:        this.match(other_opera, ua),
        firefox:      this.match(other_firefox, ua),
        chrome:       this.match(other_chrome, ua),
        device:       this.match(other_blackberry, ua) || this.match(other_blackberry_10, ua) || this.match(other_opera, ua) || this.match(other_firefox, ua) || this.match(other_chrome, ua)
    };
    this.seven_inch = this.match(seven_inch, ua);
    this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

    // excludes 'other' devices and ipods, targeting touchscreen phones
    this.phone = this.apple.phone || this.android.phone || this.windows.phone;

    // excludes 7 inch devices, classifying as phone or tablet is left to the user
    this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

    if (typeof window === 'undefined') {
        return this;
    }
  }

  match(regex, userAgent) {
    return regex.test(userAgent)
  }
}

module.exports = IsMobile;
module.exports.isMobile = (userAgent) => new IsMobile(userAgent);
