/** @module env-universal/serverUtils */

import { isProd } from './utils';

export const DEFAULT_HOST = '0.0.0.0';
export const DEFAULT_PORT = '8080';

/**
 * Get the server host. Defaults to '0.0.0.0'
 * @param  {Object} config
 * @param  {String} config.HOST
 * @return {String}
 */
export const serverHost = (config = {}) => config.HOST || DEFAULT_HOST;


/**
 * Get the server port. Defaults to '8080'
 * @param  {Object} config
 * @param  {String} config.PORT
 * @return {String}
 */
export const serverPort = (config = {}) => isProd(config) ? config.PORT : (config.PORT || DEFAULT_PORT);
