import jsxA11ty from 'eslint-plugin-jsx-a11y';
import { ERROR, OFF, addPrefix } from './shared.js';

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

// RW: Many of the rules this plugin provides have documented recommended
// configuration. These recommendations have been added wherever possible.
const rules = {
  // Enforce all elements that require alternative text have meaningful
  // information to relay back to end user.
  'alt-text': ERROR,
  // Enforce <a> text to not exactly match "click here", "here", "link", or "a link".
  'anchor-ambiguous-text': OFF,
  // Enforce all anchors to contain accessible content.
  'anchor-has-content': ERROR,
  // Enforce all anchors are valid, navigable elements.
  // RW: The defaults should work well in a modern TS/JS app. If we run into any
  // issue with Link components, ABnB's config may be a useful reference:
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react-a11y.js#L35-L39
  'anchor-is-valid': ERROR,
  // Enforce elements with aria-activedescendant are tabbable.
  'aria-activedescendant-has-tabindex': ERROR,
  // Enforce all aria-* props are valid.
  'aria-props': ERROR,
  // Enforce ARIA state and property values are valid.
  'aria-proptypes': ERROR,
  // Enforce that elements with ARIA roles must use a valid, non-abstract ARIA
  // role.
  // RW: Check custom components as well
  'aria-role': [ERROR, { ignoreNonDOM: false }],
  // Enforce that elements that do not support ARIA roles, states, and
  // properties do not have those attributes.
  'aria-unsupported-elements': ERROR,
  // Enforce that autocomplete attributes are used correctly.
  'autocomplete-valid': ERROR,
  // Enforce a clickable non-interactive element has at least one keyboard event
  // listener.
  // RW: This would not be necessary if we could forbid interaction on
  // non-interactive elements
  'click-events-have-key-events': ERROR,
  // Enforce that a control (an interactive element) has a text label.
  // RW: Including the full options object to override depth.
  // TODO: Test if we can override depth without including the rest of the
  // options object
  'control-has-associated-label': [
    ERROR,
    {
      // RW: Allow for deeper nesting of text content in components
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
  // Enforce heading (h1, h2, etc) elements contain accessible content.
  'heading-has-content': ERROR,
  // Enforce <html> element has lang prop.
  'html-has-lang': ERROR,
  // Enforce iframe elements have a title attribute.
  'iframe-has-title': ERROR,
  // Enforce <img> alt prop does not contain the word "image", "picture", or "photo".
  'img-redundant-alt': ERROR,
  // Enforce that elements with interactive handlers like onClick must be focusable.
  // RW: This would not be necessary if we could forbid interaction on
  // non-interactive elements
  'interactive-supports-focus': ERROR,
  // Enforce that a label tag has a text label and an associated control.
  'label-has-associated-control': [
    ERROR,
    {
      assert: 'both',
      depth: 10,
    },
  ],
  // Enforce lang attribute has a valid value.
  lang: ERROR,
  // Enforces that <audio> and <video> elements must have a <track> for
  // captions.
  'media-has-caption': ERROR,
  // Enforce that onMouseOver/onMouseOut are accompanied by onFocus/onBlur for
  // keyboard-only users.
  'mouse-events-have-key-events': ERROR,
  // Enforce that the accessKey prop is not used on any element to avoid
  // complications with keyboard commands used by a screen reader.
  'no-access-key': ERROR,
  // Disallow aria-hidden="true" from being set on focusable elements.
  'no-aria-hidden-on-focusable': ERROR,
  // Enforce autoFocus prop is not used.
  // RW: Check custom components as well
  'no-autofocus': [ERROR, { ignoreNonDOM: false }],
  // Enforce distracting elements are not used.
  // RW: But we all love blink and marquee tbh
  'no-distracting-elements': ERROR,
  // Interactive elements should not be assigned non-interactive roles.
  'no-interactive-element-to-noninteractive-role': ERROR,
  // Non-interactive elements should not be assigned mouse or keyboard event
  // listeners.
  // RW: Docs contain recommended settings that are not the default? Odd.
  'no-noninteractive-element-interactions': [
    ERROR,
    { handlers: interactiveHandlers },
  ],
  // Non-interactive elements should not be assigned interactive roles.
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
  // tabIndex should only be declared on interactive elements.
  'no-noninteractive-tabindex': ERROR,
  // Enforce explicit role property is not the same as implicit/default role
  // property on element.
  'no-redundant-roles': ERROR,
  // Enforce that non-interactive, visible elements (such as <div>) that have
  // click handlers use the role attribute.
  'no-static-element-interactions': [
    ERROR,
    {
      handlers: interactiveHandlers,
      allowExpressionValues: true,
    },
  ],
  // Enforces using semantic DOM elements over the ARIA role property.
  'prefer-tag-over-role': ERROR,
  // Enforce that elements with ARIA roles must have all required attributes for
  // that role.
  'role-has-required-aria-props': ERROR,
  // Enforce that elements with explicit or implicit roles defined contain only
  // aria-* properties supported by that role.
  'role-supports-aria-props': ERROR,
  // Enforce scope prop is only used on <th> elements.
  scope: ERROR,
  // Enforce tabIndex value is not greater than zero.
  'tabindex-no-positive': ERROR,
};

const jsxA11yRules = addPrefix(prefix, rules);

export { jsxA11yPluginConfig, jsxA11yRules };
