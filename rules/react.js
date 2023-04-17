import react from 'eslint-plugin-react';
import { ERROR, OFF, addPrefix } from './shared.js';

const prefix = 'react';

const reactPluginConfig = {
  [prefix]: react,
};

const rules = {
  'boolean-prop-naming': ERROR,
  'button-has-type': ERROR,
  // RW: Using TypeScript instead of PropTypes
  'default-props-match-prop-types': OFF,
  'destructuring-assignment': [ERROR, 'always'],
  'display-name': OFF,
  'forbid-component-props': ERROR,
  'forbid-dom-props': OFF,
  'forbid-elements': OFF,
  // RW: Using TypeScript instead of PropTypes
  'forbid-foreign-prop-types': OFF,
  // RW: Using TypeScript instead of PropTypes
  'forbid-prop-types': OFF,
  'function-component-definition': [
    ERROR,
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    },
  ],
  'hook-use-state': [ERROR, { allowDestructuredState: true }],
  'iframe-missing-sandbox': ERROR,
  'jsx-boolean-value': ERROR,
  'jsx-child-element-spacing': ERROR,
  'jsx-closing-bracket-location': ERROR,
  'jsx-closing-tag-location': ERROR,
  'jsx-curly-brace-presence': [ERROR, 'never'],
  'jsx-curly-newline': [ERROR, 'consistent'],
  'jsx-curly-spacing': [ERROR, { when: 'never', children: true }],
  'jsx-equals-spacing': [ERROR, 'never'],
  // RW: .jsx extensions are required for correct Vite/EsBuild processing
  'jsx-filename-extension': [
    ERROR,
    {
      allow: 'as-needed',
      extensions: ['.jsx', '.tsx'],
    },
  ],
  'jsx-first-prop-new-line': [ERROR, 'multiline'],
  'jsx-fragments': ERROR,
  // RW: This could be useful, but needs some thoughtful configuration
  'jsx-handler-names': OFF,
  // RW: Handled by Prettier
  'jsx-indent': OFF,
  // RW: Handled by Prettier
  'jsx-indent-props': OFF,
  'jsx-key': ERROR,
  // RW: This feels like a good outside-bounds guardrail for egregiously deep code
  'jsx-max-depth': [ERROR, { max: 15 }],
  'jsx-max-props-per-line': [ERROR, { maximum: 1, when: 'multiline' }],
  'jsx-newline': OFF,
  // RW: Arrow functions are commonly used to wrap hook executions, and cannot
  // be hoisted to an outer scope. The cost of creating a new function per
  // render is likely minimal, but the cost of re-renders if the prop is passed
  // deeply could be significant. I'm going to leave this on for now, but I
  // could see turning it off if it is overly frictionful.
  'jsx-no-bind': ERROR,
  'jsx-no-comment-textnodes': ERROR,
  'jsx-no-constructed-context-values': ERROR,
  'jsx-no-duplicate-props': ERROR,
  'jsx-no-leaked-render': ERROR,
  'jsx-no-literals': OFF,
  'jsx-no-script-url': ERROR,
  // RW: This is not needed in modern browsers (Chrome ≥ 88, Edge ≥ 88, Firefox
  // ≥ 79 and Safari ≥ 12.2). See:
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md#when-to-override-it
  'jsx-no-target-blank': OFF,
  'jsx-no-undef': ERROR,
  'jsx-no-useless-fragment': ERROR,
  // RW: Allow some terseness
  'jsx-one-expression-per-line': [ERROR, { allow: 'single-child' }],
  'jsx-pascal-case': ERROR,
  'jsx-props-no-multi-spaces': ERROR,
  // RW: Prop spreading is useful (e.g., passing groups of props, overriding a
  // default set), and the issues this rule attempts to fix are mitigated by
  // TypeScript
  'jsx-props-no-spreading': OFF,
  // RW: I wish there was a `min` option for this one
  'jsx-sort-props': ERROR,
  'jsx-tag-spacing': ERROR,
  // RW: Unnecessary due to Vite JSX runtime auto-insertion
  'jsx-uses-react': OFF,
  'jsx-uses-vars': ERROR,
  'jsx-wrap-multilines': [
    ERROR,
    [
      'error',
      {
        arrow: 'parens-new-line',
        assignment: 'parens-new-line',
        condition: 'parens-new-line',
        declaration: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
        return: 'parens-new-line',
      },
    ],
  ],
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-access-state-in-setstate': OFF,
  // RW: This feels over-restrictive. Let the author decide.
  'no-adjacent-inline-elements': OFF,
  'no-array-index-key': ERROR,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-arrow-function-lifecycle': OFF,
  'no-children-prop': ERROR,
  'no-danger': ERROR,
  'no-danger-with-children': ERROR,
  'no-deprecated': ERROR,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-did-mount-set-state': OFF,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-did-update-set-state': OFF,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-direct-mutation-state': OFF,
  'no-find-dom-node': ERROR,
  'no-invalid-html-attribute': ERROR,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-is-mounted': OFF,
  'no-multi-comp': OFF,
  'no-namespace': ERROR,
  'no-object-type-as-default-prop': ERROR,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-redundant-should-component-update': OFF,
  'no-render-return-value': ERROR,
  'no-set-state': OFF,
  'no-string-refs': ERROR,
  'no-this-in-sfc': ERROR,
  'no-typos': ERROR,
  // RW: What a great rule. I've seen/caused this a couple times.
  'no-unescaped-entities': ERROR,
  'no-unknown-property': ERROR,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-unsafe': OFF,
  'no-unstable-nested-components': ERROR,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-unused-class-component-methods': OFF,
  // RW: Using TypeScript instead of PropTypes
  'no-unused-prop-types': OFF,
  'no-unused-state': ERROR,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'no-will-update-set-state': OFF,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'prefer-es6-class': OFF,
  // RW: Using TypeScript instead of PropTypes
  'prefer-exact-props': OFF,
  // RW: Using TypeScript instead of PropTypes
  'prefer-read-only-props': OFF,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'prefer-stateless-function': OFF,
  // RW: Using TypeScript instead of PropTypes
  'prop-types': OFF,
  // RW: Unnecessary due to Vite JSX runtime auto-insertion
  'react-in-jsx-scope': OFF,
  // RW: Using TypeScript instead of PropTypes
  'require-default-props': OFF,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'require-optimization': OFF,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'require-render-return': OFF,
  'self-closing-comp': ERROR,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'sort-comp': OFF,
  // RW: Using TypeScript instead of PropTypes
  'sort-default-props': OFF,
  // RW: Using TypeScript instead of PropTypes
  'sort-prop-types': OFF,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'state-in-constructor': OFF,
  // RW: Unnecessary class component rule (react-prefer-function-component)
  'static-property-placement': OFF,
  'style-prop-object': ERROR,
  'void-dom-elements-no-children': ERROR,
};

const reactRules = addPrefix(prefix, rules);

const reactSettings = {
  react: { version: 'detect' },
};

export { reactRules, reactPluginConfig, reactSettings };
