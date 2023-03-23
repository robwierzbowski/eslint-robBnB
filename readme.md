Setting up modern static analysis

New (pre-release, mostly no docs) eslint flat config
https://eslint.org/blog/2022/08/new-config-system-part-2/
https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-language-options

Get the basics working for TS
https://stackoverflow.com/questions/74237042/how-to-correctly-configure-the-parser-plugins-with-eslints-new-flat-config

Can't import most old configs, but I think you can import just rulesets (https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules, etc)

### Desires

No React / JSX Proptype rules, just TS rules
Force const / arrow over func keywords
Don't use .jsx -- we decided ages ago to use .js. In fact, it would be great if we could just force .tsx if the file has jsx in it

### Unknowns

Can we use various plugin/config defaults instead of airbnb config?
