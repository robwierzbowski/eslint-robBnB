import validateJsxNesting from 'eslint-plugin-validate-jsx-nesting';
import { ERROR, addPrefix } from '../utils.js';

const prefix = 'validate-jsx-nesting';

const validateJsxNestingPluginConfig = {
  [prefix]: validateJsxNesting,
};

const rules = {
  // Ensures that HTML in JSX is valid and will not be mangled/corrected by the
  // browser
  'no-invalid-jsx-nesting': ERROR,
};

const validateJsxNestingRules = addPrefix(prefix, rules);

export { validateJsxNestingRules, validateJsxNestingPluginConfig };
