import importPlugin from 'eslint-plugin-i';
import { ERROR, OFF, addPrefix } from '../utils/index.js';

const prefix = 'import';

const importPluginConfig = {
  [prefix]: importPlugin,
};

const importHelpfulWarnings = {
  export: ERROR,
  // This rule has poor performance, and could be moved under a CLI-only flag to
  // prevent developer experience issues in the editor
  'no-deprecated': ERROR,
  'no-empty-named-blocks': ERROR,
  'no-extraneous-dependencies': ERROR,
  'no-mutable-exports': ERROR,
  'no-named-as-default': ERROR,
  'no-named-as-default-member': ERROR,
  // This could be useful, but it also could require frequent editing to exclude
  // settings files. Off for now.
  'no-unused-modules': OFF,
};

const importModuleSystems = {
  'no-amd': ERROR,
  // For now, CommonJS is still required in some situations
  'no-commonjs': OFF,
  'no-import-module-exports': ERROR,
  'no-nodejs-modules': OFF,
  // This errors on d.ts files, so let's disable for now
  unambiguous: OFF,
};

const importStaticAnalysis = {
  default: ERROR,
  named: [ERROR, {}],
  namespace: OFF,
  'no-absolute-path': ERROR,
  // This rule has poor performance, and could be moved under a CLI-only flag to
  // prevent developer experience issues in the editor
  'no-cycle': [ERROR, { maxDepth: 5 }],
  'no-dynamic-require': ERROR,
  // Could be useful but requires project specific configuration
  'no-internal-modules': OFF,
  'no-relative-packages': OFF,
  'no-relative-parent-imports': OFF,
  'no-restricted-paths': OFF,
  'no-self-import': ERROR,
  'no-unresolved': ERROR,
  'no-useless-path-segments': ERROR,
  'no-webpack-loader-syntax': ERROR,
};

const importStyleGuide = {
  'consistent-type-specifier-style': [ERROR, 'prefer-top-level'],
  // Only useful for webpack; other bundlers like Vite are preferred
  'dynamic-import-chunkname': OFF,
  'exports-last': ERROR,
  // Useful if using certain module resolution patterns (e.g., nodeNext), but
  // too project-specific to enable
  extensions: OFF,
  first: ERROR,
  // I LOVE this rule. IMO it improves understandability of larger files.
  'group-exports': ERROR,
  // An arbitrary constraint that doesn't necessarily create maintainable code
  'max-dependencies': OFF,
  // Unnecessary, handled by ESLint core
  'newline-after-import': OFF,
  // Unnecessary, we enforce named exports
  'no-anonymous-default-export': OFF,
  // Named exports create more consistent and searchable code. We can add an
  // `eslint-disable-next-line` comment in third party integrations (e.g.,
  // config files) that require default exports.
  'no-default-export': ERROR,
  // Unnecessary, handled by ESLint core
  'no-duplicates': OFF,
  'no-named-default': OFF,
  'no-named-export': OFF,
  'no-namespace': ERROR,
  'no-unassigned-import': [
    ERROR,
    {
      allow: [
        // Side effect file that adds RTL matchers to Jest globals
        '@testing-library/jest-dom',
      ],
    },
  ],
  order: [
    ERROR,
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        // I'd prefer types to be next to their other imports, but that doesn't
        // seem to be an option at this time
        'type',
      ],
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
  'prefer-default-export': OFF,
};

const importRules = addPrefix(prefix, {
  ...importHelpfulWarnings,
  ...importModuleSystems,
  ...importStaticAnalysis,
  ...importStyleGuide,
});

const importSettings = {
  'import/ignore': [
    // Prevents false errors when importing CJS deps with import statements
    'node_modules',
  ],
  'import/parsers': {
    // Parser settings are required for all files in order for the import plugin
    // to use the new flat config. This may not be necessary in future releases.
    // https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
    espree: ['.js', '.jsx'],
    '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
  },
  'import/resolver': {
    typescript: true,
    node: true,
  },
};

export { importPluginConfig, importRules, importSettings };
