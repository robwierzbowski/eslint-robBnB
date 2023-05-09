# eslint-robBnB: Rules for modern applications

This package provides linter configuration and rulesets that help engineers write high quality, consistent, and maintainable code. It uses the new [ESLint flat configuration file format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

## Approach

The configuration focuses on modern JavaScript, TypeScript, and React. It avoids setting rules for legacy patterns (e.g., class components, PropTypes), deprecated APIs, and direct DOM manipulations.

The configuration includes opinionated rules that improve the consistency of applications by enforcing one implementation of a pattern when multiple exist. For example, functional React components are preferred over class components and `Array` iteration methods are preferred over `for each` loops. Clever, less obvious patterns are forbidden; `Array.prototype.reduce` and bitwise operators may be terse, but alternatives are more easily understood by most engineers. Autofixable rules are preferred, enabling automatic code transformation on save with a properly configured IDE.

### Why not [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)?

For years engineers have extended AirBnB's config, and while it's a fantastic starting point it's somewhat outdated and permissive. Because it's used so broadly, the maintainers are reluctant to forbid legacy code patterns and have avoided enabling rules that would create breaking changes in consuming codebases. This package uses AirBnB as a reference but follows a more focused and restrictive approach.

## Plugins

This package configures and sets rules from the following plugins:

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

## Install

Install the package and its required peer dependencies.

```sh
npm install eslint-robbnb eslint@^8
```

_RW side note: I haven't published to NPM yet, for reasons, so currently you have to install directly from this repository._

## Expectations

These rules expect your repository to be configured in the following ways. If it isn't you may need to alter related rules.

- If using React, your bundler is configured to automatically insert the [new JSX transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). Bundlers like [Vite](https://vitejs.dev/) do this by default.
- If type safety is desired, you're using [TypeScript](typescriptlang.org/). All PropType linters are disabled.
- You're using [Prettier](https://prettier.io/). Many useful rules are disabled with the expectation that Prettier makes them unnecessary.

## Usage

This package uses the new [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). Instead of referencing configuration via magic strings, we now import configuration directly.

The package provides plugin configurations, settings, and rules for the following file types, detected using the following glob patterns:

- package.json files (`'**/package.json'`)
- JavaScript-based files (`'**/*.js', '**/.jsx', '**/.ts', '**/*.tsx', '**/*.d.ts'`)
- TypeScript files (`'**/*.ts', '**/.tsx', '**/.d.ts'`)
- Test files using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)) (`'**/*.test.js', '**/.test.jsx', '**/.test.ts', '**/*.test.tsx', '**/test/**'`)

```js
// eslint.config.js
import prettierConfig from 'eslint-config-prettier';
import { robBnBConfig } from 'eslint-robbnb';

const languageOptions = {
  // Configuration for parsers, globals, etc.
};

const config = [
  // robBnBConfig is an array of config objects and must be spread into the
  // ESLint flat config
  ...robBnBConfig,

  // Your custom configuration
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
  },

  // Disable any rules that conflict with Prettier formatting
  prettierConfig,
];

// RobBnB prefers named exports; disabling the rule is necessary for some
// third party configuration files
//eslint-disable-next-line import/no-default-export
export default config;
```

For a complete example see [this package's eslint.config.js file](https://github.com/robwierzbowski/eslint-robBnB/blob/main/eslint.config.js).

### Overriding configuration and rules

ESlint's new flat configuration system deep merges all configuration objects with a file glob that matches the file being linted. Add your own rules below the RobBnB config to override the rules it contains. [Read about the flat configuration file cascade here](https://eslint.org/blog/2022/08/new-config-system-part-2/#goodbye-extends%2C-hello-flat-cascade).

```js
const config = [
  ...robBnBConfig,

  // JavaScript configuration and rules
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    rules: {
      'react/no-adjacent-inline-elements': 'error',
    },
  },

  // TypeScript configuration and rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-dynamic-delete': 'off',
    },
  },
];
```
