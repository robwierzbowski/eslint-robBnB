// To work with the new flat config, the TypeScript parser module must be
// imported as a single object
// eslint-disable-next-line import/no-namespace
import * as typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import { robBnBConfig } from './index.js';

const languageOptions = {
  globals: {
    // Adding browser and node globals to all files for convenience
    ...globals.browser,
    ...globals.node,
    ...globals.es2021,
  },
  // For reduced complexity we can ignore Babel and use
  // @typescript-eslint/parser to parse both TS and JS files
  parser: typescriptParser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    // Assume that apps are using the new JSX runtime auto insertion
    // https://typescript-eslint.io/architecture/parser/#jsxpragma
    jsxPragma: null,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: '.',
  },
};

const config = [
  ...robBnBConfig,

  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    linterOptions: {
      // Log a warning when eslint-disable comments exist for inactive rules
      reportUnusedDisableDirectives: true,
    },
  },

  {
    files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/test/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  prettierConfig,
];

// RobBnB prefers named exports; this rule must be disabled for config files
// eslint-disable-next-line import/no-default-export
export default config;
