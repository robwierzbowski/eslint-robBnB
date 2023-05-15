import vitest from 'eslint-plugin-vitest';
import { ERROR, OFF, addPrefix } from '../utils/index.js';

const prefix = 'vitest';

const vitestPluginConfig = {
  [prefix]: vitest,
};

const rules = {
  'consistent-test-filename': ERROR,
  'consistent-test-it': ERROR,
  'expect-expect': ERROR,
  // Add an arbitrary limit that should help prevent tests that cover too much
  // functionality
  'max-expects': [
    ERROR,
    {
      max: 8,
    },
  ],
  // This should help avoid engineers adding complex context or too much
  // branching for easy maintenance
  'max-nested-describe': [
    ERROR,
    {
      max: 4,
    },
  ],
  // Love it. Decisions over options.
  'no-alias-methods': ERROR,
  'no-commented-out-tests': ERROR,
  'no-conditional-expect': ERROR,
  'no-conditional-in-test': ERROR,
  'no-conditional-tests': ERROR,
  'no-disabled-tests': ERROR,
  'no-done-callback': ERROR,
  'no-duplicate-hooks': ERROR,
  'no-focused-tests': ERROR,
  // We want to encourage before* and after* as a way of sharing setup and
  // teardown between tests
  'no-hooks': OFF,
  'no-identical-title': ERROR,
  'no-interpolation-in-snapshots': ERROR,
  // Current industry style is to avoid using larger snapshots as a primary
  // testing utility. Inline snapshots can still be an efficient way to test
  // object shapes and function output.
  'no-large-snapshots': [
    ERROR,
    {
      // Encourage human readable inline snapshots
      inlineMaxSize: 25,
      // Allow larger external snapshots. Engineers will most often be seeing
      // diffs of external snapshots, so the snap total size is less important.
      maxSize: 150,
    },
  ],
  'no-mocks-import': ERROR,
  // .not is a useful matcher now and again, so let's allow its use
  'no-restricted-matchers': OFF,
  'no-restricted-vi-methods': OFF,
  'no-standalone-expect': ERROR,
  'no-test-prefixes': ERROR,
  'no-test-return-statement': ERROR,
  'prefer-called-with': ERROR,
  'prefer-comparison-matcher': ERROR,
  'prefer-each': ERROR,
  'prefer-equality-matcher': ERROR,
  'prefer-expect-resolves': ERROR,
  'prefer-hooks-in-order': ERROR,
  'prefer-hooks-on-top': ERROR,
  // Encourage readable output when describe and it blocks are concatenated in
  // cli output
  'prefer-lowercase-title': [
    ERROR,
    {
      ignore: ['describe'],
    },
  ],
  'prefer-mock-promise-shorthand': ERROR,
  'prefer-snapshot-hint': ERROR,
  'prefer-spy-on': ERROR,
  'prefer-strict-equal': ERROR,
  'prefer-to-be': ERROR,
  'prefer-to-be-falsy': ERROR,
  'prefer-to-be-object': ERROR,
  'prefer-to-be-truthy': ERROR,
  'prefer-to-contain': ERROR,
  'prefer-to-have-length': ERROR,
  'prefer-todo': ERROR,
  // Specifically for `describe` blocks
  'require-hook': ERROR,
  'require-to-throw-message': ERROR,
  // It's pleasant to write file-level before* and after* hooks at the top
  // scope of the file
  'require-top-level-describe': OFF,
  'valid-describe-callback': ERROR,
  'valid-expect': ERROR,
  'valid-title': ERROR,
};

const vitestRules = addPrefix(prefix, rules);

export { vitestPluginConfig, vitestRules };
