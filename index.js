import globals from 'globals';
import { default as prettierConfig } from 'eslint-config-prettier';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

// Don't set more than we need to — this is modern JS!
process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED = true;

// Returns the latest version of ES globals from the globals package
const latestESGlobals = () => {
  const esKeyRegex = /^es20\d{2}$/;
  const latestESKey = Object.keys(globals)
    .filter(key => key.match(esKeyRegex))
    .sort()
    .pop();

  return globals[latestESKey];
};

const languageOptions = {
  globals: {
    // TODO: Make more specific globals for root and source files (root/vite
    // files should have node globals)
    ...globals.browser,
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
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  // Set explicitly so it's applied to TS files
  sourceType: 'module',
};

const linterOptions = {
  reportUnusedDisableDirectives: true,
};

const config = [
  {
    files: ['**/*.js'],
    languageOptions,
    linterOptions,
    // plugins: {},
    rules: {
      semi: 'error',
      'no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', `**/*.d.ts`],
    languageOptions,
    linterOptions,
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
  },
  // Prettier config must be last to turn off conflicting rules from previous
  // configuration
  prettierConfig,
];

export { config };
