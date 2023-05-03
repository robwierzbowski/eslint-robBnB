import unicorn from 'eslint-plugin-unicorn';
import { ERROR, OFF, addPrefix } from '../utils/index.js';

const prefix = 'unicorn';

const unicornPluginConfig = {
  [prefix]: unicorn,
};

// eslint-plugin-unicorn is a collection of very opinionated rules, a small
// subset of which I believe are useful. Instead of listing all rules and
// documenting my reasoning for turning some off, I'm only going to include
// rules I'm enabling.
const rules = {
  // Included for reference but disabled because it requires team specific
  // configuration. A very useful tool for alerting and autofixing if a codebase
  // has issues with abbreviations.
  abbreviations: OFF,
  'no-object-as-default-parameter': ERROR,
  'no-unnecessary-await': ERROR,
  'prefer-array-flat': ERROR,
  'prefer-date-now': ERROR,
  // Although a relatively new addition, once engineers are familiar with
  // logical operators like nullish coalescing they can be understood better
  // than a ternary at a glance
  'prefer-logical-operator-over-ternary': ERROR,
  // Using a boolean that Regexp.prototype.test returns leads to more
  // understandable code than using an array of results from *.prototype.match
  'prefer-regexp-test': ERROR,
  // Provides a rule for arrays that matches the core prefer-spread rule for
  // objects
  'prefer-spread': ERROR,
};

const unicornRules = addPrefix(prefix, rules);

export { unicornRules, unicornPluginConfig };
