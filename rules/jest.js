import jest from 'eslint-plugin-jest';
import { ERROR, OFF, addPrefix } from './shared.js';

const prefix = 'jest';

const jestPluginConfig = {
  [prefix]: jest,
};

const rules = {
  // Enforce test and it usage conventions
  'consistent-test-it': ERROR,
  // Enforce assertion to be made in a test body
  'expect-expect': ERROR,
  // Enforces a maximum number assertion calls in a test body
  // RW: Limit tests to 5 assertions; arbitrary but will help prevent tests that
  // cover too much functionality.
  'max-expects': [ERROR, { max: 5 }],
  // Enforces a maximum depth to nested describe calls
  // RW: Honestly 4 is probably too much. The engineer is probably trying to add
  // too much context or branching for easy maintenance
  'max-nested-describe': [ERROR, { max: 4 }],
  // Disallow alias methods
  // RW: Love it. Decisions over options.
  'no-alias-methods': ERROR,
  // Disallow commented out tests
  'no-commented-out-tests': ERROR,
  // Disallow calling expect conditionally
  'no-conditional-expect': ERROR,
  // Disallow conditional logic in tests
  'no-conditional-in-test': ERROR,
  // Disallow use of deprecated functions
  'no-deprecated-functions': ERROR,
  // Disallow disabled tests
  'no-disabled-tests': ERROR,
  // Disallow using a callback in asynchronous tests and hooks
  'no-done-callback': ERROR,
  // Disallow duplicate setup and teardown hooks.
  'no-duplicate-hooks': ERROR,
  // Disallow using exports in files containing tests
  'no-export': ERROR,
  // Disallow focused tests
  'no-focused-tests': ERROR,
  // Disallow setup and teardown hooks
  // RW: We want to encourage before* and after* as a way of sharing setup and
  // teardown between tests
  'no-hooks': OFF,
  // Disallow identical titles
  'no-identical-title': ERROR,
  // Disallow string interpolation inside snapshots
  'no-interpolation-in-snapshots': ERROR,
  // Disallow Jasmine globals
  'no-jasmine-globals': ERROR,
  // Disallow large snapshots
  // RW: Current industry style is to avoid using larger snapshots as a primary
  // testing utility. Inline snapshots can still be an efficient way to test
  // object shapes and function output.
  'no-large-snapshots': [
    ERROR,
    {
      // Allow larger external snapshots. Engineers will most often be seeing
      // diffs of external snapshots, so the snap total size is less important.
      maxSize: 250,
      // Encourage human readable inline snapshots
      inlineMaxSize: 25,
    },
  ],
  // Disallow manually importing from __mocks__
  'no-mocks-import': ERROR,
  // Disallow specific jest. methods
  'no-restricted-jest-methods': OFF,
  // Disallow specific matchers & modifiers
  'no-restricted-matchers': OFF,
  // Disallow using expect outside of it or test blocks
  'no-standalone-expect': ERROR,
  // Require using .only and .skip over f and x
  'no-test-prefixes': ERROR,
  // Disallow explicitly returning from tests
  'no-test-return-statement': ERROR,
  // Disallow using jest.mock() factories without an explicit type parameter
  // RW: I haven't seen this cause any issues IRL. We should probably try this
  // out sometime though.
  'no-untyped-mock-factory': OFF,
  // Suggest using toBeCalledWith() or toHaveBeenCalledWith()
  'prefer-called-with': ERROR,
  // Suggest using the built-in comparison matchers
  'prefer-comparison-matcher': ERROR,
  // Prefer using .each rather than manual loops
  'prefer-each': ERROR,
  // Suggest using the built-in equality matchers
  'prefer-equality-matcher': ERROR,
  // Suggest using expect.assertions() OR expect.hasAssertions()
  // RW: Enforce at runtime with a global `expect.hasAssertions()` call
  'prefer-expect-assertions': OFF,
  // Prefer await expect(...).resolves over expect(await ...) syntax
  'prefer-expect-resolves': ERROR,
  // Prefer having hooks in a consistent order
  'prefer-hooks-in-order': ERROR,
  // Suggest having hooks before any test cases
  'prefer-hooks-on-top': ERROR,
  // Enforce lowercase test names
  // RW: Encourage readable output when describe and it blocks are concatenated
  // in cli output
  'prefer-lowercase-title': [ERROR, { ignore: ['describe'] }],
  // Prefer mock resolved/rejected shorthands for promises
  'prefer-mock-promise-shorthand': ERROR,
  // Prefer including a hint with external snapshots
  'prefer-snapshot-hint': [ERROR, 'multi'],
  // Suggest using jest.spyOn()
  'prefer-spy-on': ERROR,
  // Suggest using toStrictEqual()
  'prefer-strict-equal': ERROR,
  // Suggest using toBe() for primitive literals
  'prefer-to-be': ERROR,
  // Suggest using toContain()
  'prefer-to-contain': ERROR,
  // Suggest using toHaveLength()
  'prefer-to-have-length': ERROR,
  // Suggest using test.todo
  'prefer-todo': ERROR,
  // Require setup and teardown code to be within a hook
  // RW: Sometimes it's more terse and maintainable to write light, unshared
  // setup code in a test block
  'require-hook': OFF,
  // Require a message for toThrow()
  'require-to-throw-message': ERROR,
  // Require test cases and hooks to be inside a describe block
  'require-top-level-describe': ERROR,
  // Enforce valid describe() callback
  'valid-describe-callback': ERROR,
  // Enforce valid expect() usage
  'valid-expect': ERROR,
  // Require promises that have expectations in their chain to be valid
  'valid-expect-in-promise': ERROR,
  // Enforce valid titles
  'valid-title': ERROR,
};

const jestRules = addPrefix(prefix, rules);

export { jestPluginConfig, jestRules };
