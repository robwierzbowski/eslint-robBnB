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
import { reactPluginConfig, reactRules, reactSettings } from './rules/react.js';
import { reactHooksPluginConfig, reactHooksRules } from './rules/reactHooks.js';
import { reactPFCPluginConfig, reactPFCRules } from './rules/reactPFC.js';
import { typescriptPluginConfig, typescriptRules } from './rules/typescript.js';
import { unicornPluginConfig, unicornRules } from './rules/unicorn.js';

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
  // introduce the Babel parser, config, and plugins, but that's too many tools
  // doing the same job.
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
      ...reactHooksPluginConfig,
      ...reactPFCPluginConfig,
      ...reactPluginConfig,
      ...unicornPluginConfig,
    },
    rules: {
      ...coreRules,
      ...importRules,
      ...jsxA11yRules,
      ...preferArrowRules,
      ...reactHooksRules,
      ...reactPFCRules,
      ...reactRules,
      ...unicornRules,
    },
    settings: {
      ...importSettings,
      ...reactSettings,
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    // Seems like we don't need these settings bc this rule is a reduction of
    // the globs above
    // languageOptions,
    // linterOptions,

    plugins: {
      ...typescriptPluginConfig,
    },
    rules: {
      ...typescriptRules,
    },
  },

  // Prettier config must be last disable conflicting rules from previous
  // objects
  prettierConfig,
];

export { config };
