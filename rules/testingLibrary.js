import testingLibrary from 'eslint-plugin-testing-library';
import { ERROR, OFF, addPrefix } from '../utils.js';

const prefix = 'testing-library';

const testingLibraryPluginConfig = {
  [prefix]: testingLibrary,
};

const rules = {
  'await-async-query': ERROR,
  'await-async-utils': ERROR,
  // Unnecessary non-React rule
  'await-fire-event': OFF,
  // the data-testid attribute creates enough searchability for test ids
  'consistent-data-testid': OFF,
  'no-await-sync-events': ERROR,
  'no-await-sync-query': ERROR,
  // This is restrictive to the point of idealism, but I can see it creating
  // more a11y UI. Let's try it out.
  'no-container': ERROR,
  'no-debugging-utils': ERROR,
  'no-dom-import': ERROR,
  'no-global-regexp-flag-in-query': ERROR,
  'no-manual-cleanup': ERROR,
  // This is restrictive to the point of idealism, but until it creates a
  // problem let's try it out.
  'no-node-access': ERROR,
  'no-promise-in-fire-event': ERROR,
  // I agree with KCD on this point: repetition of rendering creates more clear,
  // direct test code than clever DRYing
  'no-render-in-setup': ERROR,
  'no-unnecessary-act': ERROR,
  'no-wait-for-empty-callback': ERROR,
  'no-wait-for-multiple-assertions': ERROR,
  'no-wait-for-side-effects': ERROR,
  'no-wait-for-snapshot': ERROR,
  'prefer-explicit-assert': ERROR,
  'prefer-find-by': ERROR,
  'prefer-presence-queries': ERROR,
  'prefer-query-by-disappearance': ERROR,
  'prefer-screen-queries': ERROR,
  // We stan userEvent. It simulates the groups of events that browsers fire on
  // a single interaction, allowing realistic user testing with minimal manual
  // event triggering.
  'prefer-user-event': ERROR,
  'prefer-wait-for': ERROR,
  'render-result-naming-convention': ERROR,
};

const testingLibraryRules = addPrefix(prefix, rules);

export { testingLibraryPluginConfig, testingLibraryRules };
