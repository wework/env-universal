/** @module env-universal/utils */

import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';

import {
  development,
  production,
  ci,
  test,
  qa,
  staging,
  preprod
} from './constants';

/**
 * Get the app version from package.json
 * @param {Object} config
 * @param {String} config.npm_package_version
 * @return {String}
 */
export const getAppVersion = (config = {}) => JSON.stringify(config.npm_package_version);

/**
 * Get the application environment, defaults to development
 * @param {Object} config
 * @param {String} config.NODE_ENV
 * @return {String}
 */
export const getEnv = (config = {}) => config.NODE_ENV || development;

/**
 * Get the application deployment stage
 * @param {Object} config
 * @param {String} config.APP_ENV
 * @return {String?}
 */
export const getStage = (config = {}) => config.APP_ENV;

/**
 * Is the application in development mode?
 * @param  {Object} config
 * @param  {String} config.NODE_ENV
 * @return {Boolean}
 */
export const isDev = (config = {}) => getEnv(config) === development;

/**
 * Is the application deployed (NODE_ENV=production)
 * @param  {Object} config
 * @param  {String} config.NODE_ENV
 * @return {Boolean}
 */
export const isDeployed = (config = {}) => getEnv(config) === production;

/**
 * Is the application in CI mode?
 * @param  {Object} config
 * @param {String}  config.NODE_ENV
 * @return {Boolean}
 */
export const isCI = (config = {}) => getEnv(config) === ci;

/**
 * Is the application in test mode?
 * @param  {Object} config
 * @param  {String} config.NODE_ENV
 * @return {Boolean}
 */
export const isTest = (config = {}) => getEnv(config) === test || isCI(config);

/**
 * Is the application a qa deployment?
 * @param  {Object} config
 * @param  {String} config.APP_ENV
 * @return {Boolean}
 */
export const isQa = (config = {}) => getStage(config) === qa;

/**
 * Is the application a staging deployment?
 * @param  {Object} config
 * @param  {String} config.APP_ENV
 * @return {Boolean}
 */
export const isStaging = (config = {}) => getStage(config) === staging;

/**
 * Is the application a preprod deployment?
 * @param  {Object} config
 * @param  {String} config.APP_ENV
 * @return {Boolean}
 */
export const isPreProd = (config = {}) => getStage(config) === preprod;

/**
 * Is the application a production deployment?
 * @param  {Object} config
 * @param  {String} config.APP_ENV
 * @return {Boolean}
 */
export const isProduction = (config = {}) => getStage(config) === production;

/**
 * Is the application a heroku review app deployment?
 * @param  {Object} config
 * @param  {*} config.IS_REVIEW_APP
 * @return {Boolean}
 */
export const isHerokuReviewApp = (config = {}) => !!config.IS_REVIEW_APP;

/**
 * Is the application running in a server runtime?
 * @param  {Object} config
 * @param  {*} config.SERVER
 * @return {Boolean}
 */
export const isServer = (config = {}) => !!config.SERVER;

/**
 * Is the application running in a client runtime?
 * @param  {Object} config
 * @param  {*} config.CLIENT
 * @return {Boolean}
 */
export const isClient = (config = {}) => !!config.CLIENT;

/**
 * When building universal apps, it is common for a Node
 * process to have sensitive information stored as
 * environment variables. This isn't acceptable for
 * client bundles, since they would be output in plaintext.
 *
 * This utility serves to whitelist public keys.
 * It's output is meant for use with `dotenv` and
 * something like `webpack.DefinePlugin`
 *
 * @example
 * see `test/browser/webpack.config`, and the `npm run test:browser` target
 *
 * @param  {String[]} publicKeys - keys from Node `process.env`
 *                                 to inject into a client bundle
 * @param  {Object}  config
 * @return {Object}  stringified object extracted from `process.env`
 */
export const getPublicEnv = (publicKeys, config = process.env) => mapValues(
  pick(config, publicKeys),
  JSON.stringify
);

/**
 * This is only useful for applications running on heroku
 * with the [`runtime-dyno-metadata` labs feature enabled]
 * (https://devcenter.heroku.com/articles/dyno-metadata) and
 * is not included in the default output of `env`
 *
 * @param  {Object} config
 * @param  {String} config.HEROKU_APP_NAME - The application name. "example-app"
 * @param  {String} config.HEROKU_RELEASE_CREATED_AT - The time and date the release was created.
 *                                                     "2015-04-02T18:00:42Z"
 * @param  {String} config.HEROKU_RELEASE_VERSION - The identifier for the current release. "v42"
 * @param  {String} config.HEROKU_SLUG_COMMIT - The commit hash for the current release.
 *                                              "2c3a0b24069af49b3de35b8e8c26765c1dba9ff0"
 * @return {Object}
 */
export const getHerokuMetadata = (config = {}) => ({
  name: config.HEROKU_APP_NAME,
  at: config.HEROKU_RELEASE_CREATED_AT,
  version: config.HEROKU_RELEASE_VERSION,
  slug: config.HEROKU_SLUG_COMMIT,
});
