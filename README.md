# eslint-robBnB: Rules for modern JavaScript

This package provides linter configuration and rulesets that help engineers write high quality, consistent, and maintainable code. It uses the new [ESLint flat configuration file format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

## Approach

The configuration focuses on modern JavaScript, TypeScript, and React. It avoids setting rules for legacy patterns (e.g., React lifecycle methods, PropTypes), deprecated APIs, and direct DOM manipulations.

To improve code consistency, it enforces one implementation of a pattern when multiple exist. For example, functional React components are preferred over class components, and `Array` iteration methods are preferred over `for each` loops. Clever, less obvious patterns are forbidden; `Array.prototype.reduce` and bitwise operators may be terse, but alternatives are better understood across a large sample of engineers. Autofixable rules are used when possible, enabling fixes on save with a properly configured IDE.

### Why not [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)?

For years engineers have extended AirBnB's config, and while it's a fantastic starting point it's somewhat outdated and permissive. Because it's used so broadly, the maintainers are reluctant to forbid legacy patterns and avoid enabling useful rules that would create breaking changes in their consumer's codebases. This package uses AirBnB as a reference but follows a more focused and restrictive approach.

## Plugins

This package applies rules from the following plugins:

- [@regru/eslint-plugin-prefer-early-return](https://github.com/regru/eslint-plugin-prefer-early-return)
- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
- [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i) (an improved version of [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import))
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [eslint-plugin-package-json](https://github.com/zetlen/eslint-plugin-package-json)
- [eslint-plugin-prefer-arrow](https://github.com/TristonJ/eslint-plugin-prefer-arrow)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-react-prefer-function-component](https://github.com/tatethurston/eslint-plugin-react-prefer-function-component)
- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [eslint-plugin-validate-jsx-nesting](https://github.com/MananTank/eslint-plugin-validate-jsx-nesting)
- [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest)

## Requirements

- [x] If using React, your bundler is configured to automatically insert the [new JSX transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). Bundlers like [Vite](https://vitejs.dev/) do this by default.
- [x] You're using [TypeScript](typescriptlang.org/) for type safety. All PropType linters are disabled.
- [x] You're using [Prettier](https://prettier.io/). Many useful ESLint rules are disabled with the expectation that Prettier formatting will make them unnecessary.

## Installation

Install the package and its peer dependencies.

```sh
npm install eslint-robbnb eslint@^8
```

## Usage

This package uses the new [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). Instead of referencing configuration via magic strings, it uses exported configuration directly.

eslint-robBnB adds configuration for the following file types. You can override rules using ESLint's flat configuration cascade, described in [this blog post](https://eslint.org/blog/2022/08/new-config-system-part-2/#goodbye-extends%2C-hello-flat-cascade).

<!-- prettier-ignore -->
| File type |  Glob patterns |
| --- | --- |
| package.json files | `**/package.json` |
| JavaScript-based files | `**/*.js`, `**/*.jsx`, `**/*.cjs`, `**/*.mjs`, `**/*.ts`, `**/*.tsx`, `**/*.d.ts` |
| TypeScript files | `**/*.ts`, `**/*.tsx`, `**/*.d.ts` |
| Test files | `**/*.test.js`, `**/*.test.jsx`, `**/*.test.cjs`, `**/*.test.mjs`, `**/*.test.ts`, `**/*.test.tsx`, `**/test/**` |

### Example configuration

```js
// eslint.config.js
import prettierConfig from 'eslint-config-prettier';
import { robBnBConfig } from 'eslint-robbnb';

const config = [
  // The export is an array of configuration objects and must be spread into
  // the flat config
  ...robBnBConfig,

  // Project-specific configuration
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions: {
      // Configuration for parsers, globals, etc.
    },
    rules: {
      // Additional rules and overrides
      'react/no-adjacent-inline-elements': 'error',
    },
  },

  prettierConfig,
];

// RobBnB prefers named exports; this rule must be disabled for config files
// eslint-disable-next-line import/no-default-export
export default config;
```

For a complete example, see this package's [eslint.config.js](https://github.com/robwierzbowski/eslint-robBnB/blob/main/eslint.config.js).
