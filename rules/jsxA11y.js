import jsxA11ty from 'eslint-plugin-jsx-a11y';
import { ERROR, OFF, addPrefix } from '../utils/index.js';

const prefix = 'jsx-a11y';

const jsxA11yPluginConfig = {
  [prefix]: jsxA11ty,
};

const interactiveHandlers = [
  'onClick',
  'onMouseDown',
  'onMouseUp',
  'onKeyPress',
  'onKeyDown',
  'onKeyUp',
];

const listInteractiveRoles = [
  'listbox',
  'menu',
  'menubar',
  'radiogroup',
  'tablist',
  'tree',
  'treegrid',
];

// Note that these rules cover a small subset of a11y issues. For increased
// automated coverage, linting should be paired with a tool that analyzes the
// rendered HTML axe-core-npm/react or jest-axe. Complete coverage is only
// possible through manual testing by people with a11y expertise.
const rules = {
  'alt-text': ERROR,
  'anchor-ambiguous-text': OFF,
  'anchor-has-content': ERROR,
  // The defaults should work well in a modern TS/JS app. If we run into any
  // issue with Link components, ABnB's config may be a useful reference:
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react-a11y.js#L35-L39
  'anchor-is-valid': ERROR,
  'aria-activedescendant-has-tabindex': ERROR,
  'aria-props': ERROR,
  'aria-proptypes': ERROR,
  'aria-role': [ERROR, { ignoreNonDOM: false }],
  'aria-unsupported-elements': ERROR,
  'autocomplete-valid': ERROR,
  // Unnecessary, we forbid interaction on non-interactive elements
  'click-events-have-key-events': OFF,
  'control-has-associated-label': [
    ERROR,
    {
      // Allow for deeper nesting of text content in components
      depth: 5,
      ignoreElements: [
        'audio',
        'canvas',
        'embed',
        'input',
        'textarea',
        'tr',
        'video',
      ],
      ignoreRoles: [
        'grid',
        'listbox',
        'menu',
        'menubar',
        'radiogroup',
        'row',
        'tablist',
        'toolbar',
        'tree',
        'treegrid',
      ],
      labelAttributes: ['label'],
    },
  ],
  'heading-has-content': ERROR,
  'html-has-lang': ERROR,
  'iframe-has-title': ERROR,
  'img-redundant-alt': ERROR,
  // Unnecessary, we forbid interaction on non-interactive elements
  'interactive-supports-focus': OFF,
  'label-has-associated-control': [
    ERROR,
    {
      assert: 'both',
      depth: 10,
    },
  ],
  lang: ERROR,
  'media-has-caption': ERROR,
  'mouse-events-have-key-events': ERROR,
  'no-access-key': ERROR,
  'no-aria-hidden-on-focusable': ERROR,
  'no-autofocus': [ERROR, { ignoreNonDOM: false }],
  'no-distracting-elements': ERROR,
  'no-interactive-element-to-noninteractive-role': ERROR,
  'no-noninteractive-element-interactions': [
    ERROR,
    { handlers: interactiveHandlers },
  ],
  'no-noninteractive-element-to-interactive-role': [
    ERROR,
    {
      li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
      ol: listInteractiveRoles,
      table: ['grid'],
      td: ['gridcell'],
      ul: listInteractiveRoles,
    },
  ],
  'no-noninteractive-tabindex': ERROR,
  'no-redundant-roles': ERROR,
  'no-static-element-interactions': [
    ERROR,
    {
      handlers: interactiveHandlers,
      allowExpressionValues: true,
    },
  ],
  'prefer-tag-over-role': ERROR,
  'role-has-required-aria-props': ERROR,
  'role-supports-aria-props': ERROR,
  scope: ERROR,
  'tabindex-no-positive': ERROR,
};

const jsxA11yRules = addPrefix(prefix, rules);

export { jsxA11yPluginConfig, jsxA11yRules };
