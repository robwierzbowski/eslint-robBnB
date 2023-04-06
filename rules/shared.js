// Constants to prevent typos
const ERROR = 'error';
const OFF = 'off';
const WARN = 'warn';

const addPrefix = (prefix, rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([key, value]) => [`${prefix}/${key}`, value]),
  );

export { ERROR, OFF, WARN, addPrefix };
