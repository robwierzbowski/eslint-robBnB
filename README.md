# eslint-robBnB: Rules for modern JavaScript

This package provides linter configuration and rulesets that help engineers write high quality, consistent, and maintainable code. It uses the new [ESLint flat configuration file format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

## Approach

The configuration focuses on modern JavaScript, TypeScript, and React. It avoids setting rules for legacy patterns (e.g., class components, PropTypes), deprecated APIs, and direct DOM manipulations.

To improve code consistency, it enforces one implementation of a pattern when multiple exist. For example, functional React components are preferred over class components, and `Array` iteration methods are preferred over `for each` loops. Clever, less obvious patterns are forbidden; `Array.prototype.reduce` and bitwise operators may be terse, but alternatives are more easily understood by a wide audience. Autofixable rules are used when possible, enabling automatic code transformation with a properly configured IDE.

### Why not [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)?

For years engineers have extended AirBnB's config, and while it's a fantastic starting point it's somewhat outdated and permissive. Because it's used so broadly, the maintainers are reluctant to forbid legacy patterns and avoid enabling useful rules that would create breaking changes in their consumer's codebases. This package uses AirBnB as a reference but follows a more focused and restrictive approach.

## Plugins

This package configures and applies rules from the following plugins:

- [@regru/eslint-plugin-prefer-early-return](https://github.com/regru/eslint-plugin-prefer-early-return)
- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
- [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i) (an improved version of [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import))
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [eslint-plugin-package-json](https://github.com/zetlen/eslint-plugin-package-json)
- [eslint-plugin-prefer-arrow](https://github.com/TristonJ/eslint-plugin-prefer-arrow)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-react-prefer-function-component](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component)
- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [eslint-plugin-validate-jsx-nesting](https://github.com/MananTank/eslint-plugin-validate-jsx-nesting)

## Requirements

- [x] If using React, your bundler is configured to automatically insert the [new JSX transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). Bundlers like [Vite](https://vitejs.dev/) do this by default.
- [x] You're using [TypeScript](typescriptlang.org/) for type safety. All PropType linters are disabled.
- [x] You're using [Prettier](https://prettier.io/). Many useful rules are disabled with the expectation that Prettier makes them unnecessary.

## Installation

Install the package and its peer dependencies.

```sh
npm install eslint-robbnb eslint@^8
```

_RW side note: I haven't published to NPM yet, for reasons, so currently you have to install directly from this github._

## Usage

This package uses the new [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). Instead of referencing configuration via magic strings, it uses imported configuration directly.

```js
// eslint.config.js
import prettierConfig from 'eslint-config-prettier';
import { robBnBConfig } from 'eslint-robbnb';

const config = [
  // The import is an array of configuration objects and must be spread into
  // the flat config
  ...robBnBConfig,

  // Project-specific configuration
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions: {
      // Configuration for parsers, globals, etc.
    },
  },

  // Disable any rules that conflict with Prettier
  prettierConfig,
];

// RobBnB prefers named exports; this rule must be disabled for config files
// eslint-disable-next-line import/no-default-export
export default config;
```

For a complete working example see this package's [eslint.config.js](https://github.com/robwierzbowski/eslint-robBnB/blob/main/eslint.config.js).

### Overriding rules

ESLint's new flat configuration system merges all configuration objects who's `files` globs match the file being linted. For example, all configs with a `**/*.js` glob will be deep merged and used when linting a file named `foo.js`. [Read more about the flat cascade here](https://eslint.org/blog/2022/08/new-config-system-part-2/).

The package provides plugin configuration, settings, and rules for the following file types, detected using the following glob patterns:

<!-- prettier-ignore -->
| File type |  Glob patterns |
| --- | --- |
| package.json files | `**/package.json` |
| JavaScript-based files | `**/*.js`, `**/*.jsx`, `**/*.cjs`, `**/*.mjs`, `**/*.ts`, `**/*.tsx`, `**/*.d.ts` |
| TypeScript files | `**/*.ts`, `**/*.tsx`, `**/*.d.ts` |
| Test files that use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | `**/*.test.js`, `**/*.test.jsx`, `**/*.test.cjs`, `**/*.test.mjs`, `**/*.test.ts`, `**/*.test.tsx`, `**/test/**` |

Add rules below the RobBnB config to override the rules it contains.

```js
const config = [
  ...robBnBConfig,

  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions: {
      // Configuration for parsers, globals, etc.
    },
    rules: {
      'react/no-adjacent-inline-elements': 'error',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-dynamic-delete': 'off',
    },
  },
];
```
