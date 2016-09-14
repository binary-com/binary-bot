import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import CustomApi from 'binary-common-utils/lib/customApi';
import ws from '../../../../common/mock/websocket';
import _Symbol from '../index';

describe('symbol', () => {
  const api = new CustomApi(ws);
  describe('Error Handling', () => {
    it('initializing is needed for symbol functions', () => {
      expect(() => {
        _Symbol.getAllowedConditions();
      }).to.throw(Error);
      expect(() => {
        _Symbol.isConditionAllowedInSymbol();
      }).to.throw(Error);
      expect(() => {
        _Symbol.getConditionName();
      }).to.throw(Error);
      expect(() => {
        _Symbol.getCategoryForCondition();
      }).to.throw(Error);
      expect(() => {
        _Symbol.getCategoryNameForCondition();
      }).to.throw(Error);
      expect(() => {
        _Symbol.getAllowedCategoryNames();
      }).to.throw(Error);
      expect(() => {
        _Symbol.findSymbol();
      }).to.throw(Error);
    });
  });
  describe('Checking functions', () => {
    let symbol;
    before(function beforeAll(done) { // eslint-disable-line prefer-arrow-callback
      symbol = new _Symbol(api);
      symbol.initPromise.then(() => {
        done();
      });
    });
    it('findSymbol returns symbol if exist', () => {
      expect(symbol.findSymbol('R_100')).to.be.ok
        .and.to.have.property('R_100');
      expect(symbol.findSymbol('FAKE')).not.to.be.ok;
    });
    it('getAllowedCategoryNames returns allowed category names', () => {
      expect(symbol.getAllowedCategoryNames('R_100')).to.be.ok
        .and.to.have.all.members(['Up/Down', 'Digits', 'Asians', 'Touch/No Touch', 'Ends In/Out', 'Stays In/Goes Out']);
      expect(symbol.getAllowedCategoryNames('FAKE')).to.be.empty;
    });
    it('getCategoryNameForCondition returns category name of a condition', () => {
      expect(symbol.getCategoryNameForCondition('risefall'))
        .to.be.equal('Up/Down');
    });
    it('getCategoryForCondition returns category of a condition', () => {
      expect(symbol.getCategoryForCondition('risefall'))
        .to.be.equal('callput');
    });
    it('getConditionName returns name of a condition', () => {
      expect(symbol.getConditionName('risefall'))
        .to.be.equal('Rise/Fall');
    });
    it('isConditionAllowedInSymbol returns true if a condition is allowed in a symbol', () => {
      expect(symbol.isConditionAllowedInSymbol('R_100', 'risefall'))
        .to.be.ok;
      expect(symbol.isConditionAllowedInSymbol('frxEURUSD', 'asians'))
        .not.to.be.ok;
      expect(symbol.isConditionAllowedInSymbol('fake', 'asians'))
        .not.to.be.ok;
      expect(symbol.isConditionAllowedInSymbol('frxEURUSD', 'fake'))
        .not.to.be.ok;
    });
    it('getAllowedConditionsForSymbol returns allowed conditions for a symbol', () => {
      expect(symbol.getAllowedConditionsForSymbol('R_100'))
				.to.have.all.members(['risefall', 'higherlower', 'matchesdiffers',
					'evenodd', 'overunder', 'asians', 'touchnotouch', 'endsinout', 'staysinout']);
      expect(symbol.getAllowedConditionsForSymbol('fake'))
        .to.be.empty;
    });
    it('getAllowedCategoriesForSymbol returns allowed categories for a symbol', () => {
      expect(symbol.getAllowedCategoriesForSymbol('R_100'))
        .to.have.all.members(['callput', 'digits', 'asian', 'touchnotouch', 'endsinout', 'staysinout']);
      expect(symbol.getAllowedCategoriesForSymbol('fake'))
        .to.be.empty;
    });
  });
  after(() => {
    api.destroy();
  });
});
