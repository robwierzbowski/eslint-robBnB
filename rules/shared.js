// Constants to prevent typos
const ERROR = 'error';
const OFF = 'off';
const WARN = 'warn';

// For any rule that can force newlines on a list of over 3 items
const NEW_LINE_OPTION = { minItems: 4 };

const addPrefix = (prefix, rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([key, value]) => [`${prefix}/${key}`, value]),
  );

export { ERROR, OFF, WARN, NEW_LINE_OPTION, addPrefix };
