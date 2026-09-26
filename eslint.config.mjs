import js from '@eslint/js';
import ts from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  {
    ignores: [
      '.build/**',
      'cjs/**',
      'esm/**',
      'dist/**',
      'types/**',
      'coverage/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  {
    files: ['src/**/*.ts'],
    languageOptions: { globals: { MSStream: 'readonly' } },
  },
  {
    files: ['src/__tests__/**/*.ts'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/no-disabled-tests': 'error',
    },
  },
];
