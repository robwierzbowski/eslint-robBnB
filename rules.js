import confusingBrowserGlobals from 'confusing-browser-globals';

const ERROR = 'error';
const OFF = 'off';
const WARN = 'warn';

// Used for any rule that can force multiline at a certain number of
const newlineOption = { minItems: 4 };

// These rules relate to possible logic errors in code
// https://eslint.org/docs/latest/rules#possible-problems
const possibleProblems = {
  // Enforce return statements in callbacks of array methods
  'array-callback-return': [ERROR, { checkForEach: true }],

  // Require `super()` calls in constructors
  'constructor-super': ERROR,

  // Enforce "for" loop update clause moving the counter in the right direction
  'for-direction': ERROR,

  // Enforce `return` statements in getters
  'getter-return': ERROR,

  // Disallow using an async function as a Promise executor
  'no-async-promise-executor': ERROR,

  // Disallow `await` inside of loops
  'no-await-in-loop': ERROR,

  // Disallow reassigning class members
  'no-class-assign': ERROR,

  // Disallow comparing against -0
  'no-compare-neg-zero': ERROR,

  // Disallow assignment operators in conditional expressions
  'no-cond-assign': ERROR,

  // Disallow reassigning `const` variables
  'no-const-assign': ERROR,

  // Disallow expressions where the operation doesn't affect the value
  'no-constant-binary-expression': ERROR,

  // Disallow constant expressions in conditions
  'no-constant-condition': ERROR,

  // Disallow returning value from constructor
  'no-constructor-return': ERROR,

  // Disallow control characters in regular expressions
  'no-control-regex': ERROR,

  // Disallow the use of `debugger`
  'no-debugger': ERROR,

  // Disallow duplicate arguments in `function` definitions
  'no-dupe-args': ERROR,

  // Disallow duplicate class members
  'no-dupe-class-members': ERROR,

  // Disallow duplicate conditions in if-else-if chains
  'no-dupe-else-if': ERROR,

  // Disallow duplicate keys in object literals
  'no-dupe-keys': ERROR,

  // Disallow duplicate case labels
  // RW: Unnecessary due to no-labels
  'no-duplicate-case': OFF,

  // Disallow duplicate module imports
  'no-duplicate-imports': ERROR,

  // Disallow empty character classes in regular expressions
  'no-empty-character-class': ERROR,

  // Disallow empty destructuring patterns
  'no-empty-pattern': ERROR,

  // Disallow reassigning exceptions in `catch` clauses
  'no-ex-assign': ERROR,

  // Disallow fallthrough of `case` statements
  'no-fallthrough': [ERROR, { allowEmptyCase: true }],

  // Disallow reassigning `function` declarations
  'no-func-assign': ERROR,

  // Disallow assigning to imported bindings
  'no-import-assign': ERROR,

  // Disallow variable or `function` declarations in nested blocks
  // RW: Note, this is only for functions, although the description mentions
  // variables
  'no-inner-declarations': ERROR,

  // Disallow invalid regular expression strings in `RegExp` constructors
  'no-invalid-regexp': ERROR,

  // Disallow irregular whitespace
  'no-irregular-whitespace': ERROR,

  // Disallow literal numbers that lose precision
  'no-loss-of-precision': ERROR,

  // Disallow characters which are made with multiple code points in character class syntax
  'no-misleading-character-class': ERROR,

  // Disallow `new` operators with global non-constructor functions
  'no-new-native-nonconstructor': ERROR,

  // Disallow `new` operators with the `Symbol` object
  'no-new-symbol': ERROR,

  // Disallow calling global object properties as functions
  'no-obj-calls': ERROR,

  // Disallow returning values from Promise executor functions
  'no-promise-executor-return': ERROR,

  // Disallow calling some `Object.prototype` methods directly on objects
  'no-prototype-builtins': ERROR,

  // Disallow assignments where both sides are exactly the same
  'no-self-assign': ERROR,

  // Disallow comparisons where both sides are exactly the same
  'no-self-compare': ERROR,

  // Disallow returning values from setters
  'no-setter-return': ERROR,

  // Disallow sparse arrays
  'no-sparse-arrays': ERROR,

  // Disallow template literal placeholder syntax in regular strings
  'no-template-curly-in-string': ERROR,

  // Disallow `this`/`super` before calling `super()` in constructors
  'no-this-before-super': ERROR,

  // Disallow the use of undeclared variables unless mentioned in `/*global */` comments
  'no-undef': ERROR,

  // Disallow confusing multiline expressions
  'no-unexpected-multiline': ERROR,

  // Disallow unmodified loop conditions
  'no-unmodified-loop-condition': ERROR,

  // Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements
  'no-unreachable': ERROR,

  // Disallow loops with a body that allows only one iteration
  'no-unreachable-loop': ERROR,

  // Disallow control flow statements in `finally` blocks
  'no-unsafe-finally': ERROR,

  // Disallow negating the left operand of relational operators
  'no-unsafe-negation': ERROR,

  // Disallow use of optional chaining in contexts where the `undefined` value is not allowed
  'no-unsafe-optional-chaining': ERROR,

  // Disallow unused private class members
  'no-unused-private-class-members': ERROR,

  // Disallow unused variables
  'no-unused-vars': ERROR,

  // Disallow the use of variables before they are defined
  'no-use-before-define': ERROR,

  // Disallow useless backreferences in regular expressions
  'no-useless-backreference': ERROR,

  // Disallow assignments that can lead to race conditions due to usage of `await` or `yield`
  'require-atomic-updates': ERROR,

  // Require calls to `isNaN()` when checking for `NaN`
  'use-isnan': ERROR,

  // Enforce comparing `typeof` expressions against valid strings
  'valid-typeof': ERROR,
};

