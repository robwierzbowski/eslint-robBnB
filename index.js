import { default as prettierConfig } from 'eslint-config-prettier';
import { default as react } from 'eslint-plugin-react';
import { default as reactPreferFunctionComponent } from 'eslint-plugin-react-prefer-function-component';
import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import { coreRules, reactPreferFunctionComponentRules, reactRules } from './rules.js';

// Don't set more than we need to — this is modern JS!
process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED = true;

// Returns the latest version of ES globals from the globals package
const latestESGlobals = () => {
  const esKeyRegex = /^es20\d{2}$/u;
  const latestESKey = Object.keys(globals)
    .filter(key => key.match(esKeyRegex))
    .sort()
    .pop();

  return globals[latestESKey];
};

const languageOptions = {
  globals: {
    // TODO: Make more specific globals for browser and node files (root/vite
    // files should have node globals)
    ...globals.browser,
    ...globals.node,
    ...latestESGlobals(),
  },
  // Vite uses ESBuild to transpile JS, but ESBuild doesn't expose an AST we can
  // use for ESLint. It doesn't look like SWC has an ESLint parser either
  // (although the barrier is lower). Although there's no TS in JS files, the TS
  // parser should be able to parse 2020+ JS for us. Our other option is to
  // introduce the babel parser and required config and plugins, but that's too
  // much to maintain, too many tools doing the same job.
  // References:
  // https://github.com/evanw/esbuild/issues/1880
  // https://github.com/swc-project/swc/issues/246
  parser: typescriptParser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  // Set explicitly so it's applied to TS files
  sourceType: 'module',
};

const config = [
  // All Javascript rules
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      react,
      'react-prefer-function-component': reactPreferFunctionComponent,
    },
    rules: {
      ...coreRules,
      ...reactRules,
      ...reactPreferFunctionComponentRules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Typescript only rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    // Seems like we don't need these bc this rule is a reduction of the globs above
    // languageOptions,
    // linterOptions,
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
  },

  // Prettier config must be last to turn off conflicting rules from previous
  // configuration
  prettierConfig,
];

export { config };
