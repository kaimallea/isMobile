import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    allowOnly: false,
    snapshotFormat: { printBasicPrototype: true },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/__tests__/*.test.ts'],
          exclude: ['src/__tests__/*.e2e.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['src/__tests__/*.e2e.test.ts'],
        },
      },
    ],
  },
});