// These rules suggest alternate ways of doing things
// https://eslint.org/docs/latest/rules/#suggestions
const suggestions = {
  // Enforce getter and setter pairs in objects and classes
  'accessor-pairs': OFF,

  // Require braces around arrow function bodies
  'arrow-body-style': [ERROR, 'as-needed'],

  // Enforce the use of variables within the scope they are defined
  'block-scoped-var': ERROR,

  // Enforce camelcase naming convention
  camelcase: ERROR,

  // Enforce or disallow capitalization of the first letter of a comment
  'capitalized-comments': OFF,

  // Enforce that class methods utilize `this`
  'class-methods-use-this': ERROR,

  // Enforce a maximum cyclomatic complexity allowed in a program
  // RW: Trying this with 15 instead of the default 20. If you go to 15, there's
  // probably a better way to organize your code.
  complexity: [WARN, 15],

  // Require `return` statements to either always or never specify values
  'consistent-return': ERROR,

  // Enforce consistent naming when capturing the current execution context
  'consistent-this': ERROR,

  // Enforce consistent brace style for all control statements
  curly: [ERROR, 'multi'],

  // Require `default` cases in `switch` statements
  'default-case': ERROR,

  // Enforce default clauses in switch statements to be last
  'default-case-last': ERROR,

  // Enforce default parameters to be last
  'default-param-last': ERROR,

  // Enforce dot notation whenever possible
  'dot-notation': ERROR,

  // Require the use of `===` and `!==`
  eqeqeq: ERROR,

  // Require function names to match the name of the variable or property to which they are assigned
  // RW: This doesn't need to be set because I'm going to forbid the function keyword
  'func-name-matching': ERROR,

  // Require or disallow named `function` expressions
  'func-names': [ERROR, 'as-needed'],

  // Enforce the consistent use of either `function` declarations or expressions
  'func-style': [ERROR, 'expression'],

  // Require grouped accessor pairs in object literals and classes
  'grouped-accessor-pairs': ERROR,

  // Require `for-in` loops to include an `if` statement
  // RW: unnecessary due to no-restricted-syntax
  'guard-for-in': ERROR,

  // Disallow specified identifiers
  'id-denylist': OFF,

  // Enforce minimum and maximum identifier lengths
  // RW: prevent people from using i, e, j, and other non-descriptive var
  // names
  'id-length': [ERROR, { min: 2, max: Infinity }],

  // Require identifiers to match a specified regular expression
  'id-match': OFF,

  // Require or disallow initialization in variable declarations
  'init-declarations': OFF,

  // Require or disallow logical assignment logical operator shorthand
  'logical-assignment-operators': OFF,

  // Enforce a maximum number of classes per file
  'max-classes-per-file': OFF,

  // Enforce a maximum depth that blocks can be nested
  'max-depth': [WARN, 4],

  // Enforce a maximum number of lines per file
  'max-lines': OFF,

  // Enforce a maximum number of lines of code in a function
  'max-lines-per-function': OFF,

  // Enforce a maximum depth that callbacks can be nested
  // RW: Use async/await if ya gotta go crazy like that
  'max-nested-callbacks': [WARN, 5],

  // Enforce a maximum number of parameters in function definitions
  // RW: If you're more than 4, move to an object param
  'max-params': [ERROR, 3],

  // Enforce a maximum number of statements allowed in function blocks
  'max-statements': OFF,

  // Enforce a particular style for multiline comments
  // RW: But this could be a good one....
  'multiline-comment-style': OFF,

  // Require constructor names to begin with a capital letter
  'new-cap': ERROR,

  // Disallow the use of `alert`, `confirm`, and `prompt`
  'no-alert': ERROR,

  // Disallow `Array` constructors
  'no-array-constructor': ERROR,

  // Disallow bitwise operators
  // RW: It's too clever — survey 10 engineers on whether they understand them
  // at a glance
  'no-bitwise': ERROR,

  // Disallow the use of `arguments.caller` or `arguments.callee`
  'no-caller': ERROR,

  // Disallow lexical declarations in case clauses
  'no-case-declarations': ERROR,

  // Disallow arrow functions where they could be confused with comparisons
  // RW: This confusion should be resolved via syntax highlighting
  'no-confusing-arrow': OFF,

  // Disallow the use of `console`
  'no-console': WARN,

  // Disallow `continue` statements
  'no-continue': ERROR,

  // Disallow deleting variables
  'no-delete-var': ERROR,

  // Disallow division operators explicitly at the beginning of regular expressions
  'no-div-regex': ERROR,

  // Disallow `else` blocks after `return` statements in `if` statements
  // RW: The elsif option allows for more parallel code patterns
  'no-else-return': [ERROR, { allowElseIf: true }],

  // Disallow empty block statements
  'no-empty': ERROR,

  // Disallow empty functions
  // RW: It's relatively common to create no-op arrow functions in test cases
  'no-empty-function': OFF,

  // Disallow empty static blocks
  'no-empty-static-block': ERROR,

  // Disallow `null` comparisons without type-checking operators
  'no-eq-null': ERROR,

  // Disallow the use of `eval()`
  'no-eval': ERROR,

  // Disallow extending native types
  'no-extend-native': ERROR,

  // Disallow unnecessary calls to `.bind()`
  'no-extra-bind': ERROR,

  // Disallow unnecessary boolean casts
  // RW: Making this an error forces the author to understand casting in a
  // conditional block
  'no-extra-boolean-cast': ERROR,

  // Disallow unnecessary labels
  // RW: Unnecessary due to no-labels
  'no-extra-label': OFF,

  // Disallow unnecessary semicolons
  'no-extra-semi': ERROR,

  // Disallow leading or trailing decimal points in numeric literals
  'no-floating-decimal': ERROR,

  // Disallow assignments to native objects or read-only global variables
  // TODO: We'll probably need to alter this to allow it in test environments
  'no-global-assign': ERROR,

  // Disallow shorthand type conversions
  'no-implicit-coercion': [
    ERROR,
    {
      // RW: The !! conversion is widely understood/idiomatic at this point, but
      // the others are less obvious
      boolean: false,
      disallowTemplateShorthand: true,
      number: true,
      string: true,
    },
  ],

  // Disallow declarations in the global scope
  'no-implicit-globals': ERROR,

  // Disallow the use of `eval()`-like methods
  'no-implied-eval': ERROR,

  // Disallow inline comments after code
  'no-inline-comments': OFF,

  // Disallow use of `this` in contexts where the value of `this` is `undefined`
  'no-invalid-this': ERROR,

  // Disallow the use of the `__iterator__` property
  'no-iterator': ERROR,

  // Disallow labels that share a name with a variable
  // RW: Unnecessary due to no-labels
  'no-label-var': OFF,

  // Disallow labeled statements
  // RW: This renders other label rules unnecessary
  'no-labels': ERROR,

  // Disallow unnecessary nested blocks
  'no-lone-blocks': ERROR,

  // Disallow `if` statements as the only statement in `else` blocks
  'no-lonely-if': ERROR,

  // Disallow function declarations that contain unsafe references inside loop statements
  'no-loop-func': ERROR,

  // Disallow magic numbers
  // RW: I'm on the fence about this. Sometimes the "magic number" has clear
  // meaning from context, and adding descriptive vars could increase the
  // experienced complexity of the code. But without trying it we don't know if
  // the overall effect will be positive.
  'no-magic-numbers': OFF,

  // Disallow mixed binary operators
  'no-mixed-operators': ERROR,

  // Disallow use of chained assignment expressions
  'no-multi-assign': ERROR,

  // Disallow multiline strings
  // RW: This is often used in node scripts, and is relatively understandable at
  // a glance
  'no-multi-str': OFF,

  // Disallow negated conditions
  // RW: WOW! I'm surprised this rule exists, and it aligns with my philosophy.
  // But, it might add more friction than benefit in a larger organization.
  'no-negated-condition': OFF,

  // Disallow nested ternary expressions
  // RW: Even tho I personally love a chained ternary
  'no-nested-ternary': ERROR,

  // Disallow `new` operators outside of assignments or comparisons
  'no-new': ERROR,

  // Disallow `new` operators with the `Function` object
  'no-new-func': ERROR,

  // Disallow `Object` constructors
  // RW: This ain't an OO language people
  'no-new-object': ERROR,

  // Disallow `new` operators with the `String`, `Number`, and `Boolean` objects
  'no-new-wrappers': ERROR,

  // Disallow `\8` and `\9` escape sequences in string literals
  'no-nonoctal-decimal-escape': ERROR,

  // Disallow octal literals
  // RW: Although there are reasons to manually manage octals, they're rare and
  // a leading aero is most likely a mistake
  'no-octal': ERROR,

  // Disallow octal escape sequences in string literals
  'no-octal-escape': ERROR,

  // Disallow reassigning `function` parameters
  'no-param-reassign': ERROR,

  // Disallow the unary operators `++` and `--`
  // RW: Although I don't think these are exceptionally dangerous, I can't deny
  // that code written with explicit assignment is more readable and less prone
  // to error.
  'no-plusplus': OFF,

  // Disallow the use of the `__proto__` property
  'no-proto': ERROR,

  // Disallow variable redeclaration
  // RW: unnecessary due to no-var
  'no-redeclare': OFF,

  // Disallow multiple spaces in regular expressions
  'no-regex-spaces': ERROR,

  // Disallow specified names in exports
  // RW: AirBnB has some good restrictions here
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js#L65-L70
  'no-restricted-exports': [
    ERROR,
    {
      restrictedNamedExports: [
        // Use `export default` to provide a default export
        'default',
        // This will break most node ESM versions whem your module is imported
        // with a dynamic `import()`
        'then',
      ],
    },
  ],

  // Disallow specified global variables
  // RW: AirBnB has some good restrictions here
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
  ]
    // RW: confusingBrowserGlobals is a list of window vars that should be
    // called off window as opposed to standalone.
    .concat(confusingBrowserGlobals),

  // Disallow specified modules when loaded by `import`
  'no-restricted-imports': OFF,

  // Disallow certain properties on certain objects
  // RW: AirBnB has some good restrictions here
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

  // Disallow specified syntax
  // RW: AirBnB has some good restrictions here. Do allow for-of; this is modern
  // JS.
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

  // Disallow assignment operators in `return` statements
  'no-return-assign': ERROR,

  // Disallow unnecessary `return await`

  // RW: This improves perf at the cost of stack trace completeness. IMO it's a
  // rare occasion and there are ways of debugging outside of a full stack
  // trace.
  'no-return-await': ERROR,

  // Disallow `javascript:` urls
  'no-script-url': ERROR,

  // Disallow comma operators
  'no-sequences': ERROR,

  // Disallow variable declarations from shadowing variables declared in the outer scope
  'no-shadow': ERROR,

  // Disallow identifiers from shadowing restricted names
  'no-shadow-restricted-names': ERROR,

  // Disallow ternary operators
  'no-ternary': OFF,

  // Disallow throwing literals as exceptions
  // RW: This is another extra tight rule that prioritizes correctness over ease
  // of throw away debugging code. IMO it's long term worth it.
  'no-throw-literal': ERROR,

  // Disallow initializing variables to `undefined`
  'no-undef-init': ERROR,

  // Disallow the use of `undefined` as an identifier
  'no-undefined': ERROR,

  // Disallow dangling underscores in identifiers
  // RW: Polarizing, but 99% of time there's a better way to communicate. Ether
  // write the var to be private in a scope, or use a more descriptive name.
  'no-underscore-dangle': ERROR,

  // Disallow ternary operators when simpler alternatives exist
  'no-unneeded-ternary': ERROR,

  // Disallow unused expressions
  'no-unused-expressions': ERROR,

  // Disallow unused labels
  // RW: Unnecessary due to no-labels
  'no-unused-labels': OFF,

  // Disallow unnecessary calls to `.call()` and `.apply()`
  'no-useless-call': ERROR,

  // Disallow unnecessary `catch` clauses
  'no-useless-catch': ERROR,

  // Disallow unnecessary computed property keys in objects and classes
  'no-useless-computed-key': ERROR,

  // Disallow unnecessary concatenation of literals or template literals
  'no-useless-concat': ERROR,

  // Disallow unnecessary constructors
  'no-useless-constructor': ERROR,

  // Disallow unnecessary escape characters
  'no-useless-escape': ERROR,

  // Disallow renaming import, export, and destructured assignments to the same name
  'no-useless-rename': ERROR,

  // Disallow redundant return statements
  'no-useless-return': ERROR,

  // Require `let` or `const` instead of `var`
  'no-var': ERROR,

  // Disallow `void` operators
  'no-void': ERROR,

  // Disallow specified warning terms in comments
  'no-warning-comments': OFF,

  // Disallow `with` statements
  'no-with': ERROR,

  // Require or disallow method and property shorthand syntax for object literals
  // RW: Must ensure that we support the shorthand, but it's clear shorthand and
  // should be used
  'object-shorthand': ERROR,

  // Enforce variables to be declared either together or separately in functions
  'one-var': [ERROR, 'never'],

  // Require or disallow newlines around variable declarations
  // RW: Unnecessary due to one-var
  'one-var-declaration-per-line': OFF,

  // Require or disallow assignment operator shorthand where possible
  'operator-assignment': ERROR,

  // Require using arrow functions for callbacks
  'prefer-arrow-callback': ERROR,

  // Require `const` declarations for variables that are never reassigned after declared
  'prefer-const': ERROR,

  // Require destructuring from arrays and/or objects
  // RW: Very particular, but enforces maximum consistency
  // TODO: Check how this affects nested objects. Deep destructuring is hard to
  // follow.
  'prefer-destructuring': [
    ERROR,
    {
      array: true,
      object: true,
    },
    { enforceForRenamedProperties: true },
  ],

  // Disallow the use of `Math.pow` in favor of the `**` operator
  'prefer-exponentiation-operator': ERROR,

  // Enforce using named capture group in regular expression
  'prefer-named-capture-group': OFF,

  // Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals
  'prefer-numeric-literals': OFF,

  // Disallow use of `Object.prototype.hasOwnProperty.call()` and prefer use of `Object.hasOwn()
  'prefer-object-has-own': ERROR,

  // Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead
  // RW: A great rule to enforce one of two equally readable ways of doing
  // something
  'prefer-object-spread': ERROR,

  // Require using Error objects as Promise rejection reasons
  'prefer-promise-reject-errors': ERROR,

  // Disallow use of the `RegExp` constructor in favor of regular expression literals
  'prefer-regex-literals': ERROR,

  // Require rest parameters instead of `arguments`
  // RW: Another banger of a rule. Removes some magic from the language.
  'prefer-rest-params': ERROR,

  // Require spread operators instead of `.apply()`
  'prefer-spread': ERROR,

  // Require template literals instead of string concatenation
  'prefer-template': ERROR,

  // Require quotes around object literal property names
  'quote-props': [ERROR, 'as-needed'],

  // Enforce the consistent use of the radix argument when using `parseInt()`
  // RW: Unnecessary due to no-octals
  radix: OFF,

  // Disallow async functions which have no `await` expression
  'require-await': ERROR,

  // Enforce the use of `u` flag on RegExp
  // RW: This feels like a really good rule, but is out of the ordinary on any
  // environment I've worked on. It's autofixable, so... let's enable and see
  // how it feels.
  'require-unicode-regexp': ERROR,

  // Require generator functions to contain `yield`
  'require-yield': ERROR,

  // Enforce sorted import declarations within modules
  // RW: Prefer more configurable import plugin
  'sort-imports': OFF,

  // Require object keys to be sorted
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

  // Require variables within the same declaration block to be sorted
  // RW: Unnecessary due to one-var
  'sort-vars': OFF,

  // Enforce consistent spacing after the `//` or `/*` in a comment
  // RW: Must allow for special `///` TypeScript comments
  'spaced-comment': [ERROR, 'always', { markers: ['/'] }],

  // Require or disallow strict mode directives
  // RW: Strict mode is enforced by default for sourceType: module
  strict: OFF,

  // Require symbol descriptions
  'symbol-description': OFF,

  // Require `var` declarations be placed at the top of their containing scope
  'vars-on-top': ERROR,

  // Require or disallow "Yoda" conditions
  yoda: ERROR,
};

