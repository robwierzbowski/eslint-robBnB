import typescriptPlugin from '@typescript-eslint/eslint-plugin';

// Rules from this plugin are already prefixed with the `@typescript-eslint`
// string. Match the flat config key to that default.
const typescriptPluginConfig = {
  '@typescript-eslint': typescriptPlugin,
};

// This plugin disables useful core rules, with the explanation that they may
// cause issues in TS repositories. Because these core rules are valuable and
// I've been working in repositories that enable them without issue, let's
// remove the disables until we run into issues.
const onlyTypescriptRules = rules => {
  const isTypescriptRule = ([key]) => /^@typescript-eslint/u.test(key);

  return Object.fromEntries(Object.entries(rules).filter(isTypescriptRule));
};

const typescriptRules = onlyTypescriptRules(
  typescriptPlugin.configs['recommended-requiring-type-checking'].rules,
);

export { typescriptPluginConfig, typescriptRules };
