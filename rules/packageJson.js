import packageJson from 'eslint-plugin-package-json';
import { ERROR, addPrefix } from '../utils/index.js';

const prefix = 'package-json';

const packageJsonPluginConfig = {
  [prefix]: packageJson,
};

const packageJsonProcessor = packageJson.processors['.json'];

const rules = {
  // Enforces a standardized package.json key order, improving maintainability
  // across repos and inside monorepos
  'order-properties': ERROR,
  // Sorts nested objects alphabetically
  'sort-collections': ERROR,
  // May need to be disabled if a project is released via Semantic Release or
  // other tools that require non-standard version values, etc.
  'valid-package-def': ERROR,
};

const packageJsonRules = addPrefix(prefix, rules);

export { packageJsonPluginConfig, packageJsonProcessor, packageJsonRules };
