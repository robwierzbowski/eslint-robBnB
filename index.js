import { coreRules } from './rules/core.js';
import {
  importPluginConfig,
  importRules,
  importSettings,
} from './rules/import.js';
import { jestPluginConfig, jestRules } from './rules/jest.js';
import { jsxA11yPluginConfig, jsxA11yRules } from './rules/jsxA11y.js';
import {
  packageJsonPluginConfig,
  packageJsonProcessor,
  packageJsonRules,
} from './rules/packageJson.js';
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
import {
  reactPreferFunctionComponentPluginConfig,
  reactPreferFunctionComponentRules,
} from './rules/reactPreferFunctionComponent.js';
import {
  testingLibraryPluginConfig,
  testingLibraryRules,
} from './rules/testingLibrary.js';
import { typescriptPluginConfig, typescriptRules } from './rules/typescript.js';
import { unicornPluginConfig, unicornRules } from './rules/unicorn.js';
import {
  validateJsxNestingPluginConfig,
  validateJsxNestingRules,
} from './rules/validateJsxNesting.js';

const javaScriptConfig = {
  files: [
    '**/*.js',
    '**/*.jsx',
    '**/*.cjs',
    '**/*.mjs',
    '**/*.ts',
    '**/*.tsx',
    '**/*.d.ts',
  ],
  plugins: {
    ...importPluginConfig,
    ...jsxA11yPluginConfig,
    ...preferArrowPluginConfig,
    ...preferEarlyReturnPluginConfig,
    ...reactHooksPluginConfig,
    ...reactPreferFunctionComponentPluginConfig,
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
    ...reactPreferFunctionComponentRules,
    ...reactRules,
    ...unicornRules,
    ...validateJsxNestingRules,
  },
  settings: {
    ...importSettings,
    ...reactSettings,
  },
};

const packageJsonConfig = {
  files: ['**/package.json'],
  plugins: {
    ...packageJsonPluginConfig,
  },
  processor: packageJsonProcessor,
  rules: {
    ...packageJsonRules,
  },
};

const testConfig = {
  files: [
    '**/*.test.js',
    '**/*.test.jsx',
    '**/*.test.cjs',
    '**/*.test.mjs',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/test/**',
  ],
  plugins: {
    ...jestPluginConfig,
    ...testingLibraryPluginConfig,
  },
  rules: {
    ...jestRules,
    ...testingLibraryRules,
  },
};

const typescriptConfig = {
  files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
  plugins: {
    ...typescriptPluginConfig,
  },
  rules: {
    ...typescriptRules,
  },
};

const robBnBConfig = [
  packageJsonConfig,
  javaScriptConfig,
  typescriptConfig,
  testConfig,
];

export { robBnBConfig };
