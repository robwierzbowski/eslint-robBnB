import react from 'eslint-plugin-react';
import { ERROR, OFF, addPrefix } from '../utils/index.js';

const prefix = 'react';

const reactPluginConfig = {
  [prefix]: react,
};

const rules = {
  'boolean-prop-naming': ERROR,
  'button-has-type': ERROR,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'default-props-match-prop-types': OFF,
  'destructuring-assignment': [ERROR, 'always'],
  'display-name': OFF,
  'forbid-component-props': ERROR,
  'forbid-dom-props': OFF,
  'forbid-elements': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'forbid-foreign-prop-types': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
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
  // .jsx extensions are required for correct Vite/EsBuild processing
  'jsx-filename-extension': [
    ERROR,
    {
      allow: 'as-needed',
      extensions: ['.jsx', '.tsx'],
    },
  ],
  'jsx-first-prop-new-line': [ERROR, 'multiline'],
  'jsx-fragments': ERROR,
  // This could be useful, but needs some thoughtful configuration
  'jsx-handler-names': OFF,
  // Unnecessary, handled by Prettier
  'jsx-indent': OFF,
  // Unnecessary, handled by Prettier
  'jsx-indent-props': OFF,
  'jsx-key': ERROR,
  // This feels like a good guardrail for egregiously deep code
  'jsx-max-depth': [ERROR, { max: 15 }],
  'jsx-max-props-per-line': [ERROR, { maximum: 1, when: 'multiline' }],
  'jsx-newline': OFF,
  // Arrow functions are commonly used for hook bodies, and cannot be hoisted to
  // an outer scope. The cost of creating a new function per render is likely
  // minimal, but the cost of re-renders if the prop is passed deeply could be
  // significant. I'm going to leave this on for now, but I could see turning it
  // off if it causes too much friction.
  'jsx-no-bind': ERROR,
  'jsx-no-comment-textnodes': ERROR,
  'jsx-no-constructed-context-values': ERROR,
  'jsx-no-duplicate-props': ERROR,
  'jsx-no-leaked-render': ERROR,
  'jsx-no-literals': OFF,
  'jsx-no-script-url': ERROR,
  // Unnecessary in modern browsers (Chrome ≥ 88, Edge ≥ 88, Firefox ≥ 79 and
  // Safari ≥ 12.2). Reference:
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md#when-to-override-it
  'jsx-no-target-blank': OFF,
  'jsx-no-undef': ERROR,
  'jsx-no-useless-fragment': ERROR,
  // Allow single child; some terseness improves readability
  'jsx-one-expression-per-line': [ERROR, { allow: 'single-child' }],
  'jsx-pascal-case': ERROR,
  'jsx-props-no-multi-spaces': ERROR,
  // Prop spreading is useful (e.g., passing groups of props, overriding a
  // default set), and the issues this rule attempts to prevent are mitigated by
  // TypeScript
  'jsx-props-no-spreading': OFF,
  // I wish there was a `min` option for this one
  'jsx-sort-props': ERROR,
  'jsx-tag-spacing': ERROR,
  // Unnecessary, JSX runtime is automatically inserted in Vite applications
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
  // Unnecessary, class components are forbidden
  'no-access-state-in-setstate': OFF,
  // Overly restrictive; let the author decide
  'no-adjacent-inline-elements': OFF,
  'no-array-index-key': ERROR,
  // Unnecessary, class components are forbidden
  'no-arrow-function-lifecycle': OFF,
  'no-children-prop': ERROR,
  'no-danger': ERROR,
  'no-danger-with-children': ERROR,
  'no-deprecated': ERROR,
  // Unnecessary, class components are forbidden
  'no-did-mount-set-state': OFF,
  // Unnecessary, class components are forbidden
  'no-did-update-set-state': OFF,
  // Unnecessary, class components are forbidden
  'no-direct-mutation-state': OFF,
  'no-find-dom-node': ERROR,
  'no-invalid-html-attribute': ERROR,
  // Unnecessary, class components are forbidden
  'no-is-mounted': OFF,
  'no-multi-comp': OFF,
  'no-namespace': ERROR,
  'no-object-type-as-default-prop': ERROR,
  // Unnecessary, class components are forbidden
  'no-redundant-should-component-update': OFF,
  'no-render-return-value': ERROR,
  'no-set-state': OFF,
  'no-string-refs': ERROR,
  'no-this-in-sfc': ERROR,
  'no-typos': ERROR,
  // What a great rule. I've seen/caused this a couple times.
  'no-unescaped-entities': ERROR,
  'no-unknown-property': ERROR,
  // Unnecessary, class components are forbidden
  'no-unsafe': OFF,
  'no-unstable-nested-components': ERROR,
  // Unnecessary, class components are forbidden
  'no-unused-class-component-methods': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'no-unused-prop-types': OFF,
  'no-unused-state': ERROR,
  // Unnecessary, class components are forbidden
  'no-will-update-set-state': OFF,
  // Unnecessary, class components are forbidden
  'prefer-es6-class': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'prefer-exact-props': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'prefer-read-only-props': OFF,
  // Unnecessary, class components are forbidden
  'prefer-stateless-function': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'prop-types': OFF,
  // Unnecessary due to Vite JSX runtime auto-insertion
  'react-in-jsx-scope': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'require-default-props': OFF,
  // Unnecessary, class components are forbidden
  'require-optimization': OFF,
  // Unnecessary, class components are forbidden
  'require-render-return': OFF,
  'self-closing-comp': ERROR,
  // Unnecessary, class components are forbidden
  'sort-comp': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'sort-default-props': OFF,
  // Unnecessary, PropTypes are not used in TypeScript applications
  'sort-prop-types': OFF,
  // Unnecessary, class components are forbidden
  'state-in-constructor': OFF,
  // Unnecessary, class components are forbidden
  'static-property-placement': OFF,
  'style-prop-object': ERROR,
  'void-dom-elements-no-children': ERROR,
};

const reactRules = addPrefix(prefix, rules);

const reactSettings = {
  react: { version: 'detect' },
};

export { reactRules, reactPluginConfig, reactSettings };
