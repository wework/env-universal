import * as serverUtils from '../../src/serverUtils';
import * as utils from '../../src/utils';

describe('src/serverUtils', () => {
  describe('#serverHost', () => {
    it('returns config.HOST', () => {
      expect(serverUtils.serverHost({ HOST: 'foo' })).to.eql('foo');
    });

    it('defaults to DEFAULT_HOST', () => {
      expect(serverUtils.serverHost()).to.eql(serverUtils.DEFAULT_HOST);
    });
  });

  describe('#serverPort', () => {
    it('returns config.PORT', () => {
      expect(serverUtils.serverPort({ PORT: 'bar' })).to.eql('bar');
    });

    it('defaults to DEFAULT_PORT when not in production', () => {
      sinon.stub(utils, 'isProd').returns(false);
      expect(serverUtils.serverPort()).to.eql(serverUtils.DEFAULT_PORT);
    });

    it('defaults to undefined in production', () => {
      sinon.stub(utils, 'isProd').returns(true);
      expect(serverUtils.serverPort()).to.eql(undefined);
    });
  });
});