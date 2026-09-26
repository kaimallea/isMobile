import isMobile, { isMobileResult } from '../';

describe('Apple', () => {
  let mobile: isMobileResult;
  let userAgent: string;

  describe('iPhone UserAgent', () => {
    beforeEach(() => {
      userAgent =
        'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3';
      mobile = isMobile(userAgent);
    });

    test('should be an iPhone', () => {
      expect(mobile.apple.phone).toBe(true);
    });

    test('should not be an iPad', () => {
      expect(mobile.apple.tablet).toBe(false);
    });

    test('should not be an iPod', () => {
      expect(mobile.apple.ipod).toBe(false);
    });

    test('should be matched as Any Phone', () => {
      expect(mobile.phone).toBe(true);
    });

    test('should be an Apple device', () => {
      expect(mobile.apple.device).toBe(true);
    });
  });

  describe('iPad UserAgent', () => {
    beforeEach(() => {
      userAgent =
        'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10';
      mobile = isMobile(userAgent);
    });

    test('should not be an iPhone', () => {
      expect(mobile.apple.phone).toBe(false);
    });

    test('should be an iPad', () => {
      expect(mobile.apple.tablet).toBe(true);
    });

    test('should not be an iPod', () => {
      expect(mobile.apple.ipod).toBe(false);
    });

    test('should be matched as Any Tablet', () => {
      expect(mobile.tablet).toBe(true);
    });

    test('should be an Apple device', () => {
      expect(mobile.apple.device).toBe(true);
    });
  });

  describe('iPad on iOS 13', () => {
    beforeEach(() => {
      const nav = {
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko)',
        platform: 'MacIntel',
        maxTouchPoints: 4,
      };
      mobile = isMobile(nav);
    });

    test('should not be an iPhone', () => {
      expect(mobile.apple.phone).toBe(false);
    });

    test('should be an iPad', () => {
      expect(mobile.apple.tablet).toBe(true);
    });

    test('should not be an iPod', () => {
      expect(mobile.apple.ipod).toBe(false);
    });

    test('should be matched as Any Tablet', () => {
      expect(mobile.tablet).toBe(true);
    });

    test('should be an Apple device', () => {
      expect(mobile.apple.device).toBe(true);
    });
  });

  test.each([
    { platform: 'MacIntel', maxTouchPoints: undefined, tablet: false },
    { platform: 'MacIntel', maxTouchPoints: 0, tablet: false },
    { platform: 'MacIntel', maxTouchPoints: 1, tablet: false },
    { platform: 'MacIntel', maxTouchPoints: 2, tablet: true },
    { platform: 'Win32', maxTouchPoints: 4, tablet: false },
    { platform: 'Linux x86_64', maxTouchPoints: 4, tablet: false },
    { platform: '', maxTouchPoints: 4, tablet: false },
  ])(
    'desktop-style UA with $platform and $maxTouchPoints touch points: tablet=$tablet',
    ({ platform, maxTouchPoints, tablet }) => {
      const result = isMobile({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko)',
        platform,
        ...(maxTouchPoints === undefined ? {} : { maxTouchPoints }),
      });

      expect(result).toMatchObject({
        apple: { tablet, device: tablet, phone: false },
        any: tablet,
        tablet,
        phone: false,
      });
    },
  );

  test('a universal Apple signature matches a device without claiming phone or tablet', () => {
    // Synthetic signature fixture, not a claim about a particular physical device.
    const result = isMobile('iOS-universal Mac');

    expect(result.apple).toEqual({
      phone: false,
      ipod: false,
      tablet: false,
      universal: true,
      device: true,
    });
    expect(result.any).toBe(true);
    expect(result.phone).toBe(false);
    expect(result.tablet).toBe(false);
  });

  describe('iPod UserAgent', () => {
    beforeEach(() => {
      userAgent =
        'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3';
      mobile = isMobile(userAgent);
    });

    test('should not be an iPhone', () => {
      expect(mobile.apple.phone).toBe(false);
    });

    test('should not be an iPad', () => {
      expect(mobile.apple.tablet).toBe(false);
    });

    test('should be an iPod', () => {
      expect(mobile.apple.ipod).toBe(true);
    });

    test('should be an Apple device', () => {
      expect(mobile.apple.device).toBe(true);
    });
  });

  describe('Facebook iPhone App UserAgent', () => {
    beforeEach(() => {
      userAgent =
        'Mozilla/5.0 (iPhone; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B410 [FBAN/FBIOS;FBAV/20.1.0.15.10;FBBV/5758778;FBDV/iPad5,4;FBMD/iPad;FBSN/iPhone OS;FBSV/8.1;FBSS/2; FBCR/;FBID/tablet;FBLC/fi_FI;FBOP/1]';
      mobile = isMobile(userAgent);
    });

    test('should be an iPhone', () => {
      expect(mobile.apple.phone).toBe(true);
    });

    test('should not be an iPad', () => {
      expect(mobile.apple.tablet).toBe(false);
    });

    test('should not be an iPod', () => {
      expect(mobile.apple.ipod).toBe(false);
    });

    test('should be an Apple device', () => {
      expect(mobile.apple.device).toBe(true);
    });
  });

  describe('Facebook iPad App UserAgent', () => {
    beforeEach(() => {
      userAgent =
        'Mozilla/5.0 (iPad; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B410 [FBAN/FBIOS;FBAV/20.1.0.15.10;FBBV/5758778;FBDV/iPad5,4;FBMD/iPad;FBSN/iPhone OS;FBSV/8.1;FBSS/2; FBCR/;FBID/tablet;FBLC/fi_FI;FBOP/1]';
      mobile = isMobile(userAgent);
    });

    test('should not be an iPhone', () => {
      expect(mobile.apple.phone).toBe(false);
    });

    test('should be an iPad', () => {
      expect(mobile.apple.tablet).toBe(true);
    });

    test('should not be an iPod', () => {
      expect(mobile.apple.ipod).toBe(false);
    });

    test('should be an Apple device', () => {
      expect(mobile.apple.device).toBe(true);
    });
  });

  describe('Twitter iPhone App UserAgent', () => {
    beforeEach(() => {
      userAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13D15 Twitter for iPhone';
      mobile = isMobile(userAgent);
    });

    test('should be an iPhone', () => {
      expect(mobile.apple.phone).toBe(true);
    });

    test('should not be an iPad', () => {
      expect(mobile.apple.tablet).toBe(false);
    });

    test('should not be an iPod', () => {
      expect(mobile.apple.ipod).toBe(false);
    });

    test('should be an Apple device', () => {
      expect(mobile.apple.device).toBe(true);
    });
  });

  describe('Twitter iPad App UserAgent', () => {
    beforeEach(() => {
      userAgent =
        'Mozilla/5.0 (iPad; CPU OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13D15 Twitter for iPhone';
      mobile = isMobile(userAgent);
    });

    test('should not be an iPhone', () => {
      expect(mobile.apple.phone).toBe(false);
    });

    test('should be an iPad', () => {
      expect(mobile.apple.tablet).toBe(true);
    });

    test('should not be an iPod', () => {
      expect(mobile.apple.ipod).toBe(false);
    });

    test('should be an Apple device', () => {
      expect(mobile.apple.device).toBe(true);
    });
  });
});
