import { expect, test } from 'vitest';
import isMobile from '../';

test('calling without an argument or browser navigator returns no device matches', () => {
  // Modern Node exposes navigator; explicitly exercise a server without it.
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  try {
    Reflect.deleteProperty(globalThis, 'navigator');
    expect('navigator' in globalThis).toBe(false);
    expect(isMobile()).toEqual({
      apple: {
        phone: false,
        ipod: false,
        tablet: false,
        universal: false,
        device: false,
      },
      amazon: { phone: false, tablet: false, device: false },
      android: { phone: false, tablet: false, device: false },
      windows: { phone: false, tablet: false, device: false },
      other: {
        blackberry: false,
        blackberry10: false,
        opera: false,
        firefox: false,
        chrome: false,
        device: false,
      },
      any: false,
      phone: false,
      tablet: false,
    });
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'navigator', descriptor);
  }
});
