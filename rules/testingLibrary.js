import testingLibrary from 'eslint-plugin-testing-library';
import { ERROR, OFF, addPrefix } from './shared.js';

// https://github.com/testing-library/eslint-plugin-testing-library
// {
//   "extends": ["plugin:testing-library/react"]
// }

const prefix = 'testing-library';

const testingLibraryPluginConfig = {
  [prefix]: testingLibrary,
};

const rules = {
  // Enforce promises from async queries to be handled
  'await-async-query': ERROR,
  // Enforce promises from async utils to be awaited properly
  'await-async-utils': ERROR,
  // Enforce promises from fireEvent methods to be handled
  // RW: Non-React rule
  'await-fire-event': OFF,
  // Ensures consistent usage of data-testid
  // RW: the data-testid attribute creates enough greppability for test ids
  'consistent-data-testid': OFF,
  // Disallow unnecessary await for sync events
  'no-await-sync-events': ERROR,
  // Disallow unnecessary await for sync queries
  'no-await-sync-query': ERROR,
  // Disallow the use of container methods
  // RW: This is restrictive to the point of idealism, but I can see it creating
  // more a11y UI. Let's try it out.
  'no-container': ERROR,
  // Disallow the use of debugging utilities like debug
  'no-debugging-utils': ERROR,
  // Disallow importing from DOM Testing Library
  'no-dom-import': ERROR,
  // Disallow the use of the global RegExp flag (/g) in queries
  'no-global-regexp-flag-in-query': ERROR,
  // Disallow the use of cleanup
  'no-manual-cleanup': ERROR,
  // Disallow direct Node access
  // RW: This is restrictive to the point of idealism, but until it creates a
  // problem let's try it out.
  'no-node-access': ERROR,
  // Disallow the use of promises passed to a fireEvent method
  'no-promise-in-fire-event': ERROR,
  // Disallow the use of render in testing frameworks setup functions
  // RW: I do agree with KCD on this point. Repetition of rendering creates more
  // clear, direct test code than clever DRYing.
  'no-render-in-setup': ERROR,
  // Disallow wrapping Testing Library utils or empty callbacks in act
  'no-unnecessary-act': ERROR,
  // Disallow empty callbacks for waitFor and waitForElementToBeRemoved
  'no-wait-for-empty-callback': ERROR,
  // Disallow the use of multiple expect calls inside waitFor
  'no-wait-for-multiple-assertions': ERROR,
  // Disallow the use of side effects in waitFor
  'no-wait-for-side-effects': ERROR,
  // Ensures no snapshot is generated inside of a waitFor call
  'no-wait-for-snapshot': ERROR,
  // Suggest using explicit assertions rather than standalone queries
  'prefer-explicit-assert': ERROR,
  // Suggest using find(All)By* query instead of waitFor + get(All)By* to wait for elements
  'prefer-find-by': ERROR,
  // Ensure appropriate get*/query* queries are used with their respective matchers
  'prefer-presence-queries': ERROR,
  // Suggest using queryBy* queries when waiting for disappearance
  'prefer-query-by-disappearance': ERROR,
  // Suggest using screen while querying
  'prefer-screen-queries': ERROR,
  // Suggest using userEvent over fireEvent for simulating user interactions
  // RW: We stan userEvent. It simulates the chains of events that browsers may
  // fire on a single interaction, allowing realistic interaction testing with
  // minimal test code.
  'prefer-user-event': ERROR,
  // Use waitFor instead of deprecated wait methods
  'prefer-wait-for': ERROR,
  // Enforce a valid naming for return value from render
  'render-result-naming-convention': ERROR,
};

const testingLibraryRules = addPrefix(prefix, rules);

export { testingLibraryPluginConfig, testingLibraryRules };
