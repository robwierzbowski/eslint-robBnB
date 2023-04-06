import { default as reactPFC } from 'eslint-plugin-react-prefer-function-component';
import { ERROR, addPrefix } from './shared.js';

const prefix = 'react-pfc';

const reactPFCPluginConfig = {
  [prefix]: reactPFC,
};

const rules = {
  'react-prefer-function-component': ERROR,
};

const reactPFCRules = addPrefix(prefix, rules);

export { reactPFCPluginConfig, reactPFCRules };
