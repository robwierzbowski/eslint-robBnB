import unicorn from 'eslint-plugin-unicorn';
import { ERROR, OFF, addPrefix } from './shared.js';

const prefix = 'unicorn';

const unicornPluginConfig = {
  [prefix]: unicorn,
};

// eslint-plugin-unicorn is a collection of opinionated rules. Many of the rules
// are useful best practices, but are covered by Prettier and core eslint rules,
// or aren't beneficial enough to incur the eventual performance cost of
// checking 100s of rules. Instead of including all rules and documenting the
// reasoning for turning some off, I'm only going to include the rules I'm
// enabling.
const rules = {
  // RW: Included but disabled because it requires team specific configuration.
  // A very useful tool if a codebase has an issue with abbreviations. Provides
  // an option that enables autofix, so more useful than rules that prevent < 3
  // letter identifiers.
  abbreviations: OFF,
  'no-object-as-default-parameter': ERROR,
  'no-unnecessary-await': ERROR,
  'prefer-array-flat': ERROR,
  'prefer-date-now': ERROR,
  // RW: Although it introduces a new concept, nullish coalescing and other
  // logical operators are terse and once familiar can be understood better than
  // a ternary at a glance.
  'prefer-logical-operator-over-ternary': ERROR,
  // RW: Testing or storing a boolean leads to more expected code than testing
  // or storing a populated or empty array.
  'prefer-regexp-test': ERROR,
  // RW: Provides a rule for arrays that matches the core prefer-spread rule
  // that applies to objects.
  'prefer-spread': ERROR,
};

const unicornRules = addPrefix(prefix, rules);

export { unicornRules, unicornPluginConfig };
