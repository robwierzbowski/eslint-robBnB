// In order to be used in new ESLint config, the entire TypeScript parser module
// must be imported as an object
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
    // Adding browser and node globals to all files for convenience
    ...globals.browser,
    ...globals.node,
    ...latestESGlobals(globals),
  },
  // For reduced complexity we can ignore Babel and use typescript/parser to
  // parse both TS and modern JS files
  parser: typescriptParser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    // Expect that apps are using the new JSX runtime auto insertion
    // https://typescript-eslint.io/architecture/parser/#jsxpragma
    jsxPragma: null,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: '.',
  },
};

const config = [
  // package.json files
  {
    files: ['package.json'],
    ...packageJsonConfig,
  },

  // JavaScript files
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    linterOptions: {
      // Recommended; this throws a warning when code contains disable comments
      // for inactive ESLint rules
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

  // Disable any rules that conflict with Prettier formatting
  prettierConfig,
];

// These rules prefer named exports; disabling the rule is necessary in many
// third party integrations / config files
// eslint-disable-next-line import/no-default-export
export default config;
