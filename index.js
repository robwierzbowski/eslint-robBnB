import { default as typescriptPlugin } from '@typescript-eslint/eslint-plugin';
import * as typescriptParser from '@typescript-eslint/parser';
import { default as prettierConfig } from 'eslint-config-prettier';
import { default as importPlugin } from 'eslint-plugin-i';
import { default as react } from 'eslint-plugin-react';
import { default as reactHooks } from 'eslint-plugin-react-hooks';
import { default as reactPreferFunctionComponent } from 'eslint-plugin-react-prefer-function-component';
import globals from 'globals';
import {
  coreRules,
  importRules,
  reactHooksRules,
  reactPreferFunctionComponentRules,
  reactRules,
} from './rules.js';

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
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
      'react-pfc': reactPreferFunctionComponent,
    },
    rules: {
      ...coreRules,
      ...importRules,
      ...reactRules,
      ...reactPreferFunctionComponentRules,
      ...reactHooksRules,
    },
    settings: {
      'import/ignore': [
        // Prevents false positives in the common case when importing CJS deps
        // with import statements
        'node_modules',
      ],
      'import/parsers': {
        // Parser settings are required for all files in order for import to use
        // the new config file. This may not be necessary in future releases.
        // https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
        espree: ['.js', '.jsx'],
        // TODO: Does this need to move into the block below?
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
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

    // TODO: Is this plugin doing anything? Prob need to add the rules
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
  },

  // Prettier config must be last to turn off conflicting rules from previous
  // configuration
  prettierConfig,
];

export { config };
