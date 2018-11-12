(function(global) {
  var apple_phone = /iPhone/i,
    apple_ipod = /iPod/i,
    apple_tablet = /iPad/i,
    android_phone = /\bAndroid(?:.+)Mobile\b/i, // Match 'Android' AND 'Mobile'
    android_tablet = /Android/i,
    amazon_phone = /\bAndroid(?:.+)SD4930UR\b/i,
    amazon_tablet = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
    windows_phone = /Windows Phone/i,
    windows_tablet = /\bWindows(?:.+)ARM\b/i, // Match 'Windows' AND 'ARM'
    other_blackberry = /BlackBerry/i,
    other_blackberry_10 = /BB10/i,
    other_opera = /Opera Mini/i,
    other_chrome = /\b(CriOS|Chrome)(?:.+)Mobile/i,
    other_firefox = /\Mobile(?:.+)Firefox\b/i; // Match 'Mobile' AND 'Firefox'

  function match(regex, userAgent) {
    return regex.test(userAgent);
  }

  function isMobile(userAgent) {
    var ua =
      userAgent ||
      (typeof navigator !== 'undefined' ? navigator.userAgent : '');

    // Facebook mobile app's integrated browser adds a bunch of strings that
    // match everything. Strip it out if it exists.
    var tmp = ua.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0];
    }

    // Twitter mobile app's integrated browser on iPad adds a "Twitter for
    // iPhone" string. Same probably happens on other tablet platforms.
    // This will confuse detection so strip it out if it exists.
    tmp = ua.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0];
    }

    var result = {
      apple: {
        phone: match(apple_phone, ua),
        ipod: match(apple_ipod, ua),
        tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
        device:
          match(apple_phone, ua) ||
          match(apple_ipod, ua) ||
          match(apple_tablet, ua)
      },
      amazon: {
        phone: match(amazon_phone, ua),
        tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
        device: match(amazon_phone, ua) || match(amazon_tablet, ua)
      },
      android: {
        phone: match(amazon_phone, ua) || match(android_phone, ua),
        tablet:
          !match(amazon_phone, ua) &&
          !match(android_phone, ua) &&
          (match(amazon_tablet, ua) || match(android_tablet, ua)),
        device:
          match(amazon_phone, ua) ||
          match(amazon_tablet, ua) ||
          match(android_phone, ua) ||
          match(android_tablet, ua)
      },
      windows: {
        phone: match(windows_phone, ua),
        tablet: match(windows_tablet, ua),
        device: match(windows_phone, ua) || match(windows_tablet, ua)
      },
      other: {
        blackberry: match(other_blackberry, ua),
        blackberry10: match(other_blackberry_10, ua),
        opera: match(other_opera, ua),
        firefox: match(other_firefox, ua),
        chrome: match(other_chrome, ua),
        device:
          match(other_blackberry, ua) ||
          match(other_blackberry_10, ua) ||
          match(other_opera, ua) ||
          match(other_firefox, ua) ||
          match(other_chrome, ua)
      }
    };
    (result.any =
      result.apple.device ||
      result.android.device ||
      result.windows.device ||
      result.other.device),
      // excludes 'other' devices and ipods, targeting touchscreen phones
      (result.phone =
        result.apple.phone || result.android.phone || result.windows.phone),
      (result.tablet =
        result.apple.tablet || result.android.tablet || result.windows.tablet);

    return result;
  }

  if (
    typeof module !== 'undefined' &&
    module.exports &&
    typeof window === 'undefined'
  ) {
    // Node.js
    module.exports = isMobile;
  } else if (
    typeof module !== 'undefined' &&
    module.exports &&
    typeof window !== 'undefined'
  ) {
    // Browserify
    module.exports = isMobile();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], (global.isMobile = isMobile()));
  } else {
    global.isMobile = isMobile();
  }
})(this);
