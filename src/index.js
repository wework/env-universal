/**
 * Environment definitions and helpers
 *
 * Note: in browser runtimes `process.env` will need to be defined
 * via something like Webpack's DefinePlugin
 *
 * @module env-universal
 */

import * as constants from './constants';
import * as utils from './utils';
import * as serverUtils from './serverUtils';

/**
 * Given an environment config (defaults to `process.env`),
 * parse it into a standard environment definition
 *
 * @param  {Object}  config
 * @param  {String?} config.NODE_ENV
 * @param  {String?} config.APP_ENV
 * @param  {*?}      config.SERVER
 * @param  {*?}      config.CLIENT
 * @param  {*?}      config.IS_REVIEW_APP
 * @param  {String?} config.npm_package_version
 * @param  {String?} config.HOST
 * @param  {String?} config.PORT
 * @return {Object}  envDef
 */
export default function readEnv(config = process.env) {
  /**
   * envDef
   *
   * @description A standardized environment description
   * - see `env-universal/constants`
   * - see `env-universal/utils`
   *
   * @property {String}  mode -  `process.env.NODE_ENV`
   * @property {String}  stage - `process.env.APP_ENV`
   * @property {String}  version - NPM package version
   * @property {Object}  is - config flags based on env
   * @property {Boolean} is.deployed
   * @property {Boolean} is.client
   * @property {Boolean} is.server
   * @property {Boolean} is.dev
   * @property {Boolean} is.staging
   * @property {Boolean} is.preprod
   * @property {Boolean} is.production
   * @property {Boolean} is.test
   * @property {Boolean} is.ci
   * @property {Boolean} is.reviewApp
   * @property {Object}  server - server env config
   * @property {String}  server.host
   * @property {String?} server.port
   * @property {Object}  constants - `constants` module
   * @property {Object}  utils - `utils` module
   * @type {Object}
   */
  const envDef = {
    mode: utils.getEnv(config),
    stage: utils.getStage(config),
    version: utils.getAppVersion(config),
    is: {
      deployed: utils.isDeployed(config),
      client: utils.isClient(config),
      server: utils.isServer(config),
      dev: utils.isDev(config),
      staging: utils.isStaging(config),
      preprod: utils.isPreProd(config),
      production: utils.isProduction(config),
      test: utils.isTest(config),
      ci: utils.isCI(config),
      reviewApp: utils.isHerokuReviewApp(config)
    },
    server: {
      host: serverUtils.serverHost(config),
      port: serverUtils.serverPort(config),
    },
    constants,
    utils,
  };

  return envDef;
}
