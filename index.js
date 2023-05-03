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

const javaScript = {
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

const packageJson = {
  plugins: {
    ...packageJsonPluginConfig,
  },
  processor: packageJsonProcessor,
  rules: {
    ...packageJsonRules,
  },
};

const test = {
  plugins: {
    ...jestPluginConfig,
    ...testingLibraryPluginConfig,
  },
  rules: {
    ...jestRules,
    ...testingLibraryRules,
  },
};

const typescript = {
  plugins: {
    ...typescriptPluginConfig,
  },
  rules: {
    ...typescriptRules,
  },
};

export { javaScript, packageJson, test, typescript };
