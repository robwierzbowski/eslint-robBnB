import { default as preferArrow } from 'eslint-plugin-prefer-arrow';
import { ERROR, addPrefix } from './shared.js';

const prefix = 'prefer-arrow';

const preferArrowPluginConfig = {
  [prefix]: preferArrow,
};

const rules = {
  'prefer-arrow-functions': [
    ERROR,
    {
      // RW: Allow function shorthand in classes
      classPropertiesAllowed: false,
      // RW: Allow function shorthand in objects
      disallowPrototype: false,
      singleReturnOnly: false,
    },
  ],
};

const preferArrowRules = addPrefix(prefix, rules);

export { preferArrowPluginConfig, preferArrowRules };