// These rules care about how the code looks rather than how it executes
// https://eslint.org/docs/latest/rules/#layout--formatting
const layoutAndFormatting = {
  // Enforce linebreaks after opening and before closing array brackets
  'array-bracket-newline': [ERROR, newlineOption],

  // Enforce consistent spacing inside array brackets
  'array-bracket-spacing': [ERROR, 'never'],

  // Enforce line breaks after each array element
  // RW: Should match
  'array-element-newline': [ERROR, newlineOption],

  // Require parentheses around arrow function arguments
  'arrow-parens': [ERROR, 'as-needed'],

  // Enforce consistent spacing before and after the arrow in arrow functions
  'arrow-spacing': ERROR,

  // Disallow or enforce spaces inside of blocks after opening block and before closing block
  'block-spacing': [ERROR, 'always'],

  // Enforce consistent brace style for blocks
  'brace-style': [ERROR, '1tbs'],

  // Require or disallow trailing commas
  'comma-dangle': [ERROR, 'always-multiline'],

  // Enforce consistent spacing before and after commas
  'comma-spacing': ERROR,

  // Enforce consistent comma style
  'comma-style': ERROR,

  // Enforce consistent spacing inside computed property brackets
  'computed-property-spacing': ERROR,

  // Enforce consistent newlines before and after dots
  'dot-location': [ERROR, 'property'],

  // Require or disallow newline at the end of files
  'eol-last': ERROR,

  // Require or disallow spacing between function identifiers and their invocations
  'func-call-spacing': ERROR,

  // Enforce line breaks between arguments of a function call
  'function-call-argument-newline': [ERROR, 'consistent'],

  // Enforce consistent line breaks inside function parentheses
  'function-paren-newline': [ERROR, newlineOption],

  // Enforce consistent spacing around `*` operators in generator functions
  'generator-star-spacing': ERROR,

  // Enforce the location of arrow function bodies
  'implicit-arrow-linebreak': ERROR,

  // Enforce consistent indentation
  indent: [ERROR, { indent: ['error', 2] }],

  // Enforce the consistent use of either double or single quotes in JSX attributes
  'jsx-quotes': ERROR,

  // Enforce consistent spacing between keys and values in object literal properties
  'key-spacing': ERROR,

  // Enforce consistent spacing before and after keywords
  'keyword-spacing': ERROR,

  // Enforce position of line comments
  'line-comment-position': OFF,

  // Enforce consistent linebreak style
  'linebreak-style': ERROR,

  // Require empty lines around comments
  // RW: The defaults for this are great
  'lines-around-comment': ERROR,

  // Require or disallow an empty line between class members
  // RW: Allow for compact code in simple classes
  'lines-between-class-members': [
    ERROR,
    'always',
    { exceptAfterSingleLine: true },
  ],

  // Enforce a maximum line length
  // RW: Modern editors and screens, we love 100 lines these days
  'max-len': [
    ERROR,
    {
      code: 100,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
    },
  ],

  // Enforce a maximum number of statements allowed per line
  // RW: Not sure if this is too restrictive, but let's try max 2 (to allow for if (x) return; guards).
  'max-statements-per-line': [ERROR, { max: 2 }],

  // Enforce newlines between operands of ternary expressions
  // RW: Prettier has got our back here
  'multiline-ternary': OFF,

  // Enforce or disallow parentheses when invoking a constructor with no arguments
  'new-parens': ERROR,

  // Require a newline after each call in a method chain
  'newline-per-chained-call': [ERROR, { ignoreChainWithDepth: 3 }],

  // Disallow unnecessary parentheses
  // RW: I wonder if this will conflict with any of the disambiguation rules above
  'no-extra-parens': ERROR,

  // Disallow mixed spaces and tabs for indentation
  'no-mixed-spaces-and-tabs': ERROR,

  // Disallow multiple spaces
  // RW: Disallow any precious manual aligning of comments or code
  'no-multi-spaces': ERROR,

  // Disallow multiple empty lines
  // RW: As above, no precious spacing
  'no-multiple-empty-lines': [ERROR, { max: 1 }],

  // Disallow all tabs
  'no-tabs': ERROR,

  // Disallow trailing whitespace at the end of lines
  'no-trailing-spaces': ERROR,

  // Disallow whitespace before properties
  'no-whitespace-before-property': ERROR,

  // Enforce the location of single-line statements
  // RW: Great rule!
  'nonblock-statement-body-position': ERROR,

  // Enforce consistent line breaks after opening and before closing braces
  'object-curly-newline': [ERROR, 'always', newlineOption],

  // Enforce consistent spacing inside braces
  'object-curly-spacing': [ERROR, 'always'],

  // Enforce placing object properties on separate lines
  'object-property-newline': ERROR,

  // Enforce consistent linebreak style for operators
  'operator-linebreak': [ERROR, 'after'],

  // Require or disallow padding within blocks
  'padded-blocks': [ERROR, 'never'],

  // Require or disallow padding lines between statements

  // RW: These may be too strict, but let's see. ABNB doesn't set any of these.
  // I think there also might be plugins that do a better job of setting
  // linebreaks between types.
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

    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: '*', next: ['cjs-export', 'export'] },

    { blankLine: 'always', prev: 'switch', next: '*' },
    { blankLine: 'always', prev: 'while', next: '*' },
  ],

  // Enforce the consistent use of either backticks, double, or single quotes
  // RW: Prettier has our back on this too
  quotes: [ERROR, 'single'],

  // Enforce spacing between rest and spread operators and their expressions
  'rest-spread-spacing': ERROR,

  // Require or disallow semicolons instead of ASI
  semi: ERROR,

  // Enforce consistent spacing before and after semicolons
  'semi-spacing': ERROR,

  // Enforce location of semicolons
  'semi-style': ERROR,

  // Enforce consistent spacing before blocks
  'space-before-blocks': [ERROR, 'always'],

  // Enforce consistent spacing before `function` definition opening parenthesis
  'space-before-function-paren': [ERROR, 'never'],

  // Enforce consistent spacing inside parentheses
  'space-in-parens': ERROR,

  // Require spacing around infix operators
  'space-infix-ops': ERROR,

  // Enforce consistent spacing before or after unary operators
  'space-unary-ops': [ERROR, { words: true, nonwords: false }],

  // Enforce spacing around colons of switch statements
  'switch-colon-spacing': ERROR,

  // Require or disallow spacing around embedded expressions of template strings
  'template-curly-spacing': ERROR,

  // Require or disallow spacing between template tags and their literals
  'template-tag-spacing': ERROR,

  // Require or disallow Unicode byte order mark (BOM)
  'unicode-bom': OFF,

  // Require parentheses around immediate `function` invocations
  // RW: This is probably a rare case these days, but I've always/only seen the
  // outside style
  'wrap-iife': [ERROR, 'outside'],

  // Require parenthesis around regex literals
  'wrap-regex': OFF,

  // Require or disallow spacing around the `*` in `yield*` expressions
  'yield-star-spacing': ERROR,
};

