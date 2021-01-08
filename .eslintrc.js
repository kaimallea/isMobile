module.exports = {
  ...require('@spotify/web-scripts/config/eslintrc.js'),
  rules: {
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
  },
};
