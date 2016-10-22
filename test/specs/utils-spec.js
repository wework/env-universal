import * as utils from '../../src/utils';

describe('src/utils', () => {
  it('#getAppVersion returns stringified config.npm_package_version', () => {
    const v = 1;
    expect(utils.getAppVersion({ npm_package_version: v })).to.eql(JSON.stringify(v));
    expect(utils.getAppVersion()).to.eql(undefined);
  });

  it('#getEnv returns config.NODE_ENV', () => {
    const v = {};
    expect(utils.getEnv({ NODE_ENV: v })).to.eql(v);
    expect(utils.getEnv({ NODE_ENV: 'baz' })).to.eql('baz');
  });

  it('#getEnv defaults to \'development\'', () => {
    expect(utils.getEnv()).to.eql('development');
  });

  it('#isTest returns true when isCI returns true', () => {
    // Would like to stub isCI here but cant because its in local scope to isTest
    expect(utils.isTest({ NODE_ENV: 'testCI' })).to.eql(true);
  })

  // FIXME add tests for these methods
  it.skip('#getPublicEnv', () => {});
  it.skip('#getHerokuMetadata', () => {});

  // probably wont do these
  it.skip('#isDev', () => {});
  it.skip('#isProd', () => {});
  it.skip('#isCI', () => {});
  it.skip('#isStaging', () => {});
  it.skip('#isPreProd', () => {});
  it.skip('#isHerokuReviewApp', () => {});
  it.skip('#isServer', () => {});
  it.skip('#isClient', () => {});
});
