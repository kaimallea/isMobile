// isMobile.test.ts
import isMobile, { UserAgentClientHints } from '../isMobile';

describe('isMobile with User-Agent Client Hints', () => {
  test('should detect mobile device from User-Agent Client Hints', () => {
    const clientHints: UserAgentClientHints = {
      ua: 'Mozilla/5.0 (Android 11; Mobile; rv:99.0) Gecko/99.0 Firefox/99.0',
      uaMobile: true,
      uaPlatform: 'Android',
      uaPlatformVersion: '11',
    };

    const result = isMobile(clientHints);

    expect(result.android.phone).toBe(true);
    expect(result.phone).toBe(true);
    expect(result.any).toBe(true);
  });

  test('should detect non-mobile device from User-Agent Client Hints', () => {
    const clientHints: UserAgentClientHints = {
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
      uaMobile: false,
      uaPlatform: 'Windows',
      uaPlatformVersion: '10.0',
    };

    const result = isMobile(clientHints);

    expect(result.windows.phone).toBe(false);
    expect(result.phone).toBe(false);
    expect(result.any).toBe(false);
  });
});
