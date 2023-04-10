Setting up modern static analysis

New (pre-release, mostly no docs) eslint flat config
https://eslint.org/blog/2022/08/new-config-system-part-2/
https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-language-options

Get the basics working for TS
https://stackoverflow.com/questions/74237042/how-to-correctly-configure-the-parser-plugins-with-eslints-new-flat-config

Can't import most old configs, but I think you can import just rulesets
(https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules,
etc)

plugin-react supports new config, but the setup still feels kinda weird. Very
close to no config but not quite. It also hides the plugin setup in its new
default config. Props to them for supporting new config tho!

The cascade and file globs are still confusing to me, but I think if I dumb down
what I'm expecting and think of it as: each entry with a files key uses that
files key for the glob, and deep merging every config on top of it, it makes
sense.

ABnB is a good resource, but it's not that strict (including
[some desires that are just held up by semver](https://github.com/airbnb/javascript/blob/5c01a1094986c4dd50a6ee4d9f7617abdfabb58a/packages/eslint-config-airbnb/rules/react-a11y.js#L258)),
contains deprecated rules and is missing some newer rules. It's a fine starting
point, but we can do better.

There are lots of good DOM manip rules but I'm gonna assume we're mostly working
with a JSX framework and keep those rules to the minimum.

In order to keep the static analysis performant, may want to mark some slower
rules with a "CLI only" process env var. Then we can run a full suite pre
commit, and a fast suite in editor.

Other plugins that might be interesting:

- https://github.com/microsoft/eslint-plugin-sdl
- https://github.com/EvgenyOrekhov/eslint-config-hardcore
- some rules from https://github.com/Shopify/web-configs/tree/main/packages/eslint-plugin
- https://github.com/buildo/eslint-plugin-no-loops (YESSS, although i've read for-of loops can be optimized by the engine in ways iterator methods can't be)
- https://github.com/bmatcuk/eslint-plugin-postcss-modules
- https://www.npmjs.com/package/eslint-plugin-jest-formatting
- https://github.com/SonarSource/eslint-plugin-sonarjs (Edge case bugs, good rules but IDK if it's worth it as a plugin. Maybe CLI only)
- https://github.com/nickdeis/eslint-plugin-no-secrets (good but false positives on commit shas, so ROI is team dependent)

Must haves:

- https://typescript-eslint.io/getting-started/ (next!)
<!-- The repo must use jest and testing library before I configure these -->
- https://github.com/testing-library/eslint-plugin-testing-library
- https://github.com/jest-community/eslint-plugin-jest

### Desires

No React / JSX Proptype rules, just TS rules Force const / arrow over func
keywords Don't use .jsx -- we decided ages ago to use .js. In fact, it would be
great if we could just force .tsx if the file has jsx in it

### Unknowns

Can we use various plugin/config defaults instead of airbnb config?
