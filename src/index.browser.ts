import isMobile, { isMobileResult } from './';

declare global {
  interface Window {
    isMobile: isMobileResult;
  }
}

window.isMobile = isMobile();
