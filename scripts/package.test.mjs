import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { after, test } from 'node:test';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';
import { parse } from 'acorn';

const directory = mkdtempSync(join(tmpdir(), 'ismobile-package-'));
after(() => rmSync(directory, { recursive: true, force: true }));
// The check command builds first. Avoid recursively invoking prepack here.
const [archive] = JSON.parse(
  execFileSync(
    'npm',
    ['pack', '--ignore-scripts', '--json', '--pack-destination', directory],
    { encoding: 'utf8' },
  ),
);
execFileSync('tar', [
  '-xzf',
  join(directory, archive.filename),
  '-C',
  directory,
]);
const packageDir = join(directory, 'package');
const require = createRequire(import.meta.url);
const manifest = JSON.parse(
  readFileSync(join(packageDir, 'package.json'), 'utf8'),
);
const userAgent =
  'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36';

test('the tarball contains only consumer files and no runtime dependencies', () => {
  assert.equal(Object.keys(manifest.dependencies ?? {}).length, 0);
  for (const { path } of archive.files) {
    assert.match(
      path,
      /^(?:(?:cjs|esm|dist|types)\/|package\.json$|README\.md$|LICENSE$)/,
    );
  }
  for (const path of [
    manifest.main,
    manifest.module,
    manifest.jsdelivr,
    'types/index.d.ts',
  ]) {
    assert.ok(
      archive.files.some((file) => file.path === path),
      `Missing ${path}`,
    );
  }
});

test('CommonJS and browser files use ES5 syntax', () => {
  for (const { path } of archive.files) {
    if (!/^(?:cjs|dist)\/.*\.js$/.test(path)) continue;
    assert.doesNotThrow(
      () =>
        parse(readFileSync(join(packageDir, path), 'utf8'), { ecmaVersion: 5 }),
      `${path} must be parseable by an ES5 engine`,
    );
  }
});

test('CommonJS and ESM preserve the default function and deep entry points', async () => {
  const common = require(packageDir);
  const esm = await import(pathToFileURL(join(packageDir, manifest.module)));
  assert.equal(typeof common.default, 'function');
  assert.equal(typeof esm.default, 'function');
  assert.equal(common.default(userAgent).android.phone, true);
  assert.deepEqual(esm.default(userAgent), common.default(userAgent));
  assert.deepEqual(
    require(join(packageDir, 'cjs/isMobile.js')).default(userAgent),
    common.default(userAgent),
  );
  assert.deepEqual(
    (await import(pathToFileURL(join(packageDir, 'esm/isMobile.js')))).default(
      userAgent,
    ),
    common.default(userAgent),
  );
});

test('the browser bundle supports script, CommonJS, and AMD consumers', () => {
  const code = readFileSync(join(packageDir, manifest.jsdelivr), 'utf8');
  const navigator = { userAgent, platform: 'Linux armv8l', maxTouchPoints: 5 };
  const script = { navigator };
  runInNewContext(code, script);
  assert.equal(script.isMobile.android.phone, true);
  assert.equal(typeof script.isMobile, 'object');

  const common = { navigator, exports: {}, module: { exports: {} } };
  runInNewContext(code, common);
  assert.equal(common.module.exports.android.phone, true);

  let amd;
  const define = (factory) => {
    amd = factory();
  };
  define.amd = true;
  runInNewContext(code, { navigator, define });
  assert.equal(amd.android.phone, true);
});

for (const [version, compiler] of [
  ['6', 'typescript/bin/tsc6'],
  ['7', '@typescript/native/bin/tsc'],
]) {
  test(`published declarations work in TypeScript ${version} without repository configuration`, () => {
    writeFileSync(
      join(directory, 'consumer.ts'),
      `
    import isMobile, { isMobileResult, IsMobileParameter } from './package';
    const input: IsMobileParameter = 'iPhone';
    const navigatorInput: IsMobileParameter = {
      userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: 2,
    };
    const navigatorWithoutTouch: IsMobileParameter = {
      userAgent: 'iPhone', platform: 'iPhone',
    };
    const results: isMobileResult[] = [
      isMobile(input),
      isMobile(navigatorInput),
      isMobile(navigatorWithoutTouch),
      isMobile(),
    ];
    const result = results[0];
    const phone: boolean = result.phone;
    const tablet: boolean = result.apple.tablet;
    void phone;
    void tablet;
  `,
    );
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          noEmit: true,
          types: [],
          lib: ['ES5'],
          target: 'ES2015',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
        },
        files: ['consumer.ts'],
      }),
    );
    execFileSync(
      process.execPath,
      [
        resolve('node_modules', compiler),
        '-p',
        join(directory, 'tsconfig.json'),
      ],
      { stdio: 'inherit' },
    );
  });
}
