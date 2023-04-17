import unicorn from 'eslint-plugin-unicorn';
import { ERROR, OFF, addPrefix } from './shared.js';

const prefix = 'unicorn';

const unicornPluginConfig = {
  [prefix]: unicorn,
};

// eslint-plugin-unicorn is a collection of opinionated rules. Many are best
// practices but are already handled by core ESLint rules and Prettier, and
// others aren't beneficial enough to incur the eventual performance cost of
// their addition. Instead of listing all ubnicorn rules in this file and
// documenting my reasoning for turning some off I'm only going to include the
// rules I'm enabling; assume the reasons others weren't included are the
// reasons above.
const rules = {
  // RW: Included but disabled because it requires team specific configuration.
  // A very useful tool if a codebase has issues with abbreviations, and
  // provides an option to autofix which makes it more useful than core rules.
  abbreviations: OFF,
  'no-object-as-default-parameter': ERROR,
  'no-unnecessary-await': ERROR,
  'prefer-array-flat': ERROR,
  'prefer-date-now': ERROR,
  // RW: Although it introduces a new concept, once engineers are familiar with
  // logical operators like nullish coalescing they can be understood better
  // than a ternary at a glance
  'prefer-logical-operator-over-ternary': ERROR,
  // RW: Testing or storing the boolean that regexp test returns leads to more
  // understandable code than testing or storing an array of results
  'prefer-regexp-test': ERROR,
  // RW: Provides a rule for arrays that matches the core object prefer-spread
  // rule
  'prefer-spread': ERROR,
};

const unicornRules = addPrefix(prefix, rules);

export { unicornRules, unicornPluginConfig };
