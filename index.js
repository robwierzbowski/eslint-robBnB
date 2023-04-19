// eslint-disable-next-line import/no-namespace
import * as typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import { coreRules } from './rules/core.js';
import {
  importPluginConfig,
  importRules,
  importSettings,
} from './rules/import.js';
import { jsxA11yPluginConfig, jsxA11yRules } from './rules/jsxA11y.js';
import {
  preferArrowPluginConfig,
  preferArrowRules,
} from './rules/preferArrow.js';
import {
  preferEarlyReturnPluginConfig,
  preferEarlyReturnRules,
} from './rules/preferEarlyReturn.js';
import { reactPluginConfig, reactRules, reactSettings } from './rules/react.js';
import { reactHooksPluginConfig, reactHooksRules } from './rules/reactHooks.js';
import { reactPFCPluginConfig, reactPFCRules } from './rules/reactPFC.js';
import { typescriptPluginConfig, typescriptRules } from './rules/typescript.js';
import { unicornPluginConfig, unicornRules } from './rules/unicorn.js';
import {
  validateJsxNestingPluginConfig,
  validateJsxNestingRules,
} from './rules/validateJsxNesting.js';

// Don't set more rules than we need to
process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED = 'true';

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
    // TODO: Make env specific globals for browser, test, and node files
    // (root/vite files should have node globals)
    ...globals.browser,
    ...globals.jest,
    ...globals.node,
    ...latestESGlobals(),
  },
  // Vite uses ESBuild to transpile JS, but ESBuild doesn't expose an AST we can
  // use for ESLint. It doesn't look like SWC has an ESLint parser either.
  // Although there's no TS in JS files, the TS parser should be able to parse
  // 2020+ JS for us. Our other option is to introduce the Babel parser, but
  // that's too many tools doing the same job. References:
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

  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      ...importPluginConfig,
      ...jsxA11yPluginConfig,
      ...preferArrowPluginConfig,
      ...preferEarlyReturnPluginConfig,
      ...reactHooksPluginConfig,
      ...reactPFCPluginConfig,
      ...reactPluginConfig,
      ...unicornPluginConfig,
      ...validateJsxNestingPluginConfig,
    },
    rules: {
      ...coreRules,
      ...importRules,
      ...jsxA11yRules,
      ...preferArrowRules,
      ...preferEarlyReturnRules,
      ...reactHooksRules,
      ...reactPFCRules,
      ...reactRules,
      ...unicornRules,
      ...validateJsxNestingRules,
    },
    settings: {
      ...importSettings,
      ...reactSettings,
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    plugins: {
      ...typescriptPluginConfig,
    },
    rules: {
      ...typescriptRules,
    },
  },

  // Prettier config must be last disable any rules that conflicts with its
  // formatting
  prettierConfig,
];

export { config };
