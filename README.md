# RobBnB: ESLint rulesets for modern applications

This configuration contains strict rulesets designed to help engineers produce more error free, maintainable code. It sets rules for TypeScript and modern JS, specifically the latest Node and browsers that support Vite applications.

In addition, it sets feature preferences to help standardize the way common patterns are implemented (e.g., `Array.prototype.forEach|map` over `for` loops), and forbids some JS features to encourage engineers to use more readable, less clever alternatives (e.g., `Array.prototype.reduce`, bitwise operators).

Both ESLint core and third party plugins include many useful rules for DOM manipulation, but this ruleset assumes projects are using React and keeps DOM rules to the minimum to maintain linter performance.

For years, engineers have extended [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), and while it's a fantastic starting point it includes deprecated rules, outdated rules that apply to old technologies (e.g., PropTypes), and useful rules that have been disabled until a new major version can be released. This ruleset uses AirBnB as a reference, but sets most rules directly or extends plugin-specified defaults.

## Flat Config

This package uses the new, currently pre-release ESLint flat config. End use of these rules should be straightforward, but internally I've had to do some weird things to support third party plugins that are not yet exporting flat-config-compatible configuration.

References: [blog post](https://eslint.org/blog/2022/08/new-config-system-part-1/), [new docs](https://eslint.org/docs/latest/use/configure/configuration-files-new), [TypeScript integration](https://stackoverflow.com/questions/74237042/how-to-correctly-configure-the-parser-plugins-with-eslints-new-flat-config)

## Upcoming changes

- [ ] Extract into its own package and add install/usage section
- [ ] In order to keep in-editor linting performant, I may want to move slower rules behind a CLI-only flag. Rules [can be benchmarked](https://javascript.plainenglish.io/how-to-benchmark-eslint-rules-e262b7690708) by prefixing the script call with `TIMING={Number of rules to show}`.
- [ ] Stylelint? Are there any alternatives to stylelint?
