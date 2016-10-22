// Leverage node's resolution to get the dist package
import readEnv from '../..';

describe('dist/env-universal', () => {
  describe('module', () => {
    it('default export is a function', () => {
      expect(readEnv).to.be.a('function');
    });
  })

  describe('env', () => {
    it('exposes an env property', () => {
      expect(readEnv()).to.have.property('env');
    });

    it('defaults to "development"', () => {
      expect(readEnv({}).env).to.eql('development');
    });

    it('returns config.NODE_ENV', () => {
      expect(readEnv({ NODE_ENV: 'ENV-FOR-TEST' }).env).to.eql('ENV-FOR-TEST');
    });
  });

  describe('version', () => {
    it('exposes a version property', () => {
      expect(readEnv()).to.have.property('version');
    });

    it('defaults to undefined', () => {
      expect(readEnv({}).version).to.not.be.ok;
    });

    it('returns config.npm_package_version', () => {
      const v = '10.10.11';
      expect(readEnv({ npm_package_version: v }).version).to.eql(JSON.stringify(v));
    });
  });

  describe('is', () => {
    it('exposes an is object', () => {
      expect(readEnv()).to.have.property('is');
      expect(readEnv().is).to.be.an('object');
    });

    it('defaults to is.dev=true', () => {
      expect(readEnv({}).is.dev).to.eql(true);
    });

    it('is.dev=false when NODE_ENV=production', () => {
      expect(readEnv({ NODE_ENV: 'production' }).is.dev).to.eql(false);
    });

    it('is.deployed=false when NODE_ENV!=production', () => {
      expect(readEnv({ NODE_ENV: 'foo' }).is.deployed).to.eql(false);
    });

    it('is.deployed=true when NODE_ENV=production', () => {
      expect(readEnv({ NODE_ENV: 'production' }).is.deployed).to.eql(true);
    });

    it('is.test=false when NODE_ENV!=test or testCI', () => {
      expect(readEnv({ NODE_ENV: 'foo' }).is.test).to.eql(false);
    });

    it('is.test=true when NODE_ENV=test', () => {
      expect(readEnv({ NODE_ENV: 'test' }).is.test).to.eql(true);
    });

    it('is.test=true when NODE_ENV=testCI', () => {
      expect(readEnv({ NODE_ENV: 'testCI' }).is.test).to.eql(true);
    });

    it('is.ci=false when NODE_ENV!=testCI', () => {
      expect(readEnv({ NODE_ENV: 'foo' }).is.ci).to.eql(false);
    });

    it('is.ci=true when NODE_ENV=testCI', () => {
      expect(readEnv({ NODE_ENV: 'testCI' }).is.ci).to.eql(true);
    });

    it('is.staging=false when APP_ENV!=staging', () => {
      expect(readEnv({ APP_ENV: 'foo' }).is.staging).to.eql(false);
    });

    it('is.staging=true when APP_ENV=staging', () => {
      expect(readEnv({ APP_ENV: 'staging' }).is.staging).to.eql(true);
    });

    it('is.preprod=false when APP_ENV!=preprod', () => {
      expect(readEnv({ APP_ENV: 'foo' }).is.preprod).to.eql(false);
    });

    it('is.preprod=true when APP_ENV=preprod', () => {
      expect(readEnv({ APP_ENV: 'preprod' }).is.preprod).to.eql(true);
    });

    it('is.production=false when APP_ENV!=production', () => {
      expect(readEnv({ APP_ENV: 'foo' }).is.production).to.eql(false);
    });

    it('is.production=true when APP_ENV=production', () => {
      expect(readEnv({ APP_ENV: 'production' }).is.production).to.eql(true);
    });

    it('is.client=false when !CLIENT', () => {
      expect(readEnv({}).is.client).to.eql(false);
    });

    it('is.client=true when !!CLIENT', () => {
      expect(readEnv({ CLIENT: 'a' }).is.client).to.eql(true);
    });

    it('is.server=false when !SERVER', () => {
      expect(readEnv({}).is.server).to.eql(false);
    });

    it('is.server=true when !!SERVER', () => {
      expect(readEnv({ SERVER: 'a' }).is.server).to.eql(true);
    });

    it('is.reviewApp=false when !IS_REVIEW_APP', () => {
      expect(readEnv({}).is.reviewApp).to.eql(false);
    });

    it('is.reviewApp=true when !!IS_REVIEW_APP', () => {
      expect(readEnv({ IS_REVIEW_APP: 'a' }).is.reviewApp).to.eql(true);
    });
  });

  describe('server', () => {
    it('exposes a server object', () => {
      expect(readEnv()).to.have.property('server');
      expect(readEnv().server).to.be.an('object');
    });

    it('server.host defaults to 0.0.0.0', () => {
      expect(readEnv().server.host).to.eql('0.0.0.0');
    });

    it('server.host returns config.HOST', () => {
      expect(readEnv({ HOST: 'TEST-HOST' }).server.host).to.eql('TEST-HOST');
    });

    it('server.port defaults to 8080 when NODE_ENV!=production', () => {
      expect(readEnv().server.port).to.eql('8080');
    });

    it('server.port defaults to undefined when NODE_ENV=production', () => {
      expect(readEnv({ NODE_ENV: 'production' }).server.port).to.not.be.ok;
    });

    it('server.port returns config.PORT', () => {
      expect(readEnv({ PORT: 'TEST-PORT' }).server.port).to.eql('TEST-PORT');
    });
  });

  describe('constants', () => {
    let constants;
    before(() => {
      constants = readEnv().constants;
    })


    it('exposes a constants object', () => {
      expect(constants).to.be.an('object');
    });

    const expectedEnvProperties = [
      'test',
      'ci',
      'development',
      'production',
      'staging',
      'preprod'
    ];

    expectedEnvProperties.forEach((key) => {
      it(`exposes a string constant for ${key} environment`, () => {
        expect(constants).to.have.property(key);
        expect(constants[key]).to.be.a('string');
      });
    });
  });
})