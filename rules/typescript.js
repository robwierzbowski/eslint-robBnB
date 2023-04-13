// At this time it doesn't seem like there's an easy way to write eslint
// settings files in typescript. I think it would require setting both the CLI
// and the editor to use an executor like ts-node that understands TS files
// without compilation.
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

// TypeScript rules have the `@typescript-eslint` prefix already inlined on
// them; we need to match the flat config plugin key to that default.
const typescriptPluginConfig = {
  '@typescript-eslint': typescriptPlugin,
};

// The provided TS rules turn off useful core rules, with the explanation that
// they may cause issues in TS repositories. Because of the value of the core
// rules, let's keep them enabled and see if we run into any issues.
const onlyTypescriptRules = rules => {
  const isTypescriptRule = ([key]) => /^@typescript-eslint/u.test(key);

  return Object.fromEntries(Object.entries(rules).filter(isTypescriptRule));
};

const typescriptRules = onlyTypescriptRules(
  typescriptPlugin.configs['recommended-requiring-type-checking'].rules,
);

export { typescriptPluginConfig, typescriptRules };
