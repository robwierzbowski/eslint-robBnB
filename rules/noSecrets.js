import noSecrets from 'eslint-plugin-no-secrets';
import { ERROR, addPrefix } from './shared.js';

const prefix = 'no-secrets';

const noSecretsPluginConfig = {
  [prefix]: noSecrets,
};

const rules = {
  'no-secrets': ERROR,
};

const noSecretsRules = addPrefix(prefix, rules);

export { noSecretsRules, noSecretsPluginConfig };
