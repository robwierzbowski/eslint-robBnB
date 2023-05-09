import confusingBrowserGlobals from 'confusing-browser-globals';
import { ERROR, OFF, WARN } from '../utils/index.js';

// These rules relate to possible logic errors in code
// https://eslint.org/docs/latest/rules#possible-problems
const possibleProblems = {
  'array-callback-return': [ERROR, { checkForEach: true }],
  'constructor-super': ERROR,
  'for-direction': ERROR,
  'getter-return': ERROR,
  'no-async-promise-executor': ERROR,
  'no-await-in-loop': ERROR,
  'no-class-assign': ERROR,
  'no-compare-neg-zero': ERROR,
  'no-cond-assign': ERROR,
  'no-const-assign': ERROR,
  'no-constant-binary-expression': ERROR,
  'no-constant-condition': ERROR,
  'no-constructor-return': ERROR,
  'no-control-regex': ERROR,
  'no-debugger': ERROR,
  'no-dupe-args': ERROR,
  'no-dupe-class-members': ERROR,
  'no-dupe-else-if': ERROR,
  'no-dupe-keys': ERROR,
  // Unnecessary due to no-labels
  'no-duplicate-case': OFF,
  'no-duplicate-imports': ERROR,
  'no-empty-character-class': ERROR,
  'no-empty-pattern': ERROR,
  'no-ex-assign': ERROR,
  'no-fallthrough': [ERROR, { allowEmptyCase: true }],
  'no-func-assign': ERROR,
  'no-import-assign': ERROR,
  // Unnecessary because we forbid the function keyword
  'no-inner-declarations': OFF,
  'no-invalid-regexp': ERROR,
  'no-irregular-whitespace': ERROR,
  'no-loss-of-precision': ERROR,
  'no-misleading-character-class': ERROR,
  'no-new-native-nonconstructor': ERROR,
  'no-new-symbol': ERROR,
  'no-obj-calls': ERROR,
  'no-promise-executor-return': ERROR,
  'no-prototype-builtins': ERROR,
  'no-self-assign': ERROR,
  'no-self-compare': ERROR,
  'no-setter-return': ERROR,
  'no-sparse-arrays': ERROR,
  'no-template-curly-in-string': ERROR,
  'no-this-before-super': ERROR,
  'no-undef': ERROR,
  'no-unexpected-multiline': ERROR,
  'no-unmodified-loop-condition': ERROR,
  'no-unreachable': ERROR,
  'no-unreachable-loop': ERROR,
  'no-unsafe-finally': ERROR,
  'no-unsafe-negation': ERROR,
  'no-unsafe-optional-chaining': ERROR,
  'no-unused-private-class-members': ERROR,
  'no-unused-vars': ERROR,
  'no-use-before-define': ERROR,
  'no-useless-backreference': ERROR,
  'require-atomic-updates': ERROR,
  'use-isnan': ERROR,
  'valid-typeof': ERROR,
};

