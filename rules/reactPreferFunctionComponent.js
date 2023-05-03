import { default as reactPreferFunctionComponent } from 'eslint-plugin-react-prefer-function-component';
import { ERROR, addPrefix } from '../utils/index.js';

const prefix = 'react-prefer-function-component';

const reactPreferFunctionComponentPluginConfig = {
  [prefix]: reactPreferFunctionComponent,
};

const rules = {
  'react-prefer-function-component': ERROR,
};

const reactPreferFunctionComponentRules = addPrefix(prefix, rules);

export {
  reactPreferFunctionComponentPluginConfig,
  reactPreferFunctionComponentRules,
};
