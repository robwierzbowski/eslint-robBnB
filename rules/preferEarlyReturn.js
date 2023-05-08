import preferEarlyReturn from '@regru/eslint-plugin-prefer-early-return';
import { ERROR, addPrefix } from '../utils/index.js';

const prefix = 'prefer-early-return';

const preferEarlyReturnPluginConfig = {
  [prefix]: preferEarlyReturn,
};

const rules = {
  // Increases readability and maintainability by enforcing a guard conditional
  // over wrapping the entire function body in a conditional
  'prefer-early-return': ERROR,
};

const preferEarlyReturnRules = addPrefix(prefix, rules);

export { preferEarlyReturnPluginConfig, preferEarlyReturnRules };
