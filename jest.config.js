const shared = {
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: { module: 'ESNext' } }],
  },
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  snapshotFormat: { printBasicPrototype: true },
};

module.exports = {
  projects: [
    {
      ...shared,
      displayName: 'unit',
      testMatch: ['<rootDir>/src/__tests__/*.test.ts'],
      testPathIgnorePatterns: ['\\.e2e\\.test\\.ts$'],
    },
    {
      ...shared,
      displayName: 'browser',
      testMatch: ['<rootDir>/src/__tests__/*.e2e.test.ts'],
    },
  ],
};
