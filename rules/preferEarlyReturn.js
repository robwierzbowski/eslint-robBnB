import preferEarlyReturn from '@regru/eslint-plugin-prefer-early-return';
import { ERROR, addPrefix } from './shared.js';

const prefix = 'prefer-early-return';

const preferEarlyReturnPluginConfig = {
  [prefix]: preferEarlyReturn,
};

const rules = {
  // RW: Increases readability and maintainability by enforcing a guard
  // conditional instead of wrapping the entire function body in a conditional
  'prefer-early-return': ERROR,
};

const preferEarlyReturnRules = addPrefix(prefix, rules);

export { preferEarlyReturnPluginConfig, preferEarlyReturnRules };
