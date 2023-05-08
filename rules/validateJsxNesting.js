import validateJsxNesting from 'eslint-plugin-validate-jsx-nesting';
import { ERROR, addPrefix } from '../utils/index.js';

const prefix = 'validate-jsx-nesting';

const validateJsxNestingPluginConfig = {
  [prefix]: validateJsxNesting,
};

const rules = {
  // Ensures that HTML in JSX is valid and will not be rearranged by the
  // browser. Any mismatch between JSX and browser rendered HTML will cause hard
  // to debug errors when hydrating SSR HTML.
  'no-invalid-jsx-nesting': ERROR,
};

const validateJsxNestingRules = addPrefix(prefix, rules);

export { validateJsxNestingRules, validateJsxNestingPluginConfig };
