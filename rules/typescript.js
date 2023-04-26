import typescriptPlugin from '@typescript-eslint/eslint-plugin';

// Rules from this plugin already have the `@typescript-eslint` prefix inlined
// on them. We need to match the flat config plugin key to that default.
const typescriptPluginConfig = {
  '@typescript-eslint': typescriptPlugin,
};

// The plugin provided rules turn off useful core rules, with the explanation
// that they may cause issues in TS repositories. Because these core rules are
// valuable, let's avoid disabling them and see if we run into any issues in
// practice.
const onlyTypescriptRules = rules => {
  const isTypescriptRule = ([key]) => /^@typescript-eslint/u.test(key);

  return Object.fromEntries(Object.entries(rules).filter(isTypescriptRule));
};

const typescriptRules = onlyTypescriptRules(
  typescriptPlugin.configs['recommended-requiring-type-checking'].rules,
);

export { typescriptPluginConfig, typescriptRules };
