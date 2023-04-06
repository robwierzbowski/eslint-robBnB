import { default as reactHooks } from 'eslint-plugin-react-hooks';
import { ERROR, addPrefix } from './shared.js';

const prefix = 'react-hooks';

const reactHooksPluginConfig = {
  [prefix]: reactHooks,
};

const rules = {
  'rules-of-hooks': ERROR,
  'exhaustive-deps': ERROR,
};

const reactHooksRules = addPrefix(prefix, rules);

export { reactHooksPluginConfig, reactHooksRules };
