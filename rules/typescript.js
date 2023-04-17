// It doesn't seem like there's an easy way to write eslint settings files in
// TypeScript at this time. I think it would require getting both the CLI and
// the editor to use an executor that understands TS files without compilation,
// like ts-node.
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

// Rules from this plugin already have the `@typescript-eslint` prefix inlined
// on them. We need to match the flat config plugin key to that default.
const typescriptPluginConfig = {
  '@typescript-eslint': typescriptPlugin,
};

// The plugin provided rules turn off useful core rules, with the explanation
// that they may cause issues in TS repositories. Because these core rules are
// very valuable, let's avoid disabling them and see if we run into any issues
// in practice.
const onlyTypescriptRules = rules => {
  const isTypescriptRule = ([key]) => /^@typescript-eslint/u.test(key);

  return Object.fromEntries(Object.entries(rules).filter(isTypescriptRule));
};

const typescriptRules = onlyTypescriptRules(
  typescriptPlugin.configs['recommended-requiring-type-checking'].rules,
);

export { typescriptPluginConfig, typescriptRules };