const coreRules = {
  ...possibleProblems,
  ...suggestions,
  ...layoutAndFormatting,
};

const reactPluginRules = {
  'boolean-prop-naming': {},
  'button-has-type': {},
  'default-props-match-prop-types': {},
  'destructuring-assignment': {},
  'display-name': {},
  'forbid-component-props': {},
  'forbid-dom-props': {},
  'forbid-elements': {},
  'forbid-foreign-prop-types': {},
  'forbid-prop-types': {},
  'function-component-definition': {},
  'hook-use-state': {},
  'iframe-missing-sandbox': {},
  'jsx-boolean-value': {},
  'jsx-child-element-spacing': {},
  'jsx-closing-bracket-location': {},
  'jsx-closing-tag-location': {},
  'jsx-curly-brace-presence': {},
  'jsx-curly-newline': {},
  'jsx-curly-spacing': {},
  'jsx-equals-spacing': {},
  'jsx-filename-extension': {},
  'jsx-first-prop-new-line': {},
  'jsx-fragments': {},
  'jsx-handler-names': {},
  'jsx-indent': {},
  'jsx-indent-props': {},
  'jsx-key': {},
  'jsx-max-depth': {},
  'jsx-max-props-per-line': {},
  'jsx-newline': {},
  'jsx-no-bind': {},
  'jsx-no-comment-textnodes': {},
  'jsx-no-constructed-context-values': {},
  'jsx-no-duplicate-props': {},
  'jsx-no-leaked-render': {},
  'jsx-no-literals': {},
  'jsx-no-script-url': {},
  'jsx-no-target-blank': {},
  'jsx-no-undef': {},
  'jsx-no-useless-fragment': {},
  'jsx-one-expression-per-line': {},
  'jsx-pascal-case': {},
  'jsx-props-no-multi-spaces': {},
  'jsx-props-no-spreading': {},
  'jsx-sort-default-props': {},
  'jsx-sort-props': {},
  'jsx-space-before-closing': {},
  'jsx-tag-spacing': {},
  'jsx-uses-react': {},
  'jsx-uses-vars': {},
  'jsx-wrap-multilines': {},
  'no-access-state-in-setstate': {},
  'no-adjacent-inline-elements': {},
  'no-array-index-key': {},
  'no-arrow-function-lifecycle': {},
  'no-children-prop': {},
  'no-danger': {},
  'no-danger-with-children': {},
  'no-deprecated': {},
  'no-did-mount-set-state': {},
  'no-did-update-set-state': {},
  'no-direct-mutation-state': {},
  'no-find-dom-node': {},
  'no-invalid-html-attribute': {},
  'no-is-mounted': {},
  'no-multi-comp': {},
  'no-namespace': {},
  'no-object-type-as-default': {},
  'no-redundant-should-component-update': {},
  'no-render-return-value': {},
  'no-set-state': {},
  'no-string-refs': {},
  'no-this-in-sfc': {},
  'no-typos': {},
  'no-unescaped-entities': {},
  'no-unknown-property': {},
  'no-unsafe': {},
  'no-unstable-nested-components': {},
  'no-unused-class-component-methods': {},
  'no-unused-prop-types': {},
  'no-unused-state': {},
  'no-will-update-set-state': {},
  'prefer-es6-class': {},
  'prefer-exact-props': {},
  'prefer-read-only-props': {},
  'prefer-stateless-function': {},
  'prop-types': {},
  'react-in-jsx-scope': {},
  'require-default-props': {},
  'require-optimization': {},
  'require-render-return': {},
  'self-closing-comp': {},
  'sort-comp': {},
  'sort-default-props': {},
  'sort-prop-types': {},
  'state-in-constructor': {},
  'static-property-placement': {},
  'style-prop-object': {},
  'void-dom-elements-no-children': {},
};

export { coreRules, reactPluginRules };
