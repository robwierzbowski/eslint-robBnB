import { default as typescriptPlugin } from '@typescript-eslint/eslint-plugin';
import { addPrefix } from './shared.js';

const prefix = '???';

const typescriptPluginConfig = {
  [prefix]: typescriptPlugin,
};

// TODO: Add TypeScript rules
const typescriptRules = addPrefix(prefix, {});

export { typescriptPluginConfig, typescriptRules };
