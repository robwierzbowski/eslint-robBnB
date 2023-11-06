// Constants to prevent typos
const ERROR = 'error';
const OFF = 'off';
const WARN = 'warn';

// Most ESLint packages document and reference their rules without the required
// prefix (e.g., `anchor-is-valid` instead of `jsx-a11y/anchor-is-valid`). In
// order to easily copy/paste from package documentation, and to ensure
// programmatically that the rule prefix matches the settings prefix, we'll add
// prefixes to an object of rules with this utility function.
const addPrefix = (prefix, unprefixedRules) =>
  Object.fromEntries(
    Object.entries(unprefixedRules).map(([key, value]) => [
      `${prefix}/${key}`,
      value,
    ]),
  );

export { ERROR, OFF, WARN, addPrefix };
