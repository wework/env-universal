// mmmmm dogfood
const getEnv = require('..');

require('babel-register');
require('babel-polyfill');

const chai = require('chai');
const sinon = require('sinon');

/*
  Test Globals
 */
global.expect = chai.expect;
global.should = chai.should;
global.assert = chai.assert;
global.sinon = sinon;

/*
  Global mocha hooks
 */

before(() => {
  /* eslint-disable no-console */
  const env = getEnv();
  if (env.is.server) {
    console.log('###### SERVER TESTS #####');
  }
  if(env.is.client) {
    console.log('###### BROWSER TESTS #####');
  }
  if(env.is.server && env.is.client) {
    console.log('¿¿¿¿¿¿ SERVER & BROWSER TESTS ?????');
  }
  if(!env.is.server && !env.is.client) {
    throw new Error('Server or client runtime environment must be declared');
  }
  /* eslint-enable */
});

// Sandbox sinon for each test
beforeEach(() => {
  global.sinon = sinon.sandbox.create();
});
afterEach(() => {
  global.sinon.restore();
});
