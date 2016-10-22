env-universal
================

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

[![Sauce Test Status][saucelabs-image]][saucelabs-url]

>Standard environment definition, utilities and constants for browser and node JavaScript applications

# Introduction

This package provides utilities for working with environment configuration consistently in different runtimes via configuration objects or environment variables.

We created this at [WeWork](https://www.wework.com) to provide our applications a more consistent runtime. We use it with tools like `dotenv` and `webpack` in universal JavaScript applications.


# Environment configuration

We use a matrix of variables to define the environment of our applications:

Env          | Condition  |   Notes  |
------------ | -----------|----------|
`development`| `NODE_ENV` is undefined or 'development' | Should only be true in local development environments |
`production` | `APP_ENV` is 'production' | `NODE_ENV` should be 'production' for deployments |
`staging`    | `APP_ENV` is 'staging' | `NODE_ENV` should be 'production' for deployments |
`preprod`    | `APP_ENV` is 'preprod' | `NODE_ENV` should be 'production' for deployments |
`test`       | `NODE_ENV` is 'test' or 'testCI' | |

*Note that `NODE_ENV=production` only indicates that the app is deployed (vs running locally in development) and that `APP_ENV` specifies the environment.**

Runtime      | Condition  |
------------ | -----------|
`server`     | `SERVER` has any value |
`client`     | `CLIENT` has any value |

By default, config is read from environment variables (`process.env`), but you can also pass in your own configuration object.

# Usage

See the [documentation](./API.md). Note that most util functions expect to receive `process.env` when not calling the root `env` function.

This package is bundled as a CommonJS module in `dist` and can be required like any other. The ES2015 source is also exposed via the [`jsnext:main` field in the `package.json`](https://github.com/rollup/rollup/wiki/jsnext:main) for loaders that support module syntax directly.

## Webpack

`utils.getPublicEnv` is very handy to safely expose environment config for a client bundle. See [docs for getPublicEnv](./API.md#getpublicenv), and our own use of it in [`test/browser/webpack.config.js`](./test/browser/webpack.config.js).

## Examples

```js
import getEnv from 'env-universal';
const env = getEnv();

console.log(env.version);
console.log(env.is.client);
console.log(env.is.server);
console.log(env.is.prod);
console.log(env.is.dev);
```

# Development

1. Checkout this repo
2. Run `npm install`
3. Make changes in a feature branch and open a PR to `master`

In lieu of a formal style guide, please:

 - follow the conventions present in the codebase
 - respect the linter
 - keep tests green
 - maintain test coverage

# npm scripts

### npm scripts

Target | Behavior
------------ | -------------
**`npm test`** | Runs tests in browser and node runtimes
**`npm run tdd`** | Runs tests, bundles and re-runs on file changes
**`npm run test:coverage`** | Runs tests and outputs a code coverage report to `/coverage`
**`npm run test:ci`** | Runs tests, outputs code coverage and JUnit reports
**`npm run lint`** | (*Run as a git pre-commit hook*) Runs `eslint`
**`npm run docs`** | Generates `API.md` from JSDoc comments in `/src`
**`npm run security-scan`** | (*Run as a git pre-push hook*) Checks npm dependencies for security vulnerabilities
**`npm run release <version>`** | Generates a changelog, updates package version, tags and pushes via [`np`](https://www.npmjs.com/package/np). This should only be run on an up-to-date `master` by a maintainer of this package. <br /><br />Version can be a semver level: `patch | minor | major | prepatch | preminor | premajor | prerelease`, or a valid semver version: `1.2.3`.

**`npm run` will list all npm scripts**


[npm-url]: https://npmjs.org/package/env-universal
[npm-version-image]: http://img.shields.io/npm/v/env-universal.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/env-universal.svg?style=flat-square

[coveralls-image]:https://coveralls.io/repos/github/wework/env-universal/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/wework/env-universal?branch=master

[travis-url]:https://travis-ci.org/wework/env-universal
[travis-image]: https://travis-ci.org/wework/env-universal.svg?branch=master

[saucelabs-image]:https://saucelabs.com/browser-matrix/wework-env-universal.svg
[saucelabs-url]:https://saucelabs.com/u/wework-env-universal

[license-url]: LICENSE
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
