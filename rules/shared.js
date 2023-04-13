// Constants to prevent typos
// TODO: when we convert all to types, are the constants useful anymore?
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
