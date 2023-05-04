// Don't set more rules than we need to
process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED = 'true';

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

const languageOptions = {
  globals: {
    // Adding both browser and node globals to all files for convenience
    ...globals.browser,
    ...globals.node,
    ...latestESGlobals(globals),
  },
  // We can use the TS parser to parse 2020+ JS in both JS and TS files for
  // convenience
  parser: typescriptParser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    // Config for using the new JSX runtime auto insertion
    // https://typescript-eslint.io/architecture/parser/#jsxpragma
    jsxPragma: null,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: '.',
  },
};

const config = [
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

  // If using Prettier, the config must be last disable any rules that conflict
  // with its formatting
  prettierConfig,
];

// eslint-disable-next-line import/no-default-export
export default config;
