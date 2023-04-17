import validateJsxNesting from 'eslint-plugin-validate-jsx-nesting';
import { ERROR, addPrefix } from './shared.js';

const prefix = 'validate-jsx-nesting';

const validateJsxNestingPluginConfig = {
  [prefix]: validateJsxNesting,
};

const rules = {
  // RW: Ensures that JSX matches rendered HTML structure in the browser
  // TODO: Test performance, and potentially move this to a CLI-only rule
  'no-invalid-jsx-nesting': ERROR,
};

const validateJsxNestingRules = addPrefix(prefix, rules);

export { validateJsxNestingRules, validateJsxNestingPluginConfig };
