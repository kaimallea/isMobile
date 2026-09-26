import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest';
import puppeteer, { Browser, KnownDevices, Page } from 'puppeteer';
import { isMobileResult } from '..';

declare global {
  interface Window {
    isMobile: isMobileResult;
  }
}

describe('E2E Tests', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    // Let Puppeteer report startup failure before Jest abandons this hook.
    browser = await puppeteer.launch({ timeout: 30_000 });
  }, 45_000);

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page?.close();
  });

  afterAll(async () => {
    await browser?.close();
  });
  test('isMobile global variable is present', async () => {
    await page.setUserAgent('okhttp/3.0.0');
    await page.addScriptTag({ path: './dist/isMobile.min.js' });

    const isMobile: isMobileResult = await page.evaluate(() => window.isMobile);

    expect(isMobile).toMatchInlineSnapshot(`
      Object {
        "amazon": Object {
          "device": false,
          "phone": false,
          "tablet": false,
        },
        "android": Object {
          "device": true,
          "phone": false,
          "tablet": false,
        },
        "any": true,
        "apple": Object {
          "device": false,
          "ipod": false,
          "phone": false,
          "tablet": false,
          "universal": false,
        },
        "other": Object {
          "blackberry": false,
          "blackberry10": false,
          "chrome": false,
          "device": false,
          "firefox": false,
          "opera": false,
        },
        "phone": false,
        "tablet": false,
        "windows": Object {
          "device": false,
          "phone": false,
          "tablet": false,
        },
      }
    `);
  });

  test('isMobile correctly checks iOS 13', async () => {
    const iPadIos13 = {
      ...KnownDevices['iPad Pro'],
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    };
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'platform', { get: () => 'MacIntel' });
      Object.defineProperty(navigator, 'maxTouchPoints', {
        get: () => 4,
      });
    });
    await page.emulate(iPadIos13);
    // Init scripts run on navigation; emulate() alone is not a document load.
    await page.goto('about:blank');
    await page.addScriptTag({ path: './dist/isMobile.min.js' });

    const isMobile: isMobileResult = await page.evaluate(() => window.isMobile);

    expect(isMobile).toMatchInlineSnapshot(`
      Object {
        "amazon": Object {
          "device": false,
          "phone": false,
          "tablet": false,
        },
        "android": Object {
          "device": false,
          "phone": false,
          "tablet": false,
        },
        "any": true,
        "apple": Object {
          "device": true,
          "ipod": false,
          "phone": false,
          "tablet": true,
          "universal": false,
        },
        "other": Object {
          "blackberry": false,
          "blackberry10": false,
          "chrome": false,
          "device": false,
          "firefox": false,
          "opera": false,
        },
        "phone": false,
        "tablet": true,
        "windows": Object {
          "device": false,
          "phone": false,
          "tablet": false,
        },
      }
    `);
  });

  test('isMobile correctly fails iOS 13 check when MSStream is present', async () => {
    const iPadIos13 = {
      ...KnownDevices['iPad Pro'],
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    };
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'platform', { get: () => 'MacIntel' });
      Object.defineProperty(navigator, 'maxTouchPoints', {
        get: () => 4,
      });

      Object.defineProperty(window, 'MSStream', {
        get: () => () => undefined,
      });
    });
    await page.emulate(iPadIos13);
    // Init scripts run on navigation; emulate() alone is not a document load.
    await page.goto('about:blank');
    await page.addScriptTag({ path: './dist/isMobile.min.js' });

    const isMobile: isMobileResult = await page.evaluate(() => window.isMobile);

    expect(isMobile).toMatchInlineSnapshot(`
      Object {
        "amazon": Object {
          "device": false,
          "phone": false,
          "tablet": false,
        },
        "android": Object {
          "device": false,
          "phone": false,
          "tablet": false,
        },
        "any": false,
        "apple": Object {
          "device": false,
          "ipod": false,
          "phone": false,
          "tablet": false,
          "universal": false,
        },
        "other": Object {
          "blackberry": false,
          "blackberry10": false,
          "chrome": false,
          "device": false,
          "firefox": false,
          "opera": false,
        },
        "phone": false,
        "tablet": false,
        "windows": Object {
          "device": false,
          "phone": false,
          "tablet": false,
        },
      }
    `);
  });
});
