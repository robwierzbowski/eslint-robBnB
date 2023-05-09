// Constants to prevent typos
const ERROR = 'error';
const OFF = 'off';
const WARN = 'warn';

// Applies a prefix/plugin name to all rules in an object
const addPrefix = (prefix, unprefixedRules) =>
  Object.fromEntries(
    Object.entries(unprefixedRules).map(([key, value]) => [
      `${prefix}/${key}`,
      value,
    ]),
  );

export { ERROR, OFF, WARN, addPrefix };
