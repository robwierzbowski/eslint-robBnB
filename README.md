# RobBnB: ESLint rulesets for modern applications

This package provides linting configuration and rulesets that help engineers write high quality, consistent, and maintainable code. It uses the new [ESLint flat configuration file format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

## Approach

The configuration focuses on modern JavaScript, TypeScript, and React. It avoids setting rules for legacy patterns (e.g., class components, PropTypes), deprecated APIs, and direct DOM manipulations.

It contains opinionated rules that improve the consistency of applications by enforcing one modern, simplistic method of implementing common patterns. For example, functional React components are preferred over class components, and `Array` iteration methods are preferred over `for` loops. Clever, less obvious patterns are forbidden; `Array.prototype.reduce` and bitwise operators may be terse, but verbose alternatives are often accessible to a wider audience. Autofixable rules are preferred, allowing automatic code transformation on save with a properly configured IDE.

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

## Usage

This package uses the new [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). Instead of referencing configuration via strings, we now add and manipulate configuration as JS objects.

The package exposes configuration for JavaScript-based files, package.json files, TypeScript, and [Jest](https://jestjs.io/)/[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) files. Each config must be spread into a flat config object that specifies the files that config will be applied to.

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
  // Settings for globals, parsers, and other rulesets.
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
    files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.d.ts'],
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

  // RobBnB rules are intended to be used with Prettier. Adding prettier config
  // last will override any rules that might conflict with prettier settings.
  prettierConfig,
];

// Import settings prefer named exports; an exception must be made for most
// config files
//eslint-disable-next-line import/no-default-export
export default config;
```
