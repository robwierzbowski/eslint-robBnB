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

// Returns the latest version of ES globals from the globals package
const latestESGlobals = globals => {
  const esKeyRegex = /^es20\d{2}$/u;
  const latestESKey = Object.keys(globals)
    .filter(key => key.match(esKeyRegex))
    .sort()
    .pop();

  return globals[latestESKey];
};

export { ERROR, OFF, WARN, addPrefix, latestESGlobals };
