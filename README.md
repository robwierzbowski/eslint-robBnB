# RobBnB: ESLint rulesets for modern applications

This package provides linting configuration and rulesets that help engineers write high quality, consistent, and maintainable code. It uses the new [ESLint flat configuration file format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

## Approach

The configuration focuses on modern JavaScript, TypeScript, and React. It avoids setting rules for legacy patterns (e.g., class components, PropTypes), deprecated APIs, and direct DOM manipulations.

The configuration includes opinionated rules that improve the consistency of applications by enforcing one modern, simplistic implementation of a pattern when multiple exist. For example, functional React components are preferred over class components, and `Array` iteration methods are preferred over `for each` loops. Clever, less obvious patterns are forbidden; `Array.prototype.reduce` and bitwise operators may be terse, but verbose alternatives are accessible to a wider audience. Autofixable rules are preferred, allowing automatic code transformation on save with a properly configured IDE.

### Why not [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)?

For years engineers have extended AirBnB's config, and while it's a fantastic starting point it is somewhat outdated and permissive. Because of its broad usage the maintainers are reluctant to forbid legacy code patterns like React class components, and have avoided useful rules that would create breaking changes. This package uses AirBnB as a reference but follows the more focused and restrictive approach described above.

## Plugins

RobBnB sets rules from the following plugins:

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

Install the config and its required peer dependencies.

```sh
npm install eslint@^8 eslint-robbnb
```

_RW side note: I haven't published to NPM yet, for reasons, so currently you have to install directly from this repository._

## Expectations

These rules expect your application or tool to be configured in the following ways. If it isn't you may need to alter related rules.

- If using React, your bundler is configured to automatically insert the [new JSX transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). Bundlers like [Vite](https://vitejs.dev/) do this by default.
- If type safety is desired, you're using TypeScript. All PropType linters are disabled.
- Your are using [Prettier](https://prettier.io/). Many useful rules are disabled with the expectation that Prettier makes them unnecessary.

## Usage

This package uses the new [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). Instead of referencing configuration via magic strings, we now reference and manipulate configuration as JS objects.

The package exposes configuration for JavaScript-based files, package.json files, TypeScript files, and [Jest](https://jestjs.io/)/[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) files. Each config must be spread into a flat config object configured to apply to these the relevant files in your repository.

```js
// eslint.config.js
import prettierConfig from 'eslint-config-prettier';
import {
  javaScriptConfig,
  packageJsonConfig,
  testConfig,
  typescriptConfig,
} from 'eslint-robbnb';

const languageOptions = {
  // Configuration for parsers, globals, etc.
};

const config = [
  // package.json configuration. Note this configuration includes its own
  // processor
  {
    files: ['package.json'],
    ...packageJsonConfig,
  },

  // All JavaScript-based files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    ...javaScriptConfig,
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    ...typescriptConfig,
  },

  // Test files
  {
    files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/test/**'],
    ...testConfig,
  },

  // Adding Prettier config last will override any rules that might conflict
  // with Prettier settings
  prettierConfig,
];

// These rules prefer named exports; disabling the rule is necessary for some
// config files
//eslint-disable-next-line import/no-default-export
export default config;
```

For a complete example see [this package's eslint.config.js file](https://github.com/robwierzbowski/eslint-robBnB/blob/main/eslint.config.js).

### Overriding configuration and rules

Each configuration object contains a `rules` object, in addition to `plugin`, `processor`, and `settings` objects where needed. To add additional ESLint rules or override existing ones you must to alter the `rules` object. You can log the config objects for a better understanding of what they set and what you can manipulate. This is a little cumbersome — as this project and the flat config evolve I may find terser ways to apply and add rules.

Two possible methods for adding new rules are:

#### Add a new object to the cascade and let ESLint deep merge the configurations

ESLint deep merges every configuration object who's file glob patterns match a file being linted.

_Note: maybe I should bundle the whole config with globs included, and trust that most people are using standard file extensions. The package.json config would maybe need some additional config to work in monorepos._

```js
import { javaScriptConfig } from 'eslint-robbnb';

const languageOptions = {
  // Your language options
};

const config = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    ...javaScriptConfig,
  },

  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    rules: {
      // Your additional rules
      'react/no-did-update-set-state': 'error',
    },
  },
];
```

#### Deep merge the configurations yourself

Using a tool like [defaults](https://github.com/sindresorhus/node-defaults):

```js
import { javaScriptConfig } from 'eslint-robbnb';
import defaults from 'defaults';

const languageOptions = {
  // Your language options
};

const myJavaScriptConfig = defaults(javaScriptConfig, {
  rules: {
    // Your additional rules
    'react/no-did-update-set-state': 'error',
  },
});

const config = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions,
    ...myJavaScriptConfig,
  },
];
```
