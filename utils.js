// Constants to prevent typos
const ERROR = 'error';
const OFF = 'off';
const WARN = 'warn';

const addPrefix = (prefix, unprefixedRules) =>
  Object.fromEntries(
    Object.entries(unprefixedRules).map(([key, value]) => [
      `${prefix}/${key}`,
      value,
    ]),
  );

export { ERROR, OFF, WARN, addPrefix };