// These rules suggest alternate ways of doing things
// https://eslint.org/docs/latest/rules/#suggestions
const suggestions = {
  'accessor-pairs': OFF,
  'arrow-body-style': [ERROR, 'as-needed'],
  'block-scoped-var': ERROR,
  camelcase: ERROR,
  'capitalized-comments': OFF,
  'class-methods-use-this': ERROR,
  // Trying this with a limit of 15 instead of the default 20. If you go to 15,
  // there's probably a better way to organize your code.
  complexity: [WARN, 15],
  'consistent-return': ERROR,
  'consistent-this': ERROR,
  curly: [ERROR, 'multi'],
  'default-case': ERROR,
  'default-case-last': ERROR,
  'default-param-last': ERROR,
  'dot-notation': ERROR,
  eqeqeq: ERROR,
  // Unnecessary because we forbid the function keyword
  'func-name-matching': ERROR,
  'func-names': [ERROR, 'as-needed'],
  'func-style': [ERROR, 'expression'],
  'grouped-accessor-pairs': ERROR,
  'guard-for-in': ERROR,
  'id-denylist': OFF,
  // prevent people from using i, e, j, and other non-descriptive variable names
  'id-length': [ERROR, { min: 2, max: Infinity }],
  'id-match': OFF,
  'init-declarations': OFF,
  'logical-assignment-operators': OFF,
  'max-classes-per-file': OFF,
  'max-depth': [WARN, 4],
  'max-lines': OFF,
  'max-lines-per-function': OFF,
  // Ideally these patterns would be rewritten with async/await
  'max-nested-callbacks': [WARN, 5],
  // If more than 4, an object param will be more maintainable
  'max-params': [ERROR, 3],
  'max-statements': OFF,
  'multiline-comment-style': OFF,
  'new-cap': ERROR,
  'no-alert': ERROR,
  'no-array-constructor': ERROR,
  // Bitwise operators are too clever for common use cases
  'no-bitwise': ERROR,
  'no-caller': ERROR,
  'no-case-declarations': ERROR,
  // This confusion is resolved by editor syntax highlighting
  'no-confusing-arrow': OFF,
  'no-console': WARN,
  'no-continue': ERROR,
  'no-delete-var': ERROR,
  'no-div-regex': ERROR,
  // The elsif option allows for more parallel code patterns
  'no-else-return': [ERROR, { allowElseIf: true }],
  'no-empty': ERROR,
  // It's common to create no-op arrow functions in test mock code
  'no-empty-function': OFF,
  'no-empty-static-block': ERROR,
  'no-eq-null': ERROR,
  'no-eval': ERROR,
  'no-extend-native': ERROR,
  'no-extra-bind': ERROR,
  // Making this an error forces the author to understand how casting works in a
  // conditional block
  'no-extra-boolean-cast': ERROR,
  // Unnecessary due to no-labels
  'no-extra-label': OFF,
  'no-extra-semi': ERROR,
  'no-floating-decimal': ERROR,
  // We might need to allow this in test environments
  'no-global-assign': ERROR,
  'no-implicit-coercion': [
    ERROR,
    {
      // The !! conversion is widely understood/idiomatic at this point, but the
      // others are less prevalent and should be avoided for readability
      boolean: false,
      disallowTemplateShorthand: true,
      number: true,
      string: true,
    },
  ],
  'no-implicit-globals': ERROR,
  'no-implied-eval': ERROR,
  'no-inline-comments': OFF,
  'no-invalid-this': ERROR,
  'no-iterator': ERROR,
  // Unnecessary due to no-labels
  'no-label-var': OFF,
  // This makes other label rules unnecessary
  'no-labels': ERROR,
  'no-lone-blocks': ERROR,
  'no-lonely-if': ERROR,
  'no-loop-func': ERROR,
  // This could be useful, but currently I think "magic numbers" can have clear
  // meaning in context, and adding descriptive vars could increase the
  // perceived complexity of the code
  'no-magic-numbers': OFF,
  'no-mixed-operators': ERROR,
  'no-multi-assign': ERROR,
  // This is often used in node scripts, and is relatively understandable at a
  // glance
  'no-multi-str': OFF,
  // Although this rule aligns with my philosophy, it could add too much
  // friction in a larger organization
  'no-negated-condition': OFF,
  'no-nested-ternary': ERROR,
  'no-new': ERROR,
  'no-new-func': ERROR,
  // There are more idiomatic ways to create instances in JavaScript (e.g.,
  // factory functions)
  'no-new-object': ERROR,
  'no-new-wrappers': ERROR,
  'no-nonoctal-decimal-escape': ERROR,
  // Reasons to manually manage octals are rare
  'no-octal': ERROR,
  'no-octal-escape': ERROR,
  'no-param-reassign': ERROR,
  'no-plusplus': OFF,
  'no-proto': ERROR,
  // Unnecessary due to no-var
  'no-redeclare': OFF,
  'no-regex-spaces': ERROR,
  // AirBnB has some good restrictions:
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js#L65-L70
  'no-restricted-exports': [
    ERROR,
    {
      restrictedNamedExports: [
        // Use `export default` to provide a default export
        'default',
        // This will break most node ESM versions when the module is imported
        // with a dynamic `import()`
        'then',
      ],
    },
  ],
  // AirBnB has some good restrictions:
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js#L18-L31
  'no-restricted-globals': [
    ERROR,
    {
      name: 'isFinite',
      message:
        'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
    },
    {
      name: 'isNaN',
      message:
        'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
    },
    // confusingBrowserGlobals provides window keys that should be called off
    // the window object in order to improve code clarity
    ...confusingBrowserGlobals,
  ],
  'no-restricted-imports': OFF,
  // AirBnB has some good restrictions:
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js#L259-L297
  'no-restricted-properties': [
    ERROR,
    {
      object: 'arguments',
      property: 'callee',
      message: 'arguments.callee is deprecated',
    },
    {
      object: 'global',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'self',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'window',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'global',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      object: 'self',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      object: 'window',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      property: '__defineGetter__',
      message: 'Please use Object.defineProperty instead.',
    },
    {
      property: '__defineSetter__',
      message: 'Please use Object.defineProperty instead.',
    },
    {
      object: 'Math',
      property: 'pow',
      message: 'Use the exponentiation operator (**) instead.',
    },
  ],
  // AirBnB has some good restrictions, but we should allow for-of in modern JS
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L340-L358
  'no-restricted-syntax': [
    ERROR,
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is almost never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
    {
      selector: 'LabeledStatement',
      message:
        'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message:
        '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    },
  ],
  'no-return-assign': ERROR,
  // This improves performance at the cost of stack trace completeness. IMO
  // there are ways of debugging outside of a full stack trace, and this rule
  // has acceptable ROI.
  'no-return-await': ERROR,
  'no-script-url': ERROR,
  'no-sequences': ERROR,
  'no-shadow': ERROR,
  'no-shadow-restricted-names': ERROR,
  'no-ternary': OFF,
  'no-throw-literal': ERROR,
  'no-undef-init': ERROR,
  'no-undefined': ERROR,
  // This may be opinionated, but 99% of time there's a better way to
  // communicate private or unused vars. We should either organize code so the
  // var is actually private, or use a descriptive name.
  'no-underscore-dangle': ERROR,
  'no-unneeded-ternary': ERROR,
  'no-unused-expressions': ERROR,
  // Unnecessary due to no-labels
  'no-unused-labels': OFF,
  'no-useless-call': ERROR,
  'no-useless-catch': ERROR,
  'no-useless-computed-key': ERROR,
  'no-useless-concat': ERROR,
  'no-useless-constructor': ERROR,
  'no-useless-escape': ERROR,
  'no-useless-rename': ERROR,
  'no-useless-return': ERROR,
  'no-var': ERROR,
  'no-void': ERROR,
  'no-warning-comments': OFF,
  'no-with': ERROR,
  'object-shorthand': ERROR,
  'one-var': [ERROR, 'never'],
  // Unnecessary due to one-var
  'one-var-declaration-per-line': OFF,
  'operator-assignment': ERROR,
  // Unnecessary due to prefer-arrow plugin
  'prefer-arrow-callback': OFF,
  'prefer-const': ERROR,
  // Strict, but enforces maximum consistency
  'prefer-destructuring': [
    ERROR,
    {
      array: true,
      object: true,
    },
    { enforceForRenamedProperties: false },
  ],
  'prefer-exponentiation-operator': ERROR,
  'prefer-named-capture-group': OFF,
  'prefer-numeric-literals': OFF,
  'prefer-object-has-own': ERROR,
  'prefer-object-spread': ERROR,
  'prefer-promise-reject-errors': ERROR,
  'prefer-regex-literals': ERROR,
  // Another banger of a rule. Removes some magic from the language.
  'prefer-rest-params': ERROR,
  'prefer-spread': ERROR,
  'prefer-template': ERROR,
  'quote-props': [ERROR, 'as-needed'],
  // Unnecessary due to no-octals
  radix: OFF,
  'require-await': ERROR,
  // Although strict, it's autofixable. Let's try it out.
  'require-unicode-regexp': ERROR,
  'require-yield': ERROR,
  // Unnecessary because of the more configurable import plugin
  'sort-imports': OFF,
  'sort-keys': [
    ERROR,
    'asc',
    {
      allowLineSeparatedGroups: false,
      caseSensitive: true,
      minKeys: 4,
      natural: false,
    },
  ],
  // Unnecessary due to one-var
  'sort-vars': OFF,
  // Allow special `///` TypeScript comments
  'spaced-comment': [ERROR, 'always', { markers: ['/'] }],
  // Strict mode is enforced by default for sourceType: module
  strict: OFF,
  'symbol-description': OFF,
  'vars-on-top': ERROR,
  yoda: ERROR,
};

// These rules care about how the code looks rather than how it executes
// https://eslint.org/docs/latest/rules/#layout--formatting
const layoutAndFormatting = {
  // Unnecessary, handled by Prettier
  'array-bracket-newline': OFF,
  'array-bracket-spacing': [ERROR, 'never'],
  // Unnecessary, handled by Prettier
  'array-element-newline': OFF,
  'arrow-parens': [ERROR, 'as-needed'],
  'arrow-spacing': ERROR,
  'block-spacing': [ERROR, 'always'],
  'brace-style': [ERROR, '1tbs'],
  'comma-dangle': [ERROR, 'always-multiline'],
  'comma-spacing': ERROR,
  'comma-style': ERROR,
  'computed-property-spacing': ERROR,
  'dot-location': [ERROR, 'property'],
  'eol-last': ERROR,
  'func-call-spacing': ERROR,
  'function-call-argument-newline': [ERROR, 'consistent'],
  // Unnecessary, handled by Prettier
  'function-paren-newline': OFF,
  'generator-star-spacing': ERROR,
  'implicit-arrow-linebreak': ERROR,
  indent: [ERROR, { indent: ['error', 2] }],
  'jsx-quotes': ERROR,
  'key-spacing': ERROR,
  'keyword-spacing': ERROR,
  'line-comment-position': OFF,
  'linebreak-style': ERROR,
  'lines-around-comment': ERROR,
  // Allow for compact code in simple classes
  'lines-between-class-members': [
    ERROR,
    'always',
    { exceptAfterSingleLine: true },
  ],
  // Match prettier's preferred 80 character limit
  'max-len': [
    ERROR,
    {
      code: 80,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
    },
  ],
  // Could be overly restrictive, but let's try max 2 (to allow for `if (x)
  // return;` guards)
  'max-statements-per-line': [ERROR, { max: 2 }],
  // Unnecessary, handled by Prettier
  'multiline-ternary': OFF,
  'new-parens': ERROR,
  'newline-per-chained-call': [ERROR, { ignoreChainWithDepth: 3 }],
  'no-extra-parens': ERROR,
  'no-mixed-spaces-and-tabs': ERROR,
  // Disallow precious manual aligning of comments or code
  'no-multi-spaces': ERROR,
  // As above, no precious spacing
  'no-multiple-empty-lines': [ERROR, { max: 1 }],
  'no-tabs': ERROR,
  'no-trailing-spaces': ERROR,
  'no-whitespace-before-property': ERROR,
  'nonblock-statement-body-position': ERROR,
  // Unnecessary, handled by Prettier
  'object-curly-newline': OFF,
  'object-curly-spacing': [ERROR, 'always'],
  'object-property-newline': ERROR,
  'operator-linebreak': [ERROR, 'after'],
  'padded-blocks': [ERROR, 'never'],
  'padding-line-between-statements': [
    ERROR,
    { blankLine: 'always', prev: ['cjs-import', 'import'], next: '*' },
    {
      blankLine: 'any',
      prev: ['cjs-import', 'import'],
      next: ['cjs-import', 'import'],
    },

    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
    {
      blankLine: 'any',
      prev: ['const', 'let', 'var'],
      next: ['const', 'let', 'var'],
    },

    { blankLine: 'always', prev: 'class', next: '*' },

    { blankLine: 'always', prev: '*', next: 'debugger' },
    { blankLine: 'always', prev: 'debugger', next: '*' },

    { blankLine: 'always', prev: 'directive', next: '*' },
    { blankLine: 'never', prev: 'directive', next: 'directive' },

    { blankLine: 'always', prev: 'for', next: '*' },

    { blankLine: 'always', prev: 'function', next: '*' },
    { blankLine: 'any', prev: 'function', next: 'function' },

    { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
    { blankLine: 'always', prev: 'multiline-expression', next: '*' },

    { blankLine: 'always', prev: '*', next: ['cjs-export', 'export'] },
    {
      blankLine: 'any',
      prev: ['cjs-export', 'export'],
      next: ['cjs-export', 'export'],
    },

    { blankLine: 'always', prev: '*', next: 'return' },

    { blankLine: 'always', prev: 'switch', next: '*' },
    { blankLine: 'always', prev: 'while', next: '*' },
  ],
  // Unnecessary, handled by Prettier
  quotes: [ERROR, 'single'],
  'rest-spread-spacing': ERROR,
  semi: ERROR,
  'semi-spacing': ERROR,
  'semi-style': ERROR,
  'space-before-blocks': [ERROR, 'always'],
  'space-before-function-paren': [ERROR, 'never'],
  'space-in-parens': ERROR,
  'space-infix-ops': ERROR,
  'space-unary-ops': [ERROR, { words: true, nonwords: false }],
  'switch-colon-spacing': ERROR,
  'template-curly-spacing': ERROR,
  'template-tag-spacing': ERROR,
  'unicode-bom': OFF,
  'wrap-iife': [ERROR, 'outside'],
  'wrap-regex': OFF,
  'yield-star-spacing': ERROR,
};

const coreRules = {
  ...possibleProblems,
  ...suggestions,
  ...layoutAndFormatting,
};

export { coreRules };
