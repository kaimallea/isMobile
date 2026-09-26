import { execFileSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

for (const dir of ['.build', 'cjs', 'esm', 'dist', 'types']) {
  rmSync(dir, { recursive: true, force: true });
}
execFileSync(
  process.execPath,
  ['node_modules/@typescript/native/bin/tsc', '-p', 'tsconfig.build.json'],
  { stdio: 'inherit' },
);

// TypeScript 7 emits ES2015+. Babel preserves our ES5 distribution syntax.
const es5 = () =>
  babel({
    babelHelpers: 'bundled',
    babelrc: false,
    configFile: false,
    presets: [['@babel/preset-env', { targets: { ie: '11' }, modules: false }]],
  });

const library = await rollup({
  input: { index: '.build/index.js', isMobile: '.build/isMobile.js' },
  plugins: [es5()],
});
try {
  await library.write({
    dir: 'cjs',
    format: 'cjs',
    exports: 'named',
    generatedCode: 'es5',
  });
  await library.write({ dir: 'esm', format: 'es', generatedCode: 'es5' });
} finally {
  await library.close();
}
writeFileSync('esm/package.json', '{"type":"module"}\n');

const browser = await rollup({
  input: '.build/index.browser.js',
  plugins: [es5(), terser({ ecma: 5 })],
});
try {
  await browser.write({
    file: 'dist/isMobile.min.js',
    format: 'umd',
    name: 'isMobile',
    exports: 'default',
    generatedCode: 'es5',
  });
} finally {
  await browser.close();
}
rmSync('types/index.browser.d.ts');
rmSync('.build', { recursive: true });
