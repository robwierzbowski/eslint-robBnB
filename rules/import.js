import importPlugin from 'eslint-plugin-i';
import { ERROR, OFF, addPrefix } from './shared.js';

const prefix = 'import';

const importPluginConfig = {
  [prefix]: importPlugin,
};

const importHelpfulWarnings = {
  // Forbid any invalid exports, i.e. re-export of the same name
  export: ERROR,
  // Forbid imported names marked with @deprecated documentation tag
  // RW: This rule has poor performance, and could be moved under a CLI-only
  // flag
  'no-deprecated': ERROR,
  // Forbid empty named import blocks
  'no-empty-named-blocks': ERROR,
  // Forbid the use of extraneous packages
  'no-extraneous-dependencies': ERROR,
  // Forbid the use of mutable exports with var or let
  'no-mutable-exports': ERROR,
  // Forbid use of exported name as identifier of default export
  'no-named-as-default': ERROR,
  // Forbid use of exported name as property of default export
  'no-named-as-default-member': ERROR,
  // Forbid modules without exports, or exports without matching import in another module
  // RW: This could be useful, but it could be often-changing configuration to
  // exclude settings files. Off for now.
  'no-unused-modules': OFF,
};

const importModuleSystems = {
  // Forbid AMD require and define calls
  'no-amd': ERROR,
  // Forbid CommonJS require calls and module.exports or exports
  // RW: Using CommonJS is still sometimes required at this point
  'no-commonjs': OFF,
  // Forbid import statements with CommonJS module.exports
  'no-import-module-exports': ERROR,
  // Forbid Node.js builtin modules
  'no-nodejs-modules': OFF,
  // Forbid potentially ambiguous parse goal (script vs. module)
  // RW: This errors on d.ts files. The risk of dangerous mismatches in runtime
  // code is unknown at this time, so let's disable for now.
  unambiguous: OFF,
};

const importStaticAnalysis = {
  // Ensure a default export is present, given a default import
  default: ERROR,
  // Ensure named imports correspond to a named export in the remote file
  named: [ERROR, {}],
  // Ensure imported namespaces contain dereferenced properties as they are dereferenced
  namespace: OFF,
  // Forbid import of modules using absolute paths
  'no-absolute-path': ERROR,
  // Forbid a module from importing a module with a dependency path back to
  // itself
  // RW: Trade some safety for performance since we're using this primarily
  // in-editor. We could also add a command line check to enable infinite depth.
  'no-cycle': [ERROR, { maxDepth: 5 }],
  // Forbid require() calls with expressions
  'no-dynamic-require': ERROR,
  // Forbid importing the submodules of other modules
  // RW: Could be useful but requires project specific configuration
  'no-internal-modules': OFF,
  // Forbid importing packages through relative paths
  'no-relative-packages': OFF,
  // Forbid importing modules from parent directories
  'no-relative-parent-imports': OFF,
  // Enforce which files can be imported in a given folder
  'no-restricted-paths': OFF,
  // Forbid a module from importing itself
  'no-self-import': ERROR,
  // Ensure imports point to a file/module that can be resolved
  'no-unresolved': ERROR,
  // Forbid unnecessary path segments in import and require statements
  'no-useless-path-segments': ERROR,
  // Forbid webpack loader syntax in imports
  'no-webpack-loader-syntax': ERROR,
};

const importStyleGuide = {
  // Enforce or ban the use of inline type-only markers for named imports
  'consistent-type-specifier-style': [ERROR, 'prefer-top-level'],
  // Enforce a leading comment with the webpackChunkName for dynamic imports
  // RW: Not all of us are on Webpack anymore (Vite FTW!)
  'dynamic-import-chunkname': OFF,
  // Ensure all exports appear after other statements
  'exports-last': ERROR,
  // Ensure consistent use of file extension within the import path
  // RW: Useful if using certain module resolution patterns (e.g., nodeNext),
  // but very project specific
  extensions: OFF,
  // Ensure all imports appear before other statements
  first: ERROR,
  // Prefer named exports to be grouped together in a single export declaration
  // RW: I LOVE this rule. IMO it improves understandability of larger files
  'group-exports': ERROR,
  // Enforce the maximum number of dependencies a module can have
  // RW: An arbitrary constraint that doesn't necessarily create more
  // maintainable code
  'max-dependencies': OFF,
  // Enforce a newline after import statements
  // RW: Handled by ESLint core
  'newline-after-import': OFF,
  // Forbid anonymous values as default exports
  // RW: This isn't an issue when we prefer named exports
  'no-anonymous-default-export': OFF,
  // Forbid default exports
  // RW: Named exports create more consistent code. Settings files that require
  // default exports can use disable comments.
  'no-default-export': ERROR,
  // Forbid repeated import of the same module in multiple places
  // RW: Handled by ESLint core
  'no-duplicates': OFF,
  // Forbid named default exports
  'no-named-default': OFF,
  // Forbid named exports
  // RW: We want to encourage named exports!
  'no-named-export': OFF,
  // Forbid namespace (a.k.a. "wildcard" *) imports
  'no-namespace': ERROR,
  // Forbid unassigned imports
  // RW: This style is becoming less and less common. We can disable at point of
  // use for the few cases that it's still necessary (e.g., self executing
  // polyfills)
  'no-unassigned-import': [
    ERROR,
    {
      allow: [
        // Side effect file that adds RTL matchers to Jest globals
        '@testing-library/jest-dom',
      ],
    },
  ],
  // Enforce a convention in module import order
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
        // RW: I'd like types to be next to their other imports. Let's see how
        // this works in practice.
        'type',
      ],
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
  // Prefer a default export if module exports a single name or multiple names
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
    // Prevents false positives when importing CJS deps with import statements
    'node_modules',
  ],
  'import/parsers': {
    // Parser settings are required for all files in order for the import plugin
    // to use the new flat config. This may not be necessary in future releases.
    // https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
    espree: ['.js', '.jsx'],
    // TODO: Does this need to move into the block below?
    '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
  },
  'import/resolver': {
    typescript: true,
    node: true,
  },
};

export { importPluginConfig, importRules, importSettings };
