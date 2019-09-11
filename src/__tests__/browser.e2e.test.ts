import puppeteer from 'puppeteer';
import { isMobileResult } from '..';

describe('E2E Tests', () => {
  test('isMobile global variable is present', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('okhttp/3.0.0');
    await page.addScriptTag({ path: './dist/isMobile.min.js' });

    const isMobile: isMobileResult = await page.evaluate(() => isMobile);

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

    await browser.close();
  });
});
