// eslint-disable-next-line import/no-namespace
import * as typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import {
  javaScriptConfig,
  latestESGlobals,
  packageJsonConfig,
  testConfig,
  typescriptConfig,
} from './index.js';

// Don't set more rules than we need to
process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED = 'true';

const languageOptions = {
  globals: {
    // Adding both browser and node globals for all files for convenience. Each
    // project will have its own organization of browser files and node files
    // and can override this setting if desired.
    ...globals.browser,
    ...globals.node,
    ...latestESGlobals(globals),
  },
  // Vite uses ESBuild to transpile JS, but ESBuild doesn't expose an AST we can
  // use for ESLint. But, we can use the TS parser to parse 2020+ JS in both JS
  // and TS files. The other option is to introduce the Babel parser, but that's
  // too many tools doing the same job. Reference:
  // https://github.com/evanw/esbuild/issues/1880
  // https://github.com/swc-project/swc/issues/246
  parser: typescriptParser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    // Using the new JSX runtime auto insertion
    // https://typescript-eslint.io/architecture/parser/#jsxpragma
    jsxPragma: null,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: '.',
  },
};

const config = [
  {
    ignores: ['dist/*'],
  },

  // package.json file
  {
    files: ['package.json'],
    ...packageJsonConfig,
  },

  // JavaScript-based files
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    ...javaScriptConfig,
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    ...typescriptConfig,
  },

  // Test files
  {
    files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/test/**'],
    languageOptions: {
      globals: {
        ...languageOptions.globals,
        ...globals.jest,
      },
    },
    ...testConfig,
  },

  // Prettier config must be last disable any rules that conflict with its
  // formatting
  prettierConfig,
];

// eslint-disable-next-line import/no-default-export
export default config;
